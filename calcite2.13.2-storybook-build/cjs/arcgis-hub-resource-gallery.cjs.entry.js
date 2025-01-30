'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const state = require('./state-6637df8c.js');
const interfaces = require('./interfaces-fc0046ff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');

const arcgisHubResourceGalleryCss = ":host{display:block}";

const ArcgisHubResourceGallery = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    this._context = state.getGlobalContext();
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
    return (this.hasResults ? index.h(HeadingTag, null, this.headingText) : null);
  }
  onResourceGalleryResultsChanged(event) {
    this.hasResults = event.detail.length > 0;
  }
  render() {
    return (index.h(index.Host, { "data-element": "resource-gallery" }, this.renderHeader(), index.h("arcgis-hub-gallery", { baseUrl: this._context.hubHomeUrl, callback: this.resourceCallback, corners: interfaces.CORNERS.round, galleryType: "item", layout: "compact", limit: this.limit, "link-target": "siteRelative", newTab: true, query: this.resourceQuery, shadow: interfaces.DROP_SHADOWS.low, showEmptyState: false, showSearch: false, showThumbnail: false, sortField: "modified", sortOrder: "desc" }, index.h("div", { slot: "loading-screen" }))));
  }
  get element() { return index.getElement(this); }
};
ArcgisHubResourceGallery.style = arcgisHubResourceGalleryCss;

exports.arcgis_hub_resource_gallery = ArcgisHubResourceGallery;
