import { Host, h } from '@stencil/core';
import { getProp } from '@esri/hub-common';
import intlManager from '../../../utils/intl-manager';
export class ArcgisTelemetryValue {
  constructor() {
    this.data = undefined;
    this.options = undefined;
    this.isLoading = undefined;
    this.value = undefined;
    this.isTransforming = true;
  }
  handleChange() {
    if (!this.isLoading) {
      this.isTransforming = true;
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
      value = this.intl.formatNumber(metric);
    }
    return { value };
  }
  render() {
    return (h(Host, null, this.isLoading || this.isTransforming
      ? h("arcgis-skeleton-loader", { active: true, rows: 1, showHeading: false })
      : this.value));
  }
  static get is() { return "arcgis-telemetry-value"; }
  static get encapsulation() { return "shadow"; }
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
              "text": "ArcgisTelemetryValue"
            }],
          "text": "raw telemetry data"
        },
        "attribute": "data",
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
              "text": "ArcgisTelemetryValue"
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
              "text": "ArcgisTelemetryValue"
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
