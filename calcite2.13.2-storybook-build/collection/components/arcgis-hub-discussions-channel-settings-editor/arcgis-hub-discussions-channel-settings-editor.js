import { createChannelNotificationOptOut, removeChannelActivity, removeChannelNotificationOptOut, searchPosts, fetchChannelNotifcationOptOut, } from '@esri/hub-discussions';
import { constants as telemetryConstants, dictionary } from '@esri/telemetry-dictionary-hub';
import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { fetchChannelDetails } from '../../utils/discussions/fetch-channel-details';
import { getChannelName } from '../arcgis-hub-discussions/utils/discussions';
import { getGlobalContext } from '../../utils/state';
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
/** @internal */
export class ArcgisHubDiscussionsChannelSettingsEditor {
  constructor() {
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
      this.hubTelemetry.emit(dictionary.category.interaction.action.open.label.stepper.details[name]);
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.delete.details.allPosts), { response: telemetryConstants.response.SUCCESS }));
      this.postTotal = await this.fetchTotalPosts();
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.delete.details.allPosts), { response: telemetryConstants.response.FAILURE }));
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.users.action.update.label.notifications.details.disabled), { response: telemetryConstants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.users.action.update.label.notifications.details.disabled), { response: telemetryConstants.response.FAILURE }));
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
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.users.action.update.label.notifications.details.enabled), { response: telemetryConstants.response.SUCCESS }));
    }
    catch (e) {
      this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.users.action.update.label.notifications.details.enabled), { response: telemetryConstants.response.FAILURE }));
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
    this.hubTelemetry.emit(dictionary.category.interaction.action.close.label.modal.details.managePreferences);
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
  static get is() { return "arcgis-hub-discussions-channel-settings-editor"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-discussions-channel-settings-editor.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-discussions-channel-settings-editor.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "channelId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "id of relevant channel"
        },
        "attribute": "channel-id",
        "reflect": false
      },
      "open": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Active state of modal"
        },
        "attribute": "open",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "channel": {},
      "channelGroups": {},
      "saving": {},
      "postTotal": {},
      "activeStepIndex": {},
      "notifications": {},
      "activity": {},
      "notices": {}
    };
  }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emits telemetry information"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "calciteModalClose",
        "method": "handleModalClosed",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
