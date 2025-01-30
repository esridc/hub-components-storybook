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
import { createHubEventRegistration, deleteHubEventRegistration, fetchEvent, getProp, HubEventAttendanceType, HubEventCapacityType, hubSearch, } from '@esri/hub-common';
import { Fragment, Host, h } from '@stencil/core';
import { getGlobalContext, connectContext, showNotice } from '../../utils/state';
import intlManager from '../../utils/intl-manager';
import Sanitize from '../../decorators/sanitize';
import { constants as telemetryConstants } from '@esri/telemetry-dictionary-hub';
import { EVENT_ACTIONS } from './resources';
/**
 * This component encapsulates the UI & logic responsible for registering/deregistering to attend a Hub Event, viewing online event details, and joining an active online event.
 */
export class ArcgisHubEventActions {
  constructor() {
    /**
     * Intl reference
     */
    this.intl = null;
    /**
     * Handles clicks to the `Register` button and attendance options from the `Register` calcite-dropdown
     * @param evt A PointerEvent or CustomEvent<void> depending on whether a calcite-button or calcite-dropdown-item was clicked
     * @returns Promise<void>
     */
    this.handleRegistration = (evt) => {
      var _a, _b;
      const attendanceType = ((_b = (_a = evt.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.value) || (this.entity.attendanceType === HubEventAttendanceType.InPerson ? 'inPerson' : 'online');
      this.actionPending = true;
      const action = EVENT_ACTIONS.register[attendanceType];
      return createHubEventRegistration({
        eventId: this.entity.id,
        role: 'ATTENDEE',
        type: attendanceType === 'inPerson' ? 'IN_PERSON' : 'VIRTUAL',
      }, this._context.hubRequestOptions)
        .then(registration => {
        this.userRegistration = registration;
        this.showNotice(this.intl.t(action.success), 'success');
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: telemetryConstants.response.SUCCESS }));
      })
        .catch(err => {
        var _a;
        const errorType = ((_a = err.error) === null || _a === void 0 ? void 0 : _a.includes('capacity')) ? 'capacity' : 'unexpected';
        this.showNotice(this.intl.t(action[errorType]), 'danger');
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: telemetryConstants.response.FAILURE }));
      })
        .finally(() => {
        this.actionPending = false;
        return this.fetchData();
      });
    };
    /**
     * Handles clicks to the `Registered` button, deregisters the user from event attendance
     * @returns Promise<void>
     */
    this.handleDeregistration = () => {
      this.actionPending = true;
      const action = EVENT_ACTIONS.unregister[this.isAttendingInPerson ? 'inPerson' : 'online'];
      return deleteHubEventRegistration(this.userRegistration.id, this._context.hubRequestOptions)
        .then(() => {
        this.showNotice(this.intl.t(action.success), 'success');
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: telemetryConstants.response.SUCCESS }));
        this.userRegistration = null;
      })
        .catch(() => {
        this.showNotice(this.intl.t(action.error), 'danger');
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: telemetryConstants.response.FAILURE }));
      })
        .finally(() => {
        this.actionPending = false;
        return this.fetchData();
      });
    };
    /**
     * Handles clicks to the `Register` calcite-dropdown, needed so the dropdown icon can properly reflect open/closed state
     * @param evt CustomEvent<void>
     */
    this.handleDropdownToggled = (evt) => {
      const { open } = evt.currentTarget;
      this.registrationDropdownOpen = open;
    };
    /**
     * Handles clicks to the `Join online` button when online event details are configured, opens the online details modal.
     */
    this.handleJoinButtonClick = () => {
      this.onlineDetailsModalOpen = true;
    };
    /**
     * Handles the online details modal closing, keeps local modal state in sync with the mutable prop of the calcite-modal component
     */
    this.handleJoinModalClose = () => {
      this.onlineDetailsModalOpen = false;
    };
    this.userRegistration = null;
    this.actionPending = false;
    this.registrationDropdownOpen = false;
    this.onlineDetailsModalOpen = false;
    this._context = getGlobalContext();
    this.identifier = undefined;
    this.entity = undefined;
  }
  /**
   * Loads the user's registration record when the user changes (signs in or signs out)
   * @param context The current IArcGISContext object
   * @param prevContext The previous IArcGISContext object
   */
  async handleContextChanged(context, prevContext) {
    const currentUserId = getProp(context, 'currentUser.id');
    const prevUserId = getProp(prevContext, 'currentUser.id');
    if (currentUserId !== prevUserId) {
      await this.fetchData();
    }
  }
  async handleIdentifierChanged(identifier) {
    var _a;
    if (identifier && identifier !== ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.id)) {
      await this.fetchData();
    }
  }
  /**
   * Wires up the component to receive global context when the component mounts
   */
  connectedCallback() {
    connectContext(this);
  }
  /**
   * Cleans up the global context when the component unmounts
   */
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * Loads necessary dependencies before the component mounts
   */
  async componentWillLoad() {
    if (this.entity) {
      this.identifier = this.entity.id;
    }
    await Promise.all([this.loadIntl(), this.fetchData(Boolean(this.entity))]);
  }
  /**
   * Loads the intl reference
   */
  async loadIntl() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Loads the entity & user registration, if registered
   */
  async fetchData(skipEntity) {
    if (!skipEntity) {
      await this.fetchEntity();
    }
    await this.fetchUserRegistration();
  }
  /**
   * Loads the currently authenticated user's registration record when one exists
   */
  async fetchUserRegistration() {
    var _a;
    if (this.entity && this._context.currentUser) {
      try {
        const { results: [registration], } = await hubSearch({
          targetEntity: 'eventAttendee',
          filters: [
            {
              predicates: [{ userId: getProp(this._context.currentUser, 'id') }],
            },
          ],
          properties: {
            eventId: this.entity.id,
          },
        }, {
          num: 1,
          start: 0,
          requestOptions: this._context.hubRequestOptions,
        });
        this.userRegistration = (_a = registration === null || registration === void 0 ? void 0 : registration.rawResult) !== null && _a !== void 0 ? _a : null;
      }
      catch (e) {
        console.error('Failed to fetch user registration:', e);
        this.userRegistration = null;
      }
    }
    else {
      this.userRegistration = null;
    }
  }
  /**
   * Loads the entity reference for the current identifier
   */
  async fetchEntity() {
    try {
      this.entity = await fetchEvent(this.identifier, this._context.hubRequestOptions);
      this.identifier = this.entity.id;
    }
    catch (e) {
      console.error('Failed to fetch event:', e);
      this.entity = null;
    }
  }
  /**
   * Displays a notice with the given message and kind
   * @param message The message for the alert
   * @param kind The kind of alert
   */
  showNotice(message, kind) {
    showNotice({
      title: null,
      message: message,
      configuration: {
        noticeType: 'alert',
        autoClose: true,
        autoCloseDuration: 'fast',
        icon: true,
        kind,
        label: message,
      },
    });
  }
  /**
   * Returns a sanitized online event details string that's safe to inject into the DOM via innerHTML attribute to prevent
   * markup from the rich-text editor from rendering as plain text and also prevents XSS vulnerabilities
   */
  get sanitizedOnlineDetails() {
    return this.entity.onlineDetails;
  }
  /**
   * Returns true when the current time is within one hour before the event beginning and is before the event end time
   */
  get isEventJoinable() {
    const now = new Date();
    return new Date(now.valueOf() + 3600000) >= this.entity.startDateTime && now < this.entity.endDateTime;
  }
  /**
   * Returns true when online attendance is at maximum capacity
   */
  get onlineAttendanceFull() {
    return this.entity.onlineCapacityType === HubEventCapacityType.Fixed && this.entity.onlineRegistrationCount >= this.entity.onlineCapacity;
  }
  /**
   * Returns true when in-person attendance is at maximum capacity
   */
  get inPersonAttendanceFull() {
    return this.entity.inPersonCapacityType === HubEventCapacityType.Fixed && this.entity.inPersonRegistrationCount >= this.entity.inPersonCapacity;
  }
  /**
   * Returns true when both online & in-person attendance is at maximum capacity
   */
  get hybridAttendanceFull() {
    return this.onlineAttendanceFull && this.inPersonAttendanceFull;
  }
  /**
   * Returns true when the currently authenticated user is registered to attend online
   */
  get isAttendingOnline() {
    var _a;
    return ((_a = this.userRegistration) === null || _a === void 0 ? void 0 : _a.type) === 'VIRTUAL';
  }
  /**
   * Returns true when the currently authenticated user is registered to attend in-person
   */
  get isAttendingInPerson() {
    var _a;
    return ((_a = this.userRegistration) === null || _a === void 0 ? void 0 : _a.type) === 'IN_PERSON';
  }
  /**
   * Derives the tooltip text for the `Join online` button
   */
  get joinButtonTooltipText() {
    let text = null;
    if (this.entity.isCanceled) {
      text = this.intl.t('tooltip.isCanceled');
    }
    else if (this.entity.isPast) {
      text = this.intl.t('tooltip.eventHasEnded');
    }
    else if (!this.isEventJoinable) {
      text = this.intl.t('tooltip.unavailable');
    }
    return text;
  }
  /**
   * Returns true when the event is configured for in-person attendance
   */
  get isInPerson() {
    return this.entity.attendanceType === HubEventAttendanceType.InPerson;
  }
  /**
   * Returns true when the event is configured for online attendance
   */
  get isOnline() {
    return this.entity.attendanceType === HubEventAttendanceType.Online;
  }
  /**
   * Returns true when the event is configured for both in-person & online attendance
   */
  get isHybrid() {
    return this.entity.attendanceType === HubEventAttendanceType.Both;
  }
  /**
   * Returns true when the `Register` calcite-button or calcite-dropdown should be disabled
   */
  get isRegisterActionDisabled() {
    return [
      this.actionPending,
      this.entity.isPast,
      this.entity.isCanceled,
      this.isInPerson && this.inPersonAttendanceFull,
      this.isOnline && this.onlineAttendanceFull,
      this.isHybrid && this.hybridAttendanceFull,
    ].some(v => v);
  }
  /**
   * Returns true when the `Registered` calcite-button should be disabled
   */
  get isRegisteredActionDisabled() {
    return [this.actionPending, this.entity.isPast, this.entity.isCanceled].some(v => v);
  }
  /**
   * Derives the tooltip text for the `Register` button
   */
  get registerButtonTooltipText() {
    let text = null;
    if (this.entity.isCanceled) {
      text = this.intl.t('tooltip.isCanceled');
    }
    else if (this.entity.isPast) {
      text = this.intl.t('tooltip.eventHasEnded');
    }
    else if ((this.isHybrid && this.hybridAttendanceFull) || (this.isInPerson && this.inPersonAttendanceFull) || (this.isOnline && this.onlineAttendanceFull)) {
      text = this.intl.t('tooltip.eventFull');
    }
    return text;
  }
  /**
   * Derives the tooltip text for the `Registered` button
   */
  get registeredButtonTooltipText() {
    let text = null;
    if (this.entity.isCanceled) {
      text = this.intl.t('tooltip.isCanceled');
    }
    else if (this.entity.isPast) {
      text = this.intl.t('tooltip.eventHasEnded');
    }
    else if (this.isHybrid) {
      if (this.isAttendingOnline) {
        text = this.intl.t('tooltip.online');
      }
      else if (this.isAttendingInPerson) {
        text = this.intl.t('tooltip.inPerson');
      }
    }
    return text;
  }
  /**
   * Returns true when the `Join online` calcite-button should be disabled
   */
  get isJoinButtonDisabled() {
    return [!this.isEventJoinable, this.entity.isPast, this.entity.isCanceled].some(v => v);
  }
  /**
   * Renders the `Register` button
   */
  renderRegisterButton() {
    if (!this.isHybrid && !this.userRegistration) {
      return (h(Fragment, null, h("calcite-button", { appearance: "solid", disabled: this.isRegisterActionDisabled || this.actionPending, id: "register-button", label: this.intl.t('actions.register'), loading: this.actionPending, onClick: this.handleRegistration, round: true }, this.intl.t('actions.register')), this.registerButtonTooltipText && h("calcite-tooltip", { referenceElement: "register-button" }, this.registerButtonTooltipText)));
    }
  }
  /**
   * Renders the `Register` dropdown
   */
  renderRegisterMenu() {
    if (this.isHybrid && !this.userRegistration) {
      return (h(Fragment, null, h("calcite-dropdown", { onCalciteDropdownClose: this.handleDropdownToggled, onCalciteDropdownOpen: this.handleDropdownToggled }, h("calcite-button", { appearance: "solid", disabled: this.isRegisterActionDisabled || this.actionPending, "icon-end": this.registrationDropdownOpen ? 'chevron-up' : 'chevron-down', id: "register-menu", label: this.intl.t('actions.register'), loading: this.actionPending, round: true, slot: "trigger" }, this.intl.t('actions.register')), h("calcite-dropdown-group", null, h("calcite-dropdown-item", { "data-value": "inPerson", disabled: this.inPersonAttendanceFull, onCalciteDropdownItemSelect: this.handleRegistration }, this.intl.t(this.inPersonAttendanceFull ? 'actions.inPersonFull' : 'actions.in-person')), h("calcite-dropdown-item", { "data-value": "online", disabled: this.onlineAttendanceFull, onCalciteDropdownItemSelect: this.handleRegistration }, this.intl.t(this.onlineAttendanceFull ? 'actions.onlineFull' : 'actions.online')))), this.registerButtonTooltipText && h("calcite-tooltip", { referenceElement: "register-menu" }, this.registerButtonTooltipText)));
    }
  }
  /**
   * Renders the `Registered` button
   */
  renderRegisteredButton() {
    if (this.userRegistration) {
      return (h(Fragment, null, h("calcite-button", { appearance: "outline", disabled: this.isRegisteredActionDisabled || this.actionPending, "icon-start": this.actionPending ? null : 'check-circle', id: "registered-button", label: this.intl.t('actions.registered'), loading: this.actionPending, onClick: this.handleDeregistration, round: true }, this.intl.t('actions.registered')), this.registeredButtonTooltipText && h("calcite-tooltip", { referenceElement: "registered-button" }, this.registeredButtonTooltipText)));
    }
  }
  /**
   * Renders the `Join online` button
   */
  _renderJoinButton(icon, href, target, onClick) {
    return (h(Fragment, null, h("calcite-button", { appearance: "solid", disabled: this.isJoinButtonDisabled, href: href, "icon-end": icon, id: "join-button", label: this.intl.t('actions.join'), onClick: onClick, round: true, target: target }, this.intl.t('actions.join')), this.joinButtonTooltipText && h("calcite-tooltip", { referenceElement: "join-button" }, this.joinButtonTooltipText)));
  }
  /**
   * Renders the `Join online` button + modal when online event details are configured
   */
  renderJoinButtonWithModal() {
    return (h(Fragment, null, this._renderJoinButton(null, null, null, this.handleJoinButtonClick), h("calcite-modal", { "aria-labelledby": "modal-header", onCalciteModalClose: this.handleJoinModalClose, open: this.onlineDetailsModalOpen }, h("div", { id: "modal-header", slot: "header" }, this.intl.t('actions.join')), h("div", { slot: "content" }, h("div", { class: "event-details", innerHTML: this.sanitizedOnlineDetails }), h("calcite-link", { href: this.entity.onlineUrl, iconEnd: "launch", target: "_blank" }, this.intl.t('actions.join'))), h("calcite-button", { appearance: "outline", onClick: this.handleJoinModalClose, round: true, slot: "secondary", width: "full" }, this.intl.t('actions.close')))));
  }
  /**
   * Renders the `Join online` button with or without a modal depending on whether online details are configured for the event
   */
  renderJoinButton() {
    if (this.isAttendingOnline) {
      return this.entity.onlineDetails ? this.renderJoinButtonWithModal() : this._renderJoinButton('launch', this.entity.onlineUrl, '_blank');
    }
  }
  /**
   * Primary render method
   */
  render() {
    var _a;
    return (h(Host, { "data-element": "event-actions" }, ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.allowRegistration) && Boolean(this._context.currentUser) && (h(Fragment, null, this.renderRegisterButton(), this.renderRegisterMenu(), this.renderRegisteredButton(), this.renderJoinButton()))));
  }
  static get is() { return "arcgis-hub-event-actions"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-event-actions.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-event-actions.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "identifier": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The ID of the event"
        },
        "attribute": "identifier",
        "reflect": true
      },
      "entity": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IHubEvent",
          "resolved": "IHubEvent",
          "references": {
            "IHubEvent": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An IHubEvent representing the event"
        }
      }
    };
  }
  static get states() {
    return {
      "userRegistration": {},
      "actionPending": {},
      "registrationDropdownOpen": {},
      "onlineDetailsModalOpen": {},
      "_context": {}
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
          "text": "Hub telemetry event"
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
  static get watchers() {
    return [{
        "propName": "_context",
        "methodName": "handleContextChanged"
      }, {
        "propName": "identifier",
        "methodName": "handleIdentifierChanged"
      }];
  }
}
__decorate([
  Sanitize()
], ArcgisHubEventActions.prototype, "sanitizedOnlineDetails", null);
