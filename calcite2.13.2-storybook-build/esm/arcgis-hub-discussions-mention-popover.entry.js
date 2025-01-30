import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { d as dist } from './index-dd3f99ac.js';
import { h as getUserThumbnailUrl } from './HubInitiatives-4f4e24ce.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './_commonjsHelpers-11ca3be1.js';
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

const arcgisHubDiscussionsMentionPopoverCss = ":host{display:inline-block}::slotted(calcite-link){font-size:var(--calcite-font-size-0) !important;line-height:1.25rem !important}calcite-popover{width:20rem}button{grid-row:span 2 / span 2;cursor:pointer;border-style:none;background-color:transparent;padding:0px}address{margin:0px;margin-bottom:1.5rem;display:grid;column-gap:0.75rem;row-gap:0px;font-style:normal;grid-template-columns:44px auto}address:last-child{margin:0px}calcite-avatar{grid-row:span 2 / span 2;height:2.75rem;width:2.75rem}address calcite-icon{grid-row:span 2 / span 2;height:2.75rem;width:2.75rem}address b{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}address span{font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}address span:before{content:'@'}calcite-icon{margin-top:1px;margin-bottom:1px}.popover-body{margin:0px;padding:0.75rem}.popover-body div{margin-bottom:0.5rem;display:flex;align-items:flex-start;gap:0.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-2)}.popover-body div+div{margin-bottom:1rem}.popover-body div+div:last-child{margin:0px}footer{padding:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-1);background-color:var(--calcite-color-background)}footer div{margin:0px;margin-bottom:0.5rem;display:flex;align-items:flex-start;gap:0.5rem}footer div:nth-of-type(3){margin-bottom:1rem}footer div:last-child{margin:0px}";

const ArcgisHubDiscussionsMentionPopover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.buttonEl = undefined;
    this.username = undefined;
    this.fullName = undefined;
    this.thumbnail = undefined;
    this.userId = undefined;
    this.access = undefined;
    this.token = undefined;
    this.portal = undefined;
    this.region = undefined;
    this.organization = undefined;
    this.creatorUsername = undefined;
    this.postId = undefined;
    this.parentId = undefined;
    this.channelId = undefined;
    this.channelAccess = undefined;
    this.index = undefined;
    this.isHub = undefined;
    bind(this, 'handlePopoverOpened', 'handleGoToProfile', 'emitHubTelemetry');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  emitHubTelemetry(telemetry) {
    const { postId, parentId, channelId, channelAccess, index } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId,
      parentId,
      channelId,
      channelAccess, position: index }));
  }
  handlePopoverOpened() {
    this.emitHubTelemetry(dist.dictionary.category.interaction.action.open.label.popover.details.details);
  }
  handleGoToProfile() {
    this.emitHubTelemetry(dist.dictionary.category.navigation.action.view.label.users.details.profile);
  }
  renderCreatorAvatar() {
    const { username, fullName, thumbnail, portal, token, userId, access, } = this;
    return (h("calcite-avatar", { "full-name": fullName, scale: "l", thumbnail: thumbnail && getUserThumbnailUrl(portal, {
        username,
        access,
        thumbnail
      }, token), "user-id": userId, username: username }));
  }
  renderCreatorDetails() {
    const { intl, username, fullName } = this;
    let displayFullName = intl.t('anonymous');
    let displayUsername = intl.t('noUser');
    if (username) {
      displayFullName = fullName || intl.t('privateUser');
      displayUsername = username;
    }
    return (h(Fragment, null, h("b", null, displayFullName), h("span", null, displayUsername)));
  }
  renderCreatorExpandedDetails() {
    const { intl, region, organization, username, isHub } = this;
    /// 'region' acts as a stand-in for whether or not the user is viewable from an access standpoint.
    /// If we don't have a region property, we also don't have access to portal or the other needed information.
    if (region) {
      const displayRegion = intl.formatDisplayName(region.toLocaleUpperCase(), { type: 'region' });
      return (h(Fragment, null, organization && h("div", null, h("calcite-icon", { icon: "organization", scale: "s", "text-label": intl.t('orgLabel') }), organization), displayRegion && h("div", null, h("calcite-icon", { icon: "pin", scale: "s", "text-label": intl.t('location') }), displayRegion), isHub && (h("calcite-button", { appearance: "outline-fill", href: "/people/" + username, kind: "neutral", label: intl.t('profile'), onClick: this.handleGoToProfile, round: true, scale: "l", width: "full" }, intl.t('profile')))));
    }
  }
  renderPostDetails() {
    const { intl, creatorUsername } = this;
    return (h("footer", null, h("div", null, h("calcite-icon", { icon: "speech-bubbles", scale: "s" }), h("span", null, intl.t('mentionedBy', { username: creatorUsername })))));
  }
  render() {
    const { intl } = this;
    return (h(Host, { "data-element": "discussions-mention-popover" }, this.buttonEl &&
      h("calcite-popover", { autoClose: true, label: intl.t('information'), overlayPositioning: 'fixed', placement: "top", referenceElement: this.buttonEl }, h("div", { class: "popover-body" }, h("address", null, this.renderCreatorAvatar(), this.renderCreatorDetails()), this.renderCreatorExpandedDetails()), this.renderPostDetails()), h("button", { ref: (el) => { this.buttonEl = el; }, type: "button" }, h("slot", null))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubDiscussionsMentionPopover.style = arcgisHubDiscussionsMentionPopoverCss;

export { ArcgisHubDiscussionsMentionPopover as arcgis_hub_discussions_mention_popover };
