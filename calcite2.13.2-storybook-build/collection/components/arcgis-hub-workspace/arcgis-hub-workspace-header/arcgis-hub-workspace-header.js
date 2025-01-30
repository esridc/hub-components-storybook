import { getContentTypeIcon, getTypeFromEntity, checkPermission, getS123EditUrl, setEntityAccess, getProp } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import intlManager from '../../../utils/intl-manager';
import { bind } from '../../../utils/context';
import { getAccessIcon } from '../../../utils/get-access-icon';
import { dictionary, constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import { getRelativeEntityViewUrl, getWorkspaceHomeUrl, getOverviewUrl } from '../../../utils/urls';
import { getGlobalContext, showNotice } from '../../../utils/state';
import { getEntityLayoutUrl } from '../../../utils/urls';
import { Breadcrumbs } from '../../functional/breadcrumbs';
import { getEntityTelemetryDimensions } from '../../../utils/telemetry/_internal';
import { getEntityHomeUrl } from '../../../utils/portal';
export class ArcgisHubWorkspaceHeader {
  constructor() {
    this.handleOrgLogoClick = (clickEvent) => {
      const telemetry = this.useWorkspaceLink
        ? dictionary.category.navigation.action.view.label.users.details.workspace
        : dictionary.category.navigation.action.view.label.home.details.workspace;
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
        this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.modal.details.share);
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
        telemetry: dictionary.category.interaction.action.close.label.modal.details.share,
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
        await setEntityAccess(this.entity, this.access, this._context);
        this.hubTelemetry.emit({
          telemetry: Object.assign(Object.assign({}, dictionary.category.content.action.update.label.access.details[this.access]), { response: telemetryConstants.response.SUCCESS }),
          composedPath,
        });
        this.showNotice('success');
      }
      catch (error) {
        this.hubTelemetry.emit({
          telemetry: Object.assign(Object.assign({}, dictionary.category.content.action.update.label.access.details[this.access]), { response: telemetryConstants.response.FAILURE }),
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
      const entityDimensions = getEntityTelemetryDimensions(this.entity);
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.navigation.action.external.label.arcGisOnline.details.details), entityDimensions));
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
    bind(this, '_setPopoverButtonEl');
  }
  get _context() {
    return getGlobalContext();
  }
  async componentWillLoad() {
    var _a;
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.access = this.convertAccess((_a = this.entity) === null || _a === void 0 ? void 0 : _a.access);
  }
  convertAccess(access) {
    return access === 'shared' ? 'private' : access;
  }
  /**
   * Given a HubEntity, return it's HubEntityType
   */
  get type() {
    return getTypeFromEntity(this.entity);
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
      result = checkPermission(`hub:${this.type}:canChangeAccess`, this._context, this.entity).access;
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
    return getRelativeEntityViewUrl(this.entity);
  }
  get _popoverItems() {
    const items = [];
    const { entity, _context } = this;
    const portalHomeUrl = entity && getEntityHomeUrl(entity, _context.requestOptions);
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
    return this.entity ? getEntityLayoutUrl(this.entity) : undefined;
  }
  get viewEntityTelemetry() {
    const result = Object.assign({}, dictionary.category.navigation.action.view);
    delete result.details;
    return result;
  }
  get useWorkspaceLink() {
    return checkPermission('hub:feature:workspace:user', this._context).access;
  }
  get orgLogoHref() {
    return this.useWorkspaceLink ? getWorkspaceHomeUrl(this._context) : `${getOverviewUrl(this._context)}/edit`;
  }
  get breadcrumbs() {
    const title = this.intl.t('homeLink.text');
    const link = getWorkspaceHomeUrl(this._context);
    return [{
        title,
        link,
        icon: "home"
      }, {
        title: this.entity.name,
        label: `${this.type}: ${this.entity.name}`,
        icon: getContentTypeIcon(this.entity.type)
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
      return (h("calcite-modal", { "data-element": "access-level-controls-modal", kind: "info", onCalciteModalClose: this.handleCloseAccessModal, open: this.isAccessModalOpen, scale: "s", "width-scale": "s" }, h("div", { slot: "header" }, this.intl.t('access.sharingLevel')), h("div", { slot: "content" }, h("arcgis-hub-access-level-controls", { accessLevel: this.convertAccess(this.access), itemType: this.type, onArcgisHubItemAccessLevelChange: this.handleAccessChange, orgName: (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.name }), h("arcgis-hub-workspace-link", { class: {
          hide: this.hideSharingLink,
        }, iconEnd: "arrow-right", iconStart: "users", onArcgisHubWorkspaceLinkClicked: this.handleClickGroupSharingLink, pane: "collaborators" }, this.intl.t('access.groupSharing'))), h("calcite-button", { appearance: "transparent", kind: "neutral", onClick: this.handleCloseAccessModal, round: true, slot: "secondary", width: "full" }, this.intl.t('access.cancel')), h("calcite-button", { disabled: this.access === ((_c = this.entity) === null || _c === void 0 ? void 0 : _c.access), onClick: this.handleAccessSave, round: true, slot: "primary", width: "full" }, this.intl.t('access.save'))));
    }
  }
  renderAccessButton() {
    var _a, _b;
    if (this.showAccessButton) {
      return (h("div", { slot: "content-end" }, h("calcite-button", { appearance: "transparent", class: "set-access", disabled: !this.canChangeAccess, iconStart: getAccessIcon((_a = this.entity) === null || _a === void 0 ? void 0 : _a.access), id: "button.set-access", kind: "neutral", onClick: this.handleOpenAccessModal, round: true }, this.intl.t(`access.share`)), h("calcite-tooltip", { label: this.intl.t(`access.tooltip.${(_b = this.entity) === null || _b === void 0 ? void 0 : _b.access}`), "reference-element": "button.set-access" }, this.intl.t(`access.tooltip.${this.entity.access}`))));
    }
  }
  renderPopoverMenu() {
    var _a;
    const { editLayoutUrl, isMobile } = this;
    const popoverItems = this._popoverItems;
    const i18nBase = 'popoverActions';
    return (popoverItems.length)
      ? (h("div", { slot: "content-end" }, h("calcite-button", { appearance: "transparent", "icon-start": "ellipsis", id: "popover-button", kind: "neutral", ref: this._setPopoverButtonEl, round: true }), h("calcite-popover", { label: this.intl.t(`${i18nBase}.label`), "overlay-positioning": "fixed", placement: (isMobile) ? 'auto' : 'bottom', referenceElement: this._popoverButtonEl }, isMobile && editLayoutUrl && (h("arcgis-hub-workspace-link", { href: editLayoutUrl, relativeToOrigin: true, telemetry: dictionary.category.navigation.action.view.label.layoutEditor }, h("calcite-action", { text: this.intl.t('editLayout'), "text-enabled": true }))), isMobile && this.entity.type === 'Form' && (h("arcgis-hub-workspace-link", { href: getS123EditUrl(this.entity.id, this._context), telemetry: dictionary.category.navigation.action.external.label.arcGisApplication.details.survey123 }, h("calcite-action", { text: this.intl.t('editS123'), "text-enabled": true }))), isMobile && this.type === 'template' && (h("arcgis-hub-workspace-link", { href: getProp(this.entity, 'links.advancedEditRelative'), telemetry: dictionary.category.navigation.action.edit.label.advanced }, h("calcite-action", { text: this.intl.t('editAdvancedJson'), "text-enabled": true }))), isMobile && !this.hideViewButton && (h("arcgis-hub-workspace-link", { href: this.viewUrl, relativeToOrigin: true, telemetry: dictionary.category.navigation.action.view }, h("calcite-action", { text: this.intl.t(`view.${this.type}`), "text-enabled": true }))), isMobile && (h("calcite-action", { disabled: !this.canChangeAccess, icon: getAccessIcon((_a = this.entity) === null || _a === void 0 ? void 0 : _a.access), onClick: this.handleOpenAccessModal, text: this.intl.t(`access.share`), "text-enabled": true })), popoverItems.map((item) => {
        const { href, icon, key, onClick, target } = item;
        const text = this.intl.t(`${i18nBase}.${key}`);
        return h("calcite-link", { href: href, key: key, target: target }, h("calcite-action", { icon: icon, onClick: onClick, text: text, "text-enabled": true }));
      }))))
      : null;
  }
  renderEntityNavigation() {
    const { editLayoutUrl, isMobile } = this;
    // org workspace will not have an entity
    if (this.entity) {
      return (h("calcite-navigation", { slot: "navigation-secondary" }, h("calcite-menu", { scale: "s", slot: "content-start" }, h(Breadcrumbs, { breadcrumbs: this.breadcrumbs, onClick: this.handleBreadcrumbClick })), !isMobile && editLayoutUrl && (h("arcgis-hub-workspace-link", { href: editLayoutUrl, relativeToOrigin: true, slot: "content-end", telemetry: dictionary.category.navigation.action.view.label.layoutEditor }, h("calcite-button", { appearance: "transparent", href: editLayoutUrl, kind: "neutral", round: true }, this.intl.t('editLayout')))), !isMobile && this.entity.type === 'Form' && (h("arcgis-hub-workspace-link", { href: getS123EditUrl(this.entity.id, this._context), slot: "content-end", telemetry: dictionary.category.navigation.action.external.label.arcGisApplication.details.survey123 }, h("calcite-button", { appearance: "solid", kind: "brand", round: true }, this.intl.t('editS123')))), !isMobile && this.type === 'template' && (h("arcgis-hub-workspace-link", { href: getProp(this.entity, 'links.advancedEditRelative'), slot: "content-end", telemetry: dictionary.category.navigation.action.edit.label.advanced }, h("calcite-button", { appearance: "transparent", kind: "neutral", round: true }, this.intl.t('editAdvancedJson')))), !isMobile && !this.hideViewButton && (this.layout === 'default' ? this.renderViewLink() : this.renderViewButton()), !isMobile && this.renderAccessButton(), this.renderPopoverMenu()));
    }
  }
  renderViewLink() {
    const href = this.viewUrl;
    return (h("arcgis-hub-workspace-link", { href: href, relativeToOrigin: true, slot: "content-end", telemetry: dictionary.category.navigation.action.view }, h("calcite-button", { appearance: "transparent", class: "view-entity-btn", href: href, kind: "neutral", round: true }, this.intl.t(`view.${this.type}`))));
  }
  renderViewButton() {
    return (h("div", { slot: "content-end" }, h("calcite-button", { appearance: "transparent", id: "button.view-entity", kind: "neutral", onClick: this.handleViewClick, round: true }, this.intl.t(`view.${this.type}`))));
  }
  get shouldShowAddContent() {
    return checkPermission('hub:availability:alpha', this._context).access;
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
    showNotice({
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
      ? h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true })
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
      this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.modal.details.share);
    }
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    const orgDesc = ((_d = (_c = (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.portalProperties) === null || _c === void 0 ? void 0 : _c.hub) === null || _d === void 0 ? void 0 : _d.settings.orgType) === 'community' ? this.intl.t('communityOrg') : '';
    return (h(Host, { "data-element": "workspace-header" }, this.layout === 'default' ? (h("calcite-navigation", null, h("calcite-navigation-logo", { description: orgDesc, heading: this.isMobile ? "" : (_f = (_e = this._context) === null || _e === void 0 ? void 0 : _e.portal) === null || _f === void 0 ? void 0 : _f.name, href: this.orgLogoHref, label: this.intl.t('orgWorkspace'), onClick: this.handleOrgLogoClick, slot: "logo", thumbnail: (_g = this._context) === null || _g === void 0 ? void 0 : _g.orgThumbnailUrl }), this.shouldShowAddContent && h("arcgis-hub-add-content", Object.assign({ slot: "content-end" }, this.addContentConfig)), h("arcgis-hub-user-profile", { slot: "user", variant: (this.isMobile ? "minimal" : undefined) }), this.renderEntityNavigation())) : (h("calcite-navigation", null, this.renderEntityNavigation())), this.renderAccessModal(), this.renderDirtyStateModal()));
  }
  static get is() { return "arcgis-hub-workspace-header"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-workspace-header.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-workspace-header.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "site": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubSite",
          "resolved": "IHubSite",
          "references": {
            "IHubSite": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'default' | 'inline'",
          "resolved": "\"default\" | \"inline\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "layout",
        "reflect": false,
        "defaultValue": "'default'"
      },
      "isDirty": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "is-dirty",
        "reflect": false
      },
      "isMobile": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "isAccessModalOpen": {},
      "isDirtyStateModalOpen": {},
      "access": {},
      "_popoverButtonEl": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspaceEntityChange",
        "name": "arcgisHubWorkspaceEntityChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../utils/workspace"
            }
          }
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }, {
        "method": "arcgisHubWorkspaceHeaderLinkClick",
        "name": "arcgisHubWorkspaceHeaderLinkClick",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IWorkspaceLinkClicked",
          "resolved": "IWorkspaceLinkClicked",
          "references": {
            "IWorkspaceLinkClicked": {
              "location": "import",
              "path": "../../../utils/workspace"
            }
          }
        }
      }, {
        "method": "arcgisEntityView",
        "name": "arcgisEntityView",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubWorkspaceDirtyStateModalClosed",
        "method": "handleDirtyStateModalClosed",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
