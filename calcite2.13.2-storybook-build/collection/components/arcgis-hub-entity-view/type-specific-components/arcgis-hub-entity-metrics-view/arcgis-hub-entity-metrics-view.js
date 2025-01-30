import { MetricVisibility } from "@esri/hub-common";
import { Host, h } from "@stencil/core";
import { SCALE } from "../../../interfaces";
export class ArcgisHubEntityMetricsView {
  constructor() {
    this.entity = undefined;
  }
  get metricsEntity() {
    return this.entity;
  }
  /** metrics tab featured + visible metric displays */
  get metricDisplays() {
    var _a, _b, _c;
    return ((_c = (_b = (_a = this.metricsEntity) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.metricDisplays) === null || _c === void 0 ? void 0 : _c.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) !== MetricVisibility.hidden)) || [];
  }
  /** render a grid of metrics */
  renderMetrics() {
    return this.metricDisplays.map((display) => {
      const metric = this.metricsEntity.metrics.find((metric) => metric.id === display.metricId);
      return h("arcgis-hub-metric-card", { cardConfig: Object.assign(Object.assign({}, display), { scale: SCALE.medium, border: true }), key: metric.id, metric: metric });
    });
  }
  render() {
    return (h(Host, { "data-element": "entity-metrics" }, h("div", { class: "entity-metrics-main" }, h("div", { class: "entity-metrics-main__metrics-grid" }, this.renderMetrics()))));
  }
  static get is() { return "arcgis-hub-entity-metrics-view"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-metrics-view.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-metrics-view.css"]
    };
  }
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
          "text": "ArcGIS Hub entity"
        }
      }
    };
  }
  static get elementRef() { return "element"; }
}
