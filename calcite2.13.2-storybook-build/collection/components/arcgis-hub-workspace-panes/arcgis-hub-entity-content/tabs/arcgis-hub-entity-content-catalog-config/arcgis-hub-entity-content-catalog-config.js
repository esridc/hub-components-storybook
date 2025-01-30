import { cloneObject, getTypeFromEntity, updateHubEntity, getScopeGroupPredicate, getProp, setProp, reharvestSiteCatalog } from "@esri/hub-common";
import { constants, dictionary } from "@esri/telemetry-dictionary-hub";
import { h, Host, Fragment } from "@stencil/core";
import { bind } from "../../../../../utils/context";
import intlManager from "../../../../../utils/intl-manager";
import { getEntityCatalogGroupIds } from "../../../../../utils/workspace/getEntityCatalogGroupIds";
import { connectContext, getGlobalContext, showNotice } from '../../../../../utils/state';
export class ArcgisHubEntityContentCatalogConfig {
  constructor() {
    this.entity = undefined;
    this.operationAlert = null;
    this._context = getGlobalContext();
    this.showReharvestWarningModal = false;
    this.isReharvestRequestLoading = false;
    bind(this, 'handleCatalogGroupsChanged', 'openReharvestWarningModal', 'closeReharvestWarningModal', 'handleReharvestCatalogConfirmed', 'clearOperationAlert', 'createGroupButtonClicked');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  // TODO: find a way so the collaborators pane and the content pane don't have to both define the facet literals
  get pickerFacets() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const idsOfUserAdminGroups = this._context.currentUser.groups
      .reduce((acc, group) => {
      group.userMembership.memberType === 'admin' && acc.push(group.id);
      return acc;
    }, []);
    const facet = {
      label: this.intl.t("groupPickerFacet.label"),
      key: 'from',
      display: 'single-select',
      operation: 'OR',
      options: [
        {
          label: this.intl.t("groupPickerFacet.myGroups"),
          key: this.intl.t("groupPickerFacet.myGroups"),
          selected: true,
          predicates: [
            {
              owner: (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser.username
            }
          ]
        },
        // Groups in the user's org that the user is either
        // a member and the groups are set to be sharable by all members(isviewonly:false) OR
        // the user is an admin of the groups
        // sample query: (capabilities:"updateitemcontrol") AND ((orgid:"97KLIFOSt5CxbiRI" AND isviewonly:false) OR ((id:"152487f266ca411f8a8d9603a2817d61" OR id:"324ac262fc854903a7e23105174805ea" OR id:"3eb8fc91320d4c729bcad43a6f66bbd7" OR id:"4db2960aa6314793803a05604644e4ae" OR id:"59a434f18ccf433c849efcba58769f86" OR id:"5aba77c69b68494aab22c8076403502b" OR id:"df75e514659b4cdab6ce2a688e5a5f7d" OR id:"e3b46b05ce3a4bf496f8b2432ac393da" OR id:"fbd67bcab7424d449fe60fc0dde158e4")))
        {
          label: this.intl.t("groupPickerFacet.myOrganization"),
          key: this.intl.t("groupPickerFacet.myOrganization"),
          selected: false,
          predicates: [
            {
              orgid: (_c = (_b = this._context) === null || _b === void 0 ? void 0 : _b.currentUser) === null || _c === void 0 ? void 0 : _c.orgId,
              searchUserAccess: 'groupMember',
              searchUserName: this.entity.owner,
              isviewonly: false
            },
            {
              orgid: (_e = (_d = this._context) === null || _d === void 0 ? void 0 : _d.currentUser) === null || _e === void 0 ? void 0 : _e.orgId,
              id: idsOfUserAdminGroups
            }
          ]
        }
      ]
    };
    // If the user has a community org defined,
    // show "My Community" facet
    if ((_f = this._context) === null || _f === void 0 ? void 0 : _f.communityOrgId) {
      facet.options.push({
        label: this.intl.t("groupPickerFacet.myCommunity"),
        key: this.intl.t("groupPickerFacet.myCommunity"),
        selected: false,
        predicates: [
          {
            orgid: (_g = this._context) === null || _g === void 0 ? void 0 : _g.communityOrgId,
            searchUserAccess: 'groupMember',
            searchUserName: this.entity.owner,
            isviewonly: false
          },
          {
            orgid: (_h = this._context) === null || _h === void 0 ? void 0 : _h.communityOrgId,
            id: idsOfUserAdminGroups
          }
        ]
      });
    }
    facet.options.push({
      label: this.intl.t("groupPickerFacet.public"),
      key: 'public',
      selected: false,
      predicates: [
        {
          access: 'public'
        }
      ]
    });
    return [facet];
  }
  get isCatalogConfigured() {
    return !!getEntityCatalogGroupIds(this.entity).length;
  }
  get showReharvestUi() {
    // Right now, the catalog content refresh endpoint only works for
    // sites. Remove once an entity-agnostic endpoint is available.
    const type = getTypeFromEntity(this.entity);
    return type === 'site' && this.isCatalogConfigured;
  }
  async handleCatalogGroupsChanged(event) {
    const { added, removed, updatedList } = event.detail;
    const entityToUpdate = cloneObject(this.entity);
    const telemetryDetails = [];
    added && telemetryDetails.push(Object.assign(Object.assign({}, dictionary
      .category.content
      .action.update
      .label.groups
      .details.addCatalogGroups), { count: updatedList.length }));
    removed && telemetryDetails.push(Object.assign(Object.assign({}, dictionary
      .category.content
      .action.update
      .label.groups
      .details.removeCatalogGroups), { count: updatedList.length }));
    try {
      // Handle entities that don't have a catalog scope defined
      if (!getProp(this.entity, 'catalog.scopes.item')) {
        setProp('catalog.scopes.item', { targetEntity: 'item', filters: [] }, entityToUpdate);
      }
      const groupPredicate = getScopeGroupPredicate(entityToUpdate.catalog.scopes.item);
      if (groupPredicate) {
        groupPredicate.group = updatedList;
      }
      else {
        entityToUpdate.catalog.scopes.item.filters.push({
          operation: 'OR',
          predicates: [{
              group: updatedList
            }]
        });
      }
      // Since we don't have a loader, we temporarily change `this.entity` so that the UI immediately
      // reflects the changes. The official changed entity will propagate down after the update.
      this.entity = entityToUpdate;
      const entityType = getTypeFromEntity(entityToUpdate);
      const updated = await updateHubEntity(entityType, entityToUpdate, this._context);
      telemetryDetails.forEach(details => {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: constants.response.SUCCESS }));
      });
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: updated,
        isDirty: false,
      });
      showNotice({
        title: this.intl.t('configSaveAlert.success'),
        message: '',
        configuration: {
          noticeType: 'alert',
          autoClose: true,
          autoCloseDuration: 'fast',
          icon: true, kind: 'success',
          label: this.intl.t('formAlert')
        }
      });
    }
    catch (err) {
      this.triggerOperationAlert({
        kind: 'danger',
        title: this.intl.t('configSaveAlert.failure')
      });
      telemetryDetails.forEach(details => {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: constants.response.FAILURE }));
      });
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: entityToUpdate,
        isDirty: true,
      });
    }
  }
  async handleFeedsEnabledToggle() {
    const entityType = getTypeFromEntity(this.entity);
    const entityToUpdate = cloneObject(this.entity);
    const areFeedsDisabled = !getProp(entityToUpdate, 'feeds.disabled');
    setProp('feeds.disabled', areFeedsDisabled, entityToUpdate);
    try {
      // Since we don't have a loader, we temporarily change `this.entity` so that the UI immediately
      // reflects the changes. The official changed entity will propagate down after the update.
      this.entity = entityToUpdate;
      const updated = await updateHubEntity(entityType, entityToUpdate, this._context);
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: updated,
        isDirty: false,
      });
    }
    catch (err) {
      this.triggerOperationAlert({
        kind: 'danger',
        title: this.intl.t('configSaveAlert.failure')
      });
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: entityToUpdate,
        isDirty: true,
      });
    }
    const telemetryDetails = areFeedsDisabled
      ? dictionary
        .category.interaction
        .action.disable
        .label.content
        .details.hubFeeds
      : dictionary
        .category.interaction
        .action.enable
        .label.content
        .details.hubFeeds;
    this.hubTelemetry.emit(telemetryDetails);
  }
  openReharvestWarningModal() {
    this.hubTelemetry.emit(Object.assign({}, dictionary
      .category.catalog
      .action.update
      .label.checkForErrors
      .details.openModal));
    this.showReharvestWarningModal = true;
  }
  closeReharvestWarningModal() {
    this.showReharvestWarningModal = false;
  }
  createGroupButtonClicked() {
    this.hubTelemetry.emit(Object.assign({}, dictionary
      .category.groups
      .action.create));
  }
  async handleReharvestCatalogConfirmed() {
    this.closeReharvestWarningModal();
    this.isReharvestRequestLoading = true;
    try {
      const status = await reharvestSiteCatalog(this.entity.id, this._context);
      if (status.error) {
        if (status.error.cause === 'TIME_LOCK') {
          this.triggerOperationAlert({
            title: this.intl.t('reharvestCatalogAlert.inProgress'),
            kind: 'brand'
          });
        }
        else {
          this.triggerOperationAlert({
            title: this.intl.t('reharvestCatalogAlert.failure'),
            kind: 'danger'
          });
        }
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
          .category.catalog
          .action.update
          .label.checkForErrors
          .details.reharvest), { response: constants.response.FAILURE }));
      }
      if (status.groups) {
        this.triggerOperationAlert({
          title: this.intl.t('reharvestCatalogAlert.success'),
          kind: 'brand'
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
          .category.catalog
          .action.update
          .label.checkForErrors
          .details.reharvest), { response: constants.response.SUCCESS }));
      }
    }
    catch (err) {
      this.triggerOperationAlert({
        title: this.intl.t('reharvestCatalogAlert.failure'),
        kind: 'danger'
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary
        .category.catalog
        .action.update
        .label.checkForErrors
        .details.reharvest), { response: constants.response.FAILURE }));
    }
    this.isReharvestRequestLoading = false;
  }
  async triggerOperationAlert(options) {
    const { kind, title } = options;
    this.operationAlert = (h("calcite-alert", { autoClose: kind !== 'danger', autoCloseDuration: "fast", icon: true, kind: kind, label: this.intl.t('formAlert'), onCalciteAlertClose: this.clearOperationAlert, open: true, placement: "top-end" }, h("div", { slot: "title" }, title)));
  }
  clearOperationAlert() {
    this.operationAlert = null;
  }
  renderHeaderRow() {
    return h(Fragment, null, h("div", { class: "title-container" }, h("h3", null, this.intl.t('title')), this.showReharvestUi &&
      h("calcite-button", { appearance: "outline", class: "reharvest-catalog-button", disabled: this.isReharvestRequestLoading, iconStart: "debug-script", loading: this.isReharvestRequestLoading, onClick: this.openReharvestWarningModal, round: true }, this.intl.t('reharvestCatalogButton'))), this.showReharvestUi && this.renderReharvestWarningModal());
  }
  renderReharvestWarningModal() {
    return this.showReharvestUi &&
      h("calcite-modal", { onCalciteModalClose: this.closeReharvestWarningModal, open: this.showReharvestWarningModal, width: "s" }, h("div", { slot: "header" }, this.intl.t('reharvestWarningModal.title')), h("div", { class: "reharvest-modal-body", slot: "content" }, h("div", null, this.intl.t('reharvestWarningModal.body1')), h("div", null, this.intl.t('reharvestWarningModal.body2'))), h("calcite-button", { appearance: "outline", onClick: this.closeReharvestWarningModal, slot: "secondary" }, this.intl.t('reharvestWarningModal.secondaryButton')), h("calcite-button", { onClick: this.handleReharvestCatalogConfirmed, slot: "primary" }, this.intl.t('reharvestWarningModal.primaryButton')));
  }
  renderGroupsSection() {
    return h("section", null, h("h4", null, " ", this.intl.t('sections.groups.title'), " "), h("p", null, " ", this.intl.t('sections.groups.helperText'), " "), h("arcgis-hub-group-list-manager", { allowAdd: true, allowRemove: true, groupIds: getEntityCatalogGroupIds(this.entity), pickerFacets: this.pickerFacets, wellKnownPickerCatalog: "allGroups" }, h("calcite-button", { appearance: "outline-fill", href: `${this._context.portalUrl}/home/groups.html`, "icon-end": "launch", onClick: this.createGroupButtonClicked, round: true, slot: "secondary-picker-button", target: "_blank" }, this.intl.t('sections.groups.createGroup'))));
  }
  render() {
    return (h(Host, { "data-element": "entity-content-catalog-config" }, this.operationAlert, this.renderHeaderRow(), " ", this.renderGroupsSection()));
  }
  static get is() { return "arcgis-hub-entity-content-catalog-config"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-content-catalog-config.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-content-catalog-config.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "HubEntityWithCatalog",
          "resolved": "IHubDiscussion & IWithCatalog | IHubEvent & IWithCatalog | IHubGroup & IWithCatalog | IHubInitiative & IWithCatalog | IHubPage & IWithCatalog | IHubProject & IWithCatalog | IHubSite & IWithCatalog | IHubSurvey & IWithCatalog | IHubTemplate & IWithCatalog | IHubUser & IWithCatalog",
          "references": {
            "HubEntityWithCatalog": {
              "location": "import",
              "path": "../../types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "operationAlert": {},
      "_context": {},
      "showReharvestWarningModal": {},
      "isReharvestRequestLoading": {}
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
              "path": "../../../../../utils/workspace/types"
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
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubGroupListManagerChanged",
        "method": "handleCatalogGroupsChanged",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calciteSwitchChange",
        "method": "handleFeedsEnabledToggle",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
