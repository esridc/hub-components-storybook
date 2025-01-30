import { Host, h, Fragment } from '@stencil/core';
import { COMMON_METRICS } from '@esri/telemetry-reporting-client';
import { ALIGNMENTS } from '../../interfaces';
import { CalciteTableRows } from '../../functional/calcite-table-rows';
import intlManager from '../../../utils/intl-manager';
export class ArcgisTelemetryTabular {
  constructor() {
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
    this.intl = await intlManager.loadIntlForComponent(this.element);
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
          if (Object.values(COMMON_METRICS).includes(key)) {
            key = key.split(':')[1];
            isMetricColumn = true;
          }
          if (!columnIds.includes(key)) {
            const columnTitle = ((_a = seriesTransforms[key]) === null || _a === void 0 ? void 0 : _a.title) || ((_b = dataTransforms === null || dataTransforms === void 0 ? void 0 : dataTransforms.find(transform => transform.name === fullKey)) === null || _b === void 0 ? void 0 : _b.title) || this.capitalize(key);
            const columnEntry = {
              key: key,
              header: columnTitle,
              headerCellAlignment: ALIGNMENTS.center,
              contentCellAlignment: isMetricColumn ? ALIGNMENTS.end : ALIGNMENTS.start
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
              ? h("a", { href: link.href ? await link.href(value) : value, target: link.target }, displayValue)
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
    return (h(Host, null, this.isLoading || this.isTransforming
      ? h("arcgis-skeleton-loader", { active: true, rows: 4, showFooter: true })
      : h(Fragment, null, h("calcite-table", { caption: this.reportTitle, class: "telemetry-tabular-table", onCalciteTablePageChange: this.handlePageChange, "page-size": this.shouldRenderErrorTablePagination && this.PAGE_VIEWS_TABLE_PAGE_SIZE, ref: (el) => this._calciteTableRef = el, striped: true }, h(CalciteTableRows, { columns: this.columns, emptyHelpState: tableHelpState, rows: this.rows, setFirstCellRefCallback: this.setTableCellRef, startItem: this.startItemNumber ? this.startItemNumber : 1 })))));
  }
  static get is() { return "arcgis-telemetry-tabular"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-telemetry-tabular.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-telemetry-tabular.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "data": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<ITelemetryDataEntry>",
          "resolved": "ITelemetryDataEntry[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "ITelemetryDataEntry": {
              "location": "import",
              "path": "@esri/telemetry-reporting-client"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{ITelemetryDataEntry}"
            }, {
              "name": "memberof",
              "text": "ArcgisTelemetryTabular"
            }],
          "text": "raw telemetry data"
        }
      },
      "reportTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisTelemetryTabular"
            }],
          "text": "report title"
        },
        "attribute": "report-title",
        "reflect": false
      },
      "titleTooltip": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisTelemetryTabular"
            }],
          "text": "report title tooltip"
        },
        "attribute": "title-tooltip",
        "reflect": false
      },
      "subtitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{string}"
            }, {
              "name": "memberof",
              "text": "ArcgisTelemetryTabular"
            }],
          "text": "report subtitle"
        },
        "attribute": "subtitle",
        "reflect": false
      },
      "options": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ITelemetryDataTransformOptions",
          "resolved": "ITelemetryDataTransformOptions",
          "references": {
            "ITelemetryDataTransformOptions": {
              "location": "import",
              "path": "../interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{ITelemetryDataTransformOptions}"
            }, {
              "name": "memberof",
              "text": "ArcgisTelemetryTabular"
            }],
          "text": "report transform options"
        },
        "defaultValue": "{}"
      },
      "isLoading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{boolean}"
            }, {
              "name": "memberof",
              "text": "ArcgisTelemetryTabular"
            }],
          "text": "an indication as to whether or not telemetry data\nis still being fetched"
        },
        "attribute": "is-loading",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "columns": {},
      "rows": {},
      "isTransforming": {},
      "startItemNumber": {}
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "data",
        "methodName": "handleChange"
      }, {
        "propName": "options",
        "methodName": "handleChange"
      }];
  }
}
