import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { C as CORNERS, I as IMAGE_TYPES } from './interfaces-0d0bef14.js';

const arcgisHubGalleryLayoutCalendarCss = ":host{display:block}arcgis-hub-gallery-layout-list{margin-top:1rem}";

const ArcgisHubGalleryLayoutCalendar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.searchResults = [];
    this.loading = false;
    this.baseUrl = undefined;
    this.linkTarget = 'self';
    this.limit = 10;
    this.newTab = false;
    this.showAdditionalInfo = true;
    this.showEmptyState = true;
    this.showLinkButton = false;
    this.showBadges = true;
    this.showType = true;
    this.showOwner = true;
    this.cardActionLinks = [];
    this.hasError = false;
    this.callback = undefined;
    this.shouldShowResults = false;
    this.showThumbnail = true;
    this.corners = CORNERS.square;
    this.shadow = undefined;
    this.selectedIds = [];
    this.selectionMode = 'none';
    this.linkButtonText = undefined;
    this.linkButtonStyle = undefined;
    this.cardTitleTag = undefined;
    this.lastSearchResultsCount = undefined;
    this.imageType = IMAGE_TYPES.thumbnail;
    this.lazy = false;
  }
  get shouldRenderEmptyState() {
    return !this.searchResults.length && this.showEmptyState || this.hasError;
  }
  _renderLoading() {
    return h("div", { class: "card-container" }, h("calcite-loader", { active: true }));
  }
  _renderCalendar() {
    return (h("div", { class: "card-container", "data-test": "result-container" }, h("arcgis-hub-calendar", { interactable: false, searchResults: this.searchResults })));
  }
  _renderList() {
    return (h("arcgis-hub-gallery-layout-list", { baseUrl: this.baseUrl, callback: this.callback, cardActionLinks: this.cardActionLinks, cardTitleTag: this.cardTitleTag, corners: this.corners, imageType: this.imageType, lastSearchResultsCount: this.lastSearchResultsCount, layout: "grid", lazy: this.lazy, limit: this.limit, linkButtonStyle: this.linkButtonStyle, linkButtonText: this.linkButtonText, linkTarget: this.linkTarget, loading: false, newTab: this.newTab, searchResults: this.searchResults, selectedIds: this.selectedIds, selectionMode: this.selectionMode, shadow: this.shadow, showAdditionalInfo: this.showAdditionalInfo, showBadges: this.showBadges, showEmptyState: this.showEmptyState, showLinkButton: this.showLinkButton, showOwner: this.showOwner, showThumbnail: this.showThumbnail, showType: this.showType }));
  }
  render() {
    return (h(Host, { "data-element": "gallery-layout-calendar" }, this.loading ? this._renderLoading() : this._renderCalendar(), this.shouldShowResults && this._renderList()));
  }
  get element() { return getElement(this); }
};
ArcgisHubGalleryLayoutCalendar.style = arcgisHubGalleryLayoutCalendarCss;

export { ArcgisHubGalleryLayoutCalendar as arcgis_hub_gallery_layout_calendar };
