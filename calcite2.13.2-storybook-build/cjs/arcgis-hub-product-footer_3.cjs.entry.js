'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const state = require('./state-6637df8c.js');
const context = require('./context-0167a31e.js');
const getAccessIcon = require('./get-access-icon-8c5a0999.js');
const urls = require('./urls-2533c98f.js');
const breadcrumbs = require('./breadcrumbs-ae2ea407.js');
const _internal = require('./_internal-2383d905.js');
const portal = require('./portal-4f46908f.js');
const getS123EditUrl = require('./get-s123-edit-url-a968dd82.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const compose = require('./compose-9b4311c9.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const getWorkspaceLinks = require('./getWorkspaceLinks-53129a7d.js');
require('./types-ff8f7df0.js');
const utils = require('./utils-a2df9951.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
require('./index-f4a4c954.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./logger-5db3d659.js');
require('./dasherize-f02a08e0.js');
require('./cache-4d33af79.js');
require('./get-portal-6ca924c2.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./get-item-home-url-b1e3ff74.js');
require('./get-portal-url-68b1f527.js');
require('./events-7873340d.js');
require('./access-049994c9.js');
require('./helpers-05252545.js');
require('./get-52661c13.js');
require('./append-custom-params-0f5d0fe2.js');
require('./update-7b2b2d9d.js');
require('./get-family-cafa88bb.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-structured-license-4e9f994b.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./getWorkspaceLinkDefinitions-aae57a67.js');

const arcgisHubProductFooterCss = ":host{display:block;height:3rem;width:100%;background-color:var(--calcite-color-foreground-3)}.product-footer__branding{padding-top:0.125rem;display:flex;height:100%;align-items:center;padding-left:1rem;padding-right:1rem;font-size:var(--calcite-font-size-0);line-height:1.375rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2)}calcite-menu{--calcite-color-foreground-1:var(--calcite-color-foreground-3);--calcite-color-foreground-2:var(--calcite-color-foreground-3);--calcite-color-text-1:var(--calcite-color-text-2);border-top:1px solid var(--calcite-color-border-1);height:100%}calcite-menu-item{--calcite-font-size-0:var(--calcite-font-size--0)}";

const ArcgisHubProductFooter = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.productName = 'ArcGIS Hub Basic';
    this.emitTelemetry = (evt) => {
      const el = evt.currentTarget;
      const telemetry = {
        help: Object.assign(Object.assign({}, index$1.dist.dictionary.category.navigation.action.external.label.webHelp), { details: el.href }),
        changelog: index$1.dist.dictionary.category.navigation.action.external.label.changelog,
        blog: index$1.dist.dictionary.category.navigation.action.external.label.arcGisBlog
      }[el.getAttribute('data-key')];
      this.hubTelemetry.emit(telemetry);
    };
    this.isMobile = false;
  }
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    // Check the license and set the product name
    switch (this._context.hubLicense) {
      case 'hub-premium':
        this.productName = 'ArcGIS Hub Premium';
        break;
      case 'enterprise-sites':
        this.productName = 'Enterprise Sites';
        break;
      default:
        this.productName = 'ArcGIS Hub Basic';
    }
  }
  render() {
    return (index.h(index.Host, { "data-element": "product-footer", "data-ismobile": this.isMobile }, index.h("calcite-menu", { scale: "s" }, index.h("div", { class: "product-footer__branding" }, this.productName), index.h("calcite-menu-item", { "data-key": "help", href: "https://doc.arcgis.com/en/hub/get-started", onClick: this.emitTelemetry, text: this.intl.t("helpCenter") }), index.h("calcite-menu-item", { "data-key": "changelog", href: "https://hub.arcgis.com/pages/changelog", onClick: this.emitTelemetry, text: this.intl.t("changelog") }), index.h("calcite-menu-item", { "data-key": "blog", href: "https://www.esri.com/arcgis-blog/?s=#&products=arcgis-hub", onClick: this.emitTelemetry, text: this.intl.t("blog") }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubProductFooter.style = arcgisHubProductFooterCss;

const arcgisHubWorkspaceHeaderCss = ":host{display:block}.non-interactive{pointer-events:none}.hide{display:none}calcite-navigation[slot=\"navigation-secondary\"]>:not(:first-child){z-index:20;background-color:var(--calcite-color-foreground-1)}";

const ArcgisHubWorkspaceHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubWorkspaceHeaderLinkClick = index.createEvent(this, "arcgisHubWorkspaceHeaderLinkClick", 7);
    this.arcgisEntityView = index.createEvent(this, "arcgisEntityView", 7);
    this.handleOrgLogoClick = (clickEvent) => {
      const telemetry = this.useWorkspaceLink
        ? index$1.dist.dictionary.category.navigation.action.view.label.users.details.workspace
        : index$1.dist.dictionary.category.navigation.action.view.label.home.details.workspace;
      this.hubTelemetry.emit({ telemetry });
      const href = clickEvent.target.href;
      this.arcgisHubWorkspaceHeaderLinkClick.emit({ clickEvent, href });
    };
    this.handleOpenAccessModal = () => {
      if (this.isDirty) {
        // if the entity is dirty and we're trying to open the access modal,
        // we first need to prompt the user to abandon their unsaved changes
        this.isDirtyStateModalOpen = true;
      }
      else {
        // if the entity is not dirty, we can open the access modal
        this.isAccessModalOpen = true;
        this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.open.label.modal.details.share);
      }
    };
    this.handleClickGroupSharingLink = (e) => {
      e.stopPropagation();
      // if the group sharing link is clicked, close the modal
      this.isAccessModalOpen = false;
    };
    this.handleCloseAccessModal = (evt) => {
      var _a;
      this.isAccessModalOpen = false;
      this.hubTelemetry.emit({
        telemetry: index$1.dist.dictionary.category.interaction.action.close.label.modal.details.share,
        composedPath: evt.composedPath(),
      });
      this.access = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.access;
    };
    this.handleAccessChange = async (evt) => {
      this.access = evt.detail;
    };
    this.handleAccessSave = async (evt) => {
      const composedPath = evt.composedPath();
      try {
        await getS123EditUrl.setEntityAccess(this.entity, this.access, this._context);
        this.hubTelemetry.emit({
          telemetry: Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.access.details[this.access]), { response: index$1.dist.constants.response.SUCCESS }),
          composedPath,
        });
        this.showNotice('success');
      }
      catch (error) {
        this.hubTelemetry.emit({
          telemetry: Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.access.details[this.access]), { response: index$1.dist.constants.response.FAILURE }),
          composedPath,
        });
        this.showNotice('failure');
      }
      // notify workspace that the entity has been saved
      this.arcgisHubWorkspaceEntityChange.emit({ isDirty: false, entity: this.entity });
      // close the modal after saving
      this.isAccessModalOpen = false;
    };
    this.handleViewClick = () => {
      this.arcgisEntityView.emit();
    };
    this.handleBreadcrumbClick = (clickEvent) => {
      const href = clickEvent.target.href;
      this.arcgisHubWorkspaceHeaderLinkClick.emit({ clickEvent, href });
    };
    this._handlePortalHomeClick = (e) => {
      e.stopPropagation();
      const entityDimensions = _internal.getEntityTelemetryDimensions(this.entity);
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.navigation.action.external.label.arcGisOnline.details.details), entityDimensions));
    };
    this.entity = undefined;
    this.site = undefined;
    this.layout = 'default';
    this.isDirty = undefined;
    this.isMobile = false;
    this.isAccessModalOpen = undefined;
    this.isDirtyStateModalOpen = undefined;
    this.access = undefined;
    this._popoverButtonEl = undefined;
    // NOTE: probably should do event handlers here too
    // but they haven't needed it so far so skipping for now
    context.bind(this, '_setPopoverButtonEl');
  }
  get _context() {
    return state.getGlobalContext();
  }
  async componentWillLoad() {
    var _a;
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.access = this.convertAccess((_a = this.entity) === null || _a === void 0 ? void 0 : _a.access);
  }
  convertAccess(access) {
    return access === 'shared' ? 'private' : access;
  }
  /**
   * Given a HubEntity, return it's HubEntityType
   */
  get type() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
  }
  /**
   * Returns whether the current user can change the access of the
   * entity by checking whether:
   *
   * For item entities:
   * 1. user has the (portal:admin:shareToOrg OR portal:admin:shareToPublic) OR (portal:user:shareToOrg OR portal:user:shareToPublic) privileges
   * AND
   * 2. user has admin privileges over the item (itemControl:admin)
   *
   * For group entities:
   * 1. user has the portal:admin:updateGroups privilege
   * OR
   * 2. user has admin or owner membership in the group
   *
   * If these conditions are met, we allow the user to open the access
   * modal which further restricts which options are enabled based
   * on the portal privs
   *
   */
  get canChangeAccess() {
    var _a;
    let result = false;
    if (!!((_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser) && !!this.entity) {
      result = checkPermission.checkPermission(`hub:${this.type}:canChangeAccess`, this._context, this.entity).access;
    }
    return result;
  }
  // (temporarily?) hide the view button for user entities
  get hideViewButton() {
    return ['user'].includes(this.type);
  }
  /**
   * Should we show the access button in the header?
   */
  get showAccessButton() {
    // Don't show the access controls for discussion or user entities
    return !['discussion', 'user'].includes(this.type);
  }
  /**
   * Should we hide the sharing link in the sharing access modal?
   */
  get hideSharingLink() {
    return ['group'].includes(this.type);
  }
  get viewUrl() {
    return urls.getRelativeEntityViewUrl(this.entity);
  }
  get _popoverItems() {
    const items = [];
    const { entity, _context } = this;
    const portalHomeUrl = entity && portal.getEntityHomeUrl(entity, _context.requestOptions);
    if (portalHomeUrl) {
      const key = this._context.isPortal ? 'openInEnterprise' : 'openInOnline';
      items.push({
        href: portalHomeUrl,
        icon: 'launch',
        key,
        onClick: this._handlePortalHomeClick.bind(this),
        target: '_blank'
      });
    }
    return items;
  }
  get editLayoutUrl() {
    return this.entity ? urls.getEntityLayoutUrl(this.entity) : undefined;
  }
  get viewEntityTelemetry() {
    const result = Object.assign({}, index$1.dist.dictionary.category.navigation.action.view);
    delete result.details;
    return result;
  }
  get useWorkspaceLink() {
    return checkPermission.checkPermission('hub:feature:workspace:user', this._context).access;
  }
  get orgLogoHref() {
    return this.useWorkspaceLink ? urls.getWorkspaceHomeUrl(this._context) : `${urls.getOverviewUrl(this._context)}/edit`;
  }
  get breadcrumbs() {
    const title = this.intl.t('homeLink.text');
    const link = urls.getWorkspaceHomeUrl(this._context);
    return [{
        title,
        link,
        icon: "home"
      }, {
        title: this.entity.name,
        label: `${this.type}: ${this.entity.name}`,
        icon: compose.getContentTypeIcon(this.entity.type)
      }];
  }
  _setPopoverButtonEl(el) {
    this._popoverButtonEl = el;
  }
  ;
  // TODO: replace this with the calcite-dialog (in follow-up ticket)
  renderAccessModal() {
    var _a, _b, _c;
    if (this.entity) {
      return (index.h("calcite-modal", { "data-element": "access-level-controls-modal", kind: "info", onCalciteModalClose: this.handleCloseAccessModal, open: this.isAccessModalOpen, scale: "s", "width-scale": "s" }, index.h("div", { slot: "header" }, this.intl.t('access.sharingLevel')), index.h("div", { slot: "content" }, index.h("arcgis-hub-access-level-controls", { accessLevel: this.convertAccess(this.access), itemType: this.type, onArcgisHubItemAccessLevelChange: this.handleAccessChange, orgName: (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.name }), index.h("arcgis-hub-workspace-link", { class: {
          hide: this.hideSharingLink,
        }, iconEnd: "arrow-right", iconStart: "users", onArcgisHubWorkspaceLinkClicked: this.handleClickGroupSharingLink, pane: "collaborators" }, this.intl.t('access.groupSharing'))), index.h("calcite-button", { appearance: "transparent", kind: "neutral", onClick: this.handleCloseAccessModal, round: true, slot: "secondary", width: "full" }, this.intl.t('access.cancel')), index.h("calcite-button", { disabled: this.access === ((_c = this.entity) === null || _c === void 0 ? void 0 : _c.access), onClick: this.handleAccessSave, round: true, slot: "primary", width: "full" }, this.intl.t('access.save'))));
    }
  }
  renderAccessButton() {
    var _a, _b;
    if (this.showAccessButton) {
      return (index.h("div", { slot: "content-end" }, index.h("calcite-button", { appearance: "transparent", class: "set-access", disabled: !this.canChangeAccess, iconStart: getAccessIcon.getAccessIcon((_a = this.entity) === null || _a === void 0 ? void 0 : _a.access), id: "button.set-access", kind: "neutral", onClick: this.handleOpenAccessModal, round: true }, this.intl.t(`access.share`)), index.h("calcite-tooltip", { label: this.intl.t(`access.tooltip.${(_b = this.entity) === null || _b === void 0 ? void 0 : _b.access}`), "reference-element": "button.set-access" }, this.intl.t(`access.tooltip.${this.entity.access}`))));
    }
  }
  renderPopoverMenu() {
    var _a;
    const { editLayoutUrl, isMobile } = this;
    const popoverItems = this._popoverItems;
    const i18nBase = 'popoverActions';
    return (popoverItems.length)
      ? (index.h("div", { slot: "content-end" }, index.h("calcite-button", { appearance: "transparent", "icon-start": "ellipsis", id: "popover-button", kind: "neutral", ref: this._setPopoverButtonEl, round: true }), index.h("calcite-popover", { label: this.intl.t(`${i18nBase}.label`), "overlay-positioning": "fixed", placement: (isMobile) ? 'auto' : 'bottom', referenceElement: this._popoverButtonEl }, isMobile && editLayoutUrl && (index.h("arcgis-hub-workspace-link", { href: editLayoutUrl, relativeToOrigin: true, telemetry: index$1.dist.dictionary.category.navigation.action.view.label.layoutEditor }, index.h("calcite-action", { text: this.intl.t('editLayout'), "text-enabled": true }))), isMobile && this.entity.type === 'Form' && (index.h("arcgis-hub-workspace-link", { href: getS123EditUrl.getS123EditUrl(this.entity.id, this._context), telemetry: index$1.dist.dictionary.category.navigation.action.external.label.arcGisApplication.details.survey123 }, index.h("calcite-action", { text: this.intl.t('editS123'), "text-enabled": true }))), isMobile && this.type === 'template' && (index.h("arcgis-hub-workspace-link", { href: getProp.getProp(this.entity, 'links.advancedEditRelative'), telemetry: index$1.dist.dictionary.category.navigation.action.edit.label.advanced }, index.h("calcite-action", { text: this.intl.t('editAdvancedJson'), "text-enabled": true }))), isMobile && !this.hideViewButton && (index.h("arcgis-hub-workspace-link", { href: this.viewUrl, relativeToOrigin: true, telemetry: index$1.dist.dictionary.category.navigation.action.view }, index.h("calcite-action", { text: this.intl.t(`view.${this.type}`), "text-enabled": true }))), isMobile && (index.h("calcite-action", { disabled: !this.canChangeAccess, icon: getAccessIcon.getAccessIcon((_a = this.entity) === null || _a === void 0 ? void 0 : _a.access), onClick: this.handleOpenAccessModal, text: this.intl.t(`access.share`), "text-enabled": true })), popoverItems.map((item) => {
        const { href, icon, key, onClick, target } = item;
        const text = this.intl.t(`${i18nBase}.${key}`);
        return index.h("calcite-link", { href: href, key: key, target: target }, index.h("calcite-action", { icon: icon, onClick: onClick, text: text, "text-enabled": true }));
      }))))
      : null;
  }
  renderEntityNavigation() {
    const { editLayoutUrl, isMobile } = this;
    // org workspace will not have an entity
    if (this.entity) {
      return (index.h("calcite-navigation", { slot: "navigation-secondary" }, index.h("calcite-menu", { scale: "s", slot: "content-start" }, index.h(breadcrumbs.Breadcrumbs, { breadcrumbs: this.breadcrumbs, onClick: this.handleBreadcrumbClick })), !isMobile && editLayoutUrl && (index.h("arcgis-hub-workspace-link", { href: editLayoutUrl, relativeToOrigin: true, slot: "content-end", telemetry: index$1.dist.dictionary.category.navigation.action.view.label.layoutEditor }, index.h("calcite-button", { appearance: "transparent", href: editLayoutUrl, kind: "neutral", round: true }, this.intl.t('editLayout')))), !isMobile && this.entity.type === 'Form' && (index.h("arcgis-hub-workspace-link", { href: getS123EditUrl.getS123EditUrl(this.entity.id, this._context), slot: "content-end", telemetry: index$1.dist.dictionary.category.navigation.action.external.label.arcGisApplication.details.survey123 }, index.h("calcite-button", { appearance: "solid", kind: "brand", round: true }, this.intl.t('editS123')))), !isMobile && this.type === 'template' && (index.h("arcgis-hub-workspace-link", { href: getProp.getProp(this.entity, 'links.advancedEditRelative'), slot: "content-end", telemetry: index$1.dist.dictionary.category.navigation.action.edit.label.advanced }, index.h("calcite-button", { appearance: "transparent", kind: "neutral", round: true }, this.intl.t('editAdvancedJson')))), !isMobile && !this.hideViewButton && (this.layout === 'default' ? this.renderViewLink() : this.renderViewButton()), !isMobile && this.renderAccessButton(), this.renderPopoverMenu()));
    }
  }
  renderViewLink() {
    const href = this.viewUrl;
    return (index.h("arcgis-hub-workspace-link", { href: href, relativeToOrigin: true, slot: "content-end", telemetry: index$1.dist.dictionary.category.navigation.action.view }, index.h("calcite-button", { appearance: "transparent", class: "view-entity-btn", href: href, kind: "neutral", round: true }, this.intl.t(`view.${this.type}`))));
  }
  renderViewButton() {
    return (index.h("div", { slot: "content-end" }, index.h("calcite-button", { appearance: "transparent", id: "button.view-entity", kind: "neutral", onClick: this.handleViewClick, round: true }, this.intl.t(`view.${this.type}`))));
  }
  get shouldShowAddContent() {
    return checkPermission.checkPermission('hub:availability:alpha', this._context).access;
  }
  get addContentConfig() {
    return {
      allowGroupSelection: true,
      buttonProps: {
        appearance: 'outline-fill',
        kind: 'neutral'
      },
      buttonText: this.isMobile ? '+' : this.intl.t('createContent'),
      entity: this.entity,
      site: this.site,
    };
  }
  showNotice(result) {
    state.showNotice({
      title: this.intl.t(`access.alert.${result}`),
      message: '',
      configuration: {
        noticeType: 'alert',
        autoClose: true,
        autoCloseDuration: 'fast',
        icon: true, kind: 'success',
        label: this.intl.t('access.alert.label')
      }
    });
  }
  renderDirtyStateModal() {
    return this.isDirtyStateModalOpen
      ? index.h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true })
      : null;
  }
  handleDirtyStateModalClosed(event) {
    // true === they clicked cancel
    // false === they clicked okay
    // close the modal regardless of the user's choice
    this.isDirtyStateModalOpen = false;
    if (!event.detail) {
      // user is OK w/ navigating away and losing changes
      // emit that the entity has changed to cause the visual refresh to the last saved state
      this.arcgisHubWorkspaceEntityChange.emit({ isDirty: false, entity: this.entity });
      // open the access modal
      this.isAccessModalOpen = true;
      this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.open.label.modal.details.share);
    }
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    const orgDesc = ((_d = (_c = (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.portalProperties) === null || _c === void 0 ? void 0 : _c.hub) === null || _d === void 0 ? void 0 : _d.settings.orgType) === 'community' ? this.intl.t('communityOrg') : '';
    return (index.h(index.Host, { "data-element": "workspace-header" }, this.layout === 'default' ? (index.h("calcite-navigation", null, index.h("calcite-navigation-logo", { description: orgDesc, heading: this.isMobile ? "" : (_f = (_e = this._context) === null || _e === void 0 ? void 0 : _e.portal) === null || _f === void 0 ? void 0 : _f.name, href: this.orgLogoHref, label: this.intl.t('orgWorkspace'), onClick: this.handleOrgLogoClick, slot: "logo", thumbnail: (_g = this._context) === null || _g === void 0 ? void 0 : _g.orgThumbnailUrl }), this.shouldShowAddContent && index.h("arcgis-hub-add-content", Object.assign({ slot: "content-end" }, this.addContentConfig)), index.h("arcgis-hub-user-profile", { slot: "user", variant: (this.isMobile ? "minimal" : undefined) }), this.renderEntityNavigation())) : (index.h("calcite-navigation", null, this.renderEntityNavigation())), this.renderAccessModal(), this.renderDirtyStateModal()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubWorkspaceHeader.style = arcgisHubWorkspaceHeaderCss;

const arcgisHubWorkspaceNavigationCss = ":host{display:block;height:100%;overflow-y:scroll}calcite-menu-item{--calcite-color-border-3:white;--calcite-color-text-2:var(--calcite-color-text-3)}";

const ArcgisHubWorkspaceNavigation = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubWorkspaceNavigationLinkClick = index.createEvent(this, "arcgisHubWorkspaceNavigationLinkClick", 7);
    this.activePane = 'overview';
    this.entity = undefined;
    this.isMobile = false;
    this.links = [];
    context.bind(this, '_getWorkspaceLinks', 'onMenuItemSelect', 'handleKeyDown');
  }
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this._getWorkspaceLinks();
  }
  async _getWorkspaceLinks() {
    const links = await getWorkspaceLinks.getWorkspaceLinks(this.entity, this._context);
    // filter out any panes that should be hidden
    // TODO: remove once dashboard pane works from Hub Home
    const site = state.getCurrentSite();
    const hidePanes = (site === null || site === void 0 ? void 0 : site.isHubHome) ? ['dashboard'] : [];
    this.links = links.filter(link => !hidePanes.includes(link.pane));
  }
  /**
   * Prevents the page from rerouting with the default refresh
   * @param event
   */
  preventRefresh(event) {
    event.preventDefault();
  }
  /**
   * Handle when a menu item is selected
   * @param event
   */
  onMenuItemSelect(event) {
    const el = event.currentTarget;
    const displayOnly = el.hasAttribute('data-display-only');
    if (!displayOnly) {
      const pane = el.getAttribute('data-value');
      this.arcgisHubWorkspaceNavigationLinkClick.emit({ clickEvent: event, pane });
      utils.logWorkspaceLinkTelemetry({ pane, hubTelemetry: this.hubTelemetry });
    }
  }
  /**
   * Allows for pressing enter on the menu item to select it
   * @param evt
   */
  handleKeyDown(evt) {
    var _a;
    evt.preventDefault();
    if (((_a = evt.key) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'enter') {
      this.onMenuItemSelect(evt);
    }
  }
  renderWorkspaceNavigationLink(link, isChild = false) {
    var _a;
    const isActivePane = link.pane === this.activePane;
    const id = `workspace-navigation-${link.pane}`;
    const MenuItem = index.h("calcite-menu-item", { active: isActivePane, "aria-current": isActivePane ? 'page' : null, "data-display-only": link.displayOnly, "data-value": link.pane, href: !link.displayOnly ? utils.getRelativeWorkspacePaneUrl(link.pane) : undefined, iconFlipRtl: this.intl.direction == "ltr" ? "start" : "end", iconStart: link.icon, id: id, key: link.pane, label: this.intl.t(link.i18nKey), onCalciteMenuItemSelect: this.onMenuItemSelect, onClick: this.preventRefresh, onKeyDown: this.handleKeyDown, open: link.children && link.children.length, slot: isChild ? "submenu-item" : "", text: this.isMobile ? "" : this.intl.t(link.i18nKey) }, ((_a = link.children) === null || _a === void 0 ? void 0 : _a.length) && link.children.map(child => this.renderWorkspaceNavigationLink(child, true)));
    // eslint-disable-next-line unicorn/prefer-ternary
    if (this.isMobile) {
      return index.h(index.Fragment, null, MenuItem, index.h("calcite-tooltip", { referenceElement: id }, index.h("span", null, this.intl.t(link.i18nKey))));
    }
    else {
      return MenuItem;
    }
  }
  render() {
    return (index.h("calcite-menu", { class: { 'mobile': this.isMobile }, "data-element": "workspace-navigation", label: this.intl.t('navigation'), layout: "vertical" }, this.links.map(link => this.renderWorkspaceNavigationLink(link))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubWorkspaceNavigation.style = arcgisHubWorkspaceNavigationCss;

exports.arcgis_hub_product_footer = ArcgisHubProductFooter;
exports.arcgis_hub_workspace_header = ArcgisHubWorkspaceHeader;
exports.arcgis_hub_workspace_navigation = ArcgisHubWorkspaceNavigation;
