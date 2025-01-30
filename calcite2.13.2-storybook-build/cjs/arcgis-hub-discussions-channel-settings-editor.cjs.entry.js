'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const index$1 = require('./index-6f16fe65.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
const fetchChannelDetails = require('./fetch-channel-details-c2fee138.js');
const discussions = require('./discussions-09889d00.js');
const state = require('./state-6637df8c.js');
const channels = require('./channels-b4910298.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./teams-d12190bc.js');
require('./cache-4d33af79.js');
require('./get-52661c13.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./append-custom-params-0f5d0fe2.js');
require('./utils-7f390376.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./download-list-00ce3845.js');
require('./index-77618030.js');
require('./store-2a385ca0.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./fetchContent-963f3885.js');
require('./tslib.es6-b6cfa7d7.js');
require('./_enrichments-a40a3850.js');
require('./get-with-default-d1b1754d.js');
require('./get-0368c931.js');
require('./OperationError-902f34ae.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./slugs-8f743e2c.js');
require('./is-guid-b5c2b74c.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./tslib.es6-846f687c.js');
require('./update-b8977041.js');
require('./update-7b2b2d9d.js');

const arcgisHubDiscussionsChannelSettingsEditorCss = ":host{display:block}calcite-modal{z-index:1030}section{display:grid;gap:1rem}calcite-notice{display:none}calcite-notice[active]{display:block}calcite-stepper-item calcite-notice{margin-top:1rem}address{display:flex;gap:1rem}address div{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:0.125rem}address b{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold);font-style:normal;color:var(--calcite-color-text-1)}address span{font-size:var(--calcite-font-size--1);line-height:1rem;font-style:normal;color:var(--calcite-color-text-2)}div{display:flex;align-items:center;justify-content:space-between}";

const statusColorToKind = (color) => {
  switch (color) {
    case 'blue':
      return 'brand';
    case 'green':
      return 'success';
    case 'red':
      return 'danger';
    case 'yellow':
      return 'warning';
  }
};
const ArcgisHubDiscussionsChannelSettingsEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.channelId = undefined;
    this.open = undefined;
    this.channel = undefined;
    this.channelGroups = undefined;
    this.saving = false;
    this.postTotal = undefined;
    this.activeStepIndex = undefined;
    this.notifications = undefined;
    this.activity = true;
    this.notices = [];
    context.bind(this, 'handleStepperItemSelected', 'handleCancelButtonClicked', 'handleSaveButtonClicked', 'handleModalClosed', 'handleTileSelect', 'handleNoticeClosed');
  }
  get _context() {
    return state.getGlobalContext();
  }
  /**
   * Whether the currently authenticated user is a member of this channel
   */
  get isMember() {
    const { channel, _context } = this;
    return Boolean(channel) && _context.currentUser.groups.some(({ id }) => channel.groups.includes(id));
  }
  /**
   * Lifecycle "componentWillLoad" method
   */
  async componentWillLoad() {
    const [intl, notificationOptOut, channelDetails] = await Promise.all([
      intlManager.intlManager.loadIntlForComponent(this.element),
      channels.fetchChannelNotifcationOptOut(Object.assign({ channelId: this.channelId }, this._context.hubRequestOptions)).catch(() => null),
      fetchChannelDetails.fetchChannelDetails({ channelId: this.channelId }, this._context.hubRequestOptions),
    ]);
    this.intl = intl;
    this.notifications = !notificationOptOut;
    this.channel = channelDetails.channel;
    this.channelGroups = channelDetails.channelGroups;
    this.postTotal = await this.fetchTotalPosts();
    this.activeStepIndex = this.isMember ? 0 : 1;
  }
  get stepItems() {
    const { isMember, intl, notifications, activity } = this;
    return [
      {
        name: 'notifications',
        description: isMember ? '' : intl.t('notifications-disabled'),
        disabled: !isMember,
        heading: intl.t('notifications'),
        options: [
          {
            checked: notifications,
            description: intl.t('receiveDesc'),
            heading: intl.t('receive'),
            icon: 'email-address',
            value: true,
          },
          {
            checked: !notifications,
            description: intl.t('stopDesc'),
            heading: intl.t('stop'),
            icon: 'circle-disallowed',
            value: false,
          },
        ],
        notice: {
          title: intl.t('stopNotice'),
          message: intl.t('stopNoticeMessage'),
          link: intl.t('noticeLink'),
          url: 'https://doc.arcgis.com/en/hub/team/how-discussions-work.htm',
        },
      },
      {
        name: 'activity',
        disabled: false,
        heading: intl.t('activity'),
        options: [
          {
            checked: activity,
            description: intl.t('keepDesc'),
            heading: intl.t('keep'),
            icon: 'speech-bubble-check',
            value: true,
          },
          {
            checked: !activity,
            description: intl.t('deleteDesc'),
            heading: intl.t('delete'),
            icon: 'trash',
            value: false,
          },
        ],
        notice: {
          color: 'red',
          title: intl.t('deleteNotice'),
          message: intl.t('deleteNoticeMessage'),
          link: intl.t('noticeLink'),
          url: 'https://doc.arcgis.com/en/hub/team/how-discussions-work.htm',
        },
      },
    ];
  }
  /**
   * Gets number of posts user has posted in channel
   */
  async fetchTotalPosts() {
    const { channelId, _context: { hubRequestOptions, currentUser }, } = this;
    const { total } = await discussions.searchPosts(Object.assign({ data: {
        start: 1,
        num: 1,
        channels: [channelId],
        creator: currentUser.username,
      } }, hubRequestOptions));
    return total;
  }
  /**
   * Sets activeStepIndex and emits telemetry for stepper item selected
   * @param evt
   */
  handleStepperItemSelected(evt) {
    const target = evt.currentTarget;
    const { activeStepIndex, stepItems } = this;
    const activeItem = stepItems[activeStepIndex];
    if (!target.disabled && target.dataset.name !== activeItem.name) {
      const name = target.dataset.name === 'notifications' ? 'emailNotifications' : 'postActivity';
      this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.open.label.stepper.details[name]);
      this.activeStepIndex = stepItems.findIndex(({ name }) => name === target.dataset.name);
    }
  }
  /**
   * Closes modal when cancel button clicked
   */
  handleCancelButtonClicked() {
    this.open = false;
  }
  async removeChannelActivity() {
    const { channelId, intl, _context } = this;
    try {
      await channels.removeChannelActivity(Object.assign({ channelId }, _context.hubRequestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.delete.details.allPosts), { response: index$1.dist.constants.response.SUCCESS }));
      this.postTotal = await this.fetchTotalPosts();
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.content.action.delete.details.allPosts), { response: index$1.dist.constants.response.FAILURE }));
      this.notices = [
        ...this.notices,
        {
          color: 'red',
          title: intl.t('deleteError'),
          message: intl.t('deleteErrorMessage'),
        },
      ];
    }
  }
  async createChannelNotificationOptOut() {
    const { channelId, intl, _context } = this;
    try {
      await channels.createChannelNotificationOptOut(Object.assign({ channelId }, _context.hubRequestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.users.action.update.label.notifications.details.disabled), { response: index$1.dist.constants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.users.action.update.label.notifications.details.disabled), { response: index$1.dist.constants.response.FAILURE }));
      this.notices = [
        ...this.notices,
        {
          color: 'red',
          title: intl.t('stopError'),
          message: intl.t('stopErrorMessage'),
        },
      ];
    }
  }
  async removeChannelNotificationOptOut() {
    const { channelId, intl, _context } = this;
    try {
      await channels.removeChannelNotificationOptOut(Object.assign({ channelId }, _context.hubRequestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.users.action.update.label.notifications.details.enabled), { response: index$1.dist.constants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, index$1.dist.dictionary.category.users.action.update.label.notifications.details.enabled), { response: index$1.dist.constants.response.FAILURE }));
      this.notices = [
        ...this.notices,
        {
          color: 'red',
          title: intl.t('receiveError'),
          message: intl.t('receiveErrorMessage'),
        },
      ];
    }
  }
  /**
   * On "Save Preferences" run the relevant API calls
   */
  handleSaveButtonClicked() {
    this.saving = true;
    this.notices = [];
    const promises = [];
    if (!this.activity) {
      promises.push(this.removeChannelActivity());
    }
    promises.push(this.notifications ? this.removeChannelNotificationOptOut() : this.createChannelNotificationOptOut());
    Promise.all(promises).then(() => {
      this.saving = false;
      if (!this.notices.length) {
        this.notices = [
          {
            title: this.intl.t('updated'),
            message: this.intl.t('updatedMessage'),
          },
        ];
      }
    });
  }
  /**
   * Emits telemetry for modal close
   */
  handleModalClosed() {
    this.hubTelemetry.emit(index$1.dist.dictionary.category.interaction.action.close.label.modal.details.managePreferences);
  }
  /**
   * Opens relevant notices and sets selected options
   */
  handleTileSelect(evt) {
    const target = evt.target;
    this[target.name] = target.value;
  }
  handleNoticeClosed() {
    this.notices = [];
  }
  renderMetadata() {
    const { channel, channelGroups, postTotal, intl, } = this;
    return (index.h("address", null, index.h("calcite-avatar", { fullName: discussions.getChannelName(channel, channelGroups, intl.t('unnamedChannel')), scale: "l" }), index.h("div", null, index.h("b", null, discussions.getChannelName(channel, channelGroups, intl.t('unnamedChannel'))), index.h("span", null, intl.t('totalPosts', { count: postTotal })))));
  }
  renderChannelDetails() {
    return (index.h("calcite-card", null, index.h("div", null, this.renderMetadata())));
  }
  renderContent() {
    const { activeStepIndex, isMember } = this;
    return (index.h("section", { slot: "content" }, isMember && this.renderChannelDetails(), index.h("calcite-stepper", { layout: "vertical" }, this.stepItems.map((stepItem, idx) => (index.h("calcite-stepper-item", { "data-name": stepItem.name, description: stepItem.description, disabled: stepItem.disabled, heading: stepItem.heading, key: stepItem.heading, onClick: this.handleStepperItemSelected, selected: idx === activeStepIndex }, index.h("calcite-tile-select-group", null, stepItem.options.map(option => (index.h("calcite-tile-select", { checked: option.checked, description: option.description, heading: option.heading, icon: option.icon, inputEnabled: true, key: option.icon, name: stepItem.name, onCalciteTileSelectChange: this.handleTileSelect, type: "radio", value: option.value })))), stepItem.options[1].checked && (index.h("calcite-notice", { kind: statusColorToKind(stepItem.notice.color), open: true, width: "full" }, index.h("p", { slot: "title" }, stepItem.notice.title), index.h("p", { slot: "message" }, stepItem.notice.message), index.h("calcite-link", { href: stepItem.notice.url, slot: "link" }, stepItem.notice.link))))))), this.renderNotice()));
  }
  renderNotice() {
    const { notices, intl } = this;
    const notice = notices.length > 1
      ? {
        color: 'red',
        title: intl.t('multipleError'),
        message: intl.t('multipleErrorMessage'),
      }
      : notices[0];
    if (notice) {
      return (index.h("calcite-notice", { closable: true, kind: statusColorToKind(notice.color), onCalciteNoticeClose: this.handleNoticeClosed, open: true, width: "full" }, index.h("p", { slot: "title" }, notice.title), index.h("p", { slot: "message" }, notice.message)));
    }
  }
  renderModal() {
    const { intl, saving, open } = this;
    return (
    /**
     * this used to have backgroundColor='grey' but that's been replaced w/
     * --calcite-modal-content-background so we should set that if needed
     */
    index.h("calcite-modal", { closeButtonDisabled: saving, escapeDisabled: saving, open: open, outsideCloseDisabled: true }, index.h("p", { slot: "header" }, intl.t('header')), index.h("calcite-button", { disabled: saving, loading: saving, onClick: this.handleSaveButtonClicked, round: true, scale: "l", slot: "primary" }, intl.t('save')), index.h("calcite-button", { appearance: "outline", disabled: saving, onClick: this.handleCancelButtonClicked, round: true, scale: "l", slot: "secondary" }, intl.t('cancel')), this.renderContent()));
  }
  render() {
    return index.h(index.Host, { "data-element": "discussions-channel-settings-editor" }, this.renderModal());
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubDiscussionsChannelSettingsEditor.style = arcgisHubDiscussionsChannelSettingsEditorCss;

exports.arcgis_hub_discussions_channel_settings_editor = ArcgisHubDiscussionsChannelSettingsEditor;
