import { h, r as registerInstance, c as createEvent, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { H as HubUserAvatar } from './hub-user-avatar-76be527d.js';
import { h as getUserThumbnailUrl } from './HubInitiatives-4f4e24ce.js';
import { d as dist } from './index-dd3f99ac.js';
import { b as getProfileUrl, c as getOverviewUrl, d as getWorkspaceHomeUrl } from './urls-0e36649d.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
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
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
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
import './_commonjsHelpers-11ca3be1.js';
import './logger-f8667200.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';

const HubNavigationUser = ({ context, label, scale, user, slot }) => {
  // if we got a user, use that, if not get it from context
  if (!context) {
    return;
  }
  const { currentUser, session } = context;
  user = user || currentUser;
  return h("calcite-navigation-user", { fullName: user === null || user === void 0 ? void 0 : user.fullName, label: label, scale: scale, slot: slot, thumbnail: (user === null || user === void 0 ? void 0 : user.thumbnail) && getUserThumbnailUrl(session === null || session === void 0 ? void 0 : session.portal, user, session === null || session === void 0 ? void 0 : session.token), userId: user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username });
};

const arcgisHubUserProfileCss = ":host{display:flex;cursor:pointer}button[slot=\"trigger\"]{background-color:transparent;border:transparent;display:flex;cursor:pointer;align-items:center}";

const ArcgisHubUserProfile = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubUserProfileSignout = createEvent(this, "arcgisHubUserProfileSignout", 7);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubUserProfileLinkClick = createEvent(this, "arcgisHubUserProfileLinkClick", 7);
    this.handleDropdownClick = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.interaction.action.open.label.menu.details.user });
    };
    this.handleLinkClick = (clickEvent) => {
      const href = clickEvent.target.href;
      this.arcgisHubUserProfileLinkClick.emit({ clickEvent, href });
    };
    this.handleViewProfileClick = (clickEvent) => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.navigation.action.view.label.users.details.profile });
      this.handleLinkClick(clickEvent);
    };
    this.handleViewOverviewClick = (clickEvent) => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.navigation.action.view.label.orgs.details.overview });
      this.handleLinkClick(clickEvent);
    };
    this.handleWorkspaceHomeClick = (clickEvent) => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.navigation.action.view.label.users.details.workspace });
      this.handleLinkClick(clickEvent);
    };
    this.handleSignOut = () => {
      this.hubTelemetry.emit({ telemetry: dist.dictionary.category.interaction.action.authenticate.label.signout });
      // signout is an application level concern
      // also consumers might want to take action after signing out
      // so we just raise  an event and let consumers handle it appropriately
      this.arcgisHubUserProfileSignout.emit();
    };
    this.variant = 'default';
  }
  get context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get profileUrl() {
    return getProfileUrl(this.context);
  }
  get overviewUrl() {
    return getOverviewUrl(this.context);
  }
  get workspaceHomeUrl() {
    return getWorkspaceHomeUrl(this.context);
  }
  get useWorkspaceLink() {
    return checkPermission('hub:feature:workspace:user', this.context).access;
  }
  renderUserProfile() {
    return this.variant === 'minimal' ? h(HubUserAvatar, { context: this.context }) : h(HubNavigationUser, { context: this.context, slot: "user" });
  }
  renderMenu() {
    return (h("calcite-dropdown", null, h("button", { onClick: this.handleDropdownClick, slot: "trigger" }, this.renderUserProfile()), h("calcite-dropdown-group", { selectionMode: "none" }, h("calcite-dropdown-item", { href: this.profileUrl, onClick: this.handleViewProfileClick }, this.intl.t("viewProfile")), this.useWorkspaceLink
      ? h("calcite-dropdown-item", { href: this.workspaceHomeUrl, onClick: this.handleWorkspaceHomeClick }, this.intl.t("viewWorkspace"))
      : h("calcite-dropdown-item", { href: this.overviewUrl, onClick: this.handleViewOverviewClick }, this.intl.t("viewOverview")), h("slot", null), h("calcite-dropdown-item", { onClick: this.handleSignOut }, this.intl.t("signOut")))));
  }
  render() {
    var _a;
    return (h(Host, { "data-element": "user-profile" }, ((_a = this.context) === null || _a === void 0 ? void 0 : _a.isAuthenticated) && this.renderMenu()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubUserProfile.style = arcgisHubUserProfileCss;

export { ArcgisHubUserProfile as arcgis_hub_user_profile };
