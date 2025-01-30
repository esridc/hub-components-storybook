import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { m as migrateEventGalleryCardSchema } from './event-gallery-card-c12f75fd.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { g as getEditorConfig } from './getEditorConfig-a89f031d.js';
import './index-213c70d0.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './interfaces-0d0bef14.js';
import './generate-random-string-1436d9e6.js';
import './_deep-map-values-53f8dbd1.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';

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
    registerInstance(this, hostRef);
    this.arcgisHubEventGalleryCardEditorChange = createEvent(this, "arcgisHubEventGalleryCardEditorChange", 7);
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
    this._context = getGlobalContext();
    this.schema = undefined;
    this.uiSchema = undefined;
    this.site = undefined;
    this.values = undefined;
  }
  /**
   * Wires up the component to receive global context when the component mounts to the DOM
   */
  connectedCallback() {
    connectContext(this);
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Loads the schema and uiSchema
   */
  async loadSchemas() {
    var _a, _b;
    if (this.site && this._context.currentUser) {
      const { uiSchema, schema } = await getEditorConfig('fields', 'hub:card:eventGallery', { tags: (_b = (_a = this.site) === null || _a === void 0 ? void 0 : _a.tags) !== null && _b !== void 0 ? _b : [] }, this._context);
      this.schema = schema;
      this.uiSchema = interpolateTranslations(this.intl, uiSchema);
    }
    else {
      this.schema = undefined;
      this.uiSchema = undefined;
    }
  }
  get _values() {
    return migrateEventGalleryCardSchema(this.values);
  }
  /**
   * Primary render method
   */
  render() {
    return (h(Host, { "data-element": "event-gallery-card-editor" }, this.schema && this.uiSchema && (h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleConfigurationEditorChange, schema: this.schema, t: this.translationFn, uiSchema: this.uiSchema, values: this._values }, h("arcgis-hub-add-content", { buttonProps: { width: 'full', appearance: 'outline' }, config: {
        create: {
          workflow: "create",
          targetEntity: "event",
          types: ["Event"],
        },
        state: 'enabled'
      }, entityType: "event", onArcgisHubAddContentWorkflowComplete: this.handleAddContentComplete, site: this.site, slot: "add-content-slot" })))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "site": ["loadSchemas"],
    "_context": ["loadSchemas"]
  }; }
};
__decorate([
  MemoizeDecoratorFactory('values')
], ArcgisHubEventGalleryCardEditor.prototype, "_values", null);
ArcgisHubEventGalleryCardEditor.style = arcgisHubEventGalleryCardEditorCss;

export { ArcgisHubEventGalleryCardEditor as arcgis_hub_event_gallery_card_editor };
