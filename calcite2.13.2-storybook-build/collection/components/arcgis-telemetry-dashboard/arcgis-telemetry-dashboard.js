var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Host, h, Fragment } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { TIME_DIMENSIONS } from '@esri/telemetry-reporting-client';
import { bind } from '../../utils/context';
import { constants as telemetryConstants, dictionary, customDimensionsConfig } from '@esri/telemetry-dictionary-hub';
import { Configuration, SubscriptionsApi } from '@arcgis-hub/arcgis-newsletters-ts';
import Cache from '../../decorators/cache';
var Tabs;
(function (Tabs) {
  Tabs["chart"] = "chart";
  Tabs["table"] = "table";
})(Tabs || (Tabs = {}));
export class ArcgisTelemetryDashboard {
  constructor() {
    this.setDateRange = (event) => {
      const { name, startDate } = event.detail;
      const { endDate } = event.detail;
      // if we are looking at more than one day, center times around 2:30 am when update occurs
      if (startDate.toLocaleDateString() !== endDate.toLocaleDateString()) {
        new Date(new Date(startDate).toLocaleString('en-US', { timeZone: "America/New_York" })).setHours(2, 30, 0, 0);
        new Date(new Date(endDate).toLocaleString('en-US', { timeZone: "America/New_York" })).setHours(2, 30, 0, 0);
      }
      this.startDate = new Date(startDate).toISOString();
      this.endDate = new Date(endDate).toISOString();
      this._dateRange = (name === 'custom')
        ? `${this.startDate},${this.endDate}`
        : name;
      this.arcgisTelemetryDashboardDateChanged.emit(this._dateRange);
    };
    this.activeTab = Tabs.chart;
    this.dateRangeOptions = [
      'yesterday',
      'last7Days',
      'last30Days',
      'thisMonth',
      'lastMonth',
      'pastYear'
    ];
    this.sessionActivityTransforms = [
      {
        name: 'session-activity:average',
        value: {
          display: (seconds) => Math.round((Number(seconds) / 60) * 10) / 10
        }
      }
    ];
    this.hostname = undefined;
    this.contentId = undefined;
    this.contentType = undefined;
    this.context = undefined;
    this.dateRange = 'last30Days';
    this.dashboardTitle = undefined;
    this.hubAnalyticsEnabled = undefined;
    this.showSubscriptions = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this._dateRange = undefined;
    this.telemetrySubscription = undefined;
    this.shouldShowSubscriptionUpdateAlert = false;
    this.subscriptionUpdateType = undefined;
    this.subscriptionUpdateSucceeded = undefined;
    this.subscriptionAlertTitle = undefined;
    this.subscriptionAlertMessage = undefined;
    bind(this, 'setDateRange', 'handleCalciteAlertClose', 'handlePopoverOpened', 'handleExternalLinkClicked', 'onTabChange', 'toggleTelemetrySubscription');
  }
  get _contentId() {
    const { contentId } = this;
    if (!!contentId) {
      return `portal:${contentId.replace('_', ':')}`;
    }
  }
  get _subscriptionApiOptions() {
    var _a;
    return {
      headers: {
        Authorization: (_a = this.context) === null || _a === void 0 ? void 0 : _a._authentication.token,
        'Content-Type': 'application/json'
      },
    };
  }
  get _hasSubscription() {
    return !!this.telemetrySubscription;
  }
  get _hasActiveSubscription() {
    var _a;
    return !!((_a = this.telemetrySubscription) === null || _a === void 0 ? void 0 : _a.active);
  }
  get _showDiscussionsMetrics() {
    return this.contentType === 'discussion';
  }
  async contextChanged() {
    if (this.context) {
      const config = new Configuration({ basePath: this.context.hubUrl });
      this.subscriptions = new SubscriptionsApi(config);
      const subscriptions = await this.subscriptions.getSubscriptions({ names: ['TELEMETRY_REPORT'] }, this._subscriptionApiOptions);
      // todo: should i check if it is active?
      this.telemetrySubscription = subscriptions.find(s => s.metadata.hostname === this.hostname);
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this._dateRange = this.dateRange;
    this.contextChanged();
  }
  get dateRangeValue() {
    const isCustomDateRange = this._dateRange.split(',').length === 2;
    return isCustomDateRange
      ? this._dateRange.split(',')
      : this._dateRange;
  }
  handleCalciteAlertClose() {
    this.shouldShowSubscriptionUpdateAlert = false;
  }
  renderSubscriptionUpdateAlert() {
    if (this.subscriptionUpdateSucceeded) {
      if ((this.subscriptionUpdateType === 'subscribe') || (this.subscriptionUpdateType === 'update' && this._hasActiveSubscription === true)) {
        // display successful subscribe
        this.subscriptionAlertTitle = this.intl.t('subscriptionActivatedTitle');
        this.subscriptionAlertMessage = this.intl.t('subscriptionActivatedMessage', { email: this.context.currentUser.email });
      }
      else if (this.subscriptionUpdateType === 'update' && this._hasActiveSubscription === false) {
        // display successful unsubscribe
        this.subscriptionAlertTitle = this.intl.t('unsubscribeCompleteTitle');
        this.subscriptionAlertMessage = this.intl.t('unsubscribeCompleteMessage', { email: this.context.currentUser.email });
      }
    }
    else {
      if (this.subscriptionUpdateType === 'update' && this._hasActiveSubscription === true) { // failed to update and still on subscribe = failed to unsub
        // display unsuccessful unsubscribe
        this.subscriptionAlertTitle = this.intl.t('problemUnsubscribingTitle');
        this.subscriptionAlertMessage = this.intl.t('problemUnsubscribingMessage');
      }
      else if (this.subscriptionUpdateType === 'update' && this._hasActiveSubscription === false) {
        // display unsuccessful subscribe
        this.subscriptionAlertTitle = this.intl.t('problemSubscribingTitle');
        this.subscriptionAlertMessage = this.intl.t('problemSubscribingMessage');
      }
    }
    return h("arcgis-wormhole", { elAttributes: { unthemed: "true" } }, h("calcite-alert", { autoClose: this.subscriptionUpdateSucceeded, autoCloseDuration: "slow", icon: true, kind: this.subscriptionUpdateSucceeded ? 'success' : 'danger', label: this.intl.t('formAlert'), onCalciteAlertClose: this.handleCalciteAlertClose, open: this.shouldShowSubscriptionUpdateAlert, placement: "top-end", scale: "m" }, h("div", { slot: "title" }, this.subscriptionAlertTitle), this.subscriptionAlertMessage && h("div", { slot: "message" }, this.subscriptionAlertMessage)));
  }
  async toggleTelemetrySubscription() {
    this.handleSubUnsubButtonClicked();
    if (this._hasSubscription) {
      const body = {
        id: this.telemetrySubscription.id,
        updateSubscriptionDto: { active: !this._hasActiveSubscription }
      };
      try {
        this.subscriptionUpdateType = 'update';
        this.telemetrySubscription = await this.subscriptions.updateSubscription(body, this._subscriptionApiOptions);
        this.subscriptionUpdateSucceeded = true;
      }
      catch (e) {
        this.subscriptionUpdateSucceeded = false;
      }
    }
    else {
      const body = {
        subscribeDto: {
          notificationSpecName: 'TELEMETRY_REPORT',
          metadata: {
            hostname: this.hostname,
          },
          cadence: 'WEEKLY',
          deliveryMethod: 'EMAIL',
        }
      };
      try {
        this.subscriptionUpdateType = 'subscribe';
        this.telemetrySubscription = await this.subscriptions.subscribe(body, this._subscriptionApiOptions);
        this.subscriptionUpdateSucceeded = true;
      }
      catch (e) {
        this.subscriptionUpdateSucceeded = false;
      }
    }
    this.shouldShowSubscriptionUpdateAlert = true;
  }
  // we cache this so we don't get a new object every time some unrlelated state changes - which causes over rendering of the telemetry report components
  getOrderBy(category) {
    return [
      {
        name: category,
        direction: 'asc'
      }
    ];
  }
  /**
   * category to pass to the child arcgis-telemetry-report components
   * we want to vary how the data is categorized depending on the date range selected
   *
   * @readonly
   * @type {TIME_DIMENSIONS}
   * @memberof ArcgisHubEngagementDashboard
   */
  get category() {
    const { _dateRange, endDate, startDate } = this;
    let result;
    if (_dateRange === 'custom') {
      const dayRange = new Date(endDate).getTime() - new Date(startDate).getTime() / (1000 * 60 * 60 * 24);
      if (dayRange < 5) {
        result = TIME_DIMENSIONS.hour;
      }
      else if (dayRange < 30) {
        result = TIME_DIMENSIONS.day;
      }
      else if (dayRange < 365) {
        result = TIME_DIMENSIONS.week;
      }
      else {
        result = TIME_DIMENSIONS.month;
      }
    }
    else {
      switch (_dateRange) {
        case 'today':
        case 'yesterday':
          result = TIME_DIMENSIONS.hour;
          break;
        case 'pastYear':
          result = TIME_DIMENSIONS.week;
          break;
        default:
          // last7Days, last30Days, thisMonth, lastMonth
          result = TIME_DIMENSIONS.day;
      }
    }
    return result;
  }
  getPageViewsTableTransforms(category) {
    const timestampIntlOptions = {};
    if (category === TIME_DIMENSIONS.hour) {
      timestampIntlOptions.hour = 'numeric';
      timestampIntlOptions.minute = 'numeric';
    }
    return [
      {
        name: 'timestamp',
        title: this.intl.t(`timestampTitle.${category}`),
        value: {
          display: timestamp => this.intl.formatDate(timestamp, timestampIntlOptions),
        }
      },
      {
        name: 'page-views:count',
        title: this.intl.t('pageViews')
      }
    ];
  }
  handlePopoverOpened() {
    const { hubAnalyticsEnabled } = this;
    const telemetry = dictionary.category.interaction.action.open.label.popover.details;
    const activityStatus = hubAnalyticsEnabled ? telemetry.activityEnabled : telemetry.activityDisabled;
    this.hubTelemetry.emit(Object.assign({}, activityStatus));
  }
  handleExternalLinkClicked() {
    this.hubTelemetry.emit(Object.assign({}, dictionary.category.navigation.action.external.label.webHelp.details.enableOrDisableHubActivityTracking));
  }
  handleSubUnsubButtonClicked() {
    const telemetry = this._hasActiveSubscription ?
      dictionary.category.interaction.action.disable :
      dictionary.category.interaction.action.enable;
    this.hubTelemetry.emit(Object.assign({}, telemetry.label.notifications.details.weekly));
  }
  get telemetryUpdateInfo() {
    /**
       * The telemetry API has a nightly data migration from redshift to
       * pg which causes a lag between when telemetry is actually logged
       * and when it shows up in a request. This migration happens at
       * 2am ET and takes about 10 minutes. We want to add a message to
       * let users know about this delay.
       */
    const dateUpdatedET = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })).setHours(2, 10, 0, 0);
    const dateFormat = {
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    };
    return this.intl.formatDate(dateUpdatedET, dateFormat);
  }
  get subscribeButtonProps() {
    const { _hasActiveSubscription } = this;
    const props = {
      appearance: 'solid',
      iconStart: _hasActiveSubscription ? 'envelope' : '',
      id: "subscriptions",
      kind: _hasActiveSubscription ? 'neutral' : 'brand',
      round: true
    };
    const text = _hasActiveSubscription ? this.intl.t('subscribed') : this.intl.t('subscribe');
    return { props, text };
  }
  onTabChange(event) {
    const { tab } = event.target;
    if (tab !== this.activeTab) {
      const telemetry = dictionary.category.navigation.action.onPage.label[tab];
      this.hubTelemetry.emit(telemetry);
      this.activeTab = tab;
    }
  }
  renderControls() {
    const { hubAnalyticsEnabled, subscribeButtonProps, telemetryUpdateInfo, showSubscriptions } = this;
    const buttonAppearance = hubAnalyticsEnabled ? 'transparent' : 'solid';
    const buttonKind = hubAnalyticsEnabled ? 'neutral' : 'danger';
    const label = hubAnalyticsEnabled ? this.intl.t('notificationLabel') : this.intl.t('disabledTracking');
    const heading = hubAnalyticsEnabled ? null : this.intl.t('disabledTracking');
    const subscribeButton = showSubscriptions ? h("calcite-button", Object.assign({}, subscribeButtonProps.props, { onClick: this.toggleTelemetrySubscription }), subscribeButtonProps.text) : null;
    const popOverContent = hubAnalyticsEnabled ?
      h(Fragment, null, h("div", { class: "update-label" }, this.intl.t('dataUpdated')), h("div", null, telemetryUpdateInfo)) :
      h(Fragment, null, this.intl.t('enableTracking'), h("div", { class: "learn-link" }, h("calcite-link", { href: "https://doc.arcgis.com/en/hub/sites/enable-or-disable-hub-activity-tracking.htm", "icon-end": "launch", onclick: this.handleExternalLinkClicked, target: "_blank" }, this.intl.t('learnMore'))));
    return h("div", { class: "controls-container" }, subscribeButton, h("calcite-tooltip", { referenceElement: "subscriptions" }, " ", this.intl.t('weeklyReport')), h("arcgis-hub-date-range-picker", { onArcgisHubDateRangePickerSelect: this.setDateRange, options: this.dateRangeOptions, value: this.dateRangeValue }), h("calcite-button", { appearance: buttonAppearance, "icon-start": "activity-monitor", id: "activity-button", kind: buttonKind, round: true, scale: "m" }, hubAnalyticsEnabled ? null : this.intl.t('disabled')), h("calcite-popover", { "auto-close": true, heading: heading, label: label, onCalcitePopoverOpen: this.handlePopoverOpened, placement: "bottom", "reference-element": "activity-button" }, h("div", { class: "popover-body" }, popOverContent)));
  }
  render() {
    const shouldRenderSessions = !this._contentId;
    const { category, _contentId, context, endDate, hostname, sessionActivityTransforms, startDate } = this;
    const orderBy = this.getOrderBy(category);
    const pageViewsTableTransforms = this.getPageViewsTableTransforms(category);
    return h(Host, { "data-element": "telemetry-dashboard" }, this.renderSubscriptionUpdateAlert(), h("div", { class: "header" }, h("h1", null, this.dashboardTitle), this.renderControls()), h("div", { class: "telemetry-container" }, h("arcgis-telemetry-report", { category: category, contentId: _contentId, context: context, dimensionFilters: [{ name: "action", not: [telemetryConstants.action.MANAGE] }], endDate: endDate, hostname: hostname, orderBy: orderBy, "report-title": this.intl.t('pageViews'), startDate: startDate, "telemetry-event": "page-views", type: "metric" }), shouldRenderSessions ?
      h("arcgis-telemetry-report", { category: category, contentId: _contentId, context: context, endDate: endDate, hostname: hostname, orderBy: orderBy, "report-title": this.intl.t('users'), startDate: startDate, "telemetry-event": "sessions", type: "metric" })
      : '', shouldRenderSessions ?
      h("arcgis-telemetry-report", { category: category, contentId: _contentId, context: context, dataTransforms: sessionActivityTransforms, endDate: endDate, hostname: hostname, orderBy: orderBy, "report-title": this.intl.t('timeOnSite'), startDate: startDate, "telemetry-event": "session-activity", type: "metric" })
      : ''), this._showDiscussionsMetrics ?
      h("div", { class: "telemetry-container" }, h("arcgis-telemetry-report", { category: category, contentId: _contentId, context: context, dataLabel: this.intl.t('postsCreated'), endDate: endDate, hostname: hostname, orderBy: orderBy, reportTitle: this.intl.t('postsCreated'), startDate: startDate, telemetryEvent: { category: "Content", action: "Create", label: "Post" }, type: "metric" }), h("arcgis-telemetry-report", { category: category, contentId: _contentId, context: context, dataLabel: this.intl.t('repliesCreated'), endDate: endDate, hostname: hostname, orderBy: orderBy, reportTitle: this.intl.t('repliesCreated'), startDate: startDate, telemetryEvent: { category: "Content", action: "Create", label: "Reply" }, type: "metric" }), h("arcgis-telemetry-report", { category: category, contentId: _contentId, context: context, dataLabel: this.intl.t('pageViews'), endDate: endDate, hostname: hostname, orderBy: orderBy, reportTitle: this.intl.t('aboutViews'), startDate: startDate, telemetryContext: { customDimensionsConfig }, telemetryEvent: { category: "Navigation", action: "View", label: "Content", details: "About" }, type: "metric" })) : '', h("div", null, h("h2", null, this.intl.t('viewsOverTime')), h("calcite-tabs", null, h("calcite-tab-nav", { slot: "title-group" }, h("calcite-tab-title", { onCalciteTabsActivate: this.onTabChange, tab: Tabs.chart }, this.intl.t("tabs.chart")), h("calcite-tab-title", { onCalciteTabsActivate: this.onTabChange, tab: Tabs.table }, this.intl.t("tabs.table"))), h("calcite-tab", { tab: Tabs.chart }, h("arcgis-telemetry-report", { category: category, class: "chart", contentId: _contentId, context: context, dimensionFilters: [{ name: "action", not: [telemetryConstants.action.MANAGE] }], endDate: endDate, hostname: hostname, orderBy: orderBy, startDate: startDate, "telemetry-event": "page-views", type: "bar" })), h("calcite-tab", { tab: Tabs.table }, h("arcgis-telemetry-report", { category: category, contentId: _contentId, context: context, dataTransforms: pageViewsTableTransforms, dimensionFilters: [{ name: "action", not: [telemetryConstants.action.MANAGE] }], endDate: endDate, hostname: hostname, orderBy: orderBy, startDate: startDate, "telemetry-event": "page-views", type: "tabular" })))), this._showDiscussionsMetrics ?
      h(Fragment, null, h("div", null, h("h2", null, this.intl.t('postsOverTime')), h("arcgis-telemetry-report", { category: category, class: "chart", contentId: _contentId, context: context, dataLabel: this.intl.t('postsCreated'), endDate: endDate, hostname: hostname, orderBy: orderBy, startDate: startDate, telemetryEvent: { category: "Content", action: "Create", label: "Post" }, type: "bar" })), h("div", null, h("h2", null, this.intl.t('trafficByHostname')), h("arcgis-telemetry-report", { contentId: _contentId, context: context, dimensionFilters: [{ name: "action", not: [telemetryConstants.action.MANAGE] }], endDate: endDate, hostname: hostname, orderBy: [{ name: "page-views:count", direction: "desc" }], series: [{ name: "hostname", title: this.intl.t('hostname') }], startDate: startDate, "telemetry-event": "page-views", type: "tabular" }))) : '');
  }
  static get is() { return "arcgis-telemetry-dashboard"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-telemetry-dashboard.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-telemetry-dashboard.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "hostname": {
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
              "text": "ArcgisHubEngagementDashboard"
            }],
          "text": "hostname for which to fetch and render telemetry"
        },
        "attribute": "hostname",
        "reflect": false
      },
      "contentId": {
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
              "text": "ArcgisHubEngagementDashboard"
            }],
          "text": "contentId to scope telemetry to"
        },
        "attribute": "content-id",
        "reflect": false
      },
      "contentType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "HubEntityType",
          "resolved": "\"content\" | \"discussion\" | \"event\" | \"group\" | \"initiative\" | \"initiativeTemplate\" | \"org\" | \"page\" | \"project\" | \"site\" | \"survey\" | \"template\" | \"user\"",
          "references": {
            "HubEntityType": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Entity type; used to determine whether or not to display specific metrics"
        },
        "attribute": "content-type",
        "reflect": false
      },
      "context": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IArcGISContext",
          "resolved": "IArcGISContext",
          "references": {
            "IArcGISContext": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "type",
              "text": "{IArcGISContext}"
            }, {
              "name": "memberof",
              "text": "ArcgisHubEngagementDashboard"
            }],
          "text": "provides auth & portal information"
        }
      },
      "dateRange": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "PredefinedDateOption",
          "resolved": "string",
          "references": {
            "PredefinedDateOption": {
              "location": "import",
              "path": "../arcgis-hub-date-range-picker/utils"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "memberof",
              "text": "ArcgisHubEngagementDashboard"
            }],
          "text": "initial date range to display"
        },
        "attribute": "date-range",
        "reflect": false,
        "defaultValue": "'last30Days'"
      },
      "dashboardTitle": {
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
              "text": "ArcgisHubEngagementDashboard"
            }],
          "text": "title to render above the dashboard"
        },
        "attribute": "dashboard-title",
        "reflect": false
      },
      "hubAnalyticsEnabled": {
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
        "attribute": "hub-analytics-enabled",
        "reflect": false
      },
      "showSubscriptions": {
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
        "attribute": "show-subscriptions",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "startDate": {},
      "endDate": {},
      "_dateRange": {},
      "telemetrySubscription": {},
      "shouldShowSubscriptionUpdateAlert": {},
      "subscriptionUpdateType": {},
      "subscriptionUpdateSucceeded": {},
      "subscriptionAlertTitle": {},
      "subscriptionAlertMessage": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisTelemetryDashboardDateChanged",
        "name": "arcgisTelemetryDashboardDateChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "An event to emit telemetry events"
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "context",
        "methodName": "contextChanged"
      }];
  }
}
__decorate([
  Cache({ scope: 'get-order-by' })
], ArcgisTelemetryDashboard.prototype, "getOrderBy", null);
__decorate([
  Cache({ scope: 'get-page-views-transforms' })
], ArcgisTelemetryDashboard.prototype, "getPageViewsTableTransforms", null);
