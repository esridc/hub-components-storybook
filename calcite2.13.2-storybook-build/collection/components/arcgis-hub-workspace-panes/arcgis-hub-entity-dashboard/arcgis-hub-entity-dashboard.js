import { Host, h } from '@stencil/core';
import { getTypeFromEntity, fetchItemJobRecords, JobRecordType } from '@esri/hub-common';
import intlManager from '../../../utils/intl-manager';
import { isHubAnalyticsEnabled } from '../../../utils';
import { CalciteTableRows } from '../../functional/calcite-table-rows';
import { ERROR_TABLE_PAGE_SIZE, errorTableColumns, errorTableHelpState } from './table-props';
import { getDateRangePickerOptions, isPredefinedDateOption } from '../../arcgis-hub-date-range-picker/utils';
import { bind } from '../../../utils/context';
import { dictionary } from '@esri/telemetry-dictionary-hub';
import { getGlobalContext } from '../../../utils/state';
export class ArcgisHubEntityDashboard {
  constructor() {
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
    this.hubTelemetry.emit(Object.assign(Object.assign({}, dictionary.category.content.action.download.label.activity), { details: filename, element: this.element, id: this.entity.id, access: this.entity.access, type: this.entity.type, contentOrgId: this.entity.orgId }));
  }
  render() {
    return (h(Host, { "data-element": "entity-dashboard" }, h("arcgis-hub-workspace-pane", { isMobile: this.isMobile, stickyFooter: true }, h("h1", { slot: "title" }, this.intl.t('dashboard')), h("div", null, h("arcgis-telemetry-dashboard", { contentId: this.contentId, contentType: this.entityType, context: this._context, hostname: this.hostname, hubAnalyticsEnabled: this.hubAnalyticsEnabled, showSubscriptions: this.showSubscriptions }), this.shouldRenderErrorTable &&
      h("section", { class: "error-table-section" }, h("h2", null, this.intl.t('activityLogSection.title')), h("calcite-label", null, h("calcite-table", { caption: this.intl.t('activityLogSection.table.caption'), class: "error-table", onCalciteTableSelect: this.handleSelectedErrorsChange, "page-size": this.shouldRenderErrorTablePagination ? ERROR_TABLE_PAGE_SIZE : null, selectionMode: this.shouldRenderDownloadButton ? "multiple" : "none", zebra: true }, this.shouldRenderDownloadButton &&
        h("calcite-action-bar", { "expand-disabled": "true", expanded: "true", layout: "horizontal", slot: "selection-actions" }, h("calcite-action", { icon: "download-to", id: "download-errors-button", onclick: this.downloadErrors, text: this.selectedErrorRows.length > 0
            ? this.intl.t('activityLogSection.table.downloadAction')
            : this.intl.t('activityLogSection.table.downloadAllAction') }), this.selectedErrorRows.length > 0 &&
          h("calcite-tooltip", { "reference-element": "download-errors-button" }, h("span", null, this.intl.t('activityLogSection.table.downloadActionTooltip')))), h(CalciteTableRows, { columns: errorTableColumns(this.intl), emptyHelpState: errorTableHelpState(this.intl), rows: this.errorTableRows }))))))));
  }
  static get is() { return "arcgis-hub-entity-dashboard"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-dashboard.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-dashboard.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "isMobile": {
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
          "tags": [],
          "text": ""
        },
        "attribute": "is-mobile",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "errorTableRows": {},
      "from": {},
      "to": {},
      "selectedErrorRows": {}
    };
  }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Record<string, any>",
          "resolved": "{ [x: string]: any; }",
          "references": {
            "Record": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisTelemetryDashboardDateChanged",
        "method": "updateErrorTableRows",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
