import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
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

const arcgisHubEntityDetailsCss = ".sc-arcgis-hub-entity-details-h{display:block;height:100%}[slot='title'].sc-arcgis-hub-entity-details{margin:0px;font-size:var(--calcite-font-size-3);line-height:2rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}arcgis-hub-workspace-pane.sc-arcgis-hub-entity-details{--arcgis-hub-workspace-pane-max-width:var(--arcgis-hub-workspace-pane-max-width-value, 55rem);--arcgis-configuration-form-footer-max-width:800px;--arcgis-configuration-form-footer-scalable-padding:0.5rem}arcgis-hub-entity-editor.sc-arcgis-hub-entity-details{width:100%}";

const ArcgisHubEntityDetails = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.entity = undefined;
    this.pane = undefined;
    this.isMobile = false;
    this.values = undefined;
    this.footerSlotEl = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.setCssValues();
  }
  get _context() { return getGlobalContext(); }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  get isDisabled() {
    return !checkPermission(`hub:${this.entityType}:edit`, this._context, this.entity).access;
  }
  get messageOverrides() {
    return Object.assign({}, (this.isDisabled && { primaryBtnTooltip: this.intl.t('disabledTooltip', { type: this.entityType }) }));
  }
  /**
   * Whether or not we should be rendering the details side panel
   */
  get shouldRenderSidePanel() {
    return ["project", "initiative"].includes(this.entityType);
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
      isDirty: !event.detail.isSuccess,
    });
  }
  /** renders the pane's side panel */
  renderSidePanel() {
    const sidePanelInfo = {
      initiative: {
        href: "https://www.esri.com/arcgis-blog/products/arcgis-hub/announcements/introducing-redefined-initiatives-in-arcgis-hub/",
        telemetry: dist.dictionary.category.navigation.action.external.label.webHelp.details.learnMoreAboutHubInitiatives,
        text: this.intl.t('sidePanel.initiative.learnAbout'),
      },
      project: {
        href: "https://doc.arcgis.com/en/hub/initiatives/use-projects.htm",
        telemetry: dist.dictionary.category.navigation.action.external.label.webHelp.details.learnMoreAboutHubProjects,
        text: this.intl.t('sidePanel.project.learnAbout'),
      },
    };
    const { href, telemetry, text } = sidePanelInfo[this.entityType];
    return (h("div", { class: "entity-details__side-panel", slot: "side-panel" }, h("calcite-notice", { icon: "lightbulb", kind: "brand", open: true, width: "full" }, h("arcgis-hub-workspace-link", { href: href, iconEnd: "launch", slot: "link", target: "_blank", telemetry: telemetry }, text))));
  }
  /**
   * Dynamically sets the css values for the component
   */
  setCssValues() {
    // set max width of the pane based on whether or not we render the side panel
    this.element.style.setProperty('--arcgis-hub-workspace-pane-max-width-value', this.shouldRenderSidePanel ? '70rem' : '55rem');
  }
  render() {
    return (h(Host, { "data-element": "entity-details" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('details')), this.footerSlotEl && h("arcgis-hub-entity-editor", { editorType: `hub:${this.entityType}:edit`, entity: this.entity, footerSlotRef: this.footerSlotEl, isDisabled: this.isDisabled, messageOverrides: this.messageOverrides, variant: CONFIGURATION_VARIANTS.workspace }), this.shouldRenderSidePanel && this.renderSidePanel(), h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityDetails.style = arcgisHubEntityDetailsCss;

export { ArcgisHubEntityDetails as arcgis_hub_entity_details };
