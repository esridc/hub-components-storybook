'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const index$1 = require('./index-f4a4c954.js');
const types = require('./types-60347c5c.js');
const util = require('./util-38e73510.js');
const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
const memoize = require('./memoize-1f967971.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const setProp = require('./set-prop-3de2437f.js');
const hubSearch = require('./hubSearch-79d30702.js');
const getFamily = require('./get-family-cafa88bb.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
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
require('./types-751ad3a9.js');
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');
require('./generate-random-string-8807d629.js');
require('./deep-set-49b373be.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

const EMBED_PROPERTY_MAP = {
  app: ["id", "height", "isScrollable"],
  map: ["id", "height"],
  feedback: ["id", "height"],
  external: ["url", "height"]
};
const embedProperties = [...new Set(Object.values(EMBED_PROPERTY_MAP).reduce((acc, val) => acc.concat(val), []))];
const SCHEMA_PROPERTIES = {
  source: {
    type: 'string',
    enum: ['content', 'external'],
    default: 'content'
  },
  id: {
    type: 'array',
    items: {
      type: "string",
    },
    maxItems: 1,
    default: []
  },
  url: {
    type: 'string',
    format: 'uri',
    default: ''
  },
  height: {
    type: 'number',
    default: 500,
    minimum: 0,
    maximum: 2000,
  },
  isScrollable: {
    type: 'boolean',
    default: false,
  }
};
const _buildUiSchemaElement = (key, scope, opts) => {
  var _a, _b, _c, _d, _e, _f;
  const viewport = (_a = scope.split('/').filter(key => (key && key !== 'properties'))) === null || _a === void 0 ? void 0 : _a[0];
  const { kind, id, url, source } = ((_b = opts.embed) === null || _b === void 0 ? void 0 : _b[viewport]) || {};
  const hasSource = {
    scope: `${scope}/source`,
    schema: { not: { const: "" } }
  };
  const hasId = !!(id === null || id === void 0 ? void 0 : id.length) && source === "content";
  const hasUrl = !!url && source === "external";
  return {
    source: {
      type: "Control",
      scope: `${scope}/source`,
      label: opts.intl.t("sourceLabel"),
      options: {
        control: "hub-field-input-tile-select",
        labels: [
          opts.intl.t("contentLabel"),
          opts.intl.t("externalLabel")
        ],
        descriptions: [
          opts.intl.t("contentDescription"),
          opts.intl.t("externalDescription")
        ],
        icons: [
          "arcgis-online",
          "brackets-curly"
        ],
        layout: "horizontal"
      }
    },
    id: {
      type: 'Control',
      scope: `${scope}/id`,
      options: {
        control: 'hub-field-input-gallery-picker',
        linkTarget: 'siteRelative',
        catalogs: opts.catalogs,
        facets: opts.facets,
        pickerTitle: { label: opts.pickerTitle },
        widthScale: "l"
      },
      rules: [
        {
          effect: types.UiSchemaRuleEffects.SHOW,
          conditions: [hasSource, (_c = EMBED_PROPERTY_MAP[kind]) === null || _c === void 0 ? void 0 : _c.includes('id')]
        }
      ],
    },
    height: {
      type: 'Control',
      scope: `${scope}/height`,
      label: opts.intl.t('height'),
      options: {
        control: "hub-field-input-input",
        type: "number",
        messages: [
          {
            type: "ERROR",
            keyword: "minimum",
            labelKey: "errors.heightMinimum",
            icon: true
          },
          {
            type: "ERROR",
            keyword: "type",
            labelKey: "errors.heightMinimum",
            icon: true
          },
          {
            type: "ERROR",
            keyword: "maximum",
            labelKey: "errors.heightMaximum",
            icon: true
          }
        ]
      },
      rules: [
        {
          effect: types.UiSchemaRuleEffects.SHOW,
          conditions: [!!source && ((_d = EMBED_PROPERTY_MAP[kind]) === null || _d === void 0 ? void 0 : _d.includes('height')) && (hasId || hasUrl)]
        }
      ],
    },
    url: {
      type: "Control",
      scope: `${scope}/url`,
      options: {
        control: "hub-field-input-input",
        messages: [
          {
            type: "ERROR",
            keyword: "format",
            labelKey: "errors.urlError",
            icon: true
          },
          {
            type: "SUCCESS",
            keyword: "format",
            labelKey: "success.urlSuccess",
            icon: true
          }
        ]
      },
      rules: [
        {
          effect: types.UiSchemaRuleEffects.SHOW,
          conditions: [!!source && ((_e = EMBED_PROPERTY_MAP[kind]) === null || _e === void 0 ? void 0 : _e.includes('url'))]
        }
      ],
    },
    isScrollable: {
      type: "Control",
      scope: `${scope}/isScrollable`,
      label: opts.intl.t("isScrollable"),
      options: {
        control: "hub-field-input-switch",
        layout: "inline-space-between"
      },
      rules: [
        {
          effect: types.UiSchemaRuleEffects.SHOW,
          conditions: [hasSource, hasId && ((_f = EMBED_PROPERTY_MAP[kind]) === null || _f === void 0 ? void 0 : _f.includes('isScrollable'))]
        }
      ],
    },
  }[key];
};
const _buildViewportProperties = () => {
  return ['source', ...embedProperties].reduce((properties, key) => {
    properties[key] = SCHEMA_PROPERTIES[key];
    return properties;
  }, {});
};
const _buildViewportElements = (scope, opts) => {
  return ['source', ...embedProperties].map((key) => {
    return _buildUiSchemaElement(key, scope, opts);
  });
};
const buildEmbedSchema = () => {
  return {
    type: 'object',
    properties: {
      viewportAll: {
        type: "object",
        properties: _buildViewportProperties()
      },
      shouldApplyBreakpoints: {
        type: 'boolean',
        default: false
      },
      viewportMobile: {
        type: "object",
        properties: _buildViewportProperties()
      },
      viewportTablet: {
        type: "object",
        properties: _buildViewportProperties()
      },
      viewportDesktop: {
        type: "object",
        properties: _buildViewportProperties()
      }
    }
  };
};
const buildEmbedUiSchema = (opts) => {
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        options: {
          section: "accordion",
          scale: "m"
        },
        elements: [
          {
            type: "Section",
            label: opts.intl.t("viewportAll.label"),
            options: {
              section: "accordionItem",
              iconStart: "desktop",
              description: opts.intl.t("viewportAll.description"),
            },
            elements: _buildViewportElements('/properties/viewportAll/properties', opts),
            rules: [
              {
                effect: types.UiSchemaRuleEffects.DISABLE,
                conditions: [
                  {
                    scope: "/properties/shouldApplyBreakpoints",
                    schema: { const: true },
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        type: "Control",
        scope: "/properties/shouldApplyBreakpoints",
        label: opts.intl.t('shouldApplyBreakpoints.label'),
        options: {
          control: "hub-field-input-switch",
          layout: "inline-space-between",
        }
      },
      {
        type: "Section",
        options: {
          section: "accordion",
          scale: "m"
        },
        rules: [
          {
            effect: types.UiSchemaRuleEffects.SHOW,
            conditions: [
              {
                scope: "/properties/shouldApplyBreakpoints",
                schema: { const: true },
              },
            ]
          }
        ],
        elements: [
          {
            type: "Section",
            label: opts.intl.t("viewportMobile.label"),
            options: {
              section: "accordionItem",
              iconStart: "mobile",
              description: opts.intl.t("viewportMobile.description"),
            },
            elements: _buildViewportElements('/properties/viewportMobile/properties', opts),
          },
          {
            type: "Section",
            label: opts.intl.t("viewportTablet.label"),
            options: {
              section: "accordionItem",
              iconStart: "tablet",
              description: opts.intl.t("viewportTablet.description"),
            },
            elements: _buildViewportElements('/properties/viewportTablet/properties', opts),
          },
          {
            type: "Section",
            label: opts.intl.t("viewportDesktop.label"),
            options: {
              section: "accordionItem",
              iconStart: "monitor",
              description: opts.intl.t("viewportDesktop.description"),
            },
            elements: _buildViewportElements('/properties/viewportDesktop/properties', opts),
          }
        ]
      }
    ]
  };
};

const deviceViewports = ["viewportMobile", "viewportTablet", "viewportDesktop"];
const configurableViewports = ["viewportAll", ...deviceViewports];
/**
 * Returns an array of default catalogs for configuring
 * an embed
 * @param context The component's context object
 * @returns IHubCatalog[]
 */
const buildDefaultCatalogs = (context) => {
  const currentUser = context.currentUser;
  const catalogNames = [
    ...(currentUser
      ? ["myContent", "organization", "livingAtlas"]
      : []),
    "world",
  ];
  const catalogs = catalogNames.map((name) => {
    const opts = {
      user: currentUser,
      collectionNames: []
    };
    const catalog = util.cloneObject(wellKnownCatalog.getWellKnownCatalog("", name, "item", opts));
    // filter out draft surveys
    const feedbackCollection = wellKnownCatalog.getWellknownCollection("", "item", "feedback");
    feedbackCollection.scope.filters[0].predicates.push({ typekeywords: { not: "Draft" } });
    catalog.collections = [
      wellKnownCatalog.getWellknownCollection("", "item", "appAndMap"),
      feedbackCollection
    ];
    return catalog;
  });
  return catalogs;
};
/**
 * Returns an array of default facets for configuring
 * an embed
 * @param intl The component's context object
 * @returns IFacet[]
 */
const buildDefaultFacets = (intl) => {
  return [
    {
      label: intl.t("facets.type"),
      key: "type",
      display: "multi-select",
      field: "type",
      options: [],
      operation: "OR",
      aggLimit: 100,
    },
    {
      label: intl.t("facets.tags"),
      key: "tags",
      field: "tags",
      aggLimit: 15,
      operation: "OR",
      display: "multi-select",
      options: [],
    },
    {
      label: intl.t("facets.categories"),
      key: "categories",
      field: "categories",
      aggLimit: 15,
      operation: "OR",
      display: "tree",
      options: [],
    },
    {
      label: intl.t("facets.modified"),
      key: "modified",
      display: "date-range",
      state: "open",
      field: "modified",
      max: new Date().toString(),
    },
  ];
};

const embedCss = "";

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
const Embed = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisCompositeEmbedFieldChange = index.createEvent(this, "arcgisCompositeEmbedFieldChange", 7);
    this._schema = buildEmbedSchema();
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    this.handleEmbedEditorChange = async (evt) => {
      evt.stopPropagation();
      const _embed = index$1.mergeDeep(util.cloneObject(this._embed), util.cloneObject(evt.detail.values));
      const shouldApplyBreakpoints = getProp.getProp(_embed, 'shouldApplyBreakpoints');
      // 1. add a unique key to new embeds
      if (!_embed.key) {
        setProp.setProp('key', util.createId('embed'), _embed);
      }
      // 2. apply viewport transforms
      await Promise.all((shouldApplyBreakpoints ? deviceViewports : ["viewportAll"]).map(async (viewport) => {
        var _a, _b, _c, _d;
        // For content embeds:
        if (this.getEmbedValue(_embed, viewport, 'source') !== "external") {
          // a. set the kind to "app" by default;
          this.setEmbedValue(_embed, viewport, 'kind', 'app');
          // b. If a selected id has changed, we must fetch the item
          // in order to determine its type and set the embed's "kind"
          const id = (_a = this.getEmbedValue(_embed, viewport, 'id')) === null || _a === void 0 ? void 0 : _a[0];
          const previousId = (_b = this.getEmbedValue(this._embed, viewport, 'id')) === null || _b === void 0 ? void 0 : _b[0];
          if (id !== previousId) {
            if (id === null || id === void 0 ? void 0 : id.length) {
              const { results } = await hubSearch.hubSearch({
                targetEntity: 'item',
                filters: [{ predicates: [{ id }] }]
              }, { requestOptions: (_c = this._context) === null || _c === void 0 ? void 0 : _c.hubRequestOptions });
              return this.setEmbedValue(_embed, viewport, 'kind', getFamily.getFamily((_d = results[0]) === null || _d === void 0 ? void 0 : _d.type) || undefined);
            }
          }
        }
        // For external embeds:
        else {
          // a. set the kind to "external";
          this.setEmbedValue(_embed, viewport, 'kind', 'external');
        }
      }));
      this._embed = _embed;
      this.arcgisCompositeEmbedFieldChange.emit(this.transformEmbedToEmit(this._embed));
    };
    this.embed = undefined;
    this.catalogs = undefined;
    this.facets = undefined;
    this.pickerTitle = undefined;
  }
  async componentWillLoad() {
    this._intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this._embed = this.transformEmbedForEditor(this.embed);
  }
  get _context() {
    return state.getGlobalContext();
  }
  get _uiSchema() {
    return interpolateTranslations.interpolateTranslations(this._intl, buildEmbedUiSchema({
      intl: this._intl,
      catalogs: this.catalogs || buildDefaultCatalogs(this._context),
      facets: this.facets || buildDefaultFacets(this._intl),
      pickerTitle: this.pickerTitle || this._intl.t('pickerTitle'),
      embed: this._embed
    }));
  }
  /**
   * helper function to get values from an embed based
   * on a provided viewport and path
   */
  getEmbedValue(embed, viewport, path) {
    return getProp.getProp(embed, `${viewport}.${path}`);
  }
  /**
   * helper function to set values on an embed based
   * on a provided viewport and path
   */
  setEmbedValue(embed, viewport, path, value) {
    const target = embed[viewport];
    // note: we don't use setProp here because it doesn't
    // properly set undefined values - it sets them to {}
    (target || {})[path] = value;
  }
  /**
   * function to transform the embed into a format that is
   * consistent with the underlying embed editor
   */
  transformEmbedForEditor(embed) {
    const transformedEmbed = util.cloneObject(embed);
    // 1. add the top-level "shouldApplyBreakpoints" property based
    // on whether or not the embed has any device-specific configs
    transformedEmbed.shouldApplyBreakpoints = deviceViewports.some((viewport) => {
      return Object.keys(embed[viewport] || {}).length > 0;
    });
    // 2. apply viewport transforms
    configurableViewports.forEach((viewport) => {
      // For content embeds:
      if (this.getEmbedValue(embed, viewport, 'kind') !== "external") {
        // a. transform ids from strings to arrays
        const id = this.getEmbedValue(embed, viewport, 'id');
        !!id && this.setEmbedValue(transformedEmbed, viewport, 'id', [id] || []);
        // b. assign internal "source" property to "content"
        this.setEmbedValue(transformedEmbed, viewport, 'source', 'content');
      }
      // For external embeds:
      else {
        // a. assign internal "source" property to "external"
        this.setEmbedValue(transformedEmbed, viewport, 'source', 'external');
      }
    });
    return transformedEmbed;
  }
  /**
   * function to transform the editor values back into
   * a IHubEmbed before emitting
   */
  transformEmbedToEmit(embed) {
    const transformedEmbed = util.cloneObject(embed);
    const shouldApplyBreakpoints = getProp.getProp(embed, 'shouldApplyBreakpoints');
    // 1. remove empty configs
    configurableViewports.forEach((viewport) => {
      const kind = this.getEmbedValue(transformedEmbed, viewport, 'kind');
      const idOrUrl = this.getEmbedValue(transformedEmbed, viewport, kind === "external" ? 'url' : 'id');
      !(idOrUrl === null || idOrUrl === void 0 ? void 0 : idOrUrl.length) && delete transformedEmbed[viewport];
    });
    // 2. apply viewport transforms
    const viewportsToUpdate = shouldApplyBreakpoints ? deviceViewports : ["viewportAll"];
    viewportsToUpdate.forEach((viewport) => {
      var _a;
      const kind = this.getEmbedValue(transformedEmbed, viewport, 'kind');
      if (kind !== "external") {
        // a. transform ids from arrays to strings
        const id = this.getEmbedValue(embed, viewport, 'id');
        id && this.setEmbedValue(transformedEmbed, viewport, 'id', id[0]);
      }
      // remove properties that are not relevant to the embed kind:
      const toRemove = embedProperties.filter(property => { var _a; return !((_a = EMBED_PROPERTY_MAP[kind]) === null || _a === void 0 ? void 0 : _a.includes(property)); });
      toRemove.forEach((prop) => { var _a; return (_a = transformedEmbed[viewport]) === null || _a === void 0 ? true : delete _a[prop]; });
      // remove internal-only properties
      (_a = transformedEmbed[viewport]) === null || _a === void 0 ? true : delete _a['source'];
    });
    // 3. if device breakpoints are applied, we clear the default config
    if (shouldApplyBreakpoints) {
      delete transformedEmbed["viewportAll"];
    }
    // 4. if breakpoints are not applied, we clear the breakpoint configs
    if (!shouldApplyBreakpoints) {
      deviceViewports.forEach((viewport) => {
        delete transformedEmbed[viewport];
      });
    }
    // 5. remove top-level internal-only properties
    delete transformedEmbed['shouldApplyBreakpoints'];
    return transformedEmbed;
  }
  render() {
    return (index.h(index.Host, { "data-element": "embed-field" }, index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEmbedEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._embed })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory('_embed')
], Embed.prototype, "_uiSchema", null);
Embed.style = embedCss;

exports.hub_composite_input_embed = Embed;
