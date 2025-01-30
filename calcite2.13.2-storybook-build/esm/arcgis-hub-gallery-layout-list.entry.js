import { r as registerInstance, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { I as IMAGE_TYPES, C as CORNERS } from './interfaces-0d0bef14.js';
import { b as bind } from './context-7d8f7366.js';
import { R as ResizeObserverManager } from './resize-observer-dc6e269e.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getCardModelUrlFromResult } from './getCardModelUrl-a5543776.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisHubGalleryLayoutListCss = ":host{display:block;--columns:4;--hub-gallery-font-size-large:var(--calcite-font-size-1);--hub-gallery-bulk-actions-bottom:4rem}h1,h2,h3,h4,h5,h6{font-family:var(--hub-heading-family, inherit)}:host([layout=\"list\"]) .card-container,:host([layout=\"grid\"]) .card-container,:host([layout=\"grid-filled\"]) .card-container{display:grid;gap:1.5rem}:host([layout=\"list\"]) .card-container{list-style-type:none;margin-block-start:0;margin-block-end:0;margin-inline-start:0;margin-inline-end:0;padding-inline-start:0}:host([layout=\"grid\"]) .card-container{grid-template-columns:repeat(auto-fill, minmax(max(240px, (100% - (4 - 1) * 24px) / 4), 1fr))}:host([layout=\"grid-filled\"]) .card-container{grid-template-columns:repeat(12, 1fr)}:host([layout=\"grid-filled\"]) .card-container>*{grid-column:span calc(12 / var(--columns))}:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+1):last-of-type,:host([layout=\"grid-filled\"]) .card-container.cols-3>*:nth-of-type(3n+1):last-of-type,:host([layout=\"grid-filled\"]) .card-container.cols-2>*:nth-of-type(2n+1):last-of-type{grid-column:span 12 / span 12}:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+1):nth-last-of-type(2),:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+2):last-of-type,:host([layout=\"grid-filled\"]) .card-container.cols-3>*:nth-of-type(3n+1):nth-last-of-type(2),:host([layout=\"grid-filled\"]) .card-container.cols-3>*:nth-of-type(3n+2):last-of-type{grid-column:span 6 / span 6}:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+1):nth-last-of-type(3),:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+2):nth-last-of-type(2),:host([layout=\"grid-filled\"]) .card-container.cols-4>*:nth-of-type(4n+3):last-of-type{grid-column:span 4 / span 4}.previous-results-end{position:absolute}arcgis-hub-entity-card[data-map-selected]{outline-style:solid;outline-width:2px;outline-offset:2px;outline-color:var(--calcite-color-brand)}";

const ArcgisHubGalleryLayoutList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.getCardLayout = (layout, idx, count) => {
      // if it is 'grid' or 'grid-filled', we set it to 'card'; if it is 'list', we set it to 'row'
      let result = layout === 'list' ? 'row' : 'card';
      if (layout === 'grid-filled') {
        // if the last row contains fewer than the number of columns, return 'row' for the ones in the last row
        const numInLastRow = count % this.gridColumns;
        const isInLastRow = idx >= (count - numInLastRow);
        if (numInLastRow < 2 && isInLastRow) {
          // if there are fewer than 2 in the last row and this one is in the last row
          result = 'row';
        }
      }
      return result;
    };
    this.layout = 'list';
    this.searchResults = [];
    this.loading = false;
    this.selectedMapFeatureIds = [];
    this.selectedIds = [];
    this.baseUrl = undefined;
    this.linkTarget = 'self';
    this.limit = 10;
    this.showThumbnail = true;
    this.imageType = IMAGE_TYPES.thumbnail;
    this.lazy = false;
    this.newTab = false;
    this.selectionMode = 'none';
    this.cardTitleTag = undefined;
    this.corners = CORNERS.square;
    this.showAdditionalInfo = true;
    this.showEmptyState = true;
    this.shadow = undefined;
    this.showLinkButton = false;
    this.linkButtonText = undefined;
    this.linkButtonStyle = undefined;
    this.showBadges = true;
    this.showType = true;
    this.showOwner = true;
    this.cardActionLinks = [];
    this.handleMouseEventEntityCard = undefined;
    this.lastSearchResultsCount = undefined;
    this.hasError = false;
    this.callback = undefined;
    this.primaryActionsToRender = 1;
    this.gridColumns = 4;
    bind(this, 'handleResize', 'setPreviousResultsEnd');
  }
  get selectable() {
    return this.selectionMode !== 'none';
  }
  get shouldRenderEmptyState() {
    return !this.searchResults.length && this.showEmptyState || this.hasError;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  connectedCallback() {
    if (this.layout === 'grid-filled') {
      // we could implement grid-filled with css container queries now that they are a thing
      // one wrinkle is that depending on the size and the number of items, we need to send a different layout param to the last one or two cards
      ResizeObserverManager.addHandler(this.element, this.handleResize);
    }
  }
  disconnectedCallback() {
    ResizeObserverManager.unobserve(this.element);
  }
  componentDidUpdate() {
    var _a;
    (_a = this.previousResultsEnd) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
  }
  async handleResize() {
    const width = this.element.clientWidth;
    let gridColumns = 1;
    if (width > 1090) {
      gridColumns = 4;
    }
    else if (width > 810) {
      gridColumns = 3;
    }
    else if (width > 530) {
      gridColumns = 2;
    }
    // set the css custom prop
    this.element.style.setProperty('--columns', `${gridColumns}`);
    // set state so it can be used to calculate whether an individual card should get card or row layout
    this.gridColumns = gridColumns;
  }
  setPreviousResultsEnd(el) {
    this.previousResultsEnd = el;
  }
  renderResult(result, idx = 0) {
    const { searchResults, selectedMapFeatureIds } = this;
    /** Mark all pre-selected cards as selected in current list */
    const selected = this.selectedIds.includes(result.id);
    /** Record index for telemetry purposes */
    result.index = idx;
    /**
     * if showLinkButton is true we want to show a link button
     * at the bottom of the card that links to the same place
     * as the title link. To do this, we leverage actionLinks.
     * This is primarily to support the gallery layout card
     * use-case
     */
    const actionLinks = [...this.cardActionLinks];
    this.showLinkButton && actionLinks.unshift({
      ariaLabel: `${this.linkButtonText} ${result.name}`,
      label: this.linkButtonText,
      showLabel: true,
      href: getCardModelUrlFromResult(result, this.linkTarget, this.baseUrl),
      buttonStyle: this.linkButtonStyle
    });
    return (h("arcgis-hub-entity-card", { actionLinks: actionLinks, baseUrl: this.baseUrl, callback: this.callback,
      // note: this class is specifically needed for
      // e2e test purposes. Please do not remove
      class: "arcgis-hub-entity-card", corners: this.corners, "data-map-selected": selectedMapFeatureIds.includes(result.id), "data-test": result.name, imageType: this.imageType, key: result.id, layout: this.getCardLayout(this.layout, idx, searchResults.length), lazy: this.lazy, linkTarget: this.linkTarget, newTab: this.newTab, onMouseDown: this.handleMouseEventEntityCard, onMouseLeave: this.handleMouseEventEntityCard, onMouseOver: this.handleMouseEventEntityCard, primaryActionsToRender: this.primaryActionsToRender, searchResult: result, selectable: this.selectable, selected: selected, shadow: this.shadow, showAdditionalInfo: this.showAdditionalInfo, showBadges: this.showBadges, showOwner: this.showOwner, showThumbnail: this.showThumbnail, showType: this.showType, titleTag: this.cardTitleTag }));
  }
  ;
  _renderLoading() {
    let headingRows = 1;
    this.showType || this.showOwner && headingRows++;
    this.layout !== 'list' && headingRows++;
    const skeletons = [...Array(this.limit).keys()].map((idx) => {
      return h("arcgis-skeleton-loader", { active: true, headingRows: headingRows, key: idx, rows: 3, showHeading: true, showThumbnail: this.layout !== "list" }, this.showLinkButton && h("div", { class: "loading-link-button" }));
    });
    return h("div", { class: "card-container" }, skeletons);
  }
  /**
   * Render an empty state if there are no results,
   * or if there is an error
   */
  _renderEmptyState() {
    const messageKey = this.hasError ? "helpState.error.message" : "helpState.noResults.message";
    const message = this.intl.t(messageKey);
    const actionSlot = this.hasError ? "search-error-action" : "no-results-action";
    return (h(Fragment, null, h("arcgis-hub-help-state", { icon: "file-magnifying-glass" }, h("div", { "aria-live": "polite", role: "status", slot: "message" }, h("h3", null, message)), h("span", { slot: "actions" }, h("div", { class: "no-results-action-container" }, h("slot", { name: actionSlot }))))));
  }
  _renderResults() {
    const { searchResults } = this;
    let result;
    if (!!searchResults.length) {
      const results = searchResults.reduce((acc, result, idx) => {
        acc.push(this.layout === 'list'
          // A11y requirements dictate that results in a list layout must be wrapped in a list item element
          ? h("li", null, this.renderResult(result, idx))
          : this.renderResult(result, idx));
        // inject a focusable element at the end of the previous list of results
        // after render, we focus that element if it is present
        // which will be the case after a user clicks the more results button in the parent component
        if (idx === this.lastSearchResultsCount - 1) {
          acc.push(h("div", { class: "previous-results-end", ref: this.setPreviousResultsEnd, tabIndex: -1 }));
        }
        return acc;
      }, []);
      // a11y requirements dictate that the list layout must be wrapped in a list element
      const ContainerTag = this.layout === 'list' ? 'ul' : 'div';
      result = h(Fragment, null, h(ContainerTag, { class: {
          'card-container': true,
          [`cols-${this.gridColumns}`]: this.layout === "grid-filled"
        }, "data-test": "result-container" }, results));
    }
    else if (this.shouldRenderEmptyState) {
      result = this._renderEmptyState();
    }
    return result;
  }
  render() {
    return (h(Host, { "data-element": "gallery-layout-list" }, this.loading ? this._renderLoading() : this._renderResults()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubGalleryLayoutList.style = arcgisHubGalleryLayoutListCss;

export { ArcgisHubGalleryLayoutList as arcgis_hub_gallery_layout_list };
