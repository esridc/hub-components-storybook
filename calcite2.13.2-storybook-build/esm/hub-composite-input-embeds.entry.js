import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { a as cloneObject, c as createId } from './util-3e6872d9.js';
import { g as getProp } from './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './generate-random-string-1436d9e6.js';

const EMBED_SCHEMA = {
  type: 'object',
  properties: {
    embed: {
      type: "object"
    }
  }
};
const buildEmbedUiSchema = (opts = {}) => {
  const { facets, catalogs } = opts;
  return {
    type: "Layout",
    elements: [
      {
        scope: "/properties/embed",
        type: "Control",
        options: {
          control: "hub-composite-input-embed",
          facets,
          catalogs
        },
      },
    ]
  };
};

const embedsCss = "";

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
const Embeds = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisCompositeEmbedsFieldChange = createEvent(this, "arcgisCompositeEmbedsFieldChange", 7);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory('_embeds')
], Embeds.prototype, "_uiSchema", null);
Embeds.style = embedsCss;

export { Embeds as hub_composite_input_embeds };
