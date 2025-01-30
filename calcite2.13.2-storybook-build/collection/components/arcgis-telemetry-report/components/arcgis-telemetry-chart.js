import { Host, h } from '@stencil/core';
import { getProp, Logger } from '@esri/hub-common';
import { getTelemetryChartConfig } from '../utils/chart';
export class ArcgisTelemetryChart {
  constructor() {
    this.data = undefined;
    this.category = undefined;
    this.reportTitle = undefined;
    this.options = undefined;
    this.isLoading = undefined;
    this.timeLabel = undefined;
    this.dataLabel = undefined;
    this.type = undefined;
    this.chartConfig = undefined;
  }
  // should this be watching isLoading too?
  async handleChange() {
    this.chartConfig = null;
    if (!this.isLoading) {
      try {
        const chartData = await this.transform(this.data, this.options);
        if (!chartData || !chartData.length) {
          // if we end up showing an error state (see below) this will need i18n
          throw new Error('No data provided to telemetry chart');
        }
        this.chartConfig = await getTelemetryChartConfig(chartData, this.category, this.type, this.timeLabel, this.dataLabel);
      }
      catch (error) {
        // currently we will show the loader forever when there's an error
        // so we should probably show an error state instead
        // we could also use that state to handle error messages that are
        // either passed in by the parent component or emitted from the chart component
        // but for now we just log this error
        Logger.error('arcgis-telemetry-chart', error);
      }
    }
  }
  handleUpdateComplete(e) {
    e.stopPropagation();
    const { detail } = e;
    const logMethod = detail.valid ? 'debug' : 'error';
    // see above comment about error state
    Logger[logMethod](`telemetry chart ${logMethod}`, e);
  }
  async componentWillLoad() {
    this.handleChange();
  }
  // this should be a util instead of a method
  async transform(data, options = {}) {
    const { dataTransforms, requestParams } = options;
    const result = data.map(item => {
      var _a, _b;
      const metricName = requestParams.metrics[0];
      let metric = getProp(item, metricName);
      const dataTransform = ((_b = (_a = dataTransforms === null || dataTransforms === void 0 ? void 0 : dataTransforms.find(transform => transform.name === metricName)) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.display) || (val => val);
      metric = Number(dataTransform(metric));
      return Object.assign(Object.assign({}, item), { [metricName]: metric });
    });
    return result;
  }
  get chartTagName() {
    const tagType = this.type === 'bar' ? 'bar' : 'line';
    return `arcgis-charts-${tagType}-chart`;
  }
  render() {
    // NOTE: at 4.32 there is only <arcgis-chart>
    // so we can get rid of this dynamic component
    const ChartComponent = this.chartTagName;
    return (h(Host, null, this.isLoading || !this.chartConfig
      ? h("arcgis-skeleton-loader", { active: true, rows: 5 })
      : h(ChartComponent, { config: this.chartConfig })));
  }
  static get is() { return "arcgis-telemetry-chart"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-telemetry-chart.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-telemetry-chart.css"]
    };
  }
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
              "text": "ArcgisTelemetryMetric"
            }],
          "text": "raw telemetry data"
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
          "text": "the time label to use on the chart"
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
      },
      "type": {
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
          "text": "the type of chart to render"
        },
        "attribute": "type",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "chartConfig": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "data",
        "methodName": "handleChange"
      }, {
        "propName": "options",
        "methodName": "handleChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "arcgisUpdateComplete",
        "method": "handleUpdateComplete",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
