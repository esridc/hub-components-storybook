import { h, Host } from '@stencil/core';
import pointer from 'json-pointer';
import { bind } from '../../utils/context';
import { getLabel, isFieldEmpty, renderHelperText } from './utils';
import { isNil } from '../../utils/is-nil';
import { getPropertyPathFromScope, getWhiteListPropertyFromId } from './utils/getPropertyFrom';
import { getAlwaysRequiredProperties, getCurrentlyRequiredProperties, getConditionallyRequiredProperties, removeEmptyValues } from './utils/getRequiredProperties';
import { SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE, } from './resources';
import { getProp, cloneObject, setProp, createId, UiSchemaRuleEffects, UiSchemaElementTypes, UiSchemaMessageTypes, UiSchemaSectionTypes, } from '@esri/hub-common';
import { clearValue, clearValuesFromHiddenFields } from './utils/clearValue';
import { mergeDeep } from '../../utils/object';
import { instantiateValidator, validateAsync } from './utils/validator';
import { evaluateCondition, evaluateConditions, evaluateUiSchemaRules } from './utils/rules';
import { renderRequiredHelperText, shouldRenderRequiredHelperText } from './utils/renderRequiredHelperText';
import intlManager from '../../utils/intl-manager';
export class ArcgisConfigurationEditor {
  constructor() {
    this._values = {};
    /**
     * Properties that are always required in the specific schema, regardless of values passed in
     */
    this.alwaysRequiredProperties = [];
    /**
     * Properties that are potentially required in the schema based on the values passed in.
     * Only conditionally required properties exist in this array.
     */
    this.conditionallyRequiredProperties = new Map();
    /**
     * Properties in the schema that are currently emitted based on rule evaluation and current values.
     * These properties are currently visible.
     */
    this._uiSchemaWhiteList = [];
    this.schema = undefined;
    this.uiSchema = undefined;
    this.values = {};
    this.disabled = false;
    this.t = undefined;
    this.variant = undefined;
    this.scale = undefined;
    this._model = {};
    this.currentlyRequiredProperties = new Set();
    bind(this, 'renderUiSchemaElement', '_validate');
  }
  /**
   * watch for changes to the schema and re-initialize.
   * This allows for dynamically rendered uiSchemas
   */
  handleUiSchemaChange(uiSchema) {
    this._uiSchema = this.initUiSchema(uiSchema);
  }
  /**
   * watch for changes to the schema and re-initialize.
   * This allows for dynamically rendered schemas
   */
  async handleSchemaChange(schema) {
    // 1. set an internal copy of the editor's parsed schema
    this._schema = cloneObject(schema);
    // 2. instantiate the editor's validator
    this._validator = instantiateValidator(this._schema);
    // 3. re-initialize all three required properties arrays
    this.setConditionallyRequiredProperties();
    await this.setAlwaysRequiredProperties();
    await this.setCurrentlyRequiredProperties();
  }
  /** watch for changes to the editor values and re-initialize. */
  handleValuesChange(values) {
    this._values = this.initValues(values);
  }
  /**
   * handler function for the arcgisConfigurationEditorFieldChange event
   * which gets emitted every time a field input changes. This function
   * updates the internally stored form values and calls the emitChangeEvents
   * function to re-validate and emit the updated form values
   */
  handleArcgisConfigurationEditorFieldChange(event) {
    event.stopPropagation();
    this.setFieldValue(event.detail.property, event.detail.value);
    this.applyUiSchemaResetRule(this._uiSchema, event.detail.property, event.detail.value);
    this.emitChangeEvent();
  }
  setFieldValue(property, value) {
    // if field is required && it is empty, set to undefined
    if (this.currentlyRequiredProperties.has(property) && isFieldEmpty(value)) {
      clearValue(property, this._values);
    }
    // else, just set to value like normally
    else {
      setProp(property, value, this._values, true);
    }
    // if the field that changed is a conditional field, then we need to re-evaluate the currently required properties
    if (this.conditionallyRequiredProperties.has(property)) {
      this.setCurrentlyRequiredProperties(property);
    }
  }
  /**
   * If there is a uiSchema rule with a RESET effect
   * whose conditions are met, then we apply the rule by resetting the field to its default value
   */
  applyUiSchemaResetRule(uiSchema, property, value) {
    // loop through the uiSchema elements
    uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.elements.forEach(element => {
      if (element.type === UiSchemaElementTypes.control) {
        // process elements that are of type control
        const model = cloneObject(this._model);
        // since this._model does not yet reflect the changed field, we clone it and set the new value
        setProp(property, value, model.values, true);
        // evaluate the rules on the current element against our model
        const ruleEffects = evaluateUiSchemaRules(element.rule || element.rules, model);
        if (ruleEffects.includes(UiSchemaRuleEffects.RESET)) {
          // if our current element has a RESET rule whose conditions are met, we apply the rule
          // get the property path from the element's scope
          const property = getPropertyPathFromScope(element.scope);
          // get the schema for the element's scope
          const elementSchema = pointer.get(this._schema, element.scope);
          // get the default value from the element's schema, if it is not specified, use the default value for the schema type
          const value = [
            elementSchema.default,
            elementSchema.const,
            SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE[elementSchema.type]
          ].find(val => !isNil(val));
          // set the field to the default value
          this.setFieldValue(property, value);
        }
      }
      else if (element.type === UiSchemaElementTypes.section) {
        // for sections, call this function again recursively
        this.applyUiSchemaResetRule(element, property, value);
      }
    });
  }
  /**
   * We listen for internal instances of the arcgisConfigurationEditorInitialized
   * and arcgisConfigurationEditorLoaded events and stop their propagation. This
   * prevents the top-level configuration editor from emitting these events when
   * a composite field is initialized/loaded.
   */
  handleCompositeEditorEvents(evt) {
    evt.stopPropagation();
  }
  /**
   * public method to set focus to the editor. Use this, for example,
   * to initially set focus to a form for a11y purposes
   */
  async setFocus() {
    this.element.focus();
  }
  /**
   * public method to manually trigger validation. Use this, fox example,
   * to force a form validation when `values` is changed externally
   */
  async validate() {
    return this._validate(this._values);
  }
  async componentWillLoad() {
    if (!this.schema) {
      throw new Error('arcgis-configuration-editor: schema attribute is required');
    }
    // 1. set an internal copy of the editor's parsed schema
    const _schema = this.parseJson(this.schema);
    this._schema = cloneObject(_schema);
    // 2. set and internal copy of the editor's parsed uiSchema
    // & give the elements ids that look like propertyPath::uniqueId
    this._uiSchema = this.initUiSchema(this.uiSchema);
    // 3. set an internal copy of the editor's values with defaults applied
    this._values = this.initValues(this.values);
    // 4. instantiate the editor's validator
    this._validator = instantiateValidator(this._schema);
    // 5. initialize all three required properties structures
    // Note: alwaysRequired relies on conditionallyRequired, and
    // curentlyRequired relies on alwaysRequired & conditionallyRequired
    this.setConditionallyRequiredProperties();
    await this.setAlwaysRequiredProperties();
    await this.setCurrentlyRequiredProperties();
    // 6. emit the initial editor change event
    this.emitChangeEvent(true);
    // 7. load intl
    this._intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * We emit an event when the top-level configuration editor has
   * completely loaded/rendered. Consuming components can hook into
   * this event to toggle a loading indicator
   */
  componentDidLoad() {
    this.arcgisConfigurationEditorLoaded.emit();
  }
  get invalidProperties() {
    const { errors = [] } = this._validationResult || {};
    return errors.map(error => this.getErrorPropertyPath(error));
  }
  /** initialize the uiSchema by adding ids onto every scoped element */
  initUiSchema(uiSchema) {
    /** 1. generate a basic uiSchema from the schema if not provided */
    const _uiSchema = uiSchema
      ? cloneObject(uiSchema)
      : this.generateUiSchemaFromSchema(this._schema);
    // kick off the recursive function
    this._addIdsToUiSchema(_uiSchema, true);
    return _uiSchema;
  }
  /** 2. traverse the uiSchema and add unique ids */
  _addIdsToUiSchema(uiSchema, isTopLevel = false, sectionScopes) {
    /** for each element, create a unique id for the element */
    uiSchema.elements.forEach((element) => {
      var _a, _b, _c;
      // if a control element/has a scope, create an id
      if (element.scope) {
        const propertyPath = getPropertyPathFromScope(element === null || element === void 0 ? void 0 : element.scope);
        element.id = createId(`${propertyPath}::`);
        sectionScopes && sectionScopes.push(propertyPath);
      }
      // if a section element, check children
      if (element.type === UiSchemaElementTypes.section) {
        /** adds the "*indicates required field" helper text to all top-level sections */
        if (isTopLevel && !((_a = element.options) === null || _a === void 0 ? void 0 : _a.requiredHelperText)) {
          element.options = Object.assign(Object.assign({}, element.options), { requiredHelperText: true });
        }
        // recursively check element children, but also grab their scopes
        const _sectionScopes = isTopLevel ? [] : sectionScopes;
        // if the section is a stepper or accordion, then the children are top level, since we actually want the step item / accordion item
        const _isTopLevel = (((_b = element.options) === null || _b === void 0 ? void 0 : _b.section) === UiSchemaSectionTypes.stepper || ((_c = element.options) === null || _c === void 0 ? void 0 : _c.section) === UiSchemaSectionTypes.accordion);
        this._addIdsToUiSchema(element, _isTopLevel, _sectionScopes);
        element.options = Object.assign(Object.assign({}, element.options), { sectionScopes: _sectionScopes });
      }
    });
  }
  /** initialize the editor values */
  initValues(values) {
    // 1. parse the values if they are stringified JSON
    let _values = cloneObject(this.parseJson(values));
    // 2. filter "empty" editor values for required fields. This
    // is necessary for required fields to be validated correctly
    _values = removeEmptyValues(_values);
    // 3. apply default values and merge defaults into values, with values taking precendence
    const defaultValues = this.getDefaultValues(this._schema, this._uiSchema);
    _values = mergeDeep(defaultValues, _values);
    return _values;
  }
  /**
   * Sets a state array of required properties that are not conditional and thus are always required
   */
  async setAlwaysRequiredProperties() {
    this.alwaysRequiredProperties = await getAlwaysRequiredProperties(this._schema, this._validator, this.conditionallyRequiredProperties);
  }
  /**
   * Sets the state array of required properties that are potentially required based on the values passed in
   */
  setConditionallyRequiredProperties() {
    this.conditionallyRequiredProperties = getConditionallyRequiredProperties(this._schema);
  }
  /**
   * Sets the state array of currently required properties based on the values passed in
   */
  async setCurrentlyRequiredProperties(changedProp) {
    this.currentlyRequiredProperties = await getCurrentlyRequiredProperties(this._schema, this._values, this._validator, this.alwaysRequiredProperties, this.conditionallyRequiredProperties, this.currentlyRequiredProperties, changedProp);
  }
  /**
   * Returns a parsed object. This utility is used to parse the schema,
   * and values which can all be passed in as stringified JSON
   */
  parseJson(json) {
    return typeof json === 'string' ? JSON.parse(json) : json;
  }
  /**
   * Providing a uiSchema is optional. If none is provided, this function
   * generates a default one based on the properties defined in the schema
   */
  generateUiSchemaFromSchema(schema) {
    return {
      type: UiSchemaElementTypes.layout,
      elements: this.generateUiSchemaElementsFromSchema(schema)
    };
  }
  generateUiSchemaElementsFromSchema(schema, scopePath = '') {
    return schema.properties
      ? Object.entries(schema.properties).reduce((acc, [key, schema]) => {
        const scope = `${scopePath}/properties/${key}`;
        if (schema.type === 'object') {
          acc = [...acc, ...this.generateUiSchemaElementsFromSchema(schema, scope)];
        }
        else {
          acc.push({
            label: schema.title || key,
            scope,
            type: UiSchemaElementTypes.control
          });
        }
        return acc;
      }, [])
      : [];
  }
  /**
   * Validates the provided values against the form as a whole. This
   * convenience method leverages the form validator instance that
   * gets instantiated when the component is loaded
   */
  async _validate(values) {
    const { valid, errors } = await validateAsync(this._validator, values);
    this._validationResult = { valid, errors };
    return this._validationResult;
  }
  /**
   * recursively traverse the uiSchema to get the schema defaults to
   * append to the emitted values in the case that the user does not
   * overwrite the value
   */
  getDefaultValues(schema, uiSchema, defaults = {}) {
    return (uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.elements.reduce((acc, element) => {
      if (element.type === UiSchemaElementTypes.control) {
        const propertyPath = getPropertyPathFromScope(element.scope);
        const elementSchema = pointer.get(schema, element.scope);
        !isNil(elementSchema.default) && isNil(getProp(this._values, propertyPath)) && setProp(propertyPath, elementSchema.default, acc, true);
      }
      else if (element.type === UiSchemaElementTypes.section) {
        this.getDefaultValues(schema, element, acc);
      }
      return acc;
    }, defaults)) || {};
  }
  /**
   * recursively traverses the uiSchema to compile a list of properties
   * that should be emitted by the configuration editor. If the property
   * is not defined on the uiSchema, or if a uiSchema rule dictates that
   * the field should be hidden, we don't want to emit it as part of the
   * IChangeEventDetail
   *
   * Also creates IDs for each uiSchema element if they don't already exist
   */
  getUiSchemaWhiteList(uiSchema, model) {
    return uiSchema.elements.reduce((acc, element) => {
      // element.rule has been deprecated in favor of element.rules;
      // however, we continue to support both for backwards compatibility
      const ruleEffects = evaluateUiSchemaRules(element.rule || element.rules, model);
      if (element.type === UiSchemaElementTypes.control) {
        acc = this.maybeAddToWhiteList(element, ruleEffects, acc);
      }
      else if (element.type === UiSchemaElementTypes.section) {
        // check to add section to whitelist
        if (element.type === UiSchemaElementTypes.section && element.scope) {
          acc = this.maybeAddToWhiteList(element, ruleEffects, acc);
        }
        const res = this.getUiSchemaWhiteList(element, model);
        acc = {
          whiteListIds: [...acc.whiteListIds, ...res.whiteListIds],
          clearOnHidden: [...acc.clearOnHidden, ...res.clearOnHidden]
        };
      }
      return acc;
    }, { whiteListIds: [], clearOnHidden: [] });
  }
  maybeAddToWhiteList(element, ruleEffects, acc) {
    var _a;
    const shown = !ruleEffects.includes(UiSchemaRuleEffects.HIDE);
    // add id to whitelist
    if (element.id && shown) {
      !acc.whiteListIds.includes(element.id) && acc.whiteListIds.push(element.id);
    }
    // if the property has the clearOnHidden rule, then we should add its id to the clearOnHidden ids list
    ((_a = element.options) === null || _a === void 0 ? void 0 : _a.clearOnHidden) && acc.clearOnHidden.push(element.id);
    return acc;
  }
  /**
   * This function is responsible for generating and emitting an
   * IChangeEventDetail based on the forms current values. This
   * function gets called on initialization as well as every time
   * a form field value changes
   */
  async emitChangeEvent(isInitialization = false) {
    // 1. if editor is disabled, call validate in order
    // to have a non-empty validationResult obj on load
    if (this.disabled) {
      await this._validate(this._values);
      return;
    }
    ;
    // 2a. create a copy of the current model to use for getting the uiSchema white list
    // we need to pass a copy of the model because we need access to the new values, which have not been updated into the model object
    const model = cloneObject(this._model);
    model.values = this._values;
    // 2b. determine the whiteListed ids and the ids
    // that may need to be cleared if they were just hidden
    const { whiteListIds = [], clearOnHidden = [] } = this.getUiSchemaWhiteList(this._uiSchema, model);
    // 2c. for each element that was hidden, clear its value, if the uiSchema rule dictates it
    clearValuesFromHiddenFields(whiteListIds, this._uiSchemaWhiteList, clearOnHidden, this._values);
    // 3. validate the current form values
    const { valid } = await this._validate(this._values);
    // 4. filter the values down to the whiteListed elements that should be emitted
    this._uiSchemaWhiteList = whiteListIds;
    const whiteListProperties = this._uiSchemaWhiteList.map(id => getWhiteListPropertyFromId(id));
    const values = Object.entries(this._values).reduce((acc, [key, value]) => {
      if (whiteListProperties.includes(key)) {
        acc[key] = value;
      }
      return acc;
    }, {});
    // 5. set the internal form state;
    this._model = { valid, values, schema: this._schema, required: this.currentlyRequiredProperties };
    // 6. emit the appropriate change event
    const event = isInitialization ? this.arcgisConfigurationEditorInitialized : this.arcgisConfigurationEditorChange;
    event.emit(this._model);
  }
  /**
   * Returns the schema property path associated with an AJV error
   */
  getErrorPropertyPath(error) {
    const { instancePath, keyword } = error;
    let propertyPath = instancePath === null || instancePath === void 0 ? void 0 : instancePath.slice(1).split("/").join(".");
    // if a required error, then we need to use the missing property prefixed with any instancePath there may be
    if (keyword === 'required') {
      propertyPath = (propertyPath === null || propertyPath === void 0 ? void 0 : propertyPath.length) ? `${propertyPath}.${error.params.missingProperty}` : error.params.missingProperty;
    }
    return propertyPath;
  }
  /**
   * returns an array of errors messages associated with a specific
   * field control
   */
  getControlErrorMessages(controlPropertyPath, errors, errorMessages) {
    return errors.reduce((controlErrors, error) => {
      const errorPropertyPath = this.getErrorPropertyPath(error);
      if (errorPropertyPath === controlPropertyPath) {
        const { keyword } = error;
        const errorMessage = errorMessages.find(error => error.keyword === keyword)
          || { type: UiSchemaMessageTypes.error, keyword, label: error.message };
        controlErrors = [...controlErrors, errorMessage];
      }
      return controlErrors;
    }, []);
  }
  /**
   * returns an array of messages for a specific field control, including
   * error, success, and/or custom messages
   */
  getControlMessages(elementUiSchema) {
    var _a, _b;
    let messages = [];
    const disableMessages = (_a = elementUiSchema.options) === null || _a === void 0 ? void 0 : _a.disableMessages;
    const propertyPath = getPropertyPathFromScope(elementUiSchema.scope);
    const uiSchemaMessages = ((_b = elementUiSchema.options) === null || _b === void 0 ? void 0 : _b.messages) || [];
    // get all messages
    const { error: errorMessages, success: successMessages, custom: customMessages } = uiSchemaMessages.reduce((acc, message) => {
      const type = message.type.toLowerCase();
      acc[type] = [...acc[type], message];
      return acc;
    }, { success: [], error: [], custom: [] });
    const hasErrors = this.invalidProperties.includes(propertyPath) && !disableMessages;
    const hasSuccess = successMessages.length && !disableMessages;
    const hasCustom = customMessages.length && !disableMessages;
    if (hasErrors) {
      const { errors = [] } = this._validationResult;
      const _errorMessages = this.getControlErrorMessages(propertyPath, errors, errorMessages);
      messages = [..._errorMessages];
    }
    else if (hasSuccess) {
      messages = [...successMessages];
    }
    if (hasCustom) {
      const _customMessages = customMessages.reduce((acc, message) => {
        const evaluatesTrue = message.alwaysShow || (message.condition ? evaluateCondition(message.condition, this._model) : evaluateConditions(message.conditions, this._model));
        acc = evaluatesTrue ? [...acc, message] : acc;
        return acc;
      }, []);
      messages = [...messages, ..._customMessages];
    }
    return messages;
  }
  renderUiSchemaElement(uiSchema) {
    // element.rule has been deprecated in favor of element.rules;
    // however, we continue to support both for backwards compatibility
    const ruleEffects = evaluateUiSchemaRules(uiSchema.rule || uiSchema.rules, this._model);
    if (!ruleEffects.includes(UiSchemaRuleEffects.HIDE)) {
      if (uiSchema.type === UiSchemaElementTypes.section) {
        return this.renderUiSchemaSection(uiSchema, ruleEffects);
      }
      else if (uiSchema.type === UiSchemaElementTypes.control) {
        return this.renderUiSchemaControl(uiSchema, ruleEffects);
      }
      else if (uiSchema.type === UiSchemaElementTypes.slot) {
        return h("slot", { key: uiSchema.options.name, name: uiSchema.options.name });
      }
      else if (uiSchema.type === UiSchemaElementTypes.notice) {
        const { notice, noticeId } = uiSchema.options || {};
        return h("arcgis-hub-notice", { notice: notice, noticeId: noticeId });
      }
    }
  }
  renderUiSchemaControl(uiSchemaElement, ruleEffects = []) {
    if (uiSchemaElement) {
      try {
        let schema = pointer.get(this._schema, uiSchemaElement.scope);
        if (schema.if) {
          const ifValidator = instantiateValidator(schema.if);
          const ifEvaluatesTrue = ifValidator(this._values);
          schema = ifEvaluatesTrue ? Object.assign(Object.assign({}, schema), schema.then) : Object.assign(Object.assign({}, schema), schema.else);
        }
        schema.title = getLabel(uiSchemaElement, this.t);
        const propertyPath = getPropertyPathFromScope(uiSchemaElement.scope);
        return h("arcgis-configuration-editor-field", { disabled: this.disabled || ruleEffects.includes(UiSchemaRuleEffects.DISABLE), invalid: this.invalidProperties.includes(propertyPath), key: propertyPath, messages: this.getControlMessages(uiSchemaElement), model: this._model, property: propertyPath, required: this.currentlyRequiredProperties.has(propertyPath), scale: this.scale, schema: schema, t: this.t, uiSchema: uiSchemaElement, value: getProp(this._values, propertyPath) });
      }
      catch (error) {
        console.error(error);
      }
    }
  }
  renderUiSchemaSection(uiSchema, ruleEffects = []) {
    var _a, _b, _c, _d;
    const disabled = ruleEffects.includes(UiSchemaRuleEffects.DISABLE);
    const label = getLabel(uiSchema, this.t);
    const { helperText = {}, variant } = ((_a = this.uiSchema) === null || _a === void 0 ? void 0 : _a.options) || {};
    const hasHelperText = !!(helperText.label || helperText.labelKey);
    const hasRequiredHelperText = shouldRenderRequiredHelperText(this._model, uiSchema);
    /**
     * because of the way that the calcite-stepper works
     * (calcite-stepper-items must be direct children of
     * the calcite-stepper), we unfortunately must render
     * stepper + stepper items directly rather than through
     * the arcgis-configuration-editor-section
     *
     * TODO: circle back to see if we can get stepper
     * sections working in some other way
     */
    if (((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.section) === "stepper") {
      return h("calcite-stepper", { class: { [variant]: Boolean(variant) }, scale: ((_c = uiSchema.options) === null || _c === void 0 ? void 0 : _c.scale) || this.scale }, uiSchema.elements.map(element => (this.renderUiSchemaElement(element))));
    }
    else if (((_d = uiSchema.options) === null || _d === void 0 ? void 0 : _d.section) === "step") {
      return h("calcite-stepper-item", { "data-label": label, disabled: disabled, heading: label, key: label }, h("div", { class: {
          "section__content": true,
          [`helper-text--${helperText.placement}`]: hasHelperText && !!helperText.placement
        } }, hasHelperText && renderHelperText(uiSchema, this.t), hasRequiredHelperText && renderRequiredHelperText(uiSchema, this.t, this._intl), h("div", { class: "section__fields" }, uiSchema.elements.map(element => (this.renderUiSchemaElement(element))))));
    }
    else {
      return h("arcgis-configuration-editor-section", { disabled: disabled, label: label, model: this._model, scale: this.scale, t: this.t, uiSchema: cloneObject(uiSchema), variant: this.variant }, uiSchema.elements.map(element => (this.renderUiSchemaElement(element))));
    }
  }
  render() {
    return h(Host, { "data-element": "configuration-editor", role: "group", tabIndex: -1 }, this._uiSchema.elements.map(this.renderUiSchemaElement));
  }
  static get is() { return "arcgis-configuration-editor"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-configuration-editor.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-configuration-editor.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "schema": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | IConfigurationSchema",
          "resolved": "IConfigurationSchema | string",
          "references": {
            "IConfigurationSchema": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An object in JSONSchema format that describe the configuration\nschema. It can be an object or a stringified object."
        },
        "attribute": "schema",
        "reflect": false
      },
      "uiSchema": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IUiSchema",
          "resolved": "IUiSchema",
          "references": {
            "IUiSchema": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An optional object that describes how the form should be rendered"
        }
      },
      "values": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | IConfigurationValues",
          "resolved": "IConfigurationValues | string",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An object that provides the configuration values. Its keys\nare property names and values are property values."
        },
        "attribute": "values",
        "reflect": false,
        "defaultValue": "{}"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A boolean value indicating whether the form is disabled.\nWhen disabled, the form is not editable."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "t": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TranslationFunc",
          "resolved": "(key: any, values?: any, opts?: any) => string",
          "references": {
            "TranslationFunc": {
              "location": "import",
              "path": "./resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A translation function with which to translate form labels."
        }
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CONFIGURATION_VARIANTS",
          "resolved": "CONFIGURATION_VARIANTS.layoutEditor | CONFIGURATION_VARIANTS.workspace",
          "references": {
            "CONFIGURATION_VARIANTS": {
              "location": "import",
              "path": "./resources"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "optionally add a preset-style to the configuration editor to change\nthe editor's appearance"
        },
        "attribute": "variant",
        "reflect": false
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "scale",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_model": {},
      "currentlyRequiredProperties": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisConfigurationEditorChange",
        "name": "arcgisConfigurationEditorChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This custom event is emitted when the value of any field input\nchanges. It includes the validity and current form values"
        },
        "complexType": {
          "original": "IChangeEventDetail",
          "resolved": "IChangeEventDetail",
          "references": {
            "IChangeEventDetail": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisConfigurationEditorInitialized",
        "name": "arcgisConfigurationEditorInitialized",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "This custom event is emitted when the editor is initially loaded.\nIt includes the validity and current form values\nNOTE: for unknown reasons, if this event is used with Listen, you must pass {capture: true} to the Listen decorator"
        },
        "complexType": {
          "original": "IChangeEventDetail",
          "resolved": "IChangeEventDetail",
          "references": {
            "IChangeEventDetail": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }, {
        "method": "arcgisConfigurationEditorLoaded",
        "name": "arcgisConfigurationEditorLoaded",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event to indicate that the form has been fully loaded/rendered\nNOTE: for unknown reasons, if this event is used with Listen, you must pass {capture: true} to the Listen decorator"
        },
        "complexType": {
          "original": "null",
          "resolved": "null",
          "references": {}
        }
      }, {
        "method": "arcgisConfigurationEditorSectionAction",
        "name": "arcgisConfigurationEditorSectionAction",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ action: string, model: IChangeEventDetail }",
          "resolved": "{ action: string; model: IChangeEventDetail; }",
          "references": {
            "IChangeEventDetail": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "setFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "public method to set focus to the editor. Use this, for example,\nto initially set focus to a form for a11y purposes",
          "tags": []
        }
      },
      "validate": {
        "complexType": {
          "signature": "() => Promise<IValidationResult>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "IValidationResult": {
              "location": "import",
              "path": "./resources"
            }
          },
          "return": "Promise<IValidationResult>"
        },
        "docs": {
          "text": "public method to manually trigger validation. Use this, fox example,\nto force a form validation when `values` is changed externally",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "uiSchema",
        "methodName": "handleUiSchemaChange"
      }, {
        "propName": "schema",
        "methodName": "handleSchemaChange"
      }, {
        "propName": "values",
        "methodName": "handleValuesChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisConfigurationEditorFieldChange",
        "method": "handleArcgisConfigurationEditorFieldChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisConfigurationEditorInitialized",
        "method": "handleCompositeEditorEvents",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "arcgisConfigurationEditorLoaded",
        "method": "handleCompositeEditorEvents",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
