'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const resources = require('./resources-42021303.js');
const memoize = require('./memoize-1f967971.js');
const requestAssociation = require('./requestAssociation-4b93d346.js');
const getRequestingEntitiesQuery = require('./getRequestingEntitiesQuery-f51a983a.js');
const hubSearch = require('./hubSearch-79d30702.js');
const util = require('./util-38e73510.js');
const setEntityAssociationGroup = require('./setEntityAssociationGroup-5a19cf97.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const search = require('./search-b00c4c79.js');
const poll = require('./poll-7962a495.js');
require('./index-f4a4c954.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./generate-random-string-8807d629.js');
require('./updateHubEntity-60b83b84.js');
require('./edit-3df37e35.js');
require('./tslib.es6-b6cfa7d7.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./HubInitiatives-25ecf40a.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
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
require('./edit-2b7ccc3f.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./getAssociatedEntitiesQuery-cd1656fc.js');
require('./unshare-item-with-group-05dbcf93.js');
require('./helpers-05252545.js');
require('./get-52661c13.js');
require('./share-item-with-group-6c27286f.js');
require('./update-user-membership-4af88c1c.js');
require('./merge-objects-b31af1a3.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./fetchContent-963f3885.js');
require('./getLayer-0c83b4c1.js');
require('./fetch-1292fb6b.js');

/** type of entity being associated with */
const ASSOCIATION_TYPE = "project";
/**
 * Enum defining a key for each tab. This is also
 * the value that will be emitted as the label on
 * navigation telemetry
 */
var ProjectsPaneTabs;
(function (ProjectsPaneTabs) {
  ProjectsPaneTabs["PROJECTS"] = "projects";
  ProjectsPaneTabs["MEMBERS"] = "members";
  ProjectsPaneTabs["SETTINGS"] = "settings";
})(ProjectsPaneTabs || (ProjectsPaneTabs = {}));
/**
 * Return the facets for the main associations gallery
 * @param intl - component intl
 * @returns {IFacet[]}
 */
const getAssociationsGalleryFacets = (intl) => {
  return [
    {
      label: intl.t("shared.facets.status.label"),
      key: 'status',
      operation: 'OR',
      display: 'multi-select',
      options: [
        {
          label: intl.t("shared.facets.status.notStarted"),
          key: 'notStarted',
          predicates: [{ typekeywords: 'status|notStarted' }],
          selected: false
        },
        {
          label: intl.t("shared.facets.status.inProgress"),
          key: 'inProgress',
          predicates: [{ typekeywords: 'status|inProgress' }],
          selected: false
        },
        {
          label: intl.t("shared.facets.status.onHold"),
          key: 'onHold',
          predicates: [{ typekeywords: 'status|onHold' }],
          selected: false
        },
        {
          label: intl.t("shared.facets.status.complete"),
          key: 'complete',
          predicates: [{ typekeywords: 'status|complete' }],
          selected: false
        }
      ]
    },
    {
      label: intl.t("shared.facets.tags.label"),
      key: 'tags',
      field: 'tags',
      aggLimit: 15,
      operation: 'OR',
      display: 'multi-select',
      options: []
    },
    {
      label: intl.t("shared.facets.access.label"),
      key: "access",
      display: "multi-select",
      field: "access",
      options: [],
      operation: "OR",
    }
  ];
};
/**
 * Return the facets for the request association(s)
 * gallery picker
 * @param intl - component intl
 * @returns {IFacet[]}
 */
const getRequestAssociationFacets = (intl) => {
  return getAssociationsGalleryFacets(intl).filter(facet => facet.key !== 'tags');
};

const arcgisHubEntityProjectsCss = ":host{display:block;height:100%}arcgis-hub-workspace-pane{--arcgis-configuration-form-footer-max-width:800px;--arcgis-configuration-form-footer-scalable-padding:0.5rem}calcite-tabs{width:100%;gap:0px}calcite-tabs calcite-tab.content-tab-container{overflow:visible}calcite-tab{padding-left:0.25rem;padding-right:0.25rem}.entity-projects__tab{display:flex;flex-direction:column;gap:2rem;padding-top:0.5rem}.entity-projects__description{line-height:1.375rem}.entity-projects__help-state-message{width:33.333333%}";

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
const alertConfig = {
  noticeType: 'alert',
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  kind: 'success',
};
const ArcgisHubEntityProjects = class {
  /**
   * Pre-binds method context
   * @constructor
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * Function to initialize the pane.
     *
     * 1. gets the association state (associated, pending and requesting)
     * catalogs to populate the main gallery
     * 2. gets the catalogs to populate the "request association" picker
     */
    this.init = async () => {
      var _a;
      // 1. get well-known association state catalogs to populate main gallery
      this._associationCatalogs = await Promise.all(["associated", "pending", "requesting"]
        .map(async (key) => {
        const catalog = await requestAssociation.getWellKnownAssociationsCatalog("projects.associationsGallery", key, this._entity, ASSOCIATION_TYPE, this._context);
        return interpolateTranslations.interpolateTranslations(this.intl, catalog);
      }));
      // 2. get catalogs to populate the "request association" picker
      const wellKnownCatalogs = this._isAssociationGroupManager
        // group managers can always share content - expose all sources (e.g. fallback to the default)
        ? undefined
        // group members can only share/unshare content that they own - only expose the "My content" source
        : ["myContent"];
      const catalogs = requestAssociation.getAvailableToRequestAssociationCatalogs("projects.requestAssociation", this._entity, ASSOCIATION_TYPE, this._context, wellKnownCatalogs);
      this._availableToRequestCatalogs = catalogs.map(catalog => interpolateTranslations.interpolateTranslations(this.intl, catalog));
      // 3. check if the current user has association group access
      this.setGroupAccess();
      // 4. set active tab based on query params if we have them
      const urlState = state.getUrlState("entity-projects");
      this._activeTab = urlState["tab"] || ProjectsPaneTabs.PROJECTS;
      // 5. fetch requesting projects - used to provide context in the "missing association group" state
      const query = await getRequestingEntitiesQuery.getRequestingEntitiesQuery(this._entity, ASSOCIATION_TYPE, this._context);
      const { total } = await hubSearch.hubSearch(query, { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions });
      this._requestingProjectsCount = total;
    };
    /**
     * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
     * intercept its telemetry and re-emit it from this component so
     * we don't lose the DOM context
     */
    this.handleHubTelemetry = (evt) => {
      evt.stopPropagation();
      this.hubTelemetry.emit(evt.detail);
    };
    /** handler to update the active association state catalog */
    this.handleCatalogChange = (evt) => {
      const catalogKey = evt.detail;
      this._activeCatalogKey = util.camelize(catalogKey);
    };
    /** handler to open the "request association" picker */
    this.handlePickerOpen = () => {
      this._isPickerOpen = true;
    };
    /** handler to close the "request association" picker */
    this.handlePickerClose = () => {
      this._isPickerOpen = false;
    };
    /**
     * handler that fires when a tab is clicked
     * it render the correct content for the new tab
     */
    this.handleTabActivated = (evt) => {
      const target = evt.target;
      this._activeTab = target.tab;
      this.hubTelemetry.emit(Object.assign({ label: util.capitalize(target.tab) }, (index$1.dist.dictionary.category.navigation.action.onPage.label[target.tab.toLowerCase()] || index$1.dist.dictionary.category.navigation.action.onPage)));
    };
    /** handler to request associations with the selected projects */
    this.handlePickerSelectionUpdate = async (evt) => {
      var _a;
      const { item: projectIds } = evt.detail;
      const requestTelemetry = Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.association), { details: `Invite ${ASSOCIATION_TYPE}`, count: projectIds.length });
      try {
        let alreadyRequestingCount = 0;
        // 1. create the query to get the requesting entities
        const query = await getRequestingEntitiesQuery.getRequestingEntitiesQuery(this._entity, ASSOCIATION_TYPE, this._context);
        const requestOptions = { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions };
        // 2. search for the requesting entities using the query and make an array of their ids
        const requestingEntityIds = await hubSearch.hubSearch(query, requestOptions)
          .then(response => { var _a; return (_a = response.results) === null || _a === void 0 ? void 0 : _a.map(result => result.id); }) || [];
        // 3. iterate over and request association with the selected projects
        await Promise.all(projectIds.map(async (id) => {
          // keep track of outgoing project requests that have already sent
          // a reciprocal incoming request
          requestingEntityIds.includes(id) && alreadyRequestingCount++;
          return requestAssociation.requestAssociation(this._entity, ASSOCIATION_TYPE, id, this._context);
        }));
        // 4. refresh the gallery
        this.refreshGallery(projectIds);
        // 5. trigger an alert to let the user know how many requests were sent
        const noticeConfig = alreadyRequestingCount
          ? {
            title: this.intl.t("projects.requestAssociation.alreadyRequesting.title"),
            message: this.intl.t("projects.requestAssociation.alreadyRequesting.message", { count: projectIds.length - alreadyRequestingCount }),
            configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'brand', label: this.intl.t('notice.label') })
          }
          : {
            title: this.intl.t("projects.requestAssociation.success.title"),
            message: this.intl.t("projects.requestAssociation.success.message", { count: projectIds.length }),
            configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') })
          };
        state.showNotice(noticeConfig);
        // 6. emit success telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: index$1.dist.constants.response.SUCCESS }));
      }
      catch (error) {
        // 1. trigger an alert to let the user know their request(s) failed
        state.showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message", { type: this.intl.t(ASSOCIATION_TYPE) }),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        // 2. emit failure telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: index$1.dist.constants.response.FAILURE }));
      }
    };
    /**
     * Creates an association group for the entity.
     * @param evt
     */
    this.handleAssociationGroupCreation = async (evt) => {
      const group = evt.detail;
      try {
        // 1. refresh the user on context so the user's groups
        // include the new associations group
        await this._context.refreshUser();
        state.setGlobalContext(this._context);
        // 2. set the group as the association group and get the updated entity
        const updatedEntity = await setEntityAssociationGroup.setEntityAssociationGroup(this._entity, group, this._context);
        // 3. emit a save event. This is re-emitted from the core
        // arcgis-hub-workspace component, and notifies the
        // consuming route to re-fetch the underlying entity.
        // The updated entity gets passed back down and triggers
        // a re-render
        this.arcgisHubWorkspaceEntityChange.emit({
          entity: updatedEntity,
          isDirty: false,
        });
        // 4. re-fetch the association catalogs
        await this.init();
      }
      catch (error) {
        console.error("There was an error creating the association group");
        // we tried to update the entity, but we failed, so it's still dirty
        this.arcgisHubWorkspaceEntityChange.emit({
          entity: this._entity,
          isDirty: true,
        });
      }
    };
    this.entity = undefined;
    this._entity = undefined;
    this._associationGroup = undefined;
    this._hasGroupAccess = false;
    this._activeTab = ProjectsPaneTabs.PROJECTS;
    this._associationCatalogs = undefined;
    this._isPickerOpen = undefined;
    this._activeCatalogKey = "associated";
    this._requestingProjectsCount = undefined;
    this._isUserPickerOpen = undefined;
    this._membersCount = undefined;
    this._newMembersCount = undefined;
    this._footerSlotEl = undefined;
    this.groupMembersSelected = [];
    context.bind(this, 'handleGalleryAction', "handleEditorChanged", "handleEditorSaved");
  }
  async componentWillLoad() {
    await this.loadTranslations();
    this._entity = util.cloneObject(this.entity);
    this.init();
  }
  /** loads translations */
  async loadTranslations() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /** Group id for the association group */
  get _associationGroupId() {
    return getProp.getProp(this._entity, "associations.groupId");
  }
  get _canCreateAssociationGroup() {
    return checkPermission.checkPermission("hub:initiative:workspace:associationGroup:create", this._context, this._entity).access;
  }
  /** contextual auth and portal information */
  get _context() { return state.getGlobalContext(); }
  /** gets tab configs for the pane */
  get tabConfigurations() {
    return [
      {
        title: this.intl.t('shared.tabs.projects'),
        key: ProjectsPaneTabs.PROJECTS,
        permissions: [],
        content: this.renderProjectsTab()
      },
      {
        title: this.intl.t('shared.tabs.members'),
        key: ProjectsPaneTabs.MEMBERS,
        permissions: [`hub:${this._type}:workspace:projects:member`],
        content: this.renderMembersTab()
      },
      {
        title: this.intl.t('shared.tabs.settings'),
        key: ProjectsPaneTabs.SETTINGS,
        permissions: [`hub:${this._type}:workspace:projects:manager`],
        content: this.renderSettingsTab()
      }
    ].filter(tab => {
      return tab.permissions.every(permission => checkPermission.checkPermission(permission, this._context, this.entity).access);
    });
  }
  /**
   * Callback fn to pass into the main associations gallery
   * to modify the card view models
   */
  get _associationsGalleryCallback() {
    return (model, _layout, _context, _result) => {
      const { _activeCatalogKey, _canShareContent, _isAssociationGroupManager, intl } = this;
      // 1. Filter out tags and dateCreated from additionalInfo.
      // We do this so that all cards (regardless of if they have
      // a primary action or not) will show the same meta info.
      model.additionalInfo = model.additionalInfo
        .filter(info => !["tags", "dateCreated"].includes(info.i18nKey));
      // 2. add relevant action links based on the active catalog + user privs
      const isDisabled = _isAssociationGroupManager
        ? false
        // group members can only share/unshare content that they own
        : model.source !== this._context.currentUser.username;
      const acceptAction = Object.assign({ action: 'accept', buttonStyle: 'solid', label: intl.t("projects.acceptAssociation.label"), showLabel: true, disabled: isDisabled }, (isDisabled && { tooltip: this.intl.t("shared.disabledActionTooltip", { type: this.intl.t("shared.project") }) }));
      const breakAction = Object.assign({ action: 'break', label: _activeCatalogKey === "associated"
          ? intl.t("projects.breakAssociation.label")
          : intl.t("projects.cancelRequest.label"), showLabel: true, disabled: isDisabled }, (isDisabled && {
        tooltip: _activeCatalogKey === "associated"
          ? intl.t("shared.disabledActionTooltip", { type: this.intl.t("shared.project") })
          : intl.t("shared.disabledActionTooltip", { type: this.intl.t("shared.project") })
      }));
      if (_canShareContent) {
        _activeCatalogKey === "incomingRequests"
          ? model.actionLinks = [acceptAction]
          : model.actionLinks = [{}, breakAction];
      }
      return model;
    };
  }
  get _associationGroupTelemetryDimensions() {
    var _a, _b, _c;
    return {
      groupId: (_a = this._associationGroup) === null || _a === void 0 ? void 0 : _a.id,
      groupAccess: (_b = this._associationGroup) === null || _b === void 0 ? void 0 : _b.access,
      groupType: "Association",
      groupOrgId: (_c = this._associationGroup) === null || _c === void 0 ? void 0 : _c.orgId,
    };
  }
  /** sets the user's current access state to the association group */
  async setGroupAccess() {
    let canAccessGroup = false;
    let group;
    if (this._associationGroupId) {
      try {
        // try to fetch association group -- if we can, we can access it
        group = await fetchHubEntity.fetchHubEntity("group", this._associationGroupId, this._context);
        canAccessGroup = !!group;
      }
      catch (e) {
        console.log("Error accessing association group", e);
      }
    }
    // set group and group access state
    this._hasGroupAccess = canAccessGroup;
    this._associationGroup = group;
  }
  /** user can share content to the group
   * if isViewOnly is true, then managers or members can use actions
   * otherwise, just manager
  */
  get _canShareContent() {
    let canShareContent = false;
    // if we have the group, check the permission
    if (this._associationGroup) {
      canShareContent = checkPermission.checkPermission("hub:group:shareContent", this._context, this._associationGroup).access;
    }
    return canShareContent;
  }
  /** type of entity */
  get _type() {
    return getTypeFromEntity.getTypeFromEntity(this._entity);
  }
  get _isAssociationGroupManager() {
    return this._associationGroupId && checkPermission.checkPermission(`hub:${this._type}:workspace:projects:manager`, this._context, this._entity).access;
  }
  /**
   * Fires after an action is taken in the gallery, like canceling or accepting a request.
   * @param evt
   */
  async handleGalleryAction(evt) {
    const { action, model } = evt.detail;
    // accept request
    if (action === "accept") {
      const acceptTelemetry = Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.association), { details: `Add ${ASSOCIATION_TYPE}` });
      try {
        await requestAssociation.requestAssociation(this.entity, ASSOCIATION_TYPE, model.id, this._context);
        this.refreshGallery([model.id]);
        state.showNotice({
          title: this.intl.t("projects.acceptAssociation.success.title"),
          message: this.intl.t("projects.acceptAssociation.success.message", { requestor: model.title }),
          configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: index$1.dist.constants.response.SUCCESS }));
      }
      catch (error) {
        state.showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message", { type: this.intl.t(ASSOCIATION_TYPE) }),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: index$1.dist.constants.response.FAILURE }));
      }
    }
    // cancel outgoing request or disconnect from an existing association
    else if (action === "break") {
      const breakTelemetry = Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.association), { details: `${this._activeCatalogKey === "associated" ? "Remove" : "Cancel"} ${ASSOCIATION_TYPE}` });
      try {
        await requestAssociation.breakAssociation(this.entity, ASSOCIATION_TYPE, model.id, this._context);
        this.refreshGallery([model.id], true);
        const i18nKey = this._activeCatalogKey === "associated" ? "breakAssociation" : "cancelRequest";
        const autoCloseDuration = this._activeCatalogKey === "associated" ? "slow" : "fast";
        state.showNotice({
          title: this.intl.t(`projects.${i18nKey}.success.title`),
          message: this.intl.t(`projects.${i18nKey}.success.message`),
          configuration: Object.assign(Object.assign({}, alertConfig), { autoCloseDuration, kind: this._activeCatalogKey === "associated" ? "brand" : "success", label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: index$1.dist.constants.response.SUCCESS }));
      }
      catch (error) {
        state.showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message", { type: this.intl.t(ASSOCIATION_TYPE) }),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: index$1.dist.constants.response.FAILURE }));
      }
    }
  }
  /** handles the entity-editor's onEntityChange event */
  handleEditorChanged(event) {
    // intercept and re-cast the event for parity with other panes
    event.preventDefault();
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.values,
      isDirty: true,
    });
  }
  /** handles the entity-editor's onEntitySaved event */
  handleEditorSaved(event) {
    // intercept and re-cast the event for parity with other panes
    event.preventDefault();
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: event.detail.entity,
      isDirty: !event.detail.isSuccess,
    });
  }
  /**
   * refresh the association gallery after confirming the
   * projects have been shared/unshared from the initiative's
   * association group
   * @param ids
   * @param isDissociation
   */
  async refreshGallery(ids, isDissociation) {
    const query = ids.map(id => `id:"${id}"`).join(" OR ");
    const requestFn = search.searchGroupContent.bind(undefined, {
      groupId: this._associationGroupId,
      q: `(${query})`,
      authentication: this._context.session
    });
    const expectedTotal = isDissociation ? 0 : ids.length;
    const validationFn = (resp) => (resp.total === expectedTotal);
    await poll.poll(requestFn, validationFn)
      .then(() => {
      this._catalogEl.refresh();
    });
  }
  /**
   * Renders the members tab showing the members of the group
   * and potentially allowing adding new members
   * @returns
   */
  renderMembersTab() {
    return (index.h("div", { class: "entity-projects__tab" }, index.h("arcgis-hub-group-members-manager", { groupId: this._associationGroupId })));
  }
  /**
   * Renders the settings for the association group
   */
  renderSettingsTab() {
    return (index.h("arcgis-hub-entity-editor", { editorType: `hub:${this._type}:associations`, entity: this.entity, footerSlotRef: this._footerSlotEl, include: ["associations.access AS _associations.groupAccess"], onArcgisHubEntityEditorChange: this.handleEditorChanged, onArcgisHubEntityEditorSaved: this.handleEditorSaved, variant: resources.CONFIGURATION_VARIANTS.workspace }));
  }
  /**
   * Renders the pane with all options
   * @returns
   */
  renderProjectsTab() {
    return (index.h("div", { class: "entity-projects__tab" }, index.h("span", { class: "entity-projects__description" }, this.intl.t("description")), index.h("span", { class: "entity-projects__description" }, this.intl.t("subDescription")), this._canShareContent && this.renderRequestAssociation(), this._associationCatalogs && this.renderAssociationsCatalog()));
  }
  /**
   * Renders the gallery of associations with facets.
   * @returns
   */
  renderAssociationsCatalog() {
    return index.h("arcgis-hub-catalog", { callback: this._associationsGalleryCallback, catalogs: this._associationCatalogs, facets: getAssociationsGalleryFacets(this.intl), linkTarget: "siteRelative", onArcgisHubCatalogActiveCatalogChange: this.handleCatalogChange, ref: (el) => { this._catalogEl = el; }, showSearch: true, showThumbnail: true, sourceLabel: this.intl.t("projects.associationsGallery.sources") });
  }
  /**
   * Renders the "Find projects" button and the gallery picker when the button is clicked.
   * The picker is used to request associations with projects.
   * @returns
   */
  renderRequestAssociation() {
    return (index.h("div", { class: "entity-initiatives__request-association", slot: "primary-actions" }, index.h("calcite-button", { appearance: "solid", onClick: this.handlePickerOpen, round: true }, this.intl.t('projects.requestAssociation.findProjects')), this._isPickerOpen && index.h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, index.h("arcgis-hub-gallery-picker", { catalogs: this._availableToRequestCatalogs, facets: getRequestAssociationFacets(this.intl), linkTarget: "siteRelative", modalTitle: this.intl.t('projects.requestAssociation.findProjects'), onArcgisHubGalleryPickerClose: this.handlePickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handlePickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this._isPickerOpen, primaryButtonLabel: this.intl.t('projects.requestAssociation.sendRequest'), showFacetForSingleCatalog: true, showSearch: true }))));
  }
  /**
   * When the user does not have access to the association group,
   * render a help state to inform them of the restriction.
   * @returns
   */
  renderRestrictedAccessState() {
    return (index.h("div", { class: "entity-projects__help-state" }, index.h("arcgis-hub-help-state", { heading: this.intl.t("helpStates.noAccess.heading"), icon: "projects", message: this.intl.t("helpStates.noAccess.message") })));
  }
  renderMissingAssociationGroupState() {
    const state = this._requestingProjectsCount ? "requestsWaiting" : "missingGroup";
    return (index.h("div", { class: "entity-projects__help-state" }, index.h("arcgis-hub-help-state", { heading: this.intl.t(`helpStates.${state}.heading`), icon: "projects" }, this._canCreateAssociationGroup && index.h("arcgis-hub-new-content", { "button-appearance": "solid", entityConfigs: [{
          key: 'group',
          editorType: "hub:group:create:association",
          formLabel: this.intl.t(`helpStates.${state}.formLabel`),
          label: this.intl.t(`helpStates.${state}.action`),
          description: this.intl.t(`helpStates.${state}.description`),
          icon: 'group',
          // we put these defaults here since we have to use entity info within the translation
          defaults: {
            name: `${this._entity.name} ${this.intl.t('shared.associationGroup')}`,
            summary: `${this.intl.t('createAssociationGroup.defaultSummary', { type: this._entity.type, name: this._entity.name })}`,
          }
        }], onArcgisHubNewContentSuccess: this.handleAssociationGroupCreation, slot: "actions" }), index.h("div", { class: "entity-projects__help-state-message", slot: "message" }, index.h("p", null, this.intl.t(`helpStates.${state}.message.overview`)), index.h("p", null, this.intl.t(`helpStates.${state}.message.members`)), state === "requestsWaiting" && index.h("p", null, this.intl.t(`helpStates.${state}.message.requests`, { count: this._requestingProjectsCount }))))));
  }
  renderTabs() {
    return (index.h("calcite-tabs", null, index.h("calcite-tab-nav", { onCalciteTabsActivate: this.handleTabActivated, slot: "title-group" }, this.tabConfigurations.map(config => index.h("calcite-tab-title", { key: config.key, selected: this._activeTab === config.key, tab: config.key }, config.title))), this.tabConfigurations.map(config => index.h("calcite-tab", { class: "content-tab-container", key: config.key, selected: this._activeTab === config.key, tab: config.key }, config.content))));
  }
  /**
   * Determines what to render in the pane based on the association group state and the current user.
   * @returns
   */
  renderAssociationPaneContent() {
    let content;
    // no group id created, render missing group state
    if (!this._associationGroupId) {
      content = this.renderMissingAssociationGroupState();
    }
    // does not have access to group, render restricted access state
    else if (!this._hasGroupAccess) {
      content = this.renderRestrictedAccessState();
    }
    // all checks pass, render associations pane content
    else {
      content = this.renderTabs();
    }
    return content;
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-projects" }, index.h("arcgis-hub-workspace-pane", { stickyFooter: true }, index.h("h1", { slot: "title" }, this.intl.t('projectsTitle')), this.renderAssociationPaneContent(), this._activeTab === ProjectsPaneTabs.SETTINGS &&
      index.h("div", { ref: (el) => { this._footerSlotEl = el; }, slot: "footer" }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubEntityProjects.prototype, "_associationGroupTelemetryDimensions", null);
ArcgisHubEntityProjects.style = arcgisHubEntityProjectsCss;

exports.arcgis_hub_entity_projects = ArcgisHubEntityProjects;
