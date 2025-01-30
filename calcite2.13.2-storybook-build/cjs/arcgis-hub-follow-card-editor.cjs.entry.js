'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const context = require('./context-0167a31e.js');
const intlManager = require('./intl-manager-f0103583.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
const util = require('./util-38e73510.js');
const getEditorConfig = require('./getEditorConfig-1d006950.js');
const follow = require('./follow-c7e71158.js');
const hubSearch = require('./hubSearch-79d30702.js');
const fetchHubEntity = require('./fetchHubEntity-88467d55.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./interpolate-c1fe951a.js');
require('./get-prop-4bd8fc1a.js');
require('./_deep-map-values-d489006b.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./append-custom-params-0f5d0fe2.js');
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
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./get-form-json-e6831b20.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./settings-0b8cd93b.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');

const arcgisHubFollowCardEditorCss = ":host{display:block}calcite-notice{margin-top:1rem;margin-bottom:2rem}";

const ArcgisHubFollowCardEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubFollowCardEditorChange = index.createEvent(this, "arcgisHubFollowCardEditorChange", 7);
    this.values = {};
    this._context = state.getGlobalContext();
    this._schema = undefined;
    this._uiSchema = undefined;
    this.showOutdatedItemNotice = false;
    this.showMissingFollowersGroupNotice = false;
    this.showNoGroupAccessNotice = false;
    this._values = {};
    context.bind(this, 'handleEditorChange', 'translationFunc', '_getEditorConfig');
  }
  async componentWillLoad() {
    var _a, _b;
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this._values = util.cloneObject(this.values);
    await this._getEditorConfig();
    await this.checkItemsFollowersGroup((_a = this._values.entityId) === null || _a === void 0 ? void 0 : _a[0], this._values.entityType);
    await this.checkGroupAccess();
    await this.checkEntityAccess((_b = this._values.entityId) === null || _b === void 0 ? void 0 : _b[0], this._values.entityType, this._context);
    // only show the outdated item notice when user has access to it
    this.showOutdatedItemNotice = this.entity && this._values.entityType === "initiative";
  }
  async _getEditorConfig() {
    const config = await getEditorConfig.getEditorConfig("", "hub:card:follow", {}, this._context);
    this._schema = config.schema;
    this._uiSchema = interpolateTranslations.interpolateTranslations(this.intl, config.uiSchema);
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
        this.followersGroupId = await follow.getEntityFollowersGroupId(entityId, entityType, this._context);
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
      await hubSearch.fetchHubGroup(this.followersGroupId, this._context.hubRequestOptions);
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
      this.entity = await fetchHubEntity.fetchHubEntity(entityType, entityId, context);
    }
    catch (e) {
      this._values.entityId = [];
    }
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  renderOutdatedItemNotice() {
    return index.h("calcite-notice", { icon: "exclamation-mark-triangle", kind: "warning", open: true }, index.h("div", { slot: "title" }, this.intl.t("notice.outdatedItem.title")), index.h("div", { slot: "message" }, this.intl.t("notice.outdatedItem.message")));
  }
  renderMissingFollowersGroupNotice() {
    return index.h("calcite-notice", { icon: "exclamation-mark-triangle", kind: "warning", open: true }, index.h("div", { slot: "title" }, this.intl.t("notice.missingFollowersGroup.title")), index.h("div", { slot: "message" }, this.intl.t("notice.missingFollowersGroup.message")));
  }
  renderNoGroupAccessNotice() {
    return index.h("calcite-notice", { icon: "exclamation-mark-triangle", kind: "warning", open: true }, index.h("div", { slot: "title" }, this.intl.t("notice.noGroupAccess.title")), index.h("div", { slot: "message" }, this.intl.t("notice.noGroupAccess.message")));
  }
  render() {
    return (index.h(index.Host, null, this.showOutdatedItemNotice && this.renderOutdatedItemNotice(), this.showMissingFollowersGroupNotice && this.renderMissingFollowersGroupNotice(), this.showNoGroupAccessNotice && this.renderNoGroupAccessNotice(), this._schema
      ? index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._values })
      : index.h("arcgis-skeleton-loader", { active: true })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubFollowCardEditor.style = arcgisHubFollowCardEditorCss;

exports.arcgis_hub_follow_card_editor = ArcgisHubFollowCardEditor;
