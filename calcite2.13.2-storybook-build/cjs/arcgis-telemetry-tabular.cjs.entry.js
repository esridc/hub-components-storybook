'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const telemetryReportingClient_esm = require('./telemetry-reporting-client.esm-e52ade43.js');
const interfaces = require('./interfaces-fc0046ff.js');
const calciteTableRows = require('./calcite-table-rows-a81a497e.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const arcgisTelemetryTabularCss = ".telemetry-tabular-table{width:200px}:host .telemetry-tabular-table{display:block;height:100%;width:auto}";

const ArcgisTelemetryTabular = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.PAGE_VIEWS_TABLE_PAGE_SIZE = 7;
    this._pageChanged = false;
    this.handlePageChange = (e) => {
      e.stopPropagation();
      this._pageChanged = true;
      this.startItemNumber = this._paginationRef.startItem;
    };
    this.setTableCellRef = (el) => {
      this._firstCellRef = el;
    };
    this.data = undefined;
    this.reportTitle = undefined;
    this.titleTooltip = undefined;
    this.subtitle = undefined;
    this.options = {};
    this.isLoading = undefined;
    this.columns = undefined;
    this.rows = undefined;
    this.isTransforming = true;
    this.startItemNumber = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
  }
  /**
   * This method is called after the component has rendered.
   * It performs the following actions:
   * 1. If the pagination reference (`_paginationRef`) is not set and the Calcite table reference (`_calciteTableRef`) is available,
   *    it queries the shadow DOM of the Calcite table for the `calcite-pagination` element and sets the `startItemNumber` to the start item of the pagination.
   * 2. If the page has changed (`_pageChanged`) and the first cell reference (`_firstCellRef`) is available,
   *    it sets focus on the first cell and resets the `_pageChanged` flag to false.
   *
   * @async
   */
  async componentDidRender() {
    var _a, _b;
    if (!this._paginationRef && this._calciteTableRef) {
      this._paginationRef = (_a = this._calciteTableRef.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('calcite-pagination');
      this.startItemNumber = (_b = this._paginationRef) === null || _b === void 0 ? void 0 : _b.startItem;
    }
    if (this._pageChanged && this._firstCellRef) {
      this._firstCellRef.setFocus();
      this._pageChanged = false;
    }
  }
  handleChange() {
    if (!this.isLoading) {
      this.transform(this.data, this.options).then(({ columns, rows }) => {
        this.columns = columns;
        this.rows = rows;
      }).finally(() => {
        this.isTransforming = false;
      });
    }
  }
  /**
   * function to transform telemetry data into arrays of rows and headers
   * that can be consumed by the arcgis-hub-table component
   */
  async transform(data, options) {
    const columns = [];
    const columnIds = [];
    const { seriesTransforms = {}, dataTransforms } = options;
    const rows = data.map(async (entry) => {
      const rowKeys = [];
      const row = await Object.entries(entry).map(async ([key, value]) => {
        var _a, _b, _c, _d, _e;
        const rowEntry = {};
        let isMetricColumn = false;
        if (value !== undefined) {
          const fullKey = key;
          if (Object.values(telemetryReportingClient_esm.COMMON_METRICS).includes(key)) {
            key = key.split(':')[1];
            isMetricColumn = true;
          }
          if (!columnIds.includes(key)) {
            const columnTitle = ((_a = seriesTransforms[key]) === null || _a === void 0 ? void 0 : _a.title) || ((_b = dataTransforms === null || dataTransforms === void 0 ? void 0 : dataTransforms.find(transform => transform.name === fullKey)) === null || _b === void 0 ? void 0 : _b.title) || this.capitalize(key);
            const columnEntry = {
              key: key,
              header: columnTitle,
              headerCellAlignment: interfaces.ALIGNMENTS.center,
              contentCellAlignment: isMetricColumn ? interfaces.ALIGNMENTS.end : interfaces.ALIGNMENTS.start
            };
            columnIds.push(key);
            isMetricColumn
              ? columns.push(columnEntry)
              : columns.unshift(columnEntry);
          }
          rowEntry[key] = value;
          !isMetricColumn && rowKeys.push(value);
          if ((_c = seriesTransforms[key]) === null || _c === void 0 ? void 0 : _c.value) {
            const { display, link } = seriesTransforms[key].value;
            const displayValue = display ? await display(value) : value;
            rowEntry[key] = link
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              ? index.h("a", { href: link.href ? await link.href(value) : value, target: link.target }, displayValue)
              : displayValue;
          }
          else {
            // either a seriestransform or a dataTransform can be provided, not both
            // also, dataTransform.value.link is not implemented yet
            const dataTransform = ((_e = (_d = dataTransforms === null || dataTransforms === void 0 ? void 0 : dataTransforms.find(transform => transform.name === fullKey)) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.display) || (val => val);
            rowEntry[key] = dataTransform(value);
          }
        }
        return rowEntry;
      });
      return this.resolveRow(row, rowKeys.join('|'));
    });
    const resolvedRows = await Promise.all(rows).then((rows) => {
      return rows;
    });
    return { columns: columns, rows: resolvedRows };
  }
  /**
   * resolves all asynchronous row callback transforms and adds
   * a unique identifier (key) to each row entry
   */
  async resolveRow(row, key) {
    const resolved = await Promise.all(row);
    resolved.push({ key });
    return resolved.reduce((acc, currentVal) => {
      return Object.assign(acc, currentVal);
    }, {});
  }
  capitalize(entry) {
    return entry[0].toUpperCase() + entry.slice(1).toLowerCase();
  }
  // If the number of errors is less than the default page size, don't show pagination
  get shouldRenderErrorTablePagination() {
    return this.rows.length > this.PAGE_VIEWS_TABLE_PAGE_SIZE;
  }
  render() {
    const tableHelpState = {
      heading: this.intl.t('pageViewTable.emptyState'),
      icon: "check-circle"
    };
    return (index.h(index.Host, null, this.isLoading || this.isTransforming
      ? index.h("arcgis-skeleton-loader", { active: true, rows: 4, showFooter: true })
      : index.h(index.Fragment, null, index.h("calcite-table", { caption: this.reportTitle, class: "telemetry-tabular-table", onCalciteTablePageChange: this.handlePageChange, "page-size": this.shouldRenderErrorTablePagination && this.PAGE_VIEWS_TABLE_PAGE_SIZE, ref: (el) => this._calciteTableRef = el, striped: true }, index.h(calciteTableRows.CalciteTableRows, { columns: this.columns, emptyHelpState: tableHelpState, rows: this.rows, setFirstCellRefCallback: this.setTableCellRef, startItem: this.startItemNumber ? this.startItemNumber : 1 })))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "data": ["handleChange"],
    "options": ["handleChange"]
  }; }
};
ArcgisTelemetryTabular.style = arcgisTelemetryTabularCss;

exports.arcgis_telemetry_tabular = ArcgisTelemetryTabular;
