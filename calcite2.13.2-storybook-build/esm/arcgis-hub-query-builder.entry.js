import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { m as mergeDeep } from './index-213c70d0.js';
import { Q as QuerySchema } from './CatalogSchema-e8481cdb.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { a as cloneObject } from './util-3e6872d9.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './enums-783e40b4.js';
import './generate-random-string-1436d9e6.js';
import './get-prop-ec5be510.js';

const QUERY_BUILDER_SCHEMA = QuerySchema;
const buildQueryBuilderUiSchema = (opts) => {
  const { showTargetEntitySelection, targetEntity, availablePredicateProperties } = opts;
  return {
    type: "Layout",
    elements: [
      showTargetEntitySelection && {
        scope: "/properties/targetEntity",
        type: "Control",
        label: "{{targetEntity.label:translate}}",
        options: {
          control: "hub-field-input-radio-group",
          labels: [
            "{{targetEntity.enum.item:translate}}",
            "{{targetEntity.enum.event:translate}}",
            "{{targetEntity.enum.group:translate}}",
          ],
          icons: ["files", "event", "group"],
          width: "full",
        }
      },
      targetEntity && {
        scope: "/properties/filters",
        type: "Control",
        options: {
          control: "arcgis-hub-filters-builder",
          targetEntity,
          availablePredicateProperties
        }
      }
    ].filter(Boolean)
  };
};

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubQueryBuilder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubQueryBuilderChange = createEvent(this, "arcgisHubQueryBuilderChange", 7);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory('targetEntity', 'availablePredicateProperties', 'queryContext')
], ArcgisHubQueryBuilder.prototype, "_uiSchema", null);

export { ArcgisHubQueryBuilder as arcgis_hub_query_builder };
