import { h, r as registerInstance, c as createEvent, H as Host, a as getElement, F as Fragment } from './index-57f71b44.js';
import { j as jsonPointer, a as getPropertyPathFromId, g as getPropertyPathFromScope, b as getWhiteListPropertyFromId } from './getPropertyFrom-49d414ff.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getLabel, a as getValue } from './getLabel-a2b67324.js';
import { i as isFieldEmpty } from './isFieldEmpty-d560d7e3.js';
import { i as isNil } from './is-nil-03b9a6b5.js';
import { m as mergeDeep } from './index-213c70d0.js';
import { v as validateAsync, a as validate, i as instantiateValidator, e as evaluateUiSchemaRules, b as evaluateCondition, c as evaluateConditions } from './rules-a1672e9e.js';
import { d as deepFilter } from './deepFilter-df6b0aed.js';
import { a as cloneObject, c as createId, b as capitalize } from './util-3e6872d9.js';
import { d as deleteProp } from './delete-prop-bd13d424.js';
import { S as SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE } from './resources-3247991b.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { a as UiSchemaElementTypes, U as UiSchemaRuleEffects, b as UiSchemaMessageTypes, c as UiSchemaSectionTypes } from './types-1fca2e83.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { d as dasherize } from './dasherize-9215e9fc.js';
import './interfaces-fd83cf89.js';
import './ajv-73f98cc1.js';
import './_commonjsHelpers-11ca3be1.js';
import './logger-f8667200.js';
import './_deep-map-values-53f8dbd1.js';
import './deep-set-67281c6f.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';
import './InitiativeSchema-4fb31f85.js';
import './SiteSchema-3e282ce1.js';
import './DiscussionSchema-6e5016d0.js';
import './PageSchema-4cbe3bd9.js';
import './ContentSchema-d913d8e9.js';
import './TemplateSchema-83e65297.js';
import './GroupSchema-13ff9290.js';
import './InitiativeTemplateSchema-bf5d8531.js';
import './SurveySchema-0fcb1d64.js';
import './EventSchemaCreate-2f6ba245.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './types-db540898.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';

/**
 * Renders the helper text for a given uiSchemaElement
 * @param uiSchemaElement
 * @param t
 * @returns
 */
function renderHelperText(uiSchemaElement, t) {
  const helperText = getLabel(uiSchemaElement, t, 'options.helperText');
  return h("calcite-input-message", { class: "helper-text" },
    " ",
    h("div", { innerHTML: helperText }),
    " ");
}

const getTitle = (uiSchemaElement, t, propertyPath) => {
  return getValue(uiSchemaElement, t, 'title', 'titleKey', propertyPath);
};

/**
 * Filters out form values that are empty for required fields.
 * This allows the field to be validated correctly
 */
function removeEmptyValues(values) {
  return deepFilter(values, (value) => !isFieldEmpty(value));
}
/**
 * Parses an errors array from AJV to get any required properties. Returns an array of properties that are required.
 * @param errors ErrorObject[]
 * @returns string[] of required properties
 */
function getRequiredFromErrors(errors) {
  if (!errors) {
    return [];
  }
  return errors.reduce((acc, error) => {
    let propertyPath;
    // if a required error
    if (error.keyword === 'required' && error.params) {
      const params = error.params;
      propertyPath = params === null || params === void 0 ? void 0 : params.missingProperty;
      // if we have the path to the property, grab the path from the instancePath
      if (error.instancePath && error.instancePath.length) {
        propertyPath = `${error.instancePath.slice(1).split("/").join(".")}.${propertyPath}`;
      }
    }
    if (propertyPath) {
      acc.push(propertyPath);
    }
    return acc;
  }, []);
}
/**
 * Gets the properties that are always required for a given schema.
 * This is done by creating an empty values object that mirrors the schema structure, and then validating it.
 * @param schema - schema to validate against
 * @param validator - validator function
 * @param conditionallyRequiredProperties - map of properties that are conditionally required
 * @returns
 */
async function getAlwaysRequiredProperties(schema, validator, conditionallyRequiredProperties) {
  const emptyValues = createEmptyValues(schema);
  const validateFunc = schema.$async ? validateAsync : validate;
  const { valid, errors } = await validateFunc(validator, emptyValues) || { valid: false, errors: [] };
  const emptyValuesResult = { valid, errors };
  const required = getRequiredFromErrors(emptyValuesResult.errors);
  // get the properties that are conditionally required
  const allConditionallyRequiredProperties = conditionallyRequiredProperties.get("allConditionallyRequiredProperties");
  // filter out any properties that are in our potential list, as those are conditional requireds and are caused from an else clause
  const alwaysRequired = required.filter((prop) => !allConditionallyRequiredProperties.has(prop));
  return alwaysRequired;
}
/**
 * Gets the currently required properties for a given schema and set of values.
 * This is done by cloning the values object, deleting the property, and then validating the object.
 * @param schema - schema to validate against
 * @param values - values to validate
 * @param validator - validator function
 * @param alwaysRequired - array of properties that are always required
 * @param conditionallyRequired - map of properties that are conditionally required
 * @param oldCurrentlyRequired - set of properties that are currently required
 * @param changedProperty - single property that has changed, if any
 * @returns
 */
async function getCurrentlyRequiredProperties(schema, values, validator, alwaysRequired, conditionallyRequired, oldCurrentlyRequired, changedProperty) {
  /**
   * Two cases when calling this function
   *
   * Case 1: Initializing the currentlyRequiredArray when starting, so we need to check every potentially required prop
   * in this case, we are using the conditionallyRequiredProps located with the key["allConditionallyRequiredProperties"]
   * Case 2: A property has changed, so we only need to check the potentially required props that could be affected by the change
   * in this case, we are using the conditionallyRequiredProps located with the key[changedProperty]
   */
  // determine if we are looking at all props or just at the props from the changed property
  const key = changedProperty ? changedProperty : "allConditionallyRequiredProperties";
  // if we are looking at a subset, then we are pushing/popping -- otherwise, we are just setting
  const currentlyRequiredProperties = changedProperty ? oldCurrentlyRequired : new Set();
  // if we're initializing, add always required -- otherwise, they're already there
  !changedProperty && alwaysRequired.forEach((prop) => currentlyRequiredProperties.add(prop));
  // Set of properties to look at
  const conditionallyRequiredProperties = conditionallyRequired.get(key) || new Set();
  // make a clone of the values object
  // we also merge with the empty schema so that we have the correct structure -- otherwise, we'll miss nested errors
  const emptyValues = createEmptyValues(schema);
  const valuesClone = cloneObject(values);
  const emptyWithValues = mergeDeep(emptyValues, valuesClone);
  // for each potentially required
  for (const prop of conditionallyRequiredProperties) {
    // clone our values object with schema structure
    const clone = cloneObject(emptyWithValues);
    // delete the prop from the clone
    deleteProp(clone, prop);
    // validate the clone
    const validateFunc = schema.$async ? validateAsync : validate;
    const result = await validateFunc(validator, clone);
    // check to see if we have an error for property
    const hasError = getRequiredFromErrors(result.errors).includes(prop);
    // if error, add it to currently required
    if (hasError) {
      currentlyRequiredProperties.add(prop);
    }
    else if (changedProperty) {
      // if no error, and we are looking at a subset, then we need to remove it from currently required
      currentlyRequiredProperties.delete(prop);
    }
  }
  return currentlyRequiredProperties;
}
/**
 * Parses the schema to see if there are any required properties in the "then" or the "else" of the allOf conditional.
 * @param schema
 */
function getConditionallyRequiredProperties(schema) {
  /** helper function to push properties into the map correctly */
  const pushPropertiesToMap = (prop, required) => {
    if (!requiredProperties.has(prop)) {
      requiredProperties.set(prop, new Set());
    }
    // add each element in required array to set
    required.forEach((req) => requiredProperties.get(prop).add(req));
  };
  const allOf = schema.allOf;
  const requiredProperties = new Map();
  requiredProperties.set("allConditionallyRequiredProperties", new Set());
  // f we have things to look at in the allOf
  if (allOf) {
    allOf.forEach((item) => {
      let resolved = item;
      // if we have a ref, we need to resolve it
      if (item.$ref) {
        // take # off of the front so we have a valid pointer
        const ref = item.$ref.slice(1);
        resolved = jsonPointer.get(schema, ref);
      }
      const ifProp = resolved.if;
      const then = resolved.then;
      const elseProp = resolved.else;
      let ifProperties;
      let thenProperties;
      let elseProperties;
      // parse if for properties mentioned in condition
      if (ifProp) {
        ifProperties = _parseClause(ifProp, true);
      }
      // parse then for required properties
      if (then) {
        thenProperties = _parseClause(then);
      }
      // parse else for required properties
      if (elseProp) {
        elseProperties = _parseClause(elseProp);
      }
      // if then required properties, add them
      if (then && thenProperties && ifProperties) {
        ifProperties.map((prop) => {
          pushPropertiesToMap(prop, thenProperties);
        });
        // add to allConditionallyRequiredProperties
        pushPropertiesToMap("allConditionallyRequiredProperties", thenProperties);
      }
      // if else required properties, add them
      if (elseProp && elseProperties && ifProperties) {
        ifProperties.map((prop) => {
          pushPropertiesToMap(prop, elseProperties);
        });
        // add to allConditionallyRequiredProperties
        pushPropertiesToMap("allConditionallyRequiredProperties", elseProperties);
      }
    });
  }
  // TODO: add the anyOf, and oneOf
  return requiredProperties;
}
/**
 * Recursively traverses the schema and creates an empty object of empty objects.
 * Will create an empty object if a property type is object AND the property has properties within it.
 * @param schema
 * @param values
 * @returns Empty object of empty objects that matches schema structure
 */
function createEmptyValues(schema, values = {}) {
  const properties = schema.properties;
  if (properties) {
    // for all entries in our properties
    return Object.entries(properties).reduce((acc, [key, value]) => {
      // if the property is an object and has properties inside of it
      if (value["type"] == "object" && Object.keys(value).includes("properties")) {
        // recursively call function on the nested object
        const maybe = createEmptyValues(value, values);
        if (maybe) {
          acc[key] = maybe;
        }
      }
      return acc;
    }, {});
  }
  return values;
}
function _parseClause(clause, isIfClause = false) {
  const clauseProperties = [];
  _parseClauseProperties(clause, clauseProperties, "", isIfClause);
  // get rid of any duplicates
  return [...new Set(clauseProperties)];
}
/**
  * Recursively parse the if clause.
   * ifClause could look like
   *
   * {
   *  "properties": {
   *  "prop": { "const": "value"}
   *   }
   * }
   *
   * in this case, we want "prop".
   *
   * ifClause could also look like
   *
   * { "properties": {"_metric": { "properties": { "prop": { "const": "value" }}}}}
   * where _metric could be anything, and it could be repeatedly nested.
   *
   * In this case, we want "_metric.prop".
   *
   * Finally, ifClause could look like
   *
   * { "properties": { "prop": { "const": "value" }}, "required": ["prop1"]}
   *
   * in this case, we'd want "prop" AND "prop1".
   *
   */
function _parseClauseProperties(clause, clauseProperties, currentPrefix, isIfClause = false) {
  const properties = clause.properties;
  const required = clause.required;
  if (required) {
    clauseProperties.push(...required.map((prop) => `${currentPrefix}${prop}`));
  }
  if (properties) {
    Object.entries(properties).forEach(([key, value]) => {
      // if has properties
      if (value["properties"] || value["required"]) {
        const newPrefix = `${currentPrefix}${key}.`;
        _parseClauseProperties(value, clauseProperties, newPrefix, isIfClause);
      }
      // we've hit a condition, but only add if we want from the if clauses
      else {
        isIfClause && clauseProperties.push(`${currentPrefix}${key}`);
      }
    });
  }
}

/**
 * Utility function to clear a value from the current configuration values object.
 * Acts differently depending on if the property is top-level or nested.
 * If setProp allows for setting a value to undefined, this function would not be needed and
 * could be replaced by setProp.
 * @param property
 * @param values
 */
function clearValue(property, values) {
  // if top-level, we have to manually set it to undefined so that an overwrite will work as expected
  // TODO: a better solution here is a setProp util that allows us to set a property to undefined
  if (Object.keys(values).includes(property)) {
    values[property] = undefined;
  }
  else {
    deleteProp(values, property);
  }
}
/**
 * Util to clear values from fields that have just been hidden according to the uiSchema whitelist.
 * Only clears values that have the clearOnHidden option enabled on the uiSchemaElement.
 * @param whiteList
 * @param previousWhiteList
 * @param clearOnHidden
 * @param values
 */
function clearValuesFromHiddenFields(whiteList, previousWhiteList, clearOnHidden, values) {
  // for each element that was hidden, clear its value, if the uiSchema rule dictates it
  clearOnHidden.forEach((id) => {
    const propertyPath = getPropertyPathFromId(id);
    const isElementHidden = !whiteList.includes(id) && previousWhiteList.includes(id);
    if (isElementHidden) {
      clearValue(propertyPath, values);
    }
  });
}

/**
 * Renders the "*indicates required field" helper text for a given uiSchema element.
 * Can also render a custom required helper text if provided in the uiSchema.
 * @param uiSchema
 * @param t
 * @param intl
 * @returns
 */
function renderRequiredHelperText(uiSchema, t, intl) {
  const helperText = getLabel(uiSchema, t, 'options.requiredHelperText') || intl.t("defaultRequiredHelperText");
  return h("calcite-input-message", { class: "helper-text" },
    " ",
    h("div", { innerHTML: helperText }),
    " ");
}
/**
 * Determines if the current section should render required helper text
 * This is automated by checking if the current section has any required fields and is configured to render required helper text
 * The check for required fields in the section can be overriden by providing a custom requiredHelperText in the uiSchema.
 * @param model
 * @param uiSchema
 * @returns
 */
function shouldRenderRequiredHelperText(model, uiSchema) {
  var _a, _b, _c;
  const requiredFields = model === null || model === void 0 ? void 0 : model.required;
  const sectionFields = (_a = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.options) === null || _a === void 0 ? void 0 : _a.sectionScopes;
  const hasRequiredFields = sectionFields === null || sectionFields === void 0 ? void 0 : sectionFields.some((field) => requiredFields === null || requiredFields === void 0 ? void 0 : requiredFields.has(field));
  return (!!hasRequiredFields && !!((_b = uiSchema.options) === null || _b === void 0 ? void 0 : _b.requiredHelperText)) || typeof ((_c = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.options) === null || _c === void 0 ? void 0 : _c.requiredHelperText) == "object";
}

const arcgisConfigurationEditorCss = ".sc-arcgis-configuration-editor-h{display:block}.sc-arcgis-configuration-editor-h:focus-visible{outline:none}arcgis-configuration-editor-field.sc-arcgis-configuration-editor{display:block}arcgis-configuration-editor-field.sc-arcgis-configuration-editor:not(:last-child){margin-bottom:0.25rem}arcgis-hub-notice.sc-arcgis-configuration-editor{margin-bottom:2rem}calcite-stepper-item.sc-arcgis-configuration-editor .helper-text.sc-arcgis-configuration-editor{margin-top:-1.5rem;margin-bottom:1.5rem}calcite-stepper-item.sc-arcgis-configuration-editor .helper-text--left.sc-arcgis-configuration-editor>.helper-text.sc-arcgis-configuration-editor,calcite-stepper-item.sc-arcgis-configuration-editor .helper-text--right.sc-arcgis-configuration-editor>.helper-text.sc-arcgis-configuration-editor{margin-top:0px}";

const ArcgisConfigurationEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorChange = createEvent(this, "arcgisConfigurationEditorChange", 7);
    this.arcgisConfigurationEditorInitialized = createEvent(this, "arcgisConfigurationEditorInitialized", 7);
    this.arcgisConfigurationEditorLoaded = createEvent(this, "arcgisConfigurationEditorLoaded", 7);
    this.arcgisConfigurationEditorSectionAction = createEvent(this, "arcgisConfigurationEditorSectionAction", 7);
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
          const elementSchema = jsonPointer.get(this._schema, element.scope);
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
        const elementSchema = jsonPointer.get(schema, element.scope);
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
        let schema = jsonPointer.get(this._schema, uiSchemaElement.scope);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "uiSchema": ["handleUiSchemaChange"],
    "schema": ["handleSchemaChange"],
    "values": ["handleValuesChange"]
  }; }
};
ArcgisConfigurationEditor.style = arcgisConfigurationEditorCss;

const arcgisConfigurationEditorFieldCss = ".disabled-text{min-height:44px;display:flex;align-items:center}calcite-label span{display:flex;align-items:center;gap:0.5rem}calcite-label calcite-input-message{margin-top:0px}calcite-label[layout=\"inline-space-between\"] .helper-text{margin-top:0.5rem}.field-container calcite-input-message,.message-container calcite-input-message,.helper-text{font-weight:var(--calcite-font-weight-normal)}.helper-text{padding-top:0.75rem}[scale=\"s\"] calcite-input-message{font-size:var(--calcite-font-size--3);line-height:0.75rem}[scale=\"l\"] calcite-input-message{font-size:var(--calcite-font-size--1);line-height:1rem}.message-notice-container{max-width:20rem}.field-container{margin-bottom:0.5rem;display:flex;flex-direction:column;gap:0.5rem}.field-container-inline{align-self:flex-start}.field-message{display:flex;flex-direction:row;align-items:center;justify-content:flex-start}.field-message calcite-icon.error{--calcite-ui-icon-color:var(--calcite-color-status-danger);margin:0.25rem}.field-message calcite-icon.success{--calcite-ui-icon-color:var(--calcite-color-status-success);margin:0.25rem}.field-message calcite-icon.custom{margin:0.25rem}";

const ArcgisConfigurationEditorField = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisConfigurationEditorFieldChange = createEvent(this, "arcgisConfigurationEditorFieldChange", 7);
    /**
     * mapping of supported composite fields (i.e. fields that render the
     * configuration editor themselves) to their field change event
     */
    this.compositeFields = {
      'arcgis-hub-timeline-editor': {
        inputChange: 'arcgisHubTimelineEditorChange'
      },
      'hub-composite-input-icon': {
        inputChange: 'arcgisCompositeIconFieldChange'
      },
      'hub-composite-input-service-query-metric': {
        inputChange: 'arcgisCompositeServiceQueryMetricFieldChange',
      },
      'hub-composite-input-expression-set': {
        inputChange: 'arcgisCompositeExpressionSetFieldChange',
      },
      'hub-composite-input-action-links': {
        values: 'links',
        inputChange: 'arcgisCompositeActionLinksFieldChange'
      },
      'arcgis-hub-access-level-controls': {
        values: 'accessLevel',
        inputChange: 'arcgisHubItemAccessLevelChange'
      },
      'arcgis-hub-license-picker': {
        inputChange: 'arcgisHubLicensePickerChange',
        values: 'licenseInfo'
      },
      'arcgis-privacy-config': {
        inputChange: 'hubPrivacyPreferencesConfigChanged',
        values: 'config'
      },
      'hub-composite-input-map-settings': {
        values: 'settings',
        inputChange: 'arcgisCompositeMapSettingsFieldChange'
      },
      'hub-composite-input-embed': {
        inputChange: 'arcgisCompositeEmbedFieldChange',
        values: 'embed'
      },
      'hub-composite-input-embeds': {
        inputChange: 'arcgisCompositeEmbedsFieldChange',
        values: 'embeds'
      },
      'hub-composite-input-site-url': {
        inputChange: 'arcgisCompositeSiteUrlFieldChange',
        // would be great if we could do something like this:
        // values: ['default-hostname', 'subdomain']
        values: 'urlInfo'
      },
      'arcgis-hub-catalog-builder': {
        values: 'catalog',
        inputChange: 'arcgisHubCatalogBuilderChange'
      },
      'arcgis-hub-collections-builder': {
        inputChange: 'arcgisHubCollectionsBuilderChange'
      },
      'arcgis-hub-query-builder': {
        values: 'query',
        inputChange: 'arcgisHubQueryBuilderChange'
      },
      'arcgis-hub-filters-builder': {
        values: 'filters',
        inputChange: 'arcgisHubFiltersBuilderChange'
      },
      'arcgis-hub-predicates-builder': {
        values: 'predicates',
        inputChange: 'arcgisHubPredicatesBuilderChange'
      },
      'arcgis-hub-catalog-appearance-builder': {
        values: 'catalogDisplayConfig',
        inputChange: 'arcgisHubCatalogAppearanceBuilderChange'
      },
      'arcgis-hub-collections-appearance-builder': {
        values: 'displayConfig',
        inputChange: 'arcgisHubCollectionsAppearanceBuilderChange'
      },
      'arcgis-hub-results-appearance-builder': {
        values: 'displayConfig',
        inputChange: 'arcgisHubResultsAppearanceBuilderChange'
      },
    };
    this.property = undefined;
    this.schema = undefined;
    this.uiSchema = undefined;
    this.model = undefined;
    this.value = undefined;
    this.invalid = false;
    this.messages = [];
    this.disabled = false;
    this.required = false;
    this.t = undefined;
    this.scale = undefined;
    this.shouldShowMessages = false;
    bind(this, 'handleFieldInputChange');
  }
  componentWillLoad() {
    this.shouldShowMessages = !!this.value;
  }
  /**
   * Contextual auth & portal information
   */
  get _context() {
    return getGlobalContext();
  }
  get fieldLabel() {
    const label = getLabel(this.uiSchema, this.t);
    if (label) {
      return this.required ? `${label}*` : label;
    }
  }
  get hasHelperText() {
    var _a, _b;
    return (_b = (_a = this.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.helperText;
  }
  get hasTooltip() {
    var _a, _b;
    return (_b = (_a = this.uiSchema) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.tooltip;
  }
  get isDisabled() {
    return this.disabled || !isNil(this.schema.const);
  }
  get status() {
    let _status = this.invalid ? 'invalid' : 'idle';
    _status = this.shouldShowMessages ? _status : 'idle';
    return _status;
  }
  /**
   * the field value is the first of the following conditions that is met:
   * 1. the provided value
   * 2. the default value defined on the schema
   * 3. the constant value defined on the schema
   * 4. the default value based on the field type
   */
  get _value() {
    return [
      this.value,
      this.schema.default,
      this.schema.const,
      SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE[this.schema.type]
    ].find((value) => {
      var _a;
      // we check to see if this is a number type, as null
      // is the empty value state for number types, versus
      // string having an empty value state of an empty string
      const isNumber = typeof this.schema.type === 'string'
        ? this.schema.type === 'number'
        : (_a = this.schema.type) === null || _a === void 0 ? void 0 : _a.includes('number');
      return isNumber ? !isNaN(value) : !isNil(value);
    });
  }
  get fieldTelemetryLabel() {
    // some schemas can have nested properties, so we pop
    // off the last part of the property path to format as
    // a consistent telemetry label for this field
    const _property = this.property.split('.').pop();
    return dasherize(_property)
      .split('-')
      .map(capitalize)
      .join(' ');
  }
  /**
   * compiled parameters to pass into each field-input component
   * as a single "params" prop
   */
  get fieldParams() {
    const { property, required, t, uiSchema, schema, status, disabled, _value, fieldLabel, fieldTelemetryLabel, model } = this;
    /**
     * Sometimes a field won't have its own label, but will be in a section
     * that has a label, and we'll want to pass this "implicit" label down to
     * the field itself (for a11y and telemetry purposes)
     *
     * To get this, we traverses the DOM to find the closest section element
     * (if there is one), and get its label (which we store in a data-label
     * attribute)
     */
    let label = fieldLabel;
    if (!label) {
      const closestSection = this.element.closest(".configuration-editor-section");
      label = (closestSection === null || closestSection === void 0 ? void 0 : closestSection.getAttribute('data-label')) || '';
    }
    return { value: _value, property, required, t, uiSchema, schema, status, disabled, model, label, telemetryLabel: fieldTelemetryLabel };
  }
  isCompositeField(name) {
    return !!this.compositeFields[name];
  }
  /**
   * handler function for the arcgisConfigurationEditorFieldInputChange event
   * which gets emitted every time the field input changes. This function
   * re-emits the updated field input value for the arcgis-configuration-editor
   * to validate and compile
   */
  handleFieldInputChange(evt) {
    var _a;
    evt.stopPropagation();
    let value = evt.detail;
    /**
     * we need to check if evt.detail is an array before checking if
     * values exists on evt.detail because values is a built-in method
     * on the array prototype
     */
    if (!Array.isArray(evt.detail) && ((_a = evt.detail) === null || _a === void 0 ? void 0 : _a.values)) {
      value = evt.detail.values;
    }
    this.arcgisConfigurationEditorFieldChange.emit({
      property: this.property,
      value
    });
    this.shouldShowMessages = true;
  }
  /**
   * If the uiSchema does not specify a specific control to render,
   * we fall-back to a default control based on the field's type
   */
  getDefaultControl(type) {
    const typeToDefault = {
      string: 'hub-field-input-input',
      boolean: 'hub-field-input-switch',
      array: 'hub-field-input-multiselect'
    };
    return typeToDefault[type];
  }
  getMessageIcon(icon, type, label) {
    let iconName;
    const shouldRenderIcon = isNil(icon) ? true : icon;
    if (type === UiSchemaMessageTypes.error && shouldRenderIcon) {
      iconName = label ? 'x-octagon' : 'exclamation-mark-circle';
    }
    else if (type === UiSchemaMessageTypes.success && shouldRenderIcon) {
      iconName = 'check-circle';
    }
    else if (type === UiSchemaMessageTypes.custom) {
      iconName = icon;
    }
    return iconName;
  }
  getMessageStatus(type) {
    switch (type) {
      case UiSchemaMessageTypes.error:
        return 'invalid';
      case UiSchemaMessageTypes.success:
        return 'valid';
      case UiSchemaMessageTypes.custom:
        return 'idle';
    }
  }
  renderMessages(messages) {
    return messages.reduce((acc, message) => {
      const { type, display, icon, kind, hidden, allowShowBeforeInteract } = message;
      if (allowShowBeforeInteract || this.shouldShowMessages) {
        const label = getLabel(message, this.t);
        const title = getTitle(message, this.t);
        const iconName = this.getMessageIcon(icon, type, label);
        const status = this.getMessageStatus(type);
        !hidden && acc.push(
        // NOTE: 'notice' is deprecated in 'messages' and will be removed in the future.
        // Please configure notices in UISchema as a standalone element instead.
        display === 'notice'
          ?
            h("div", { class: "message-notice-container" }, h("calcite-notice", { icon: icon, key: `${message.keyword}_${message.type}`, kind: kind, open: true, scale: this.scale }, title && (h("div", { slot: "title" }, title)), h("div", { slot: "message" }, label), message.link && this.renderNoticeLink(message)))
          : h("calcite-input-message", { icon: iconName, key: `${message.keyword}_${message.type}`, scale: this.scale, status: status }, label));
      }
      return acc;
    }, []);
  }
  // NOTE: 'notice' is deprecated in 'messages' and will be removed in the future.
  // Please configure notices in UISchema as a standalone element instead.
  renderNoticeLink(message) {
    let result = null;
    const link = message.link;
    switch (link.kind) {
      case 'external':
        result = (h("calcite-link", { href: link.href, iconEnd: "launch", slot: "link", target: link.target }, link.label));
        break;
      // TODO: add support for other link types
    }
    return result;
  }
  renderControl(params) {
    var _a, _b, _c;
    const { control, composite, changeEvent, styles } = ((_a = params.uiSchema) === null || _a === void 0 ? void 0 : _a.options) || {};
    const ControlComponent = control || this.getDefaultControl(params.schema.type);
    const isComposite = this.isCompositeField(control) || composite;
    const compositeValues = ((_b = this.compositeFields[control]) === null || _b === void 0 ? void 0 : _b.values) || 'values';
    const compositeFieldInputChangeEvent = ((_c = this.compositeFields[control]) === null || _c === void 0 ? void 0 : _c.inputChange) || changeEvent;
    const componentAttributes = isComposite
      ? Object.assign(Object.assign({ context: this._context, [compositeValues]: params.value }, params.uiSchema.options), { params: Object.assign({ scale: this.scale }, params), [`on${capitalize(compositeFieldInputChangeEvent)}`]: this.handleFieldInputChange }) : {
      context: this._context,
      params: Object.assign({ scale: this.scale }, params),
      styles,
      onArcgisConfigurationEditorFieldInputChange: this.handleFieldInputChange,
    };
    return ControlComponent && (h(ControlComponent, Object.assign({}, componentAttributes)));
  }
  renderTooltip(uiSchemaElement, t) {
    const refElementId = `arcgis-configuration-editor-field-tooltip-${Date.now()}`;
    const tooltip = getLabel(uiSchemaElement, t, 'options.tooltip');
    return (h(Fragment, null, h("calcite-icon", { icon: "information-f", id: refElementId, scale: "s" }), h("calcite-tooltip", { label: tooltip, "reference-element": refElementId }, tooltip)));
  }
  renderBlockField() {
    const { fieldLabel, hasTooltip, hasHelperText, messages, fieldParams } = this;
    const field = (h(Fragment, null, h("div", { class: "field-container" }, hasHelperText && renderHelperText(fieldParams.uiSchema, fieldParams.t), this.renderControl(fieldParams)), !!(messages === null || messages === void 0 ? void 0 : messages.length) && h("div", { class: "message-container" }, this.renderMessages(messages))));
    return fieldLabel
      ? h("calcite-label", { scale: this.scale }, h("span", null, fieldLabel, hasTooltip && this.renderTooltip(this.uiSchema, this.t)), field)
      : field;
  }
  renderInlineField() {
    var _a;
    const { fieldLabel, hasTooltip, fieldParams } = this;
    return (h(Fragment, null, h("calcite-label", { layout: "inline-space-between", scale: this.scale }, h("div", null, h("span", null, fieldLabel, hasTooltip && this.renderTooltip(fieldParams.uiSchema, fieldParams.t)), this.hasHelperText && renderHelperText(fieldParams === null || fieldParams === void 0 ? void 0 : fieldParams.uiSchema, fieldParams.t), !!((_a = this.messages) === null || _a === void 0 ? void 0 : _a.length) && h("div", { class: "message-container" }, this.renderMessages(this.messages))), h("div", { class: "field-container field-container-inline" }, this.renderControl(fieldParams)))));
  }
  render() {
    var _a, _b, _c;
    const isInline = ((_c = (_b = (_a = this.fieldParams) === null || _a === void 0 ? void 0 : _a.uiSchema) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.layout) === 'inline-space-between';
    return (h(Host, null, this.fieldLabel && isInline
      /*
        note we previously set the status on the field,
        but as of calcite-components 1.0.0, the status
        should be set on the component the label is bound to
        TODO: ensure that renderBlockField() and renderInlineField do that
      */
      ? this.renderInlineField()
      : this.renderBlockField()));
  }
  get element() { return getElement(this); }
};
ArcgisConfigurationEditorField.style = arcgisConfigurationEditorFieldCss;

const arcgisConfigurationEditorSectionCss = ".section__content{display:flex;flex-direction:column}.section__content calcite-input-message{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1)}.helper-text--right{flex-direction:row-reverse;align-items:flex-start;gap:1.25rem}.helper-text--left{flex-direction:row;align-items:flex-start;gap:1.25rem}.helper-text--right calcite-input-message,.helper-text--left calcite-input-message{flex-basis:20%}.helper-text--right .section__fields,.helper-text--left .section__fields{flex-basis:80%}arcgis-configuration-editor-section+arcgis-configuration-editor-field{margin-top:0.75rem}";

const ArcgisConfigurationEditorSection = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.disabled = undefined;
    this.label = undefined;
    this.model = undefined;
    this.uiSchema = undefined;
    this.scale = 'm';
    this.t = undefined;
    this.variant = undefined;
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Determines if the current section is either:
   * a. the last section in a series of sections/fields
   * b. a section before a field
   *
   * we use this to stamp a class onto the child
   * section component to conditionally apply
   * bottom margins to sections
   */
  get isLastSection() {
    const sibling = this.element.nextElementSibling;
    const hasSibling = !!sibling;
    const isSiblingAField = hasSibling && sibling.tagName === "ARCGIS-CONFIGURATION-EDITOR-FIELD";
    return !hasSibling || isSiblingAField;
  }
  /**
   * The following provides a mapping of section
   * types to section component names
   */
  get sectionComponent() {
    var _a;
    const type = (_a = this.uiSchema.options) === null || _a === void 0 ? void 0 : _a.section;
    return {
      accordion: "hub-section-accordion",
      accordionItem: "hub-section-accordion-item",
      block: "hub-section-block",
      stepper: "hub-section-stepper",
      subblock: "hub-section-subblock",
      card: "hub-section-card"
    }[type] || "hub-section-basic";
  }
  /**
   * compiled parameters that get passed down to the
   * individual section component
   */
  get sectionParams() {
    return {
      disabled: this.disabled,
      label: this.label,
      model: this.model,
      uiSchema: this.uiSchema,
      scale: this.scale,
      t: this.t,
      variant: this.variant
    };
  }
  /** section helper text */
  get helperText() {
    var _a;
    return ((_a = this.uiSchema.options) === null || _a === void 0 ? void 0 : _a.helperText) || {};
  }
  renderNestedSection() {
    return h("slot", null);
  }
  renderSectionContent() {
    const hasHelperText = !!(this.helperText.label || this.helperText.labelKey);
    return (h("div", { class: {
        "section__content": true,
        [`helper-text--${this.helperText.placement}`]: hasHelperText && !!this.helperText.placement
      } }, hasHelperText && renderHelperText(this.uiSchema, this.t), shouldRenderRequiredHelperText(this.model, this.uiSchema) && renderRequiredHelperText(this.uiSchema, this.t, this._intl), h("div", { class: "section__fields" }, h("slot", null))));
  }
  render() {
    var _a;
    const SectionComponent = this.sectionComponent;
    return (h(Host, null, h(SectionComponent, { class: { ["configuration-editor__last-child"]: this.isLastSection }, params: this.sectionParams }, ["stepper", "accordion"].includes((_a = this.uiSchema.options) === null || _a === void 0 ? void 0 : _a.section)
      ? this.renderNestedSection()
      : this.renderSectionContent())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisConfigurationEditorSection.style = arcgisConfigurationEditorSectionCss;

export { ArcgisConfigurationEditor as arcgis_configuration_editor, ArcgisConfigurationEditorField as arcgis_configuration_editor_field, ArcgisConfigurationEditorSection as arcgis_configuration_editor_section };
