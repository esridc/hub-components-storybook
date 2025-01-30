'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const context = require('./context-0167a31e.js');
const interfaces = require('./interfaces-fc0046ff.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
const thumbnail = require('./thumbnail-2e1ddd35.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./resultToCardModel-4eef0604.js');
require('./get-with-default-d1b1754d.js');
require('./get-family-cafa88bb.js');
require('./getEntityThumbnailUrl-4312f5ce.js');
require('./discussions-09889d00.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./helpers-64227739.js');
require('./cache-4d33af79.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./download-list-00ce3845.js');
require('./index-77618030.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./fetchContent-963f3885.js');
require('./tslib.es6-b6cfa7d7.js');
require('./_enrichments-a40a3850.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./append-custom-params-0f5d0fe2.js');
require('./OperationError-902f34ae.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./slugs-8f743e2c.js');
require('./is-guid-b5c2b74c.js');
require('./request-79b61e92.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./utils-7f390376.js');
require('./tslib.es6-846f687c.js');
require('./discussions-api-request-e9e6e346.js');
require('./update-b8977041.js');
require('./get-52661c13.js');
require('./update-7b2b2d9d.js');

const arcgisHubGalleryLayoutCompactCss = ":host{display:block;--calcite-block-padding:0}calcite-block{margin-block:0}h1,h2,h3,h4,h5,h6{font-family:var(--hub-heading-family, inherit)}calcite-list-item{margin-bottom:1rem}calcite-list-item calcite-button{margin:0 0.25rem}arcgis-hub-image{height:96px;aspect-ratio:200 / 133}.previous-results-end{position:absolute}div[\"slot=content-bottom\"]{padding:3px}dl{padding-inline:0.75rem}dl span{display:inline-flex;margin-inline-end:1rem;gap:0.5rem}dd{font-weight:bolder;margin:0}";

const ArcgisHubGalleryLayoutCompact = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubCardSelect = index.createEvent(this, "arcgisHubCardSelect", 7);
    this.searchResults = [];
    this.loading = false;
    this.selectedIds = [];
    this.baseUrl = undefined;
    this.linkTarget = 'self';
    this.limit = 10;
    this.newTab = false;
    this.cardTitleTag = undefined;
    this.showEmptyState = true;
    this.showThumbnail = true;
    this.imageType = interfaces.IMAGE_TYPES.thumbnail;
    this.lazy = false;
    this.selectionMode = 'none';
    this.showLinkButton = false;
    this.linkButtonText = undefined;
    this.cardActionLinks = [];
    this.lastSearchResultsCount = undefined;
    this.hasError = false;
    this.callback = undefined;
    context.bind(this, 'handleSelect', 'setPreviousResultsEnd');
  }
  get shouldRenderEmptyState() {
    return !this.searchResults.length && this.showEmptyState || this.hasError;
  }
  get context() {
    return state.getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  componentDidUpdate() {
    var _a;
    (_a = this.previousResultsEnd) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
  }
  handleSelect(event) {
    const id = event.target.dataset.id;
    this.arcgisHubCardSelect.emit({ id });
  }
  setPreviousResultsEnd(el) {
    this.previousResultsEnd = el;
  }
  renderThumbnail(model) {
    // TODO: we should have an entitythumbnail component - possibly a function component
    let image;
    // Only render the thumbnail when not in loading state
    // so the <calcite-card> loader will not appear in thumbnail slot in row layout
    if (this.showThumbnail) {
      if (model.type === "User" || model.type === "channel") ;
      else {
        // content/item or group
        // const className = this.getThumbnailClassName(model);
        // eslint-disable-next-line unicorn/prefer-ternary
        if (this.imageType === interfaces.IMAGE_TYPES.thumbnail) {
          image = index.h("arcgis-hub-image", { alt: "",
            // class={className}
            fallback: thumbnail.getFallbackUrl(model), lazy: this.lazy, slot: "content-start", src: thumbnail.getThumbnailUrl(model, 40, this.context) });
        }
      }
    }
    return image;
  }
  getViewModel(model) {
    const opts = {
      actionLinks: this.cardActionLinks,
      baseUrl: this.baseUrl,
      locale: this.intl.locale,
      target: this.linkTarget
    };
    return thumbnail.getViewModel(model, 'row', opts, this.callback, this.context, this.intl);
  }
  renderResult(result) {
    // TODO: this is nowhere near a complete implementation
    // i think using calcite-list is the way to go , mostly because it supports selection
    const model = this.getViewModel(result);
    const cardActionLinks = model.actionLinks ? model.actionLinks : this.cardActionLinks;
    /** Mark all pre-selected cards as selected in current list */
    const selected = this.selectedIds.includes(result.id);
    return index.h("calcite-list-item", { "data-id": model.id, key: model.id, onCalciteListItemSelect: this.handleSelect, selected: selected }, this.renderThumbnail(model), index.h("div", { slot: "content" }, this.renderTitle(model), index.h("arcgis-multiline-ellipsis", { lines: 2 }, model.summary)), this.renderAdditionalInfo(model.additionalInfo), cardActionLinks.map((actionLink, idx) => {
      return this.renderActionLink(actionLink, this.newTab, `${model.id}-${idx}`);
    }));
  }
  ;
  renderTitle(model) {
    const href = model.titleUrl;
    const TitleTag = this.cardTitleTag || 'h3';
    if (href) {
      return index.h(TitleTag, null, index.h("calcite-link", { href: href, iconEnd: this.newTab ? "launch-2" : "", target: this.newTab ? "_blank" : "_self" }, model.title));
    }
    else {
      index.h(TitleTag, null, model.title);
    }
  }
  // Not used yet, but setting up for future use
  renderAdditionalInfo(infos) {
    if (infos.length) {
      return (index.h("dl", { slot: "content-bottom" }, infos.map((config, idx) => (index.h("span", { key: idx }, index.h("dt", { key: `dt${idx}` }, config.i18nKey ? this.intl.t(config.i18nKey) : config.label), index.h("dd", { key: `dd${idx}` }, config.value))))));
    }
  }
  renderActionLink(actionLink, newTab, key) {
    return actionLink.href ? this.renderButtonActionLink(actionLink, newTab, key) : this.renderActionActionLink(actionLink, key);
  }
  renderButtonActionLink(actionLink, newTab, key) {
    return index.h(index.Fragment, null, index.h("calcite-button", { appearance: actionLink.buttonStyle, href: actionLink.href, "icon-start": actionLink.icon, id: `al-${key}`, key: key, label: actionLink.ariaLabel, rel: "no-follow", scale: "m", slot: "actions-end", target: newTab ? "_blank" : "_self", text: actionLink.label }), this.renderToolltip(actionLink, key));
  }
  renderToolltip(actionLink, key) {
    if (actionLink.tooltip) {
      return index.h("calcite-tooltip", { key: key, label: actionLink.ariaLabel, "overlay-positioning": "fixed", placement: "bottom", "reference-element": `al-${key}`, slot: "actions-end" }, index.h("span", null, actionLink.tooltip));
    }
  }
  renderActionActionLink(actionLink, key) {
    return index.h("calcite-action", { icon: actionLink.icon, key: key, label: actionLink.ariaLabel, scale: "m", slot: "actions-end", text: actionLink.label, textEnabled: actionLink.showLabel });
  }
  _renderLoading() {
    return index.h("div", { class: "card-container" }, index.h("arcgis-skeleton-loader", { active: true, rows: this.limit }));
  }
  /**
   * Render an empty state if there are no results,
   * or if there is an error
   */
  _renderEmptyState() {
    const messageKey = this.hasError ? "helpState.error.message" : "helpState.noResults.message";
    const message = this.intl.t(messageKey);
    const actionSlot = this.hasError ? "search-error-action" : "no-results-action";
    return (index.h(index.Fragment, null, index.h("arcgis-hub-help-state", { icon: "file-magnifying-glass" }, index.h("div", { "aria-live": "polite", role: "status", slot: "message" }, index.h("h3", null, message)), index.h("span", { slot: "actions" }, index.h("div", { class: "no-results-action-container" }, index.h("slot", { name: actionSlot }))))));
  }
  _renderResults() {
    const { searchResults } = this;
    let result;
    if (!!searchResults.length) {
      const results = searchResults.reduce((acc, result, idx) => {
        acc.push(this.renderResult(result));
        // inject a focusable element at the end of the previous list of results
        // after render, we focus that element if it is present
        // which will be the case after a user clicks the more results button in the parent component
        if (idx === this.lastSearchResultsCount - 1) {
          acc.push(index.h("div", { class: "previous-results-end", ref: this.setPreviousResultsEnd, tabIndex: -1 }));
        }
        return acc;
      }, []);
      result = index.h(index.Fragment, null, index.h("div", { class: "card-container", "data-test": "result-container" }, index.h("calcite-list", { selectionMode: this.selectionMode }, results)));
    }
    else if (this.shouldRenderEmptyState) {
      result = this._renderEmptyState();
    }
    return result;
  }
  render() {
    return (index.h(index.Host, { "data-element": "gallery-layout-compact" }, this.loading ? this._renderLoading() : this._renderResults()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubGalleryLayoutCompact.style = arcgisHubGalleryLayoutCompactCss;

exports.arcgis_hub_gallery_layout_compact = ArcgisHubGalleryLayoutCompact;
