import { h, Host } from '@stencil/core';
import { cloneObject } from '@esri/hub-common';
import { getGlobalContext, interpolateTranslations } from '../../../../../../../utils';
import { buildPredicateBuilderSchema, buildPredicateBuilderUiSchema } from './schemas';
import intlManager from '../../../../../../../utils/intl-manager';
import { EVENT_PREDICATE_PROPERTIES, ITEM_PREDICATE_PROPERTIES } from './types';
import { mergeDeep } from '../../../../../../../utils/object';
import { getPredicateConfig } from './utils/getPredicateConfig';
import { isFieldEmpty } from '../../../../../utils';
/**
 * The `arcgis-hub-predicates-builder` is a composite field for
 * configuring an array of `IPredicate`. See readme for additional
 * details.
 */
export class ArcgisHubPredicatesBuilder {
  constructor() {
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    this.handlePredicatesEditorChange = async (evt) => {
      const { values } = evt.detail;
      evt.stopPropagation();
      const _predicate = mergeDeep(cloneObject(this._predicates[0]), cloneObject(values));
      this._predicates = [_predicate];
      const transformedPredicates = await this.transformPredicatesToEmit(this._predicates);
      // despite being called the predicates editor, we currently
      // only support a single predicate being configured. We need
      // to ensure that this predicate is "complete" before emitting;
      // i.e. it has a property, operator, and value
      const isComplete = ["property", "operator", "value"].every((key) => {
        const hasField = Object.keys(_predicate).includes(key);
        return hasField && !isFieldEmpty(_predicate[key]);
      });
      this.arcgisHubPredicatesBuilderChange.emit(isComplete ? transformedPredicates : []);
    };
    this.predicates = undefined;
    this.targetEntity = undefined;
    this.availablePredicateProperties = [];
    this._isLoading = undefined;
    this._schema = undefined;
    this._uiSchema = undefined;
    this._predicates = undefined;
  }
  async buildSchemas() {
    await Promise.all([this.buildSchema(), this.buildUiSchema()]);
  }
  ;
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  async init() {
    this._isLoading = true;
    this._predicates = await this.transformPredicatesForEditor(this.predicates);
    this._isLoading = false;
  }
  get _context() {
    return getGlobalContext();
  }
  /**
   * predicate properties to present as "Parameter" options. If
   * none are provided, we default to all properties available
   * for the targetEntity
   */
  get _predicateProperties() {
    return this.availablePredicateProperties.length
      ? this.availablePredicateProperties
      : this._defaultPredicateProperties;
  }
  /**
   * if availablePredicateProperties are not provided, we
   * default to all properties available for the targetEntity
   */
  get _defaultPredicateProperties() {
    let properties;
    switch (this.targetEntity) {
      case "item":
        properties = ITEM_PREDICATE_PROPERTIES;
        break;
      case "event":
        properties = EVENT_PREDICATE_PROPERTIES;
        break;
    }
    return properties;
  }
  /** function to dynamically generate the predicate builder schema */
  async buildSchema() {
    this._schema = await buildPredicateBuilderSchema({
      properties: this._predicateProperties,
      predicates: this._predicates,
      targetEntity: this.targetEntity,
      context: this._context,
      intl: this._intl,
    });
  }
  ;
  /** function to dynamically generate the predicate builder uiSchema */
  async buildUiSchema() {
    const uiSchema = await buildPredicateBuilderUiSchema({
      properties: this._predicateProperties,
      predicates: this._predicates,
      targetEntity: this.targetEntity,
      context: this._context,
      intl: this._intl,
    });
    this._uiSchema = interpolateTranslations(this._intl, uiSchema);
  }
  ;
  /**
  * function to transform the predicates into a format that is
  * consistent with the underlying predicate editor
  */
  async transformPredicatesForEditor(predicates) {
    return await Promise.all(predicates.map(async (predicate) => {
      // 0. return early if the predicate is empty
      if (!Object.keys(predicate).length) {
        return;
      }
      const transformedPredicate = {};
      // 1. determine the predicate property being edited
      // and grab its configuration
      const property = Object.keys(predicate)[0];
      const config = await getPredicateConfig(property, this.targetEntity, this._context, this._intl);
      const callback = config.values.inCallback;
      // 2. determine the operator & value
      let operator;
      let value = predicate[property];
      // if the predicate value is a string or number,
      // we can assume the operator is "isExactly"
      if (["string", "number"].includes(typeof value)) {
        operator = 'isExactly';
      }
      // if the predicate value is an array, we can
      // assume the operator is "isAny"
      if (Array.isArray(value)) {
        operator = "isAny";
      }
      // if the predicate value is an object, we can assume
      // it is either an IMatchOptions | IDateRange | IRelativeDate
      // and parse it accordingly
      // TODO: support IDateRange & IRelativeDate operators
      if (Object.keys(value).length) {
        if (value.any) {
          operator = "isAny";
          value = value.any;
        }
        if (value.all) {
          operator = "isAll";
          value = value.all;
        }
        if (value.not) {
          operator = "isNot";
          value = value.not;
        }
      }
      // 3. construct the internal structure of the
      // predicate that's consumed by the editor
      transformedPredicate.property = Object.keys(predicate)[0];
      transformedPredicate.operator = operator;
      transformedPredicate.value = callback ? callback(value) : value;
      return transformedPredicate;
    }));
  }
  /**
   * function to transform the editor values into an array of
   * valid IPredicates before emitting
   */
  async transformPredicatesToEmit(predicates) {
    const transformedPredicates = await Promise.all(predicates.map(async (predicate) => {
      const transformedPredicate = {};
      const config = await getPredicateConfig(predicate === null || predicate === void 0 ? void 0 : predicate.property, this.targetEntity, this._context, this._intl);
      const callback = config.values.outCallback;
      let value = callback ? callback(predicate.value) : predicate.value;
      switch (predicate.operator) {
        case "isAny":
          value = { any: value || [] };
          break;
        case "isAll":
          value = { all: value || [] };
          break;
        case "isNot":
          value = { not: value || [] };
          break;
      }
      transformedPredicate[config.property.value] = value;
      return transformedPredicate;
    }));
    return transformedPredicates;
  }
  renderLoadingState() {
    if (this._isLoading || !this._schema || !this._uiSchema) {
      return h("arcgis-skeleton-loader", { active: true, rows: 3, showHeading: false });
    }
  }
  renderEditor() {
    if (!this._isLoading && this._schema && this._uiSchema) {
      return (h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handlePredicatesEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._predicates[0] }));
    }
  }
  render() {
    return (h(Host, { "data-element": "predicates-builder" }, this.renderLoadingState(), this.renderEditor()));
  }
  static get is() { return "arcgis-hub-predicates-builder"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-predicates-builder.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-predicates-builder.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "predicates": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPredicate[]",
          "resolved": "IPredicate[]",
          "references": {
            "IPredicate": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "array of hub predicate definitions"
        }
      },
      "targetEntity": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "EntityType",
          "resolved": "\"channel\" | \"communityUser\" | \"discussionPost\" | \"event\" | \"eventAttendee\" | \"group\" | \"groupMember\" | \"item\" | \"portalUser\" | \"user\"",
          "references": {
            "EntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "type of entity the predicate is targeting. This is used\ninternally to determine which API we query."
        },
        "attribute": "target-entity",
        "reflect": false
      },
      "availablePredicateProperties": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "PredicateProperty[]",
          "resolved": "PredicateProperty[]",
          "references": {
            "PredicateProperty": {
              "location": "import",
              "path": "./types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "explicit list of predicate properties to present as \"Parameter\" options"
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "_isLoading": {},
      "_schema": {},
      "_uiSchema": {},
      "_predicates": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubPredicatesBuilderChange",
        "name": "arcgisHubPredicatesBuilderChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event emitted when the predicate is updated"
        },
        "complexType": {
          "original": "IPredicate[]",
          "resolved": "IPredicate[]",
          "references": {
            "IPredicate": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "_predicates",
        "methodName": "buildSchemas"
      }];
  }
}
