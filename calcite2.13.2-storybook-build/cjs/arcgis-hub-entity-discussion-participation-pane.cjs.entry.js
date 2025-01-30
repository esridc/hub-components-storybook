'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const fetchChannelDetails = require('./fetch-channel-details-c2fee138.js');
const minPromiseDelay = require('./min-promise-delay-d4270b44.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
const memoize = require('./memoize-1f967971.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const urls = require('./urls-2533c98f.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const util = require('./util-38e73510.js');
const canModifyChannel = require('./can-modify-channel-0fde0aa9.js');
const utils = require('./utils-7f390376.js');
const channels = require('./channels-bf478342.js');
const hubSearch = require('./hubSearch-79d30702.js');
const getFormJson = require('./get-form-json-e6831b20.js');
const settings = require('./settings-0b8cd93b.js');
const access = require('./access-049994c9.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const get = require('./get-0368c931.js');
const isUpdateGroup = require('./is-update-group-36bf5d24.js');
const unshareItemFromGroups = require('./unshare-item-from-groups-3f34f54a.js');
const shareItemWithGroup = require('./share-item-with-group-6c27286f.js');
require('./index-f4a4c954.js');
require('./teams-d12190bc.js');
require('./cache-4d33af79.js');
require('./get-52661c13.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./append-custom-params-0f5d0fe2.js');
require('./channels-b4910298.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./get-prop-4bd8fc1a.js');
require('./helpers-64227739.js');
require('./store-2a385ca0.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./generate-random-string-8807d629.js');
require('./getTypeFromEntity-9476954e.js');
require('./logger-5db3d659.js');
require('./channel-permission-d8b16f02.js');
require('./tslib.es6-846f687c.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
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
require('./merge-objects-b31af1a3.js');
require('./search-b00c4c79.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./remove-df88a78e.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./helpers-05252545.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');
require('./unshare-item-with-group-05dbcf93.js');
require('./update-user-membership-4af88c1c.js');

const getCatalogs = (intl) => {
  return [{
      schemaVersion: 1,
      title: intl.t('channelsLabel'),
      scopes: {},
      collections: [{
          label: intl.t('channelsLabel'),
          key: 'channels',
          targetEntity: 'channel',
          scope: {
            targetEntity: 'channel',
            filters: [],
            collection: 'channel'
          },
          include: ['groups']
        }]
    }];
};
const getFacets = (intl) => {
  return [{
      label: intl.t('accessLabel'),
      key: 'access',
      display: 'multi-select',
      operation: 'OR',
      options: [
        {
          label: intl.t('optionPublicLabel'),
          key: 'public',
          selected: false,
          predicates: [{
              access: 'public'
            }]
        },
        {
          label: intl.t('optionOrganizationLabel'),
          key: 'organization',
          selected: false,
          predicates: [{
              access: 'org'
            }]
        },
        {
          label: intl.t('optionPrivateLabel'),
          key: 'private',
          selected: false,
          predicates: [{
              access: 'private'
            }]
        },
      ]
    }];
};

const arcgisHubEntityDiscussionParticipationPaneCss = "arcgis-hub-workspace-pane .entity-discussion__actions{margin-top:1rem;display:flex;gap:1.5rem;padding-bottom:0.25rem}.footer-wrapper{margin-left:auto;margin-right:auto;display:flex;max-width:var(--arcgis-configuration-form-footer-max-width);justify-content:flex-end}[slot=\"footer\"]:empty{display:none}h3,h4{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.container{margin:0.25rem;border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}.container+.container{margin-top:1.5rem}h2{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:0.25rem}h3{margin:0px}h4{margin-bottom:0px}h4+p{margin-top:0px}calcite-radio-button-group{margin-bottom:1rem}calcite-block{border-width:0px}calcite-label{--calcite-label-margin-bottom:0}arcgis-hub-help-state{margin-top:1rem}calcite-flow{margin-top:0px;margin-bottom:0px;margin-left:-0.25rem;margin-right:-0.25rem}calcite-flow-item{background-color:transparent}arcgis-hub-entity-card{display:block}calcite-notice[kind=\"brand\"]{margin-top:0.25rem}calcite-notice[kind=\"warning\"]{margin-bottom:1rem}arcgis-hub-channel-editor{margin-top:2rem}arcgis-hub-workspace-pane:has(arcgis-hub-channel-editor){--arcgis-hub-workspace-pane-max-width:69.5rem;--arcgis-configuration-form-footer-max-width:800px;--arcgis-configuration-form-footer-scalable-padding:0.5rem}";

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
const ArcgisHubEntityDiscussionParticipationPane = class {
  /**
   * Pre-binds context to methods that are passed by reference
   * @constructor
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    /**
     * Callback fn to translate card view model
     *
     * @param model - A IHubCardViewModel object
     * @returns {IHubCardViewModel}
     */
    this.channelCardCallback = (model) => {
      const result = util.cloneObject(model);
      result.additionalInfo.forEach(info => {
        if (info.i18nKey === 'access') {
          info.value = this.intl.t(info.value);
        }
        else if (info.i18nKey === 'created') {
          info.value = this.intl.formatDate(new Date(info.value), { year: 'numeric', month: 'long', day: 'numeric' });
        }
        else if (info.i18nKey === 'groups') {
          info.value = info.value
            .split(', ')
            .map(group => (group === 'groupNotFound' ? this.intl.t(group) : group))
            .join(', ');
        }
      });
      if (result.title === 'unnamed') {
        result.title = this.intl.t(result.title);
      }
      return result;
    };
    this.entity = undefined;
    this.channel = undefined;
    this.channelGroups = undefined;
    this.galleryPickerOpen = false;
    this.isLoading = false;
    this.view = 'default';
    this.channelEditorId = null;
    this.footerSlotEl = null;
    this.channelsExist = false;
    this.currentEditGroups = undefined;
    this.currentViewGroups = undefined;
    this.showRemoveChannelConfirmation = false;
    context.bind(this, 'handleNewChannelClicked', 'handleViewBackClicked', 'handleChannelEditorSaved', 'handleChannelEditorError', 'handleChannelEditorSelected', 'handleBrowseButtonClicked', 'handleHubGalleryPickerClose', 'handleHubGalleryPickerSelectionUpdate', 'createOrUpdateSettings', 'handleViewGroupUpdate', 'handleEditGroupUpdate', 'handleAccessChange', 'handleRemoveChannelCanceled', 'handleRemoveInaccessibleChannelClicked', 'handleRemoveChannelClicked');
  }
  /**
   * Component will load lifecycle method. Loads translations and dependencies
   */
  async componentWillLoad() {
    await Promise.all([
      this.loadTranslations(),
      this.fetchExistingSharingGroups(this.entity.id, this._context),
    ]);
    // do not await
    this.loadDependencies();
  }
  /**
   * Computes the card action links to be rendered by the channel card when a channel is configured,
   * or by the channel cards rendered by the gallery component
   */
  get cardActionLinks() {
    const { intl, canEditChannel } = this;
    const primaryAction = canEditChannel
      ? {
        action: 'editChannel',
        label: intl.t('editChannel'),
        showLabel: true
      }
      : {
        action: 'viewChannel',
        label: intl.t('viewChannel'),
        showLabel: true,
      };
    const actions = [
      primaryAction,
      {
        action: 'removeChannel',
        buttonStyle: 'transparent',
        icon: 'x-circle',
        label: intl.t('removeChannel'),
        showLabel: true,
      }
    ];
    return actions;
  }
  /**
   * Computes relevant warnings when the user cannot edit the selected channel
   */
  get editChannelWarningConfig() {
    let config;
    if (!this.canEditChannel) {
      config = this.channel.access === 'private'
        ? {
          title: 'privateChannelNotice.title',
          message: 'privateChannelNotice.message',
        }
        : {
          title: 'nonPrivateChannelNotice.title',
          message: 'nonPrivateChannelNotice.message',
        };
    }
    return config;
  }
  /**
   * Getter for the global IArcGISContext
   */
  get _context() {
    return state.getGlobalContext();
  }
  /**
   * Can the current user edit the channel
   */
  get canEditChannel() {
    return canModifyChannel.canModifyChannel(this.channel, this._context.currentUser);
  }
  /**
   * Computes the channel editor flow configuration, specifies the
   * appropriate header text and back action
   */
  get channelEditorFlowConfig() {
    const { view, intl, handleViewBackClicked } = this;
    let config;
    if (view === 'createChannel') {
      config = {
        heading: intl.t('headingChannelCreate'),
        action: handleViewBackClicked,
      };
    }
    else if (view === 'editChannel') {
      config = {
        heading: intl.t('headingChannelEdit'),
        action: handleViewBackClicked,
      };
    }
    else if (view === 'viewChannel') {
      config = {
        heading: intl.t('headingChannelView'),
        action: handleViewBackClicked,
      };
    }
    return config;
  }
  // not all entities have discussions, ex: user
  get discussableEntity() {
    return this.entity;
  }
  get discussionSettings() {
    var _a;
    return (_a = this.discussableEntity) === null || _a === void 0 ? void 0 : _a.discussionSettings;
  }
  get entitySettingsId() {
    var _a;
    return (_a = this.discussableEntity) === null || _a === void 0 ? void 0 : _a.entitySettingsId;
  }
  /**
   * Computes the channel help state config
   */
  get channelHelpState() {
    var _a;
    const { channelsExist, discussionSettings, handleRemoveInaccessibleChannelClicked, handleBrowseButtonClicked, handleNewChannelClicked } = this;
    let heading;
    let message;
    const actions = [];
    if ((_a = discussionSettings === null || discussionSettings === void 0 ? void 0 : discussionSettings.allowedChannelIds) === null || _a === void 0 ? void 0 : _a[0]) {
      heading = 'privateChannelTitle';
      message = 'privateChannelDescription';
      actions.push({
        onClick: handleRemoveInaccessibleChannelClicked,
        text: 'buttons.removeChannel',
        className: 'remove-channel',
      });
    }
    else {
      heading = 'addChannelsTitle';
      message = 'addChannelsDescription';
      if (channelsExist) {
        actions.push({
          onClick: handleBrowseButtonClicked,
          text: 'buttons.browse',
          className: 'browse-channels',
        });
      }
      actions.push({
        appearance: 'outline-fill',
        onClick: handleNewChannelClicked,
        text: 'buttons.new',
        className: 'new-channel',
      });
    }
    return {
      heading,
      message,
      actions,
    };
  }
  /**
   * Convert channel to search result format
   */
  get channelSearchResult() {
    return utils.channelToSearchResult(this.channel, this.channelGroups);
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Loads dependencies
   */
  loadDependencies() {
    this.isLoading = true;
    return this.fetchDependencies().then(dependencies => {
      Object.assign(this, dependencies, { isLoading: false });
    });
  }
  /**
   * Fetches dependencies, imposing a minimum 300ms delay for the promise
   * to resolve so skeleton state can be observed
   */
  async fetchDependencies() {
    var _a;
    const { discussionSettings, _context } = this;
    let channel;
    let channelGroups;
    if ((_a = discussionSettings === null || discussionSettings === void 0 ? void 0 : discussionSettings.allowedChannelIds) === null || _a === void 0 ? void 0 : _a.length) {
      ({ channel, channelGroups } = await fetchChannelDetails.fetchChannelDetails({ channelId: discussionSettings.allowedChannelIds[0] }, _context.hubRequestOptions));
    }
    else {
      channel = null;
      channelGroups = null;
    }
    const channels$1 = await channels.searchChannels(Object.assign({ data: {
        num: 1,
      } }, this._context.hubRequestOptions));
    this.channelsExist = Boolean(channels$1 === null || channels$1 === void 0 ? void 0 : channels$1.total);
    return {
      channel,
      channelGroups,
    };
  }
  formatAccess(access) {
    const { intl } = this;
    let accessString;
    if (access === utils.SharingAccess.ORG) {
      accessString = intl.t('org');
    }
    else if (access === utils.SharingAccess.PRIVATE) {
      accessString = intl.t('private');
    }
    else if (access === utils.SharingAccess.PUBLIC) {
      accessString = intl.t('public');
    }
    return accessString;
  }
  formatDate(date) {
    const { intl } = this;
    return intl.formatDate(date, { year: 'numeric', month: 'long', day: 'numeric' });
  }
  /**
   * Returns the user to the default view
   */
  handleViewBackClicked() {
    this.view = 'default';
    this.channelEditorId = null;
  }
  /**
   * Resets galleryPickerOpen to false when the gallery picker closes
   */
  handleHubGalleryPickerClose() {
    this.galleryPickerOpen = false;
  }
  /**
   * Loads channel details for the channel selected from the gallery picker
   * and updates the channel settings
   */
  async handleHubGalleryPickerSelectionUpdate(event) {
    var _a, _b;
    const channelId = (_b = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.channel) === null || _b === void 0 ? void 0 : _b[0];
    if (channelId) {
      await this.loadChannelDetails({ channelId });
      await this.createOrUpdateSettings().then(() => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.settings.details.addAllowedChannel), { channelId, channelAccess: (_a = this.channel) === null || _a === void 0 ? void 0 : _a.access }));
      });
    }
  }
  /**
   * Open the gallery picker modal to select a channel when the `Browse all channels`
   * button is clicked
   */
  handleBrowseButtonClicked() {
    this.galleryPickerOpen = true;
  }
  /**
   * Sets channelEditorId to the channel ID to edit or view and
   * sets the appropriate view
   */
  handleEditOrViewChannel(model, action) {
    this.channelEditorId = model.id;
    this.view = action;
  }
  /**
   * Handles `arcgisHubCardAction` events and delegates to the appropriate handler method.
   * We need to use `@Listen` here vs directly assigning `onArcgisHubCardAction` because we
   * need to handle this event when it's emitted from both the channel card and gallery
   * components
   */
  handleHubCardAction(event) {
    const { action, model } = event.detail;
    if (action === 'selectChannel') {
      this.handleSelectChannelClicked(model);
    }
    else if (action === 'removeChannel') {
      this.handleRemoveChannelClicked();
    }
    else if (['editChannel', 'viewChannel'].includes(action)) {
      this.handleEditOrViewChannel(model, action);
    }
    else if (action === 'viewProfile') {
      this.goToUserProfile(event.detail.model.id);
    }
  }
  /**
   * Navigates the user away from the current URL to the Hub Home user profile page
   */
  goToUserProfile(username) {
    urls.redirectToExternalUrl(hubSearch.getUserHomeUrl(username, this._context.hubRequestOptions));
  }
  /**
   * Handles `arcgisHubChannelEditorSaved` events. Loads the channel details
   * for new events & refreshes channel details after editing the set/configured event.
   * Updates settings when a new channel is created.
   */
  async handleChannelEditorSaved(evt) {
    const { channel: defaultChannel, _context } = this;
    const { channel: savedChannel, action } = evt.detail;
    const isCreate = !defaultChannel && action === 'create';
    const isEditDefaultChannel = (defaultChannel === null || defaultChannel === void 0 ? void 0 : defaultChannel.id) === savedChannel.id;
    if (isCreate) {
      evt.preventDefault();
    }
    if (isCreate || isEditDefaultChannel) {
      await this.loadChannelDetails({ channel: savedChannel });
    }
    if (isCreate) {
      this.view = 'editChannel';
      this.channelsExist = true;
      await this.createOrUpdateSettings();
    }
    else if (isEditDefaultChannel && !canModifyChannel.canModifyChannel(savedChannel, _context.currentUser)) {
      this.view = 'viewChannel';
    }
  }
  /**
   * Scrolls to the top of the workspace pane when the channel editor encounters
   * an error so the user will see the calcite-notice with `Use existing channel`
   * button when a channel cannot be created/updated due to channel access conflicts.
   */
  handleChannelEditorError() {
    if (this.workspacePaneRef) {
      this.workspacePaneRef.scrollTo({ top: 0 });
    }
  }
  /**
   * Loads channel details for the given partial channel details.
   */
  async loadChannelDetails(options) {
    const channelDetails = await fetchChannelDetails.fetchChannelDetails(options, this._context.hubRequestOptions);
    Object.assign(this, channelDetails);
  }
  /**
   * Handles `arcgisHubChannelEditorSelected` events that's emitted when a user
   * clicks the `Use existing channel` action thats' renderd when the channel editor
   * cannot create/edit a channel due to channel access conflicts. Loads channel details
   * for the selected channel and updates settings.
   */
  async handleChannelEditorSelected(evt) {
    await this.loadChannelDetails({ channel: evt.detail });
    await this.createOrUpdateSettings();
    this.view = 'default';
  }
  /**
   * Handles `arcgisHubCardAction` events emitted when the `Select`
   * action is clicked from a channel card
   */
  async handleSelectChannelClicked(model) {
    await this.loadChannelDetails({ channelId: model.id });
    await this.createOrUpdateSettings();
  }
  /**
   * Handles `arcgisHubCardAction` events emitted when the `Remove`
   * action is clicked from a channel card
   */
  async handleRemoveChannelClicked() {
    this.channel = null;
    this.channelGroups = null;
    this.showRemoveChannelConfirmation = false;
    await this.createOrUpdateSettings();
  }
  /**
   * Handles clicks to the Remove channel button that is rendered in the channel help state
   * when a channel is set, but the user doesn't have access to the channel
   */
  handleRemoveInaccessibleChannelClicked() {
    this.showRemoveChannelConfirmation = true;
  }
  /**
   * Handles clicks to the Cancel button or the close X of the remove channel confirmation modal
   */
  handleRemoveChannelCanceled() {
    this.showRemoveChannelConfirmation = false;
  }
  /**
   * Creates or updates the discussion entity settings
   */
  async createOrUpdateSettings() {
    var _a, _b;
    let alertStrings;
    const alertConfig = {
      noticeType: 'alert',
      autoClose: true,
      autoCloseDuration: 'fast',
      icon: true,
      kind: 'success'
    };
    let hasError = false;
    try {
      const defaultSettings = getFormJson.getDefaultEntitySettings('discussion');
      const settings$1 = Object.assign(Object.assign({}, defaultSettings.settings), { discussions: Object.assign(Object.assign(Object.assign({}, defaultSettings.settings.discussions), this.discussionSettings), { allowedChannelIds: ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.id) ? [this.channel.id] : null }) });
      const entitySettings = this.entitySettingsId
        ? await settings.updateSetting(Object.assign({ id: this.entity.id, data: { settings: settings$1 } }, this._context.hubRequestOptions))
        : await settings.createSetting(Object.assign({ data: {
            id: this.entity.id,
            type: defaultSettings.type,
            settings: settings$1,
          } }, this._context.hubRequestOptions));
      this.entity = Object.assign(Object.assign({}, this.entity), { entitySettingsId: entitySettings.id, discussionSettings: entitySettings.settings.discussions });
      alertStrings = ((_b = this.channel) === null || _b === void 0 ? void 0 : _b.id)
        ? { title: this.intl.t('alerts.set.title'), message: '' }
        : {
          title: this.intl.t('alerts.removed.title'),
          message: this.intl.t('alerts.removed.message'),
        };
    }
    catch (e) {
      alertConfig.kind = 'danger';
      alertStrings = {
        title: this.intl.t('alerts.error.title'),
        message: '',
      };
      hasError = true;
    }
    finally {
      state.showNotice(Object.assign(Object.assign({}, alertStrings), { configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('alerts.label') }) }));
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: this.entity,
        isDirty: hasError,
      });
    }
  }
  /**
   * Handles click events from the `New Channel` button, changes to the
   * create channel view
   */
  handleNewChannelClicked() {
    this.view = 'createChannel';
  }
  async handleAccessChange(evt) {
    const access$1 = evt.detail;
    // Note: this must be computed and stored in a variable
    // before awaiting setItemAccess because the composed path
    // isn't available after the event has finished processing
    const composedPath = evt.composedPath();
    try {
      await access.setItemAccess({
        id: this.entity.id,
        access: access$1,
        owner: this.entity.owner,
        authentication: this._context.session
      });
      this.hubTelemetry.emit({
        telemetry: Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.access.details[access$1]), { response: index$1.dist.constants.response.SUCCESS }),
        composedPath
      });
      /**
       * We can't simply set this.entity.access = evt.detail because
       * if "Owner" is selected from the modal, we can't determine
       * whether the access is "private" or "shared" without (unfortunately)
       * re-fetching the entity
       */
      this.entity = await fetchHubEntity.fetchHubEntity('discussion', this.entity.id, this._context);
      this.arcgisHubWorkspaceEntityChange.emit({ isDirty: false, entity: this.entity });
    }
    catch (error) {
      this.hubTelemetry.emit({
        telemetry: Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.update.label.access.details[access$1]), { response: index$1.dist.constants.response.FAILURE }),
        composedPath
      });
      this.arcgisHubWorkspaceEntityChange.emit({ isDirty: true, entity: this.entity });
    }
  }
  get canShareToGroups() {
    var _a, _b, _c;
    return (_c = (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser) === null || _b === void 0 ? void 0 : _b.privileges) === null || _c === void 0 ? void 0 : _c.includes("portal:user:shareToGroup");
  }
  get isEntityOwner() {
    var _a, _b;
    return this.entity.owner === ((_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser) === null || _b === void 0 ? void 0 : _b.username);
  }
  async fetchExistingSharingGroups(entityId, context) {
    const entityGroups = await get.getItemGroups(entityId, context === null || context === void 0 ? void 0 : context.requestOptions);
    const groupsSharedWith = [
      ...entityGroups.admin,
      ...entityGroups.member,
      ...entityGroups.other
    ];
    const { editGroups, viewGroups } = groupsSharedWith.reduce((acc, group) => isUpdateGroup.isUpdateGroup(group)
      ? (Object.assign(Object.assign({}, acc), { editGroups: [...acc.editGroups, group.id] }))
      : (Object.assign(Object.assign({}, acc), { viewGroups: [...acc.viewGroups, group.id] })), { editGroups: [], viewGroups: [] });
    this.currentEditGroups = editGroups;
    this.currentViewGroups = viewGroups;
  }
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
  async handleEditGroupUpdate(evt) {
    var _a;
    const { added, removed, updatedList: updatedGroupIds } = evt.detail;
    const telemetryDetails = [];
    added && telemetryDetails.push(index$1.dist.dictionary.category.content.action.update.label.groups.details.addEditGroups);
    removed && telemetryDetails.push(index$1.dist.dictionary.category.content.action.update.label.groups.details.removeEditGroups);
    try {
      if (removed) {
        const ro = { authentication: (_a = this._context) === null || _a === void 0 ? void 0 : _a.requestOptions.authentication };
        await unshareItemFromGroups.unshareItemFromGroups(this.entity.id, removed, ro);
      }
      await this.shareEntityWithGroups(this.entity, updatedGroupIds);
      this.currentEditGroups = updatedGroupIds;
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.SUCCESS, count: (_a = this.currentEditGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
    catch (err) {
      console.error(err);
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.FAILURE, count: (_a = this.currentEditGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
  }
  async handleViewGroupUpdate(evt) {
    var _a;
    const { added, removed, updatedList: updatedGroupIds } = evt.detail;
    const telemetryDetails = [];
    added && telemetryDetails.push(index$1.dist.dictionary.category.content.action.update.label.groups.details.addViewGroups);
    removed && telemetryDetails.push(index$1.dist.dictionary.category.content.action.update.label.groups.details.removeViewGroups);
    try {
      if (removed) {
        const ro = { authentication: (_a = this._context) === null || _a === void 0 ? void 0 : _a.requestOptions.authentication };
        await unshareItemFromGroups.unshareItemFromGroups(this.entity.id, removed, ro);
      }
      await this.shareEntityWithGroups(this.entity, updatedGroupIds);
      this.currentViewGroups = updatedGroupIds;
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.SUCCESS, count: (_a = this.currentViewGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
    catch (err) {
      console.error(err);
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: index$1.dist.constants.response.FAILURE, count: (_a = this.currentViewGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
  }
  async shareEntityWithGroups(entity, groupIds) {
    var _a;
    const hubSearchOptions = { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions };
    const query = {
      targetEntity: 'group',
      filters: [
        {
          predicates: [
            { id: groupIds }
          ]
        }
      ]
    };
    const { results: groups } = await hubSearch.hubSearch(query, hubSearchOptions);
    await Promise.all(groups.map(async (group) => {
      var _a;
      // Because we are using Promise.all, we need to
      // mark the callback fn as async and wrap each
      // individual call in another try/catch block to
      // make sure it catches before all promises finish
      try {
        await shareItemWithGroup.shareItemWithGroup({
          id: entity.id,
          groupId: group.id,
          owner: entity.owner,
          authentication: (_a = this._context) === null || _a === void 0 ? void 0 : _a.session,
          confirmItemControl: group.isSharedUpdate
        });
      }
      catch (err) {
        // Throw error here so functions consume this could catch it
        throw Error(`Entity: ${entity.id} could not be shared with group: ${group.id}`);
      }
    }));
  }
  /**
   * Renders the gallery picker element
   */
  renderGalleryPicker() {
    const { intl, galleryPickerOpen, handleHubGalleryPickerClose, handleHubGalleryPickerSelectionUpdate } = this;
    return (index.h("arcgis-wormhole", null, index.h("arcgis-hub-gallery-picker", { callback: this.channelCardCallback, catalogs: getCatalogs(this.intl), class: "channel-picker", facets: getFacets(this.intl), key: "channel-picker", limit: 1, linkTarget: "siteRelative", modalTitle: intl.t('galleryPickerTitle'), onArcgisHubGalleryPickerClose: handleHubGalleryPickerClose, onArcgisHubGalleryPickerSelectionUpdate: handleHubGalleryPickerSelectionUpdate, open: galleryPickerOpen, showSearch: true, showThumbnail: true })));
  }
  /**
   * Renders the channel editor in a calcite-flow-item when viewing, editing or creating
   * a new channel
   */
  renderChannelEditor() {
    const { entity, view, channelEditorId, footerSlotEl, channelEditorFlowConfig } = this;
    if (channelEditorFlowConfig) {
      return (index.h("calcite-flow-item", { heading: channelEditorFlowConfig.heading, onCalciteFlowItemBack: channelEditorFlowConfig.action }, index.h("arcgis-hub-channel-editor", { channelId: channelEditorId, disabled: view === 'viewChannel', footerSlotRef: footerSlotEl, namePrefix: entity.name, onArcgisHubChannelEditorError: this.handleChannelEditorError, onArcgisHubChannelEditorSaved: this.handleChannelEditorSaved, onArcgisHubChannelEditorSelected: this.handleChannelEditorSelected })));
    }
  }
  /**
   * Renders the default view of the component
   */
  renderDefault() {
    return (index.h("calcite-flow-item", null, this.renderWhoCanView(), this.renderWhoCanEdit(), this.renderWhoCanParticipate()));
  }
  /**
   * Renders the channel card for the configured/selected channel
   */
  renderChannelCard() {
    const { editChannelWarningConfig, intl, cardActionLinks, channelSearchResult } = this;
    return (index.h("div", null, index.h("h4", null, intl.t('channelTitle')), index.h("p", null, intl.t('channelDescription')), editChannelWarningConfig && (index.h("calcite-notice", { icon: "exclamation-mark-circle", kind: "warning", open: true, scale: "s", width: "full" }, index.h("div", { slot: "title" }, intl.t(editChannelWarningConfig.title)), index.h("div", { slot: "message" }, intl.t(editChannelWarningConfig.message)))), index.h("arcgis-hub-entity-card", { actionLinks: cardActionLinks, callback: this.channelCardCallback, searchResult: channelSearchResult, showAllAdditionalInfo: true })));
  }
  /**
   * Renders the help state for when a channel is not yet set, or one is set
   * but the user doesn't have access to it
   */
  renderChannelHelpState() {
    const { channelHelpState, intl } = this;
    // TODO: When available, use 'channels' icon
    return (index.h("div", null, index.h("arcgis-hub-help-state", { heading: intl.t(channelHelpState.heading), icon: "speech-bubbles", message: intl.t(channelHelpState.message) }, index.h("div", { class: "entity-discussion__actions", slot: "actions" }, channelHelpState.actions.map(action => (index.h("calcite-button", { appearance: action.appearance, class: action.className, key: action.text, onClick: action.onClick, round: true }, intl.t(action.text)))))), this.renderGalleryPicker(), this.renderRemoveChannelConfirmation()));
  }
  /**
   * Renders the remove confirmation modal
   */
  renderRemoveChannelConfirmation() {
    const { intl, showRemoveChannelConfirmation, handleRemoveChannelCanceled, handleRemoveChannelClicked } = this;
    return (index.h("calcite-modal", { "aria-labelledby": "modal-title", id: "example-modal", kind: "danger", onCalciteModalClose: handleRemoveChannelCanceled, open: showRemoveChannelConfirmation, width: "s" }, index.h("div", { id: "modal-title", slot: "header" }, intl.t('buttons.removeChannel')), index.h("p", { slot: "content" }, intl.t('removeChannelConfirmationMessage')), index.h("calcite-button", { appearance: "outline-fill", kind: "brand", onClick: handleRemoveChannelCanceled, round: true, slot: "secondary", width: "full" }, intl.t('buttons.cancel')), index.h("calcite-button", { kind: "danger", onClick: handleRemoveChannelClicked, round: true, slot: "primary", width: "full" }, intl.t('buttons.removeChannel'))));
  }
  /**
   * Renders the footer div that the save button will be rendered into
   */
  renderFooter() {
    if (['createChannel', 'editChannel'].includes(this.view)) {
      return (index.h("div", { ref: el => {
          this.footerSlotEl = el;
        }, slot: "footer" }));
    }
  }
  renderWhoCanView() {
    var _a, _b;
    return (index.h("div", { class: "container" }, index.h("h3", null, this.intl.t('viewGroups.header')), index.h("p", null, this.intl.t('viewGroups.description')), index.h("arcgis-hub-access-level-controls", { accessLevel: this.entity.access === 'shared' ? 'private' : this.entity.access, itemType: "discussion", onArcgisHubItemAccessLevelChange: this.handleAccessChange, orgName: (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.name }), index.h("arcgis-hub-group-list-manager", { allowAdd: this.canShareToGroups, allowRemove: this.isEntityOwner, class: "view-groups-manager", groupIds: this.currentViewGroups, metadataMode: "members", onArcgisHubGroupListManagerChanged: this.handleViewGroupUpdate, pickerClassName: "view-groups-picker", pickerFacets: this.facets, pickerToggleLabel: this.intl.t("viewGroupButtonText"), showEmptyState: false, wellKnownPickerCatalog: "viewGroups" })));
  }
  renderWhoCanEdit() {
    return (index.h("div", { class: "container" }, index.h("h3", null, this.intl.t('editGroups.header')), index.h("p", null, this.intl.t('editGroups.description')), index.h("arcgis-hub-group-list-manager", { allowAdd: this.canShareToGroups && this.isEntityOwner, allowRemove: this.isEntityOwner, class: "edit-groups-manager", groupIds: this.currentEditGroups, metadataMode: "members", onArcgisHubGroupListManagerChanged: this.handleEditGroupUpdate, pickerClassName: "edit-groups-picker", pickerFacets: this.facets, pickerToggleLabel: this.intl.t("editGroupButtonText"), showEmptyState: false, wellKnownPickerCatalog: "editGroups" })));
  }
  renderWhoCanParticipate() {
    return (index.h("div", { class: "container" }, index.h("h3", null, this.intl.t('participate.header')), this.channel ? this.renderChannelCard() : this.renderChannelHelpState()));
  }
  renderHeader() {
    if (!this.channelEditorFlowConfig) {
      return (index.h(index.Fragment, null, index.h("h1", { slot: "title" }, this.intl.t('title')), index.h("p", { slot: "subtitle" }, this.intl.t('subtitle'))));
    }
  }
  renderSidePanel() {
    if (!this.channelEditorFlowConfig) {
      return (index.h("div", { slot: "side-panel" }, index.h("calcite-notice", { icon: "lightbulb", kind: "brand", open: true, scale: "m", width: "full" }, index.h("div", { slot: "title" }, this.intl.t('aboutChannelsNotice.title')), index.h("div", { slot: "message" }, this.intl.t('aboutChannelsNotice.message')), index.h("calcite-link", { href: "https://www.esri.com/arcgis-blog/products/arcgis-hub/announcements/what-are-channels/", iconEnd: "launch", slot: "link" }, this.intl.t('aboutChannelsNotice.action')))));
    }
  }
  renderPane() {
    return (index.h(index.Fragment, null, this.renderHeader(), index.h("div", null, index.h("calcite-flow", null, this.renderDefault(), this.renderChannelEditor())), this.renderFooter(), this.renderSidePanel()));
  }
  /**
   * Renders skeleton state
   */
  renderSkeleton() {
    // TODO: enhancement
    return null;
  }
  /**
   * Primary render method
   */
  render() {
    return (index.h(index.Host, { "data-element": "entity-discussion" }, index.h("arcgis-hub-workspace-pane", { ref: (el) => {
        this.workspacePaneRef = el;
      }, showHeader: !this.isLoading && !this.channelEditorFlowConfig, stickyFooter: true }, this.isLoading ? this.renderSkeleton() : this.renderPane())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory('channel', 'channelGroups')
], ArcgisHubEntityDiscussionParticipationPane.prototype, "channelSearchResult", null);
__decorate([
  minPromiseDelay.minPromiseDelayFactory({ delay: 300 })
], ArcgisHubEntityDiscussionParticipationPane.prototype, "fetchDependencies", null);
ArcgisHubEntityDiscussionParticipationPane.style = arcgisHubEntityDiscussionParticipationPaneCss;

exports.arcgis_hub_entity_discussion_participation_pane = ArcgisHubEntityDiscussionParticipationPane;
