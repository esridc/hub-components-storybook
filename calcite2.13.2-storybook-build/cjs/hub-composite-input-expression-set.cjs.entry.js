'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const resources = require('./resources-e64df288.js');
const featureService = require('./feature-service-49ec8903.js');
const intlManager = require('./intl-manager-f0103583.js');
const isNil = require('./is-nil-e28a2884.js');
const state = require('./state-6637df8c.js');
const util = require('./util-38e73510.js');
require('./fetchHubEntity-88467d55.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./get-prop-4bd8fc1a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./HubInitiatives-25ecf40a.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');

const expressionSetCss = "arcgis-configuration-editor{margin-top:0.5rem;margin-bottom:0.5rem}";

const ExpressionSet = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisCompositeExpressionSetFieldChange = index.createEvent(this, "arcgisCompositeExpressionSetFieldChange", 7);
    this.values = {};
    this.fields = [];
    this.expressions = [];
    this._context = state.getGlobalContext();
    context.bind(this, 'translationFunc', 'handleEditorChangeEvent', 'handleAddExpression', 'handleDeleteExpression');
  }
  connectedCallback() {
    state.connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    // set starting values correctly
    if (this.values) {
      // ensure expressions are filled out adequately if they have been migrated over
      this.expressions = this.repairExpressionsFromMigration(this.values);
      // then transform them to schema values to pass to config editor
      this.internalValues = this.transformExpressionsToSchemaValues(this.expressions);
    }
    this._uiSchema = resources.getUiSchema(this.getUiSchemaElements(this.expressions));
    this._schema = resources.getSchema(this.getSchemaProperties(this.expressions));
  }
  getSchemaProperties(expressions) {
    return expressions === null || expressions === void 0 ? void 0 : expressions.reduce((acc, ex) => {
      var _a, _b;
      if (ex) {
        // create the initial combobox field
        const fieldType = (_a = ex === null || ex === void 0 ? void 0 : ex.field) === null || _a === void 0 ? void 0 : _a.type;
        const fieldNames = (_b = this.fields) === null || _b === void 0 ? void 0 : _b.map(field => field.name);
        const combobox = {
          type: 'string',
          enum: [...fieldNames, ''],
        };
        acc = Object.assign(Object.assign({}, acc), { [`combobox-${ex.key}`]: combobox });
        // if we have a field chosen, can render the value input
        if (fieldType) {
          // add read only select specifying the relationship, ex. "Between", "Is Exactly"
          // this could be extended to not be read-only in the future, but for now it is
          // const readOnlyValue = fieldType === 'esriFieldTypeString' ? this.intl.t("isExactly") : this.intl.t("between");
          const readOnlyValue = this.intl.t((ex === null || ex === void 0 ? void 0 : ex.relationship) || resources.DEFAULT_FIELD_TO_RELATIONSHIP[fieldType]);
          const readOnlySelect = {
            type: 'string',
            default: readOnlyValue,
            enum: [readOnlyValue]
          };
          acc = Object.assign(Object.assign({}, acc), { [`select-${ex.key}`]: readOnlySelect });
          const value1 = fieldType === 'esriFieldTypeString' || fieldType === 'esriFieldTypeDate'
            ?
              { type: 'string' }
            :
              { type: 'number' };
          acc = Object.assign(Object.assign({}, acc), { [`value-1-${ex.key}`]: value1 });
          // only create second input for certain field types
          // later this will be based off of read-only select value
          if (fieldType !== 'esriFieldTypeString') {
            const value2 = {
              type: fieldType === 'esriFieldTypeDate' ? 'string' : 'number'
            };
            acc = Object.assign(Object.assign({}, acc), { [`value-2-${ex.key}`]: value2 });
          }
        }
      }
      return acc;
    }, {});
  }
  getUiSchemaElements(expressions) {
    return expressions === null || expressions === void 0 ? void 0 : expressions.reduce((acc, expression) => {
      var _a, _b, _c, _d, _e, _f, _g;
      if (expression) {
        // initialize elements and determine field type
        const elements = [];
        const fieldType = (_a = expression === null || expression === void 0 ? void 0 : expression.field) === null || _a === void 0 ? void 0 : _a.type;
        // create combobox
        const combobox = {
          scope: `/properties/combobox-${expression.key}`,
          type: 'Control',
          label: this.intl.t("selectAttribute"),
          options: {
            control: 'hub-field-input-combobox',
            items: (_b = this.fields) === null || _b === void 0 ? void 0 : _b.map(field => { return { value: field.name, label: field.name, icon: featureService.getIconForFieldType(field.type) }; }),
            allowCustomValues: false,
            selectionMode: 'single',
            overlayPositioning: 'fixed',
          }
        };
        elements.push(combobox);
        // create read-only select
        if (fieldType) {
          const select = {
            scope: `/properties/select-${expression.key}`,
            type: 'Control',
            label: this.intl.t("filterType"),
            options: {
              control: 'hub-field-input-select',
              disabled: true,
            }
          };
          elements.push(select);
          let value1Options = {};
          let label;
          if (fieldType === "esriFieldTypeString") {
            label = this.intl.t("filterValue");
            value1Options = ((_e = (_d = (_c = expression === null || expression === void 0 ? void 0 : expression.field) === null || _c === void 0 ? void 0 : _c.domain) === null || _d === void 0 ? void 0 : _d.codedValues) === null || _e === void 0 ? void 0 : _e.length) ? {
              control: 'hub-field-input-combobox',
              allowCustomValues: false,
              selectionMode: 'single',
              overlayPositioning: 'fixed',
              items: (_g = (_f = expression === null || expression === void 0 ? void 0 : expression.field) === null || _f === void 0 ? void 0 : _f.domain) === null || _g === void 0 ? void 0 : _g.codedValues.map(v => { return { value: v.name, label: v.name }; })
            }
              : { control: 'hub-field-input-input' };
          }
          else if (fieldType === "esriFieldTypeDate") {
            label = this.intl.t("startingDate");
            value1Options = { control: 'hub-field-input-date', overlayPositioning: 'fixed' };
          }
          else {
            label = this.intl.t("startingValue");
            value1Options = { control: 'hub-field-input-input', type: 'number' };
          }
          const value1 = {
            scope: `/properties/value-1-${expression.key}`,
            type: 'Control',
            label,
            options: value1Options,
          };
          elements.push(value1);
          // later todo: this will be determined by the select filter chosen instead of the field type
          if (fieldType !== "esriFieldTypeString") {
            let value2Options = {};
            value2Options = fieldType === "esriFieldTypeDate" ? { control: 'hub-field-input-date', overlayPositioning: 'fixed' } : { control: 'hub-field-input-input', type: 'number' };
            const label = fieldType === "esriFieldTypeDate" ? this.intl.t("endingDate") : this.intl.t("endingValue");
            const value2 = {
              scope: `/properties/value-2-${expression.key}`,
              type: 'Control',
              label,
              options: value2Options,
            };
            elements.push(value2);
          }
        }
        // finally add to section
        const section = {
          type: 'Section',
          label: this.intl.t("attributeFilter"),
          options: {
            section: 'block',
            scale: "s",
            collapsible: false,
            open: true,
            actions: [
              {
                alignment: "end",
                icon: "trash",
                key: expression.key,
                label: this.intl.t("deleteFilter"),
                onClick: this.handleDeleteExpression,
                scale: "s",
                textEnabled: true,
              }
            ]
          },
          elements,
        };
        acc = [...acc, section];
      }
      return acc;
    }, []);
  }
  /**
   * Function to ensure expressions have every part necessary to render correctly, in case
   * an expression was incomplete during a migration.
   * @param values
   * @returns expressions IExpression[]
   */
  repairExpressionsFromMigration(values) {
    return values.map(ex => {
      var _a, _b;
      // ensure each expression has a unique key
      if (!ex.key) {
        ex.key = util.createId('expression-');
      }
      // during migration, the field type may not have been determinable from the expression.
      // in that case, we replace full field here
      if (!((_a = ex.field) === null || _a === void 0 ? void 0 : _a.type) && ((_b = ex.field) === null || _b === void 0 ? void 0 : _b.name)) {
        const fieldName = ex.field.name;
        const field = this.fields.find(field => field.name === fieldName);
        ex.field = field;
      }
      return ex;
    });
  }
  /**
   * allows the starting expressions passed down to be separated out into
   * renderable configuration editor values
   */
  transformExpressionsToSchemaValues(expressions) {
    return expressions.reduce((acc, ex) => {
      const { key, values = [], field } = ex;
      acc = Object.assign(Object.assign({}, acc), { [`combobox-${key}`]: field === null || field === void 0 ? void 0 : field.name, [`value-1-${key}`]: values[0], [`value-2-${key}`]: values[1] });
      return acc;
    }, {});
  }
  handleEditorChangeEvent(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const { valid, values } = event.detail;
    this.updateExpressionsAndValuesOnChange(this.expressions, values, this.fields);
    this.isValid = valid;
    if (valid) {
      this.arcgisCompositeExpressionSetFieldChange.emit(this.expressions);
    }
  }
  updateExpressionsAndValuesOnChange(expressions, values, fields) {
    let needToUpdateSchema = false;
    const newExpressions = expressions.reduce((acc, currentExpression) => {
      var _a, _b, _c;
      let newExpression = { key: currentExpression.key, values: [] };
      const fieldValue = values[`combobox-${currentExpression === null || currentExpression === void 0 ? void 0 : currentExpression.key}`];
      // if we have a field, do the updates
      if (fieldValue) {
        newExpression = this.updateExpressionField(newExpression, fieldValue, fields);
        newExpression = this.updateExpressionRelationship(newExpression);
        newExpression = this.updateExpressionValues(newExpression, currentExpression, values);
        values = this.updateInternalValues(newExpression, values);
      }
      // if the new expression has a different name
      // or the value is empty and the current expression has no name, we should update to get rid of the empty expression
      if (((_a = newExpression === null || newExpression === void 0 ? void 0 : newExpression.field) === null || _a === void 0 ? void 0 : _a.name) !== ((_b = currentExpression === null || currentExpression === void 0 ? void 0 : currentExpression.field) === null || _b === void 0 ? void 0 : _b.name) || (fieldValue == '' && ((_c = currentExpression.field) === null || _c === void 0 ? void 0 : _c.name) !== undefined)) {
        needToUpdateSchema = true;
      }
      acc = [...acc, newExpression];
      return acc;
    }, []);
    if (needToUpdateSchema) {
      this.updateSchema(newExpressions);
      this.updateUiSchema(newExpressions);
    }
    this.expressions = newExpressions;
    this.internalValues = values;
  }
  updateExpressionField(expression, fieldValue, fields) {
    const field = fields.find(field => field.name === fieldValue);
    if (field) {
      expression.field = field;
    }
    return expression;
  }
  updateExpressionRelationship(expression) {
    var _a;
    // right now this is determined solely based on field value
    // later, this can be determined by the actual select value a user chooses
    expression.relationship = ((_a = expression === null || expression === void 0 ? void 0 : expression.field) === null || _a === void 0 ? void 0 : _a.type) === 'esriFieldTypeString' ?
      expression.relationship = resources.ExpressionRelationships.IS_EXACTLY :
      expression.relationship = resources.ExpressionRelationships.BETWEEN;
    return expression;
  }
  updateExpressionValues(newExpression, currentExpression, values) {
    var _a, _b;
    /*
    If we switch from Field A to Field B, the keys do not change -- but we don't want
    any values associated with Field A to apply to Field B without displaying.

    It's fine for a string field -- the old value will just appear and apply for
    the new field. But if we switch from a string field to a date field,
    we'll have a string value applied as a date without it appearing in the date-picker
    until the user selects a date to filter by. So, we reset values if we select a new field.
    **/
    if (((_a = newExpression === null || newExpression === void 0 ? void 0 : newExpression.field) === null || _a === void 0 ? void 0 : _a.name) !== ((_b = currentExpression === null || currentExpression === void 0 ? void 0 : currentExpression.field) === null || _b === void 0 ? void 0 : _b.name)) {
      values[`value-1-${newExpression === null || newExpression === void 0 ? void 0 : newExpression.key}`] = undefined;
      values[`value-2-${newExpression === null || newExpression === void 0 ? void 0 : newExpression.key}`] = undefined;
    }
    const value1 = values[`value-1-${newExpression === null || newExpression === void 0 ? void 0 : newExpression.key}`];
    const value2 = values[`value-2-${newExpression === null || newExpression === void 0 ? void 0 : newExpression.key}`];
    const newExpressionValues = [];
    if (!isNil.isNil(value1)) {
      newExpressionValues[0] = value1;
    }
    if (!isNil.isNil(value2)) {
      newExpressionValues[1] = value2;
    }
    newExpression.values = newExpressionValues;
    return newExpression;
  }
  updateInternalValues(newExpression, values) {
    // we need to make sure the new expression's select value is correct
    if (newExpression.key && newExpression.relationship) {
      values[`select-${newExpression.key}`] = this.intl.t(newExpression.relationship);
    }
    return values;
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  updateSchema(expressions) {
    this._schema = resources.getSchema(this.getSchemaProperties(expressions));
  }
  updateUiSchema(expressions) {
    this._uiSchema = resources.getUiSchema(this.getUiSchemaElements(expressions));
  }
  handleAddExpression() {
    // create a new expression and add to the list
    const expressions = [...this.expressions];
    const newExpression = {
      values: [],
      key: util.createId('expression-'),
    };
    expressions.push(newExpression);
    this.updateSchema(expressions);
    this.updateUiSchema(expressions);
    // update new expressions
    this.expressions = expressions;
  }
  handleDeleteExpression(e) {
    const el = e.target;
    const keyToDelete = el === null || el === void 0 ? void 0 : el.getAttribute('data-key');
    let expressions = [...this.expressions];
    // remove deleted expression from expressions array
    expressions = expressions.reduce((acc, ex) => {
      if (ex.key !== keyToDelete) {
        acc = [...acc, ex];
      }
      return acc;
    }, []);
    this.updateSchema(expressions);
    this.updateUiSchema(expressions);
    this.arcgisCompositeExpressionSetFieldChange.emit(expressions);
    this.expressions = expressions;
  }
  // update expressions on fields list change in case mismatch in new fields
  resetExpressions(newFields) {
    let expressions = [...this.expressions];
    const oldLength = expressions.length;
    // TODO: is there a more efficient way to do this?
    expressions = expressions.filter(ex => newFields.find(f => { var _a, _b; return f.name === ((_a = ex === null || ex === void 0 ? void 0 : ex.field) === null || _a === void 0 ? void 0 : _a.name) && f.type === ((_b = ex === null || ex === void 0 ? void 0 : ex.field) === null || _b === void 0 ? void 0 : _b.type); }));
    this.updateSchema(expressions);
    this.updateUiSchema(expressions);
    if (this.expressions.length !== oldLength) {
      this.arcgisCompositeExpressionSetFieldChange.emit(expressions);
    }
    this.expressions = expressions;
  }
  renderExpressionSet() {
    if (!this.fields.length) {
      return;
    }
    return (index.h(index.Fragment, null, index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChangeEvent, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.internalValues || this.values }), index.h("calcite-button", { appearance: 'outline-fill', color: 'blue', iconStart: "filter", onClick: this.handleAddExpression, round: true }, this.intl.t("addFilter"))));
  }
  render() {
    return (index.h(index.Host, null, this.renderExpressionSet()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "_context": ["updateUiSchema"],
    "fields": ["resetExpressions"]
  }; }
};
ExpressionSet.style = expressionSetCss;

exports.hub_composite_input_expression_set = ExpressionSet;
