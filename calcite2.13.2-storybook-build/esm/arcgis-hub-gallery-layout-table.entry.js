import { h, F as Fragment, r as registerInstance, c as createEvent, H as Host, a as getElement } from './index-57f71b44.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { c as sanitizeHtml } from './hubSanitizer-45ca9e6e.js';
import { g as getFallbackUrl, a as getThumbnailUrl, b as getViewModel } from './thumbnail-05162ec7.js';
import { A as ALIGNMENTS } from './interfaces-0d0bef14.js';
import { g as getProp } from './get-prop-ec5be510.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './index-213c70d0.js';
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
import './download-list-38d6b571.js';
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

const DEFAULT_ITEM_COLUMNS = ['thumbnail', 'title', 'type', 'source', 'updated', 'actions'];
const DEFAULT_GROUP_COLUMNS = ['thumbnail', 'title', 'managers', 'sharedUpdate', 'updated', 'actions'];
const DEFAULT_EVENT_COLUMNS = ['thumbnail', 'title', 'owner', 'access', 'summary', 'start', 'end', 'actions'];
const DEFAULT_CHANNEL_COLUMNS = ['thumbnail', 'title', 'source', 'access', 'created', 'actions'];
const DEFAULT_USER_COLUMNS = ['thumbnail', 'title', 'username', 'actions'];
const DEFAULT_COLUMNS = ['title', 'created', 'updated', 'actions'];
const DEFAULT_COLUMNS_BY_ENTITY_TYPE = {
  item: DEFAULT_ITEM_COLUMNS,
  group: DEFAULT_GROUP_COLUMNS,
  event: DEFAULT_EVENT_COLUMNS,
  eventAttendee: DEFAULT_USER_COLUMNS,
  channel: DEFAULT_CHANNEL_COLUMNS,
  discussionPost: DEFAULT_COLUMNS,
  communityUser: DEFAULT_USER_COLUMNS,
  groupMember: DEFAULT_USER_COLUMNS,
  portalUser: DEFAULT_USER_COLUMNS,
  user: DEFAULT_USER_COLUMNS
};
// get the default table columns array for a given entity type
const getTableColumns = (entityType, opts, context, columns = DEFAULT_COLUMNS_BY_ENTITY_TYPE[entityType]) => {
  const result = columns.map(col => {
    var _a;
    // eslint-disable-next-line unicorn/prefer-ternary
    if (typeof col === 'string') {
      return (_a = COLUMN_NAME_MAP[col]) === null || _a === void 0 ? void 0 : _a.call(COLUMN_NAME_MAP, opts, context);
    }
    else {
      return col;
    }
  });
  return result.filter(Boolean);
};
const getThumbnailColumn = (opts, context) => {
  return opts.showThumbnail && {
    header: '{{thumbnail:translate}}',
    key: "thumbnail",
    formatter: (_thumbnailUrl, { viewModel }) => {
      // TODO: we should have an entitythumbnail component - possibly a function component
      let image;
      // eslint-disable-next-line unicorn/prefer-ternary
      if (viewModel.type === "User" || viewModel.type === "channel") {
        image = h("calcite-avatar", { fullName: viewModel.title, label: "avatar", scale: "s", thumbnail: viewModel.thumbnailUrl, userId: viewModel.id, username: viewModel.source });
      }
      else {
        image = h("arcgis-hub-image", { alt: viewModel.title, fallback: getFallbackUrl(viewModel), lazy: true, src: getThumbnailUrl(viewModel, 40, context) });
      }
      return image;
    },
    contentCellAlignment: ALIGNMENTS.center,
    headerCellAlignment: ALIGNMENTS.center
  };
};
const formatTitle = (model, newTab) => {
  let title = h(Fragment, null, model.title);
  const href = model.titleUrl;
  if (href) {
    title = h("calcite-link", { href: href, iconEnd: newTab ? "launch-2" : "", target: newTab ? "_blank" : "_self" }, model.title);
  }
  return title;
};
const getTitleColumn = (opts, _context) => {
  return {
    header: '{{title:translate}}',
    key: "viewModel.title",
    formatter: (_title, model) => formatTitle(model.viewModel, opts.newTab)
  };
};
const getTypeColumn = (_opts, _context) => {
  return {
    header: '{{type:translate}}',
    key: "searchResult.type"
  };
};
const getSourceColumn = (_opts, _context) => {
  return {
    header: '{{owner:translate}}',
    key: "viewModel.source"
  };
};
const getSharedUpdateColumn = (_opts, _context) => {
  return {
    header: '{{sharedUpdate:translate}}',
    key: "searchResult.isSharedUpdate",
    formatter: (val, _model, _key, intl) => val ? intl.t('yes') : intl.t('no'),
    contentCellAlignment: ALIGNMENTS.center,
    headerCellAlignment: ALIGNMENTS.center
  };
};
const getManagersColumn = (_opts, _context) => {
  return {
    header: '{{managers:translate}}',
    key: 'searchResult.id',
    formatter: (val, _model, _key, _intl) => {
      return h("arcgis-hub-group-member-summary", { identifier: val, memberType: "admin", slot: 'subtitle' });
    }
  };
};
const getCreatedDateColumn = (_opts, _context) => {
  return {
    header: '{{dateCreated:translate}}',
    key: "searchResult.createdDate",
    formatter: (val, _model, _key, intl) => intl.formatDate(val)
  };
};
const getUpdatedDateColumn = (_opts, _context) => {
  return {
    header: '{{dateUpdated:translate}}',
    key: "searchResult.updatedDate",
    formatter: (val, _model, _key, intl) => intl.formatDate(val)
  };
};
const getOwnerColumn = (_opts, _context) => {
  return {
    header: '{{owner:translate}}',
    key: "searchResult.owner"
  };
};
const getAccessColumn = (_opts, _context) => {
  return {
    header: '{{access:translate}}',
    key: "searchResult.access",
  };
};
const getSummaryColumn = (_opts, _context) => {
  return {
    header: '{{description:translate}}',
    key: "searchResult.summary",
    formatter: (val) => sanitizeHtml(val, 'noHtml'),
    multilineCellEllipsis: { lines: 1 }
  };
};
const getStartColumn = (_opts, _context) => {
  return {
    header: '{{start:translate}}',
    key: "searchResult.rawResult.startDateTime",
    formatter: (val, _model, _key, intl) => intl.formatDate(val, { dateStyle: 'medium', timeStyle: 'short' })
  };
};
const getEndColumn = (_opts, _context) => {
  return {
    header: '{{end:translate}}',
    key: "searchResult.rawResult.endDateTime",
    formatter: (val, _model, _key, intl) => intl.formatDate(val, { dateStyle: 'medium', timeStyle: 'short' })
  };
};
const getUsernameColumn = (_opts, _context) => {
  return {
    header: '{{username:translate}}',
    key: "searchResult.id",
    formatter: (val) => `@${val}`
  };
};
const getActionsColumn = (opts, _context) => {
  return opts.showRowActions && {
    header: '{{actionsHeader:translate}}',
    key: "cardActions"
  };
};
const COLUMN_NAME_MAP = {
  thumbnail: getThumbnailColumn,
  title: getTitleColumn,
  source: getSourceColumn,
  owner: getOwnerColumn,
  type: getTypeColumn,
  access: getAccessColumn,
  summary: getSummaryColumn,
  sharedUpdate: getSharedUpdateColumn,
  managers: getManagersColumn,
  created: getCreatedDateColumn,
  updated: getUpdatedDateColumn,
  start: getStartColumn,
  end: getEndColumn,
  username: getUsernameColumn,
  actions: getActionsColumn
};

const arcgisHubGalleryLayoutTableCss = ":host{display:block}.actions-container{display:flex;flex-wrap:nowrap;gap:0.5rem}calcite-table-cell>*{pointer-events:none}calcite-table-cell:has(:is(calcite-link,calcite-action,calcite-button))>*{pointer-events:auto}div:has(arcgis-hub-image),div:has(calcite-avatar){display:flex;align-items:center;justify-content:center}div:has(arcgis-hub-group-member-summary){min-width:max-content;--calcite-font-weight-medium:var(--calcite-font-weight-normal)}arcgis-hub-image{width:40px}";

const ArcgisHubGalleryLayoutTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubCardSelect = createEvent(this, "arcgisHubCardSelect", 7);
    this.arcgisHubCardAction = createEvent(this, "arcgisHubCardAction", 7);
    this.searchResults = [];
    this.loading = false;
    this.selectedIds = [];
    this.baseUrl = undefined;
    this.entityType = undefined;
    this.linkTarget = 'self';
    this.limit = 10;
    this.newTab = false;
    this.selectionMode = 'none';
    this.showAdditionalInfo = true;
    this.showType = true;
    this.showOwner = true;
    this.cardActionLinks = [];
    this.showEmptyState = true;
    this.showThumbnail = true;
    this.lastSearchResultsCount = undefined;
    this.hasError = false;
    this.callback = undefined;
    this.columns = undefined;
    bind(this, 'handleSelect', '_renderRow', 'setNextResultsStart');
  }
  get shouldRenderEmptyState() {
    return !this.searchResults.length && this.showEmptyState || this.hasError;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  get context() {
    return getGlobalContext();
  }
  get _showType() {
    return this.showType && !["group", "user"].includes(this.entityType);
  }
  handleSelect(event) {
    const id = event.target.dataset.id;
    this.arcgisHubCardSelect.emit({ id });
  }
  /*
    Start more results a11y features
    After the user clicks the more results button, we need to focus the first result in the new list
    for accessibility.
  */
  componentDidUpdate() {
    // after the component updates we focus the first result in the new list
    setTimeout(() => {
      var _a, _b;
      // focus the td inside the first calcite-table-cell
      // in the first calcite-table-row of the new results
      (_b = (_a = this.nextResultsStart) === null || _a === void 0 ? void 0 : _a.shadowRoot.querySelector('td')) === null || _b === void 0 ? void 0 : _b.focus({ preventScroll: true });
    }, 200);
  }
  setNextResultsStart(el) {
    // we keep a reference to the first calcite-table-cell
    // in the first calcite-table-row of the new results
    this.nextResultsStart = el;
  }
  /* End more results a11y feature */
  _renderLoading() {
    return h("div", { class: "card-container" }, h("arcgis-skeleton-loader", { active: true, rows: this.limit }));
  }
  /**
   * Render an empty state if there are no results,
   * or if there is an error
   */
  _renderEmptyState() {
    let message = this.intl.t("helpState.noResults.message");
    let actionSlot = "no-results-action";
    if (this.hasError) {
      message = this.intl.t("helpState.error.message");
      actionSlot = "search-error-action";
    }
    return (h(Fragment, null, h("arcgis-hub-help-state", { icon: "file-magnifying-glass" }, h("div", { "aria-live": "polite", role: "status", slot: "message" }, h("h3", null, message)), h("span", { slot: "actions" }, h("div", { class: "no-results-action-container" }, h("slot", { name: actionSlot }))))));
  }
  rowActionHandler(action, model) {
    this.arcgisHubCardAction.emit({ action, model });
  }
  getViewModel(model) {
    const opts = {
      actionLinks: this.cardActionLinks,
      baseUrl: this.baseUrl,
      locale: this.intl.locale,
      target: this.linkTarget
    };
    return getViewModel(model, 'table-row', opts, this.callback, this.context, this.intl);
  }
  _renderActionLinks(model) {
    const actionLinks = model.viewModel.actionLinks.map((link, id) => {
      let label = link.label;
      if (!label && link.i18nKey) {
        label = this.intl.t(link.i18nKey);
      }
      const handler = link.action && this.rowActionHandler.bind(this, link.action, model.viewModel);
      const button = (h("calcite-button", { appearance: link.buttonStyle, disabled: link.disabled, href: link.href, iconStart: link.icon, key: id, label: link.ariaLabel || label, onClick: handler ? handler : undefined, scale: "s", target: this.newTab ? "_blank" : "_self", width: "full" }, link.showLabel && label));
      return (link.tooltip
        ? h("arcgis-ref-tooltip", { key: label, overlayPositioning: "fixed", placement: "top", text: link.tooltip }, button)
        : button);
    });
    return h("div", { class: "actions-container" }, actionLinks);
  }
  _renderCellContent(column, value) {
    const styles = { width: column.cellWidth };
    const InnerTag = column.multilineCellEllipsis ? 'arcgis-multiline-ellipsis' : 'div';
    return h(InnerTag, Object.assign({}, column.multilineCellEllipsis, { style: styles }), value);
  }
  _renderCell(column, model, isNextResultsStart) {
    let formattedValue;
    if (column.key === "cardActions") {
      // cardactions are special
      // it would probably be possible to make that not be the case
      // similarly to how title is handled
      formattedValue = this._renderActionLinks(model);
    }
    else {
      const value = getProp(model, column.key);
      formattedValue = column.formatter ? column.formatter(value, model, column.key, this.intl) : value;
    }
    return h("calcite-table-cell", { alignment: column.contentCellAlignment, key: column.key, ref: isNextResultsStart ? this.setNextResultsStart : undefined }, this._renderCellContent(column, formattedValue));
  }
  _renderRow(searchResult, idx) {
    const viewModel = this.getViewModel(searchResult);
    // we use this model that encapsulates the search result and the view model
    // because we want the viewModel for some things but it is very limited
    // and also some of the stuff it contains is in additionalInfo
    // which is an array - and that makes it difficult to deterministically get the value we want (the array order could change)
    const model = { searchResult, viewModel };
    const isSelected = this.selectedIds.includes(searchResult.id);
    const isFirstOfNewResults = idx === this.lastSearchResultsCount;
    return h("calcite-table-row", { "data-id": searchResult.id, key: searchResult.id, onCalciteTableRowSelect: this.handleSelect, selected: isSelected }, this._columns.reduce((acc, column, idx) => {
      const result = this._renderCell(column, model, isFirstOfNewResults && idx === 0);
      acc.push(result);
      return acc;
    }, []));
  }
  ;
  _renderHead() {
    return h("calcite-table-row", { slot: "table-header" }, this._columns.reduce((acc, column) => {
      acc.push(h("calcite-table-header", { alignment: column.headerCellAlignment, description: column.description, heading: column.header }));
      return acc;
    }, []));
  }
  get _columns() {
    const { cardActionLinks, newTab, showThumbnail } = this;
    const opts = { newTab, showThumbnail, showRowActions: !!cardActionLinks.length };
    const columns = getTableColumns(this.entityType, opts, this.context, this.columns);
    const translatedColumns = interpolateTranslations(this.intl, { columns });
    return translatedColumns.columns;
  }
  _renderResults() {
    const { searchResults } = this;
    let result;
    if (!!searchResults.length) {
      result = h(Fragment, null, h("calcite-table", { bordered: true, caption: this.intl.t("caption"), class: "card-container", "data-test": "result-container",
        // selectionDisplay must be none because clearing the selection does not raise an event which prevents the gallery from managing the selection
        selectionDisplay: "none", selectionMode: this.selectionMode }, this._renderHead(), searchResults.map(this._renderRow)));
    }
    else if (this.shouldRenderEmptyState) {
      result = this._renderEmptyState();
    }
    return result;
  }
  render() {
    return (h(Host, { "data-element": "gallery-layout-table" }, this.loading ? this._renderLoading() : this._renderResults()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubGalleryLayoutTable.style = arcgisHubGalleryLayoutTableCss;

export { ArcgisHubGalleryLayoutTable as arcgis_hub_gallery_layout_table };
