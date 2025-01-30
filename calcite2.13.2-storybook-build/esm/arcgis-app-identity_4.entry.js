import { r as registerInstance, c as createEvent, h, H as Host, F as Fragment, a as getElement } from './index-57f71b44.js';
import { r as retrieveContextManager, s as storeContextManager } from './context-manager-f969db95.js';
import { s as setGlobalContext, g as getGlobalContext, j as getPreconfiguredNotice, r as removeNotice, k as getPreconfiguredNotices, c as getNotices } from './state-31a09db0.js';
import { A as ArcGISContextManager } from './ArcGISContextManager-c977211a.js';
import { U as UserSession } from './UserSession-2c05f7b6.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { s as shouldShowNotice, r as resetNotice, d as dismissNotice } from './resetNotice-b6ee6eb8.js';
import { b as bind } from './context-7d8f7366.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { r as redirectToExternalUrl } from './urls-0e36649d.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { L as Logger } from './logger-f8667200.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { h as getUserThumbnailUrl } from './HubInitiatives-4f4e24ce.js';
import './request-fa80ae40.js';
import './encoding-1c5014ff.js';
import './index-0a8fd06b.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './fail-safe-cd1a5a2a.js';
import './get-prop-ec5be510.js';
import './get-with-default-b819d95d.js';
import './get-user-f035bd36.js';
import './tslib.es6-7023f322.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './index-213c70d0.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './map-by-a2234e13.js';
import './compose-d5b83ab7.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './getTypeFromEntity-e149b61e.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './append-custom-params-4bd856e5.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './delete-prop-bd13d424.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './fetch-org-8e578c0d.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';

const arcgisAppIdentityCss = ":host{display:block}";

const contextManagerUpdated = (updated, persist) => {
  setGlobalContext(updated.context);
  if (persist) {
    storeContextManager(updated);
  }
};
const ArcgisAppIdentity = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.signInCompleted = createEvent(this, "arcgisAppIdentitySignedIn", 7);
    this.signOutCompleted = createEvent(this, "arcgisAppIdentitySignedOut", 7);
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
    this.contextManager = await ArcGISContextManager.create({ portalUrl: this.portal, featureFlags: this.flags });
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
    const session = await UserSession.beginOAuth2({ clientId: this.clientId, redirectUri: this.redirectUri, portal: this.sharingApiUrl });
    this.contextManager = await ArcGISContextManager.create({ portalUrl: this.portal, authentication: session, featureFlags: this.flags });
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
    return (h(Host, null, h("slot", null)));
  }
  async _initContextManager() {
    // this.contextManager = await initContextManager(this.portal, this.persist)
    const context = getGlobalContext();
    // TODO: add a static fromContext() method to get a new manager from a context
    const fromState = context && await ArcGISContextManager.create({
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
      ? await retrieveContextManager()
      : undefined);
    this.contextManager = existing || await ArcGISContextManager.create({
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
  return !(notice === null || notice === void 0 ? void 0 : notice.permissions) || notice.permissions.every(p => checkPermission(p.permission, context).access === p.access);
}

const arcgisHubNoticeCss = ":host{display:block}slot[name='actions']{display:flex;gap:0.75rem}calcite-notice slot[name='actions']{margin-top:1rem}calcite-modal calcite-label[slot='back']{--calcite-label-margin-bottom:0;height:100%}calcite-modal [slot='header']>*{margin:0px;font-weight:var(--calcite-font-weight-bold)}.popover-reference{display:inline-block}.popover-content{padding:0.75rem}.popover-content slot[name='actions']:has(*){margin-top:1rem}";

const ArcgisHubNotice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubNoticeClose = createEvent(this, "arcgisHubNoticeClose", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    // has the user checked the "do not show this again" checkbox on the modal
    this.shouldDismiss = false;
    this.noticeId = undefined;
    this.notice = undefined;
    this.place = undefined;
    this.popoverRef = undefined;
    bind(this, 'closeNotice', 'handleActionClick', 'onNoticeClose', 'onNoticeOpen', 'onDismissChecked', 'setNoticeElement');
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
    return this.notice || getPreconfiguredNotice(this.noticeId, this._context);
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
    const _shouldShowNotice = !((_b = this._notice) === null || _b === void 0 ? void 0 : _b.dismissable) || shouldShowNotice((_c = this._notice) === null || _c === void 0 ? void 0 : _c.id, this._context);
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
      Logger.debug(msg);
    }
    return shouldShow;
  }
  // /**
  //  * Exposed as a method for testing purposes
  //  * We do not expect this to be used in production
  //  * @returns
  //  */
  _resetNotice() {
    return resetNotice(this._notice.id, this._context);
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
      result = dismissNotice(this._notice.id, this._context);
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
          redirectToExternalUrl(href);
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
  _renderAction(action, index) {
    const key = `${this._notice.id}_${index}`;
    const intlKey = `notice.${this._notice.id}.actions.${index}.text`;
    let ariaLabel = action.ariaLabel || this.intl.t(intlKey);
    if (action.i18nAriaLabelKey) {
      ariaLabel = this.intl.t(`notice.${this._notice.id}.actions.${index}.${action.i18nAriaLabelKey}`);
    }
    // const clickHandler = action.target !== '_blank' ? undefined : this.closeModal;
    // eslint-disable-next-line unicorn/prefer-ternary
    if (action.buttonStyle) {
      return h("calcite-button", { appearance: action.buttonStyle, "data-action-index": index, disabled: action.disabled, href: action.href, iconEnd: action.icon, key: key, label: ariaLabel, onClick: this.handleActionClick, round: true, target: action.target }, action.label || this.intl.t(intlKey));
    }
    else {
      return h("calcite-link", { "data-action": action.action, "data-action-index": index, disabled: action.disabled, href: action.href, iconEnd: action.target === '_blank' ? 'launch' : null, iconStart: action.icon, key: key, label: ariaLabel, onClick: this.handleActionClick, target: action.target }, action.label || this.intl.t(intlKey));
    }
  }
  /**
  * Render the actions configured for the notice
  * @param {string} slotName
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  _renderActions(slotName) {
    return h("slot", { name: "actions", slot: slotName }, (this._notice.actions || []).map((action, idx) => {
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
    const configuration = cloneObject(this._notice.configuration);
    // TODO: remove this when the bug is fixed in Calcite
    // https://github.com/Esri/calcite-design-system/issues/9567
    configuration.icon = this._getAlertIconName;
    const props = Object.assign(Object.assign(Object.assign({}, defaultProps), nonOverrideableProps), configuration);
    return (h("calcite-alert", Object.assign({}, props, { onCalciteAlertClose: this.onNoticeClose, onCalciteAlertOpen: this.onNoticeOpen, ref: this.setNoticeElement }), h("div", { slot: "title" }, title), h("div", { innerHTML: this.getString('message'), slot: "message" }), this._renderActions('link')));
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
    return (h("calcite-notice", Object.assign({}, props, { onCalciteNoticeClose: this.onNoticeClose, onCalciteNoticeOpen: this.onNoticeOpen, ref: this.setNoticeElement }), h("div", { slot: "title" }, this.getString('title')), h("div", { innerHTML: this.getString('message'), slot: "message" }), this._renderActions('link')));
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
    return (h("calcite-modal", Object.assign({}, props, { onCalciteModalClose: this.onNoticeClose, onCalciteModalOpen: this.onNoticeOpen, ref: this.setNoticeElement }), h("div", { slot: "header" }, h("h3", null, this.getString('title'))), h("div", { innerHTML: this.getString('message'), slot: "content" }), this._notice.dismissable &&
      h("calcite-label", { appearance: "clear", layout: "inline", slot: "back" }, h("calcite-checkbox", { checked: this.shouldDismiss, name: "shouldDismiss", onCalciteCheckboxChange: this.onDismissChecked }), this.intl.t('modal.dismiss')), h("calcite-button", { appearance: "outline", onClick: this.closeNotice, round: true, slot: "secondary" }, this.intl.t('modal.close')), this._renderActions('primary')));
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
    return h(Fragment, null, h("div", { class: "popover-reference", ref: (el) => this.popoverRef = el }, h("slot", { name: "popover-reference" })), this.popoverRef && h("calcite-popover", Object.assign({}, props, { onCalcitePopoverClose: this.onNoticeClose, onCalcitePopoverOpen: this.onNoticeOpen, ref: this.setNoticeElement, referenceElement: this.popoverRef }), h("div", { class: "popover-content" }, h("div", { innerHTML: this.getString('message') }), this._renderActions(''))));
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
  get element() { return getElement(this); }
};
ArcgisHubNotice.style = arcgisHubNoticeCss;

const arcgisHubNoticeProviderCss = ":host{position:absolute;z-index:1045}";

const ArcgisHubNoticeProvider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onCloseNotice = (evt) => {
      // if it is in the store, remove it
      removeNotice(evt.detail.id);
    };
    this.place = undefined;
    this.autoShowDisabled = undefined;
  }
  get _context() { return getGlobalContext(); }
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
      const configuredNotices = getPreconfiguredNotices(this._context);
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
    return getNotices();
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
    return (h(Host, { "data-element": "hub-notice-provider" }, this.notices.map(a => {
      return h("arcgis-hub-notice", { id: a.id, key: a.id, notice: a, onArcgisHubNoticeClose: this.onCloseNotice, place: this.place });
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
    registerInstance(this, hostRef);
    this.onChangeEnv = (evt) => {
      // NOTE: this updates the portal we pass into arcgis-app-identity
      // which in turn updates the global context
      this.environment = evt.target.value;
    };
    this.pageTitle = undefined;
    this.environment = undefined;
    this.flags = {};
  }
  get _context() { return getGlobalContext(); }
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
    results.push(h("calcite-chip-group", { label: "environment", "selection-mode": "single", slot: "content-end" }, Object.keys(ENVIRONMENTS).map(env => {
      return h("calcite-chip", { key: env, onCalciteChipSelect: this.onChangeEnv, selected: env === this.environment, value: env }, env);
    })));
    if (currentUser) {
      results.push(h("calcite-navigation-user", { "full-name": currentUser.fullName, slot: "user", thumbnail: currentUser.thumbnail && getUserThumbnailUrl(session.portal, currentUser, session.token), "user-id": currentUser.id, username: currentUser.username }));
      results.push(h("calcite-action", { onClick: this.signOut, scale: "l", slot: "user", text: "Sign Out", "text-enabled": true }));
    }
    else {
      results.push(h("calcite-action", { onClick: this.signIn, scale: "l", slot: "user", text: "Sign In", "text-enabled": true }));
    }
    return results;
  }
  render() {
    return (h(Host, null, h("arcgis-hub-notice-provider", null), h("calcite-navigation", { slot: "header" }, h("calcite-navigation-logo", { heading: "Home", href: this.homeUri, slot: "navigation-action", thumbnail: this.logoUri }), h("calcite-navigation-logo", { heading: this.pageTitle, slot: "logo" }), this.renderAuth()), h("arcgis-app-identity", Object.assign({}, this.identityConfig, { "redirect-uri": this.redirectUri }))));
  }
};
HarnessHeader.style = harnessHeaderCss;

export { ArcgisAppIdentity as arcgis_app_identity, ArcgisHubNotice as arcgis_hub_notice, ArcgisHubNoticeProvider as arcgis_hub_notice_provider, HarnessHeader as harness_header };
