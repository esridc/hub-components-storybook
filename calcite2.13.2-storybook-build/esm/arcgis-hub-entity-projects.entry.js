import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { d as showNotice, s as setGlobalContext, g as getGlobalContext, f as getUrlState } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { g as getWellKnownAssociationsCatalog, a as getAvailableToRequestAssociationCatalogs, r as requestAssociation, b as breakAssociation } from './requestAssociation-74404ad8.js';
import { g as getRequestingEntitiesQuery } from './getRequestingEntitiesQuery-e8399fe2.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import { d as camelize, b as capitalize, a as cloneObject } from './util-3e6872d9.js';
import { s as setEntityAssociationGroup } from './setEntityAssociationGroup-28489bbb.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { f as fetchHubEntity } from './fetchHubEntity-28d04ab4.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { a as searchGroupContent } from './search-211dee83.js';
import { p as poll } from './poll-77a94dfa.js';
import './index-213c70d0.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './generate-random-string-1436d9e6.js';
import './updateHubEntity-c9ae958c.js';
import './edit-237c0a70.js';
import './tslib.es6-9c17e83a.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './HubInitiatives-4f4e24ce.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
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
import './edit-fa9666f2.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './getAssociatedEntitiesQuery-a2536649.js';
import './unshare-item-with-group-b4a3a08f.js';
import './helpers-6692d307.js';
import './get-850c466d.js';
import './share-item-with-group-5711513b.js';
import './update-user-membership-261681cf.js';
import './merge-objects-5b123ab3.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './fetchContent-dbc662af.js';
import './getLayer-464ff70e.js';
import './fetch-63549ae7.js';

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
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
        const catalog = await getWellKnownAssociationsCatalog("projects.associationsGallery", key, this._entity, ASSOCIATION_TYPE, this._context);
        return interpolateTranslations(this.intl, catalog);
      }));
      // 2. get catalogs to populate the "request association" picker
      const wellKnownCatalogs = this._isAssociationGroupManager
        // group managers can always share content - expose all sources (e.g. fallback to the default)
        ? undefined
        // group members can only share/unshare content that they own - only expose the "My content" source
        : ["myContent"];
      const catalogs = getAvailableToRequestAssociationCatalogs("projects.requestAssociation", this._entity, ASSOCIATION_TYPE, this._context, wellKnownCatalogs);
      this._availableToRequestCatalogs = catalogs.map(catalog => interpolateTranslations(this.intl, catalog));
      // 3. check if the current user has association group access
      this.setGroupAccess();
      // 4. set active tab based on query params if we have them
      const urlState = getUrlState("entity-projects");
      this._activeTab = urlState["tab"] || ProjectsPaneTabs.PROJECTS;
      // 5. fetch requesting projects - used to provide context in the "missing association group" state
      const query = await getRequestingEntitiesQuery(this._entity, ASSOCIATION_TYPE, this._context);
      const { total } = await hubSearch(query, { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions });
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
      this._activeCatalogKey = camelize(catalogKey);
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
      this.hubTelemetry.emit(Object.assign({ label: capitalize(target.tab) }, (dist.dictionary.category.navigation.action.onPage.label[target.tab.toLowerCase()] || dist.dictionary.category.navigation.action.onPage)));
    };
    /** handler to request associations with the selected projects */
    this.handlePickerSelectionUpdate = async (evt) => {
      var _a;
      const { item: projectIds } = evt.detail;
      const requestTelemetry = Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.association), { details: `Invite ${ASSOCIATION_TYPE}`, count: projectIds.length });
      try {
        let alreadyRequestingCount = 0;
        // 1. create the query to get the requesting entities
        const query = await getRequestingEntitiesQuery(this._entity, ASSOCIATION_TYPE, this._context);
        const requestOptions = { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions };
        // 2. search for the requesting entities using the query and make an array of their ids
        const requestingEntityIds = await hubSearch(query, requestOptions)
          .then(response => { var _a; return (_a = response.results) === null || _a === void 0 ? void 0 : _a.map(result => result.id); }) || [];
        // 3. iterate over and request association with the selected projects
        await Promise.all(projectIds.map(async (id) => {
          // keep track of outgoing project requests that have already sent
          // a reciprocal incoming request
          requestingEntityIds.includes(id) && alreadyRequestingCount++;
          return requestAssociation(this._entity, ASSOCIATION_TYPE, id, this._context);
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
        showNotice(noticeConfig);
        // 6. emit success telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: dist.constants.response.SUCCESS }));
      }
      catch (error) {
        // 1. trigger an alert to let the user know their request(s) failed
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message", { type: this.intl.t(ASSOCIATION_TYPE) }),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        // 2. emit failure telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: dist.constants.response.FAILURE }));
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
        setGlobalContext(this._context);
        // 2. set the group as the association group and get the updated entity
        const updatedEntity = await setEntityAssociationGroup(this._entity, group, this._context);
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
    bind(this, 'handleGalleryAction', "handleEditorChanged", "handleEditorSaved");
  }
  async componentWillLoad() {
    await this.loadTranslations();
    this._entity = cloneObject(this.entity);
    this.init();
  }
  /** loads translations */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /** Group id for the association group */
  get _associationGroupId() {
    return getProp(this._entity, "associations.groupId");
  }
  get _canCreateAssociationGroup() {
    return checkPermission("hub:initiative:workspace:associationGroup:create", this._context, this._entity).access;
  }
  /** contextual auth and portal information */
  get _context() { return getGlobalContext(); }
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
      return tab.permissions.every(permission => checkPermission(permission, this._context, this.entity).access);
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
        group = await fetchHubEntity("group", this._associationGroupId, this._context);
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
      canShareContent = checkPermission("hub:group:shareContent", this._context, this._associationGroup).access;
    }
    return canShareContent;
  }
  /** type of entity */
  get _type() {
    return getTypeFromEntity(this._entity);
  }
  get _isAssociationGroupManager() {
    return this._associationGroupId && checkPermission(`hub:${this._type}:workspace:projects:manager`, this._context, this._entity).access;
  }
  /**
   * Fires after an action is taken in the gallery, like canceling or accepting a request.
   * @param evt
   */
  async handleGalleryAction(evt) {
    const { action, model } = evt.detail;
    // accept request
    if (action === "accept") {
      const acceptTelemetry = Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.association), { details: `Add ${ASSOCIATION_TYPE}` });
      try {
        await requestAssociation(this.entity, ASSOCIATION_TYPE, model.id, this._context);
        this.refreshGallery([model.id]);
        showNotice({
          title: this.intl.t("projects.acceptAssociation.success.title"),
          message: this.intl.t("projects.acceptAssociation.success.message", { requestor: model.title }),
          configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: dist.constants.response.SUCCESS }));
      }
      catch (error) {
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message", { type: this.intl.t(ASSOCIATION_TYPE) }),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: dist.constants.response.FAILURE }));
      }
    }
    // cancel outgoing request or disconnect from an existing association
    else if (action === "break") {
      const breakTelemetry = Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.association), { details: `${this._activeCatalogKey === "associated" ? "Remove" : "Cancel"} ${ASSOCIATION_TYPE}` });
      try {
        await breakAssociation(this.entity, ASSOCIATION_TYPE, model.id, this._context);
        this.refreshGallery([model.id], true);
        const i18nKey = this._activeCatalogKey === "associated" ? "breakAssociation" : "cancelRequest";
        const autoCloseDuration = this._activeCatalogKey === "associated" ? "slow" : "fast";
        showNotice({
          title: this.intl.t(`projects.${i18nKey}.success.title`),
          message: this.intl.t(`projects.${i18nKey}.success.message`),
          configuration: Object.assign(Object.assign({}, alertConfig), { autoCloseDuration, kind: this._activeCatalogKey === "associated" ? "brand" : "success", label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: dist.constants.response.SUCCESS }));
      }
      catch (error) {
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message", { type: this.intl.t(ASSOCIATION_TYPE) }),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: dist.constants.response.FAILURE }));
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
    const requestFn = searchGroupContent.bind(undefined, {
      groupId: this._associationGroupId,
      q: `(${query})`,
      authentication: this._context.session
    });
    const expectedTotal = isDissociation ? 0 : ids.length;
    const validationFn = (resp) => (resp.total === expectedTotal);
    await poll(requestFn, validationFn)
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
    return (h("div", { class: "entity-projects__tab" }, h("arcgis-hub-group-members-manager", { groupId: this._associationGroupId })));
  }
  /**
   * Renders the settings for the association group
   */
  renderSettingsTab() {
    return (h("arcgis-hub-entity-editor", { editorType: `hub:${this._type}:associations`, entity: this.entity, footerSlotRef: this._footerSlotEl, include: ["associations.access AS _associations.groupAccess"], onArcgisHubEntityEditorChange: this.handleEditorChanged, onArcgisHubEntityEditorSaved: this.handleEditorSaved, variant: CONFIGURATION_VARIANTS.workspace }));
  }
  /**
   * Renders the pane with all options
   * @returns
   */
  renderProjectsTab() {
    return (h("div", { class: "entity-projects__tab" }, h("span", { class: "entity-projects__description" }, this.intl.t("description")), h("span", { class: "entity-projects__description" }, this.intl.t("subDescription")), this._canShareContent && this.renderRequestAssociation(), this._associationCatalogs && this.renderAssociationsCatalog()));
  }
  /**
   * Renders the gallery of associations with facets.
   * @returns
   */
  renderAssociationsCatalog() {
    return h("arcgis-hub-catalog", { callback: this._associationsGalleryCallback, catalogs: this._associationCatalogs, facets: getAssociationsGalleryFacets(this.intl), linkTarget: "siteRelative", onArcgisHubCatalogActiveCatalogChange: this.handleCatalogChange, ref: (el) => { this._catalogEl = el; }, showSearch: true, showThumbnail: true, sourceLabel: this.intl.t("projects.associationsGallery.sources") });
  }
  /**
   * Renders the "Find projects" button and the gallery picker when the button is clicked.
   * The picker is used to request associations with projects.
   * @returns
   */
  renderRequestAssociation() {
    return (h("div", { class: "entity-initiatives__request-association", slot: "primary-actions" }, h("calcite-button", { appearance: "solid", onClick: this.handlePickerOpen, round: true }, this.intl.t('projects.requestAssociation.findProjects')), this._isPickerOpen && h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, h("arcgis-hub-gallery-picker", { catalogs: this._availableToRequestCatalogs, facets: getRequestAssociationFacets(this.intl), linkTarget: "siteRelative", modalTitle: this.intl.t('projects.requestAssociation.findProjects'), onArcgisHubGalleryPickerClose: this.handlePickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handlePickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this._isPickerOpen, primaryButtonLabel: this.intl.t('projects.requestAssociation.sendRequest'), showFacetForSingleCatalog: true, showSearch: true }))));
  }
  /**
   * When the user does not have access to the association group,
   * render a help state to inform them of the restriction.
   * @returns
   */
  renderRestrictedAccessState() {
    return (h("div", { class: "entity-projects__help-state" }, h("arcgis-hub-help-state", { heading: this.intl.t("helpStates.noAccess.heading"), icon: "projects", message: this.intl.t("helpStates.noAccess.message") })));
  }
  renderMissingAssociationGroupState() {
    const state = this._requestingProjectsCount ? "requestsWaiting" : "missingGroup";
    return (h("div", { class: "entity-projects__help-state" }, h("arcgis-hub-help-state", { heading: this.intl.t(`helpStates.${state}.heading`), icon: "projects" }, this._canCreateAssociationGroup && h("arcgis-hub-new-content", { "button-appearance": "solid", entityConfigs: [{
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
        }], onArcgisHubNewContentSuccess: this.handleAssociationGroupCreation, slot: "actions" }), h("div", { class: "entity-projects__help-state-message", slot: "message" }, h("p", null, this.intl.t(`helpStates.${state}.message.overview`)), h("p", null, this.intl.t(`helpStates.${state}.message.members`)), state === "requestsWaiting" && h("p", null, this.intl.t(`helpStates.${state}.message.requests`, { count: this._requestingProjectsCount }))))));
  }
  renderTabs() {
    return (h("calcite-tabs", null, h("calcite-tab-nav", { onCalciteTabsActivate: this.handleTabActivated, slot: "title-group" }, this.tabConfigurations.map(config => h("calcite-tab-title", { key: config.key, selected: this._activeTab === config.key, tab: config.key }, config.title))), this.tabConfigurations.map(config => h("calcite-tab", { class: "content-tab-container", key: config.key, selected: this._activeTab === config.key, tab: config.key }, config.content))));
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
    return (h(Host, { "data-element": "entity-projects" }, h("arcgis-hub-workspace-pane", { stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('projectsTitle')), this.renderAssociationPaneContent(), this._activeTab === ProjectsPaneTabs.SETTINGS &&
      h("div", { ref: (el) => { this._footerSlotEl = el; }, slot: "footer" }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubEntityProjects.prototype, "_associationGroupTelemetryDimensions", null);
ArcgisHubEntityProjects.style = arcgisHubEntityProjectsCss;

export { ArcgisHubEntityProjects as arcgis_hub_entity_projects };
