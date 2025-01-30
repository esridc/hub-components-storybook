var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, Host } from '@stencil/core';
import intlManager from '../../../../../../../utils/intl-manager';
import { getGlobalContext, interpolateTranslations } from '../../../../../../../utils';
import { cloneObject } from '@esri/hub-common';
import Memoize from '../../../../../../../decorators/memoize';
import { buildMapSettingsUiSchema, MAP_SETTINGS_SCHEMA } from './schemas';
import { buildDefaultCatalogs, buildDefaultFacets } from './resources';
import { injectMapStyleSheet } from '../../../../../../../utils/arcgis';
export class MapSettings {
  constructor() {
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
  static get is() { return "hub-composite-input-map-settings"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["map-settings.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["map-settings.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "settings": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubMapSettings",
          "resolved": "IHubMapSettings",
          "references": {
            "IHubMapSettings": {
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
        }
      },
      "catalogs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubCatalog[]",
          "resolved": "IHubCatalog[]",
          "references": {
            "IHubCatalog": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "catalogs to populate the map picker"
        }
      },
      "facets": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IFacet[]",
          "resolved": "IFacet[]",
          "references": {
            "IFacet": {
              "location": "import",
              "path": "../../../../../../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "facets to filter the map picker"
        }
      },
      "visibleSettings": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "specifies which map settings to show in the editing experience\nexample: [\"gallery\"] <- only show the gallery settings\nmore settings will be added in the future"
        },
        "defaultValue": "[]"
      },
      "showPreview": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "specifies whether to show the map preview in the editing experience"
        },
        "attribute": "show-preview",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "arcgisCompositeMapSettingsFieldChange",
        "name": "arcgisCompositeMapSettingsFieldChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event emitted when map settings are updated"
        },
        "complexType": {
          "original": "IHubMapSettings",
          "resolved": "IHubMapSettings",
          "references": {
            "IHubMapSettings": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Memoize()
], MapSettings.prototype, "_uiSchema", null);
