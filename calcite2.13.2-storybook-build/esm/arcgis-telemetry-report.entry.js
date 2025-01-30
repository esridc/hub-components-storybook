import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { D as DebounceDecoratorFactory } from './debounce-e9be81f1.js';
import { C as COMMON_TELEMETRY } from './interfaces-6a59037c.js';
import { b as buildSimpleDimensionFilters, C as COMMON_METRICS, g as getTelemetryReport } from './telemetry-reporting-client.esm-dbec2fbe.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const arcgisTelemetryReportCss = ":host{display:block}arcgis-telemetry-chart{height:100%}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ArcgisTelemetryReport = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.context = undefined;
    this.telemetryContext = {};
    this.type = undefined;
    this.reportTitle = undefined;
    this.titleTooltip = undefined;
    this.subtitle = undefined;
    this.trailingText = undefined;
    this.hostname = undefined;
    this.contentId = undefined;
    this.telemetryEvent = undefined;
    this.dimensionFilters = [];
    this.series = [];
    this.dataTransforms = [];
    this.category = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this.orderBy = undefined;
    this.limit = undefined;
    this.dataLabel = undefined;
    this.data = [];
    this.aggregateData = [];
    this.error = undefined;
    this.isLoading = true;
  }
  onRequestParamsChange() {
    this.isLoading = true;
    this.data = [];
    this.aggregateData = [];
    this.getReportData();
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.getReportData();
  }
  get dataTransformOptions() {
    return {
      seriesTransforms: this.seriesTransforms,
      dataTransforms: this.dataTransforms,
      requestParams: this.requestParams
    };
  }
  get isCustomEvent() {
    return this.telemetryEvent && typeof this.telemetryEvent !== 'string';
  }
  get seriesTransforms() {
    const seriesTransforms = {};
    this.series.forEach(dimension => {
      if (typeof dimension !== 'string') {
        seriesTransforms[dimension.name.toLowerCase()] = Object.assign(Object.assign({}, (dimension.title && { title: dimension.title })), (dimension.value && { value: dimension.value }));
      }
    });
    return seriesTransforms;
  }
  get _dimensionFilters() {
    let itemDimensionFilters = [];
    let customDimensionFilters = [];
    if (this.contentId && this.hostname) {
      itemDimensionFilters = [
        { name: "contentId", any: [this.contentId] }
      ];
    }
    if (this.isCustomEvent) {
      customDimensionFilters = buildSimpleDimensionFilters(this.telemetryEvent);
    }
    const result = [
      ...customDimensionFilters,
      ...itemDimensionFilters,
      ...this.dimensionFilters,
    ];
    return result.length ? result : undefined;
  }
  get scope() {
    if (this.hostname) {
      return { hostname: this.hostname };
    }
    else if (this.contentId) {
      return { contentId: this.contentId };
    }
  }
  get requestParams() {
    const dimensions = this.getDimensions(this.telemetryEvent);
    const metric = this.getMetric(this.telemetryEvent);
    return Object.assign({ scope: this.scope, startDate: this.startDate, endDate: this.endDate, timeDimension: this.category, orderBy: this.orderBy, limit: this.limit, dimensionFilters: this._dimensionFilters, emptyRows: true, metrics: [metric] }, (dimensions.length && { dimensions }));
  }
  get requestOptions() {
    var _a;
    return Object.assign(Object.assign({}, this.context && ((_a = this.context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions)), this.telemetryContext);
  }
  get _dataLabel() {
    var _a;
    if (this.dataLabel) {
      return this.dataLabel;
    }
    else {
      const dataLabelKey = (_a = Object.entries(COMMON_METRICS).find(([_, value]) => value === this.getMetric(this.telemetryEvent))) === null || _a === void 0 ? void 0 : _a[0];
      return this.intl.t(dataLabelKey);
    }
  }
  getMetric(telemetryEvent) {
    const telemetryEventToMetricMap = {
      [COMMON_TELEMETRY.sessions]: COMMON_METRICS.sessions,
      [COMMON_TELEMETRY.referrers]: COMMON_METRICS['page-views'],
      [COMMON_TELEMETRY['page-views']]: COMMON_METRICS['page-views'],
      [COMMON_TELEMETRY['session-activity']]: COMMON_METRICS['session-activity']
    };
    return !this.isCustomEvent && telemetryEventToMetricMap[telemetryEvent] || COMMON_METRICS.custom;
  }
  getDimensions(telemetryEvent) {
    const telemetryEventToDimensionsMap = {
      [COMMON_TELEMETRY.referrers]: 'referrer',
    };
    const providedDimensions = this.series.map(entry => {
      return typeof entry === 'string' ? entry : entry.name;
    });
    const commonDimensions = !this.isCustomEvent && telemetryEventToDimensionsMap[telemetryEvent];
    return commonDimensions ? [commonDimensions, ...providedDimensions] : providedDimensions;
  }
  get shouldAggregateData() {
    return !!this.category && this.type === 'metric';
  }
  async getReportData() {
    var _a;
    // NOTE: the api docs say start and end date are not required but they seem to be
    //       but that is fine since for ui purposes we want them to be
    const { endDate, metrics, scope, startDate } = this.requestParams;
    const isValid = this.context && scope && startDate && endDate && !!metrics.length;
    if (isValid) {
      try {
        const { requestParams, requestOptions } = this;
        // if we have a category and type === 'metric' we want to show the number and also chart the data below the number
        // so we make a second request to get the aggregate data
        // we could just sum all the bins in the client
        // but that does not work mathematically if the bins contain averages
        // only do both requests if we got a category and type === 'metric'
        const reportResults = await Promise.all([
          getTelemetryReport(requestParams, requestOptions),
          this.shouldAggregateData ? getTelemetryReport(Object.assign(Object.assign({}, requestParams), { orderBy: undefined, timeDimension: undefined }), requestOptions) : undefined
        ]);
        // just the data that was asked for - all child components get this
        this.data = reportResults[0].data;
        // the aggregate data - the structure is the same but it will be one row - only the metric card gets this
        this.aggregateData = (_a = reportResults[1]) === null || _a === void 0 ? void 0 : _a.data;
        this.error = undefined;
      }
      catch (error) {
        this.error = error.toString();
      }
      this.isLoading = false;
    }
  }
  get childComponentProps() {
    const { aggregateData, category, data, error, isLoading, dataTransformOptions: options, reportTitle, subtitle, titleTooltip, trailingText, type, _dataLabel: dataLabel } = this;
    const props = Object.assign(Object.assign({ category,
      data,
      dataLabel,
      error,
      isLoading,
      options,
      reportTitle,
      subtitle }, (category && { timeLabel: this.intl.t(category) })), { titleTooltip,
      trailingText,
      type });
    if (this.shouldAggregateData) {
      // for metric, we display one value - the aggregate data, so that is "data"
      // we may also have aggregate data that we will pass it for charting (a sparkline) but that is not the primary thing
      props.data = aggregateData;
      props.binnedData = data;
    }
    return props;
  }
  get isChart() {
    return ['bar', 'line'].includes(this.type);
  }
  render() {
    const ReportComponent = this.isChart ? 'arcgis-telemetry-chart' : `arcgis-telemetry-${this.type}`;
    return (h(Host, { "data-element": "telemetry-report" }, h(ReportComponent, Object.assign({}, this.childComponentProps))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "context": ["onRequestParamsChange"],
    "startDate": ["onRequestParamsChange"],
    "endDate": ["onRequestParamsChange"],
    "telemetryEvent": ["onRequestParamsChange"]
  }; }
};
__decorate([
  DebounceDecoratorFactory({ timeout: 10 })
], ArcgisTelemetryReport.prototype, "getReportData", null);
ArcgisTelemetryReport.style = arcgisTelemetryReportCss;

export { ArcgisTelemetryReport as arcgis_telemetry_report };
