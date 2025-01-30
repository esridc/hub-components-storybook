import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { g as getIconForFieldType, a as getFeatureServiceAsEntity, b as getFeatureService, c as getFieldsFromLayer, N as NUMERIC_FIELD_TYPES } from './feature-service-308c7df6.js';
import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import { c as createDynamicSourceLink } from './stat-card-4599cc9c.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { a as getWellKnownCatalog } from './wellKnownCatalog-7e9f7f53.js';
import './fetchHubEntity-28d04ab4.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './get-prop-ec5be510.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './util-3e6872d9.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './HubInitiatives-4f4e24ce.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
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
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './interpolate-d39d6151.js';
import './is-nil-03b9a6b5.js';
import './resources-3b88c839.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';

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
  effect: UiSchemaRuleEffects.SHOW,
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
  effect: UiSchemaRuleEffects.SHOW,
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
  effect: UiSchemaRuleEffects.SHOW,
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
          items: fields.map(field => { return { icon: getIconForFieldType(field.type), label: field.name, value: field.name }; }),
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
    registerInstance(this, hostRef);
    this.arcgisCompositeServiceQueryMetricFieldChange = createEvent(this, "arcgisCompositeServiceQueryMetricFieldChange", 7);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["updateUiSchema"]
  }; }
};

export { ServiceQueryMetric as hub_composite_input_service_query_metric };
