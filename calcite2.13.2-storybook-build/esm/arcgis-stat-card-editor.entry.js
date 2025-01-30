import { r as registerInstance, c as createEvent, h, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { g as getEditorConfig } from './getEditorConfig-a89f031d.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './_deep-map-values-53f8dbd1.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';

const arcgisStatCardEditorCss = ":host{display:block}";

const ArcgisStatCardEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisStatCardEditorChange = createEvent(this, "arcgisStatCardEditorChange", 7);
    this.values = {};
    this.themeColors = [];
    this.currentValues = {};
    this._schema = undefined;
    this._uiSchema = undefined;
    this._context = getGlobalContext();
    bind(this, 'handleEditorChangeEvent', 'translationFunc', '_getEditorConfig');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  get uiSchemaOptions() {
    return {
      themeColors: this.themeColors,
    };
  }
  /**
   * Facets not automatically created with catalogs, used by the gallery picker
   * for the dynamic stat card
   */
  get facets() {
    return [{
        label: this.intl.t('dynamicStat.facets.sharing'),
        key: 'access',
        field: 'access',
        display: 'multi-select',
        operation: 'OR',
      }
    ];
  }
  /**
   * Sets up internationalization and schema/uiSchema
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // migrate hover correctly
    this.values = this.migrateValues(this.values);
    this.currentValues = this.values;
    // start getting schema and uischema asynchronously
    this._getEditorConfig();
    // this._uiSchema = getUiSchema(this.uiSchemaOptions);
  }
  async _getEditorConfig() {
    const config = await getEditorConfig("", "hub:card:stat", this.uiSchemaOptions, this._context);
    this._schema = config.schema;
    this._uiSchema = config.uiSchema;
  }
  // the first version of the manual card had a switch for the shareableOnHover value, expecting
  // a true/false value. We now have a dropdown of values. Any cards that have a true/false
  // value will be "frozen" until the shareableOnHover value is updated, unless we migrate to an acceptable value.
  // Now, we've gone back to the switch instead of the string value...so we have to migrate again.
  migrateValues(values) {
    if (typeof values.shareableOnHover == "string") {
      values.shareableOnHover = values.shareableOnHover === 'hover';
    }
    // the "master switches" for the formatting and link switches migrate to have an initial and correct value
    // depending on if the original cards already had units / links.
    if (values.allowUnitFormatting === undefined) {
      values.allowUnitFormatting = !!values.unit;
    }
    if (values.allowLink === undefined) {
      values.allowLink = !!values.sourceLink || !!values.sourceTitle;
    }
    if (values.valueColor === null) {
      values.valueColor = undefined;
    }
    return values;
  }
  /**
   * Event handler firing on arcgis-stat-card-editor change
   * @param event CustomEvent<IChangeEventDetail> from arcgis-configuration-editor
   */
  async handleEditorChangeEvent(event) {
    var _a;
    event.stopPropagation();
    const { valid, values } = event.detail;
    this.currentValues = Object.assign(Object.assign({}, this.currentValues), values);
    let { legacyWhere } = this.currentValues;
    // if we use the new expression builder, reset the legacy where clause
    if ((_a = values.expressionSet) === null || _a === void 0 ? void 0 : _a.length) {
      legacyWhere = '';
    }
    this.arcgisStatCardEditorChange.emit({ valid, values: Object.assign(Object.assign({}, values), { cardId: this.currentValues.cardId, schemaVersion: this.currentValues.schemaVersion, legacyWhere }) });
  }
  /**
   * Updates ui schema -- must watch context in case there is any change in authentication
   */
  updateSchemas() {
    this._getEditorConfig();
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  render() {
    return this._schema ? h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChangeEvent, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.values }) : h("arcgis-skeleton-loader", { active: true });
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["updateSchemas"]
  }; }
};
ArcgisStatCardEditor.style = arcgisStatCardEditorCss;

export { ArcgisStatCardEditor as arcgis_stat_card_editor };
