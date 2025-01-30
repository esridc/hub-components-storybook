'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
const Graphic = require('@arcgis/core/Graphic.js');
const index$2 = require('./index-77afc8bd.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const memoize = require('./memoize-1f967971.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const extent = require('./extent-715f7c8d.js');
const processActionLinks = require('./processActionLinks-c32c67ce.js');
const getEntityThumbnailUrl = require('./getEntityThumbnailUrl-4312f5ce.js');
const sanitize = require('./sanitize-3071ecd6.js');
const edit = require('./edit-2b7ccc3f.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const hubSearch = require('./hubSearch-79d30702.js');
const fetch = require('./fetch-1292fb6b.js');
const types = require('./types-751ad3a9.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-f4a4c954.js');
require('./interpolate-c1fe951a.js');
require('./generate-random-string-8807d629.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');
require('./get-family-cafa88bb.js');
require('./request-67da3c71.js');
require('./getPropertyMap-030ec7b2.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./helpers-64227739.js');
require('./slugify-826af07b.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./search-2db68ef4.js');
require('./append-custom-params-0f5d0fe2.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const Graphic__default = /*#__PURE__*/_interopDefaultLegacy(Graphic);

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
    index.registerInstance(this, hostRef);
    this.arcgisEntityEdit = index.createEvent(this, "arcgisEntityEdit", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
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
          telemetry = index$1.dist.dictionary.category.navigation.action.view.label.content;
        }
        else if (heroAction.kind === 'external') {
          telemetry = Object.assign(Object.assign({}, index$1.dist.dictionary.category.navigation.action.external.label.link), { details: heroAction.href });
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
  get _context() { return state.getGlobalContext(); }
  get location() {
    return this.entity.location;
  }
  get hasLocation() {
    var _a;
    return !!(this.location && ((_a = this.location) === null || _a === void 0 ? void 0 : _a.type) !== "none");
  }
  get canEditEntity() {
    const permission = `hub:${this.entityType}:edit`;
    return checkPermission.checkPermission(permission, this._context, this.entity).access;
  }
  get entityType() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
  }
  get heroActions() {
    return this._heroActions.slice(0, 2);
  }
  get extent() {
    var _a;
    return this.hasLocation ? extent.bBoxToExtent((_a = this.location) === null || _a === void 0 ? void 0 : _a.extent) : undefined;
  }
  get graphics() {
    var _a;
    if (!this.hasLocation) {
      return [];
    }
    const geometries = (_a = this.location.geometries) !== null && _a !== void 0 ? _a : [];
    return geometries.length
      ? geometries.map(geometry => {
        return new Graphic__default['default']({
          geometry,
          symbol: index$2.symbols[geometry.type](index$2.SYMBOL_STATE.DEFAULT, index$2.defaultLayerThemeOptions[geometry.type]),
        });
      })
      : [
        {
          symbol: index$2.symbols.polygon(index$2.SYMBOL_STATE.DEFAULT, index$2.defaultLayerThemeOptions.polygon),
          geometry: Object.assign({ type: 'extent' }, this.extent),
        },
      ];
  }
  get showMap() {
    var _a, _b;
    return (_b = (_a = this.entity.view) === null || _a === void 0 ? void 0 : _a.showMap) !== null && _b !== void 0 ? _b : false;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    await this.init();
  }
  async init() {
    var _a, _b;
    // attempt to initialize the hero actions in case user does not have access to linked content
    try {
      // 1. process the projects hero actions
      const heroActions = ((_b = (_a = this.entity.view) === null || _a === void 0 ? void 0 : _a.heroActions) !== null && _b !== void 0 ? _b : []).map(action => {
        return Object.assign({}, interpolateTranslations.interpolateTranslations(this.intl, action));
      });
      this._heroActions = await processActionLinks.processActionLinks(heroActions, this._context.hubRequestOptions);
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
      index.h("calcite-button", { appearance: "solid", "data-element": "primary-action", href: "#", "icon-start": "gear", label: "Edit", onClick: this.handleEditClick, round: true }, "Edit")
      : null);
  }
  renderHeroActions(heroActions = []) {
    return (index.h(index.Fragment, null, index.h("div", { slot: "footer-start" }, heroActions.map((heroAction, index$1) => (index.h("div", { key: heroAction.label }, index.h("calcite-button", { appearance: index$1 === 0 ? 'solid' : 'outline-fill', "data-element": index$1 === 0 ? 'primary-action' : 'secondary-action', "data-index": index$1, disabled: heroAction.disabled, href: heroAction.kind === 'external' ? heroAction.href : undefined, label: heroAction.label, onClick: this.handleHeroActionClick, ref: (element) => {
        this.tooltipRefs =
          (heroAction.tooltip && this.tooltipRefs[heroAction.tooltip] !== element) ? Object.assign(Object.assign({}, this.tooltipRefs), { [heroAction.tooltip]: element }) : this.tooltipRefs;
      }, round: true }, heroAction.label), this.tooltipRefs[heroAction.tooltip] && index.h("calcite-tooltip", { referenceElement: this.tooltipRefs[heroAction.tooltip] }, heroAction.tooltip))))), index.h("div", { slot: "footer-end" }, this.renderEditButton())));
  }
  render() {
    var _a;
    return (index.h(index.Host, { "data-element": "entity-hero" }, index.h("arcgis-hub-content-hero", { extent: this.extent, graphics: this.graphics, "hero-title": (_a = this.entity) === null || _a === void 0 ? void 0 : _a.name, showMap: this.showMap, thumbnailUrl: this.hasLocation && this.showMap ? null : getEntityThumbnailUrl.getEntityThumbnailUrl(this.entity) }, index.h("slot", { name: "footer-start" }), this._heroActions && this.renderHeroActions(this._heroActions))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "entity": ["init"]
  }; }
};
__decorate$1([
  memoize.MemoizeDecoratorFactory('_heroActions')
], ArcgisHubEntityHero.prototype, "heroActions", null);
__decorate$1([
  memoize.MemoizeDecoratorFactory('location.extent')
], ArcgisHubEntityHero.prototype, "extent", null);
__decorate$1([
  memoize.MemoizeDecoratorFactory('location.geometries')
], ArcgisHubEntityHero.prototype, "graphics", null);
ArcgisHubEntityHero.style = arcgisHubEntityHeroCss;

const EVENT_ACTIONS = {
  register: {
    inPerson: {
      success: 'alerts.inPersonRegistrationConfirmed',
      unexpected: 'alerts.inPersonRegistrationError',
      capacity: 'alerts.inPersonRegistrationAtCapacity',
      telemetry: Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.select.label.register.details.event), { type: 'In-person' }),
    },
    online: {
      success: 'alerts.onlineRegistrationConfirmed',
      unexpected: 'alerts.onlineRegistrationError',
      capacity: 'alerts.onlineRegistrationAtCapacity',
      telemetry: Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.select.label.register.details.event), { type: 'Online' }),
    },
  },
  unregister: {
    inPerson: {
      success: 'alerts.inPersonRegistrationCanceled',
      error: 'alerts.inPersonRegistrationCanceledError',
      telemetry: Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.select.label.unregister.details.event), { type: 'In-person' }),
    },
    online: {
      success: 'alerts.onlineRegistrationCanceled',
      error: 'alerts.onlineRegistrationCanceledError',
      telemetry: Object.assign(Object.assign({}, index$1.dist.dictionary.category.interaction.action.select.label.unregister.details.event), { type: 'Online' }),
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
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
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
      const attendanceType = ((_b = (_a = evt.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.value) || (this.entity.attendanceType === types.HubEventAttendanceType.InPerson ? 'inPerson' : 'online');
      this.actionPending = true;
      const action = EVENT_ACTIONS.register[attendanceType];
      return edit.createHubEventRegistration({
        eventId: this.entity.id,
        role: 'ATTENDEE',
        type: attendanceType === 'inPerson' ? 'IN_PERSON' : 'VIRTUAL',
      }, this._context.hubRequestOptions)
        .then(registration => {
        this.userRegistration = registration;
        this.showNotice(this.intl.t(action.success), 'success');
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: index$1.dist.constants.response.SUCCESS }));
      })
        .catch(err => {
        var _a;
        const errorType = ((_a = err.error) === null || _a === void 0 ? void 0 : _a.includes('capacity')) ? 'capacity' : 'unexpected';
        this.showNotice(this.intl.t(action[errorType]), 'danger');
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: index$1.dist.constants.response.FAILURE }));
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
      return edit.deleteHubEventRegistration(this.userRegistration.id, this._context.hubRequestOptions)
        .then(() => {
        this.showNotice(this.intl.t(action.success), 'success');
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: index$1.dist.constants.response.SUCCESS }));
        this.userRegistration = null;
      })
        .catch(() => {
        this.showNotice(this.intl.t(action.error), 'danger');
        this.hubTelemetry.emit(Object.assign(Object.assign({}, action.telemetry), { response: index$1.dist.constants.response.FAILURE }));
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
    this._context = state.getGlobalContext();
    this.identifier = undefined;
    this.entity = undefined;
  }
  /**
   * Loads the user's registration record when the user changes (signs in or signs out)
   * @param context The current IArcGISContext object
   * @param prevContext The previous IArcGISContext object
   */
  async handleContextChanged(context, prevContext) {
    const currentUserId = getProp.getProp(context, 'currentUser.id');
    const prevUserId = getProp.getProp(prevContext, 'currentUser.id');
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
    state.connectContext(this);
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
        const { results: [registration], } = await hubSearch.hubSearch({
          targetEntity: 'eventAttendee',
          filters: [
            {
              predicates: [{ userId: getProp.getProp(this._context.currentUser, 'id') }],
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
      this.entity = await fetch.fetchEvent(this.identifier, this._context.hubRequestOptions);
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
    state.showNotice({
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
    return this.entity.onlineCapacityType === types.HubEventCapacityType.Fixed && this.entity.onlineRegistrationCount >= this.entity.onlineCapacity;
  }
  /**
   * Returns true when in-person attendance is at maximum capacity
   */
  get inPersonAttendanceFull() {
    return this.entity.inPersonCapacityType === types.HubEventCapacityType.Fixed && this.entity.inPersonRegistrationCount >= this.entity.inPersonCapacity;
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
    return this.entity.attendanceType === types.HubEventAttendanceType.InPerson;
  }
  /**
   * Returns true when the event is configured for online attendance
   */
  get isOnline() {
    return this.entity.attendanceType === types.HubEventAttendanceType.Online;
  }
  /**
   * Returns true when the event is configured for both in-person & online attendance
   */
  get isHybrid() {
    return this.entity.attendanceType === types.HubEventAttendanceType.Both;
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
      return (index.h(index.Fragment, null, index.h("calcite-button", { appearance: "solid", disabled: this.isRegisterActionDisabled || this.actionPending, id: "register-button", label: this.intl.t('actions.register'), loading: this.actionPending, onClick: this.handleRegistration, round: true }, this.intl.t('actions.register')), this.registerButtonTooltipText && index.h("calcite-tooltip", { referenceElement: "register-button" }, this.registerButtonTooltipText)));
    }
  }
  /**
   * Renders the `Register` dropdown
   */
  renderRegisterMenu() {
    if (this.isHybrid && !this.userRegistration) {
      return (index.h(index.Fragment, null, index.h("calcite-dropdown", { onCalciteDropdownClose: this.handleDropdownToggled, onCalciteDropdownOpen: this.handleDropdownToggled }, index.h("calcite-button", { appearance: "solid", disabled: this.isRegisterActionDisabled || this.actionPending, "icon-end": this.registrationDropdownOpen ? 'chevron-up' : 'chevron-down', id: "register-menu", label: this.intl.t('actions.register'), loading: this.actionPending, round: true, slot: "trigger" }, this.intl.t('actions.register')), index.h("calcite-dropdown-group", null, index.h("calcite-dropdown-item", { "data-value": "inPerson", disabled: this.inPersonAttendanceFull, onCalciteDropdownItemSelect: this.handleRegistration }, this.intl.t(this.inPersonAttendanceFull ? 'actions.inPersonFull' : 'actions.in-person')), index.h("calcite-dropdown-item", { "data-value": "online", disabled: this.onlineAttendanceFull, onCalciteDropdownItemSelect: this.handleRegistration }, this.intl.t(this.onlineAttendanceFull ? 'actions.onlineFull' : 'actions.online')))), this.registerButtonTooltipText && index.h("calcite-tooltip", { referenceElement: "register-menu" }, this.registerButtonTooltipText)));
    }
  }
  /**
   * Renders the `Registered` button
   */
  renderRegisteredButton() {
    if (this.userRegistration) {
      return (index.h(index.Fragment, null, index.h("calcite-button", { appearance: "outline", disabled: this.isRegisteredActionDisabled || this.actionPending, "icon-start": this.actionPending ? null : 'check-circle', id: "registered-button", label: this.intl.t('actions.registered'), loading: this.actionPending, onClick: this.handleDeregistration, round: true }, this.intl.t('actions.registered')), this.registeredButtonTooltipText && index.h("calcite-tooltip", { referenceElement: "registered-button" }, this.registeredButtonTooltipText)));
    }
  }
  /**
   * Renders the `Join online` button
   */
  _renderJoinButton(icon, href, target, onClick) {
    return (index.h(index.Fragment, null, index.h("calcite-button", { appearance: "solid", disabled: this.isJoinButtonDisabled, href: href, "icon-end": icon, id: "join-button", label: this.intl.t('actions.join'), onClick: onClick, round: true, target: target }, this.intl.t('actions.join')), this.joinButtonTooltipText && index.h("calcite-tooltip", { referenceElement: "join-button" }, this.joinButtonTooltipText)));
  }
  /**
   * Renders the `Join online` button + modal when online event details are configured
   */
  renderJoinButtonWithModal() {
    return (index.h(index.Fragment, null, this._renderJoinButton(null, null, null, this.handleJoinButtonClick), index.h("calcite-modal", { "aria-labelledby": "modal-header", onCalciteModalClose: this.handleJoinModalClose, open: this.onlineDetailsModalOpen }, index.h("div", { id: "modal-header", slot: "header" }, this.intl.t('actions.join')), index.h("div", { slot: "content" }, index.h("div", { class: "event-details", innerHTML: this.sanitizedOnlineDetails }), index.h("calcite-link", { href: this.entity.onlineUrl, iconEnd: "launch", target: "_blank" }, this.intl.t('actions.join'))), index.h("calcite-button", { appearance: "outline", onClick: this.handleJoinModalClose, round: true, slot: "secondary", width: "full" }, this.intl.t('actions.close')))));
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
    return (index.h(index.Host, { "data-element": "event-actions" }, ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.allowRegistration) && Boolean(this._context.currentUser) && (index.h(index.Fragment, null, this.renderRegisterButton(), this.renderRegisterMenu(), this.renderRegisteredButton(), this.renderJoinButton()))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "_context": ["handleContextChanged"],
    "identifier": ["handleIdentifierChanged"]
  }; }
};
__decorate([
  sanitize.SanitizeDecoratorFactory()
], ArcgisHubEventActions.prototype, "sanitizedOnlineDetails", null);
ArcgisHubEventActions.style = arcgisHubEventActionsCss;

exports.arcgis_hub_entity_hero = ArcgisHubEntityHero;
exports.arcgis_hub_event_actions = ArcgisHubEventActions;
