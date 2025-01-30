'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
const getAccessIcon = require('./get-access-icon-8c5a0999.js');
const index$1 = require('./index-6f16fe65.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const getRelativeWorkspaceUrl = require('./getRelativeWorkspaceUrl-6dfbafa1.js');
const util = require('./util-38e73510.js');
const getItemHomeUrl = require('./get-item-home-url-b1e3ff74.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./get-family-cafa88bb.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./get-prop-4bd8fc1a.js');
require('./map-by-a7a75788.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');

const arcgisHubLayoutEditorHeaderCss = ":host{display:block}calcite-navigation{--calcite-navigation-background:var(--calcite-color-foreground-2);--foreground-1:var(--calcite-color-foreground-1)}calcite-menu-item{--calcite-color-foreground-1:var(--calcite-navigation-background);--calcite-color-foreground-2:var(--foreground-1)}calcite-popover{background-color:var(--calcite-color-foreground-2)}calcite-popover p{margin:0px;display:flex;max-width:20rem;flex-direction:column;gap:0.5rem;padding:0.75rem}calcite-popover .site-title{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold)}calcite-popover .site-title,calcite-popover .edit-site-btn{margin-bottom:0.25rem}calcite-popover p>div{display:flex;align-items:center;gap:0.5rem}.non-interactive{pointer-events:none}.controls-container{display:none;gap:1rem;margin-inline-end:1rem}[slot=\"content-center\"]{display:none}[slot=\"user\"]{display:flex;align-items:center;margin-inline-end:1rem}@media (min-width: 768px){[slot=\"content-center\"],.controls-container{display:flex}}";

const ArcgisHubLayoutEditorHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubLayoutEditorHeaderShare = index.createEvent(this, "arcgisHubLayoutEditorHeaderShare", 7);
    this.arcgisHubLayoutEditorHeaderPreviewPublished = index.createEvent(this, "arcgisHubLayoutEditorHeaderPreviewPublished", 7);
    this.arcgisHubLayoutEditorHeaderPreviewDraft = index.createEvent(this, "arcgisHubLayoutEditorHeaderPreviewDraft", 7);
    this.arcgisHubLayoutEditorHeaderPublish = index.createEvent(this, "arcgisHubLayoutEditorHeaderPublish", 7);
    this.arcgisHubLayoutEditorHeaderSave = index.createEvent(this, "arcgisHubLayoutEditorHeaderSave", 7);
    this.arcgisHubLayoutEditorHeaderClone = index.createEvent(this, "arcgisHubLayoutEditorHeaderClone", 7);
    this.arcgisHubLayoutEditorHeaderDeleteDraft = index.createEvent(this, "arcgisHubLayoutEditorHeaderDeleteDraft", 7);
    this.arcgisHubLayoutEditorHeaderDelete = index.createEvent(this, "arcgisHubLayoutEditorHeaderDelete", 7);
    this.arcgisHubLayoutEditorHeaderSaveAsTemplate = index.createEvent(this, "arcgisHubLayoutEditorHeaderSaveAsTemplate", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.handleWorkspaceItemClick = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.navigation.action.view.label.content.details.workspace });
    };
    this.handleSiteMenuItemClick = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.interaction.action.open.label.popover.details.site });
    };
    this.handleAccessChange = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.interaction.action.open.label.sidePanel.details.sharing });
      this.arcgisHubLayoutEditorHeaderShare.emit(this.entity);
    };
    this.handleEditS123ButtonClick = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.navigation.action.edit.label.content });
    };
    this.handleViewButtonClick = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.interaction.action.open.label.menu.details.view });
    };
    this.handlePreviewPublished = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.navigation.action.view.label.content.details.publishedDraft });
      this.arcgisHubLayoutEditorHeaderPreviewPublished.emit(this.entity);
    };
    this.handlePreviewDraft = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.navigation.action.view.label.content.details.previewDraft });
      this.arcgisHubLayoutEditorHeaderPreviewDraft.emit(this.entity);
    };
    this.handlePublish = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.content.action.update.label.layout.details.publish });
      this.arcgisHubLayoutEditorHeaderPublish.emit(this.entity);
    };
    this.handleSave = () => {
      this.arcgisHubLayoutEditorHeaderSave.emit(this.entity);
    };
    this.handleOverflowButtonClick = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.interaction.action.open.label.menu.details.options });
    };
    this.handleClone = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.content.action.create.label.site.details.clone });
      this.arcgisHubLayoutEditorHeaderClone.emit(this.entity);
    };
    this.handleDeleteDraft = () => {
      this.arcgisHubLayoutEditorHeaderDeleteDraft.emit(this.entity);
    };
    this.handleDelete = () => {
      const type = getTypeFromEntity.getTypeFromEntity(this.entity);
      const telemetry = index$1.dist.dictionary.category.content.action.delete.label[type];
      this.hubTelemetry.emit({ telemetry });
      this.arcgisHubLayoutEditorHeaderDelete.emit(this.entity);
    };
    this.handleSaveAsTemplate = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.content.action.create.label.template.details.site });
      this.arcgisHubLayoutEditorHeaderSaveAsTemplate.emit(this.entity);
    };
    this.handleEditLayout = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.navigation.action.view.label.content.details.layoutEditor });
    };
    this.handleViewSite = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.navigation.action.view.label.content.details.site });
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
  get context() { return state.getGlobalContext(); }
  get type() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get sharingButtonIcon() {
    return getAccessIcon.getAccessIcon(this.entity.access);
  }
  get saveButtonIcon() {
    return this.isDirty ? 'exclamation-mark-circle' : undefined;
  }
  renderSitePopover() {
    const { context, isSite, site } = this;
    if (!isSite && site) {
      const accessIcon = getAccessIcon.getAccessIcon(site.access);
      const canEditSite = checkPermission.checkPermission('hub:site:edit', context, site).access;
      return (index.h("calcite-popover", { "auto-close": true, label: site.name, placement: "bottom", "reference-element": "popover-trigger" }, index.h("p", null, index.h("div", { class: "site-title" }, site.name), index.h("div", null, index.h("calcite-icon", { icon: accessIcon, scale: "s" }), this.intl.t(`popover.access.${site.access}`)), index.h("div", null, index.h("calcite-icon", { icon: "clock", scale: "s" }), this.intl.t('popover.lastUpdated', { updated: this.intl.formatDate(site.updatedDate) })), canEditSite && index.h("calcite-button", { class: "edit-site-btn", href: "/edit", onClick: this.handleEditLayout, round: true, width: "full" }, this.intl.t("popover.editLayout")), index.h("calcite-button", { appearance: "outline", href: "/", kind: "neutral", onClick: this.handleViewSite, round: true, width: "full" }, this.intl.t("popover.viewSite")))));
    }
  }
  get workspaceUrl() {
    return this.type === 'user'
      ? `${this.context.hubHomeUrl}/workspace/users/self`
      : getRelativeWorkspaceUrl.getRelativeWorkspaceUrl(this.entity.type, this.entity.id);
  }
  renderMenus() {
    const { entity, isSite, site } = this;
    const manageEntityI18nKey = `manage${util.capitalize(this.type)}`;
    // we render the site menu when we are at a site OR we are at a page and we got a site
    const shouldRenderSiteMenu = (isSite || !!site) && this.type !== 'user';
    return index.h(index.Fragment, null, index.h("calcite-menu", { slot: "content-start" }, index.h("calcite-menu-item", { href: this.workspaceUrl, "icon-start": "chevron-left", onClick: this.handleWorkspaceItemClick, text: this.intl.t(manageEntityI18nKey), "text-enabled": true })), index.h("calcite-menu", { slot: "content-center" }, this.renderSitePopover(), shouldRenderSiteMenu && index.h("calcite-menu-item", { active: isSite, breadcrumb: !this.isSite, class: isSite ? "non-interactive" : "", "icon-start": "browser", id: "popover-trigger", onClick: this.handleSiteMenuItemClick, tabindex: isSite ? "-1" : "0", text: site === null || site === void 0 ? void 0 : site.name, "text-enabled": true }), !isSite && this.type !== 'user' &&
      index.h("calcite-menu-item", { active: !isSite, class: "non-interactive", "icon-start": "maximize", tabindex: "-1", text: entity.name, "text-enabled": true })));
  }
  renderControls() {
    const { entity } = this;
    const deleteEntityI18nKey = `delete${util.capitalize(this.type)}Label`;
    const itemHomeUrl = getItemHomeUrl.getItemHomeUrl(entity.id, this.context.portalUrl);
    return (index.h("div", { class: "controls-container", slot: "content-end" }, this.entityControls.includes('share') && (index.h("calcite-button", { appearance: "transparent", "icon-start": this.sharingButtonIcon, kind: "neutral", label: this.intl.t("sharingLabel"), onClick: this.handleAccessChange, round: true })), this.entityControls.includes("editS123") && (index.h("calcite-button", { appearance: "solid", kind: "neutral", onClick: this.handleEditS123ButtonClick, round: true }, this.intl.t("editS123Label"))), this.entityControls.includes("view") && (index.h("calcite-dropdown", null, index.h("calcite-button", { appearance: "outline", "icon-end": "chevron-down", kind: "neutral", onClick: this.handleViewButtonClick, round: true, slot: "trigger" }, this.intl.t("viewLabel")), index.h("calcite-dropdown-group", { selectionMode: "none" }, index.h("calcite-dropdown-item", { onClick: this.handlePreviewPublished }, this.intl.t("viewPublishedLabel")), index.h("calcite-dropdown-item", { onClick: this.handlePreviewDraft }, this.intl.t("viewUnpublishedLabel"))))), this.entityControls.includes("publish") && (index.h("calcite-button", { appearance: "outline", disabled: this.isPublishing, kind: "neutral", loading: this.isPublishing, onClick: this.handlePublish, round: true }, this.intl.t(`publishLabel.${this.type}`))), this.entityControls.includes("save") && (index.h("calcite-button", { appearance: "solid", disabled: this.saveButtonDisabled || this.isSaving, "icon-start": this.saveButtonIcon, kind: "brand", loading: this.isSaving, onClick: this.handleSave, round: true }, this.intl.t(`saveLabel.${this.type}`))), this.entityControls.includes("more") && (index.h("calcite-dropdown", null, index.h("calcite-button", { appearance: "transparent", "icon-start": "ellipsis", kind: "neutral", label: this.intl.t("moreOptionsLabel"), onClick: this.handleOverflowButtonClick, round: true, slot: "trigger" }), index.h("calcite-dropdown-group", { selectionMode: "none" }, this.showClone &&
      index.h("calcite-dropdown-item", { onClick: this.handleClone }, this.intl.t("cloneLayoutLabel")), index.h("calcite-dropdown-item", { href: itemHomeUrl }, this.intl.t("editInAgoLabel")), (this.isSite || this.isPage) &&
      index.h("calcite-dropdown-item", { onClick: this.handleDeleteDraft }, this.intl.t("deleteDraftLabel")), this.showDelete &&
      index.h("calcite-dropdown-item", { onClick: this.handleDelete }, this.intl.t(deleteEntityI18nKey)), this.isSite && index.h("calcite-dropdown-item", { onClick: this.handleSaveAsTemplate }, this.intl.t("saveAsTemplateLabel")))))));
  }
  render() {
    if (this.entity) {
      return (index.h(index.Host, { "data-element": "layout-editor-header" }, index.h("calcite-navigation", null, this.renderMenus(), this.renderControls(), index.h("arcgis-hub-user-profile", { slot: "user", variant: "minimal" }))));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubLayoutEditorHeader.style = arcgisHubLayoutEditorHeaderCss;

exports.arcgis_hub_layout_editor_header = ArcgisHubLayoutEditorHeader;
