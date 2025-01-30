import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import { i as injectMapStyleSheet } from './arcgis-1e3a04cd.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { a as getWellKnownCatalog } from './wellKnownCatalog-7e9f7f53.js';
import './index-213c70d0.js';
import '@arcgis/core/config.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './generate-random-string-1436d9e6.js';
import './get-prop-ec5be510.js';
import './get-family-543fac52.js';

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
    const catalog = cloneObject(getWellKnownCatalog("", name, "item", opts));
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
    registerInstance(this, hostRef);
    this.arcgisCompositeMapSettingsFieldChange = createEvent(this, "arcgisCompositeMapSettingsFieldChange", 7);
    this._schema = cloneObject(MAP_SETTINGS_SCHEMA);
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
    injectMapStyleSheet(this.element);
    this._intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _context() {
    return getGlobalContext();
  }
  get _uiSchema() {
    return interpolateTranslations(this._intl, buildMapSettingsUiSchema({
      catalogs: this.catalogs || buildDefaultCatalogs(this._context),
      facets: this.facets || buildDefaultFacets(this._intl),
      visibleSettings: this.visibleSettings,
    }));
  }
  /** Renders the map preview */
  renderMapPreview() {
    return (h("arcgis-hub-map", { basemap: "gray-vector", settings: cloneObject(this.settings) }));
  }
  render() {
    return (h(Host, { "data-element": "map-settings-field" }, this.showPreview && this.renderMapPreview(), h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleMapSettingsEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.settings })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory()
], MapSettings.prototype, "_uiSchema", null);
MapSettings.style = mapSettingsCss;

export { MapSettings as hub_composite_input_map_settings };
