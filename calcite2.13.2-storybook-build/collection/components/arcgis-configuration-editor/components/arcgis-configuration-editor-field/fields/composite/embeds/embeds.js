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
import { interpolateTranslations } from '../../../../../../../utils';
import { buildEmbedUiSchema, EMBED_SCHEMA } from './schemas';
import Memoize from '../../../../../../../decorators/memoize';
import { cloneObject, getProp, createId, } from '@esri/hub-common';
/**
 * Field to configure multiple embeds
 *
 * NOTE: for now, this is a basic implementation,
 * that only really supports configuring a single
 * embed. In the future, we will support configuring
 * multiple embeds in a similar fashion to how
 * we support configuring multiple action links.
 * This was created for the purposes of emitting
 * an array of embeds
 */
export class Embeds {
  constructor() {
    this._schema = cloneObject(EMBED_SCHEMA);
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
      const embedIdx = this._embeds.findIndex(embed => embed.key === getProp(evt.detail.values, 'embed.key'));
      this._embeds.splice(embedIdx, 1, evt.detail.values.embed);
      this.arcgisCompositeEmbedsFieldChange.emit(this._embeds);
    };
    this.embeds = [];
    this.catalogs = undefined;
    this.facets = undefined;
    this.pickerTitle = undefined;
    this._embeds = undefined;
  }
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
    // Note: for now we if there are no embeds provided, we scaffold
    // a new one. In the future, this field would actually prompt
    // the consumer to add an embed
    this._embeds = this.embeds.length ? [...this.embeds] : [{ key: createId("embed") }];
  }
  get _uiSchema() {
    return interpolateTranslations(this._intl, buildEmbedUiSchema({ catalogs: this.catalogs, facets: this.facets }));
  }
  render() {
    return (h(Host, { "data-element": "embed-field" }, this._embeds.map(embed => {
      return (h("arcgis-configuration-editor", { key: embed.key, onArcgisConfigurationEditorChange: this.handleEmbedEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: { embed } }));
    })));
  }
  static get is() { return "hub-composite-input-embeds"; }
  static get originalStyleUrls() {
    return {
      "$": ["embeds.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["embeds.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "embeds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubEmbed[]",
          "resolved": "IHubEmbed[]",
          "references": {
            "IHubEmbed": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "configured embed"
        },
        "defaultValue": "[]"
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
          "text": "catalogs to populate the embed picker"
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
          "text": "facets to filter the embed picker"
        }
      },
      "pickerTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "title for the embed picker button + modal"
        },
        "attribute": "picker-title",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "_embeds": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisCompositeEmbedsFieldChange",
        "name": "arcgisCompositeEmbedsFieldChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event emitted when the embed is updated"
        },
        "complexType": {
          "original": "IHubEmbed[]",
          "resolved": "IHubEmbed[]",
          "references": {
            "IHubEmbed": {
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
  Memoize('_embeds')
], Embeds.prototype, "_uiSchema", null);
