import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { b as buttonColorToKind } from './calcite-8adaad92.js';
import { b as capitalize } from './util-3e6872d9.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './get-prop-ec5be510.js';

const arcgisHubNewContentCss = ".sc-arcgis-hub-new-content-h{display:block}.sc-arcgis-hub-new-content-h:not([unthemed]) calcite-dropdown.sc-arcgis-hub-new-content{--calcite-color-background:#f8f8f8;--calcite-color-foreground-1:#ffffff;--calcite-color-foreground-2:#f3f3f3}.sc-arcgis-hub-new-content-h:not([unthemed]) .hub-new-content_dropdown-group.sc-arcgis-hub-new-content{--calcite-color-brand:var(--calcite-color-border-1);--calcite-color-text-1:#151515;--calcite-color-text-2:#4a4a4a;--calcite-color-text-3:#6a6a6a;--calcite-color-border-1:#cacaca;--calcite-color-border-3:#dfdfdf;--calcite-color-text-link:#151515;--calcite-link-blue-underline:#151515}.hub-new-content_dropdown-group.sc-arcgis-hub-new-content:not(.mobile){max-width:20rem;max-height:80vh;overflow-y:scroll}.hub-new-content_dropdown-item.sc-arcgis-hub-new-content{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding-top:0.25rem;padding-bottom:0.25rem}.hub-new-content_dropdown-item--left.sc-arcgis-hub-new-content{display:flex}.hub-new-content_dropdown-item-content.sc-arcgis-hub-new-content{display:flex;flex-direction:column}.hub-new-content_dropdown-item-icon.sc-arcgis-hub-new-content{height:70px;width:70px;margin-right:0.75rem;display:flex;align-items:center;background-color:var(--calcite-color-background)}.hub-new-content_dropdown-item-icon.sc-arcgis-hub-new-content calcite-icon.sc-arcgis-hub-new-content{width:70px}.hub-new-content_dropdown-item-title.sc-arcgis-hub-new-content,.hub-new-content_dropdown-item-description.sc-arcgis-hub-new-content,calcite-dropdown-item.sc-arcgis-hub-new-content calcite-link.sc-arcgis-hub-new-content{font-family:var(--calcite-sans-family);font-weight:var(--calcite-font-weight-normal);font-size:var(--calcite-font-size--1);line-height:1.375rem;white-space:normal;overflow-wrap:break-word}.hub-new-content_dropdown-item-title.sc-arcgis-hub-new-content{margin-bottom:0.25rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.hub-new-content_dropdown-item-description.sc-arcgis-hub-new-content{color:var(--calcite-color-text-2)}.new-content-modal__header.sc-arcgis-hub-new-content{margin-bottom:2rem;display:flex;flex-direction:column;align-items:center;padding-left:2.5rem;padding-right:2.5rem}.new-content-modal__header.sc-arcgis-hub-new-content h2.sc-arcgis-hub-new-content{margin-bottom:1rem;margin-top:1rem;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold)}.new-content-modal__header.sc-arcgis-hub-new-content span.sc-arcgis-hub-new-content{max-width:90%;text-align:center}.new-content-modal__header-icon.sc-arcgis-hub-new-content{border-radius:50%;border-width:1px;border-style:solid}.new-content-modal__header-icon.sc-arcgis-hub-new-content calcite-icon.sc-arcgis-hub-new-content{margin:1.5rem}calcite-button.sc-arcgis-hub-new-content[shouldbedisabled].sc-arcgis-hub-new-content{pointer-events:none;opacity:0.5}arcgis-hub-entity-editor.sc-arcgis-hub-new-content{white-space:normal}";

const ArcgisHubNewContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubNewContentSuccess = createEvent(this, "arcgisHubNewContentSuccess", 7);
    this.arcgisHubNewContentError = createEvent(this, "arcgisHubNewContentError", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.handleDropdownSelect = (evt) => {
      const el = evt.currentTarget;
      this.selectedEntityIdx = el.getAttribute('data-index');
      this.handleEntitySelected();
    };
    this.handleResourceLinkClick = (evt) => {
      const el = evt.currentTarget;
      const key = el.getAttribute('data-value');
      const telemetry = dist.dictionary.category.navigation.action.new.label.content.details[key];
      telemetry && this.hubTelemetry.emit(telemetry);
    };
    /**
     * when an entity is selected from the dropdown, we either
     * redirect to the entity's provided href, or we open the
     * creation form in-place
     */
    this.handleEntitySelected = () => {
      var _a, _b;
      if (this.selectedEntity.href) {
        dist.dictionary.category.navigation.action.new.label.content.details[(_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.key]
          ? this.hubTelemetry.emit(dist.dictionary.category.navigation.action.new.label.content.details[(_b = this.selectedEntity) === null || _b === void 0 ? void 0 : _b.key])
          : this.hubTelemetry.emit(dist.dictionary.category.navigation.action.new.label.content);
      }
      else {
        this.toggleForm(true);
      }
    };
    /**
     * workaround for dropdown scrolling issue. Technically this should be addressed
     * by passing in the max-items prop to the dropdown, but there are a couple issues
     * on calcite's end:
     * https://github.com/Esri/calcite-components/issues/6230
     * https://github.com/Esri/calcite-components/issues/6242
     * TODO: remove when calcite issues are addressed
     */
    this.handleCalciteDropdownRef = (dropdown) => {
      if (dropdown.shadowRoot && !dropdown.shadowRoot.querySelector('style[data-hub]')) {
        const style = document.createElement("style");
        style.dataset.hub = "";
        style.innerHTML = ".calcite-dropdown-content { max-block-size: max-content !important; }";
        dropdown.shadowRoot.appendChild(style);
      }
    };
    this.handleEntityEditorSaved = async (evt) => {
      const { entity, isSuccess, error } = evt.detail;
      if (isSuccess) {
        this.toggleForm(false);
        this.arcgisHubNewContentSuccess.emit(entity);
      }
      else {
        this.arcgisHubNewContentError.emit(error);
      }
    };
    /**
     * because we wrap the arcgis-hub-entity-editor in a wormhole, we
     * intercept its telemetry and re-emit it from this component so
     * we don't loose the DOM context
     */
    this.handleHubTelemetry = (evt) => {
      evt.stopPropagation();
      this.hubTelemetry.emit(evt.detail);
    };
    /**
     * if an entity has an in-place creation form (rather than a
     * redirect link), we open that form in a modal
     */
    this.toggleForm = async (isOpen) => {
      var _a, _b;
      this.isMobileDropdownOpen = false;
      this.isFormOpen = isOpen;
      /**
       * Note: if we support more entities in this modal workflow,
       * we will need to add dictionary entries for them that follow
       * this convension so that we log telemetry when the creation
       * modal is opened/closed
       */
      this.selectedEntity && this.hubTelemetry.emit(isOpen
        ? dist.dictionary.category.interaction.action.open.label.modal.details[`create${capitalize((_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.key)}`]
        : dist.dictionary.category.interaction.action.close.label.modal.details[`create${capitalize((_b = this.selectedEntity) === null || _b === void 0 ? void 0 : _b.key)}`]);
    };
    this.onOpenMobileDropdownButtonClick = () => {
      this.isMobileDropdownOpen = true;
    };
    this.onCloseMobileDropdownButttonClick = () => {
      this.isMobileDropdownOpen = false;
    };
    this.buttonAppearance = undefined;
    this.buttonColor = undefined;
    this.editorContext = undefined;
    this.entityConfigs = [];
    this.resourceLinks = [];
    this.renderAsDropdown = false;
    this.buttonScale = undefined;
    this.isMobile = false;
    this.selectedEntityIdx = undefined;
    this.isFormOpen = false;
    this.isFormModalOpen = false;
    this.isMobileDropdownOpen = false;
  }
  handleArcgisHubNewContentModalOpen() {
    this.isFormModalOpen = true;
  }
  handleArcgisHubNewContentModalClosed() {
    this.toggleForm(false);
    this.selectedEntityIdx = null;
    this.isFormModalOpen = false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get isSingleEntity() {
    return this.entityConfigs.length === 1;
  }
  /**
   * keep track of the selected entity based on what the user
   * selects from the dropdown menu. Or, if there is only a
   * single entity, set that as the selected entity
   */
  get selectedEntity() {
    return this.isSingleEntity
      ? this.entityConfigs[0]
      : this.entityConfigs[this.selectedEntityIdx];
  }
  get hasResourceLinks() {
    return !!this.resourceLinks.length;
  }
  get formTitle() {
    var _a, _b;
    return ((_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.formLabel) || this.intl.t(`${(_b = this.selectedEntity) === null || _b === void 0 ? void 0 : _b.key}.newLabel`);
  }
  get formDescription() {
    var _a, _b;
    return ((_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.description) || this.intl.t(`${(_b = this.selectedEntity) === null || _b === void 0 ? void 0 : _b.key}.description`);
  }
  get editorType() {
    var _a, _b;
    return ((_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.editorType) || `hub:${(_b = this.selectedEntity) === null || _b === void 0 ? void 0 : _b.key}:create`;
  }
  getIcon(entityConfig) {
    // if an icon is not provided in the config, fallback to a default
    const DEFAULT_ICONS = {
      site: "globe",
      initiative: "initiative",
      app: "apps",
      content: "file",
      project: "projects",
      discussion: "speech-bubbles",
      feedback: "survey",
      event: "event",
      group: "group",
      template: "initiative-template"
    };
    return entityConfig.icon || DEFAULT_ICONS[entityConfig.key] || "file";
  }
  /**
   * render the main "New" dropdown button:
   * - if we're on a mobile device, this will render as a "+" button
   * - if there's only a single entity, and we haven't specified that
   * it should render as a dropdown, we render a simple calcite button
   * - if there are multiple entities, we render a calcite dropdown
   */
  renderNewDropdownButton(entityConfigs, resourceLinks) {
    let button;
    if (this.isMobile) {
      button = (h("calcite-button", { appearance: this.buttonAppearance, kind: buttonColorToKind(this.buttonColor), onClick: this.onOpenMobileDropdownButtonClick, scale: this.buttonScale }, h("calcite-icon", { icon: "plus", scale: this.buttonScale })));
    }
    else {
      button = this.isSingleEntity && !this.renderAsDropdown
        ? (h("arcgis-ref-tooltip", { overlayPositioning: 'fixed', placement: "bottom", text: entityConfigs[0].disabled && entityConfigs[0].disabledTooltip || '' }, h("calcite-button", { appearance: this.buttonAppearance, href: entityConfigs[0].href, kind: buttonColorToKind(this.buttonColor), onClick: entityConfigs[0].disabled ? null : this.handleEntitySelected, round: true, scale: this.buttonScale, shouldBeDisabled: entityConfigs[0].disabled }, entityConfigs[0].label || this.intl.t(`${entityConfigs[0].key}.createLabel`))))
        : this.renderDropdown(entityConfigs, resourceLinks);
    }
    return button;
  }
  renderDropdown(entityConfigs, resourceLinks) {
    return (h("calcite-dropdown", { ref: this.handleCalciteDropdownRef }, h("calcite-button", { appearance: this.buttonAppearance, "icon-end": "caret-down", kind: buttonColorToKind(this.buttonColor), scale: this.buttonScale, slot: "trigger" }, this.intl.t('new')), this.renderDropdownContent(entityConfigs, resourceLinks)));
  }
  /**
   * render the "dropdown" modal that opens when a user
   * is on a mobile device. We render the entities and
   * resource links in exactly the same way as non-mobile,
   * we just render them in a modal instead of a dropdown
   */
  renderMobileDropdown(entityConfigs, resourceLinks) {
    return (h("calcite-modal", { onCalciteModalClose: this.onCloseMobileDropdownButttonClick, open: this.isMobileDropdownOpen }, h("div", { slot: "header" }, this.intl.t('new')), h("div", { slot: "content" }, this.renderDropdownContent(entityConfigs, resourceLinks))));
  }
  renderDropdownContent(entityConfigs, resourceLinks) {
    return (h(Fragment, null, this.renderEntityItems(entityConfigs), this.hasResourceLinks && this.renderResourceLinks(resourceLinks)));
  }
  renderEntityItems(entityConfigs) {
    return (h("calcite-dropdown-group", { class: { "hub-new-content_dropdown-group": true, "mobile": this.isMobile }, "selection-mode": "none" }, entityConfigs.map((entity, idx) => this.renderEntityItem(entity, idx))));
  }
  renderEntityItem(entity, index) {
    return (h("calcite-dropdown-item", { "data-index": index, "data-value": entity.key, href: entity.href, key: entity.key, onCalciteDropdownItemSelect: this.handleDropdownSelect }, h("div", { class: "hub-new-content_dropdown-item" }, h("div", { class: "hub-new-content_dropdown-item--left" }, h("div", { class: "hub-new-content_dropdown-item-icon" }, h("calcite-icon", { icon: this.getIcon(entity), scale: "l" })), h("div", { class: "hub-new-content_dropdown-item-content" }, h("div", { class: "hub-new-content_dropdown-item-title" }, entity.label || this.intl.t(`${entity.key}.label`)), h("div", { class: "hub-new-content_dropdown-item-description" }, entity.description || this.intl.t(`${entity.key}.description`)))))));
  }
  renderResourceLinks(resourceLinks) {
    return (h("calcite-dropdown-group", { class: { "hub-new-content_dropdown-group": true, "mobile": this.isMobile }, "selection-mode": "none" }, resourceLinks.map(resourceLink => this.renderResourceLink(resourceLink))));
  }
  renderResourceLink(resourceLink) {
    return (h("calcite-dropdown-item", { "data-value": resourceLink.key, href: resourceLink.href, key: resourceLink.label, onClick: this.handleResourceLinkClick }, h("calcite-link", null, resourceLink.label)));
  }
  renderFormHeader() {
    return (h("div", { class: "new-content-modal__header" }, h("div", { class: "new-content-modal__header-icon" }, h("calcite-icon", { icon: this.getIcon(this.selectedEntity), scale: "l" })), h("h2", null, this.formTitle), h("span", null, this.formDescription)));
  }
  /**
   * if an entity has an in-place creation form, we render
   * the form in a modal
   */
  renderForm() {
    var _a;
    return (h("arcgis-hub-entity-editor", { editorContext: this.editorContext, editorType: this.editorType, entity: (_a = this.selectedEntity) === null || _a === void 0 ? void 0 : _a.defaults, isOpen: this.isFormOpen, layout: "modal", onArcgisHubEntityEditorSaved: this.handleEntityEditorSaved, onHubTelemetry: this.handleHubTelemetry }, 
    // we only render the form's slotted content
    // once the modal has been opened, otherwise
    // there's a small glitch where the content
    // renders prematurely (outside of the form)
    // when the form opens
    this.isFormModalOpen && (h(Fragment, null, h("div", { slot: "header" }, this.formTitle), h("div", { slot: "form-start" }, this.renderFormHeader())))));
  }
  render() {
    let dataElement = "new-content";
    if (this.selectedEntity) {
      dataElement = this.isFormOpen
        ? `new-${this.selectedEntity.key}-modal`
        : `new-${this.selectedEntity.key}`;
    }
    return (h(Host, { "data-element": dataElement }, !!this.entityConfigs.length && this.renderNewDropdownButton(this.entityConfigs, this.resourceLinks), this.isFormOpen && this.renderForm(), this.isMobile && this.renderMobileDropdown(this.entityConfigs, this.resourceLinks)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubNewContent.style = arcgisHubNewContentCss;

export { ArcgisHubNewContent as arcgis_hub_new_content };
