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
import { buildEmbedUiSchema, buildEmbedSchema, EMBED_PROPERTY_MAP, embedProperties } from './schemas';
import { buildDefaultCatalogs, buildDefaultFacets, configurableViewports, deviceViewports } from './resources';
import Memoize from '../../../../../../../decorators/memoize';
import { mergeDeep } from '../../../../../../../utils/object';
import { cloneObject, getFamily, hubSearch, setProp, getProp, createId, } from '@esri/hub-common';
/** Field to configure an embed */
export class Embed {
  constructor() {
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
  static get is() { return "hub-composite-input-embed"; }
  static get originalStyleUrls() {
    return {
      "$": ["embed.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["embed.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "embed": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubEmbed",
          "resolved": "IHubEmbed",
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
  static get events() {
    return [{
        "method": "arcgisCompositeEmbedFieldChange",
        "name": "arcgisCompositeEmbedFieldChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event emitted when the embed is updated"
        },
        "complexType": {
          "original": "IHubEmbed",
          "resolved": "IHubEmbed",
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
  Memoize('_embed')
], Embed.prototype, "_uiSchema", null);
