'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const memoize = require('./memoize-1f967971.js');
const util = require('./util-38e73510.js');
const getProp = require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./generate-random-string-8807d629.js');

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
    index.registerInstance(this, hostRef);
    this.arcgisCompositeEmbedsFieldChange = index.createEvent(this, "arcgisCompositeEmbedsFieldChange", 7);
    this._schema = util.cloneObject(EMBED_SCHEMA);
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
      const embedIdx = this._embeds.findIndex(embed => embed.key === getProp.getProp(evt.detail.values, 'embed.key'));
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
    this._intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    // Note: for now we if there are no embeds provided, we scaffold
    // a new one. In the future, this field would actually prompt
    // the consumer to add an embed
    this._embeds = this.embeds.length ? [...this.embeds] : [{ key: util.createId("embed") }];
  }
  get _uiSchema() {
    return interpolateTranslations.interpolateTranslations(this._intl, buildEmbedUiSchema({ catalogs: this.catalogs, facets: this.facets }));
  }
  render() {
    return (index.h(index.Host, { "data-element": "embed-field" }, this._embeds.map(embed => {
      return (index.h("arcgis-configuration-editor", { key: embed.key, onArcgisConfigurationEditorChange: this.handleEmbedEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: { embed } }));
    })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory('_embeds')
], Embeds.prototype, "_uiSchema", null);
Embeds.style = embedsCss;

exports.hub_composite_input_embeds = Embeds;
