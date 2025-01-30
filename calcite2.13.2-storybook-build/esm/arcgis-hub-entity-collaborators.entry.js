import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { d as dist } from './index-dd3f99ac.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext, d as showNotice, s as setGlobalContext } from './state-31a09db0.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { g as getWellKnownGroup } from './getWellKnownGroup-af6e6a2a.js';
import { g as getEntityGroups } from './getEntityGroups-8715eb41.js';
import { i as isUpdateGroup } from './is-update-group-7b9eb0ea.js';
import { u as unshareEntityWithGroups, s as shareEntityWithGroups } from './unshareEntityWithGroups-78dcc7e1.js';
import { D as updateSite } from './HubInitiatives-4f4e24ce.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './generate-random-string-1436d9e6.js';
import './store-0a6cb79f.js';
import './get-family-543fac52.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';
import './getEventGroups-a2ce236d.js';
import './events-c59246f8.js';
import './search-211dee83.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './sharedWith-3ad296b7.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './unshareEventWithGroups-2bac7a58.js';
import './poll-77a94dfa.js';
import './share-item-to-groups-547b9cd0.js';
import './share-item-with-group-5711513b.js';
import './helpers-6692d307.js';
import './get-850c466d.js';
import './get-user-f035bd36.js';
import './update-user-membership-261681cf.js';
import './unshare-item-from-groups-b09dcce3.js';
import './unshare-item-with-group-b4a3a08f.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';

const arcgisHubEntityCollaboratorsCss = ":host{display:block;height:100%}arcgis-hub-group-list-manager{margin-top:1rem}arcgis-hub-gallery{margin-top:1rem}section{margin-bottom:2rem;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}section:nth-of-type(2){margin-bottom:0px}section h1,section h2,section h3,section h4,section h5,section h6{font-size:var(--calcite-font-size-1);margin-top:0px;margin-bottom:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}";

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
const ArcgisHubEntityCollaborators = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.currentEditGroups = undefined;
    this.currentViewGroups = undefined;
    this.supportingTeams = undefined;
    bind(this, 'handleEditGroupUpdate', 'handleViewGroupUpdate', 'handleGalleryAction', 'handleGroupCreation', 'handleEditGroupCreation', 'handleViewGroupCreation', 'handleGroupCreationFailure');
  }
  async componentWillLoad() {
    // TODO: Prevent this component from render blocking
    await this.fetchExistingSharingGroups(this.entity, this._context);
    this.supportingTeams = getProp(this.entity, 'legacyTeams');
    await this.loadIntl();
  }
  async loadIntl() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get _context() { return getGlobalContext(); }
  get type() {
    return getTypeFromEntity(this.entity) || 'content';
  }
  /** Group creation Privileges */
  get canCreateEditGroups() {
    return checkPermission('hub:group:create:edit', this._context, this.entity).access;
  }
  get canCreateViewGroups() {
    return checkPermission('hub:group:create:view', this._context, this.entity).access;
  }
  /** Group creation defaults */
  get defaultEditGroup() {
    const group = cloneObject(getWellKnownGroup('hubEditGroup', this._context));
    // Need to empty string the name otherwise it falls back to a default name
    group.name = '';
    return group;
  }
  get defaultViewGroup() {
    const group = cloneObject(getWellKnownGroup('hubViewGroup', this._context));
    // Need to empty string the name otherwise it falls back to a default name
    group.name = '';
    return group;
  }
  /**
   * Fetch for a list of groups that the entity has been shared with
   * The process is:
   * - get the list of groups(IGroups) that the entity has been shared with,
   * - separate those group IDs out into edit and view groups
   * - store lists in local state
   * @param entityId
   * @param context
   */
  async fetchExistingSharingGroups(entity, context) {
    const groupsSharedWith = await getEntityGroups(entity, context);
    this.currentEditGroups = groupsSharedWith.reduce((acc, group) => {
      isUpdateGroup(group) && acc.push(group.id);
      return acc;
    }, []);
    this.currentViewGroups = groupsSharedWith.reduce((acc, group) => {
      !isUpdateGroup(group) && acc.push(group.id);
      return acc;
    }, []);
  }
  /**
   * Triggered when the "Add" button is clicked within the group list manager,
   * fetch for the group object and share the entity with the groups.
   * If any existing sharing groups have been deselected,
   * we will unshare the entity from those groups
   */
  async handleEditGroupUpdate(evt) {
    const { added, removed, updatedList: updatedGroupIds } = evt.detail;
    const telemetryDetails = [];
    added && telemetryDetails.push(dist.dictionary.category.content.action.update.label.groups.details.addEditGroups);
    removed && telemetryDetails.push(dist.dictionary.category.content.action.update.label.groups.details.removeEditGroups);
    try {
      if (removed) {
        this.entity = await unshareEntityWithGroups(this.entity, removed, this._context);
      }
      if (added) {
        this.entity = await shareEntityWithGroups(this.entity, added, this._context);
      }
      this.currentEditGroups = updatedGroupIds;
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.SUCCESS, count: (_a = this.currentEditGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: this.entity,
        isDirty: false,
      });
    }
    catch (err) {
      showNotice({
        title: this.getStringWithFallback(`${this.type}.errorMessage`, this.intl.t('content.errorMessage')),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
      console.error(err);
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.FAILURE, count: (_a = this.currentEditGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
    finally {
      // when an error occurs during sharing, the picker modal checkboxes would incorrectly reflect all of the user's
      // previous selections, when in reality, the entity was shared to a subset of those group selections or possibly none
      // of them. refetching the groups here makes sure the picker modal's checkbox states are accurate with the groups
      // the entity is actually shared with
      this.fetchExistingSharingGroups(this.entity, this._context);
    }
  }
  async handleViewGroupUpdate(evt) {
    const { added, removed, updatedList: updatedGroupIds } = evt.detail;
    const telemetryDetails = [];
    added && telemetryDetails.push(dist.dictionary.category.content.action.update.label.groups.details.addViewGroups);
    removed && telemetryDetails.push(dist.dictionary.category.content.action.update.label.groups.details.removeViewGroups);
    try {
      if (removed) {
        this.entity = await unshareEntityWithGroups(this.entity, removed, this._context);
      }
      if (added) {
        this.entity = await shareEntityWithGroups(this.entity, added, this._context);
      }
      this.currentViewGroups = updatedGroupIds;
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.SUCCESS, count: (_a = this.currentViewGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: this.entity,
        isDirty: false,
      });
    }
    catch (err) {
      showNotice({
        title: this.getStringWithFallback(`${this.type}.errorMessage`, this.intl.t('content.errorMessage')),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
      console.error(err);
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.FAILURE, count: (_a = this.currentViewGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
    finally {
      // when an error occurs during sharing, the picker modal checkboxes would incorrectly reflect all of the user's
      // previous selections, when in reality, the entity was shared to a subset of those group selections or possibly none
      // of them. refetching the groups here makes sure the picker modal's checkbox states are accurate with the groups
      // the entity is actually shared with
      this.fetchExistingSharingGroups(this.entity, this._context);
    }
  }
  /**
   * Get facets for the group picker
   */
  get facets() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const idsOfUserAdminGroups = this._context.currentUser.groups
      .reduce((acc, group) => {
      group.userMembership.memberType === 'admin' && acc.push(group.id);
      return acc;
    }, []);
    const facet = {
      label: this.intl.t("groupPicker.facet.label"),
      key: 'from',
      display: 'single-select',
      operation: 'OR',
      options: [
        {
          label: this.intl.t("groupPicker.facet.myGroups"),
          key: this.intl.t("groupPicker.facet.myGroups"),
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
          label: this.intl.t("groupPicker.facet.myOrganization"),
          key: this.intl.t("groupPicker.facet.myOrganization"),
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
        label: this.intl.t("groupPicker.facet.myCommunity"),
        key: this.intl.t("groupPicker.facet.myCommunity"),
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
    return [facet];
  }
  get createNewGroupsLink() {
    var _a;
    return `${(_a = this._context) === null || _a === void 0 ? void 0 : _a.portalUrl}/home/groups.html`;
  }
  get orgOverviewLink() {
    var _a;
    return `${(_a = this._context) === null || _a === void 0 ? void 0 : _a.portalUrl}/home/organization.html?#overview`;
  }
  /**
  * for now we'll restrict un-sharing to the entity owner. In the future,
  * we will use the permissions system to make this determination.
  */
  get isEntityOwner() {
    var _a, _b;
    return this.entity.owner === ((_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser) === null || _b === void 0 ? void 0 : _b.username);
  }
  get canShareToGroups() {
    return checkPermission('platform:portal:user:shareToGroup', this._context).access;
  }
  get canShareToEditGroups() {
    return this.canShareToGroups && this.isEntityOwner;
  }
  get canShareToViewGroups() {
    return this.canShareToGroups;
  }
  /** Returns the query for the supporting teams gallery */
  get supportingGroupsQuery() {
    return {
      targetEntity: 'group',
      filters: [
        {
          predicates: [
            {
              id: this.supportingTeams
            }
          ]
        }
      ]
    };
  }
  /** Returns the actions for the supporting teams gallery */
  get supportingTeamsActionLinks() {
    return [
      {
        action: 'unlinkTeam',
        label: this.intl.t('supportTeamsRemove'),
        icon: 'x-circle',
        showLabel: true
      }
    ];
  }
  /** Handles delegating the actions for the supporting teams gallery */
  handleGalleryAction(evt) {
    const { action, model } = evt.detail;
    if (action === 'unlinkTeam') {
      this.unlinkSupportingTeam(model);
    }
  }
  /**
   * Unlinks a supporting team from a site. This is
   * a legacy feature and will be removed in the future
   * which also explains why supporting teams are only shown for sites.
   */
  async unlinkSupportingTeam(model) {
    try {
      const entity = this.entity;
      entity.legacyTeams = this.supportingTeams.filter(id => id !== model.id);
      await updateSite(entity, this._context.hubRequestOptions);
      this.supportingTeams = entity.legacyTeams;
      showNotice({
        title: this.intl.t('supportingTeamsRemoveSuccess'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'success', label: this.intl.t('notice.label') })
      });
    }
    catch (err) {
      console.error(err);
      showNotice({
        title: this.intl.t('supportingTeamsRemoveError'),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
    }
  }
  /**
   * Return a translation string, if the path provided does not lead to
   * a valid translation, use the fallback path instead
   */
  getStringWithFallback(path, fallbackPath) {
    return this.intl.t(path, undefined, { fallback: fallbackPath });
  }
  async handleEditGroupCreation(evt) {
    this.handleGroupCreation(evt, "edit");
  }
  async handleViewGroupCreation(evt) {
    this.handleGroupCreation(evt, "view");
  }
  async handleGroupCreation(evt, groupType) {
    var _a;
    // extract ID
    let details;
    const { id } = evt.detail;
    // try to share entity with group
    try {
      // update context so group count is updated for permissions
      await this._context.refreshUser();
      setGlobalContext(this._context);
      // share entity with group, polling occurs within shareEntityWithGroups stack now
      this.entity = await shareEntityWithGroups(this.entity, [id], this._context);
      // update state
      if (groupType === "edit") {
        this.currentEditGroups = [...this.currentEditGroups, id];
        details = dist.dictionary.category.content.action.update.label.groups.details.addEditGroups;
      }
      if (groupType === "view") {
        this.currentViewGroups = [...this.currentViewGroups, id];
        details = dist.dictionary.category.content.action.update.label.groups.details.addViewGroups;
      }
      // show success alert
      this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.SUCCESS, count: (_a = this.currentViewGroups) === null || _a === void 0 ? void 0 : _a.length }));
    }
    catch (err) {
      console.error(err);
      // show error alert
      showNotice({
        title: this.getStringWithFallback(`${this.type}.errorMessage`, this.intl.t('content.errorMessage')),
        message: '',
        configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
      });
    }
  }
  handleGroupCreationFailure(evt) {
    // Log error to console
    if (evt.detail && typeof evt.detail === 'string') {
      console.error(`Error creating group: ${evt.detail}`);
    }
    // Show error alert
    showNotice({
      title: this.intl.t('groupCreateError'),
      message: '',
      configuration: Object.assign(Object.assign({}, alertConfig), { kind: 'danger', label: this.intl.t('notice.label') })
    });
  }
  renderAddNewPeopleNotice() {
    return (h("calcite-notice", { icon: 'lightbulb', kind: 'brand', open: true, width: "full" }, h("div", { slot: "title" }, this.intl.t('addNewPeopleNotice.title')), h("div", { slot: "message" }, this.intl.t('addNewPeopleNotice.message', {
      orgOverviewLink: (...str) => (h("arcgis-hub-workspace-link", { href: this.orgOverviewLink, iconEnd: 'launch', target: "_blank", telemetry: dist.dictionary.category.navigation.action.external.label.arcGisOnline.details.organization }, str))
    }))));
  }
  // Renders the supporting teams section
  // NOTE: This is supporting a legacy feature and will be removed in the future
  renderSupportingTeams() {
    const { supportingTeams, type } = this;
    // Only sites have the legacy supporting teams feature, we should only show this
    // if we have supporting teams and the entity is a site
    if (supportingTeams && supportingTeams.length && type === 'site') {
      return (h("section", null, h("h3", null, this.intl.t('supportingTeams')), h("div", null, this.intl.t('supportingTeamsDesc')), h("arcgis-hub-gallery", { cardActionLinks: this.supportingTeamsActionLinks, layout: 'list', limit: 100, linkTarget: "siteRelative", newTab: false, onArcgisHubGalleryAction: this.handleGalleryAction, query: this.supportingGroupsQuery, showEmptyState: false })));
    }
  }
  render() {
    return (h(Host, { "data-element": "entity-collaborators" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile }, h("h1", { slot: "title" }, this.intl.t("collaborators")), h("div", null, h("div", { class: 'entity-collaborators__group-sharing-container' }, h("p", null, this.getStringWithFallback(`${this.type}.description`, this.intl.t('content.description'))), h("section", null, h("h3", null, this.intl.t('editGroupsTitle')), h("div", null, this.getStringWithFallback(`${this.type}.editGroupsDescription`, this.intl.t('content.editGroupsDescription'))), h("arcgis-hub-group-list-manager", { allowAdd: this.canShareToEditGroups, allowRemove: this.isEntityOwner, class: "edit-groups-list-manager", groupIds: this.currentEditGroups, metadataMode: "members", onArcgisHubGroupListManagerChanged: this.handleEditGroupUpdate, pickerClassName: 'edit-groups-picker', pickerFacets: this.facets, pickerToggleLabel: this.intl.t("editGroupButtonText"), wellKnownPickerCatalog: "editGroups" }, this.canShareToEditGroups && h("arcgis-hub-new-content", { "button-appearance": "outline-fill", entityConfigs: [{
          key: 'group',
          editorType: "hub:group:create:edit",
          formLabel: this.intl.t('edit.formLabel'),
          description: this.intl.t('edit.description'),
          label: this.intl.t('edit.button'),
          disabled: !this.canCreateEditGroups,
          disabledTooltip: this.intl.t('groupCreateDisabledButtonTooltip'),
          defaults: Object.assign({}, this.defaultEditGroup)
        }], onArcgisHubNewContentError: this.handleGroupCreationFailure, onArcgisHubNewContentSuccess: this.handleEditGroupCreation, slot: "secondary-picker-button" }))), h("section", null, h("h3", null, this.intl.t('viewGroupsTitle')), h("div", null, this.getStringWithFallback(`${this.type}.viewGroupsDescription`, this.intl.t('content.viewGroupsDescription'))), h("arcgis-hub-group-list-manager", { allowAdd: this.canShareToViewGroups, allowRemove: this.isEntityOwner, class: "view-groups-list-manager", groupIds: this.currentViewGroups, metadataMode: "members", onArcgisHubGroupListManagerChanged: this.handleViewGroupUpdate, pickerClassName: 'view-groups-picker', pickerFacets: this.facets, pickerToggleLabel: this.intl.t("viewGroupButtonText"), wellKnownPickerCatalog: "viewGroups" }, this.canShareToViewGroups && h("arcgis-hub-new-content", { "button-appearance": "outline-fill", entityConfigs: [{
          key: 'group',
          editorType: "hub:group:create:view",
          formLabel: this.intl.t('view.formLabel'),
          description: this.intl.t('view.description'),
          label: this.intl.t('view.button'),
          disabled: !this.canCreateViewGroups,
          disabledTooltip: this.intl.t('groupCreateDisabledButtonTooltip'),
          defaults: Object.assign({}, this.defaultViewGroup)
        }], onArcgisHubNewContentError: this.handleGroupCreationFailure, onArcgisHubNewContentSuccess: this.handleViewGroupCreation, slot: "secondary-picker-button" })))), this.renderSupportingTeams()), h("div", { slot: "side-panel" }, this.renderAddNewPeopleNotice()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory('supportingTeams')
], ArcgisHubEntityCollaborators.prototype, "supportingGroupsQuery", null);
__decorate([
  MemoizeDecoratorFactory()
], ArcgisHubEntityCollaborators.prototype, "supportingTeamsActionLinks", null);
ArcgisHubEntityCollaborators.style = arcgisHubEntityCollaboratorsCss;

export { ArcgisHubEntityCollaborators as arcgis_hub_entity_collaborators };
