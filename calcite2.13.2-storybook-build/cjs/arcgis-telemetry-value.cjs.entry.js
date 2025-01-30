'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const getProp = require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');

const ArcgisTelemetryValue = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    this.intl = await intlManager.intlManager.getIntlForComponent(this.element);
    this.handleChange();
  }
  _transform(data, options) {
    var _a, _b, _c;
    const { requestParams } = options;
    const metricName = requestParams.metrics[0];
    const metric = getProp.getProp(data, metricName);
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
    return (index.h(index.Host, null, this.isLoading || this.isTransforming
      ? index.h("arcgis-skeleton-loader", { active: true, rows: 1, showHeading: false })
      : this.value));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "data": ["handleChange"],
    "options": ["handleChange"]
  }; }
};

exports.arcgis_telemetry_value = ArcgisTelemetryValue;
