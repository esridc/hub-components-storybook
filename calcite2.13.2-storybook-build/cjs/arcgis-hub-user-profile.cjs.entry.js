'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
const hubUserAvatar = require('./hub-user-avatar-71a43617.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const index$1 = require('./index-6f16fe65.js');
const urls = require('./urls-2533c98f.js');
const checkPermission = require('./checkPermission-11ab5992.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
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
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
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
require('./_commonjsHelpers-dcc4cf71.js');
require('./logger-5db3d659.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');

const HubNavigationUser = ({ context, label, scale, user, slot }) => {
  // if we got a user, use that, if not get it from context
  if (!context) {
    return;
  }
  const { currentUser, session } = context;
  user = user || currentUser;
  return index.h("calcite-navigation-user", { fullName: user === null || user === void 0 ? void 0 : user.fullName, label: label, scale: scale, slot: slot, thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && HubInitiatives.getUserThumbnailUrl(session === null || session === void 0 ? void 0 : session.portal, user, session === null || session === void 0 ? void 0 : session.token), userId: user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username });
};

const arcgisHubUserProfileCss = ":host{display:flex;cursor:pointer}button[slot=\"trigger\"]{background-color:transparent;border:transparent;display:flex;cursor:pointer;align-items:center}";

const ArcgisHubUserProfile = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubUserProfileSignout = index.createEvent(this, "arcgisHubUserProfileSignout", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubUserProfileLinkClick = index.createEvent(this, "arcgisHubUserProfileLinkClick", 7);
    this.handleDropdownClick = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.interaction.action.open.label.menu.details.user });
    };
    this.handleLinkClick = (clickEvent) => {
      const href = clickEvent.target.href;
      this.arcgisHubUserProfileLinkClick.emit({ clickEvent, href });
    };
    this.handleViewProfileClick = (clickEvent) => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.navigation.action.view.label.users.details.profile });
      this.handleLinkClick(clickEvent);
    };
    this.handleViewOverviewClick = (clickEvent) => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.navigation.action.view.label.orgs.details.overview });
      this.handleLinkClick(clickEvent);
    };
    this.handleWorkspaceHomeClick = (clickEvent) => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.navigation.action.view.label.users.details.workspace });
      this.handleLinkClick(clickEvent);
    };
    this.handleSignOut = () => {
      this.hubTelemetry.emit({ telemetry: index$1.dist.dictionary.category.interaction.action.authenticate.label.signout });
      // signout is an application level concern
      // also consumers might want to take action after signing out
      // so we just raise  an event and let consumers handle it appropriately
      this.arcgisHubUserProfileSignout.emit();
    };
    this.variant = 'default';
  }
  get context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get profileUrl() {
    return urls.getProfileUrl(this.context);
  }
  get overviewUrl() {
    return urls.getOverviewUrl(this.context);
  }
  get workspaceHomeUrl() {
    return urls.getWorkspaceHomeUrl(this.context);
  }
  get useWorkspaceLink() {
    return checkPermission.checkPermission('hub:feature:workspace:user', this.context).access;
  }
  renderUserProfile() {
    return this.variant === 'minimal' ? index.h(hubUserAvatar.HubUserAvatar, { context: this.context }) : index.h(HubNavigationUser, { context: this.context, slot: "user" });
  }
  renderMenu() {
    return (index.h("calcite-dropdown", null, index.h("button", { onClick: this.handleDropdownClick, slot: "trigger" }, this.renderUserProfile()), index.h("calcite-dropdown-group", { selectionMode: "none" }, index.h("calcite-dropdown-item", { href: this.profileUrl, onClick: this.handleViewProfileClick }, this.intl.t("viewProfile")), this.useWorkspaceLink
      ? index.h("calcite-dropdown-item", { href: this.workspaceHomeUrl, onClick: this.handleWorkspaceHomeClick }, this.intl.t("viewWorkspace"))
      : index.h("calcite-dropdown-item", { href: this.overviewUrl, onClick: this.handleViewOverviewClick }, this.intl.t("viewOverview")), index.h("slot", null), index.h("calcite-dropdown-item", { onClick: this.handleSignOut }, this.intl.t("signOut")))));
  }
  render() {
    var _a;
    return (index.h(index.Host, { "data-element": "user-profile" }, ((_a = this.context) === null || _a === void 0 ? void 0 : _a.isAuthenticated) && this.renderMenu()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubUserProfile.style = arcgisHubUserProfileCss;

exports.arcgis_hub_user_profile = ArcgisHubUserProfile;
