'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const follow = require('./follow-c7e71158.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const getFamily = require('./get-family-cafa88bb.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./fetchHubEntity-88467d55.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./HubInitiatives-25ecf40a.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');

const arcgisHubFollowActionCss = ":host{display:block}.btn-align-center{display:flex;justify-content:center}.btn-align-start{display:flex;justify-content:flex-start}.btn-align-end{display:flex;justify-content:flex-end}";

const ArcgisHubFollowAction = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubFollowActionChange = index.createEvent(this, "arcgisHubFollowActionChange", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.startFollowActionPopoutAuth = index.createEvent(this, "startFollowActionPopoutAuth", 7);
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
    this._context = state.getGlobalContext();
    context.bind(this, 'handleFollowToggle', 'handleAlertClose');
  }
  connectedCallback() {
    state.connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    await this.fetchFollowStatus();
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * Fetch the current user's follow status of the item
   */
  async fetchFollowStatus() {
    if (this._context.isAuthenticated) {
      this.isFollowing = this.entityId && await follow.isUserFollowing(this.entityId, this._context.currentUser, this.entityType, this._context);
      this.setCannotUnfollow();
    }
  }
  /**
   * User cannot leave a followers group if they are
   * the owner of the group
   */
  setCannotUnfollow() {
    this.cannotUnfollow = checkPermission.checkPermission('hub:group:owner', this._context, this.followersGroup).access;
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
    const toggleFollowFunc = this.isFollowing ? follow.unfollowEntity : follow.followEntity;
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
      ? index$1.dist.dictionary.category.groups.action.join.label.members
      : index$1.dist.dictionary.category.groups.action.leave.label.members;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, action), { access: this.entityAccess, groupType: 'Followers', id: this.entityId, type: getFamily.getFamilyTypes(this.entityType)[0], groupId: (_a = this.followersGroup) === null || _a === void 0 ? void 0 : _a.id, groupOrg: (_b = this.followersGroup) === null || _b === void 0 ? void 0 : _b.orgId, groupAccess: (_c = this.followersGroup) === null || _c === void 0 ? void 0 : _c.access, response: response }));
  }
  handleAlertClose() {
    this.showAlert = false;
  }
  renderButton() {
    const button = (index.h("div", { class: this.buttonClass }, index.h("calcite-button", { appearance: this.buttonStyle, disabled: this.cannotUnfollow, "icon-start": this.isFollowing ? 'rss-f' : 'rss', onClick: this.handleFollowToggle }, this.isFollowing ? this.unfollowButtonText : this.buttonText)));
    return this.cannotUnfollow
      ? index.h("arcgis-ref-tooltip", { placement: "top", text: this.intl.t("cannotLeaveGroup") }, button)
      : button;
  }
  renderAlert() {
    return index.h("arcgis-wormhole", null, index.h("calcite-alert", { autoClose: true, autoCloseDuration: "fast", icon: true, kind: 'danger', label: this.intl.t('alertMessage'), onCalciteAlertClose: this.handleAlertClose, open: this.showAlert, placement: "top-end" }, index.h("div", { slot: "title" }, this.intl.t('alertTitle')), index.h("div", { slot: "message" }, this.intl.t('alertMessage'))));
  }
  render() {
    return (index.h(index.Host, { "data-element": "follow-action" }, index.h("div", null, this.renderButton(), this.renderAlert())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "entityId": ["fetchFollowStatus"],
    "entityType": ["fetchFollowStatus"],
    "_context": ["fetchFollowStatus", "toggleFollowWithContextChange"]
  }; }
};
ArcgisHubFollowAction.style = arcgisHubFollowActionCss;

exports.arcgis_hub_follow_action = ArcgisHubFollowAction;
