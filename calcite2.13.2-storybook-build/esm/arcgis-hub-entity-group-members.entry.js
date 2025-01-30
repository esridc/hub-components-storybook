import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisHubEntityGroupMembersCss = ":host{display:block;height:100%}";

const ArcgisHubEntityGroupMembers = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.entity = undefined;
  }
  async componentWillLoad() {
    await this.loadTranslations();
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  render() {
    return (h(Host, { "data-element": "group-entity-members" }, h("arcgis-hub-workspace-pane", null, h("h1", { slot: "title" }, this.intl.t("title")), h("arcgis-hub-group-members-manager", { groupId: this.entity.id }))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityGroupMembers.style = arcgisHubEntityGroupMembersCss;

export { ArcgisHubEntityGroupMembers as arcgis_hub_entity_group_members };
