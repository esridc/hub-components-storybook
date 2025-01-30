'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
const index$1 = require('./index-6f16fe65.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./_commonjsHelpers-dcc4cf71.js');
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

const arcgisHubDiscussionsMentionPopoverCss = ":host{display:inline-block}::slotted(calcite-link){font-size:var(--calcite-font-size-0) !important;line-height:1.25rem !important}calcite-popover{width:20rem}button{grid-row:span 2 / span 2;cursor:pointer;border-style:none;background-color:transparent;padding:0px}address{margin:0px;margin-bottom:1.5rem;display:grid;column-gap:0.75rem;row-gap:0px;font-style:normal;grid-template-columns:44px auto}address:last-child{margin:0px}calcite-avatar{grid-row:span 2 / span 2;height:2.75rem;width:2.75rem}address calcite-icon{grid-row:span 2 / span 2;height:2.75rem;width:2.75rem}address b{font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}address span{font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}address span:before{content:'@'}calcite-icon{margin-top:1px;margin-bottom:1px}.popover-body{margin:0px;padding:0.75rem}.popover-body div{margin-bottom:0.5rem;display:flex;align-items:flex-start;gap:0.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-2)}.popover-body div+div{margin-bottom:1rem}.popover-body div+div:last-child{margin:0px}footer{padding:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-1);background-color:var(--calcite-color-background)}footer div{margin:0px;margin-bottom:0.5rem;display:flex;align-items:flex-start;gap:0.5rem}footer div:nth-of-type(3){margin-bottom:1rem}footer div:last-child{margin:0px}";

const ArcgisHubDiscussionsMentionPopover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
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
    context.bind(this, 'handlePopoverOpened', 'handleGoToProfile', 'emitHubTelemetry');
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  emitHubTelemetry(telemetry) {
    const { postId, parentId, channelId, channelAccess, index } = this;
    this.hubTelemetry.emit(Object.assign(Object.assign({}, telemetry), { postId,
      parentId,
      channelId,
      channelAccess, position: index }));
  }
  handlePopoverOpened() {
    this.emitHubTelemetry(index$1.dist.dictionary.category.interaction.action.open.label.popover.details.details);
  }
  handleGoToProfile() {
    this.emitHubTelemetry(index$1.dist.dictionary.category.navigation.action.view.label.users.details.profile);
  }
  renderCreatorAvatar() {
    const { username, fullName, thumbnail, portal, token, userId, access, } = this;
    return (index.h("calcite-avatar", { "full-name": fullName, scale: "l", thumbnail: thumbnail && HubInitiatives.getUserThumbnailUrl(portal, {
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
    return (index.h(index.Fragment, null, index.h("b", null, displayFullName), index.h("span", null, displayUsername)));
  }
  renderCreatorExpandedDetails() {
    const { intl, region, organization, username, isHub } = this;
    /// 'region' acts as a stand-in for whether or not the user is viewable from an access standpoint.
    /// If we don't have a region property, we also don't have access to portal or the other needed information.
    if (region) {
      const displayRegion = intl.formatDisplayName(region.toLocaleUpperCase(), { type: 'region' });
      return (index.h(index.Fragment, null, organization && index.h("div", null, index.h("calcite-icon", { icon: "organization", scale: "s", "text-label": intl.t('orgLabel') }), organization), displayRegion && index.h("div", null, index.h("calcite-icon", { icon: "pin", scale: "s", "text-label": intl.t('location') }), displayRegion), isHub && (index.h("calcite-button", { appearance: "outline-fill", href: "/people/" + username, kind: "neutral", label: intl.t('profile'), onClick: this.handleGoToProfile, round: true, scale: "l", width: "full" }, intl.t('profile')))));
    }
  }
  renderPostDetails() {
    const { intl, creatorUsername } = this;
    return (index.h("footer", null, index.h("div", null, index.h("calcite-icon", { icon: "speech-bubbles", scale: "s" }), index.h("span", null, intl.t('mentionedBy', { username: creatorUsername })))));
  }
  render() {
    const { intl } = this;
    return (index.h(index.Host, { "data-element": "discussions-mention-popover" }, this.buttonEl &&
      index.h("calcite-popover", { autoClose: true, label: intl.t('information'), overlayPositioning: 'fixed', placement: "top", referenceElement: this.buttonEl }, index.h("div", { class: "popover-body" }, index.h("address", null, this.renderCreatorAvatar(), this.renderCreatorDetails()), this.renderCreatorExpandedDetails()), this.renderPostDetails()), index.h("button", { ref: (el) => { this.buttonEl = el; }, type: "button" }, index.h("slot", null))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubDiscussionsMentionPopover.style = arcgisHubDiscussionsMentionPopoverCss;

exports.arcgis_hub_discussions_mention_popover = ArcgisHubDiscussionsMentionPopover;
