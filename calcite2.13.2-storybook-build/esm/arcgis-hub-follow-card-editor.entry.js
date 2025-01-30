import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { b as bind } from './context-7d8f7366.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { g as getEditorConfig } from './getEditorConfig-a89f031d.js';
import { g as getEntityFollowersGroupId } from './follow-76eed880.js';
import { a as fetchHubGroup } from './hubSearch-41612481.js';
import { f as fetchHubEntity } from './fetchHubEntity-28d04ab4.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './interpolate-d39d6151.js';
import './get-prop-ec5be510.js';
import './_deep-map-values-53f8dbd1.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './append-custom-params-4bd856e5.js';
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
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './get-form-json-1d4e3591.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './settings-2d4e159a.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';

const arcgisHubFollowCardEditorCss = ":host{display:block}calcite-notice{margin-top:1rem;margin-bottom:2rem}";

const ArcgisHubFollowCardEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubFollowCardEditorChange = createEvent(this, "arcgisHubFollowCardEditorChange", 7);
    this.values = {};
    this._context = getGlobalContext();
    this._schema = undefined;
    this._uiSchema = undefined;
    this.showOutdatedItemNotice = false;
    this.showMissingFollowersGroupNotice = false;
    this.showNoGroupAccessNotice = false;
    this._values = {};
    bind(this, 'handleEditorChange', 'translationFunc', '_getEditorConfig');
  }
  async componentWillLoad() {
    var _a, _b;
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this._values = cloneObject(this.values);
    await this._getEditorConfig();
    await this.checkItemsFollowersGroup((_a = this._values.entityId) === null || _a === void 0 ? void 0 : _a[0], this._values.entityType);
    await this.checkGroupAccess();
    await this.checkEntityAccess((_b = this._values.entityId) === null || _b === void 0 ? void 0 : _b[0], this._values.entityType, this._context);
    // only show the outdated item notice when user has access to it
    this.showOutdatedItemNotice = this.entity && this._values.entityType === "initiative";
  }
  async _getEditorConfig() {
    const config = await getEditorConfig("", "hub:card:follow", {}, this._context);
    this._schema = config.schema;
    this._uiSchema = interpolateTranslations(this.intl, config.uiSchema);
  }
  async handleEditorChange(event) {
    var _a;
    event.stopPropagation();
    // We want to keep the entityId a string but since the gallery picker
    // always emits an array of item ids, we need to convert it to a
    // string here
    const entityId = (_a = event.detail.values.entityId) === null || _a === void 0 ? void 0 : _a[0];
    const entityType = this._values.entityType;
    // If the user has access to the selected item, we want to check if the item
    // has a followers group and if the user has access to that group
    if (entityId) {
      await this.checkItemsFollowersGroup(entityId, entityType);
      await this.checkGroupAccess();
    }
    else {
      // We only show the notice when an invalid item is picked, we can
      // hide the notice as soon as the user removes the selected item
      this.showOutdatedItemNotice = false;
      this.showMissingFollowersGroupNotice = false;
      this.showNoGroupAccessNotice = false;
    }
    this.arcgisHubFollowCardEditorChange.emit({
      valid: event.detail.valid,
      values: Object.assign(Object.assign(Object.assign({}, this._values), event.detail.values), { entityId, entityType: 'site' })
    });
  }
  /**
   * Check whether the item has a followers group
   * @param entityId
   * @param entityType
   */
  async checkItemsFollowersGroup(entityId, entityType) {
    if (entityId) {
      try {
        this.followersGroupId = await getEntityFollowersGroupId(entityId, entityType, this._context);
        this.showMissingFollowersGroupNotice = !this.followersGroupId;
      }
      catch (e) {
        console.error(`Error fetching followers group id: ${e}`);
      }
    }
  }
  /**
   * Check whether the user has access to the item's followers group
   */
  async checkGroupAccess() {
    try {
      await fetchHubGroup(this.followersGroupId, this._context.hubRequestOptions);
    }
    catch (e) {
      this.showNoGroupAccessNotice = !!this.followersGroupId;
    }
  }
  /**
   * Fetch for the entity, if the entity is inaccessible, set the entityId in _values
   * to [] so the configuration editor will reload and meet the HIDE_FOR_NO_ENTITY_ID
   * rule to hide the fields under the gallery picker
   */
  async checkEntityAccess(entityId, entityType, context) {
    try {
      this.entity = await fetchHubEntity(entityType, entityId, context);
    }
    catch (e) {
      this._values.entityId = [];
    }
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  renderOutdatedItemNotice() {
    return h("calcite-notice", { icon: "exclamation-mark-triangle", kind: "warning", open: true }, h("div", { slot: "title" }, this.intl.t("notice.outdatedItem.title")), h("div", { slot: "message" }, this.intl.t("notice.outdatedItem.message")));
  }
  renderMissingFollowersGroupNotice() {
    return h("calcite-notice", { icon: "exclamation-mark-triangle", kind: "warning", open: true }, h("div", { slot: "title" }, this.intl.t("notice.missingFollowersGroup.title")), h("div", { slot: "message" }, this.intl.t("notice.missingFollowersGroup.message")));
  }
  renderNoGroupAccessNotice() {
    return h("calcite-notice", { icon: "exclamation-mark-triangle", kind: "warning", open: true }, h("div", { slot: "title" }, this.intl.t("notice.noGroupAccess.title")), h("div", { slot: "message" }, this.intl.t("notice.noGroupAccess.message")));
  }
  render() {
    return (h(Host, null, this.showOutdatedItemNotice && this.renderOutdatedItemNotice(), this.showMissingFollowersGroupNotice && this.renderMissingFollowersGroupNotice(), this.showNoGroupAccessNotice && this.renderNoGroupAccessNotice(), this._schema
      ? h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._values })
      : h("arcgis-skeleton-loader", { active: true })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubFollowCardEditor.style = arcgisHubFollowCardEditorCss;

export { ArcgisHubFollowCardEditor as arcgis_hub_follow_card_editor };
