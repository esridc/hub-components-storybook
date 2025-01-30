import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import { I as IMAGE_TYPES } from './interfaces-0d0bef14.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { g as getFallbackUrl, a as getThumbnailUrl, b as getViewModel } from './thumbnail-05162ec7.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './resultToCardModel-4f88e531.js';
import './get-with-default-b819d95d.js';
import './get-family-543fac52.js';
import './getEntityThumbnailUrl-d6b416fe.js';
import './discussions-a173baa3.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './request-fa80ae40.js';
import './helpers-8c7e5e31.js';
import './cache-4bea61e0.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './download-list-38d6b571.js';
import './index-55cb25f7.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './append-custom-params-4bd856e5.js';
import './OperationError-387ae9ab.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './slugs-7b8828d5.js';
import './is-guid-982831aa.js';
import './request-3e386aeb.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './utils-6bf1b713.js';
import './tslib.es6-0e03e357.js';
import './discussions-api-request-199cae2d.js';
import './update-6a7d5697.js';
import './get-850c466d.js';
import './update-26e2fbc1.js';

const arcgisHubGalleryLayoutCompactCss = ":host{display:block;--calcite-block-padding:0}calcite-block{margin-block:0}h1,h2,h3,h4,h5,h6{font-family:var(--hub-heading-family, inherit)}calcite-list-item{margin-bottom:1rem}calcite-list-item calcite-button{margin:0 0.25rem}arcgis-hub-image{height:96px;aspect-ratio:200 / 133}.previous-results-end{position:absolute}div[\"slot=content-bottom\"]{padding:3px}dl{padding-inline:0.75rem}dl span{display:inline-flex;margin-inline-end:1rem;gap:0.5rem}dd{font-weight:bolder;margin:0}";

const ArcgisHubGalleryLayoutCompact = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubCardSelect = createEvent(this, "arcgisHubCardSelect", 7);
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
    this.imageType = IMAGE_TYPES.thumbnail;
    this.lazy = false;
    this.selectionMode = 'none';
    this.showLinkButton = false;
    this.linkButtonText = undefined;
    this.cardActionLinks = [];
    this.lastSearchResultsCount = undefined;
    this.hasError = false;
    this.callback = undefined;
    bind(this, 'handleSelect', 'setPreviousResultsEnd');
  }
  get shouldRenderEmptyState() {
    return !this.searchResults.length && this.showEmptyState || this.hasError;
  }
  get context() {
    return getGlobalContext();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
        if (this.imageType === IMAGE_TYPES.thumbnail) {
          image = h("arcgis-hub-image", { alt: "",
            // class={className}
            fallback: getFallbackUrl(model), lazy: this.lazy, slot: "content-start", src: getThumbnailUrl(model, 40, this.context) });
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
    return getViewModel(model, 'row', opts, this.callback, this.context, this.intl);
  }
  renderResult(result) {
    // TODO: this is nowhere near a complete implementation
    // i think using calcite-list is the way to go , mostly because it supports selection
    const model = this.getViewModel(result);
    const cardActionLinks = model.actionLinks ? model.actionLinks : this.cardActionLinks;
    /** Mark all pre-selected cards as selected in current list */
    const selected = this.selectedIds.includes(result.id);
    return h("calcite-list-item", { "data-id": model.id, key: model.id, onCalciteListItemSelect: this.handleSelect, selected: selected }, this.renderThumbnail(model), h("div", { slot: "content" }, this.renderTitle(model), h("arcgis-multiline-ellipsis", { lines: 2 }, model.summary)), this.renderAdditionalInfo(model.additionalInfo), cardActionLinks.map((actionLink, idx) => {
      return this.renderActionLink(actionLink, this.newTab, `${model.id}-${idx}`);
    }));
  }
  ;
  renderTitle(model) {
    const href = model.titleUrl;
    const TitleTag = this.cardTitleTag || 'h3';
    if (href) {
      return h(TitleTag, null, h("calcite-link", { href: href, iconEnd: this.newTab ? "launch-2" : "", target: this.newTab ? "_blank" : "_self" }, model.title));
    }
    else {
      h(TitleTag, null, model.title);
    }
  }
  // Not used yet, but setting up for future use
  renderAdditionalInfo(infos) {
    if (infos.length) {
      return (h("dl", { slot: "content-bottom" }, infos.map((config, idx) => (h("span", { key: idx }, h("dt", { key: `dt${idx}` }, config.i18nKey ? this.intl.t(config.i18nKey) : config.label), h("dd", { key: `dd${idx}` }, config.value))))));
    }
  }
  renderActionLink(actionLink, newTab, key) {
    return actionLink.href ? this.renderButtonActionLink(actionLink, newTab, key) : this.renderActionActionLink(actionLink, key);
  }
  renderButtonActionLink(actionLink, newTab, key) {
    return h(Fragment, null, h("calcite-button", { appearance: actionLink.buttonStyle, href: actionLink.href, "icon-start": actionLink.icon, id: `al-${key}`, key: key, label: actionLink.ariaLabel, rel: "no-follow", scale: "m", slot: "actions-end", target: newTab ? "_blank" : "_self", text: actionLink.label }), this.renderToolltip(actionLink, key));
  }
  renderToolltip(actionLink, key) {
    if (actionLink.tooltip) {
      return h("calcite-tooltip", { key: key, label: actionLink.ariaLabel, "overlay-positioning": "fixed", placement: "bottom", "reference-element": `al-${key}`, slot: "actions-end" }, h("span", null, actionLink.tooltip));
    }
  }
  renderActionActionLink(actionLink, key) {
    return h("calcite-action", { icon: actionLink.icon, key: key, label: actionLink.ariaLabel, scale: "m", slot: "actions-end", text: actionLink.label, textEnabled: actionLink.showLabel });
  }
  _renderLoading() {
    return h("div", { class: "card-container" }, h("arcgis-skeleton-loader", { active: true, rows: this.limit }));
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
        acc.push(this.renderResult(result));
        // inject a focusable element at the end of the previous list of results
        // after render, we focus that element if it is present
        // which will be the case after a user clicks the more results button in the parent component
        if (idx === this.lastSearchResultsCount - 1) {
          acc.push(h("div", { class: "previous-results-end", ref: this.setPreviousResultsEnd, tabIndex: -1 }));
        }
        return acc;
      }, []);
      result = h(Fragment, null, h("div", { class: "card-container", "data-test": "result-container" }, h("calcite-list", { selectionMode: this.selectionMode }, results)));
    }
    else if (this.shouldRenderEmptyState) {
      result = this._renderEmptyState();
    }
    return result;
  }
  render() {
    return (h(Host, { "data-element": "gallery-layout-compact" }, this.loading ? this._renderLoading() : this._renderResults()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubGalleryLayoutCompact.style = arcgisHubGalleryLayoutCompactCss;

export { ArcgisHubGalleryLayoutCompact as arcgis_hub_gallery_layout_compact };
