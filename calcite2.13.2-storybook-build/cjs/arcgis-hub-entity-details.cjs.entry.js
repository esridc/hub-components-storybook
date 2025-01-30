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
const index$1 = require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
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

const arcgisHubEntityDetailsCss = ".sc-arcgis-hub-entity-details-h{display:block;height:100%}[slot='title'].sc-arcgis-hub-entity-details{margin:0px;font-size:var(--calcite-font-size-3);line-height:2rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}arcgis-hub-workspace-pane.sc-arcgis-hub-entity-details{--arcgis-hub-workspace-pane-max-width:var(--arcgis-hub-workspace-pane-max-width-value, 55rem);--arcgis-configuration-form-footer-max-width:800px;--arcgis-configuration-form-footer-scalable-padding:0.5rem}arcgis-hub-entity-editor.sc-arcgis-hub-entity-details{width:100%}";

const ArcgisHubEntityDetails = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.entity = undefined;
    this.pane = undefined;
    this.isMobile = false;
    this.values = undefined;
    this.footerSlotEl = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.setCssValues();
  }
  get _context() { return state.getGlobalContext(); }
  get entityType() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
  }
  get isDisabled() {
    return !checkPermission.checkPermission(`hub:${this.entityType}:edit`, this._context, this.entity).access;
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
        telemetry: index$1.dist.dictionary.category.navigation.action.external.label.webHelp.details.learnMoreAboutHubInitiatives,
        text: this.intl.t('sidePanel.initiative.learnAbout'),
      },
      project: {
        href: "https://doc.arcgis.com/en/hub/initiatives/use-projects.htm",
        telemetry: index$1.dist.dictionary.category.navigation.action.external.label.webHelp.details.learnMoreAboutHubProjects,
        text: this.intl.t('sidePanel.project.learnAbout'),
      },
    };
    const { href, telemetry, text } = sidePanelInfo[this.entityType];
    return (index.h("div", { class: "entity-details__side-panel", slot: "side-panel" }, index.h("calcite-notice", { icon: "lightbulb", kind: "brand", open: true, width: "full" }, index.h("arcgis-hub-workspace-link", { href: href, iconEnd: "launch", slot: "link", target: "_blank", telemetry: telemetry }, text))));
  }
  /**
   * Dynamically sets the css values for the component
   */
  setCssValues() {
    // set max width of the pane based on whether or not we render the side panel
    this.element.style.setProperty('--arcgis-hub-workspace-pane-max-width-value', this.shouldRenderSidePanel ? '70rem' : '55rem');
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-details" }, index.h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, stickyFooter: true }, index.h("h1", { slot: "title" }, this.intl.t('details')), this.footerSlotEl && index.h("arcgis-hub-entity-editor", { editorType: `hub:${this.entityType}:edit`, entity: this.entity, footerSlotRef: this.footerSlotEl, isDisabled: this.isDisabled, messageOverrides: this.messageOverrides, variant: resources.CONFIGURATION_VARIANTS.workspace }), this.shouldRenderSidePanel && this.renderSidePanel(), index.h("div", { ref: (el) => { this.footerSlotEl = el; }, slot: "footer" }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityDetails.style = arcgisHubEntityDetailsCss;

exports.arcgis_hub_entity_details = ArcgisHubEntityDetails;
