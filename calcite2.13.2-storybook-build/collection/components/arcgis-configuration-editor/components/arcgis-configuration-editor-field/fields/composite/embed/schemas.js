import { UiSchemaRuleEffects } from "@esri/hub-common";
export const EMBED_PROPERTY_MAP = {
  app: ["id", "height", "isScrollable"],
  map: ["id", "height"],
  feedback: ["id", "height"],
  external: ["url", "height"]
};
export const embedProperties = [...new Set(Object.values(EMBED_PROPERTY_MAP).reduce((acc, val) => acc.concat(val), []))];
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
export const buildEmbedSchema = () => {
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
export const buildEmbedUiSchema = (opts) => {
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
