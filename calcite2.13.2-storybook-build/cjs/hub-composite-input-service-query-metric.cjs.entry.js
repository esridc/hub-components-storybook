'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const featureService = require('./feature-service-49ec8903.js');
const types = require('./types-60347c5c.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
const statCard = require('./stat-card-05c6ed95.js');
const state = require('./state-6637df8c.js');
const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
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
require('./util-38e73510.js');
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
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./subschemas-61a41e85.js');
require('./InitiativeSchema-5a0a1956.js');
require('./SiteSchema-85074143.js');
require('./DiscussionSchema-24407ed6.js');
require('./PageSchema-f15eb977.js');
require('./ContentSchema-92224d5f.js');
require('./TemplateSchema-d46d6f3b.js');
require('./GroupSchema-e21948a6.js');
require('./InitiativeTemplateSchema-c5d2cb31.js');
require('./SurveySchema-9ec907b6.js');
require('./EventSchemaCreate-bf05e6ea.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./interpolate-c1fe951a.js');
require('./is-nil-e28a2884.js');
require('./resources-e64df288.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');

/**
 * Returns Esri geometry types from ArcGIS Rest API geometry types
 * https://developers.arcgis.com/documentation/common-data-types/geometry-objects.htm
 * @param {string} Portal geometry type string ('esriGeometryPoint', etc)
 * @returns {string} Esri geometry type string ('point', etc)

 */
function esriGeometryType(type) {
  const portalTypes = {
    'esriGeometryPoint': 'Point',
    'esriGeometryPolyline': 'Polyline',
    'esriGeometryPolygon': 'Polygon',
    'esriGeometryEnvelope': 'Extent',
  };
  return portalTypes[type];
}

const getSchema = (options) => {
  const { layers, fields, aggregations } = options;
  const getDynamicEnum = (values = [], allowEmptyString = false) => {
    if (allowEmptyString) {
      values.push('');
    }
    // TODO: passing in a dynamic default should re-emit configuration editor values?
    return values.length ? { enum: values } : {};
  };
  return {
    required: [],
    type: 'object',
    properties: {
      itemId: {
        type: 'array',
        maxItems: 1,
      },
      layerId: Object.assign({ type: 'string' }, getDynamicEnum(layers)),
      field: Object.assign({ type: 'string' }, getDynamicEnum(fields, true)),
      statistic: {
        type: 'string',
        enum: aggregations,
      },
      allowExpressionSet: {
        type: 'boolean',
        default: false,
      },
      expressionSet: {
        type: 'array',
      }
    }
  };
};
const SHOW_FOR_ITEM_ID = {
  condition: {
    schema: {
      type: 'object',
      properties: {
        itemId: { not: { const: [] } },
      },
    },
  },
  effect: types.UiSchemaRuleEffects.SHOW,
};
const SHOW_FOR_ITEM_ID_AND_LAYER_ID = {
  condition: {
    schema: {
      type: 'object',
      properties: {
        itemId: { not: { const: [] } },
        layerId: { not: { const: '' } }
      }
    }
  },
  effect: types.UiSchemaRuleEffects.SHOW,
};
const SHOW_FOR_ITEM_ID_AND_LAYER_ID_AND_FIELD = {
  condition: {
    schema: {
      type: 'object',
      properties: {
        itemId: { not: { const: [] } },
        layerId: { not: { const: '' } },
        field: { not: { const: '' } }
      }
    }
  },
  effect: types.UiSchemaRuleEffects.SHOW,
};
function getUiSchema(options) {
  const { catalogs = [], facets = [], layers, fields, aggregations } = options;
  return {
    type: 'Layout',
    elements: [
      {
        scope: '/properties/itemId',
        type: 'Control',
        options: {
          control: "hub-field-input-gallery-picker",
          targetEntity: 'item',
          catalogs,
          facets,
          styles: {
            '--twShadowNew': 'none'
          },
        }
      },
      {
        labelKey: 'layer',
        scope: '/properties/layerId',
        type: 'Control',
        rule: SHOW_FOR_ITEM_ID,
        options: {
          control: 'hub-field-input-tile-select',
          labels: layers.map(layer => layer.name),
          descriptions: layers.map(layer => esriGeometryType(layer.geometryType)),
          styles: {
            '--maxHeight': '20vh',
          }
        }
      },
      {
        labelKey: 'field.label',
        scope: '/properties/field',
        type: 'Control',
        rule: SHOW_FOR_ITEM_ID_AND_LAYER_ID,
        options: {
          control: 'hub-field-input-combobox',
          selectionMode: 'single',
          items: fields.map(field => { return { icon: featureService.getIconForFieldType(field.type), label: field.name, value: field.name }; }),
          styles: {
            '--maxHeight': '20vh',
          }
        },
      },
      {
        labelKey: 'statistic.label',
        scope: '/properties/statistic',
        type: 'Control',
        rule: SHOW_FOR_ITEM_ID_AND_LAYER_ID_AND_FIELD,
        options: {
          control: 'hub-field-input-select',
          labels: aggregations,
        }
      },
      {
        type: "Section",
        scope: "/properties/allowExpressionSet",
        labelKey: 'expression.label',
        rule: SHOW_FOR_ITEM_ID_AND_LAYER_ID_AND_FIELD,
        options: {
          section: "subblock",
          scale: "m",
          toggleDisplay: "switch"
        },
        elements: [
          {
            scope: '/properties/expressionSet',
            rule: SHOW_FOR_ITEM_ID_AND_LAYER_ID_AND_FIELD,
            type: 'Control',
            options: {
              fields,
              control: 'hub-composite-input-expression-set',
            }
          }
        ]
      }
    ]
  };
}

const FEATURE_SERVICE_COLLECTION = {
  targetEntity: "item",
  key: "featureServices",
  label: "Feature Services",
  include: [],
  scope: {
    targetEntity: "item",
    filters: [
      {
        predicates: [
          {
            type: "Feature Service",
          },
          {
            typekeywords: {
              not: ['FieldworkerView']
            }
          },
          {
            typekeywords: {
              not: ['SurveyService'],
            }
          }
        ],
      },
    ],
  },
};
const NUMERICAL_AGGREGATIONS = [
  "count", "min", "max", "sum", "avg", "stddev", "var"
];
const BASIC_AGGREGATIONS = [
  "count", "min", "max",
];
const getNumericalAggregationLabels = (intl) => {
  return NUMERICAL_AGGREGATIONS.map((key) => intl.t(`statistic.aggregations.${key}`));
};
const getBasicAggregationLabels = (intl) => {
  return BASIC_AGGREGATIONS.map((key) => intl.t(`statistic.aggregations.${key}`));
};

const ServiceQueryMetric = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisCompositeServiceQueryMetricFieldChange = index.createEvent(this, "arcgisCompositeServiceQueryMetricFieldChange", 7);
    this.values = {};
    this.sourceLink = undefined;
    this.sourceTitle = undefined;
    this.layers = [];
    this.fields = [];
    this.serviceUrl = '';
    this.aggregations = null;
    this.currentValues = {};
    this.loading = false;
    this._context = state.getGlobalContext();
    context.bind(this, 'translationFunc', 'handleCompositeServiceQueryMetricFieldChange');
  }
  connectedCallback() {
    state.connectContext(this);
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
        const catalog = this._context && wellKnownCatalog.getWellKnownCatalog('dynamicStat', name, 'item', opts);
        if (!!catalog) {
          // manually attach feature service collection
          catalog.collections = [FEATURE_SERVICE_COLLECTION];
        }
        return interpolateTranslations.interpolateTranslations(this.intl, catalog);
      });
    }
    return catalogs;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
      const entity = await featureService.getFeatureServiceAsEntity(values.itemId[0], context);
      // url is on the item and the entity, but HubContent is not a type of HubEntity
      serviceUrl = entity === null || entity === void 0 ? void 0 : entity.url;
      sourceLink = (_b = entity === null || entity === void 0 ? void 0 : entity.links) === null || _b === void 0 ? void 0 : _b.siteRelative;
      sourceTitle = entity === null || entity === void 0 ? void 0 : entity.name;
      const service = await featureService.getFeatureService(serviceUrl, context);
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
        fields = await featureService.getFieldsFromLayer(serviceUrl, context, id);
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
    return featureService.NUMERIC_FIELD_TYPES.includes(type) ?
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
    this.currentValues = Object.assign(Object.assign(Object.assign({}, this.currentValues), values), { serviceUrl: this.serviceUrl, sourceLink: statCard.createDynamicSourceLink(this.sourceLink, values.layerId), sourceTitle: this.sourceTitle });
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
    return (index.h(index.Host, null, this.loading ? index.h("arcgis-skeleton-loader", { active: true }) :
      index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleCompositeServiceQueryMetricFieldChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.currentValues || this.values })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "_context": ["updateUiSchema"]
  }; }
};

exports.hub_composite_input_service_query_metric = ServiceQueryMetric;
