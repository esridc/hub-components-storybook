'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
const arcgis = require('./arcgis-492079b8.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const memoize = require('./memoize-1f967971.js');
const util = require('./util-38e73510.js');
const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
require('./index-f4a4c954.js');
require('@arcgis/core/config.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./generate-random-string-8807d629.js');
require('./get-prop-4bd8fc1a.js');
require('./get-family-cafa88bb.js');

const MAP_SETTINGS_SCHEMA = {
  type: 'object',
  properties: {
    baseViewItemId: {
      // This is defined as an array due to incorporation with gallery picker
      type: 'array',
      items: {
        type: "string",
      },
      maxItems: 1,
      default: []
    }
  }
};
const buildMapSettingsUiSchema = (opts) => {
  const { catalogs, facets, visibleSettings } = opts || {};
  return {
    type: "Layout",
    elements: [
      visibleSettings.includes('gallery') && {
        type: 'Control',
        scope: '/properties/baseViewItemId',
        label: "Map",
        options: {
          control: 'hub-field-input-gallery-picker',
          linkTarget: 'self',
          catalogs,
          facets,
          pickerTitle: { label: "{{itemPickerSelect:translate}}" },
          helperText: {
            label: "{{helperText:translate}}"
          }
        }
      },
    ].filter(Boolean)
  };
};

/**
 * Returns an array of default catalogs for the map configuration settings.
 * @param intl The component's intl object
 * @param context The component's context object
 * @returns IHubCatalog[]
 */
const buildDefaultCatalogs = (context) => {
  const currentUser = context.currentUser;
  const catalogNames = [
    ...(currentUser
      ? ["myContent", "organization"]
      : []),
    "world",
  ];
  const catalogs = catalogNames.map((name) => {
    const opts = {
      user: currentUser,
      collectionNames: []
    };
    const catalog = util.cloneObject(wellKnownCatalog.getWellKnownCatalog("", name, "item", opts));
    catalog.collections = [
      {
        label: "Maps",
        key: "maps",
        targetEntity: "item",
        include: [],
        scope: {
          targetEntity: "item",
          filters: [
            {
              predicates: [{ type: ["Web Map", "Web Scene"] }],
            },
          ],
        },
      },
    ];
    return catalog;
  });
  return catalogs;
};
/**
 * Returns an array of default facets for the map configuration settings.
 * @param intl The component's intl object
 * @returns IFacet[]
 */
const buildDefaultFacets = (intl) => {
  return [
    {
      label: intl.t('facets.type'),
      key: "type",
      display: "multi-select",
      field: "type",
      options: [],
      operation: "OR",
      aggLimit: 100,
    },
    {
      label: intl.t('facets.sharing'),
      key: "access",
      display: "multi-select",
      field: "access",
      options: [],
      operation: "OR",
    }
  ];
};

const mapSettingsCss = ":host{display:flex;flex-direction:column;gap:1rem}arcgis-hub-map{height:20rem}";

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
const MapSettings = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisCompositeMapSettingsFieldChange = index.createEvent(this, "arcgisCompositeMapSettingsFieldChange", 7);
    this._schema = util.cloneObject(MAP_SETTINGS_SCHEMA);
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    this.handleMapSettingsEditorChange = (evt) => {
      this.arcgisCompositeMapSettingsFieldChange.emit(evt.detail.values);
    };
    this.settings = undefined;
    this.catalogs = undefined;
    this.facets = undefined;
    this.visibleSettings = [];
    this.showPreview = undefined;
  }
  async componentWillLoad() {
    arcgis.injectMapStyleSheet(this.element);
    this._intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get _context() {
    return state.getGlobalContext();
  }
  get _uiSchema() {
    return interpolateTranslations.interpolateTranslations(this._intl, buildMapSettingsUiSchema({
      catalogs: this.catalogs || buildDefaultCatalogs(this._context),
      facets: this.facets || buildDefaultFacets(this._intl),
      visibleSettings: this.visibleSettings,
    }));
  }
  /** Renders the map preview */
  renderMapPreview() {
    return (index.h("arcgis-hub-map", { basemap: "gray-vector", settings: util.cloneObject(this.settings) }));
  }
  render() {
    return (index.h(index.Host, { "data-element": "map-settings-field" }, this.showPreview && this.renderMapPreview(), index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleMapSettingsEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.settings })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory()
], MapSettings.prototype, "_uiSchema", null);
MapSettings.style = mapSettingsCss;

exports.hub_composite_input_map_settings = MapSettings;
