import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { f as fetchHubEntity } from './fetchHubEntity-28d04ab4.js';
import { a as fetchHubGroup } from './hubSearch-41612481.js';
import { g as getProp } from './get-prop-ec5be510.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
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
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

const arcgisHubFollowCardCss = ":host{display:block}calcite-notice{--calcite-color-foreground-1:#ffffff;--calcite-color-text-2:#000000}.cta-align-center{display:flex;justify-content:center}.cta-align-start{display:flex;justify-content:flex-start}.cta-align-end{display:flex;justify-content:flex-end}.cta-text{margin-bottom:0.75rem}";

const ArcgisHubFollowCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubFollowCardFollowChange = createEvent(this, "arcgisHubFollowCardFollowChange", 7);
    this.startFollowCardPopoutAuth = createEvent(this, "startFollowCardPopoutAuth", 7);
    this.cardConfig = undefined;
    this.isEditingSite = false;
    this.followersGroup = undefined;
    this._context = getGlobalContext();
    bind(this, 'handleArcgisHubFollowActionChange', 'handleStartFollowCardPopoutAuth');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
        this._entity = await fetchHubEntity(entityType, entityId, this._context);
        this.followersGroup = this._entity.followersGroupId && await fetchHubGroup(this._entity.followersGroupId, this._context.hubRequestOptions);
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
    return !!this.followersGroup && !!getProp(this.followersGroup, 'access');
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
    return h("calcite-notice", { kind: "danger", open: true }, h("div", { slot: "message" }, this.intl.t("inaccessibleFollowerGroup")));
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
    return (h(Host, { "data-element": "follow-card" }, this.hasGroupAccess
      ? h("div", null, h("div", { class: `cta-text ${this.callToActionClass}` }, this.cardConfig.callToActionText), h("arcgis-hub-follow-action", { buttonAlign: buttonAlign, buttonStyle: buttonStyle, buttonText: buttonText, entityAccess: this._entity.access, entityId: entityId, entityType: entityType, followersGroup: this.followersGroup, onArcgisHubFollowActionChange: this.handleArcgisHubFollowActionChange, onStartFollowActionPopoutAuth: this.handleStartFollowCardPopoutAuth, unfollowButtonText: unfollowButtonText }))
      : this.isEditingSite && this.renderNotice()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_context": ["cardConfigUpdated"],
    "cardConfig": ["cardConfigUpdated"]
  }; }
};
ArcgisHubFollowCard.style = arcgisHubFollowCardCss;

export { ArcgisHubFollowCard as arcgis_hub_follow_card };
