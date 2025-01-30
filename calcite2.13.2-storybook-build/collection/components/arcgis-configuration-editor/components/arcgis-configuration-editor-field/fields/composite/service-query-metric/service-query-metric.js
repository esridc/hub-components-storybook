import { Host, h } from '@stencil/core';
import { getSchema, getUiSchema } from "./schema";
import intlManager from '../../../../../../../utils/intl-manager';
import { bind } from '../../../../../../../utils/context';
import { getWellKnownCatalog } from "@esri/hub-common";
import { BASIC_AGGREGATIONS, getBasicAggregationLabels, FEATURE_SERVICE_COLLECTION, NUMERICAL_AGGREGATIONS, getNumericalAggregationLabels } from './resources';
import { interpolateTranslations } from '../../../../../../../utils/localization/interpolate-translations';
import { getFeatureService, getFeatureServiceAsEntity, getFieldsFromLayer, NUMERIC_FIELD_TYPES } from '../../../../../../../utils/feature-service';
import { createDynamicSourceLink } from '../../../../../../../utils/stat-card';
import { connectContext, getGlobalContext } from '../../../../../../../utils/state';
export class ServiceQueryMetric {
  constructor() {
    this.values = {};
    this.sourceLink = undefined;
    this.sourceTitle = undefined;
    this.layers = [];
    this.fields = [];
    this.serviceUrl = '';
    this.aggregations = null;
    this.currentValues = {};
    this.loading = false;
    this._context = getGlobalContext();
    bind(this, 'translationFunc', 'handleCompositeServiceQueryMetricFieldChange');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  get uiSchemaOptions() {
    var _a;
    return {
      catalogs: this.catalogs,
      facets: this.facets,
      layers: this.layers,
      fields: this.fields,
      aggregations: (_a = this.aggregations) === null || _a === void 0 ? void 0 : _a.labelsEnum
    };
  }
  get schemaOptions() {
    var _a;
    return {
      layers: this.layers.map(layer => { var _a; return (_a = layer.id) === null || _a === void 0 ? void 0 : _a.toString(); }),
      fields: this.fields.map(field => field.name),
      aggregations: (_a = this.aggregations) === null || _a === void 0 ? void 0 : _a.aggregationEnum,
    };
  }
  /**
   * Facets not automatically created with catalogs, used by the gallery picker
   * for the dynamic stat card
   */
  get facets() {
    return [{
        label: this.intl.t('dynamicStat.facets.sharing'),
        key: 'access',
        field: 'access',
        display: 'multi-select',
        operation: 'OR',
      }
    ];
  }
  get catalogs() {
    var _a;
    let catalogs = [];
    if (this._context) {
      const catalogNames = ['myContent', 'favorites', 'organization'];
      // portal should not show public as an option
      if (!((_a = this._context) === null || _a === void 0 ? void 0 : _a.isPortal)) {
        catalogNames.push('world');
      }
      catalogs = catalogNames.map((name) => {
        var _a;
        const opts = {
          user: (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser,
          collectionNames: ['dataset']
        };
        const catalog = this._context && getWellKnownCatalog('dynamicStat', name, 'item', opts);
        if (!!catalog) {
          // manually attach feature service collection
          catalog.collections = [FEATURE_SERVICE_COLLECTION];
        }
        return interpolateTranslations(this.intl, catalog);
      });
    }
    return catalogs;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (this.values.itemId) {
      this.currentValues = this.values;
    }
    this.loading = true;
    this.updateDynamicValues(this.values, this._context);
    // loads aggregations with now initialized intl
    this.aggregations = { aggregationEnum: BASIC_AGGREGATIONS, labelsEnum: getBasicAggregationLabels(this.intl) };
  }
  /**
 * Updates ui schema -- must watch context in case there is any change in authentication
 */
  updateUiSchema() {
    this._uiSchema = getUiSchema(this.uiSchemaOptions);
  }
  /**
   * Updates schema -- used when dynamically rendering enums
   */
  updateSchema() {
    this._schema = getSchema(this.schemaOptions);
  }
  /**
   * Helper function to fetch dynamic feature service values such as the item's feature service url, the layers of the feature service,
   * and the fields of the layer.
   * @param values new configuration editor values
   */
  async updateDynamicValues(values, context) {
    var _a, _b, _c;
    let serviceUrl, sourceLink, sourceTitle, layers = [], fields = [];
    // if selected an item, get url and possible layers
    if ((_a = values.itemId) === null || _a === void 0 ? void 0 : _a.length) {
      const entity = await getFeatureServiceAsEntity(values.itemId[0], context);
      // url is on the item and the entity, but HubContent is not a type of HubEntity
      serviceUrl = entity === null || entity === void 0 ? void 0 : entity.url;
      sourceLink = (_b = entity === null || entity === void 0 ? void 0 : entity.links) === null || _b === void 0 ? void 0 : _b.siteRelative;
      sourceTitle = entity === null || entity === void 0 ? void 0 : entity.name;
      const service = await getFeatureService(serviceUrl, context);
      // our service can be typed as a feature service, but is actually a feature layer.
      // in this case, we have to treat the layers differently.
      // if service.fields, service is a feature layer
      if (service === null || service === void 0 ? void 0 : service.fields) {
        layers = [service];
        // need to reset serviceUrl, as metric resolver relies on this not having the layer id attached
        serviceUrl = serviceUrl.substring(0, serviceUrl.lastIndexOf("/"));
      }
      // service is a feature service
      else if ((service === null || service === void 0 ? void 0 : service.layers) || (service === null || service === void 0 ? void 0 : service.tables)) {
        layers = [...service === null || service === void 0 ? void 0 : service.layers, ...service === null || service === void 0 ? void 0 : service.tables];
      }
      // service does not exist or could not be fetched
      else {
        console.error("This service does not have layers and is not a feature layer itself.");
        layers = [];
      }
      // reset if new item id and not first load
      if (serviceUrl !== this.serviceUrl && this.serviceUrl !== "") {
        values.layerId = undefined;
        values.field = undefined;
      }
      // if selected a layer, get fields
      if (values.layerId) {
        const id = values.layerId;
        fields = await getFieldsFromLayer(serviceUrl, context, id);
      }
    }
    // reset if no item id
    else {
      this.resetValues(values);
    }
    const { aggregationEnum, labelsEnum } = this.getAggregationsFromField(values);
    this.serviceUrl = serviceUrl;
    this.layers = layers || [];
    this.fields = fields || [];
    this.sourceLink = sourceLink;
    this.sourceTitle = sourceTitle;
    // When switching fields, the new field could have a smaller set of possible aggregations --
    // we then need to re-emit a default aggregation to replace the current aggregation
    // if the current aggregation isn't in the new list.
    if (aggregationEnum !== ((_c = this.aggregations) === null || _c === void 0 ? void 0 : _c.aggregationEnum) && !aggregationEnum.includes(values.statistic)) {
      values.statistic = 'count';
    }
    this.aggregations = { aggregationEnum, labelsEnum };
    this.updateSchema();
    this.updateUiSchema();
    this.loading = false;
  }
  /**
   * Intercepts and resets service-query-metric values.
   * This ensures that the service-query-metric component is fully reset when a new item is selected, and no lingering
   * data is set from a previous dataset.
   * @param values
   */
  resetValues(values) {
    values.expressionSet = [];
    values.field = undefined;
    values.layerId = undefined;
    values.sourceLink = undefined;
    values.sourceTitle = undefined;
  }
  getAggregationsFromField(values) {
    var _a;
    let type = values === null || values === void 0 ? void 0 : values.fieldType;
    if (!values.fieldType) {
      type = (_a = this.fields.find(f => f.name === (values === null || values === void 0 ? void 0 : values.field))) === null || _a === void 0 ? void 0 : _a.type;
    }
    return NUMERIC_FIELD_TYPES.includes(type) ?
      { aggregationEnum: NUMERICAL_AGGREGATIONS, labelsEnum: getNumericalAggregationLabels(this.intl) } :
      { aggregationEnum: BASIC_AGGREGATIONS, labelsEnum: getBasicAggregationLabels(this.intl) };
  }
  async handleCompositeServiceQueryMetricFieldChange(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const { valid, values } = event.detail;
    await this.updateDynamicValues(values, this._context);
    this.updateSchema();
    this.updateUiSchema();
    this.currentValues = Object.assign(Object.assign(Object.assign({}, this.currentValues), values), { serviceUrl: this.serviceUrl, sourceLink: createDynamicSourceLink(this.sourceLink, values.layerId), sourceTitle: this.sourceTitle });
    // attach field type used for future formatting
    this.currentValues = values.field ? Object.assign(Object.assign({}, this.currentValues), { fieldType: this.fields.find(field => field.name === values.field).type }) : Object.assign(Object.assign({}, this.currentValues), { fieldType: undefined });
    // TODO: refactor: we currently manually attach this on -- and need to do so until defaults are emitted as starting values
    if (!this.currentValues.statistic) {
      this.currentValues.statistic = 'count';
    }
    this.isValid = valid;
    if (valid) {
      this.arcgisCompositeServiceQueryMetricFieldChange.emit(this.currentValues);
    }
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  render() {
    return (h(Host, null, this.loading ? h("arcgis-skeleton-loader", { active: true }) :
      h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleCompositeServiceQueryMetricFieldChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.currentValues || this.values })));
  }
  static get is() { return "hub-composite-input-service-query-metric"; }
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
      }
    };
  }
  static get states() {
    return {
      "sourceLink": {},
      "sourceTitle": {},
      "layers": {},
      "fields": {},
      "serviceUrl": {},
      "aggregations": {},
      "currentValues": {},
      "loading": {},
      "_context": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisCompositeServiceQueryMetricFieldChange",
        "name": "arcgisCompositeServiceQueryMetricFieldChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IHubCompositeServiceQueryMetric",
          "resolved": "IHubCompositeServiceQueryMetric",
          "references": {
            "IHubCompositeServiceQueryMetric": {
              "location": "global"
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
      }];
  }
}
;
