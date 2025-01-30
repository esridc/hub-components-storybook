'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const eventGalleryCard = require('./event-gallery-card-80fb05f5.js');
const memoize = require('./memoize-1f967971.js');
const getEditorConfig = require('./getEditorConfig-1d006950.js');
require('./index-f4a4c954.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./interfaces-fc0046ff.js');
require('./generate-random-string-8807d629.js');
require('./_deep-map-values-d489006b.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');

const arcgisHubEventGalleryCardEditorCss = ":host{display:block;--arcgis-hub-add-content-dropdown-display:block}";

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
const ArcgisHubEventGalleryCardEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubEventGalleryCardEditorChange = index.createEvent(this, "arcgisHubEventGalleryCardEditorChange", 7);
    /**
     * Intl reference
     */
    this.intl = null;
    /**
     * Wrapper function for `intl.t` used by configuration editor
     * @param key A translation string key
     * @param values Any values to interpolate into the translation string
     * @param opts Translation options
     * @returns A translated string
     */
    this.translationFn = (key, values, options) => {
      return this.intl.t(key, values, options);
    };
    /**
     * Handles changes to the configuration editor values
     * @param evt
     */
    this.handleConfigurationEditorChange = (evt) => {
      evt.stopPropagation();
      this.values = Object.assign(Object.assign({}, this._values), evt.detail.values);
      this.arcgisHubEventGalleryCardEditorChange.emit({
        valid: evt.detail.valid,
        values: this.values,
      });
    };
    /**
     * Invoked when a `arcgisHubAddContentWorkflowComplete` is emitted from the arcgis-hub-add-content component after
     * successfully creating new content. This component doesn't have direct access to the gallery as it's rendered in
     * the card, so we simply create a new `values` object and emit `arcgisHubEventGalleryCardEditorChange` to indirectly
     * trigger the gallery in the card to refresh it's results
     */
    this.handleAddContentComplete = () => {
      this.values = Object.assign({}, this._values);
      this.arcgisHubEventGalleryCardEditorChange.emit({
        valid: true,
        values: this.values,
      });
    };
    this._context = state.getGlobalContext();
    this.schema = undefined;
    this.uiSchema = undefined;
    this.site = undefined;
    this.values = undefined;
  }
  /**
   * Wires up the component to receive global context when the component mounts to the DOM
   */
  connectedCallback() {
    state.connectContext(this);
  }
  /**
   * Cleans up the global context when the component unmounts from the DOM
   */
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * Loads translations, the schema & the uiSchema before the component renders
   */
  async componentWillLoad() {
    await this.loadIntl();
    await this.loadSchemas();
  }
  /**
   * Loads the intl reference
   */
  async loadIntl() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Loads the schema and uiSchema
   */
  async loadSchemas() {
    var _a, _b;
    if (this.site && this._context.currentUser) {
      const { uiSchema, schema } = await getEditorConfig.getEditorConfig('fields', 'hub:card:eventGallery', { tags: (_b = (_a = this.site) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : [] }, this._context);
      this.schema = schema;
      this.uiSchema = interpolateTranslations.interpolateTranslations(this.intl, uiSchema);
    }
    else {
      this.schema = undefined;
      this.uiSchema = undefined;
    }
  }
  get _values() {
    return eventGalleryCard.migrateEventGalleryCardSchema(this.values);
  }
  /**
   * Primary render method
   */
  render() {
    return (index.h(index.Host, { "data-element": "event-gallery-card-editor" }, this.schema && this.uiSchema && (index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleConfigurationEditorChange, schema: this.schema, t: this.translationFn, uiSchema: this.uiSchema, values: this._values }, index.h("arcgis-hub-add-content", { buttonProps: { width: 'full', appearance: 'outline' }, config: {
        create: {
          workflow: "create",
          targetEntity: "event",
          types: ["Event"],
        },
        state: 'enabled'
      }, entityType: "event", onArcgisHubAddContentWorkflowComplete: this.handleAddContentComplete, site: this.site, slot: "add-content-slot" })))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "site": ["loadSchemas"],
    "_context": ["loadSchemas"]
  }; }
};
__decorate([
  memoize.MemoizeDecoratorFactory('values')
], ArcgisHubEventGalleryCardEditor.prototype, "_values", null);
ArcgisHubEventGalleryCardEditor.style = arcgisHubEventGalleryCardEditorCss;

exports.arcgis_hub_event_gallery_card_editor = ArcgisHubEventGalleryCardEditor;
