import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { C as CORNERS, D as DROP_SHADOWS } from './interfaces-0d0bef14.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';

const arcgisHubResourceGalleryCss = ":host{display:block}";

const ArcgisHubResourceGallery = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Callback to modify the model for the resource gallery
     * where we want to clear any action links and additional infos
     * so it's a very minimal rendering
     * @param model
     * @param _layout
     * @param _context
     * @param _result
     * @returns
     */
    this.resourceCallback = (model, _layout, _context, _result) => {
      model.additionalInfo = [];
      model.actionLinks = [];
      return model;
    };
    this.headingText = undefined;
    this.headingLevel = 3;
    this.tags = [];
    this.limit = 4;
    this._context = getGlobalContext();
    this.hasResults = false;
  }
  get resourceQuery() {
    const resourceGroupIds = this._context.resourceGroupIDs || [];
    // create the predicate for the query
    const predicate = {
      group: resourceGroupIds,
      type: ["Document Link"],
    };
    // if we have tags, add them to the query
    if (this.tags.length) {
      predicate.tags = this.tags;
    }
    // construct the whole query
    const query = {
      targetEntity: "item",
      filters: [
        {
          predicates: [
            predicate
          ],
        }
      ]
    };
    // console.log(query);
    // return it
    return query;
  }
  renderHeader() {
    const HeadingTag = `h${this.headingLevel}`;
    return (this.hasResults ? h(HeadingTag, null, this.headingText) : null);
  }
  onResourceGalleryResultsChanged(event) {
    this.hasResults = event.detail.length > 0;
  }
  render() {
    return (h(Host, { "data-element": "resource-gallery" }, this.renderHeader(), h("arcgis-hub-gallery", { baseUrl: this._context.hubHomeUrl, callback: this.resourceCallback, corners: CORNERS.round, galleryType: "item", layout: "compact", limit: this.limit, "link-target": "siteRelative", newTab: true, query: this.resourceQuery, shadow: DROP_SHADOWS.low, showEmptyState: false, showSearch: false, showThumbnail: false, sortField: "modified", sortOrder: "desc" }, h("div", { slot: "loading-screen" }))));
  }
  get element() { return getElement(this); }
};
ArcgisHubResourceGallery.style = arcgisHubResourceGalleryCss;

export { ArcgisHubResourceGallery as arcgis_hub_resource_gallery };
