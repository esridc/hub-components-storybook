var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, Host } from '@stencil/core';
import { bind } from '../../../utils/context';
import { searchGroupContent } from "@esri/arcgis-rest-portal";
import { getRequestingEntitiesQuery, camelize, getProp, poll, requestAssociation, getWellKnownAssociationsCatalog, getAvailableToRequestAssociationCatalogs, checkPermission, getTypeFromEntity, cloneObject, acceptAssociation, breakAssociation, hubSearch, setEntityAssociationGroup, fetchHubEntity, capitalize } from '@esri/hub-common';
import intlManager from "../../../utils/intl-manager";
import { getUrlState, getGlobalContext, interpolateTranslations, setGlobalContext, showNotice } from "../../../utils";
import { ASSOCIATION_TYPE, ProjectsPaneTabs, getAssociationsGalleryFacets, getRequestAssociationFacets } from './resources';
import { CONFIGURATION_VARIANTS } from '../../arcgis-configuration-editor/resources';
import { dictionary, constants } from '@esri/telemetry-dictionary-hub';
import Memoize from '../../../decorators/memoize';
const alertConfig = {
  noticeType: 'alert',
  autoClose: true,
  autoCloseDuration: 'fast',
  icon: true,
  kind: 'success',
};
export class ArcgisHubEntityProjects {
  /**
   * Pre-binds method context
   * @constructor
   */
  constructor() {
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
      this.hubTelemetry.emit(Object.assign({ label: capitalize(target.tab) }, (dictionary.category.navigation.action.onPage.label[target.tab.toLowerCase()] || dictionary.category.navigation.action.onPage)));
    };
    /** handler to request associations with the selected projects */
    this.handlePickerSelectionUpdate = async (evt) => {
      var _a;
      const { item: projectIds } = evt.detail;
      const requestTelemetry = Object.assign(Object.assign({}, dictionary.category.content.action.update.label.association), { details: `Invite ${ASSOCIATION_TYPE}`, count: projectIds.length });
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: constants.response.SUCCESS }));
      }
      catch (error) {
        // 1. trigger an alert to let the user know their request(s) failed
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message", { type: this.intl.t(ASSOCIATION_TYPE) }),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        // 2. emit failure telemetry
        this.hubTelemetry.emit(Object.assign(Object.assign({}, requestTelemetry), { response: constants.response.FAILURE }));
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
      const acceptTelemetry = Object.assign(Object.assign({}, dictionary.category.content.action.update.label.association), { details: `Add ${ASSOCIATION_TYPE}` });
      try {
        await acceptAssociation(this.entity, ASSOCIATION_TYPE, model.id, this._context);
        this.refreshGallery([model.id]);
        showNotice({
          title: this.intl.t("projects.acceptAssociation.success.title"),
          message: this.intl.t("projects.acceptAssociation.success.message", { requestor: model.title }),
          configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: constants.response.SUCCESS }));
      }
      catch (error) {
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message", { type: this.intl.t(ASSOCIATION_TYPE) }),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, acceptTelemetry), { response: constants.response.FAILURE }));
      }
    }
    // cancel outgoing request or disconnect from an existing association
    else if (action === "break") {
      const breakTelemetry = Object.assign(Object.assign({}, dictionary.category.content.action.update.label.association), { details: `${this._activeCatalogKey === "associated" ? "Remove" : "Cancel"} ${ASSOCIATION_TYPE}` });
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: constants.response.SUCCESS }));
      }
      catch (error) {
        showNotice({
          title: this.intl.t("shared.error.title"),
          message: this.intl.t("shared.error.message", { type: this.intl.t(ASSOCIATION_TYPE) }),
          configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
        });
        this.hubTelemetry.emit(Object.assign(Object.assign({}, breakTelemetry), { response: constants.response.FAILURE }));
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
  static get is() { return "arcgis-hub-entity-projects"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-projects.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-projects.css"]
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
          "text": "Hub entity"
        }
      }
    };
  }
  static get states() {
    return {
      "_entity": {},
      "_associationGroup": {},
      "_hasGroupAccess": {},
      "_activeTab": {},
      "_associationCatalogs": {},
      "_isPickerOpen": {},
      "_activeCatalogKey": {},
      "_requestingProjectsCount": {},
      "_isUserPickerOpen": {},
      "_membersCount": {},
      "_newMembersCount": {},
      "_footerSlotEl": {},
      "groupMembersSelected": {}
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
          "text": "Event to signal to the workspace that the entity has been saved"
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../utils"
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
          "text": "* Emits telemetry information"
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
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubGalleryAction",
        "method": "handleGalleryAction",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
__decorate([
  Memoize()
], ArcgisHubEntityProjects.prototype, "_associationGroupTelemetryDimensions", null);
