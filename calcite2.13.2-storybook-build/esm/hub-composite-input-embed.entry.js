import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { m as mergeDeep } from './index-213c70d0.js';
import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { a as cloneObject, c as createId } from './util-3e6872d9.js';
import { a as getWellKnownCatalog, g as getWellknownCollection } from './wellKnownCatalog-7e9f7f53.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import { g as getFamily } from './get-family-543fac52.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
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
import './types-db540898.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';
import './generate-random-string-1436d9e6.js';
import './deep-set-67281c6f.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

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
          effect: UiSchemaRuleEffects.SHOW,
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
          effect: UiSchemaRuleEffects.SHOW,
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
          effect: UiSchemaRuleEffects.SHOW,
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
          effect: UiSchemaRuleEffects.SHOW,
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
                effect: UiSchemaRuleEffects.DISABLE,
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
            effect: UiSchemaRuleEffects.SHOW,
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
    const catalog = cloneObject(getWellKnownCatalog("", name, "item", opts));
    // filter out draft surveys
    const feedbackCollection = getWellknownCollection("", "item", "feedback");
    feedbackCollection.scope.filters[0].predicates.push({ typekeywords: { not: "Draft" } });
    catalog.collections = [
      getWellknownCollection("", "item", "appAndMap"),
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
    registerInstance(this, hostRef);
    this.arcgisCompositeEmbedFieldChange = createEvent(this, "arcgisCompositeEmbedFieldChange", 7);
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
      const _embed = mergeDeep(cloneObject(this._embed), cloneObject(evt.detail.values));
      const shouldApplyBreakpoints = getProp(_embed, 'shouldApplyBreakpoints');
      // 1. add a unique key to new embeds
      if (!_embed.key) {
        setProp('key', createId('embed'), _embed);
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
              const { results } = await hubSearch({
                targetEntity: 'item',
                filters: [{ predicates: [{ id }] }]
              }, { requestOptions: (_c = this._context) === null || _c === void 0 ? void 0 : _c.hubRequestOptions });
              return this.setEmbedValue(_embed, viewport, 'kind', getFamily((_d = results[0]) === null || _d === void 0 ? void 0 : _d.type) || undefined);
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
    this._intl = await intlManager.loadIntlForComponent(this.element);
    this._embed = this.transformEmbedForEditor(this.embed);
  }
  get _context() {
    return getGlobalContext();
  }
  get _uiSchema() {
    return interpolateTranslations(this._intl, buildEmbedUiSchema({
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
    return getProp(embed, `${viewport}.${path}`);
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
    const transformedEmbed = cloneObject(embed);
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
    const transformedEmbed = cloneObject(embed);
    const shouldApplyBreakpoints = getProp(embed, 'shouldApplyBreakpoints');
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
    return (h(Host, { "data-element": "embed-field" }, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEmbedEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._embed })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory('_embed')
], Embed.prototype, "_uiSchema", null);
Embed.style = embedCss;

export { Embed as hub_composite_input_embed };
