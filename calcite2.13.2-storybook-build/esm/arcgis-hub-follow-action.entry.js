import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { i as isUserFollowing, u as unfollowEntity, f as followEntity } from './follow-76eed880.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { a as getFamilyTypes } from './get-family-543fac52.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
import './fetchHubEntity-28d04ab4.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './HubInitiatives-4f4e24ce.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';

const arcgisHubFollowActionCss = ":host{display:block}.btn-align-center{display:flex;justify-content:center}.btn-align-start{display:flex;justify-content:flex-start}.btn-align-end{display:flex;justify-content:flex-end}";

const ArcgisHubFollowAction = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubFollowActionChange = createEvent(this, "arcgisHubFollowActionChange", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.startFollowActionPopoutAuth = createEvent(this, "startFollowActionPopoutAuth", 7);
    /**
     * Whether it is an auth'ed or anonymous user that clicks follow
     */
    this._clicksFollowWithoutAuth = false;
    this.entityId = undefined;
    this.entityType = undefined;
    this.entityAccess = undefined;
    this.buttonText = undefined;
    this.unfollowButtonText = undefined;
    this.buttonStyle = 'solid';
    this.buttonAlign = 'center';
    this.followersGroup = undefined;
    this.isFollowing = undefined;
    this.showAlert = false;
    this.cannotUnfollow = undefined;
    this._context = getGlobalContext();
    bind(this, 'handleFollowToggle', 'handleAlertClose');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    await this.fetchFollowStatus();
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Fetch the current user's follow status of the item
   */
  async fetchFollowStatus() {
    if (this._context.isAuthenticated) {
      this.isFollowing = this.entityId && await isUserFollowing(this.entityId, this._context.currentUser, this.entityType, this._context);
      this.setCannotUnfollow();
    }
  }
  /**
   * User cannot leave a followers group if they are
   * the owner of the group
   */
  setCannotUnfollow() {
    this.cannotUnfollow = checkPermission('hub:group:owner', this._context, this.followersGroup).access;
  }
  /**
   * This is triggered whenever the context changes, but we do not want to
   * toggle follow every time when context changes, instead, we only want to
   * toggle when an anonymous user clicks follow and successfully signs in
   */
  async toggleFollowWithContextChange() {
    if (this._clicksFollowWithoutAuth) {
      await this.fetchFollowStatus();
      await this.toggleFollow(true);
      this._clicksFollowWithoutAuth = false;
    }
  }
  get buttonClass() {
    return `btn-align-${this.buttonAlign}`;
  }
  /**
   * Calls when the follow/unfollow button is clicked
   * @param onSignIn whether the button is clicked when user is unauth'ed
   */
  async toggleFollow(onSignIn = false) {
    const toggleFollowFunc = this.isFollowing ? unfollowEntity : followEntity;
    // If the user is already following the item and signing in, we don't want
    // them to unfollow the item. So we only want to call the follow/unfollow
    // fn when the user is not signing in OR when user is signing in but they
    // are not currently following the item
    if (!onSignIn || onSignIn && !this.isFollowing) {
      try {
        await toggleFollowFunc(this.entityId, this._context.currentUser, this.entityType, this._context);
        this.arcgisHubFollowActionChange.emit(!this.isFollowing);
        this.logTelemetry(!this.isFollowing, 'Success');
        // refresh the user so the groups list gets updated
        await this._context.refreshUser();
        await this.fetchFollowStatus();
      }
      catch (error) {
        this.showAlert = true;
        this.logTelemetry(!this.isFollowing, 'Failure');
      }
    }
  }
  /**
   * If the user is auth'ed, we will toggle follow, otherwise, we will
   * show the sign in window, _clicksFollowWithoutAuth indicates whether
   * the user is unauth'ed when they clicks the follow button
   */
  async handleFollowToggle() {
    if (this._context.isAuthenticated) {
      await this.toggleFollow();
    }
    else {
      this.startFollowActionPopoutAuth.emit();
      this._clicksFollowWithoutAuth = true;
    }
  }
  logTelemetry(isFollowing, response) {
    var _a, _b, _c;
    const action = isFollowing
      ? dist.dictionary.category.groups.action.join.label.members
      : dist.dictionary.category.groups.action.leave.label.members;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, action), { access: this.entityAccess, groupType: 'Followers', id: this.entityId, type: getFamilyTypes(this.entityType)[0], groupId: (_a = this.followersGroup) === null || _a === void 0 ? void 0 : _a.id, groupOrg: (_b = this.followersGroup) === null || _b === void 0 ? void 0 : _b.orgId, groupAccess: (_c = this.followersGroup) === null || _c === void 0 ? void 0 : _c.access, response: response }));
  }
  handleAlertClose() {
    this.showAlert = false;
  }
  renderButton() {
    const button = (h("div", { class: this.buttonClass }, h("calcite-button", { appearance: this.buttonStyle, disabled: this.cannotUnfollow, "icon-start": this.isFollowing ? 'rss-f' : 'rss', onClick: this.handleFollowToggle }, this.isFollowing ? this.unfollowButtonText : this.buttonText)));
    return this.cannotUnfollow
      ? h("arcgis-ref-tooltip", { placement: "top", text: this.intl.t("cannotLeaveGroup") }, button)
      : button;
  }
  renderAlert() {
    return h("arcgis-wormhole", null, h("calcite-alert", { autoClose: true, autoCloseDuration: "fast", icon: true, kind: 'danger', label: this.intl.t('alertMessage'), onCalciteAlertClose: this.handleAlertClose, open: this.showAlert, placement: "top-end" }, h("div", { slot: "title" }, this.intl.t('alertTitle')), h("div", { slot: "message" }, this.intl.t('alertMessage'))));
  }
  render() {
    return (h(Host, { "data-element": "follow-action" }, h("div", null, this.renderButton(), this.renderAlert())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "entityId": ["fetchFollowStatus"],
    "entityType": ["fetchFollowStatus"],
    "_context": ["fetchFollowStatus", "toggleFollowWithContextChange"]
  }; }
};
ArcgisHubFollowAction.style = arcgisHubFollowActionCss;

export { ArcgisHubFollowAction as arcgis_hub_follow_action };
