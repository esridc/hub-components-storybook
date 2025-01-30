'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const interfaces = require('./interfaces-fc0046ff.js');
const Metrics = require('./Metrics-b8657153.js');

const arcgisHubEntityMetricsViewCss = ":host{margin-top:1rem;display:flex;gap:4rem}.entity-metrics-main{flex:2}.entity-metrics-main__metrics-grid{display:grid;gap:2rem;grid-template-columns:repeat(3, minmax(20rem, 1fr))}arcgis-hub-metric-card{height:100%;min-height:15rem}";

const ArcgisHubEntityMetricsView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.entity = undefined;
  }
  get metricsEntity() {
    return this.entity;
  }
  /** metrics tab featured + visible metric displays */
  get metricDisplays() {
    var _a, _b, _c;
    return ((_c = (_b = (_a = this.metricsEntity) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.metricDisplays) === null || _c === void 0 ? void 0 : _c.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) !== Metrics.MetricVisibility.hidden)) || [];
  }
  /** render a grid of metrics */
  renderMetrics() {
    return this.metricDisplays.map((display) => {
      const metric = this.metricsEntity.metrics.find((metric) => metric.id === display.metricId);
      return index.h("arcgis-hub-metric-card", { cardConfig: Object.assign(Object.assign({}, display), { scale: interfaces.SCALE.medium, border: true }), key: metric.id, metric: metric });
    });
  }
  render() {
    return (index.h(index.Host, { "data-element": "entity-metrics" }, index.h("div", { class: "entity-metrics-main" }, index.h("div", { class: "entity-metrics-main__metrics-grid" }, this.renderMetrics()))));
  }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityMetricsView.style = arcgisHubEntityMetricsViewCss;

exports.arcgis_hub_entity_metrics_view = ArcgisHubEntityMetricsView;
