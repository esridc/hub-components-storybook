'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const getEditorConfig = require('./getEditorConfig-1d006950.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./_deep-map-values-d489006b.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');

const arcgisStatCardEditorCss = ":host{display:block}";

const ArcgisStatCardEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisStatCardEditorChange = index.createEvent(this, "arcgisStatCardEditorChange", 7);
    this.values = {};
    this.themeColors = [];
    this.currentValues = {};
    this._schema = undefined;
    this._uiSchema = undefined;
    this._context = state.getGlobalContext();
    context.bind(this, 'handleEditorChangeEvent', 'translationFunc', '_getEditorConfig');
  }
  connectedCallback() {
    state.connectContext(this);
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    // migrate hover correctly
    this.values = this.migrateValues(this.values);
    this.currentValues = this.values;
    // start getting schema and uischema asynchronously
    this._getEditorConfig();
    // this._uiSchema = getUiSchema(this.uiSchemaOptions);
  }
  async _getEditorConfig() {
    const config = await getEditorConfig.getEditorConfig("", "hub:card:stat", this.uiSchemaOptions, this._context);
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
    return this._schema ? index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChangeEvent, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this.values }) : index.h("arcgis-skeleton-loader", { active: true });
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "_context": ["updateSchemas"]
  }; }
};
ArcgisStatCardEditor.style = arcgisStatCardEditorCss;

exports.arcgis_stat_card_editor = ArcgisStatCardEditor;
