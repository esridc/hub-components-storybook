'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const hubSanitizer = require('./hubSanitizer-d5497b99.js');
const thumbnail = require('./thumbnail-2e1ddd35.js');
const interfaces = require('./interfaces-fc0046ff.js');
const getProp = require('./get-prop-4bd8fc1a.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./index-f4a4c954.js');
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
require('./download-list-00ce3845.js');
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
        image = index.h("calcite-avatar", { fullName: viewModel.title, label: "avatar", scale: "s", thumbnail: viewModel.thumbnailUrl, userId: viewModel.id, username: viewModel.source });
      }
      else {
        image = index.h("arcgis-hub-image", { alt: viewModel.title, fallback: thumbnail.getFallbackUrl(viewModel), lazy: true, src: thumbnail.getThumbnailUrl(viewModel, 40, context) });
      }
      return image;
    },
    contentCellAlignment: interfaces.ALIGNMENTS.center,
    headerCellAlignment: interfaces.ALIGNMENTS.center
  };
};
const formatTitle = (model, newTab) => {
  let title = index.h(index.Fragment, null, model.title);
  const href = model.titleUrl;
  if (href) {
    title = index.h("calcite-link", { href: href, iconEnd: newTab ? "launch-2" : "", target: newTab ? "_blank" : "_self" }, model.title);
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
    contentCellAlignment: interfaces.ALIGNMENTS.center,
    headerCellAlignment: interfaces.ALIGNMENTS.center
  };
};
const getManagersColumn = (_opts, _context) => {
  return {
    header: '{{managers:translate}}',
    key: 'searchResult.id',
    formatter: (val, _model, _key, _intl) => {
      return index.h("arcgis-hub-group-member-summary", { identifier: val, memberType: "admin", slot: 'subtitle' });
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
    formatter: (val) => hubSanitizer.sanitizeHtml(val, 'noHtml'),
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
    index.registerInstance(this, hostRef);
    this.arcgisHubCardSelect = index.createEvent(this, "arcgisHubCardSelect", 7);
    this.arcgisHubCardAction = index.createEvent(this, "arcgisHubCardAction", 7);
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
    context.bind(this, 'handleSelect', '_renderRow', 'setNextResultsStart');
  }
  get shouldRenderEmptyState() {
    return !this.searchResults.length && this.showEmptyState || this.hasError;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  get context() {
    return state.getGlobalContext();
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
    return index.h("div", { class: "card-container" }, index.h("arcgis-skeleton-loader", { active: true, rows: this.limit }));
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
    return (index.h(index.Fragment, null, index.h("arcgis-hub-help-state", { icon: "file-magnifying-glass" }, index.h("div", { "aria-live": "polite", role: "status", slot: "message" }, index.h("h3", null, message)), index.h("span", { slot: "actions" }, index.h("div", { class: "no-results-action-container" }, index.h("slot", { name: actionSlot }))))));
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
    return thumbnail.getViewModel(model, 'table-row', opts, this.callback, this.context, this.intl);
  }
  _renderActionLinks(model) {
    const actionLinks = model.viewModel.actionLinks.map((link, id) => {
      let label = link.label;
      if (!label && link.i18nKey) {
        label = this.intl.t(link.i18nKey);
      }
      const handler = link.action && this.rowActionHandler.bind(this, link.action, model.viewModel);
      const button = (index.h("calcite-button", { appearance: link.buttonStyle, disabled: link.disabled, href: link.href, iconStart: link.icon, key: id, label: link.ariaLabel || label, onClick: handler ? handler : undefined, scale: "s", target: this.newTab ? "_blank" : "_self", width: "full" }, link.showLabel && label));
      return (link.tooltip
        ? index.h("arcgis-ref-tooltip", { key: label, overlayPositioning: "fixed", placement: "top", text: link.tooltip }, button)
        : button);
    });
    return index.h("div", { class: "actions-container" }, actionLinks);
  }
  _renderCellContent(column, value) {
    const styles = { width: column.cellWidth };
    const InnerTag = column.multilineCellEllipsis ? 'arcgis-multiline-ellipsis' : 'div';
    return index.h(InnerTag, Object.assign({}, column.multilineCellEllipsis, { style: styles }), value);
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
      const value = getProp.getProp(model, column.key);
      formattedValue = column.formatter ? column.formatter(value, model, column.key, this.intl) : value;
    }
    return index.h("calcite-table-cell", { alignment: column.contentCellAlignment, key: column.key, ref: isNextResultsStart ? this.setNextResultsStart : undefined }, this._renderCellContent(column, formattedValue));
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
    return index.h("calcite-table-row", { "data-id": searchResult.id, key: searchResult.id, onCalciteTableRowSelect: this.handleSelect, selected: isSelected }, this._columns.reduce((acc, column, idx) => {
      const result = this._renderCell(column, model, isFirstOfNewResults && idx === 0);
      acc.push(result);
      return acc;
    }, []));
  }
  ;
  _renderHead() {
    return index.h("calcite-table-row", { slot: "table-header" }, this._columns.reduce((acc, column) => {
      acc.push(index.h("calcite-table-header", { alignment: column.headerCellAlignment, description: column.description, heading: column.header }));
      return acc;
    }, []));
  }
  get _columns() {
    const { cardActionLinks, newTab, showThumbnail } = this;
    const opts = { newTab, showThumbnail, showRowActions: !!cardActionLinks.length };
    const columns = getTableColumns(this.entityType, opts, this.context, this.columns);
    const translatedColumns = interpolateTranslations.interpolateTranslations(this.intl, { columns });
    return translatedColumns.columns;
  }
  _renderResults() {
    const { searchResults } = this;
    let result;
    if (!!searchResults.length) {
      result = index.h(index.Fragment, null, index.h("calcite-table", { bordered: true, caption: this.intl.t("caption"), class: "card-container", "data-test": "result-container",
        // selectionDisplay must be none because clearing the selection does not raise an event which prevents the gallery from managing the selection
        selectionDisplay: "none", selectionMode: this.selectionMode }, this._renderHead(), searchResults.map(this._renderRow)));
    }
    else if (this.shouldRenderEmptyState) {
      result = this._renderEmptyState();
    }
    return result;
  }
  render() {
    return (index.h(index.Host, { "data-element": "gallery-layout-table" }, this.loading ? this._renderLoading() : this._renderResults()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubGalleryLayoutTable.style = arcgisHubGalleryLayoutTableCss;

exports.arcgis_hub_gallery_layout_table = ArcgisHubGalleryLayoutTable;
