'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisHubEntityGroupMembersCss = ":host{display:block;height:100%}";

const ArcgisHubEntityGroupMembers = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
  }
  async componentWillLoad() {
    await this.loadTranslations();
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  render() {
    return (index.h(index.Host, { "data-element": "group-entity-members" }, index.h("arcgis-hub-workspace-pane", null, index.h("h1", { slot: "title" }, this.intl.t("title")), index.h("arcgis-hub-group-members-manager", { groupId: this.entity.id }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityGroupMembers.style = arcgisHubEntityGroupMembersCss;

exports.arcgis_hub_entity_group_members = ArcgisHubEntityGroupMembers;
