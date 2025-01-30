import { Host, Fragment, h } from '@stencil/core';
import { bind } from '../../../../../../../utils/context';
import { DEFAULT_FIELD_TO_RELATIONSHIP, ExpressionRelationships, getSchema, getUiSchema } from './resources';
import { createId } from '@esri/hub-common';
import { getIconForFieldType } from '../../../../../../../utils/feature-service';
import intlManager from '../../../../../../../utils/intl-manager';
import { isNil } from '../../../../../../../utils/is-nil';
import { connectContext, getGlobalContext } from '../../../../../../../utils/state';
export class ExpressionSet {
  constructor() {
    this.values = {};
    this.fields = [];
    this.expressions = [];
    this._context = getGlobalContext();
    bind(this, 'translationFunc', 'handleEditorChangeEvent', 'handleAddExpression', 'handleDeleteExpression');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // set starting values correctly
    if (this.values) {
      // ensure expressions are filled out adequately if they have been migrated over
      this.expressions = this.repairExpressionsFromMigration(this.values);
      // then transform them to schema values to pass to config editor
      this.internalValues = this.transformExpressionsToSchemaValues(this.expressions);
    }
    this._uiSchema = getUiSchema(this.getUiSchemaElements(this.expressions));
    this._schema = getSchema(this.getSchemaProperties(this.expressions));
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
          const readOnlyValue = this.intl.t((ex === null || ex === void 0 ? void 0 : ex.relationship) || DEFAULT_FIELD_TO_RELATIONSHIP[fieldType]);
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
            items: (_b = this.fields) === null || _b === void 0 ? void 0 : _b.map(field => { return { value: field.name, label: field.name, icon: getIconForFieldType(field.type) }; }),
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
        ex.key = createId('expression-');
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
    ;
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
      expression.relationship = ExpressionRelationships.IS_EXACTLY :
      expression.relationship = ExpressionRelationships.BETWEEN;
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
    if (!isNil(value1)) {
      newExpressionValues[0] = value1;
    }
    ;
    if (!isNil(value2)) {
      newExpressionValues[1] = value2;
    }
    ;
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
    this._schema = getSchema(this.getSchemaProperties(expressions));
  }
  updateUiSchema(expressions) {
    this._uiSchema = getUiSchema(this.getUiSchemaElements(expressions));
  }
  handleAddExpression() {
    // create a new expression and add to the list
    const expressions = [...this.expressions];
    const newExpression = {
      values: [],
      key: createId('expression-'),
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
    return (h(Fragment, null, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChangeEvent, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.internalValues || this.values }), h("calcite-button", { appearance: 'outline-fill', color: 'blue', iconStart: "filter", onClick: this.handleAddExpression, round: true }, this.intl.t("addFilter"))));
  }
  render() {
    return (h(Host, null, this.renderExpressionSet()));
  }
  static get is() { return "hub-composite-input-expression-set"; }
  static get originalStyleUrls() {
    return {
      "$": ["expression-set.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["expression-set.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "values": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
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
          "text": ""
        },
        "defaultValue": "{}"
      },
      "fields": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IField[]",
          "resolved": "IField[]",
          "references": {
            "IField": {
              "location": "import",
              "path": "@esri/arcgis-rest-feature-layer"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "expressions": {},
      "_context": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisCompositeExpressionSetFieldChange",
        "name": "arcgisCompositeExpressionSetFieldChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IHubCompositeInputExpressionSet",
          "resolved": "IExpression[]",
          "references": {
            "IHubCompositeInputExpressionSet": {
              "location": "import",
              "path": "./resources"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "_context",
        "methodName": "updateUiSchema"
      }, {
        "propName": "fields",
        "methodName": "resetExpressions"
      }];
  }
}
