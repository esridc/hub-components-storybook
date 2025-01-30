import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { g as getAccessIcon } from './get-access-icon-96cd94bd.js';
import { d as dist } from './index-dd3f99ac.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { g as getRelativeWorkspaceUrl } from './getRelativeWorkspaceUrl-ac123b7f.js';
import { b as capitalize } from './util-3e6872d9.js';
import { g as getItemHomeUrl } from './get-item-home-url-b414b731.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './_commonjsHelpers-11ca3be1.js';
import './get-family-543fac52.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './get-prop-ec5be510.js';
import './map-by-a2234e13.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';

const arcgisHubLayoutEditorHeaderCss = ":host{display:block}calcite-navigation{--calcite-navigation-background:var(--calcite-color-foreground-2);--foreground-1:var(--calcite-color-foreground-1)}calcite-menu-item{--calcite-color-foreground-1:var(--calcite-navigation-background);--calcite-color-foreground-2:var(--foreground-1)}calcite-popover{background-color:var(--calcite-color-foreground-2)}calcite-popover p{margin:0px;display:flex;max-width:20rem;flex-direction:column;gap:0.5rem;padding:0.75rem}calcite-popover .site-title{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold)}calcite-popover .site-title,calcite-popover .edit-site-btn{margin-bottom:0.25rem}calcite-popover p>div{display:flex;align-items:center;gap:0.5rem}.non-interactive{pointer-events:none}.controls-container{display:none;gap:1rem;margin-inline-end:1rem}[slot=\"content-center\"]{display:none}[slot=\"user\"]{display:flex;align-items:center;margin-inline-end:1rem}@media (min-width: 768px){[slot=\"content-center\"],.controls-container{display:flex}}";

const ArcgisHubLayoutEditorHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubLayoutEditorHeaderShare = createEvent(this, "arcgisHubLayoutEditorHeaderShare", 7);
    this.arcgisHubLayoutEditorHeaderPreviewPublished = createEvent(this, "arcgisHubLayoutEditorHeaderPreviewPublished", 7);
    this.arcgisHubLayoutEditorHeaderPreviewDraft = createEvent(this, "arcgisHubLayoutEditorHeaderPreviewDraft", 7);
    this.arcgisHubLayoutEditorHeaderPublish = createEvent(this, "arcgisHubLayoutEditorHeaderPublish", 7);
    this.arcgisHubLayoutEditorHeaderSave = createEvent(this, "arcgisHubLayoutEditorHeaderSave", 7);
    this.arcgisHubLayoutEditorHeaderClone = createEvent(this, "arcgisHubLayoutEditorHeaderClone", 7);
    this.arcgisHubLayoutEditorHeaderDeleteDraft = createEvent(this, "arcgisHubLayoutEditorHeaderDeleteDraft", 7);
    this.arcgisHubLayoutEditorHeaderDelete = createEvent(this, "arcgisHubLayoutEditorHeaderDelete", 7);
    this.arcgisHubLayoutEditorHeaderSaveAsTemplate = createEvent(this, "arcgisHubLayoutEditorHeaderSaveAsTemplate", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.handleWorkspaceItemClick = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.navigation.action.view.label.content.details.workspace });
    };
    this.handleSiteMenuItemClick = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.interaction.action.open.label.popover.details.site });
    };
    this.handleAccessChange = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.interaction.action.open.label.sidePanel.details.sharing });
      this.arcgisHubLayoutEditorHeaderShare.emit(this.entity);
    };
    this.handleEditS123ButtonClick = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.navigation.action.edit.label.content });
    };
    this.handleViewButtonClick = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.interaction.action.open.label.menu.details.view });
    };
    this.handlePreviewPublished = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.navigation.action.view.label.content.details.publishedDraft });
      this.arcgisHubLayoutEditorHeaderPreviewPublished.emit(this.entity);
    };
    this.handlePreviewDraft = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.navigation.action.view.label.content.details.previewDraft });
      this.arcgisHubLayoutEditorHeaderPreviewDraft.emit(this.entity);
    };
    this.handlePublish = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.content.action.update.label.layout.details.publish });
      this.arcgisHubLayoutEditorHeaderPublish.emit(this.entity);
    };
    this.handleSave = () => {
      this.arcgisHubLayoutEditorHeaderSave.emit(this.entity);
    };
    this.handleOverflowButtonClick = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.interaction.action.open.label.menu.details.options });
    };
    this.handleClone = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.content.action.create.label.site.details.clone });
      this.arcgisHubLayoutEditorHeaderClone.emit(this.entity);
    };
    this.handleDeleteDraft = () => {
      this.arcgisHubLayoutEditorHeaderDeleteDraft.emit(this.entity);
    };
    this.handleDelete = () => {
      const type = getTypeFromEntity(this.entity);
      const telemetry = dist.dictionary.category.content.action.delete.label[type];
      this.hubTelemetry.emit({ telemetry });
      this.arcgisHubLayoutEditorHeaderDelete.emit(this.entity);
    };
    this.handleSaveAsTemplate = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.content.action.create.label.template.details.site });
      this.arcgisHubLayoutEditorHeaderSaveAsTemplate.emit(this.entity);
    };
    this.handleEditLayout = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.navigation.action.view.label.content.details.layoutEditor });
    };
    this.handleViewSite = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.navigation.action.view.label.content.details.site });
    };
    this.entity = undefined;
    this.site = undefined;
    this.saveButtonDisabled = undefined;
    this.isDirty = undefined;
    this.isPublishing = undefined;
    this.isSaving = undefined;
    this.showClone = undefined;
    this.showDelete = undefined;
  }
  get context() { return getGlobalContext(); }
  get type() {
    return getTypeFromEntity(this.entity);
  }
  get isSite() {
    return this.type === 'site';
  }
  get isPage() {
    return this.type === 'page';
  }
  // Depending on the entity, we render different controls
  get entityControls() {
    switch (this.type) {
      case "template":
        return ["save"];
      case "survey":
        return ["editS123", "view", "publish", "save", "more"];
      case "user":
        return [];
      default:
        // sites and pages
        return ["share", "view", "publish", "save", "more"];
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get sharingButtonIcon() {
    return getAccessIcon(this.entity.access);
  }
  get saveButtonIcon() {
    return this.isDirty ? 'exclamation-mark-circle' : undefined;
  }
  renderSitePopover() {
    const { context, isSite, site } = this;
    if (!isSite && site) {
      const accessIcon = getAccessIcon(site.access);
      const canEditSite = checkPermission('hub:site:edit', context, site).access;
      return (h("calcite-popover", { "auto-close": true, label: site.name, placement: "bottom", "reference-element": "popover-trigger" }, h("p", null, h("div", { class: "site-title" }, site.name), h("div", null, h("calcite-icon", { icon: accessIcon, scale: "s" }), this.intl.t(`popover.access.${site.access}`)), h("div", null, h("calcite-icon", { icon: "clock", scale: "s" }), this.intl.t('popover.lastUpdated', { updated: this.intl.formatDate(site.updatedDate) })), canEditSite && h("calcite-button", { class: "edit-site-btn", href: "/edit", onClick: this.handleEditLayout, round: true, width: "full" }, this.intl.t("popover.editLayout")), h("calcite-button", { appearance: "outline", href: "/", kind: "neutral", onClick: this.handleViewSite, round: true, width: "full" }, this.intl.t("popover.viewSite")))));
    }
  }
  get workspaceUrl() {
    return this.type === 'user'
      ? `${this.context.hubHomeUrl}/workspace/users/self`
      : getRelativeWorkspaceUrl(this.entity.type, this.entity.id);
  }
  renderMenus() {
    const { entity, isSite, site } = this;
    const manageEntityI18nKey = `manage${capitalize(this.type)}`;
    // we render the site menu when we are at a site OR we are at a page and we got a site
    const shouldRenderSiteMenu = (isSite || !!site) && this.type !== 'user';
    return h(Fragment, null, h("calcite-menu", { slot: "content-start" }, h("calcite-menu-item", { href: this.workspaceUrl, "icon-start": "chevron-left", onClick: this.handleWorkspaceItemClick, text: this.intl.t(manageEntityI18nKey), "text-enabled": true })), h("calcite-menu", { slot: "content-center" }, this.renderSitePopover(), shouldRenderSiteMenu && h("calcite-menu-item", { active: isSite, breadcrumb: !this.isSite, class: isSite ? "non-interactive" : "", "icon-start": "browser", id: "popover-trigger", onClick: this.handleSiteMenuItemClick, tabindex: isSite ? "-1" : "0", text: site === null || site === void 0 ? void 0 : site.name, "text-enabled": true }), !isSite && this.type !== 'user' &&
      h("calcite-menu-item", { active: !isSite, class: "non-interactive", "icon-start": "maximize", tabindex: "-1", text: entity.name, "text-enabled": true })));
  }
  renderControls() {
    const { entity } = this;
    const deleteEntityI18nKey = `delete${capitalize(this.type)}Label`;
    const itemHomeUrl = getItemHomeUrl(entity.id, this.context.portalUrl);
    return (h("div", { class: "controls-container", slot: "content-end" }, this.entityControls.includes('share') && (h("calcite-button", { appearance: "transparent", "icon-start": this.sharingButtonIcon, kind: "neutral", label: this.intl.t("sharingLabel"), onClick: this.handleAccessChange, round: true })), this.entityControls.includes("editS123") && (h("calcite-button", { appearance: "solid", kind: "neutral", onClick: this.handleEditS123ButtonClick, round: true }, this.intl.t("editS123Label"))), this.entityControls.includes("view") && (h("calcite-dropdown", null, h("calcite-button", { appearance: "outline", "icon-end": "chevron-down", kind: "neutral", onClick: this.handleViewButtonClick, round: true, slot: "trigger" }, this.intl.t("viewLabel")), h("calcite-dropdown-group", { selectionMode: "none" }, h("calcite-dropdown-item", { onClick: this.handlePreviewPublished }, this.intl.t("viewPublishedLabel")), h("calcite-dropdown-item", { onClick: this.handlePreviewDraft }, this.intl.t("viewUnpublishedLabel"))))), this.entityControls.includes("publish") && (h("calcite-button", { appearance: "outline", disabled: this.isPublishing, kind: "neutral", loading: this.isPublishing, onClick: this.handlePublish, round: true }, this.intl.t(`publishLabel.${this.type}`))), this.entityControls.includes("save") && (h("calcite-button", { appearance: "solid", disabled: this.saveButtonDisabled || this.isSaving, "icon-start": this.saveButtonIcon, kind: "brand", loading: this.isSaving, onClick: this.handleSave, round: true }, this.intl.t(`saveLabel.${this.type}`))), this.entityControls.includes("more") && (h("calcite-dropdown", null, h("calcite-button", { appearance: "transparent", "icon-start": "ellipsis", kind: "neutral", label: this.intl.t("moreOptionsLabel"), onClick: this.handleOverflowButtonClick, round: true, slot: "trigger" }), h("calcite-dropdown-group", { selectionMode: "none" }, this.showClone &&
      h("calcite-dropdown-item", { onClick: this.handleClone }, this.intl.t("cloneLayoutLabel")), h("calcite-dropdown-item", { href: itemHomeUrl }, this.intl.t("editInAgoLabel")), (this.isSite || this.isPage) &&
      h("calcite-dropdown-item", { onClick: this.handleDeleteDraft }, this.intl.t("deleteDraftLabel")), this.showDelete &&
      h("calcite-dropdown-item", { onClick: this.handleDelete }, this.intl.t(deleteEntityI18nKey)), this.isSite && h("calcite-dropdown-item", { onClick: this.handleSaveAsTemplate }, this.intl.t("saveAsTemplateLabel")))))));
  }
  render() {
    if (this.entity) {
      return (h(Host, { "data-element": "layout-editor-header" }, h("calcite-navigation", null, this.renderMenus(), this.renderControls(), h("arcgis-hub-user-profile", { slot: "user", variant: "minimal" }))));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubLayoutEditorHeader.style = arcgisHubLayoutEditorHeaderCss;

export { ArcgisHubLayoutEditorHeader as arcgis_hub_layout_editor_header };
