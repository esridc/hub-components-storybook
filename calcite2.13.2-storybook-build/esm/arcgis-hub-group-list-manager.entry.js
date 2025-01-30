import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { b as buildQueryFromGallerySelection } from './build-query-from-gallery-selection-025c80a8.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { a as getWellKnownCatalog } from './wellKnownCatalog-7e9f7f53.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './util-3e6872d9.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
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
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './store-0a6cb79f.js';

function getGallerySelection(groupIds) {
  return {
    channel: [],
    item: [],
    user: [],
    groupMember: [],
    event: [],
    group: groupIds
  };
}
/**
 * TODO: move this to more general utils, this can be used in places that
 * consume arcgis-hub-gallery-picker for groups
 * Fetch for the groups with IGallerySelection
 */
async function fetchGroupsWithGallerySelection(opts) {
  let groups = [];
  const { selection, context, include } = opts;
  if (getProp(selection, 'group.length')) {
    const query = buildQueryFromGallerySelection(selection, 'group');
    const hubSearchOptions = {
      requestOptions: context === null || context === void 0 ? void 0 : context.hubRequestOptions,
      include: include || []
    };
    try {
      const { results } = await hubSearch(query, hubSearchOptions);
      // sort the groups according to the way the selection is sorted
      // but if it is not in the array, put it at the end
      const sortByIds = selection.group;
      groups = results.slice().sort((a, b) => {
        const aIdx = sortByIds.includes(a.id) ? sortByIds.indexOf(a.id) : Infinity;
        const bIdx = sortByIds.includes(b.id) ? sortByIds.indexOf(b.id) : Infinity;
        return aIdx - bIdx;
      });
    }
    catch (err) {
      console.error(`Unable to fetch selected entities: ${err}`);
    }
  }
  return groups;
}

const arcgisHubGroupListManagerCss = ":host{display:block}.no-groups-message{font-weight:var(--calcite-font-weight-medium)}.picker-button-container{margin-top:1.75rem;display:flex;gap:0.75rem}";

/**
 * This functional component is meant to be a stop-gap for `arcgis-hub-group-list-manager`
 * until the `arcgis-hub-card` (and derivatives) support a "compact" format. Once it does,
 * `arcgis-hub-group-list-manager` should delete this functional component and use the gallery
 * for displaying selected groups instead.
 */
// TODO: move this to a separate file with other functional components so we can have a story for it
const GroupBlock = ({ groupResult, intl }, children) => {
  let groupDescription;
  if (groupResult.membershipSummary) {
    // In the members metadata mode, the description will show membership totals
    const count = groupResult.membershipSummary.total;
    if (count === 0) {
      groupDescription = intl.t('groupBlock.memberCount.noMember');
    }
    else if (count === 1) {
      groupDescription = intl.t('groupBlock.memberCount.oneMember');
    }
    else {
      groupDescription = intl.t('groupBlock.memberCount.members', { count });
    }
  }
  else {
    // In the default metadata mode, the description will be pipe-delimited key-value pairs
    const { owner, createdDate, access, userMembership } = groupResult;
    const metadataLabels = [
      owner,
      intl.t('groupBlock.dateCreated', { localizedDate: createdDate.toLocaleDateString(intl.locale) }),
      intl.t('groupBlock.sharing', { sharingLevel: intl.t(`groupBlock.sharingLevels.${access}`) }),
      intl.t('groupBlock.membership', { membershipLevel: intl.t(`groupBlock.membershipLevels.${userMembership || 'none'}`) }),
    ];
    // Reverse the display order for RTL languages
    intl.direction === 'rtl' && metadataLabels.reverse();
    groupDescription = metadataLabels.join(' | ');
  }
  return (h("calcite-block", { description: groupDescription, heading: groupResult.name, key: groupResult.id, role: "listitem" }, h("calcite-avatar", { fullName: groupResult.name, scale: 'm', slot: "icon-start", thumbnail: groupResult.links.thumbnail }), children));
};
const ArcgisHubGroupListManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.groupsChangedEvent = createEvent(this, "arcgisHubGroupListManagerChanged", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    /**
     * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
     * intercept its telemetry and re-emit it from this component so
     * we don't lose the DOM context
     */
    this.handleHubTelemetry = (evt) => {
      evt.stopPropagation();
      this.hubTelemetry.emit(evt.detail);
    };
    this.groupIds = undefined;
    this.allowAdd = undefined;
    this.allowRemove = undefined;
    this.metadataMode = 'default';
    this.wellKnownPickerCatalog = undefined;
    this.pickerFacets = undefined;
    this.pickerToggleLabel = undefined;
    this.showEmptyState = true;
    this.pickerClassName = undefined;
    this.currentGroupSelection = undefined;
    this.currentGroups = undefined;
    this.showGroupPicker = false;
    this._context = getGlobalContext();
    bind(this, 'handleRemove', 'handlePickerOpen', 'handlePickerClose', 'handlePickerSelectionUpdate', 'handleHubTelemetry');
  }
  get pickerCatalogDefinition() {
    var _a;
    const opts = {
      user: (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser
    };
    return getWellKnownCatalog(null, this.wellKnownPickerCatalog, 'group', opts);
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.fetchCurrentGroups();
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async fetchCurrentGroups() {
    const include = this.metadataMode === 'members' ? ['membershipSummary'] : ['userMembership'];
    // Convert the group IDs to IGallerySelection for ease of management and searching
    this.currentGroupSelection = getGallerySelection(this.groupIds);
    this.currentGroups = this.groupIds.length
      ? await fetchGroupsWithGallerySelection({
        selection: this.currentGroupSelection,
        context: this._context,
        include
      })
      : [];
  }
  handleRemove(event) {
    const groupId = event.target.dataset.groupId;
    const updatedList = this.groupIds.filter(g => g !== groupId);
    this.groupsChangedEvent.emit({
      updatedList,
      removed: [groupId]
    });
  }
  handlePickerOpen() {
    this.showGroupPicker = true;
  }
  handlePickerClose() {
    this.showGroupPicker = false;
  }
  handlePickerSelectionUpdate(evt) {
    const updatedList = evt.detail.group;
    const added = updatedList.filter(g => !this.groupIds.includes(g));
    const removed = this.groupIds.filter(g => !updatedList.includes(g));
    const payload = { updatedList };
    if (added.length) {
      payload.added = added;
    }
    if (removed.length) {
      payload.removed = removed;
    }
    this.groupsChangedEvent.emit(payload);
  }
  renderGroup(group) {
    return h(GroupBlock, { groupResult: group, intl: this.intl }, h("arcgis-hub-workspace-link", { href: `/groups/${group.id}`, relativeToOrigin: true, slot: 'actions-end', target: "_blank", telemetry: dist.dictionary.category.navigation.action.view.label.groups.details.profile }, h("calcite-action", { icon: 'launch', label: this.intl.t('newTab', { groupName: group.name }), text: group.name })), this.allowRemove &&
      h("calcite-action", { "data-group-id": group.id, icon: 'x-circle', label: this.intl.t('removeGroup', { groupName: group.name }), onClick: this.handleRemove, slot: 'actions-end', text: group.name }));
  }
  renderGroupPicker() {
    if (this.allowAdd) {
      return h(Fragment, null, h("div", { class: "picker-button-container" }, h("calcite-button", { appearance: "outline-fill", onClick: this.handlePickerOpen, round: true }, this.pickerToggleLabel || this.intl.t('pickerToggle')), h("slot", { name: "secondary-picker-button" })), 
      // Sigh, there is a bug in <arcgis-hub-gallery-picker> where the gallery selection remains
      // in a dirty state even after the modal is closed and re-opened. This fix mitigates that
      // by forcing `componentWillLoad()` to run.
      this.showGroupPicker &&
        h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, h("arcgis-hub-gallery-picker", { catalogs: [this.pickerCatalogDefinition], class: this.pickerClassName, facets: this.pickerFacets, gallerySelection: this.currentGroupSelection, linkTarget: "siteRelative", modalTitle: this.intl.t('pickerTitle'), onArcgisHubGalleryPickerClose: this.handlePickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handlePickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this.showGroupPicker, showBadges: false, showSearch: true, showSelection: true })));
    }
  }
  renderEmptyState() {
    if (this.showEmptyState) {
      return (h("div", { class: "no-groups-message" }, this.intl.t('noGroups')));
    }
  }
  renderGroupList() {
    return (h("calcite-list", { role: "list" }, this.currentGroups.map((group) => this.renderGroup(group)), "      "));
  }
  render() {
    var _a;
    return (h(Host, null, ((_a = this.currentGroups) === null || _a === void 0 ? void 0 : _a.length)
      ? this.renderGroupList()
      : this.renderEmptyState(), this.renderGroupPicker()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "groupIds": ["fetchCurrentGroups"]
  }; }
};
ArcgisHubGroupListManager.style = arcgisHubGroupListManagerCss;

export { ArcgisHubGroupListManager as arcgis_hub_group_list_manager };
