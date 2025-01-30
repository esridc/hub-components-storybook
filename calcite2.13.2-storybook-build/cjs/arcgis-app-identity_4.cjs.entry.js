'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const contextManager = require('./context-manager-487e7fe6.js');
const state = require('./state-6637df8c.js');
const ArcGISContextManager = require('./ArcGISContextManager-c5cc74e9.js');
const UserSession = require('./UserSession-f8bc10c8.js');
const intlManager = require('./intl-manager-f0103583.js');
const resetNotice = require('./resetNotice-1e1fb605.js');
const context = require('./context-0167a31e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const urls = require('./urls-2533c98f.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const logger = require('./logger-5db3d659.js');
const util = require('./util-38e73510.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
require('./request-67da3c71.js');
require('./encoding-211adb23.js');
require('./index-058372c1.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./fail-safe-33c35b7f.js');
require('./get-prop-4bd8fc1a.js');
require('./get-with-default-d1b1754d.js');
require('./get-user-5eecc1c4.js');
require('./tslib.es6-e7faa7f3.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./index-f4a4c954.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./map-by-a7a75788.js');
require('./compose-9b4311c9.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./getTypeFromEntity-9476954e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./append-custom-params-0f5d0fe2.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./delete-prop-7826ae49.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./fetch-org-d214b65b.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');

const arcgisAppIdentityCss = ":host{display:block}";

const contextManagerUpdated = (updated, persist) => {
  state.setGlobalContext(updated.context);
  if (persist) {
    contextManager.storeContextManager(updated);
  }
};
const ArcgisAppIdentity = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.signInCompleted = index.createEvent(this, "arcgisAppIdentitySignedIn", 7);
    this.signOutCompleted = index.createEvent(this, "arcgisAppIdentitySignedOut", 7);
    this.clientId = undefined;
    this.redirectUri = undefined;
    this.popup = true;
    this.persist = true;
    this.features = undefined;
    this.flags = {};
    this.portal = "https://www.arcgis.com";
    this.mode = 'html';
    this.contextManager = undefined;
  }
  async portalUpdated() {
    this.contextManager = await ArcGISContextManager.ArcGISContextManager.create({ portalUrl: this.portal, featureFlags: this.flags });
    contextManagerUpdated(this.contextManager, this.persist);
  }
  /**
   * Sharing API base url
   */
  get sharingApiUrl() {
    return `${this.portal}/sharing/rest`;
  }
  async onSignInHandler(event) {
    console.info(`app-identity: Caught start signin event. Using ${this.portal}, ${this.clientId}`, event);
    const session = await UserSession.UserSession.beginOAuth2({ clientId: this.clientId, redirectUri: this.redirectUri, portal: this.sharingApiUrl });
    this.contextManager = await ArcGISContextManager.ArcGISContextManager.create({ portalUrl: this.portal, authentication: session, featureFlags: this.flags });
    contextManagerUpdated(this.contextManager, this.persist);
    console.info(`app-identity: sign-in complete: emitting ArcGISContext ${this.contextManager.id}`);
    this.signInCompleted.emit(this.contextManager.context);
  }
  async onSignOutHandler() {
    console.info(`app-identity: sign-out for ${this.contextManager.id}`);
    this.contextManager.clearAuthentication();
    contextManagerUpdated(this.contextManager, this.persist);
    console.info(`app-identity: sign-out complete. ${this.contextManager.id} isAuthenticated? ${this.contextManager.context.isAuthenticated}`);
    this.signOutCompleted.emit(this.contextManager.context);
  }
  componentWillLoad() {
    console.info(`app-identity: componentWillLoad`);
    // Only create internal ArcGISContext if in html mode
    if (this.mode === 'html' && !this.contextManager) {
      console.info(`app-identity: creating ArcGISContext based on attrs...`);
      this._initContextManager();
      console.info(`app-identity: created.`);
    }
  }
  componentWillRender() {
    var _a;
    console.info(`app-identity: componentWillRender`);
    const context = (_a = this.contextManager) === null || _a === void 0 ? void 0 : _a.context;
    if ((context === null || context === void 0 ? void 0 : context.isAuthenticated) && this.mode === 'html') {
      // Only raise this event if this is in html mode
      console.info(`app-identity: rendered, emitting signInCompleted w ArcGISContext`);
      this.signInCompleted.emit(context);
    }
  }
  componentDidRender() {
    var _a;
    console.info(`app-identity: componentDidRender`);
    const context = (_a = this.contextManager) === null || _a === void 0 ? void 0 : _a.context;
    if ((context === null || context === void 0 ? void 0 : context.isAuthenticated) && this.mode === 'html') {
      // Only raise this event if this is in html mode
      console.info(`app-identity: rendered, emitting signInCompleted w ArcGISContext`);
      this.signInCompleted.emit(context);
    }
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null)));
  }
  async _initContextManager() {
    // this.contextManager = await initContextManager(this.portal, this.persist)
    const context = state.getGlobalContext();
    // TODO: add a static fromContext() method to get a new manager from a context
    const fromState = context && await ArcGISContextManager.ArcGISContextManager.create({
      authentication: context.session,
      portalUrl: context.portalUrl,
      portal: context.portal,
      currentUser: context.currentUser,
      trustedOrgs: context.trustedOrgs,
      trustedOrgIds: context.trustedOrgIds,
      featureFlags: context.featureFlags,
      // logLevel: context.???,
      properties: context.properties,
      serviceStatus: context.serviceStatus
    });
    const existing = fromState || (this.persist
      ? await contextManager.retrieveContextManager()
      : undefined);
    this.contextManager = existing || await ArcGISContextManager.ArcGISContextManager.create({
      portalUrl: this.portal
    });
    contextManagerUpdated(this.contextManager, this.persist);
  }
  static get watchers() { return {
    "portal": ["portalUpdated"]
  }; }
};
ArcgisAppIdentity.style = arcgisAppIdentityCss;

/**
 * Returns true if any of the the places specifid in the notice match the provided place
 *
 * @export
 * @param {IHubNotice} notice
 * @param {string} place
 * @return {*}  {boolean}
 */
function placesMatch(notice, place) {
  return !(notice === null || notice === void 0 ? void 0 : notice.places) || notice.places.some(p => {
    // eslint-disable-next-line unicorn/prefer-ternary
    if (typeof p === 'string') {
      return p === place;
    }
    else {
      return p.test(place);
    }
  });
}
/**
 * Returns true if all the dates on the notice match
 *
 * @export
 * @param {IHubNotice} notice
 * @return {*}  {boolean}
 */
/**
 * Returns true if all the dates on the notice match
 *
 * @export
 * @param {IHubNotice} notice
 * @return {*}  {boolean}
 */
function datesMatch(notice) {
  const now = new Date();
  const startDateMatches = !(notice === null || notice === void 0 ? void 0 : notice.startDate) || new Date(notice.startDate) <= now;
  const endDateMatches = !(notice === null || notice === void 0 ? void 0 : notice.endDate) || now <= new Date(notice.endDate);
  return startDateMatches && endDateMatches;
}
/**
 * Returns true if all the permissions on the notice match
 *
 * @export
 * @param {IHubNotice} notice
 * @param {IArcGISContext} context
 * @return {*}  {boolean}
 */
function permissionsMatch(notice, context) {
  return !(notice === null || notice === void 0 ? void 0 : notice.permissions) || notice.permissions.every(p => checkPermission.checkPermission(p.permission, context).access === p.access);
}

const arcgisHubNoticeCss = ":host{display:block}slot[name='actions']{display:flex;gap:0.75rem}calcite-notice slot[name='actions']{margin-top:1rem}calcite-modal calcite-label[slot='back']{--calcite-label-margin-bottom:0;height:100%}calcite-modal [slot='header']>*{margin:0px;font-weight:var(--calcite-font-weight-bold)}.popover-reference{display:inline-block}.popover-content{padding:0.75rem}.popover-content slot[name='actions']:has(*){margin-top:1rem}";

const ArcgisHubNotice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubNoticeClose = index.createEvent(this, "arcgisHubNoticeClose", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    // has the user checked the "do not show this again" checkbox on the modal
    this.shouldDismiss = false;
    this.noticeId = undefined;
    this.notice = undefined;
    this.place = undefined;
    this.popoverRef = undefined;
    context.bind(this, 'closeNotice', 'handleActionClick', 'onNoticeClose', 'onNoticeOpen', 'onDismissChecked', 'setNoticeElement');
  }
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  componentShouldUpdate(newVal, oldVal, changedProp) {
    // NOTE: this is to avoid over-rendering when ad-hoc notices are pushed into the store
    // if place or noticeId changes we will re-render, if auth changes the notice-provider will cause a re-render
    let result = newVal !== oldVal;
    if (changedProp === 'notice') {
      // NOTE: checking only the id
      // means that if the props of the notice change, we will NOT re-render
      // if that could happen we either need to remove this or check for changes differently below
      result = newVal.id !== oldVal.id;
    }
    return result;
  }
  get _notice() {
    return this.notice || state.getPreconfiguredNotice(this.noticeId, this._context);
  }
  /**
  * Whether or not the notice should be shown
  * @readonly
  * @type {boolean}
  * @memberof ArcgisHubNotice
  */
  get shouldShowNotice() {
    /*
      We show it if:
        - we have a notification
        - it is not marked as deleted
        - if it has a place specified it matches
        - if it has dates specified, they match
        - if it has permissions specified, they are granted
        - it is not dismissable or it is dismissable and shouldShowNotice returns true (which means it has not been dismissed)
    */
    var _a, _b, _c, _d;
    const _isNotDeleted = !((_a = this._notice) === null || _a === void 0 ? void 0 : _a.deleted);
    const _placesMatch = placesMatch(this._notice, this.place);
    const _datesMatch = datesMatch(this._notice);
    const _permissionsMatch = permissionsMatch(this._notice, this._context);
    const _shouldShowNotice = !((_b = this._notice) === null || _b === void 0 ? void 0 : _b.dismissable) || resetNotice.shouldShowNotice((_c = this._notice) === null || _c === void 0 ? void 0 : _c.id, this._context);
    const shouldShow = !!this._notice
      && _isNotDeleted
      && _placesMatch
      && _datesMatch
      && _permissionsMatch
      && (!this._notice.dismissable || _shouldShowNotice);
    if (!shouldShow) {
      const messages = [];
      if (!this._notice) {
        messages.push('notice not specified or not found in config');
      }
      if (!_isNotDeleted) {
        messages.push('notice is marked as deleted');
      }
      if (!_placesMatch) {
        messages.push('place does not match');
      }
      if (!_datesMatch) {
        messages.push('dates do not match');
      }
      if (!_permissionsMatch) {
        messages.push('permissions do not match');
      }
      if (!_shouldShowNotice) {
        messages.push('notice is dismissable and has been dismissed');
      }
      const msg = `Notice ${(_d = this._notice) === null || _d === void 0 ? void 0 : _d.id} not shown: ${messages.join(', ')}`;
      logger.Logger.debug(msg);
    }
    return shouldShow;
  }
  // /**
  //  * Exposed as a method for testing purposes
  //  * We do not expect this to be used in production
  //  * @returns
  //  */
  _resetNotice() {
    return resetNotice.resetNotice(this._notice.id, this._context);
  }
  setNoticeElement(el) {
    this.noticeElement = el;
  }
  /**
   * Event handler for the change event of the dismiss checkbox
   *
   * @param {CalciteCheckboxCustomEvent<boolean>} evt
   * @memberof ArcgisHubNotice
   */
  onDismissChecked(evt) {
    // when the dismiss checkbox is checked, we keep track of that
    // and use it when the modal is dismissed
    const { checked, name } = evt.target;
    this[name] = checked;
  }
  /**
   * Event handler for the close event of the underlying calcite components (notice, alert, modal)
   *
   * @return {*}  {Promise<void>}
   * @memberof ArcgisHubNotice
   */
  async onNoticeClose() {
    var _a, _b, _c, _d;
    let result;
    if ((_a = this._notice.telemetry) === null || _a === void 0 ? void 0 : _a.close) {
      this.hubTelemetry.emit(this._notice.telemetry.close);
    }
    if ((_b = this._notice.callbacks) === null || _b === void 0 ? void 0 : _b.onClose) {
      this._notice.callbacks.onClose();
    }
    // if it is dismissable
    // and either it is not a modal
    // or it is a modal and the dismiss checkbox is checked
    if (this._notice.dismissable && (((_c = this._notice.configuration) === null || _c === void 0 ? void 0 : _c.noticeType) !== 'modal' || this.shouldDismiss)) {
      if ((_d = this._notice.telemetry) === null || _d === void 0 ? void 0 : _d.dismiss) {
        this.hubTelemetry.emit(this._notice.telemetry.dismiss);
      }
      result = resetNotice.dismissNotice(this._notice.id, this._context);
    }
    // we want to do this last because it may cause this component to be removed from the dom
    // but we want to return the dismissNotice promise
    this.arcgisHubNoticeClose.emit(this._notice);
    return result;
  }
  /**
  * Handle the click event on the actions
  * @param {MouseEvent} evt
  * @return {*}  {Promise<void>}
  * @memberof ArcgisHubNotice
  */
  async handleActionClick(evt) {
    const action = this._notice.actions[evt.target.dataset.actionIndex];
    const { href, target } = action;
    if (action.telemetry) {
      this.hubTelemetry.emit(action.telemetry);
    }
    if (href) {
      const isFullyQualified = href.startsWith('http');
      if (target === '_blank') ;
      else {
        if (isFullyQualified) {
          // we are following a link outside the app
          // in this case we need to wait for async work to complete
          // before following the link (because following the link will flush the app)
          // so we have to explicitly call onNoticeClose
          evt.preventDefault();
          await this.onNoticeClose();
          urls.redirectToExternalUrl(href);
        }
        else {
          // if it is not fully qualified, we will close the notice
          // because we are following a link within the app
          // this will then cause onNoticeClose to be called
          await this.closeNotice();
        }
      }
    }
  }
  /**
   * Close the underlying calcite component (notice, alert, modal)
   *
   * @memberof ArcgisHubNotice
   */
  closeNotice() {
    if (this.noticeElement) {
      this.noticeElement.open = false;
    }
  }
  onNoticeOpen() {
    var _a, _b;
    if ((_a = this._notice.telemetry) === null || _a === void 0 ? void 0 : _a.open) {
      this.hubTelemetry.emit(this._notice.telemetry.open);
    }
    if ((_b = this._notice.callbacks) === null || _b === void 0 ? void 0 : _b.onOpen) {
      this._notice.callbacks.onOpen();
    }
  }
  /**
  * Get a string from the notice object or the i18n file
  * @param {string} key
  * @return {*}  {string}
  * @memberof ArcgisHubNotice
  */
  getString(key) {
    var _a;
    const noticeId = this.noticeId || this._notice.id;
    let result = this._notice[key];
    if (key === 'label') {
      // label is on the config object for alerts
      result = (_a = this._notice.configuration) === null || _a === void 0 ? void 0 : _a[key];
    }
    if (!result && noticeId) {
      // if we don't have the string and we can construct an intl key, attempt to do so
      const noticeValues = this._notice.intlValues;
      const fallback = 'string-not-found';
      // NOTE: if you are seeing missing translation messages and have traced it to here, be aware that notices of type alert should include a label either on the config object or in the translation file
      result = this.intl.t(`notice.${noticeId}.${key}`, Object.assign({}, noticeValues), { fallback });
      // if the string we got back is the fallback, that means there was no translation so we will return undefined
      result = result === fallback ? undefined : result;
    }
    return result;
  }
  /**
  * Render an action as a button or link
  * @param {IHubNoticeAction} action
  * @param {number} index
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  _renderAction(action, index$1) {
    const key = `${this._notice.id}_${index$1}`;
    const intlKey = `notice.${this._notice.id}.actions.${index$1}.text`;
    let ariaLabel = action.ariaLabel || this.intl.t(intlKey);
    if (action.i18nAriaLabelKey) {
      ariaLabel = this.intl.t(`notice.${this._notice.id}.actions.${index$1}.${action.i18nAriaLabelKey}`);
    }
    // const clickHandler = action.target !== '_blank' ? undefined : this.closeModal;
    // eslint-disable-next-line unicorn/prefer-ternary
    if (action.buttonStyle) {
      return index.h("calcite-button", { appearance: action.buttonStyle, "data-action-index": index$1, disabled: action.disabled, href: action.href, iconEnd: action.icon, key: key, label: ariaLabel, onClick: this.handleActionClick, round: true, target: action.target }, action.label || this.intl.t(intlKey));
    }
    else {
      return index.h("calcite-link", { "data-action": action.action, "data-action-index": index$1, disabled: action.disabled, href: action.href, iconEnd: action.target === '_blank' ? 'launch' : null, iconStart: action.icon, key: key, label: ariaLabel, onClick: this.handleActionClick, target: action.target }, action.label || this.intl.t(intlKey));
    }
  }
  /**
  * Render the actions configured for the notice
  * @param {string} slotName
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  _renderActions(slotName) {
    return index.h("slot", { name: "actions", slot: slotName }, (this._notice.actions || []).map((action, idx) => {
      return this._renderAction(action, idx);
    }));
  }
  /**
   * During the Calcite v1.11 bump, Jupe and I (Aaron) worked to resolve
   * a bug where the icon prop set to a boolean would prevent the text from rendering
   *
   * This is a temporary fix to ensure that the text is rendered until Calcite can resolve the issue
   *
   * Jupe found an existing bug report of this during our investigation
   */
  get _getAlertIconName() {
    var _a;
    switch ((_a = this._notice.configuration) === null || _a === void 0 ? void 0 : _a.kind) {
      case 'danger':
      case 'warning':
        return 'exclamation-mark-triangle';
      case 'info':
        return 'information';
      case 'success':
        return 'check-circle';
      case 'brand':
        return 'lightbulb';
    }
  }
  /**
  * Render a notice of type alert
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderAlert() {
    const title = this.getString('title');
    const label = this.getString('label') || title;
    const defaultProps = { kind: 'brand', scale: 'm' };
    const nonOverrideableProps = { open: true, placement: 'top-end', label, width: 'auto' };
    const configuration = util.cloneObject(this._notice.configuration);
    // TODO: remove this when the bug is fixed in Calcite
    // https://github.com/Esri/calcite-design-system/issues/9567
    configuration.icon = this._getAlertIconName;
    const props = Object.assign(Object.assign(Object.assign({}, defaultProps), nonOverrideableProps), configuration);
    return (index.h("calcite-alert", Object.assign({}, props, { onCalciteAlertClose: this.onNoticeClose, onCalciteAlertOpen: this.onNoticeOpen, ref: this.setNoticeElement }), index.h("div", { slot: "title" }, title), index.h("div", { innerHTML: this.getString('message'), slot: "message" }), this._renderActions('link')));
  }
  /**
  * Render a notice of type notice
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderNotice() {
    const defaultProps = { closable: true, kind: 'brand', scale: 'm' };
    const nonOverrideableProps = { open: true, width: 'auto' };
    const props = Object.assign(Object.assign(Object.assign({}, defaultProps), this._notice.configuration), nonOverrideableProps);
    return (index.h("calcite-notice", Object.assign({}, props, { onCalciteNoticeClose: this.onNoticeClose, onCalciteNoticeOpen: this.onNoticeOpen, ref: this.setNoticeElement }), index.h("div", { slot: "title" }, this.getString('title')), index.h("div", { innerHTML: this.getString('message'), slot: "message" }), this._renderActions('link')));
  }
  /**
  * Render a notice of type modal
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderModal() {
    // we don't need any defaults because undefined works for all of them
    const defaultProps = {};
    const nonOverrideableProps = { open: true };
    const props = Object.assign(Object.assign(Object.assign({}, defaultProps), this._notice.configuration), nonOverrideableProps);
    return (index.h("calcite-modal", Object.assign({}, props, { onCalciteModalClose: this.onNoticeClose, onCalciteModalOpen: this.onNoticeOpen, ref: this.setNoticeElement }), index.h("div", { slot: "header" }, index.h("h3", null, this.getString('title'))), index.h("div", { innerHTML: this.getString('message'), slot: "content" }), this._notice.dismissable &&
      index.h("calcite-label", { appearance: "clear", layout: "inline", slot: "back" }, index.h("calcite-checkbox", { checked: this.shouldDismiss, name: "shouldDismiss", onCalciteCheckboxChange: this.onDismissChecked }), this.intl.t('modal.dismiss')), index.h("calcite-button", { appearance: "outline", onClick: this.closeNotice, round: true, slot: "secondary" }, this.intl.t('modal.close')), this._renderActions('primary')));
  }
  /**
  * Render a notice of type popover
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderPopover() {
    const defaultProps = { closable: true, scale: 'm' };
    const nonOverrideableProps = { heading: this.getString('title') };
    const props = Object.assign(Object.assign(Object.assign({}, defaultProps), this._notice.configuration), nonOverrideableProps);
    return index.h(index.Fragment, null, index.h("div", { class: "popover-reference", ref: (el) => this.popoverRef = el }, index.h("slot", { name: "popover-reference" })), this.popoverRef && index.h("calcite-popover", Object.assign({}, props, { onCalcitePopoverClose: this.onNoticeClose, onCalcitePopoverOpen: this.onNoticeOpen, ref: this.setNoticeElement, referenceElement: this.popoverRef }), index.h("div", { class: "popover-content" }, index.h("div", { innerHTML: this.getString('message') }), this._renderActions(''))));
  }
  render() {
    var _a;
    if (this.shouldShowNotice) {
      switch ((_a = this._notice.configuration) === null || _a === void 0 ? void 0 : _a.noticeType) {
        case 'notice':
          return this.renderNotice();
        case 'alert':
          return this.renderAlert();
        case 'modal':
          return this.renderModal();
        case 'popover':
          return this.renderPopover();
        default:
          return null;
      }
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubNotice.style = arcgisHubNoticeCss;

const arcgisHubNoticeProviderCss = ":host{position:absolute;z-index:1045}";

const ArcgisHubNoticeProvider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onCloseNotice = (evt) => {
      // if it is in the store, remove it
      state.removeNotice(evt.detail.id);
    };
    this.place = undefined;
    this.autoShowDisabled = undefined;
  }
  get _context() { return state.getGlobalContext(); }
  /**
  * An array of preconfigured notices that should be automatically shown
  * @readonly
  * @private
  * @memberof ArcgisHubNoticeProvider
  */
  get preConfigured() {
    let result = [];
    if (!this.autoShowDisabled) {
      const isNotInline = (n) => {
        return ['alert', 'modal'].includes(n.configuration.noticeType);
      };
      // we attempt to show the configured ones if they are not inline and autoShow is true
      // the child component will do further checks to see if it should be shown
      const configuredNotices = state.getPreconfiguredNotices(this._context);
      result = Object.values(configuredNotices).filter(n => n.autoShow && isNotInline(n));
    }
    return result;
  }
  /**
  * An array of notices that are pushed to the global state
  * @readonly
  * @private
  * @memberof ArcgisHubNoticeProvider
  */
  get onDemand() {
    return state.getNotices();
  }
  /**
  * An array of all notices that should be rendered
  * @readonly
  * @private
  * @memberof ArcgisHubNoticeProvider
  */
  get notices() {
    return [...this.preConfigured, ...this.onDemand];
  }
  render() {
    return (index.h(index.Host, { "data-element": "hub-notice-provider" }, this.notices.map(a => {
      return index.h("arcgis-hub-notice", { id: a.id, key: a.id, notice: a, onArcgisHubNoticeClose: this.onCloseNotice, place: this.place });
    })));
  }
};
ArcgisHubNoticeProvider.style = arcgisHubNoticeProviderCss;

const harnessHeaderCss = "calcite-navigation{position:fixed;top:0;left:0;right:0;z-index:1}calcite-chip{cursor:pointer}";

const getContextEnvironment = context => {
  const contextEnv = context === null || context === void 0 ? void 0 : context.environment;
  return contextEnv
    ? contextEnv === 'production'
      ? 'prod'
      : contextEnv.replace('ext', '')
    : undefined;
};
const ENVIRONMENTS = {
  qa: {
    // itemId: '2bc7844793a84037a9cf8e8f93187971',
    clientId: 'Lmafo8GvkSnPwbek',
    portal: 'https://qaext.arcgis.com'
  },
  dev: {
    // itemId: '2157ac058755404c8512fe415b9e8fad',
    clientId: '7zaXMmruGTX0FMzR',
    portal: 'https://devext.arcgis.com'
  },
  prod: {
    // itemId: 'cc9ee3398ec844b18319746b56f563ab',
    clientId: 'bHypqtyn5UaaJ1Zt',
    portal: 'https://www.arcgis.com'
  }
};
const DEFAULT_ENVIRONMENT = 'qa';
const HarnessHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onChangeEnv = (evt) => {
      // NOTE: this updates the portal we pass into arcgis-app-identity
      // which in turn updates the global context
      this.environment = evt.target.value;
    };
    this.pageTitle = undefined;
    this.environment = undefined;
    this.flags = {};
  }
  get _context() { return state.getGlobalContext(); }
  componentWillLoad() {
    // if environment is not passed in, assume the default
    if (!this.environment) {
      this.environment = DEFAULT_ENVIRONMENT;
      // if we also have context, use that to determine the environment
      if (this._context) {
        this.environment = getContextEnvironment(this._context) || DEFAULT_ENVIRONMENT;
      }
    }
  }
  get identityConfig() {
    return Object.assign({ flags: this.flags }, ENVIRONMENTS[this.environment]);
  }
  get isGhPages() {
    return (window.location.pathname.includes('/harnesses'));
  }
  get redirectUri() {
    const result = new URL(window.location.origin);
    result.pathname = '/html/redirect.html';
    if (this.isGhPages) {
      result.pathname = '/harnesses/html/redirect.html';
    }
    return result.toString();
  }
  get logoUri() {
    return `${this.homeUri}build/assets/ArcGIS_Hub_Hexagon_256.png`;
  }
  get homeUri() {
    let result = '/';
    if (this.isGhPages) {
      result = '/harnesses/';
    }
    return result;
  }
  signIn() {
    const evt = new CustomEvent('arcgisAppIdentityStartSignIn');
    document.dispatchEvent(evt);
  }
  signOut() {
    const evt = new CustomEvent('arcgisAppIdentityStartSignOut');
    document.dispatchEvent(evt);
  }
  onSignedIn(evt) {
    var _a;
    const context = evt.detail;
    if (context.session.clientId !== ((_a = this.identityConfig) === null || _a === void 0 ? void 0 : _a.clientId)) {
      // there was auth stuff in localstorage but it does not match the requested environment so we will log out
      evt.stopPropagation();
      const signOutEvt = new CustomEvent('arcgisAppIdentityStartSignOut');
      document.dispatchEvent(signOutEvt);
    }
  }
  renderAuth() {
    var _a, _b;
    const currentUser = (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser;
    const session = (_b = this._context) === null || _b === void 0 ? void 0 : _b.session;
    const results = [];
    results.push(index.h("calcite-chip-group", { label: "environment", "selection-mode": "single", slot: "content-end" }, Object.keys(ENVIRONMENTS).map(env => {
      return index.h("calcite-chip", { key: env, onCalciteChipSelect: this.onChangeEnv, selected: env === this.environment, value: env }, env);
    })));
    if (currentUser) {
      results.push(index.h("calcite-navigation-user", { "full-name": currentUser.fullName, slot: "user", thumbnail: currentUser.thumbnail && HubInitiatives.getUserThumbnailUrl(session.portal, currentUser, session.token), "user-id": currentUser.id, username: currentUser.username }));
      results.push(index.h("calcite-action", { onClick: this.signOut, scale: "l", slot: "user", text: "Sign Out", "text-enabled": true }));
    }
    else {
      results.push(index.h("calcite-action", { onClick: this.signIn, scale: "l", slot: "user", text: "Sign In", "text-enabled": true }));
    }
    return results;
  }
  render() {
    return (index.h(index.Host, null, index.h("arcgis-hub-notice-provider", null), index.h("calcite-navigation", { slot: "header" }, index.h("calcite-navigation-logo", { heading: "Home", href: this.homeUri, slot: "navigation-action", thumbnail: this.logoUri }), index.h("calcite-navigation-logo", { heading: this.pageTitle, slot: "logo" }), this.renderAuth()), index.h("arcgis-app-identity", Object.assign({}, this.identityConfig, { "redirect-uri": this.redirectUri }))));
  }
};
HarnessHeader.style = harnessHeaderCss;

exports.arcgis_app_identity = ArcgisAppIdentity;
exports.arcgis_hub_notice = ArcgisHubNotice;
exports.arcgis_hub_notice_provider = ArcgisHubNoticeProvider;
exports.harness_header = HarnessHeader;
