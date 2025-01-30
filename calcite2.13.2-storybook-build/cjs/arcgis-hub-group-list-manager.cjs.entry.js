'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const buildQueryFromGallerySelection = require('./build-query-from-gallery-selection-7db73693.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const hubSearch = require('./hubSearch-79d30702.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./util-38e73510.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
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
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./store-2a385ca0.js');

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
  if (getProp.getProp(selection, 'group.length')) {
    const query = buildQueryFromGallerySelection.buildQueryFromGallerySelection(selection, 'group');
    const hubSearchOptions = {
      requestOptions: context === null || context === void 0 ? void 0 : context.hubRequestOptions,
      include: include || []
    };
    try {
      const { results } = await hubSearch.hubSearch(query, hubSearchOptions);
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
  return (index.h("calcite-block", { description: groupDescription, heading: groupResult.name, key: groupResult.id, role: "listitem" }, index.h("calcite-avatar", { fullName: groupResult.name, scale: 'm', slot: "icon-start", thumbnail: groupResult.links.thumbnail }), children));
};
const ArcgisHubGroupListManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.groupsChangedEvent = index.createEvent(this, "arcgisHubGroupListManagerChanged", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
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
    this._context = state.getGlobalContext();
    context.bind(this, 'handleRemove', 'handlePickerOpen', 'handlePickerClose', 'handlePickerSelectionUpdate', 'handleHubTelemetry');
  }
  get pickerCatalogDefinition() {
    var _a;
    const opts = {
      user: (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser
    };
    return wellKnownCatalog.getWellKnownCatalog(null, this.wellKnownPickerCatalog, 'group', opts);
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.fetchCurrentGroups();
  }
  connectedCallback() {
    state.connectContext(this);
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
    return index.h(GroupBlock, { groupResult: group, intl: this.intl }, index.h("arcgis-hub-workspace-link", { href: `/groups/${group.id}`, relativeToOrigin: true, slot: 'actions-end', target: "_blank", telemetry: index$1.dist.dictionary.category.navigation.action.view.label.groups.details.profile }, index.h("calcite-action", { icon: 'launch', label: this.intl.t('newTab', { groupName: group.name }), text: group.name })), this.allowRemove &&
      index.h("calcite-action", { "data-group-id": group.id, icon: 'x-circle', label: this.intl.t('removeGroup', { groupName: group.name }), onClick: this.handleRemove, slot: 'actions-end', text: group.name }));
  }
  renderGroupPicker() {
    if (this.allowAdd) {
      return index.h(index.Fragment, null, index.h("div", { class: "picker-button-container" }, index.h("calcite-button", { appearance: "outline-fill", onClick: this.handlePickerOpen, round: true }, this.pickerToggleLabel || this.intl.t('pickerToggle')), index.h("slot", { name: "secondary-picker-button" })), 
      // Sigh, there is a bug in <arcgis-hub-gallery-picker> where the gallery selection remains
      // in a dirty state even after the modal is closed and re-opened. This fix mitigates that
      // by forcing `componentWillLoad()` to run.
      this.showGroupPicker &&
        index.h("arcgis-wormhole", { elAttributes: { unthemed: '' } }, index.h("arcgis-hub-gallery-picker", { catalogs: [this.pickerCatalogDefinition], class: this.pickerClassName, facets: this.pickerFacets, gallerySelection: this.currentGroupSelection, linkTarget: "siteRelative", modalTitle: this.intl.t('pickerTitle'), onArcgisHubGalleryPickerClose: this.handlePickerClose, onArcgisHubGalleryPickerSelectionUpdate: this.handlePickerSelectionUpdate, onHubTelemetry: this.handleHubTelemetry, open: this.showGroupPicker, showBadges: false, showSearch: true, showSelection: true })));
    }
  }
  renderEmptyState() {
    if (this.showEmptyState) {
      return (index.h("div", { class: "no-groups-message" }, this.intl.t('noGroups')));
    }
  }
  renderGroupList() {
    return (index.h("calcite-list", { role: "list" }, this.currentGroups.map((group) => this.renderGroup(group)), "      "));
  }
  render() {
    var _a;
    return (index.h(index.Host, null, ((_a = this.currentGroups) === null || _a === void 0 ? void 0 : _a.length)
      ? this.renderGroupList()
      : this.renderEmptyState(), this.renderGroupPicker()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "groupIds": ["fetchCurrentGroups"]
  }; }
};
ArcgisHubGroupListManager.style = arcgisHubGroupListManagerCss;

exports.arcgis_hub_group_list_manager = ArcgisHubGroupListManager;
