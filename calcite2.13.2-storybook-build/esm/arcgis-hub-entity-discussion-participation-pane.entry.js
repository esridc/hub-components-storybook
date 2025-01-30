import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { f as fetchChannelDetails } from './fetch-channel-details-82aa13f7.js';
import { m as minPromiseDelayFactory } from './min-promise-delay-d6a589f6.js';
import { g as getGlobalContext, d as showNotice } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { r as redirectToExternalUrl } from './urls-0e36649d.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { c as canModifyChannel } from './can-modify-channel-cffec57d.js';
import { c as channelToSearchResult, a as SharingAccess } from './utils-6bf1b713.js';
import { s as searchChannels } from './channels-2574fd6e.js';
import { g as getUserHomeUrl, h as hubSearch } from './hubSearch-41612481.js';
import { a as getDefaultEntitySettings } from './get-form-json-1d4e3591.js';
import { u as updateSetting, c as createSetting } from './settings-2d4e159a.js';
import { s as setItemAccess } from './access-7968589d.js';
import { f as fetchHubEntity } from './fetchHubEntity-28d04ab4.js';
import { g as getItemGroups } from './get-f0caeb52.js';
import { i as isUpdateGroup } from './is-update-group-7b9eb0ea.js';
import { u as unshareItemFromGroups } from './unshare-item-from-groups-b09dcce3.js';
import { s as shareItemWithGroup } from './share-item-with-group-5711513b.js';
import './index-213c70d0.js';
import './teams-38e72623.js';
import './cache-4bea61e0.js';
import './get-850c466d.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';
import './channels-3a706fa2.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './get-prop-ec5be510.js';
import './helpers-8c7e5e31.js';
import './store-0a6cb79f.js';
import './_commonjsHelpers-11ca3be1.js';
import './generate-random-string-1436d9e6.js';
import './getTypeFromEntity-e149b61e.js';
import './logger-f8667200.js';
import './channel-permission-1e298c3b.js';
import './tslib.es6-0e03e357.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
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
import './merge-objects-5b123ab3.js';
import './search-211dee83.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './remove-2e7122d1.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './helpers-6692d307.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './unshare-item-with-group-b4a3a08f.js';
import './update-user-membership-261681cf.js';

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
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    /**
     * Callback fn to translate card view model
     *
     * @param model - A IHubCardViewModel object
     * @returns {IHubCardViewModel}
     */
    this.channelCardCallback = (model) => {
      const result = cloneObject(model);
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
    bind(this, 'handleNewChannelClicked', 'handleViewBackClicked', 'handleChannelEditorSaved', 'handleChannelEditorError', 'handleChannelEditorSelected', 'handleBrowseButtonClicked', 'handleHubGalleryPickerClose', 'handleHubGalleryPickerSelectionUpdate', 'createOrUpdateSettings', 'handleViewGroupUpdate', 'handleEditGroupUpdate', 'handleAccessChange', 'handleRemoveChannelCanceled', 'handleRemoveInaccessibleChannelClicked', 'handleRemoveChannelClicked');
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
    return getGlobalContext();
  }
  /**
   * Can the current user edit the channel
   */
  get canEditChannel() {
    return canModifyChannel(this.channel, this._context.currentUser);
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
    return channelToSearchResult(this.channel, this.channelGroups);
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
      ({ channel, channelGroups } = await fetchChannelDetails({ channelId: discussionSettings.allowedChannelIds[0] }, _context.hubRequestOptions));
    }
    else {
      channel = null;
      channelGroups = null;
    }
    const channels = await searchChannels(Object.assign({ data: {
        num: 1,
      } }, this._context.hubRequestOptions));
    this.channelsExist = Boolean(channels === null || channels === void 0 ? void 0 : channels.total);
    return {
      channel,
      channelGroups,
    };
  }
  formatAccess(access) {
    const { intl } = this;
    let accessString;
    if (access === SharingAccess.ORG) {
      accessString = intl.t('org');
    }
    else if (access === SharingAccess.PRIVATE) {
      accessString = intl.t('private');
    }
    else if (access === SharingAccess.PUBLIC) {
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.settings.details.addAllowedChannel), { channelId, channelAccess: (_a = this.channel) === null || _a === void 0 ? void 0 : _a.access }));
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
    redirectToExternalUrl(getUserHomeUrl(username, this._context.hubRequestOptions));
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
    else if (isEditDefaultChannel && !canModifyChannel(savedChannel, _context.currentUser)) {
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
    const channelDetails = await fetchChannelDetails(options, this._context.hubRequestOptions);
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
      const defaultSettings = getDefaultEntitySettings('discussion');
      const settings = Object.assign(Object.assign({}, defaultSettings.settings), { discussions: Object.assign(Object.assign(Object.assign({}, defaultSettings.settings.discussions), this.discussionSettings), { allowedChannelIds: ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.id) ? [this.channel.id] : null }) });
      const entitySettings = this.entitySettingsId
        ? await updateSetting(Object.assign({ id: this.entity.id, data: { settings } }, this._context.hubRequestOptions))
        : await createSetting(Object.assign({ data: {
            id: this.entity.id,
            type: defaultSettings.type,
            settings,
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
      showNotice(Object.assign(Object.assign({}, alertStrings), { configuration: Object.assign(Object.assign({}, alertConfig), { label: this.intl.t('alerts.label') }) }));
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
    const access = evt.detail;
    // Note: this must be computed and stored in a variable
    // before awaiting setItemAccess because the composed path
    // isn't available after the event has finished processing
    const composedPath = evt.composedPath();
    try {
      await setItemAccess({
        id: this.entity.id,
        access,
        owner: this.entity.owner,
        authentication: this._context.session
      });
      this.hubTelemetry.emit({
        telemetry: Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.access.details[access]), { response: dist.constants.response.SUCCESS }),
        composedPath
      });
      /**
       * We can't simply set this.entity.access = evt.detail because
       * if "Owner" is selected from the modal, we can't determine
       * whether the access is "private" or "shared" without (unfortunately)
       * re-fetching the entity
       */
      this.entity = await fetchHubEntity('discussion', this.entity.id, this._context);
      this.arcgisHubWorkspaceEntityChange.emit({ isDirty: false, entity: this.entity });
    }
    catch (error) {
      this.hubTelemetry.emit({
        telemetry: Object.assign(Object.assign({}, dist.dictionary.category.content.action.update.label.access.details[access]), { response: dist.constants.response.FAILURE }),
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
    const entityGroups = await getItemGroups(entityId, context === null || context === void 0 ? void 0 : context.requestOptions);
    const groupsSharedWith = [
      ...entityGroups.admin,
      ...entityGroups.member,
      ...entityGroups.other
    ];
    const { editGroups, viewGroups } = groupsSharedWith.reduce((acc, group) => isUpdateGroup(group)
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
    added && telemetryDetails.push(dist.dictionary.category.content.action.update.label.groups.details.addEditGroups);
    removed && telemetryDetails.push(dist.dictionary.category.content.action.update.label.groups.details.removeEditGroups);
    try {
      if (removed) {
        const ro = { authentication: (_a = this._context) === null || _a === void 0 ? void 0 : _a.requestOptions.authentication };
        await unshareItemFromGroups(this.entity.id, removed, ro);
      }
      await this.shareEntityWithGroups(this.entity, updatedGroupIds);
      this.currentEditGroups = updatedGroupIds;
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.SUCCESS, count: (_a = this.currentEditGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
    catch (err) {
      console.error(err);
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.FAILURE, count: (_a = this.currentEditGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
  }
  async handleViewGroupUpdate(evt) {
    var _a;
    const { added, removed, updatedList: updatedGroupIds } = evt.detail;
    const telemetryDetails = [];
    added && telemetryDetails.push(dist.dictionary.category.content.action.update.label.groups.details.addViewGroups);
    removed && telemetryDetails.push(dist.dictionary.category.content.action.update.label.groups.details.removeViewGroups);
    try {
      if (removed) {
        const ro = { authentication: (_a = this._context) === null || _a === void 0 ? void 0 : _a.requestOptions.authentication };
        await unshareItemFromGroups(this.entity.id, removed, ro);
      }
      await this.shareEntityWithGroups(this.entity, updatedGroupIds);
      this.currentViewGroups = updatedGroupIds;
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.SUCCESS, count: (_a = this.currentViewGroups) === null || _a === void 0 ? void 0 : _a.length }));
      });
    }
    catch (err) {
      console.error(err);
      telemetryDetails.forEach(details => {
        var _a;
        this.hubTelemetry.emit(Object.assign(Object.assign({}, details), { response: dist.constants.response.FAILURE, count: (_a = this.currentViewGroups) === null || _a === void 0 ? void 0 : _a.length }));
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
    const { results: groups } = await hubSearch(query, hubSearchOptions);
    await Promise.all(groups.map(async (group) => {
      var _a;
      // Because we are using Promise.all, we need to
      // mark the callback fn as async and wrap each
      // individual call in another try/catch block to
      // make sure it catches before all promises finish
      try {
        await shareItemWithGroup({
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
    return (h("arcgis-wormhole", null, h("arcgis-hub-gallery-picker", { callback: this.channelCardCallback, catalogs: getCatalogs(this.intl), class: "channel-picker", facets: getFacets(this.intl), key: "channel-picker", limit: 1, linkTarget: "siteRelative", modalTitle: intl.t('galleryPickerTitle'), onArcgisHubGalleryPickerClose: handleHubGalleryPickerClose, onArcgisHubGalleryPickerSelectionUpdate: handleHubGalleryPickerSelectionUpdate, open: galleryPickerOpen, showSearch: true, showThumbnail: true })));
  }
  /**
   * Renders the channel editor in a calcite-flow-item when viewing, editing or creating
   * a new channel
   */
  renderChannelEditor() {
    const { entity, view, channelEditorId, footerSlotEl, channelEditorFlowConfig } = this;
    if (channelEditorFlowConfig) {
      return (h("calcite-flow-item", { heading: channelEditorFlowConfig.heading, onCalciteFlowItemBack: channelEditorFlowConfig.action }, h("arcgis-hub-channel-editor", { channelId: channelEditorId, disabled: view === 'viewChannel', footerSlotRef: footerSlotEl, namePrefix: entity.name, onArcgisHubChannelEditorError: this.handleChannelEditorError, onArcgisHubChannelEditorSaved: this.handleChannelEditorSaved, onArcgisHubChannelEditorSelected: this.handleChannelEditorSelected })));
    }
  }
  /**
   * Renders the default view of the component
   */
  renderDefault() {
    return (h("calcite-flow-item", null, this.renderWhoCanView(), this.renderWhoCanEdit(), this.renderWhoCanParticipate()));
  }
  /**
   * Renders the channel card for the configured/selected channel
   */
  renderChannelCard() {
    const { editChannelWarningConfig, intl, cardActionLinks, channelSearchResult } = this;
    return (h("div", null, h("h4", null, intl.t('channelTitle')), h("p", null, intl.t('channelDescription')), editChannelWarningConfig && (h("calcite-notice", { icon: "exclamation-mark-circle", kind: "warning", open: true, scale: "s", width: "full" }, h("div", { slot: "title" }, intl.t(editChannelWarningConfig.title)), h("div", { slot: "message" }, intl.t(editChannelWarningConfig.message)))), h("arcgis-hub-entity-card", { actionLinks: cardActionLinks, callback: this.channelCardCallback, searchResult: channelSearchResult, showAllAdditionalInfo: true })));
  }
  /**
   * Renders the help state for when a channel is not yet set, or one is set
   * but the user doesn't have access to it
   */
  renderChannelHelpState() {
    const { channelHelpState, intl } = this;
    // TODO: When available, use 'channels' icon
    return (h("div", null, h("arcgis-hub-help-state", { heading: intl.t(channelHelpState.heading), icon: "speech-bubbles", message: intl.t(channelHelpState.message) }, h("div", { class: "entity-discussion__actions", slot: "actions" }, channelHelpState.actions.map(action => (h("calcite-button", { appearance: action.appearance, class: action.className, key: action.text, onClick: action.onClick, round: true }, intl.t(action.text)))))), this.renderGalleryPicker(), this.renderRemoveChannelConfirmation()));
  }
  /**
   * Renders the remove confirmation modal
   */
  renderRemoveChannelConfirmation() {
    const { intl, showRemoveChannelConfirmation, handleRemoveChannelCanceled, handleRemoveChannelClicked } = this;
    return (h("calcite-modal", { "aria-labelledby": "modal-title", id: "example-modal", kind: "danger", onCalciteModalClose: handleRemoveChannelCanceled, open: showRemoveChannelConfirmation, width: "s" }, h("div", { id: "modal-title", slot: "header" }, intl.t('buttons.removeChannel')), h("p", { slot: "content" }, intl.t('removeChannelConfirmationMessage')), h("calcite-button", { appearance: "outline-fill", kind: "brand", onClick: handleRemoveChannelCanceled, round: true, slot: "secondary", width: "full" }, intl.t('buttons.cancel')), h("calcite-button", { kind: "danger", onClick: handleRemoveChannelClicked, round: true, slot: "primary", width: "full" }, intl.t('buttons.removeChannel'))));
  }
  /**
   * Renders the footer div that the save button will be rendered into
   */
  renderFooter() {
    if (['createChannel', 'editChannel'].includes(this.view)) {
      return (h("div", { ref: el => {
          this.footerSlotEl = el;
        }, slot: "footer" }));
    }
  }
  renderWhoCanView() {
    var _a, _b;
    return (h("div", { class: "container" }, h("h3", null, this.intl.t('viewGroups.header')), h("p", null, this.intl.t('viewGroups.description')), h("arcgis-hub-access-level-controls", { accessLevel: this.entity.access === 'shared' ? 'private' : this.entity.access, itemType: "discussion", onArcgisHubItemAccessLevelChange: this.handleAccessChange, orgName: (_b = (_a = this._context) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.name }), h("arcgis-hub-group-list-manager", { allowAdd: this.canShareToGroups, allowRemove: this.isEntityOwner, class: "view-groups-manager", groupIds: this.currentViewGroups, metadataMode: "members", onArcgisHubGroupListManagerChanged: this.handleViewGroupUpdate, pickerClassName: "view-groups-picker", pickerFacets: this.facets, pickerToggleLabel: this.intl.t("viewGroupButtonText"), showEmptyState: false, wellKnownPickerCatalog: "viewGroups" })));
  }
  renderWhoCanEdit() {
    return (h("div", { class: "container" }, h("h3", null, this.intl.t('editGroups.header')), h("p", null, this.intl.t('editGroups.description')), h("arcgis-hub-group-list-manager", { allowAdd: this.canShareToGroups && this.isEntityOwner, allowRemove: this.isEntityOwner, class: "edit-groups-manager", groupIds: this.currentEditGroups, metadataMode: "members", onArcgisHubGroupListManagerChanged: this.handleEditGroupUpdate, pickerClassName: "edit-groups-picker", pickerFacets: this.facets, pickerToggleLabel: this.intl.t("editGroupButtonText"), showEmptyState: false, wellKnownPickerCatalog: "editGroups" })));
  }
  renderWhoCanParticipate() {
    return (h("div", { class: "container" }, h("h3", null, this.intl.t('participate.header')), this.channel ? this.renderChannelCard() : this.renderChannelHelpState()));
  }
  renderHeader() {
    if (!this.channelEditorFlowConfig) {
      return (h(Fragment, null, h("h1", { slot: "title" }, this.intl.t('title')), h("p", { slot: "subtitle" }, this.intl.t('subtitle'))));
    }
  }
  renderSidePanel() {
    if (!this.channelEditorFlowConfig) {
      return (h("div", { slot: "side-panel" }, h("calcite-notice", { icon: "lightbulb", kind: "brand", open: true, scale: "m", width: "full" }, h("div", { slot: "title" }, this.intl.t('aboutChannelsNotice.title')), h("div", { slot: "message" }, this.intl.t('aboutChannelsNotice.message')), h("calcite-link", { href: "https://www.esri.com/arcgis-blog/products/arcgis-hub/announcements/what-are-channels/", iconEnd: "launch", slot: "link" }, this.intl.t('aboutChannelsNotice.action')))));
    }
  }
  renderPane() {
    return (h(Fragment, null, this.renderHeader(), h("div", null, h("calcite-flow", null, this.renderDefault(), this.renderChannelEditor())), this.renderFooter(), this.renderSidePanel()));
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
    return (h(Host, { "data-element": "entity-discussion" }, h("arcgis-hub-workspace-pane", { ref: (el) => {
        this.workspacePaneRef = el;
      }, showHeader: !this.isLoading && !this.channelEditorFlowConfig, stickyFooter: true }, this.isLoading ? this.renderSkeleton() : this.renderPane())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory('channel', 'channelGroups')
], ArcgisHubEntityDiscussionParticipationPane.prototype, "channelSearchResult", null);
__decorate([
  minPromiseDelayFactory({ delay: 300 })
], ArcgisHubEntityDiscussionParticipationPane.prototype, "fetchDependencies", null);
ArcgisHubEntityDiscussionParticipationPane.style = arcgisHubEntityDiscussionParticipationPaneCss;

export { ArcgisHubEntityDiscussionParticipationPane as arcgis_hub_entity_discussion_participation_pane };
