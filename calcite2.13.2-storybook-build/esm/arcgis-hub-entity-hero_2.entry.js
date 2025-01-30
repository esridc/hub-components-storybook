import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { g as getGlobalContext, h as connectContext, d as showNotice } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import Graphic from '@arcgis/core/Graphic.js';
import { s as symbols, S as SYMBOL_STATE, d as defaultLayerThemeOptions } from './index-5d989261.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { b as bBoxToExtent } from './extent-34a4ba2a.js';
import { p as processActionLinks } from './processActionLinks-d3b3f868.js';
import { g as getEntityThumbnailUrl } from './getEntityThumbnailUrl-d6b416fe.js';
import { S as SanitizeDecoratorFactory } from './sanitize-1830cdda.js';
import { createHubEventRegistration, deleteHubEventRegistration } from './edit-fa9666f2.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import { f as fetchEvent } from './fetch-63549ae7.js';
import { a as HubEventCapacityType, H as HubEventAttendanceType } from './types-db540898.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './_commonjsHelpers-11ca3be1.js';
import './index-213c70d0.js';
import './interpolate-d39d6151.js';
import './generate-random-string-1436d9e6.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';
import './get-family-543fac52.js';
import './request-fa80ae40.js';
import './getPropertyMap-10ee9d61.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './helpers-8c7e5e31.js';
import './slugify-e3e67bac.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './search-c7a57aa9.js';
import './append-custom-params-4bd856e5.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

const arcgisHubEntityHeroCss = ".sc-arcgis-hub-entity-hero-h{display:block}";

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisHubEntityHero = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisEntityEdit = createEvent(this, "arcgisEntityEdit", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this._heroActions = [];
    this.handleEditClick = () => {
      // emit an event to swap to the workspace view
      this.arcgisEntityEdit.emit();
    };
    /**
     * Handles clicks to the hero link buttons
     */
    this.handleHeroActionClick = (event) => {
      var _a, _b, _c;
      const idx = Number(event.currentTarget.getAttribute('data-index'));
      const heroAction = ((_c = (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.heroActions) !== null && _c !== void 0 ? _c : [])[idx];
      let telemetry;
      if (heroAction) {
        if (heroAction.kind === 'content') {
          telemetry = dist.dictionary.category.navigation.action.view.label.content;
        }
        else if (heroAction.kind === 'external') {
          telemetry = Object.assign(Object.assign({}, dist.dictionary.category.navigation.action.external.label.link), { details: heroAction.href });
        }
        else if (heroAction.kind === 'well-known') {
          const WELL_KNOWN_ACTION_TELEMETRY = {
            register: null, /* replace `null` with the register telemetry event definition */
          };
          telemetry = WELL_KNOWN_ACTION_TELEMETRY[heroAction.action];
        }
      }
      if (telemetry) {
        this.hubTelemetry.emit({ telemetry, composedPath: event.composedPath() });
      }
    };
    this.entity = undefined;
    this.tooltipRefs = {};
    this.showEdit = false;
  }
  get _context() { return getGlobalContext(); }
  get location() {
    return this.entity.location;
  }
  get hasLocation() {
    var _a;
    return !!(this.location && ((_a = this.location) === null || _a === void 0 ? void 0 : _a.type) !== "none");
  }
  get canEditEntity() {
    const permission = `hub:${this.entityType}:edit`;
    return checkPermission(permission, this._context, this.entity).access;
  }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  get heroActions() {
    return this._heroActions.slice(0, 2);
  }
  get extent() {
    var _a;
    return this.hasLocation ? bBoxToExtent((_a = this.location) === null || _a === void 0 ? void 0 : _a.extent) : undefined;
  }
  get graphics() {
    var _a;
    if (!this.hasLocation) {
      return [];
    }
    const geometries = (_a = this.location.geometries) !== null && _a !== void 0 ? _a : [];
    return geometries.length
      ? geometries.map(geometry => {
        return new Graphic({
          geometry,
          symbol: symbols[geometry.type](SYMBOL_STATE.DEFAULT, defaultLayerThemeOptions[geometry.type]),
        });
      })
      : [
        {
          symbol: symbols.polygon(SYMBOL_STATE.DEFAULT, defaultLayerThemeOptions.polygon),
          geometry: Object.assign({ type: 'extent' }, this.extent),
        },
      ];
  }
  get showMap() {
    var _a, _b;
    return (_b = (_a = this.entity.view) === null || _a === void 0 ? void 0 : _a.showMap) !== null && _b !== void 0 ? _b : false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    await this.init();
  }
  async init() {
    var _a, _b;
    // attempt to initialize the hero actions in case user does not have access to linked content
    try {
      // 1. process the projects hero actions
      const heroActions = ((_b = (_a = this.entity.view) === null || _a === void 0 ? void 0 : _a.heroActions) !== null && _b !== void 0 ? _b : []).map(action => {
        return Object.assign({}, interpolateTranslations(this.intl, action));
      });
      this._heroActions = await processActionLinks(heroActions, this._context.hubRequestOptions);
    }
    catch (error) {
      // swallow it
    }
  }
  /**
   * Show the edit button if the user has permission to edit the entity and the showEdit prop is true
   * This was setup to enable the arcgis-hub-entity-view-wrapper to toggle between the view and workspace
   * in-situ. This is not currently planned behavior for the generic hero, but it's here for future use.
   * @returns
   */
  renderEditButton() {
    // NOTE: at this time, button this is for development purposes only thus not localized
    return ((this.canEditEntity && this.showEdit) ?
      h("calcite-button", { appearance: "solid", "data-element": "primary-action", href: "#", "icon-start": "gear", label: "Edit", onClick: this.handleEditClick, round: true }, "Edit")
      : null);
  }
  renderHeroActions(heroActions = []) {
    return (h(Fragment, null, h("div", { slot: "footer-start" }, heroActions.map((heroAction, index) => (h("div", { key: heroAction.label }, h("calcite-button", { appearance: index === 0 ? 'solid' : 'outline-fill', "data-element": index === 0 ? 'primary-action' : 'secondary-action', "data-index": index, disabled: heroAction.disabled, href: heroAction.kind === 'external' ? heroAction.href : undefined, label: heroAction.label, onClick: this.handleHeroActionClick, ref: (element) => {
        this.tooltipRefs =
          (heroAction.tooltip && this.tooltipRefs[heroAction.tooltip] !== element) ? Object.assign(Object.assign({}, this.tooltipRefs), { [heroAction.tooltip]: element }) : this.tooltipRefs;
      }, round: true }, heroAction.label), this.tooltipRefs[heroAction.tooltip] && h("calcite-tooltip", { referenceElement: this.tooltipRefs[heroAction.tooltip] }, heroAction.tooltip))))), h("div", { slot: "footer-end" }, this.renderEditButton())));
  }
  render() {
    var _a;
    return (h(Host, { "data-element": "entity-hero" }, h("arcgis-hub-content-hero", { extent: this.extent, graphics: this.graphics, "hero-title": (_a = this.entity) === null || _a === void 0 ? void 0 : _a.name, showMap: this.showMap, thumbnailUrl: this.hasLocation && this.showMap ? null : getEntityThumbnailUrl(this.entity) }, h("slot", { name: "footer-start" }), this._heroActions && this.renderHeroActions(this._heroActions))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "entity": ["init"]
  }; }
};
__decorate$1([
  MemoizeDecoratorFactory('_heroActions')
], ArcgisHubEntityHero.prototype, "heroActions", null);
__decorate$1([
  MemoizeDecoratorFactory('location.extent')
], ArcgisHubEntityHero.prototype, "extent", null);
__decorate$1([
  MemoizeDecoratorFactory('location.geometries')
], ArcgisHubEntityHero.prototype, "graphics", null);
ArcgisHubEntityHero.style = arcgisHubEntityHeroCss;

const EVENT_ACTIONS = {
  register: {
    inPerson: {
      success: 'alerts.inPersonRegistrationConfirmed',
      unexpected: 'alerts.inPersonRegistrationError',
      capacity: 'alerts.inPersonRegistrationAtCapacity',
      telemetry: Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.select.label.register.details.event), { type: 'In-person' }),
    },
    online: {
      success: 'alerts.onlineRegistrationConfirmed',
      unexpected: 'alerts.onlineRegistrationError',
      capacity: 'alerts.onlineRegistrationAtCapacity',
      telemetry: Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.select.label.register.details.event), { type: 'Online' }),
    },
  },
  unregister: {
    inPerson: {
      success: 'alerts.inPersonRegistrationCanceled',
      error: 'alerts.inPersonRegistrationCanceledError',
      telemetry: Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.select.label.unregister.details.event), { type: 'In-person' }),
    },
    online: {
      success: 'alerts.onlineRegistrationCanceled',
      error: 'alerts.onlineRegistrationCanceledError',
      telemetry: Object.assign(Object.assign({}, dist.dictionary.category.interaction.action.select.label.unregister.details.event), { type: 'Online' }),
    },
  },
};

const arcgisHubEventActionsCss = ".sc-arcgis-hub-event-actions-h{display:flex;justify-content:flex-start;gap:1rem}.event-details.sc-arcgis-hub-event-actions{margin-bottom:1rem}";

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
const ArcgisHubEventActions = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: dist.constants.response.SUCCESS }));
      })
        .catch(err => {
        var _a;
        const errorType = ((_a = err.error) === null || _a === void 0 ? void 0 : _a.includes('capacity')) ? 'capacity' : 'unexpected';
        this.showNotice(this.intl.t(action[errorType]), 'danger');
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: dist.constants.response.FAILURE }));
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
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: dist.constants.response.SUCCESS }));
        this.userRegistration = null;
      })
        .catch(() => {
        this.showNotice(this.intl.t(action.error), 'danger');
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: dist.constants.response.FAILURE }));
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["handleContextChanged"],
    "identifier": ["handleIdentifierChanged"]
  }; }
};
__decorate([
  SanitizeDecoratorFactory()
], ArcgisHubEventActions.prototype, "sanitizedOnlineDetails", null);
ArcgisHubEventActions.style = arcgisHubEventActionsCss;

export { ArcgisHubEntityHero as arcgis_hub_entity_hero, ArcgisHubEventActions as arcgis_hub_event_actions };
