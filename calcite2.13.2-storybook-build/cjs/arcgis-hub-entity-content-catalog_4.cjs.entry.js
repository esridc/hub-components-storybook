'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
const getEntityCatalogGroupIds = require('./getEntityCatalogGroupIds-bed10ce2.js');
const state = require('./state-6637df8c.js');
const interfaces = require('./interfaces-fc0046ff.js');
const util = require('./util-38e73510.js');
const index$1 = require('./index-6f16fe65.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const setProp = require('./set-prop-3de2437f.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const updateHubEntity = require('./updateHubEntity-60b83b84.js');
const previewFeed = require('./previewFeed-111ab312.js');
const debounce = require('./debounce-bd990e9f.js');
const hubSearch = require('./hubSearch-79d30702.js');
const getService = require('./getService-b27eda44.js');
const logger = require('./logger-5db3d659.js');
const compose = require('./compose-9b4311c9.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./get-family-cafa88bb.js');
require('./deep-set-49b373be.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./generate-random-string-8807d629.js');
require('./extent-715f7c8d.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./helpers-64227739.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./get-item-home-url-b1e3ff74.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./edit-3df37e35.js');
require('./get-form-json-e6831b20.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./edit-fd85c003.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./get-structured-license-4e9f994b.js');
require('./edit-2b7ccc3f.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

const arcgisHubEntityContentCatalogCss = ".sc-arcgis-hub-entity-content-catalog-h{display:block}.title.sc-arcgis-hub-entity-content-catalog{display:flex;align-items:center;justify-content:space-between}h3.sc-arcgis-hub-entity-content-catalog{margin:30px 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}";

const ArcgisHubEntityContentCatalog = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubEntityContentTabChangeRequest = index.createEvent(this, "arcgisHubEntityContentTabChangeRequest", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.facets = undefined;
    this._context = state.getGlobalContext();
    this.selectedCollectionKey = undefined;
    this.showThumbnail = false;
    context.bind(this, 'handleCollectionSelect', 'openCatalogConfigTab');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.setFacets();
  }
  connectedCallback() {
    state.connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  setFacets() {
    this.facets = [
      {
        label: this.intl.t('facets.map.label'),
        tooltip: this.intl.t('facets.map.tooltip'),
        key: 'bbox',
        display: 'map',
        field: 'bbox',
        value: null,
      },
      {
        label: this.intl.t('facets.type'),
        key: 'type',
        display: 'multi-select',
        field: 'type',
        options: [],
        operation: 'OR',
        aggLimit: 100,
      },
      {
        label: this.intl.t('facets.tags'),
        key: 'tags',
        display: 'multi-select',
        field: 'tags',
        options: [],
        operation: 'OR',
      },
      {
        label: this.intl.t('facets.categories'),
        key: 'categories',
        display: 'tree',
        field: 'categories',
        options: [],
        operation: 'OR',
      },
      {
        label: this.intl.t('facets.dateUpdated'),
        key: 'modified',
        display: 'date-range',
        field: 'modified',
        state: 'open',
        max: new Date(),
      },
      {
        label: this.intl.t('facets.sharing'),
        key: 'access',
        display: 'multi-select',
        field: 'access',
        options: [],
        operation: 'OR',
      },
    ];
  }
  openCatalogConfigTab() {
    this.arcgisHubEntityContentTabChangeRequest.emit(getEntityCatalogGroupIds.ContentPaneTabs.CATALOG_CONFIG);
  }
  /**
   * Combines the entity's catalog scope with the selected collection's scope
   * to create the unified IQuery that will be the base of the gallery's display
   */
  get query() {
    const catalogScope = this.entity.catalog.scopes.item;
    const collectionScope = this.selectedCollection.scope;
    // Collections often have a `scope.collection` shortcut field so they don't have to hard-code every
    // predicate definition. To make sure that this shortcut field gets included in the final IQuery, we
    // treat the collection scope as the base rather than the catalog scope.
    const result = util.cloneObject(collectionScope);
    result.filters = [...result.filters, ...catalogScope.filters];
    return result;
  }
  get selectedCollection() {
    return this.collections.find(c => c.key === this._selectedCollectionKey);
  }
  get _selectedCollectionKey() {
    const fallback = this.collections[0].key;
    return this.selectedCollectionKey || fallback;
  }
  get collections() {
    const collectionPersistances = this.entity.catalog.collections;
    return collectionPersistances.filter(c => !c.hidden);
  }
  handleCollectionSelect(evt) {
    this.selectedCollectionKey = evt.target.tab;
  }
  get addContentConfig() {
    // NOTE: This is overly complex because current site catalog configuration
    // and migration does not support the `types` property in the query
    // and instead uses "WellKnownCollections"
    // Although there is a hub.js function for this, it's not exported
    // because we really should not need it... but until we resolve the
    // well-known collections issue, we need to do this manually
    const userGroupsByMembership = {
      owner: [],
      member: [],
      admin: [],
    };
    // get the user's groups
    const userGroups = this._context.currentUser.groups || [];
    // loop through the groups and determine if the user is an admin or normal member
    // and add into the response
    userGroups.forEach((group) => {
      var _a, _b, _c;
      // We only want to add the group if it's in the catalogGroupIds
      if (this.catalogGroupIds.includes(group.id)) {
        if (((_a = group.userMembership) === null || _a === void 0 ? void 0 : _a.memberType) === "owner") {
          userGroupsByMembership.owner.push(group.id);
        }
        if (((_b = group.userMembership) === null || _b === void 0 ? void 0 : _b.memberType) === "admin") {
          userGroupsByMembership.admin.push(group.id);
        }
        // If user is just a member and the group is not view only
        if (((_c = group.userMembership) === null || _c === void 0 ? void 0 : _c.memberType) === "member" && !group.isViewOnly) {
          userGroupsByMembership.member.push(group.id);
        }
      }
    });
    const addExistingConfig = {
      targetEntity: 'item',
      workflow: 'existing',
      types: [],
      // Query for all items that are not in the catalog groups
      query: {
        targetEntity: 'item',
        filters: [
          {
            predicates: [
              {
                group: { not: [...this.catalogGroupIds] }
              }
            ]
          }
        ],
      },
      // These are the groups the user can choose to share to
      groups: userGroupsByMembership,
    };
    const existingWfConfig = {
      existing: addExistingConfig,
      state: 'enabled',
    };
    return {
      config: existingWfConfig,
      // allowGroupSelection: true,
      entity: this.entity,
      entityCapability: 'content',
    };
  }
  renderNoCollectionsView() {
    return (index.h(index.Fragment, null, index.h("h4", null, this.intl.t('noCollections.title')), index.h("p", null, this.intl.t('noCollections.message')), index.h("calcite-button", { appearance: "outline-fill", onClick: this.openCatalogConfigTab, round: true }, this.intl.t('noCollections.button'))));
  }
  updateShowThumbnail(event) {
    this.showThumbnail = event.detail.layout === 'grid';
  }
  handleAddContentWorkflowComplete() {
    setTimeout(() => {
      // ugh - we got the event so we know the stuff was shared but we need to give the api time to catch up
      this.contentGalleryRef.refresh();
    }, 2000);
  }
  get catalogGroupIds() {
    return getEntityCatalogGroupIds.getEntityCatalogGroupIds(this.entity);
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-content-catalog" }, index.h("div", { class: "title" }, index.h("h3", null, this.intl.t('title')), index.h("arcgis-hub-add-content", Object.assign({}, this.addContentConfig))), this.catalogGroupIds.length
      ? index.h("arcgis-hub-gallery", { corners: interfaces.CORNERS.round, facets: this.facets, linkTarget: "siteRelative", mobileView: this.isMobile, query: this.query, ref: (el) => { this.contentGalleryRef = el; }, shadow: interfaces.DROP_SHADOWS.low, "show-back-to-top-btn": true, "show-chips": true, "show-facets": true, "show-layout-switcher": true, "show-more-results-btn": true, "show-results-count": true, "show-search": true, "show-sort": true, showThumbnail: this.showThumbnail }, index.h("div", { slot: "collection-select" }, index.h("calcite-tabs", { layout: "center", scale: "l" }, index.h("calcite-tab-nav", { onCalciteTabsActivate: this.handleCollectionSelect, slot: "title-group" }, this.collections.map(c => index.h("calcite-tab-title", { key: c.key, selected: c.key === this._selectedCollectionKey, tab: c.key }, c.label || this.intl.t(`collections.${c.key}`)))))))
      : this.renderNoCollectionsView()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityContentCatalog.style = arcgisHubEntityContentCatalogCss;

const arcgisHubEntityContentCatalogConfigCss = ":host{display:block}h3{margin:30px 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}arcgis-hub-group-list-manager{padding-bottom:0.75rem}.private-site-notice-container{max-width:20rem}.title-container{display:flex;flex-direction:row;justify-content:space-between}.reharvest-catalog-button{align-self:center;margin-inline-end:0.25rem}.reharvest-modal-body{display:flex;flex-direction:column;gap:0.5rem}section{margin-bottom:2rem;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}section h1,section h2,section h3,section h4,section h5,section h6{font-size:var(--calcite-font-size-1);margin-top:0px;margin-bottom:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}";

const ArcgisHubEntityContentCatalogConfig = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
    this.operationAlert = null;
    this._context = state.getGlobalContext();
    this.showReharvestWarningModal = false;
    this.isReharvestRequestLoading = false;
    context.bind(this, 'handleCatalogGroupsChanged', 'openReharvestWarningModal', 'closeReharvestWarningModal', 'handleReharvestCatalogConfirmed', 'clearOperationAlert', 'createGroupButtonClicked');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  connectedCallback() {
    state.connectContext(this);
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
    return !!getEntityCatalogGroupIds.getEntityCatalogGroupIds(this.entity).length;
  }
  get showReharvestUi() {
    // Right now, the catalog content refresh endpoint only works for
    // sites. Remove once an entity-agnostic endpoint is available.
    const type = getTypeFromEntity.getTypeFromEntity(this.entity);
    return type === 'site' && this.isCatalogConfigured;
  }
  async handleCatalogGroupsChanged(event) {
    const { added, removed, updatedList } = event.detail;
    const entityToUpdate = util.cloneObject(this.entity);
    const telemetryDetails = [];
    added && telemetryDetails.push(Object.assign(Object.assign({}, index$1.dist.dictionary
      .category.content
      .action.update
      .label.groups
      .details.addCatalogGroups), { count: updatedList.length }));
    removed && telemetryDetails.push(Object.assign(Object.assign({}, index$1.dist.dictionary
      .category.content
      .action.update
      .label.groups
      .details.removeCatalogGroups), { count: updatedList.length }));
    try {
      // Handle entities that don't have a catalog scope defined
      if (!getProp.getProp(this.entity, 'catalog.scopes.item')) {
        setProp.setProp('catalog.scopes.item', { targetEntity: 'item', filters: [] }, entityToUpdate);
      }
      const groupPredicate = HubInitiatives.getScopeGroupPredicate(entityToUpdate.catalog.scopes.item);
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
      const entityType = getTypeFromEntity.getTypeFromEntity(entityToUpdate);
      const updated = await updateHubEntity.updateHubEntity(entityType, entityToUpdate, this._context);
      telemetryDetails.forEach(details => {
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.SUCCESS }));
      });
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: updated,
        isDirty: false,
      });
      state.showNotice({
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.FAILURE }));
      });
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: entityToUpdate,
        isDirty: true,
      });
    }
  }
  async handleFeedsEnabledToggle() {
    const entityType = getTypeFromEntity.getTypeFromEntity(this.entity);
    const entityToUpdate = util.cloneObject(this.entity);
    const areFeedsDisabled = !getProp.getProp(entityToUpdate, 'feeds.disabled');
    setProp.setProp('feeds.disabled', areFeedsDisabled, entityToUpdate);
    try {
      // Since we don't have a loader, we temporarily change `this.entity` so that the UI immediately
      // reflects the changes. The official changed entity will propagate down after the update.
      this.entity = entityToUpdate;
      const updated = await updateHubEntity.updateHubEntity(entityType, entityToUpdate, this._context);
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
      ? index$1.dist.dictionary
        .category.interaction
        .action.disable
        .label.content
        .details.hubFeeds
      : index$1.dist.dictionary
        .category.interaction
        .action.enable
        .label.content
        .details.hubFeeds;
    this.hubTelemetry.emit(telemetryDetails);
  }
  openReharvestWarningModal() {
    this.hubTelemetry.emit(Object.assign({}, index$1.dist.dictionary
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
    this.hubTelemetry.emit(Object.assign({}, index$1.dist.dictionary
      .category.groups
      .action.create));
  }
  async handleReharvestCatalogConfirmed() {
    this.closeReharvestWarningModal();
    this.isReharvestRequestLoading = true;
    try {
      const status = await previewFeed.reharvestSiteCatalog(this.entity.id, this._context);
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary
          .category.catalog
          .action.update
          .label.checkForErrors
          .details.reharvest), { response: index$1.dist.constants.response.FAILURE }));
      }
      if (status.groups) {
        this.triggerOperationAlert({
          title: this.intl.t('reharvestCatalogAlert.success'),
          kind: 'brand'
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary
          .category.catalog
          .action.update
          .label.checkForErrors
          .details.reharvest), { response: index$1.dist.constants.response.SUCCESS }));
      }
    }
    catch (err) {
      this.triggerOperationAlert({
        title: this.intl.t('reharvestCatalogAlert.failure'),
        kind: 'danger'
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary
        .category.catalog
        .action.update
        .label.checkForErrors
        .details.reharvest), { response: index$1.dist.constants.response.FAILURE }));
    }
    this.isReharvestRequestLoading = false;
  }
  async triggerOperationAlert(options) {
    const { kind, title } = options;
    this.operationAlert = (index.h("calcite-alert", { autoClose: kind !== 'danger', autoCloseDuration: "fast", icon: true, kind: kind, label: this.intl.t('formAlert'), onCalciteAlertClose: this.clearOperationAlert, open: true, placement: "top-end" }, index.h("div", { slot: "title" }, title)));
  }
  clearOperationAlert() {
    this.operationAlert = null;
  }
  renderHeaderRow() {
    return index.h(index.Fragment, null, index.h("div", { class: "title-container" }, index.h("h3", null, this.intl.t('title')), this.showReharvestUi &&
      index.h("calcite-button", { appearance: "outline", class: "reharvest-catalog-button", disabled: this.isReharvestRequestLoading, iconStart: "debug-script", loading: this.isReharvestRequestLoading, onClick: this.openReharvestWarningModal, round: true }, this.intl.t('reharvestCatalogButton'))), this.showReharvestUi && this.renderReharvestWarningModal());
  }
  renderReharvestWarningModal() {
    return this.showReharvestUi &&
      index.h("calcite-modal", { onCalciteModalClose: this.closeReharvestWarningModal, open: this.showReharvestWarningModal, width: "s" }, index.h("div", { slot: "header" }, this.intl.t('reharvestWarningModal.title')), index.h("div", { class: "reharvest-modal-body", slot: "content" }, index.h("div", null, this.intl.t('reharvestWarningModal.body1')), index.h("div", null, this.intl.t('reharvestWarningModal.body2'))), index.h("calcite-button", { appearance: "outline", onClick: this.closeReharvestWarningModal, slot: "secondary" }, this.intl.t('reharvestWarningModal.secondaryButton')), index.h("calcite-button", { onClick: this.handleReharvestCatalogConfirmed, slot: "primary" }, this.intl.t('reharvestWarningModal.primaryButton')));
  }
  renderGroupsSection() {
    return index.h("section", null, index.h("h4", null, " ", this.intl.t('sections.groups.title'), " "), index.h("p", null, " ", this.intl.t('sections.groups.helperText'), " "), index.h("arcgis-hub-group-list-manager", { allowAdd: true, allowRemove: true, groupIds: getEntityCatalogGroupIds.getEntityCatalogGroupIds(this.entity), pickerFacets: this.pickerFacets, wellKnownPickerCatalog: "allGroups" }, index.h("calcite-button", { appearance: "outline-fill", href: `${this._context.portalUrl}/home/groups.html`, "icon-end": "launch", onClick: this.createGroupButtonClicked, round: true, slot: "secondary-picker-button", target: "_blank" }, this.intl.t('sections.groups.createGroup'))));
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-content-catalog-config" }, this.operationAlert, this.renderHeaderRow(), " ", this.renderGroupsSection()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityContentCatalogConfig.style = arcgisHubEntityContentCatalogConfigCss;

const arcgisHubEntityContentCollectionsCss = ".sc-arcgis-hub-entity-content-collections-h{display:block}h3.sc-arcgis-hub-entity-content-collections{margin:30px 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}section.sc-arcgis-hub-entity-content-collections{margin-bottom:2rem;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}section.sc-arcgis-hub-entity-content-collections h1.sc-arcgis-hub-entity-content-collections,section.sc-arcgis-hub-entity-content-collections h2.sc-arcgis-hub-entity-content-collections,section.sc-arcgis-hub-entity-content-collections h3.sc-arcgis-hub-entity-content-collections,section.sc-arcgis-hub-entity-content-collections h4.sc-arcgis-hub-entity-content-collections,section.sc-arcgis-hub-entity-content-collections h5.sc-arcgis-hub-entity-content-collections,section.sc-arcgis-hub-entity-content-collections h6.sc-arcgis-hub-entity-content-collections{font-size:var(--calcite-font-size-1);margin-top:0px;margin-bottom:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}";

const ArcgisHubEntityContentCollections = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.entity = undefined;
    this.footerSlotRef = undefined;
    this.configurableCollections = undefined;
    this.isSaving = false;
    this.isDirty = false;
    this.saveOperationAlert = null;
    context.bind(this, 'translationFunction', 'saveCollectionConfiguration', 'handleConfigEditorChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.setConfigurableCollections();
    this.setSortableListSchema();
  }
  setSortableListSchema() {
    this.sortableListSchema = {
      type: 'object',
      properties: {
        collections: {
          type: "array",
          items: {
            type: "object",
          }
        },
      }
    };
    this.sortableListUiSchema = {
      type: 'Section',
      options: {
        "section": "card",
      },
      elements: [
        {
          scope: '/properties/collections',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: true,
            allowHide: true,
            allowReorder: true,
            allowRemove: false,
          }
        }
      ],
    };
  }
  setConfigurableCollections() {
    // Users cannot modify the "All" collection, so we remove it from our displayed list
    const collectionsWithoutAll = this.entity.catalog.collections.filter(c => c.key !== 'all');
    this.configurableCollections = util.cloneObject(collectionsWithoutAll);
  }
  /**
   * Convert IHubCollectionsPersistance to IListItem
   */
  get configurableCollectionsListItems() {
    return this.configurableCollections.map(c => ({
      key: c.key,
      label: c.label || this.intl.t(`collections.${c.key}`),
      hidden: c.hidden,
    }));
  }
  // This function is needed so we can bind `this` before
  // passing it in to the `arcgis-configuration-form`
  translationFunction(key) {
    return this.intl.t(key);
  }
  async saveCollectionConfiguration() {
    const toUpdate = util.cloneObject(this.entity);
    const collectionsToUpdated = util.cloneObject(this.configurableCollections);
    // Because the `All` collection is excluded from the `configurableCollections`
    // list we have to manually add it back in here
    const allCollection = toUpdate.catalog.collections.find(c => c.key === 'all');
    toUpdate.catalog.collections = allCollection ? [allCollection, ...collectionsToUpdated] : collectionsToUpdated;
    try {
      this.isSaving = true;
      const entityType = getTypeFromEntity.getTypeFromEntity(toUpdate);
      const updated = await updateHubEntity.updateHubEntity(entityType, toUpdate, state.getGlobalContext());
      this.triggerSaveOperationAlert('success');
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: updated,
        isDirty: false,
      });
    }
    catch (err) {
      this.triggerSaveOperationAlert('failure');
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: toUpdate,
        isDirty: true,
      });
    }
    finally {
      this.isSaving = false;
    }
  }
  async triggerSaveOperationAlert(type) {
    const title = type === 'success'
      ? this.intl.t('alertMessages.success')
      : this.intl.t('alertMessages.error');
    const kind = type === 'success' ? 'success' : 'danger';
    this.saveOperationAlert = (index.h("calcite-alert", { autoClose: true, autoCloseDuration: "fast", icon: true, kind: kind, label: this.intl.t('formAlert'), open: true, placement: "top-end" }, index.h("div", { slot: "title" }, title)));
    // re-set the alert after it auto-closes
    setTimeout(() => {
      this.saveOperationAlert = null;
    }, 6000);
  }
  /**
   * Convert IListItem to IHubCollectionsPersistance and update the state
   * @param event
   */
  handleConfigEditorChange(event) {
    this.isDirty = true;
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: this.entity,
      isDirty: this.isDirty,
    });
    const updatedCollections = event.detail.values.collections;
    // Update the state with the new values
    this.configurableCollections = updatedCollections.map(updatedCollection => {
      // Find the collection in the state that matches the updated collection using their unique keys
      const collection = this.configurableCollections.find(cc => cc.key === updatedCollection.key);
      return Object.assign(Object.assign({}, collection), { label: updatedCollection.label, hidden: updatedCollection.hidden });
    });
  }
  renderListControl() {
    return index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleConfigEditorChange, schema: this.sortableListSchema, t: this.translationFunction, uiSchema: this.sortableListUiSchema, values: { collections: this.configurableCollectionsListItems } });
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-content-collections" }, this.saveOperationAlert, index.h("h3", null, this.intl.t('title')), index.h("section", null, index.h("h4", null, this.intl.t('sections.collectionConfiguration.title')), this.renderListControl()), index.h("arcgis-wormhole", { styles: { position: 'relative' }, target: this.footerSlotRef }, index.h("calcite-button", { disabled: this.isSaving || !this.isDirty, loading: this.isSaving, onClick: this.saveCollectionConfiguration, round: true }, this.intl.t('saveButton')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "entity": ["setConfigurableCollections"]
  }; }
};
ArcgisHubEntityContentCollections.style = arcgisHubEntityContentCollectionsCss;

const arcgisHubEntityContentFeedsCss = ".sc-arcgis-hub-entity-content-feeds-h{display:block;--calcite-label-margin-bottom:0}h3.sc-arcgis-hub-entity-content-feeds{margin:30px 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}h4.sc-arcgis-hub-entity-content-feeds{margin:0px;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}h5.sc-arcgis-hub-entity-content-feeds{margin:0px;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1)}.feeds-tab-title-row.sc-arcgis-hub-entity-content-feeds{margin-bottom:1rem;display:flex;align-items:flex-start;justify-content:space-between}.feeds-help-column.sc-arcgis-hub-entity-content-feeds{width:49%}.horizontal-rule.sc-arcgis-hub-entity-content-feeds{border-top:.5px solid var(--calcite-color-border-1)}.feeds-editor-row.sc-arcgis-hub-entity-content-feeds{margin-top:1rem;display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:2rem;padding-top:1rem}.feeds-editor-column.sc-arcgis-hub-entity-content-feeds{display:flex;flex-direction:column;gap:1rem}.preview-toggle-container.sc-arcgis-hub-entity-content-feeds{display:flex;justify-content:flex-end}.preview-toggle-container.sc-arcgis-hub-entity-content-feeds>calcite-label.sc-arcgis-hub-entity-content-feeds{margin-bottom:0.5rem}.feeds-code-editor.sc-arcgis-hub-entity-content-feeds{height:24rem;border:1px solid var(--calcite-color-border-input)}.feeds-code-editor[has-error].sc-arcgis-hub-entity-content-feeds{border:2px solid var(--calcite-color-status-danger)}.invalid-json-editor-warning.sc-arcgis-hub-entity-content-feeds{margin-top:0.5rem}.preview-main-container.sc-arcgis-hub-entity-content-feeds{height:24rem;overflow:scroll;border:1px solid var(--calcite-color-border-input);background-color:var(--calcite-color-background)}.formatted-preview.sc-arcgis-hub-entity-content-feeds{margin:0px;text-wrap:nowrap}.preview-notice.sc-arcgis-hub-entity-content-feeds{margin:1rem}.feeds-tools-column.sc-arcgis-hub-entity-content-feeds{display:flex;flex-direction:column;gap:1rem}.preview-picker-form.sc-arcgis-hub-entity-content-feeds{margin-bottom:-0.5rem}section.sc-arcgis-hub-entity-content-feeds{margin-bottom:2rem;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubEntityContentFeeds = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.arcgisHubEntityContentTabChangeRequest = index.createEvent(this, "arcgisHubEntityContentTabChangeRequest", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
    this.footerSlotRef = undefined;
    this.hasGrouplessCatalog = undefined;
    this.hasEmptyPublicCatalog = undefined;
    this.isFeedsToggleEnabled = undefined;
    this.feedFormat = undefined;
    this.feedVersion = undefined;
    this.feedTemplate = undefined;
    this.isPreviewing = undefined;
    this.previewPickerSchema = undefined;
    this.previewPickerUiSchema = undefined;
    this.previewHubId = undefined;
    this.formattedPreview = undefined;
    this.isFeedsToggleDirty = undefined;
    this.isTemplateEditorDirty = undefined;
    this.isSaving = undefined;
    this.attemptedFormatChange = undefined;
    this.isLoading = undefined;
    this.previewStatus = undefined;
    context.bind(this, 'openCatalogTab', 'openCatalogConfigTab', 'handleFeedsEnabledToggle', 'handleFeedFormatChange', 'handleCodeEditorChange', 'handlePreviewToggle', 'handlePreviewItemChange', 'handleSaveFeedsClick', 'handleCopyButtonClicked');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.initializeComponent();
  }
  /**
   * Whenever the entity changes (e.g., sharing level is changed in the workspace header)
   * we need to re-initialize the component to reflect the new state. Feeds is very dependent
   * on the current configuration of the entity.
   */
  async initializeComponent() {
    this.setIsLoading(true);
    await this._initializeState();
    this.setIsLoading(false);
  }
  setIsLoading(value) {
    this.isLoading = value;
  }
  /**
   * Initializes the component state based on the current entity configuration.
   * NOTE: Call this.initializeComponent() instead of this method directly.
   */
  async _initializeState() {
    // Reset state to defaults
    this.hasGrouplessCatalog = false;
    this.hasEmptyPublicCatalog = false;
    this.isFeedsToggleEnabled = !getProp.getProp(this.entity, 'feeds.disabled');
    this.isFeedsToggleDirty = false;
    this.isPreviewing = false;
    this.previewPickerSchema = null;
    this.previewPickerUiSchema = null;
    this.previewHubId = null;
    this.formattedPreview = null;
    this.isSaving = false;
    this.attemptedFormatChange = null;
    // Feeds are not supported for private entities
    if (this.entity.access !== 'public') {
      return;
    }
    // Feeds are not supported for entities without a group-based catalog
    this.hasGrouplessCatalog = !getEntityCatalogGroupIds.getEntityCatalogGroupIds(this.entity).length;
    if (this.hasGrouplessCatalog) {
      return;
    }
    // Feeds cannot be configured if the catalog has no public items
    const firstSearchResult = await this.fetchPublicResultFromCatalog();
    if (!firstSearchResult) {
      this.hasEmptyPublicCatalog = true;
      return;
    }
    // Feeds _can_ be configured, so let's initialize the editor
    // NOTE: In case the entity is updated while the user is editing a non-default feed format (e.g. rss),
    // we need to re-initialize the editor with the correct format and version. Default to DCAT-US 1.1.
    this.initializeTemplateEditor(this.feedFormat || 'dcat-us', this.feedVersion || '1.1');
    // Derive the initial preview hubId and set the preview picker schemas
    this.previewHubId = this.getPreviewHubId(firstSearchResult);
    this.setPreviewPickerSchemas();
  }
  /**
   * TODO: consider moving to a utility
   * Fetch the first public item from the entity's catalog. Used to derive the
   * item for previewing and to set the state of the preview picker.
   * @param additionalFilters additional filters to apply to the search query
   * @returns the first public result within the entity's catalog
   */
  async fetchPublicResultFromCatalog(additionalFilters) {
    try {
      // We only show the feeds tab if there are public items in the catalog,
      // so we have to perform a live search to check.
      // NOTE: this._catalog includes predicates to only fetch public items
      const query = util.cloneObject(this._publicItemCatalog.scopes.item);
      if (additionalFilters) {
        query.filters = query.filters.concat(additionalFilters);
      }
      const searchOptions = {
        num: 1,
        requestOptions: state.getGlobalContext().hubRequestOptions,
      };
      const { total: hasPublicItems, results } = await hubSearch.hubSearch(query, searchOptions);
      if (hasPublicItems) {
        const result = results[0];
        // NOTE: there is a bug in the enrichment process that causes the pipeline to error out
        // when attempting to fetch the service definition for non-service items. As a result,
        // We'll do it manually here for now.
        if (result.type === 'Feature Service' || result.type === 'Map Service') {
          const getServiceOptions = {
            url: result.rawResult.url,
            authentication: state.getGlobalContext().hubRequestOptions.authentication
          };
          result.server = await getService.getService(getServiceOptions);
        }
        return result;
      }
    }
    catch (err) {
      logger.Logger.error('error fetching catalog result', err);
    }
  }
  /**
   * TODO: consider moving to a utility
   *
   * Derive a valid hubId for the preview functionality based on a search result.
   * Due to idiosyncrasies of our indexing system, we need to jump through
   * a number of hoops to calculate the correct id.
   * @param searchResult IHubSearchResult used derive the preview hubId from.
   * Should be enriched with server info if it's a service.
   * @returns a valid hubId for the preview picker
   */
  getPreviewHubId(searchResult) {
    let previewHubId;
    const referenceLayerId = ['Feature Service', 'Map Service'].includes(searchResult.type) && compose.getLayerIdFromUrl(searchResult.rawResult.url);
    const hasLayers = !!getProp.getProp(searchResult, 'server.layers.length');
    // Feeds rely on the indexer and the indexer does odd things for certain service permutations.
    // As a result, we make some checks to properly construct a valid hubId for the preview
    if (referenceLayerId && hasLayers) {
      // We only index the reference layer for reference layer services
      previewHubId = `${searchResult.id}_${referenceLayerId}`;
    }
    else if (hasLayers) {
      // We index the service and all layers for multi-layer services, but only the service for single-layer services.
      // To play it safe, we opt always use the first layer present in the service since it's guaranteed to be indexed.
      // NOTE: the first layer is _not_ always 0. Customers do strange things when they manage their services.
      previewHubId = `${searchResult.id}_${searchResult.server.layers[0].id}`;
    }
    else {
      // Non-service items have the same hubId as the item itself
      previewHubId = searchResult.id;
    }
    return previewHubId;
  }
  setPreviewPickerSchemas() {
    this.previewPickerSchema = {
      type: "object",
      properties: {
        previewItem: {
          type: "array",
          items: {
            type: "string"
          },
          maxItems: 1,
        },
      }
    };
    const i18nScope = 'toolsSection.previewSampleData';
    this.previewPickerUiSchema = {
      type: 'layout',
      elements: [
        {
          label: this.intl.t('toolsSection.previewSampleData.label'),
          scope: "/properties/previewItem",
          type: "Control",
          options: {
            control: "hub-field-input-gallery-picker",
            targetEntity: "item",
            catalogs: [
              this._publicItemCatalog
            ],
            facets: [
              {
                label: this.intl.t(`${i18nScope}.pickerFacets.type`),
                key: 'type',
                display: 'multi-select',
                field: 'type',
                options: [],
                operation: 'OR',
                aggLimit: 100,
              },
              {
                label: this.intl.t(`${i18nScope}.pickerFacets.tags`),
                key: 'tags',
                display: 'multi-select',
                field: 'tags',
                options: [],
                operation: 'OR',
              },
              {
                label: this.intl.t(`${i18nScope}.pickerFacets.categories`),
                key: 'categories',
                display: 'tree',
                field: 'categories',
                options: [],
                operation: 'OR',
              },
              {
                label: this.intl.t(`${i18nScope}.pickerFacets.dateUpdated`),
                key: 'modified',
                display: 'date-range',
                field: 'modified',
                state: 'open',
                max: new Date(),
              },
              {
                label: this.intl.t(`${i18nScope}.pickerFacets.sharing`),
                key: 'access',
                display: 'multi-select',
                field: 'access',
                options: [],
                operation: 'OR',
              },
            ]
          }
        },
      ]
    };
  }
  /**
   * Returns whether feeds could even be configured for the current entity.
   */
  get isFeedsSupported() {
    return this.entity.access === 'public' && !this.hasGrouplessCatalog && !this.hasEmptyPublicCatalog;
  }
  get supportedFeeds() {
    return [
      { format: 'dcat-us', version: '1.1' },
      { format: 'dcat-ap', version: '2.1.1' },
      { format: 'rss', version: '2.0' }
    ];
  }
  get hasUneditableAttributes() {
    var _a;
    const withUneditableAttributes = {
      'dcat-us': {
        '1.1': true
      },
      'dcat-ap': {
        '2.1.1': true
      }
    };
    return !!((_a = withUneditableAttributes[this.feedFormat]) === null || _a === void 0 ? void 0 : _a[this.feedVersion]);
  }
  /**
   * returns the base i18n key for the current feed format and version
   */
  get baseFeedIntlKey() {
    return this.getBaseFeedIntlKey(this.feedFormat, this.feedVersion);
  }
  /**
   * Calculates the base i18n key for a given feed format and version.
   * @param format
   * @param version
   * @returns the base i18n key
   */
  getBaseFeedIntlKey(format, version) {
    return `${format}.${version}`;
  }
  /**
   * Whether the current feed template in the editor contains invalid JSON.
   * We use this for messaging and to prevent the user from saving invalid JSON.
   */
  get hasInvalidJson() {
    let result = true;
    if (this.feedTemplate) {
      try {
        JSON.parse(this.feedTemplate);
        result = false;
      }
      catch (_) { }
    }
    return result;
  }
  /**
   * Returns a modified version of the entity's catalog that is suitable for feeds,
   * (Namely it only includes public items and removes extraneous collections)
   */
  get _publicItemCatalog() {
    const result = util.cloneObject(this.entity.catalog);
    // Remove scopes for non-item entity types since they are not supported by feeds
    result.scopes = { item: result.scopes.item };
    // Remove private results since feeds only deals with public content
    result.scopes.item.filters.push({
      predicates: [{
          access: 'public'
        }]
    });
    // For simplicity, only allow the "all" collection
    result.collections = result.collections.filter(collection => collection.key === 'all');
    return result;
  }
  /**
   * Returns the values for the preview functionality's item picker
   */
  get previewPickerValues() {
    return {
      previewItem: this.previewHubId
        // The gallery picker only supports item ids, so we need to strip the layer id
        ? [this.previewHubId.split('_')[0]]
        : []
    };
  }
  /**
   * Returns the entity's access url for the currently selected format and version.
   */
  get feedAccessUrl() {
    let result;
    const entityType = getTypeFromEntity.getTypeFromEntity(this.entity);
    if (entityType === 'site') {
      const { customHostname, defaultHostname } = this.entity;
      const baseUrl = `https://${customHostname || defaultHostname}/api/feed`;
      switch (this.feedFormat) {
        case 'dcat-us':
          result = `${baseUrl}/dcat-us/${this.feedVersion}.json`;
          break;
        case 'dcat-ap':
          result = `${baseUrl}/dcat-ap/${this.feedVersion}.json`;
          break;
        case 'rss':
          result = `${baseUrl}/rss/${this.feedVersion}`;
          break;
      }
    }
    return result;
  }
  /**
   * Returns whether the component is generally in a dirty state. (i.e,
   * the user has made changes to the feeds toggle OR the template editor)
   *
   * NOTE: Be very careful when relying on this property. Due to the form-
   * within-a-form nature of the template editor, it's possible that the property
   * you actually care about is `this.isTemplateEditorDirty`
   */
  get isDirty() {
    return !!this.isFeedsToggleDirty || !!this.isTemplateEditorDirty;
  }
  get shouldDisableSaveButton() {
    return (!this.isDirty ||
      this.isSaving ||
      // We only need to worry about persisting the template when the feeds toggle is enabled
      this.isFeedsToggleEnabled && this.hasInvalidJson);
  }
  /**
   * Clears the dirty state of the template editor and re-populates
   * it with the template for the given format and version.
   *
   * Will also respect the preview toggle state and attempt to preview if active.
   *
   * @param format feed format to initialize the editor with
   * @param version feed format version to initialize the editor with
   */
  initializeTemplateEditor(format, version) {
    this.isTemplateEditorDirty = false;
    this.feedFormat = format;
    this.feedVersion = version;
    try {
      this.feedTemplate = JSON.stringify(previewFeed.getFeedTemplate({
        feedsConfig: this.entity.feeds || {},
        format,
        version
      }), null, 2);
    }
    catch (err) {
      logger.Logger.error('error getting feed template', err);
      this.feedTemplate = '';
    }
    // Attempt to preview if the preview toggle is active
    this.isPreviewing && this.handlePreviewAttempt();
  }
  openCatalogConfigTab() {
    // TODO: Add telemetry
    this.arcgisHubEntityContentTabChangeRequest.emit(getEntityCatalogGroupIds.ContentPaneTabs.CATALOG_CONFIG);
  }
  openCatalogTab() {
    // TODO: Add telemetry
    this.arcgisHubEntityContentTabChangeRequest.emit(getEntityCatalogGroupIds.ContentPaneTabs.CATALOG);
  }
  handleFeedsEnabledToggle() {
    this.isFeedsToggleEnabled = !this.isFeedsToggleEnabled;
    this.isFeedsToggleDirty = true;
    this.arcgisHubWorkspaceEntityChange.emit({
      isDirty: this.isDirty,
      entity: this.entity,
    });
  }
  /**
   * Function that intercepts the feed format change event if the template editor is dirty.
   * If the editor is dirty, we prompt the user to either discard changes or cancel the transition.
   */
  handleFeedFormatChange(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const [format, version] = event.target.value.split('::');
    if (this.isTemplateEditorDirty) {
      // Setting this property will trigger the dirty state modal to appear
      this.attemptedFormatChange = {
        format: format,
        version,
        event
      };
    }
    else {
      this.initializeTemplateEditor(format, version);
    }
  }
  async handlePreviewToggle() {
    const willPreview = !this.isPreviewing;
    if (willPreview) {
      // reset the formatted preview while loading
      this.formattedPreview = null;
      // fire and forget the preview attempt
      this.handlePreviewAttempt();
    }
    this.isPreviewing = !this.isPreviewing;
  }
  /**
   * Called whenever the preview toggle is activated. If appropriate
   * conditions are met, we attempt to preview the current feed template.
   */
  async handlePreviewAttempt() {
    if (this.previewHubId && !this.hasInvalidJson) {
      try {
        this.setPreviewStatus('loading', null);
        this.formattedPreview = await previewFeed.previewFeed({
          format: this.feedFormat,
          version: this.feedVersion,
          previewTemplate: JSON.parse(this.feedTemplate),
          previewHubId: this.previewHubId,
          context: state.getGlobalContext(),
        });
        this.setPreviewStatus('success', null);
      }
      catch (err) {
        this.setPreviewStatus('error', err);
        logger.Logger.error('Error previewing feed', err);
      }
    }
  }
  setPreviewStatus(status, message) {
    this.previewStatus = { state: status, message };
  }
  /**
   * Handles the event emitted by the preview picker when the user
   * selects a new item to preview (or clears the selection entirely)
   */
  async handlePreviewItemChange(event) {
    const [newItemId] = event.detail.values.previewItem;
    // If the user clears the selection, we should clear the preview
    if (!newItemId) {
      this.previewHubId = null;
      return;
    }
    // If a new item is selected, attempt to preview it
    const currentItemId = this.previewHubId && this.previewHubId.split('_')[0];
    if (newItemId !== currentItemId) {
      // NOTE: the preview picker only gives us an item id, so we need to get the fully
      // hydrated search result to derive the correct hubId
      const additionalFilters = [{
          predicates: [{ id: newItemId }]
        }];
      const searchResult = await this.fetchPublicResultFromCatalog(additionalFilters);
      // TODO: Should we show an error state if the search fails?
      if (searchResult) {
        this.previewHubId = this.getPreviewHubId(searchResult);
        this.handlePreviewAttempt();
      }
    }
  }
  // We separate the debounced handler from the logic to allow for easier testing
  handleCodeEditorChange(event) {
    this._handleCodeEditorChange(event);
  }
  _handleCodeEditorChange(event) {
    // NOTE: the code editor emits a change event whenever this.entity changes, even if the template value
    // is exactly the same. As such, we check if the template has _actually_ changed before proceeding.
    if (event.detail !== this.feedTemplate) {
      this.feedTemplate = event.detail;
      // Mark the entity as dirty and emit the change event
      this.isTemplateEditorDirty = true;
      this.arcgisHubWorkspaceEntityChange.emit({
        isDirty: this.isDirty,
        entity: this.entity
      });
    }
  }
  /**
   * Emits telemetry for the save attempt
   * @param response the response from the save attempt
   */
  saveTelemetry(response) {
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary
      .category.content
      .action.update
      .label.feeds), {
      // either disabled or the feed format we're attempting to save
      details: this.isFeedsToggleEnabled ? this.feedFormat : index$1.dist.constants.details.DISABLED, response: response
    }));
  }
  async handleSaveFeedsClick() {
    this.setIsSaving(true);
    try {
      const entityToUpdate = util.cloneObject(this.entity);
      let configToUpdate = util.cloneObject(this.entity.feeds) || {};
      // Always update the disabled state of the feeds config
      configToUpdate.disabled = !this.isFeedsToggleEnabled;
      // Only update the template when the feeds toggle is enabled
      if (this.isFeedsToggleEnabled) {
        configToUpdate = previewFeed.setFeedTemplate({
          feedsConfig: configToUpdate,
          format: this.feedFormat,
          version: this.feedVersion,
          updatedTemplate: JSON.parse(this.feedTemplate)
        });
      }
      entityToUpdate.feeds = configToUpdate;
      // Update the entity
      const entityType = getTypeFromEntity.getTypeFromEntity(entityToUpdate);
      const updated = await updateHubEntity.updateHubEntity(entityType, entityToUpdate, state.getGlobalContext());
      // Reset dirty state and emit the change event
      this.isFeedsToggleDirty = false;
      this.isTemplateEditorDirty = false;
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: updated,
        isDirty: false,
      });
      // emit success telemetry
      this.saveTelemetry(index$1.dist.constants.response.SUCCESS);
      // Show a success notice
      // TODO: Should we abstract the notice display out to a higher component?
      state.showNotice({
        title: this.intl.t('alertMessages.success'),
        message: '',
        configuration: {
          noticeType: 'alert',
          autoClose: true,
          autoCloseDuration: 'fast',
          icon: true,
          kind: 'success',
          label: this.intl.t('formAlert')
        }
      });
    }
    catch (err) {
      logger.Logger.error('Error saving feeds', err);
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: this.entity,
        isDirty: true,
      });
      // emit failure telemetry
      this.saveTelemetry(index$1.dist.constants.response.FAILURE);
      state.showNotice({
        title: this.intl.t('alertMessages.error'),
        message: '',
        configuration: {
          noticeType: 'alert',
          autoClose: true,
          autoCloseDuration: 'fast',
          icon: true,
          kind: 'danger',
          label: this.intl.t('formAlert')
        }
      });
    }
    finally {
      this.setIsSaving(false);
    }
  }
  setIsSaving(value) {
    this.isSaving = value;
  }
  /**
   * This is a listener for the dirty state modal that is specific to the template editor.
   * When a user attempts to change the feed format while the template editor is dirty,
   * we prompt the user to either discard changes or cancel the transition. This listener
   * is responsible for handling the user's choice.
   */
  handleDirtyStateModalClosed(event) {
    // First, we prevent propagation to the root <arcgis-hub-entity-content> component
    event.preventDefault();
    event.stopImmediatePropagation();
    // true === they clicked cancel
    // false === they clicked okay
    if (event.detail) {
      this.attemptedFormatChange = null;
    }
    else {
      // user is OK w/ navigating away and losing changes;
      // re-init the template editor with the new format
      const { format, version } = this.attemptedFormatChange;
      this.initializeTemplateEditor(format, version);
      this.attemptedFormatChange = null;
      // Update parent component with the new dirty state
      this.arcgisHubWorkspaceEntityChange.emit({
        isDirty: this.isDirty,
        entity: this.entity
      });
    }
  }
  renderHeaderRow() {
    return (index.h("div", { class: "feeds-tab-title-row" }, index.h("div", { class: "enable-feeds-column" }, index.h("h3", { class: "feeds-tab-title", "data-test": "entity-content-tab-title" }, this.intl.t('tabTitle')), this.isFeedsSupported
      ? index.h("calcite-label", null, this.intl.t('enableFeedsToggle.label'), index.h("calcite-switch", { checked: this.isFeedsToggleEnabled, "data-test": "feeds-toggle", onCalciteSwitchChange: this.handleFeedsEnabledToggle }))
      : this.renderFeedsNotSupportedUi()), this.isFeedsSupported &&
      index.h("div", { class: "feeds-help-column" }, this.isFeedsToggleEnabled
        /* TODO: convert to arcgis-hub-notice */
        ? index.h("calcite-notice", { open: true, scale: "m", width: "auto" }, index.h("div", { slot: "title" }, this.intl.t('gettingStartedNotice.title')), index.h("div", { slot: "message" }, this.intl.t('gettingStartedNotice.exampleMessage')), index.h("div", { slot: "message" }, this.intl.t('gettingStartedNotice.previewMessage', {
          catalogFederationLink: (...chunks) => index.h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        })))
        : index.h("arcgis-hub-notice", { noticeId: "20241104-about-feeds-notice" }))));
  }
  renderFeedsNotSupportedUi() {
    let result;
    if (this.entity.access !== 'public') {
      // TODO: convert to arcgis-hub-notice
      result = index.h("calcite-notice", { "data-test": "is-private-notice", icon: "lightbulb", open: true }, index.h("div", { slot: "message" }, this.intl.t('enableFeedsToggle.privateNotice')));
    }
    else if (this.hasGrouplessCatalog) {
      result = index.h(index.Fragment, null, index.h("p", { "data-test": "has-groupless-catalog-message" }, this.intl.t('enableFeedsToggle.grouplessCatalog.message')), index.h("calcite-button", { appearance: "outline-fill", onClick: this.openCatalogConfigTab, round: true }, this.intl.t('enableFeedsToggle.grouplessCatalog.button')));
    }
    else if (this.hasEmptyPublicCatalog) {
      result = index.h(index.Fragment, null, index.h("p", { "data-test": "has-empty-public-catalog-message" }, this.intl.t('enableFeedsToggle.emptyPublicCatalog.message')), index.h("calcite-button", { appearance: "outline-fill", onClick: this.openCatalogTab, round: true }, this.intl.t('enableFeedsToggle.emptyPublicCatalog.button')));
    }
    return result;
  }
  renderEditorColumn() {
    return index.h("div", { class: "feeds-editor-column" }, index.h("h4", null, this.intl.t('feedsEditorSection.title')), index.h("calcite-label", null, this.intl.t('feedsEditorSection.formatSelectLabel'), index.h("calcite-select", { onCalciteSelectChange: this.handleFeedFormatChange }, this.supportedFeeds.map(feed => (index.h("calcite-option", {
      // NOTE: we need to add`this.attemptedFormatChange` to the key to force
      // a re-render when the user attempts to change the format and then cancels
      key: `${feed.format}::${feed.version}::${!!this.attemptedFormatChange}`, selected: this.feedFormat === feed.format && this.feedVersion === feed.version, value: `${feed.format}::${feed.version}`
    }, this.intl.t(`${this.getBaseFeedIntlKey(feed.format, feed.version)}.title`)))))), !!this.hasUneditableAttributes &&
      index.h("div", { class: "feeds-uneditable-attributes" }, index.h("div", null, this.intl.t('feedsEditorSection.uneditableAttributesIntro')), index.h("div", null, this.intl.t(`${this.baseFeedIntlKey}.uneditableAttributes`))), index.h("div", { class: "editing-main-container" }, index.h("div", { class: "preview-toggle-container" }, index.h("calcite-label", { layout: "inline" }, this.intl.t('feedsEditorSection.edit'), index.h("calcite-switch", { checked: this.isPreviewing, class: "preview-toggle", "data-test": "preview-toggle", onCalciteSwitchChange: this.handlePreviewToggle }), this.intl.t('feedsEditorSection.preview'))), this.isPreviewing ? this.renderPreview() : this.renderTemplateEditor()));
  }
  renderTemplateEditor() {
    return index.h(index.Fragment, null, index.h("arcgis-code-editor", { class: "feeds-code-editor", "data-test": "template-editor", "has-error": this.hasInvalidJson, language: "json", onArcgisValueChange: this.handleCodeEditorChange, value: this.feedTemplate }), this.hasInvalidJson &&
      index.h("calcite-input-message", { class: "invalid-json-editor-warning", "data-test": "invalid-json-editor-warning", icon: "x-octagon", status: "invalid" }, this.intl.t('feedsEditorSection.invalidJsonEditorWarning')));
  }
  renderPreview() {
    var _a, _b, _c;
    let result;
    if (this.hasInvalidJson) {
      // TODO: convert to arcgis-hub-notice
      result = index.h("calcite-notice", { class: "preview-notice", "data-test": "invalid-json-preview-warning", kind: "danger", open: true }, index.h("div", { slot: "message" }, this.intl.t('feedsEditorSection.invalidJsonPreviewWarning')));
    }
    else if (!this.previewHubId) {
      // TODO: convert to arcgis-hub-notice
      result = index.h("calcite-notice", { class: "preview-notice", "data-test": "no-preview-item-warning", kind: "warning", open: true }, index.h("div", { slot: "message" }, this.intl.t('feedsEditorSection.selectContentNotice')));
    }
    else if (((_a = this.previewStatus) === null || _a === void 0 ? void 0 : _a.state) === 'loading') {
      result = index.h("calcite-loader", { active: true, "data-test": "preview-loader" });
    }
    else if (((_b = this.previewStatus) === null || _b === void 0 ? void 0 : _b.state) === 'error') {
      // TODO: convert to arcgis-hub-notice
      result = index.h("calcite-notice", { class: "preview-notice", "data-test": "preview-error-notice", kind: "danger", open: true }, index.h("div", { slot: "message" }, this.intl.t('feedsEditorSection.errorPreviewingWarning')));
    }
    else if (((_c = this.previewStatus) === null || _c === void 0 ? void 0 : _c.state) === 'success') {
      result = index.h("pre", { class: "formatted-preview", "data-test": "feed-preview" }, this.formattedPreview);
    }
    return index.h("div", { class: "preview-main-container" }, result);
  }
  /**
   * Emits telemetry when the user clicks the copy button for the feed access url
   */
  handleCopyButtonClicked() {
    this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary
      .category.interaction
      .action.copy
      .label.input), { details: this.feedFormat }));
  }
  renderToolsColumn() {
    return (index.h("div", { class: "feeds-tools-column" }, index.h("h4", null, this.intl.t(`${this.baseFeedIntlKey}.title`)), this.renderFeedDescription(), index.h("h4", null, this.intl.t('toolsSection.title')), this.isPreviewing && this.renderPreviewPicker(), index.h("h5", null, this.intl.t('toolsSection.verification')), this.renderFeedVerificationLabel(), index.h("arcgis-copyable-input", { label: this.intl.t('toolsSection.copyableInputLabel'), onArcgisHubCopyButtonClicked: this.handleCopyButtonClicked, readonly: true, value: this.feedAccessUrl })));
  }
  renderPreviewPicker() {
    return index.h("arcgis-configuration-editor", { class: "preview-picker-form", onArcgisConfigurationEditorChange: this.handlePreviewItemChange, scale: "l", schema: this.previewPickerSchema, uiSchema: this.previewPickerUiSchema, values: this.previewPickerValues });
  }
  renderFeedDescription() {
    var _a;
    const descriptionI18nVariables = {
      'dcat-us': {
        '1.1': {
          dcatUsSchemaLink: (...chunks) => index.h("calcite-link", { href: "https://resources.data.gov/resources/dcat-us/", iconEnd: "launch", target: "_blank" }, chunks),
          catalogFederationLink: (...chunks) => index.h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        }
      },
      'dcat-ap': {
        '2.1.1': {
          lineBreak: () => index.h("br", null),
          dcatApSchemaLink: (...chunks) => index.h("calcite-link", { href: "https://joinup.ec.europa.eu/collection/semantic-interoperability-community-semic/solution/dcat-application-profile-data-portals-europe/about", iconEnd: "launch", target: "_blank" }, chunks),
          catalogFederationLink: (...chunks) => index.h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        }
      },
      'rss': {
        '2.0': {
          rssAboutLink: (...chunks) => index.h("calcite-link", { href: "https://validator.w3.org/feed/docs/rss2.html", iconEnd: "launch", target: "_blank" }, chunks),
          xmlSpecLink: (...chunks) => index.h("calcite-link", { href: "https://www.w3.org/TR/REC-xml/", iconEnd: "launch", target: "_blank" }, chunks),
          catalogFederationLink: (...chunks) => index.h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        }
      }
    };
    const i18nVariables = (_a = descriptionI18nVariables[this.feedFormat]) === null || _a === void 0 ? void 0 : _a[this.feedVersion];
    return index.h("div", null, this.intl.t(`${this.baseFeedIntlKey}.description`, i18nVariables));
  }
  renderFeedVerificationLabel() {
    var _a;
    const descriptionI18nVariables = {
      'dcat-us': {
        '1.1': {
          dcatUsVerificationLink: (...chunks) => index.h("calcite-link", { href: "https://catalog.data.gov/dcat-us/validator", iconEnd: "launch", target: "_blank" }, chunks),
        }
      },
      'dcat-ap': {
        '2.1.1': {
          dcatApVerificationLink: (...chunks) => index.h("calcite-link", { href: "https://www.itb.ec.europa.eu/shacl/dcat-ap/upload", iconEnd: "launch", target: "_blank" }, chunks),
        }
      },
      'rss': {
        '2.0': {
          rssVerificationLink: (...chunks) => index.h("calcite-link", { href: "https://validator.w3.org/feed/", iconEnd: "launch", target: "_blank" }, chunks),
        }
      }
    };
    const i18nVariables = (_a = descriptionI18nVariables[this.feedFormat]) === null || _a === void 0 ? void 0 : _a[this.feedVersion];
    return index.h("div", null, this.intl.t(`${this.baseFeedIntlKey}.verificationLabel`, i18nVariables));
  }
  renderDirtyStateModal() {
    if (this.attemptedFormatChange) {
      return index.h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true });
    }
  }
  renderMain() {
    return index.h(index.Fragment, null, this.renderHeaderRow(), this.isFeedsSupported && this.isFeedsToggleEnabled &&
      index.h(index.Fragment, null, index.h("div", { class: "horizontal-rule" }), index.h("section", { class: "feeds-editor-row", "data-test": "feeds-editor-section" }, this.renderEditorColumn(), this.renderToolsColumn())), this.footerSlotRef && this.isFeedsSupported &&
      index.h("arcgis-wormhole", { styles: { position: 'relative' }, target: this.footerSlotRef }, index.h("calcite-button", { disabled: this.shouldDisableSaveButton, loading: this.isSaving, onClick: this.handleSaveFeedsClick, round: true }, this.intl.t('saveButton'))), this.renderDirtyStateModal());
  }
  renderLoading() {
    return index.h("calcite-loader", { active: true, label: this.intl.t('loadingLabel') });
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-content-feeds", "data-test-ready": !this.isLoading }, this.isLoading ? this.renderLoading() : this.renderMain()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "entity": ["initializeComponent"]
  }; }
};
__decorate([
  debounce.DebounceDecoratorFactory({ timeout: 500 })
], ArcgisHubEntityContentFeeds.prototype, "handleCodeEditorChange", null);
ArcgisHubEntityContentFeeds.style = arcgisHubEntityContentFeedsCss;

exports.arcgis_hub_entity_content_catalog = ArcgisHubEntityContentCatalog;
exports.arcgis_hub_entity_content_catalog_config = ArcgisHubEntityContentCatalogConfig;
exports.arcgis_hub_entity_content_collections = ArcgisHubEntityContentCollections;
exports.arcgis_hub_entity_content_feeds = ArcgisHubEntityContentFeeds;
