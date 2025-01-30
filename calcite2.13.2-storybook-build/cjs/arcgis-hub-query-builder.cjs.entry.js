'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const index$1 = require('./index-f4a4c954.js');
const CatalogSchema = require('./CatalogSchema-d9a0c750.js');
const intlManager = require('./intl-manager-f0103583.js');
const memoize = require('./memoize-1f967971.js');
const util = require('./util-38e73510.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./enums-0160df9d.js');
require('./generate-random-string-8807d629.js');
require('./get-prop-4bd8fc1a.js');

const QUERY_BUILDER_SCHEMA = CatalogSchema.QuerySchema;
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
    index.registerInstance(this, hostRef);
    this.arcgisHubQueryBuilderChange = index.createEvent(this, "arcgisHubQueryBuilderChange", 7);
    this._schema = util.cloneObject(QUERY_BUILDER_SCHEMA);
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
      this._query = index$1.mergeDeep(util.cloneObject(this._query), util.cloneObject(values));
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
    this._intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this._query = this.transformQueryForEditor(this.query);
  }
  /** dynamically generated query builder uiSchema */
  get _uiSchema() {
    var _a;
    return interpolateTranslations.interpolateTranslations(this._intl, buildQueryBuilderUiSchema({
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
    const transformedQuery = util.cloneObject(query);
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
    const transformedQuery = util.cloneObject(query);
    // placeholder to add future transforms
    return transformedQuery;
  }
  render() {
    return (index.h(index.Host, { "data-element": "query-builder" }, index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleQueryEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._query })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory('targetEntity', 'availablePredicateProperties', 'queryContext')
], ArcgisHubQueryBuilder.prototype, "_uiSchema", null);

exports.arcgis_hub_query_builder = ArcgisHubQueryBuilder;
