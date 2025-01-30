import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { C as CORNERS } from './interfaces-0d0bef14.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisHubGroupsCardCss = ":host{display:block}.text-left{text-align:left}.text-right{text-align:right}.text-center{text-align:center}h5{font-size:1.375rem;font-weight:var(--calcite-font-weight-normal)}.empty-state{height:20rem;width:100%;display:flex;align-items:center;justify-content:center}calcite-icon{height:60%;width:60%}.hide{display:none}";

const ArcgisHubGroupsCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.groups = [];
    this.newTab = false;
    this.showThumbnail = true;
    this.cardTitle = undefined;
    this.titleAlign = 'left';
    this.layout = 'grid';
    this.corners = CORNERS.square;
    this.showEmptyState = true;
    this.baseUrl = undefined;
    this.searchResponseHasResults = undefined;
  }
  async componentWillLoad() {
    // Hook up intl
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.generateCollection();
  }
  // Should this or another function in this component be watching for context? I ended up removing it completely which doesn't seem quite right to me...
  onGroupsChanged() {
    this.generateCollection();
  }
  onResultsChange(event) {
    const results = event.detail;
    // Determine if there are any search results.
    this.searchResponseHasResults = results.length > 0;
  }
  generateCollection() {
    if (this.groups.length) {
      // Create filters, basically is just the group ids.
      this.collection = {
        key: "group-card-cpllection",
        label: "Group Card Collection",
        targetEntity: "group",
        include: [],
        scope: {
          targetEntity: "group",
          filters: [
            {
              predicates: [
                {
                  id: {
                    any: this.groups
                  }
                }
              ]
            }
          ]
        }
      };
    }
  }
  renderCardTitle() {
    // If we want to show a card title
    if (this.cardTitle) {
      // Render it
      // if a card title was passed in use it, or default back to intl.
      return (h("div", { class: {
          ["title-wrapper"]: true,
          [`text-${this.titleAlign}`]: true,
          hide: (!this.showEmptyState && !this.searchResponseHasResults)
        } }, h("h5", null, this.cardTitle)));
    }
  }
  render() {
    // If we have any groups...
    return this.groups.length ? (h(Host, null, this.renderCardTitle(), h("arcgis-hub-gallery", { baseUrl: this.baseUrl, corners: this.corners, layout: this.layout, limit: this.groups.length + 1, linkTarget: "siteRelative", newTab: this.newTab, query: this.collection.scope, showBadges: false, showEmptyState: this.showEmptyState, showThumbnail: this.showThumbnail, sortByIds: this.groups }))) : (h("div", { class: "empty-state" }, h("calcite-icon", { icon: "group", scale: "l" })));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "groups": ["onGroupsChanged"]
  }; }
};
ArcgisHubGroupsCard.style = arcgisHubGroupsCardCss;

export { ArcgisHubGroupsCard as arcgis_hub_groups_card };
