import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as ContentPaneTabs, g as getEntityCatalogGroupIds } from './getEntityCatalogGroupIds-e68c9867.js';
import { g as getGlobalContext, h as connectContext, d as showNotice } from './state-31a09db0.js';
import { C as CORNERS, D as DROP_SHADOWS } from './interfaces-0d0bef14.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { d as dist } from './index-dd3f99ac.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { N as getScopeGroupPredicate } from './HubInitiatives-4f4e24ce.js';
import { u as updateHubEntity } from './updateHubEntity-c9ae958c.js';
import { r as reharvestSiteCatalog, g as getFeedTemplate, p as previewFeed, s as setFeedTemplate } from './previewFeed-2389da58.js';
import { D as DebounceDecoratorFactory } from './debounce-e9be81f1.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import { g as getService } from './getService-e61b8c6e.js';
import { L as Logger } from './logger-f8667200.js';
import { s as getLayerIdFromUrl } from './compose-d5b83ab7.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './_commonjsHelpers-11ca3be1.js';
import './get-family-543fac52.js';
import './deep-set-67281c6f.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './generate-random-string-1436d9e6.js';
import './extent-34a4ba2a.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './helpers-8c7e5e31.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './get-item-home-url-b414b731.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './edit-237c0a70.js';
import './get-form-json-1d4e3591.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './edit-9f487804.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './get-structured-license-33306790.js';
import './edit-fa9666f2.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

const arcgisHubEntityContentCatalogCss = ".sc-arcgis-hub-entity-content-catalog-h{display:block}.title.sc-arcgis-hub-entity-content-catalog{display:flex;align-items:center;justify-content:space-between}h3.sc-arcgis-hub-entity-content-catalog{margin:30px 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}";

const ArcgisHubEntityContentCatalog = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubEntityContentTabChangeRequest = createEvent(this, "arcgisHubEntityContentTabChangeRequest", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.facets = undefined;
    this._context = getGlobalContext();
    this.selectedCollectionKey = undefined;
    this.showThumbnail = false;
    bind(this, 'handleCollectionSelect', 'openCatalogConfigTab');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.setFacets();
  }
  connectedCallback() {
    connectContext(this);
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
    this.arcgisHubEntityContentTabChangeRequest.emit(ContentPaneTabs.CATALOG_CONFIG);
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
    const result = cloneObject(collectionScope);
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
    return (h(Fragment, null, h("h4", null, this.intl.t('noCollections.title')), h("p", null, this.intl.t('noCollections.message')), h("calcite-button", { appearance: "outline-fill", onClick: this.openCatalogConfigTab, round: true }, this.intl.t('noCollections.button'))));
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
    return getEntityCatalogGroupIds(this.entity);
  }
  render() {
    return (h(Host, { "data-element": "entity-content-catalog" }, h("div", { class: "title" }, h("h3", null, this.intl.t('title')), h("arcgis-hub-add-content", Object.assign({}, this.addContentConfig))), this.catalogGroupIds.length
      ? h("arcgis-hub-gallery", { corners: CORNERS.round, facets: this.facets, linkTarget: "siteRelative", mobileView: this.isMobile, query: this.query, ref: (el) => { this.contentGalleryRef = el; }, shadow: DROP_SHADOWS.low, "show-back-to-top-btn": true, "show-chips": true, "show-facets": true, "show-layout-switcher": true, "show-more-results-btn": true, "show-results-count": true, "show-search": true, "show-sort": true, showThumbnail: this.showThumbnail }, h("div", { slot: "collection-select" }, h("calcite-tabs", { layout: "center", scale: "l" }, h("calcite-tab-nav", { onCalciteTabsActivate: this.handleCollectionSelect, slot: "title-group" }, this.collections.map(c => h("calcite-tab-title", { key: c.key, selected: c.key === this._selectedCollectionKey, tab: c.key }, c.label || this.intl.t(`collections.${c.key}`)))))))
      : this.renderNoCollectionsView()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityContentCatalog.style = arcgisHubEntityContentCatalogCss;

const arcgisHubEntityContentCatalogConfigCss = ":host{display:block}h3{margin:30px 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}arcgis-hub-group-list-manager{padding-bottom:0.75rem}.private-site-notice-container{max-width:20rem}.title-container{display:flex;flex-direction:row;justify-content:space-between}.reharvest-catalog-button{align-self:center;margin-inline-end:0.25rem}.reharvest-modal-body{display:flex;flex-direction:column;gap:0.5rem}section{margin-bottom:2rem;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}section h1,section h2,section h3,section h4,section h5,section h6{font-size:var(--calcite-font-size-1);margin-top:0px;margin-bottom:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}";

const ArcgisHubEntityContentCatalogConfig = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
    added && telemetryDetails.push(Object.assign(Object.assign({}, dist.dictionary
      .category.content
      .action.update
      .label.groups
      .details.addCatalogGroups), { count: updatedList.length }));
    removed && telemetryDetails.push(Object.assign(Object.assign({}, dist.dictionary
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.SUCCESS }));
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.FAILURE }));
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
      ? dist.dictionary
        .category.interaction
        .action.disable
        .label.content
        .details.hubFeeds
      : dist.dictionary
        .category.interaction
        .action.enable
        .label.content
        .details.hubFeeds;
    this.hubTelemetry.emit(telemetryDetails);
  }
  openReharvestWarningModal() {
    this.hubTelemetry.emit(Object.assign({}, dist.dictionary
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
    this.hubTelemetry.emit(Object.assign({}, dist.dictionary
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary
          .category.catalog
          .action.update
          .label.checkForErrors
          .details.reharvest), { response: dist.constants.response.FAILURE }));
      }
      if (status.groups) {
        this.triggerOperationAlert({
          title: this.intl.t('reharvestCatalogAlert.success'),
          kind: 'brand'
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary
          .category.catalog
          .action.update
          .label.checkForErrors
          .details.reharvest), { response: dist.constants.response.SUCCESS }));
      }
    }
    catch (err) {
      this.triggerOperationAlert({
        title: this.intl.t('reharvestCatalogAlert.failure'),
        kind: 'danger'
      });
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary
        .category.catalog
        .action.update
        .label.checkForErrors
        .details.reharvest), { response: dist.constants.response.FAILURE }));
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityContentCatalogConfig.style = arcgisHubEntityContentCatalogConfigCss;

const arcgisHubEntityContentCollectionsCss = ".sc-arcgis-hub-entity-content-collections-h{display:block}h3.sc-arcgis-hub-entity-content-collections{margin:30px 0;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}section.sc-arcgis-hub-entity-content-collections{margin-bottom:2rem;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}section.sc-arcgis-hub-entity-content-collections h1.sc-arcgis-hub-entity-content-collections,section.sc-arcgis-hub-entity-content-collections h2.sc-arcgis-hub-entity-content-collections,section.sc-arcgis-hub-entity-content-collections h3.sc-arcgis-hub-entity-content-collections,section.sc-arcgis-hub-entity-content-collections h4.sc-arcgis-hub-entity-content-collections,section.sc-arcgis-hub-entity-content-collections h5.sc-arcgis-hub-entity-content-collections,section.sc-arcgis-hub-entity-content-collections h6.sc-arcgis-hub-entity-content-collections{font-size:var(--calcite-font-size-1);margin-top:0px;margin-bottom:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}";

const ArcgisHubEntityContentCollections = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.entity = undefined;
    this.footerSlotRef = undefined;
    this.configurableCollections = undefined;
    this.isSaving = false;
    this.isDirty = false;
    this.saveOperationAlert = null;
    bind(this, 'translationFunction', 'saveCollectionConfiguration', 'handleConfigEditorChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    this.configurableCollections = cloneObject(collectionsWithoutAll);
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
    const toUpdate = cloneObject(this.entity);
    const collectionsToUpdated = cloneObject(this.configurableCollections);
    // Because the `All` collection is excluded from the `configurableCollections`
    // list we have to manually add it back in here
    const allCollection = toUpdate.catalog.collections.find(c => c.key === 'all');
    toUpdate.catalog.collections = allCollection ? [allCollection, ...collectionsToUpdated] : collectionsToUpdated;
    try {
      this.isSaving = true;
      const entityType = getTypeFromEntity(toUpdate);
      const updated = await updateHubEntity(entityType, toUpdate, getGlobalContext());
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
    this.saveOperationAlert = (h("calcite-alert", { autoClose: true, autoCloseDuration: "fast", icon: true, kind: kind, label: this.intl.t('formAlert'), open: true, placement: "top-end" }, h("div", { slot: "title" }, title)));
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
    return h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleConfigEditorChange, schema: this.sortableListSchema, t: this.translationFunction, uiSchema: this.sortableListUiSchema, values: { collections: this.configurableCollectionsListItems } });
  }
  render() {
    return (h(Host, { "data-element": "entity-content-collections" }, this.saveOperationAlert, h("h3", null, this.intl.t('title')), h("section", null, h("h4", null, this.intl.t('sections.collectionConfiguration.title')), this.renderListControl()), h("arcgis-wormhole", { styles: { position: 'relative' }, target: this.footerSlotRef }, h("calcite-button", { disabled: this.isSaving || !this.isDirty, loading: this.isSaving, onClick: this.saveCollectionConfiguration, round: true }, this.intl.t('saveButton')))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
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
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.arcgisHubEntityContentTabChangeRequest = createEvent(this, "arcgisHubEntityContentTabChangeRequest", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
    bind(this, 'openCatalogTab', 'openCatalogConfigTab', 'handleFeedsEnabledToggle', 'handleFeedFormatChange', 'handleCodeEditorChange', 'handlePreviewToggle', 'handlePreviewItemChange', 'handleSaveFeedsClick', 'handleCopyButtonClicked');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    this.isFeedsToggleEnabled = !getProp(this.entity, 'feeds.disabled');
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
    this.hasGrouplessCatalog = !getEntityCatalogGroupIds(this.entity).length;
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
      const query = cloneObject(this._publicItemCatalog.scopes.item);
      if (additionalFilters) {
        query.filters = query.filters.concat(additionalFilters);
      }
      const searchOptions = {
        num: 1,
        requestOptions: getGlobalContext().hubRequestOptions,
      };
      const { total: hasPublicItems, results } = await hubSearch(query, searchOptions);
      if (hasPublicItems) {
        const result = results[0];
        // NOTE: there is a bug in the enrichment process that causes the pipeline to error out
        // when attempting to fetch the service definition for non-service items. As a result,
        // We'll do it manually here for now.
        if (result.type === 'Feature Service' || result.type === 'Map Service') {
          const getServiceOptions = {
            url: result.rawResult.url,
            authentication: getGlobalContext().hubRequestOptions.authentication
          };
          result.server = await getService(getServiceOptions);
        }
        return result;
      }
    }
    catch (err) {
      Logger.error('error fetching catalog result', err);
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
    const referenceLayerId = ['Feature Service', 'Map Service'].includes(searchResult.type) && getLayerIdFromUrl(searchResult.rawResult.url);
    const hasLayers = !!getProp(searchResult, 'server.layers.length');
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
    const result = cloneObject(this.entity.catalog);
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
    const entityType = getTypeFromEntity(this.entity);
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
      this.feedTemplate = JSON.stringify(getFeedTemplate({
        feedsConfig: this.entity.feeds || {},
        format,
        version
      }), null, 2);
    }
    catch (err) {
      Logger.error('error getting feed template', err);
      this.feedTemplate = '';
    }
    // Attempt to preview if the preview toggle is active
    this.isPreviewing && this.handlePreviewAttempt();
  }
  openCatalogConfigTab() {
    // TODO: Add telemetry
    this.arcgisHubEntityContentTabChangeRequest.emit(ContentPaneTabs.CATALOG_CONFIG);
  }
  openCatalogTab() {
    // TODO: Add telemetry
    this.arcgisHubEntityContentTabChangeRequest.emit(ContentPaneTabs.CATALOG);
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
        this.formattedPreview = await previewFeed({
          format: this.feedFormat,
          version: this.feedVersion,
          previewTemplate: JSON.parse(this.feedTemplate),
          previewHubId: this.previewHubId,
          context: getGlobalContext(),
        });
        this.setPreviewStatus('success', null);
      }
      catch (err) {
        this.setPreviewStatus('error', err);
        Logger.error('Error previewing feed', err);
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary
      .category.content
      .action.update
      .label.feeds), {
      // either disabled or the feed format we're attempting to save
      details: this.isFeedsToggleEnabled ? this.feedFormat : dist.constants.details.DISABLED, response: response
    }));
  }
  async handleSaveFeedsClick() {
    this.setIsSaving(true);
    try {
      const entityToUpdate = cloneObject(this.entity);
      let configToUpdate = cloneObject(this.entity.feeds) || {};
      // Always update the disabled state of the feeds config
      configToUpdate.disabled = !this.isFeedsToggleEnabled;
      // Only update the template when the feeds toggle is enabled
      if (this.isFeedsToggleEnabled) {
        configToUpdate = setFeedTemplate({
          feedsConfig: configToUpdate,
          format: this.feedFormat,
          version: this.feedVersion,
          updatedTemplate: JSON.parse(this.feedTemplate)
        });
      }
      entityToUpdate.feeds = configToUpdate;
      // Update the entity
      const entityType = getTypeFromEntity(entityToUpdate);
      const updated = await updateHubEntity(entityType, entityToUpdate, getGlobalContext());
      // Reset dirty state and emit the change event
      this.isFeedsToggleDirty = false;
      this.isTemplateEditorDirty = false;
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: updated,
        isDirty: false,
      });
      // emit success telemetry
      this.saveTelemetry(dist.constants.response.SUCCESS);
      // Show a success notice
      // TODO: Should we abstract the notice display out to a higher component?
      showNotice({
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
      Logger.error('Error saving feeds', err);
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: this.entity,
        isDirty: true,
      });
      // emit failure telemetry
      this.saveTelemetry(dist.constants.response.FAILURE);
      showNotice({
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
    return (h("div", { class: "feeds-tab-title-row" }, h("div", { class: "enable-feeds-column" }, h("h3", { class: "feeds-tab-title", "data-test": "entity-content-tab-title" }, this.intl.t('tabTitle')), this.isFeedsSupported
      ? h("calcite-label", null, this.intl.t('enableFeedsToggle.label'), h("calcite-switch", { checked: this.isFeedsToggleEnabled, "data-test": "feeds-toggle", onCalciteSwitchChange: this.handleFeedsEnabledToggle }))
      : this.renderFeedsNotSupportedUi()), this.isFeedsSupported &&
      h("div", { class: "feeds-help-column" }, this.isFeedsToggleEnabled
        /* TODO: convert to arcgis-hub-notice */
        ? h("calcite-notice", { open: true, scale: "m", width: "auto" }, h("div", { slot: "title" }, this.intl.t('gettingStartedNotice.title')), h("div", { slot: "message" }, this.intl.t('gettingStartedNotice.exampleMessage')), h("div", { slot: "message" }, this.intl.t('gettingStartedNotice.previewMessage', {
          catalogFederationLink: (...chunks) => h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        })))
        : h("arcgis-hub-notice", { noticeId: "20241104-about-feeds-notice" }))));
  }
  renderFeedsNotSupportedUi() {
    let result;
    if (this.entity.access !== 'public') {
      // TODO: convert to arcgis-hub-notice
      result = h("calcite-notice", { "data-test": "is-private-notice", icon: "lightbulb", open: true }, h("div", { slot: "message" }, this.intl.t('enableFeedsToggle.privateNotice')));
    }
    else if (this.hasGrouplessCatalog) {
      result = h(Fragment, null, h("p", { "data-test": "has-groupless-catalog-message" }, this.intl.t('enableFeedsToggle.grouplessCatalog.message')), h("calcite-button", { appearance: "outline-fill", onClick: this.openCatalogConfigTab, round: true }, this.intl.t('enableFeedsToggle.grouplessCatalog.button')));
    }
    else if (this.hasEmptyPublicCatalog) {
      result = h(Fragment, null, h("p", { "data-test": "has-empty-public-catalog-message" }, this.intl.t('enableFeedsToggle.emptyPublicCatalog.message')), h("calcite-button", { appearance: "outline-fill", onClick: this.openCatalogTab, round: true }, this.intl.t('enableFeedsToggle.emptyPublicCatalog.button')));
    }
    return result;
  }
  renderEditorColumn() {
    return h("div", { class: "feeds-editor-column" }, h("h4", null, this.intl.t('feedsEditorSection.title')), h("calcite-label", null, this.intl.t('feedsEditorSection.formatSelectLabel'), h("calcite-select", { onCalciteSelectChange: this.handleFeedFormatChange }, this.supportedFeeds.map(feed => (h("calcite-option", {
      // NOTE: we need to add`this.attemptedFormatChange` to the key to force
      // a re-render when the user attempts to change the format and then cancels
      key: `${feed.format}::${feed.version}::${!!this.attemptedFormatChange}`, selected: this.feedFormat === feed.format && this.feedVersion === feed.version, value: `${feed.format}::${feed.version}`
    }, this.intl.t(`${this.getBaseFeedIntlKey(feed.format, feed.version)}.title`)))))), !!this.hasUneditableAttributes &&
      h("div", { class: "feeds-uneditable-attributes" }, h("div", null, this.intl.t('feedsEditorSection.uneditableAttributesIntro')), h("div", null, this.intl.t(`${this.baseFeedIntlKey}.uneditableAttributes`))), h("div", { class: "editing-main-container" }, h("div", { class: "preview-toggle-container" }, h("calcite-label", { layout: "inline" }, this.intl.t('feedsEditorSection.edit'), h("calcite-switch", { checked: this.isPreviewing, class: "preview-toggle", "data-test": "preview-toggle", onCalciteSwitchChange: this.handlePreviewToggle }), this.intl.t('feedsEditorSection.preview'))), this.isPreviewing ? this.renderPreview() : this.renderTemplateEditor()));
  }
  renderTemplateEditor() {
    return h(Fragment, null, h("arcgis-code-editor", { class: "feeds-code-editor", "data-test": "template-editor", "has-error": this.hasInvalidJson, language: "json", onArcgisValueChange: this.handleCodeEditorChange, value: this.feedTemplate }), this.hasInvalidJson &&
      h("calcite-input-message", { class: "invalid-json-editor-warning", "data-test": "invalid-json-editor-warning", icon: "x-octagon", status: "invalid" }, this.intl.t('feedsEditorSection.invalidJsonEditorWarning')));
  }
  renderPreview() {
    var _a, _b, _c;
    let result;
    if (this.hasInvalidJson) {
      // TODO: convert to arcgis-hub-notice
      result = h("calcite-notice", { class: "preview-notice", "data-test": "invalid-json-preview-warning", kind: "danger", open: true }, h("div", { slot: "message" }, this.intl.t('feedsEditorSection.invalidJsonPreviewWarning')));
    }
    else if (!this.previewHubId) {
      // TODO: convert to arcgis-hub-notice
      result = h("calcite-notice", { class: "preview-notice", "data-test": "no-preview-item-warning", kind: "warning", open: true }, h("div", { slot: "message" }, this.intl.t('feedsEditorSection.selectContentNotice')));
    }
    else if (((_a = this.previewStatus) === null || _a === void 0 ? void 0 : _a.state) === 'loading') {
      result = h("calcite-loader", { active: true, "data-test": "preview-loader" });
    }
    else if (((_b = this.previewStatus) === null || _b === void 0 ? void 0 : _b.state) === 'error') {
      // TODO: convert to arcgis-hub-notice
      result = h("calcite-notice", { class: "preview-notice", "data-test": "preview-error-notice", kind: "danger", open: true }, h("div", { slot: "message" }, this.intl.t('feedsEditorSection.errorPreviewingWarning')));
    }
    else if (((_c = this.previewStatus) === null || _c === void 0 ? void 0 : _c.state) === 'success') {
      result = h("pre", { class: "formatted-preview", "data-test": "feed-preview" }, this.formattedPreview);
    }
    return h("div", { class: "preview-main-container" }, result);
  }
  /**
   * Emits telemetry when the user clicks the copy button for the feed access url
   */
  handleCopyButtonClicked() {
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary
      .category.interaction
      .action.copy
      .label.input), { details: this.feedFormat }));
  }
  renderToolsColumn() {
    return (h("div", { class: "feeds-tools-column" }, h("h4", null, this.intl.t(`${this.baseFeedIntlKey}.title`)), this.renderFeedDescription(), h("h4", null, this.intl.t('toolsSection.title')), this.isPreviewing && this.renderPreviewPicker(), h("h5", null, this.intl.t('toolsSection.verification')), this.renderFeedVerificationLabel(), h("arcgis-copyable-input", { label: this.intl.t('toolsSection.copyableInputLabel'), onArcgisHubCopyButtonClicked: this.handleCopyButtonClicked, readonly: true, value: this.feedAccessUrl })));
  }
  renderPreviewPicker() {
    return h("arcgis-configuration-editor", { class: "preview-picker-form", onArcgisConfigurationEditorChange: this.handlePreviewItemChange, scale: "l", schema: this.previewPickerSchema, uiSchema: this.previewPickerUiSchema, values: this.previewPickerValues });
  }
  renderFeedDescription() {
    var _a;
    const descriptionI18nVariables = {
      'dcat-us': {
        '1.1': {
          dcatUsSchemaLink: (...chunks) => h("calcite-link", { href: "https://resources.data.gov/resources/dcat-us/", iconEnd: "launch", target: "_blank" }, chunks),
          catalogFederationLink: (...chunks) => h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        }
      },
      'dcat-ap': {
        '2.1.1': {
          lineBreak: () => h("br", null),
          dcatApSchemaLink: (...chunks) => h("calcite-link", { href: "https://joinup.ec.europa.eu/collection/semantic-interoperability-community-semic/solution/dcat-application-profile-data-portals-europe/about", iconEnd: "launch", target: "_blank" }, chunks),
          catalogFederationLink: (...chunks) => h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        }
      },
      'rss': {
        '2.0': {
          rssAboutLink: (...chunks) => h("calcite-link", { href: "https://validator.w3.org/feed/docs/rss2.html", iconEnd: "launch", target: "_blank" }, chunks),
          xmlSpecLink: (...chunks) => h("calcite-link", { href: "https://www.w3.org/TR/REC-xml/", iconEnd: "launch", target: "_blank" }, chunks),
          catalogFederationLink: (...chunks) => h("calcite-link", { href: "https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm", iconEnd: "launch", target: "_blank" }, chunks)
        }
      }
    };
    const i18nVariables = (_a = descriptionI18nVariables[this.feedFormat]) === null || _a === void 0 ? void 0 : _a[this.feedVersion];
    return h("div", null, this.intl.t(`${this.baseFeedIntlKey}.description`, i18nVariables));
  }
  renderFeedVerificationLabel() {
    var _a;
    const descriptionI18nVariables = {
      'dcat-us': {
        '1.1': {
          dcatUsVerificationLink: (...chunks) => h("calcite-link", { href: "https://catalog.data.gov/dcat-us/validator", iconEnd: "launch", target: "_blank" }, chunks),
        }
      },
      'dcat-ap': {
        '2.1.1': {
          dcatApVerificationLink: (...chunks) => h("calcite-link", { href: "https://www.itb.ec.europa.eu/shacl/dcat-ap/upload", iconEnd: "launch", target: "_blank" }, chunks),
        }
      },
      'rss': {
        '2.0': {
          rssVerificationLink: (...chunks) => h("calcite-link", { href: "https://validator.w3.org/feed/", iconEnd: "launch", target: "_blank" }, chunks),
        }
      }
    };
    const i18nVariables = (_a = descriptionI18nVariables[this.feedFormat]) === null || _a === void 0 ? void 0 : _a[this.feedVersion];
    return h("div", null, this.intl.t(`${this.baseFeedIntlKey}.verificationLabel`, i18nVariables));
  }
  renderDirtyStateModal() {
    if (this.attemptedFormatChange) {
      return h("arcgis-hub-workspace-dirty-state-modal", { "is-open": true });
    }
  }
  renderMain() {
    return h(Fragment, null, this.renderHeaderRow(), this.isFeedsSupported && this.isFeedsToggleEnabled &&
      h(Fragment, null, h("div", { class: "horizontal-rule" }), h("section", { class: "feeds-editor-row", "data-test": "feeds-editor-section" }, this.renderEditorColumn(), this.renderToolsColumn())), this.footerSlotRef && this.isFeedsSupported &&
      h("arcgis-wormhole", { styles: { position: 'relative' }, target: this.footerSlotRef }, h("calcite-button", { disabled: this.shouldDisableSaveButton, loading: this.isSaving, onClick: this.handleSaveFeedsClick, round: true }, this.intl.t('saveButton'))), this.renderDirtyStateModal());
  }
  renderLoading() {
    return h("calcite-loader", { active: true, label: this.intl.t('loadingLabel') });
  }
  render() {
    return (h(Host, { "data-element": "entity-content-feeds", "data-test-ready": !this.isLoading }, this.isLoading ? this.renderLoading() : this.renderMain()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "entity": ["initializeComponent"]
  }; }
};
__decorate([
  DebounceDecoratorFactory({ timeout: 500 })
], ArcgisHubEntityContentFeeds.prototype, "handleCodeEditorChange", null);
ArcgisHubEntityContentFeeds.style = arcgisHubEntityContentFeedsCss;

export { ArcgisHubEntityContentCatalog as arcgis_hub_entity_content_catalog, ArcgisHubEntityContentCatalogConfig as arcgis_hub_entity_content_catalog_config, ArcgisHubEntityContentCollections as arcgis_hub_entity_content_collections, ArcgisHubEntityContentFeeds as arcgis_hub_entity_content_feeds };
