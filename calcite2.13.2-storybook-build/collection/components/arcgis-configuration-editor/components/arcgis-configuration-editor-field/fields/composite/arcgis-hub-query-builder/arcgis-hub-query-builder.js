var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, Host } from '@stencil/core';
import { cloneObject } from '@esri/hub-common';
import { interpolateTranslations } from '../../../../../../../utils';
import { buildQueryBuilderUiSchema, QUERY_BUILDER_SCHEMA } from './schemas';
import intlManager from '../../../../../../../utils/intl-manager';
import Memoize from '../../../../../../../decorators/memoize';
import { mergeDeep } from '../../../../../../../utils/object';
/**
 * The `arcgis-hub-query-builder` is a composite field for
 * configuring an IQuery.
 */
export class ArcgisHubQueryBuilder {
  constructor() {
    this._schema = cloneObject(QUERY_BUILDER_SCHEMA);
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    this.handleQueryEditorChange = (evt) => {
      evt.stopPropagation();
      const { values, valid } = evt.detail;
      this._query = mergeDeep(cloneObject(this._query), cloneObject(values));
      const transformedQueryToEmit = this.transformQueryToEmit(this._query);
      this.arcgisHubQueryBuilderChange.emit(transformedQueryToEmit);
      // if we have a callback and our changes were valid, call the callback
      if (this.callbacks && this.callbacks.onQueryBuilderChangeCallback && valid) {
        this.callbacks.onQueryBuilderChangeCallback(transformedQueryToEmit, this.targetEntity);
      }
      ;
    };
    this.query = undefined;
    this.targetEntity = undefined;
    this.callbacks = undefined;
    this.availablePredicateProperties = undefined;
    this.queryContext = undefined;
    this._query = undefined;
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
    this._query = this.transformQueryForEditor(this.query);
  }
  /** dynamically generated query builder uiSchema */
  get _uiSchema() {
    var _a;
    return interpolateTranslations(this._intl, buildQueryBuilderUiSchema({
      showTargetEntitySelection: !this.targetEntity,
      targetEntity: ((_a = this._query) === null || _a === void 0 ? void 0 : _a.targetEntity) || this.targetEntity,
      availablePredicateProperties: this.availablePredicateProperties,
      queryContext: this.queryContext
    }));
  }
  /**
   * function to transform the incoming IQuery into a format
   * that is consistent with the underlying catalog editor
   */
  transformQueryForEditor(query) {
    const transformedQuery = cloneObject(query);
    // if a target entity is provided, we don't surface
    // the "Source" field, and we set the targetEntity
    // to the provided value
    if (!transformedQuery.targetEntity) {
      transformedQuery.targetEntity = this.targetEntity;
    }
    ;
    return transformedQuery;
  }
  /**
   * function to transform the editor values into a valid
   * IQuery before emitting
   */
  transformQueryToEmit(query) {
    const transformedQuery = cloneObject(query);
    // placeholder to add future transforms
    return transformedQuery;
  }
  render() {
    return (h(Host, { "data-element": "query-builder" }, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleQueryEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._query })));
  }
  static get is() { return "arcgis-hub-query-builder"; }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "query": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IQuery",
          "resolved": "IQuery",
          "references": {
            "IQuery": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "hub query definition"
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
          "text": "type of entity the query is targeting. This is used\ninternally to determine which API we query."
        },
        "attribute": "target-entity",
        "reflect": false
      },
      "callbacks": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ICatalogBuilderCallbacks",
          "resolved": "ICatalogBuilderCallbacks",
          "references": {
            "ICatalogBuilderCallbacks": {
              "location": "import",
              "path": "../../../../../../arcgis-hub-workspace-panes/arcgis-hub-entity-catalog/resources"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "optional callbacks which can be used to call on specific query builder actions.\nThis allows us to easily know specific information about query updates\nwithout having to parse the entire returned query/an entire catalog."
        }
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
              "path": "../arcgis-hub-predicates-builder/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "predicate properties to present as filter options"
        }
      },
      "queryContext": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "\"catalogScope\" | \"collection\"",
          "resolved": "\"catalogScope\" | \"collection\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "optional context for which a query is being constructed.\nThis is used to conditionally change the UI (e.g. button\nappearance)"
        },
        "attribute": "query-context",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_query": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubQueryBuilderChange",
        "name": "arcgisHubQueryBuilderChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event emitted when the query is updated"
        },
        "complexType": {
          "original": "IQuery",
          "resolved": "IQuery",
          "references": {
            "IQuery": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Memoize('targetEntity', 'availablePredicateProperties', 'queryContext')
], ArcgisHubQueryBuilder.prototype, "_uiSchema", null);
