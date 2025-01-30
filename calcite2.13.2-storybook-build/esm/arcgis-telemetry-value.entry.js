import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getProp } from './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';

const ArcgisTelemetryValue = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get element() { return getElement(this); }
  static get watchers() { return {
    "data": ["handleChange"],
    "options": ["handleChange"]
  }; }
};

export { ArcgisTelemetryValue as arcgis_telemetry_value };
