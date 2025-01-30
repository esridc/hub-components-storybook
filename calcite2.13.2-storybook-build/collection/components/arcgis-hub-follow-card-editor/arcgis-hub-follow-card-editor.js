import { h, Host } from '@stencil/core';
import { getGlobalContext } from '../../utils/state';
import { cloneObject, fetchHubEntity, fetchHubGroup, getEditorConfig, getEntityFollowersGroupId } from '@esri/hub-common';
import { bind } from '../../utils/context';
import intlManager from '../../utils/intl-manager';
import { interpolateTranslations } from '../../utils/localization/interpolate-translations';
export class ArcgisHubFollowCardEditor {
  constructor() {
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
  static get is() { return "arcgis-hub-follow-card-editor"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-follow-card-editor.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-follow-card-editor.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "values": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IConfigurationValues",
          "resolved": "IConfigurationValues",
          "references": {
            "IConfigurationValues": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Editor configuration values to be used in\nthe configuration editor"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "_context": {},
      "_schema": {},
      "_uiSchema": {},
      "showOutdatedItemNotice": {},
      "showMissingFollowersGroupNotice": {},
      "showNoGroupAccessNotice": {},
      "_values": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubFollowCardEditorChange",
        "name": "arcgisHubFollowCardEditorChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event that fires when any values change in\nthe editor"
        },
        "complexType": {
          "original": "IChangeEventDetail",
          "resolved": "IChangeEventDetail",
          "references": {
            "IChangeEventDetail": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
