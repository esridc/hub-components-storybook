'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const resources = require('./resources-42021303.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const types = require('./types-60347c5c.js');
require('./index-f4a4c954.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./get-family-cafa88bb.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');
require('./InitiativeSchema-5a0a1956.js');
require('./SiteSchema-85074143.js');
require('./DiscussionSchema-24407ed6.js');
require('./PageSchema-f15eb977.js');
require('./ContentSchema-92224d5f.js');
require('./TemplateSchema-d46d6f3b.js');
require('./GroupSchema-e21948a6.js');
require('./InitiativeTemplateSchema-c5d2cb31.js');
require('./SurveySchema-9ec907b6.js');
require('./EventSchemaCreate-bf05e6ea.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./types-751ad3a9.js');
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');

const arcgisHubEntityDiscussionSettingsPaneCss = ":host{display:block;height:100%}arcgis-hub-workspace-pane{--arcgis-configuration-form-footer-max-width:800px;--arcgis-configuration-form-footer-scalable-padding:0.5rem}";

const ArcgisHubEntityDiscussionSettingsPane = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.footerSlotEl = undefined;
  }
  /**
   * Component will load lifecycle method. Loads translations and dependencies
   */
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get _context() { return state.getGlobalContext(); }
  /**
   * EditorType string contructed from entity type
   */
  get editorType() {
    return `hub:${this.type}:discussions`;
  }
  /**
   * Entity type
   */
  get type() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
  }
  get isDisabled() {
    return !checkPermission.checkPermission(`hub:${this.type}:edit`, this._context, this.entity).access;
  }
  get messageOverrides() {
    return Object.assign({}, (this.isDisabled && { primaryBtnTooltip: this.intl.t('disabledTooltip', { type: this.type }) }));
  }
  handleEditorChanged(event) {
    // intercept and re-cast the event for parity with other panes
    event.preventDefault();
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.values,
      isDirty: true,
    });
  }
  handleEditorSaved(event) {
    // intercept and re-cast the event for parity with other panes
    event.preventDefault();
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.entity,
      isDirty: !event.detail.isSuccess
    });
  }
  /**
   * Primary render method
   */
  render() {
    return (index.h(index.Host, { "data-element": "entity-discussion-settings-pane" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, stickyFooter: true }, index.h("h1", { slot: "title" }, this.intl.t('discussions')), this.footerSlotEl && types.validEditorTypes.includes(this.editorType) && index.h("arcgis-hub-entity-editor", { editorType: this.editorType, entity: this.entity, footerSlotRef: this.footerSlotEl, isDisabled: this.isDisabled, messageOverrides: this.messageOverrides, variant: resources.CONFIGURATION_VARIANTS.workspace }), index.h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityDiscussionSettingsPane.style = arcgisHubEntityDiscussionSettingsPaneCss;

exports.arcgis_hub_entity_discussion_settings_pane = ArcgisHubEntityDiscussionSettingsPane;
