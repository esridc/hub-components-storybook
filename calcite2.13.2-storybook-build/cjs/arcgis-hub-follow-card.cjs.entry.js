'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
const hubSearch = require('./hubSearch-79d30702.js');
const getProp = require('./get-prop-4bd8fc1a.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
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
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

const arcgisHubFollowCardCss = ":host{display:block}calcite-notice{--calcite-color-foreground-1:#ffffff;--calcite-color-text-2:#000000}.cta-align-center{display:flex;justify-content:center}.cta-align-start{display:flex;justify-content:flex-start}.cta-align-end{display:flex;justify-content:flex-end}.cta-text{margin-bottom:0.75rem}";

const ArcgisHubFollowCard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubFollowCardFollowChange = index.createEvent(this, "arcgisHubFollowCardFollowChange", 7);
    this.startFollowCardPopoutAuth = index.createEvent(this, "startFollowCardPopoutAuth", 7);
    this.cardConfig = undefined;
    this.isEditingSite = false;
    this.followersGroup = undefined;
    this._context = state.getGlobalContext();
    context.bind(this, 'handleArcgisHubFollowActionChange', 'handleStartFollowCardPopoutAuth');
  }
  connectedCallback() {
    state.connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    await this.cardConfigUpdated();
  }
  /**
   * Called when the card is updated
   */
  async cardConfigUpdated() {
    const { entityId, entityType } = this.cardConfig;
    if (entityId) {
      // update the followersGroup with the newly selected
      // entity's followers group
      try {
        this._entity = await fetchHubEntity.fetchHubEntity(entityType, entityId, this._context);
        this.followersGroup = this._entity.followersGroupId && await hubSearch.fetchHubGroup(this._entity.followersGroupId, this._context.hubRequestOptions);
      }
      catch (e) {
        console.error(`Error fetching followers group: ${e}`);
      }
    }
  }
  /**
   * Whether the user has access to the entity's followers group
   */
  get hasGroupAccess() {
    return !!this.followersGroup && !!getProp.getProp(this.followersGroup, 'access');
  }
  get callToActionClass() {
    return `cta-align-${this.cardConfig.callToActionAlign}`;
  }
  handleArcgisHubFollowActionChange(event) {
    event.preventDefault();
    event.stopPropagation();
    this.arcgisHubFollowCardFollowChange.emit(event.detail);
  }
  handleStartFollowCardPopoutAuth(event) {
    event.preventDefault();
    event.stopPropagation();
    this.startFollowCardPopoutAuth.emit();
  }
  renderNotice() {
    return index.h("calcite-notice", { kind: "danger", open: true }, index.h("div", { slot: "message" }, this.intl.t("inaccessibleFollowerGroup")));
  }
  /**
   * The user won't have access to the group if any of these scenarios happens
   * 1. the item does not have a followers group
   * 2. the user does not have access to the item's followers group
   * 3. the item is inaccessible
   * if so, we will hide the card on the site or if the user is editing the site,
   * we will render a notice
   */
  render() {
    const { entityId, entityType, buttonText, unfollowButtonText, buttonStyle, buttonAlign } = this.cardConfig;
    return (index.h(index.Host, { "data-element": "follow-card" }, this.hasGroupAccess
      ? index.h("div", null, index.h("div", { class: `cta-text ${this.callToActionClass}` }, this.cardConfig.callToActionText), index.h("arcgis-hub-follow-action", { buttonAlign: buttonAlign, buttonStyle: buttonStyle, buttonText: buttonText, entityAccess: this._entity.access, entityId: entityId, entityType: entityType, followersGroup: this.followersGroup, onArcgisHubFollowActionChange: this.handleArcgisHubFollowActionChange, onStartFollowActionPopoutAuth: this.handleStartFollowCardPopoutAuth, unfollowButtonText: unfollowButtonText }))
      : this.isEditingSite && this.renderNotice()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "_context": ["cardConfigUpdated"],
    "cardConfig": ["cardConfigUpdated"]
  }; }
};
ArcgisHubFollowCard.style = arcgisHubFollowCardCss;

exports.arcgis_hub_follow_card = ArcgisHubFollowCard;
