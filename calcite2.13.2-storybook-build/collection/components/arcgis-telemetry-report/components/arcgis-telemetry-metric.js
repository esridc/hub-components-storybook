import { Host, h } from '@stencil/core';
import { getProp } from '@esri/hub-common';
import intlManager from '../../../utils/intl-manager';
import { CORNERS } from '../../interfaces';
import { METRIC_ERRORS } from '../../arcgis-hub-metric-card/interfaces';
export class ArcgisTelemetryMetric {
  constructor() {
    this.data = undefined;
    this.binnedData = undefined;
    this.category = undefined;
    this.error = undefined;
    this.reportTitle = undefined;
    this.subtitle = undefined;
    this.trailingText = undefined;
    this.options = undefined;
    this.isLoading = undefined;
    this.timeLabel = undefined;
    this.dataLabel = undefined;
    this.value = undefined;
    this.isTransforming = true;
  }
  handleChange() {
    if (!this.isLoading) {
      this.transform(this.data, this.options).then(({ value }) => {
        this.value = value;
      }).finally(() => {
        this.isTransforming = false;
      });
    }
  }
  async componentWillLoad() {
    this.intl = await intlManager.getIntlForComponent(this.element);
    this.handleChange();
  }
  _transform(data, options) {
    var _a, _b, _c;
    const { requestParams } = options;
    const metricName = requestParams.metrics[0];
    const metric = getProp(data, metricName);
    const dataTransform = ((_c = (_b = (_a = options === null || options === void 0 ? void 0 : options.dataTransforms) === null || _a === void 0 ? void 0 : _a.find(transform => transform.name === metricName)) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.display) || (val => val);
    return dataTransform(metric);
  }
  async transform(data, options) {
    let value;
    if (data) {
      const metric = this._transform(data[0], options);
      const formattedValue = this.intl.formatNumber(metric);
      value = formattedValue === "NaN"
        ? metric
        : formattedValue;
    }
    return { value };
  }
  renderFooter() {
    if (!!this.binnedData) {
      const { category, binnedData: data, options, isLoading, timeLabel, dataLabel } = this;
      const props = { category, data, options, isLoading, timeLabel, dataLabel, type: 'sparkline' };
      return !this.error && h("arcgis-telemetry-chart", Object.assign({ slot: "footer" }, props));
    }
  }
  render() {
    return (h(Host, null, this.isLoading || this.isTransforming
      ? h("arcgis-skeleton-loader", { active: true, rows: 5, showFooter: true })
      : h("arcgis-stat-card", { cardTitle: this.reportTitle, corners: CORNERS.round, errorMessage: this.error ? { premadeType: METRIC_ERRORS.generic } : undefined, subtitle: this.subtitle, trailingText: this.trailingText, value: this.value }, this.renderFooter())));
  }
  static get is() { return "arcgis-telemetry-metric"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-telemetry-metric.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-telemetry-metric.css"]
    };
  }
  static get properties() {
    return {
      "data": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "Array<ITelemetryDataEntry> | number",
          "resolved": "ITelemetryDataEntry[] | number",
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
              "text": "ArcgisTelemetryMetric"
            }],
          "text": "raw telemetry data"
        },
        "attribute": "data",
        "reflect": false
      },
      "binnedData": {
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
          "tags": [],
          "text": ""
        }
      },
      "category": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TIME_DIMENSIONS",
          "resolved": "TIME_DIMENSIONS.day | TIME_DIMENSIONS.hour | TIME_DIMENSIONS.month | TIME_DIMENSIONS.week",
          "references": {
            "TIME_DIMENSIONS": {
              "location": "import",
              "path": "@esri/telemetry-reporting-client"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "category axis aggregation"
        },
        "attribute": "category",
        "reflect": false
      },
      "error": {
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
          "tags": [],
          "text": "error that could have occured in processing the metric"
        },
        "attribute": "error",
        "reflect": false
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
              "text": "ArcgisTelemetryMetric"
            }],
          "text": "report title"
        },
        "attribute": "report-title",
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
              "text": "ArcgisTelemetryMetric"
            }],
          "text": "report subtitle"
        },
        "attribute": "subtitle",
        "reflect": false
      },
      "trailingText": {
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
          "tags": [],
          "text": "text to render in the footer of the report"
        },
        "attribute": "trailing-text",
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
              "text": "ArcgisTelemetryMetric"
            }],
          "text": "report transform options"
        }
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
              "text": "ArcgisTelemetryMetric"
            }],
          "text": "an indication as to whether or not telemetry data\nis still being fetched"
        },
        "attribute": "is-loading",
        "reflect": false
      },
      "timeLabel": {
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
              "text": "ArcgisTelemetryMetric"
            }],
          "text": "the time label to use when a sparkline is rendered"
        },
        "attribute": "time-label",
        "reflect": false
      },
      "dataLabel": {
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
              "text": "ArcgisTelemetryMetric"
            }],
          "text": "the data label to use when a sparkline is rendered"
        },
        "attribute": "data-label",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "value": {},
      "isTransforming": {}
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
