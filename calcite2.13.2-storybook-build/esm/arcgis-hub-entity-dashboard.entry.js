import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import './screen-4768262d.js';
import { a as isHubAnalyticsEnabled } from './index-39849f62.js';
import './interfaces-fd83cf89.js';
import { C as CalciteTableRows } from './calcite-table-rows-643f756b.js';
import { i as isPredefinedDateOption, g as getDateRangePickerOptions } from './utils-b2491d65.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { f as fetchItemJobRecords, J as JobRecordType } from './fetchItemJobRecords-843ad5b7.js';
import './index-213c70d0.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './sha256-bf3e0364.js';
import './_internal-96d77ae4.js';
import './dasherize-9215e9fc.js';
import './get-family-543fac52.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';

// TODO: better way to get translations? these consts won't be changing otherwise
const errorTableColumns = (intl) => {
  return [
    {
      key: "timestamp",
      header: intl.t('activityLogSection.table.columnHeaders.datetime'),
      cellWidth: "max-content"
    },
    {
      key: "layerId",
      header: intl.t('activityLogSection.table.columnHeaders.layer'),
      cellWidth: "3rem"
    },
    {
      key: "message",
      header: intl.t('activityLogSection.table.columnHeaders.message'),
      multilineCellEllipsis: {
        collapseEnabled: true,
        collapseIcon: null,
        collapseText: intl.t('activityLogSection.table.collapseText'),
        expandEnabled: true,
        expandIcon: null,
        expandText: intl.t('activityLogSection.table.expandText'),
        lines: 2,
        tooltipEnabled: false,
        tooltipPlacement: null,
        tooltipText: null
      }
    }
  ];
};
const errorTableHelpState = (intl) => {
  return {
    heading: intl.t('activityLogSection.table.noRecentErrors'),
    icon: "check-circle" // TODO: make smaller if we can, right now the icon is too big and hardcoded
  };
};
const ERROR_TABLE_PAGE_SIZE = 10;

const arcgisHubEntityDashboardCss = ":host{display:block;height:100%}section.error-table-section{border-radius:0.25rem;padding:1.25rem;--tw-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 1px 6px -1px var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);background:white}.error-table-section h1,.error-table-section h2,.error-table-section h3,.error-table-section h4,.error-table-section h5,.error-table-section h6{font-size:var(--calcite-font-size-1);margin-top:0px;margin-bottom:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}";

const ArcgisHubEntityDashboard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.entity = undefined;
    this.isMobile = false;
    this.errorTableRows = [];
    this.from = undefined;
    this.to = undefined;
    this.selectedErrorRows = [];
    bind(this, 'updateErrorTableRows', 'fetchErrorTableRows', 'handleSelectedErrorsChange', 'downloadErrors');
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (this.shouldRenderErrorTable) {
      this.errorTableRows = await this.fetchErrorTableRows();
    }
  }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  get hostname() {
    // as of now, for all entities except sites, we use current hostname
    let hostname = window.location.hostname;
    if (this.entityType == "site") {
      const { customHostname, defaultHostname } = this.entity;
      // sites should always use one of their hostnames
      // if we are somewhere other than one of the hostnames: use the custom hostname if it exists, if not use default hostname
      if (![customHostname, defaultHostname].includes(hostname)) {
        hostname = customHostname || defaultHostname;
      }
    }
    return hostname;
  }
  get contentId() {
    var _a;
    let contentId;
    // any other entity, grab id
    if (this.entityType !== 'site') {
      contentId = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.id;
    }
    return contentId;
  }
  get hubAnalyticsEnabled() {
    // set to true for all content EXCEPT sites for time being;
    // sites relies on the disableActivityTracking legacy capability
    let hubAnalyticsEnabled = true;
    if (this.entityType == 'site') {
      hubAnalyticsEnabled = isHubAnalyticsEnabled(this.entity);
    }
    return hubAnalyticsEnabled;
  }
  get showSubscriptions() {
    // as of now, only sites are supported for subscription service
    return this.entityType == 'site';
  }
  get shouldRenderErrorTable() {
    return this.entityType === 'content';
  }
  get shouldRenderDownloadButton() {
    return this.errorTableRows.length > 0;
  }
  // If the number of errors is less than the default page size, don't show pagination
  get shouldRenderErrorTablePagination() {
    return this.errorTableRows.length > ERROR_TABLE_PAGE_SIZE;
  }
  get rowsToDownload() {
    return this.selectedErrorRows.length > 0 ? this.selectedErrorRows : this.errorTableRows;
  }
  async updateErrorTableRows(event) {
    // if the date range picker is changed, update the error table rows
    if (this.shouldRenderErrorTable) {
      if (isPredefinedDateOption(event.detail)) {
        // if the date range picker is changed to a predefined date option, update the date range
        const range = getDateRangePickerOptions()[event.detail];
        this.from = range.startDate;
        this.to = range.endDate || new Date();
      }
      else {
        // if the date range picker is changed to a custom date range, update the date range
        const range = event.detail.split(',');
        this.from = new Date(range[0]);
        this.to = new Date(range[1]);
      }
      // fetch the error table rows with the new date range
      this.errorTableRows = await this.fetchErrorTableRows();
    }
  }
  async fetchErrorTableRows() {
    var _a, _b;
    let rows = [];
    try {
      const jobRecords = await fetchItemJobRecords(this.entity.id, {
        context: this._context,
        limit: 1000,
        from: ((_a = this.from) === null || _a === void 0 ? void 0 : _a.toISOString()) || null,
        to: ((_b = this.to) === null || _b === void 0 ? void 0 : _b.toISOString()) || null
      });
      const downloadJobRecords = jobRecords.filter(record => record.type === JobRecordType.DOWNLOAD);
      const dateFormatOptions = {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      };
      rows = downloadJobRecords.map(record => ({
        timestamp: this.intl.formatDate(new Date(record.created), dateFormatOptions),
        layerId: record.layerId,
        message: record.message
      }));
    }
    catch (error) {
      console.error('Error fetching error logs', error);
    }
    return rows;
  }
  handleSelectedErrorsChange(e) {
    const selectedRows = e.target.selectedItems;
    this.selectedErrorRows = selectedRows.map((row) => {
      return {
        timestamp: row.children[0].textContent,
        layerId: row.children[1].textContent,
        message: row.children[2].textContent
      };
    });
  }
  downloadErrors() {
    // convert the headers of each column into a single string
    const headers = errorTableColumns(this.intl).map(column => { return `"${column.header}"`; });
    // convert each row into a single string with each value separated by a comma
    const data = this.rowsToDownload.map((row) => {
      return `"${row.timestamp}", "${row.layerId}", "${row.message}"`;
    });
    // combine the headers and data into a single string separated by new lines
    const csvContent = [headers, ...data].join('\n');
    // create a blob with the csv content and create a link to download the blob
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // set the download attribute to the filename
    const filename = !!this.from && !!this.to
      ? `${this.entity.id}_${this.from.toISOString()}-${this.to.toISOString()}.csv`
      : `${this.entity.id}.csv`;
    link.download = filename;
    // click the link to download the file
    link.click();
    // emit telemetry event
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.content.action.download.label.activity), { details: filename, element: this.element, id: this.entity.id, access: this.entity.access, type: this.entity.type, contentOrgId: this.entity.orgId }));
  }
  render() {
    return (h(Host, { "data-element": "entity-dashboard" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('dashboard')), h("div", null, h("arcgis-telemetry-dashboard", { contentId: this.contentId, contentType: this.entityType, context: this._context, hostname: this.hostname, hubAnalyticsEnabled: this.hubAnalyticsEnabled, showSubscriptions: this.showSubscriptions }), this.shouldRenderErrorTable &&
      h("section", { class: "error-table-section" }, h("h2", null, this.intl.t('activityLogSection.title')), h("calcite-label", null, h("calcite-table", { caption: this.intl.t('activityLogSection.table.caption'), class: "error-table", onCalciteTableSelect: this.handleSelectedErrorsChange, "page-size": this.shouldRenderErrorTablePagination ? ERROR_TABLE_PAGE_SIZE : null, selectionMode: this.shouldRenderDownloadButton ? "multiple" : "none", zebra: true }, this.shouldRenderDownloadButton &&
        h("calcite-action-bar", { "expand-disabled": "true", expanded: "true", layout: "horizontal", slot: "selection-actions" }, h("calcite-action", { icon: "download-to", id: "download-errors-button", onclick: this.downloadErrors, text: this.selectedErrorRows.length > 0
            ? this.intl.t('activityLogSection.table.downloadAction')
            : this.intl.t('activityLogSection.table.downloadAllAction') }), this.selectedErrorRows.length > 0 &&
          h("calcite-tooltip", { "reference-element": "download-errors-button" }, h("span", null, this.intl.t('activityLogSection.table.downloadActionTooltip')))), h(CalciteTableRows, { columns: errorTableColumns(this.intl), emptyHelpState: errorTableHelpState(this.intl), rows: this.errorTableRows }))))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityDashboard.style = arcgisHubEntityDashboardCss;

export { ArcgisHubEntityDashboard as arcgis_hub_entity_dashboard };
