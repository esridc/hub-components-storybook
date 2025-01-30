import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { v as validEditorTypes } from './types-1fca2e83.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './get-family-543fac52.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';
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

const arcgisHubEntityDiscussionSettingsPaneCss = ":host{display:block;height:100%}arcgis-hub-workspace-pane{--arcgis-configuration-form-footer-max-width:800px;--arcgis-configuration-form-footer-scalable-padding:0.5rem}";

const ArcgisHubEntityDiscussionSettingsPane = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.footerSlotEl = undefined;
  }
  /**
   * Component will load lifecycle method. Loads translations and dependencies
   */
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _context() { return getGlobalContext(); }
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
    return getTypeFromEntity(this.entity);
  }
  get isDisabled() {
    return !checkPermission(`hub:${this.type}:edit`, this._context, this.entity).access;
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
    return (h(Host, { "data-element": "entity-discussion-settings-pane" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('discussions')), this.footerSlotEl && validEditorTypes.includes(this.editorType) && h("arcgis-hub-entity-editor", { editorType: this.editorType, entity: this.entity, footerSlotRef: this.footerSlotEl, isDisabled: this.isDisabled, messageOverrides: this.messageOverrides, variant: CONFIGURATION_VARIANTS.workspace }), h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityDiscussionSettingsPane.style = arcgisHubEntityDiscussionSettingsPaneCss;

export { ArcgisHubEntityDiscussionSettingsPane as arcgis_hub_entity_discussion_settings_pane };
