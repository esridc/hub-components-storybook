import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { d as dist } from './index-dd3f99ac.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { f as fetchChannelDetails } from './fetch-channel-details-82aa13f7.js';
import { s as searchPosts, g as getChannelName } from './discussions-a173baa3.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { a as fetchChannelNotifcationOptOut, r as removeChannelActivity, c as createChannelNotificationOptOut, b as removeChannelNotificationOptOut } from './channels-3a706fa2.js';
import './_commonjsHelpers-11ca3be1.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './teams-38e72623.js';
import './cache-4bea61e0.js';
import './get-850c466d.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';
import './utils-6bf1b713.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './download-list-38d6b571.js';
import './index-55cb25f7.js';
import './store-0a6cb79f.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './get-with-default-b819d95d.js';
import './get-f0caeb52.js';
import './OperationError-387ae9ab.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './slugs-7b8828d5.js';
import './is-guid-982831aa.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './tslib.es6-0e03e357.js';
import './update-6a7d5697.js';
import './update-26e2fbc1.js';

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
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
    bind(this, 'handleStepperItemSelected', 'handleCancelButtonClicked', 'handleSaveButtonClicked', 'handleModalClosed', 'handleTileSelect', 'handleNoticeClosed');
  }
  get _context() {
    return getGlobalContext();
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
      intlManager.loadIntlForComponent(this.element),
      fetchChannelNotifcationOptOut(Object.assign({ channelId: this.channelId }, this._context.hubRequestOptions)).catch(() => null),
      fetchChannelDetails({ channelId: this.channelId }, this._context.hubRequestOptions),
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
    const { total } = await searchPosts(Object.assign({ data: {
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
      this.hubTelemetry.emit(dist.dictionary.category.interaction.action.open.label.stepper.details[name]);
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
      await removeChannelActivity(Object.assign({ channelId }, _context.hubRequestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.content.action.delete.details.allPosts), { response: dist.constants.response.SUCCESS }));
      this.postTotal = await this.fetchTotalPosts();
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.content.action.delete.details.allPosts), { response: dist.constants.response.FAILURE }));
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
      await createChannelNotificationOptOut(Object.assign({ channelId }, _context.hubRequestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.users.action.update.label.notifications.details.disabled), { response: dist.constants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.users.action.update.label.notifications.details.disabled), { response: dist.constants.response.FAILURE }));
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
      await removeChannelNotificationOptOut(Object.assign({ channelId }, _context.hubRequestOptions));
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.users.action.update.label.notifications.details.enabled), { response: dist.constants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.users.action.update.label.notifications.details.enabled), { response: dist.constants.response.FAILURE }));
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
    this.hubTelemetry.emit(dist.dictionary.category.interaction.action.close.label.modal.details.managePreferences);
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
    return (h("address", null, h("calcite-avatar", { fullName: getChannelName(channel, channelGroups, intl.t('unnamedChannel')), scale: "l" }), h("div", null, h("b", null, getChannelName(channel, channelGroups, intl.t('unnamedChannel'))), h("span", null, intl.t('totalPosts', { count: postTotal })))));
  }
  renderChannelDetails() {
    return (h("calcite-card", null, h("div", null, this.renderMetadata())));
  }
  renderContent() {
    const { activeStepIndex, isMember } = this;
    return (h("section", { slot: "content" }, isMember && this.renderChannelDetails(), h("calcite-stepper", { layout: "vertical" }, this.stepItems.map((stepItem, idx) => (h("calcite-stepper-item", { "data-name": stepItem.name, description: stepItem.description, disabled: stepItem.disabled, heading: stepItem.heading, key: stepItem.heading, onClick: this.handleStepperItemSelected, selected: idx === activeStepIndex }, h("calcite-tile-select-group", null, stepItem.options.map(option => (h("calcite-tile-select", { checked: option.checked, description: option.description, heading: option.heading, icon: option.icon, inputEnabled: true, key: option.icon, name: stepItem.name, onCalciteTileSelectChange: this.handleTileSelect, type: "radio", value: option.value })))), stepItem.options[1].checked && (h("calcite-notice", { kind: statusColorToKind(stepItem.notice.color), open: true, width: "full" }, h("p", { slot: "title" }, stepItem.notice.title), h("p", { slot: "message" }, stepItem.notice.message), h("calcite-link", { href: stepItem.notice.url, slot: "link" }, stepItem.notice.link))))))), this.renderNotice()));
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
      return (h("calcite-notice", { closable: true, kind: statusColorToKind(notice.color), onCalciteNoticeClose: this.handleNoticeClosed, open: true, width: "full" }, h("p", { slot: "title" }, notice.title), h("p", { slot: "message" }, notice.message)));
    }
  }
  renderModal() {
    const { intl, saving, open } = this;
    return (
    /**
     * this used to have backgroundColor='grey' but that's been replaced w/
     * --calcite-modal-content-background so we should set that if needed
     */
    h("calcite-modal", { closeButtonDisabled: saving, escapeDisabled: saving, open: open, outsideCloseDisabled: true }, h("p", { slot: "header" }, intl.t('header')), h("calcite-button", { disabled: saving, loading: saving, onClick: this.handleSaveButtonClicked, round: true, scale: "l", slot: "primary" }, intl.t('save')), h("calcite-button", { appearance: "outline", disabled: saving, onClick: this.handleCancelButtonClicked, round: true, scale: "l", slot: "secondary" }, intl.t('cancel')), this.renderContent()));
  }
  render() {
    return h(Host, { "data-element": "discussions-channel-settings-editor" }, this.renderModal());
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubDiscussionsChannelSettingsEditor.style = arcgisHubDiscussionsChannelSettingsEditorCss;

export { ArcgisHubDiscussionsChannelSettingsEditor as arcgis_hub_discussions_channel_settings_editor };
