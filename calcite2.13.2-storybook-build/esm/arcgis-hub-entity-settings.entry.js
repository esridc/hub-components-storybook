import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { v as validEditorTypes } from './types-1fca2e83.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { a as isHostedFeatureServiceMainEntity } from './hostedServiceUtils-f22b023b.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './get-family-543fac52.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';
import './InitiativeSchema-4fb31f85.js';
import './SiteSchema-3e282ce1.js';
import './DiscussionSchema-6e5016d0.js';
import './PageSchema-4cbe3bd9.js';
import './ContentSchema-d913d8e9.js';
import './TemplateSchema-83e65297.js';
import './GroupSchema-13ff9290.js';
import './InitiativeTemplateSchema-bf5d8531.js';
import './SurveySchema-0fcb1d64.js';
import './EventSchemaCreate-2f6ba245.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './types-db540898.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';

const arcgisHubEntitySettingsCss = ".sc-arcgis-hub-entity-settings-h{display:block;height:100%}.entity-settings__entity-name.sc-arcgis-hub-entity-settings{margin-top:1rem;font-weight:var(--calcite-font-weight-bold)}.entity-settings__deleteBtn.sc-arcgis-hub-entity-settings{width:-moz-fit-content;width:fit-content}calcite-modal.sc-arcgis-hub-entity-settings{--calcite-modal-context-text-internal:var(--calcite-font-size-0)}arcgis-hub-workspace-pane.sc-arcgis-hub-entity-settings{--arcgis-hub-workspace-pane-max-width:55rem;--arcgis-configuration-form-footer-max-width:800px}arcgis-hub-entity-editor.sc-arcgis-hub-entity-settings{width:100%}h1[slot=\"title\"].sc-arcgis-hub-entity-settings{margin:0px;font-size:var(--calcite-font-size-3);line-height:2rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}";

const ArcgisHubEntitySettings = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWorkspacePaneEntityDelete = createEvent(this, "arcgisHubWorkspacePaneEntityDelete", 7);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.isDeleteModalOpen = undefined;
    this.footerSlotEl = undefined;
    this.workspacePane = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _context() { return getGlobalContext(); }
  get editorType() {
    return `hub:${this.type}:settings`;
  }
  get type() {
    return getTypeFromEntity(this.entity);
  }
  get showSettingsEditor() {
    return this.footerSlotEl && this.isValidEditorType;
  }
  get showDeleteConfirmation() {
    return this.type !== "user";
  }
  get isValidEditorType() {
    return validEditorTypes.includes(this.editorType);
  }
  get canAccessPane() {
    // check the pane permissions
    const permission = `hub:${this.type}:workspace:settings`;
    return checkPermission(permission, this._context, this.entity).access;
  }
  get isFormDisabled() {
    return !checkPermission(`hub:${this.type}:edit`, this._context, this.entity).access;
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
        if (isHostedFeatureServiceMainEntity(this.entity)) {
          const i18nScope = 'sidePanel.content.extractNotice';
          panelContent = h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, h("div", { slot: "title" }, this.intl.t(`${i18nScope}.title`)), h("div", { slot: "message" }, this.intl.t(`${i18nScope}.message`, {
            docLink: (...str) => (h("calcite-link", { href: "https://doc.arcgis.com/en/arcgis-online/manage-data/use-hosted-layers.htm#GUID-47A1D795-B330-45D7-89F7-9203A99E6924", iconEnd: "launch", target: "_blank" }, str))
          })));
        }
        break;
    }
    return panelContent && h("div", { slot: "side-panel" }, panelContent);
  }
  render() {
    return this.canAccessPane ? this.renderSettings() : this.renderAccessDenied();
  }
  renderDeleteConfirmation() {
    return (h("arcgis-hub-delete-confirmation", { entity: this.entity, titleText: this.intl.t(`delete.${this.type}`) }, h("p", { slot: "controls-before" }, this.intl.t(`delete.desc.${this.type}`))));
  }
  /**
   * User does not have access to the pane
   * @returns
   */
  renderAccessDenied() {
    return (h(Host, { "data-element": "entity-settings" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, h("div", null, h("arcgis-hub-help-state", { state: "access-denied" })))));
  }
  renderSettings() {
    return (h(Host, { "data-element": "entity-settings" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, ref: (el) => { this.workspacePane = el; }, stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('settings')), h("div", null, this.showSettingsEditor && h("arcgis-hub-entity-editor", { editorType: this.editorType, entity: this.entity, footerSlotRef: this.footerSlotEl, isDisabled: this.isFormDisabled, messageOverrides: this.formMessageOverrides, variant: CONFIGURATION_VARIANTS.workspace }), this.showDeleteConfirmation && this.renderDeleteConfirmation()), (this.isValidEditorType) && h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }), this.renderSidePanel())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntitySettings.style = arcgisHubEntitySettingsCss;

export { ArcgisHubEntitySettings as arcgis_hub_entity_settings };
