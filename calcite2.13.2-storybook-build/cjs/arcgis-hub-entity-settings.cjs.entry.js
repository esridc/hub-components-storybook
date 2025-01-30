'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const resources = require('./resources-42021303.js');
const state = require('./state-6637df8c.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const types = require('./types-60347c5c.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const hostedServiceUtils = require('./hostedServiceUtils-236344a8.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./get-family-cafa88bb.js');
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
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');

const arcgisHubEntitySettingsCss = ".sc-arcgis-hub-entity-settings-h{display:block;height:100%}.entity-settings__entity-name.sc-arcgis-hub-entity-settings{margin-top:1rem;font-weight:var(--calcite-font-weight-bold)}.entity-settings__deleteBtn.sc-arcgis-hub-entity-settings{width:-moz-fit-content;width:fit-content}calcite-modal.sc-arcgis-hub-entity-settings{--calcite-modal-context-text-internal:var(--calcite-font-size-0)}arcgis-hub-workspace-pane.sc-arcgis-hub-entity-settings{--arcgis-hub-workspace-pane-max-width:55rem;--arcgis-configuration-form-footer-max-width:800px}arcgis-hub-entity-editor.sc-arcgis-hub-entity-settings{width:100%}h1[slot=\"title\"].sc-arcgis-hub-entity-settings{margin:0px;font-size:var(--calcite-font-size-3);line-height:2rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}";

const ArcgisHubEntitySettings = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspacePaneEntityDelete = index.createEvent(this, "arcgisHubWorkspacePaneEntityDelete", 7);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.isDeleteModalOpen = undefined;
    this.footerSlotEl = undefined;
    this.workspacePane = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get _context() { return state.getGlobalContext(); }
  get editorType() {
    return `hub:${this.type}:settings`;
  }
  get type() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
  }
  get showSettingsEditor() {
    return this.footerSlotEl && this.isValidEditorType;
  }
  get showDeleteConfirmation() {
    return this.type !== "user";
  }
  get isValidEditorType() {
    return types.validEditorTypes.includes(this.editorType);
  }
  get canAccessPane() {
    // check the pane permissions
    const permission = `hub:${this.type}:workspace:settings`;
    return checkPermission.checkPermission(permission, this._context, this.entity).access;
  }
  get isFormDisabled() {
    return !checkPermission.checkPermission(`hub:${this.type}:edit`, this._context, this.entity).access;
  }
  get formMessageOverrides() {
    return Object.assign({}, (this.isFormDisabled && { primaryBtnTooltip: this.intl.t('formDisabledTooltip', { type: this.type }) }));
  }
  handleEditorChanged(event) {
    // intercept and re-cast the event for parity with other panes
    event.preventDefault();
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.values,
      isDirty: true,
    });
    // TODO: Remove once other panes are updated to use the new event
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
  handleEntityDelete(event) {
    event.preventDefault();
    this.arcgisHubWorkspacePaneEntityDelete.emit(this.entity);
  }
  renderSidePanel() {
    let panelContent;
    switch (this.type) {
      case 'content':
        if (hostedServiceUtils.isHostedFeatureServiceMainEntity(this.entity)) {
          const i18nScope = 'sidePanel.content.extractNotice';
          panelContent = index.h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, index.h("div", { slot: "title" }, this.intl.t(`${i18nScope}.title`)), index.h("div", { slot: "message" }, this.intl.t(`${i18nScope}.message`, {
            docLink: (...str) => (index.h("calcite-link", { href: "https://doc.arcgis.com/en/arcgis-online/manage-data/use-hosted-layers.htm#GUID-47A1D795-B330-45D7-89F7-9203A99E6924", iconEnd: "launch", target: "_blank" }, str))
          })));
        }
        break;
    }
    return panelContent && index.h("div", { slot: "side-panel" }, panelContent);
  }
  render() {
    return this.canAccessPane ? this.renderSettings() : this.renderAccessDenied();
  }
  renderDeleteConfirmation() {
    return (index.h("arcgis-hub-delete-confirmation", { entity: this.entity, titleText: this.intl.t(`delete.${this.type}`) }, index.h("p", { slot: "controls-before" }, this.intl.t(`delete.desc.${this.type}`))));
  }
  /**
   * User does not have access to the pane
   * @returns
   */
  renderAccessDenied() {
    return (index.h(index.Host, { "data-element": "entity-settings" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, index.h("div", null, index.h("arcgis-hub-help-state", { state: "access-denied" })))));
  }
  renderSettings() {
    return (index.h(index.Host, { "data-element": "entity-settings" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, ref: (el) => { this.workspacePane = el; }, stickyFooter: true }, index.h("h1", { slot: "title" }, this.intl.t('settings')), index.h("div", null, this.showSettingsEditor && index.h("arcgis-hub-entity-editor", { editorType: this.editorType, entity: this.entity, footerSlotRef: this.footerSlotEl, isDisabled: this.isFormDisabled, messageOverrides: this.formMessageOverrides, variant: resources.CONFIGURATION_VARIANTS.workspace }), this.showDeleteConfirmation && this.renderDeleteConfirmation()), (this.isValidEditorType) && index.h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }), this.renderSidePanel())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntitySettings.style = arcgisHubEntitySettingsCss;

exports.arcgis_hub_entity_settings = ArcgisHubEntitySettings;
