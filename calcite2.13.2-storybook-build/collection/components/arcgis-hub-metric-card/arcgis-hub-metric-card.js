import { resolveMetric, cloneObject } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { METRIC_ERRORS } from './interfaces';
import { metricToStatCardConfig } from '../../utils/metrics';
import { decodeProp } from '../../utils/decodeProp';
import { Shareable } from '../functional/shareable';
import { isNil } from '../../utils/is-nil';
import intlManager from '../../utils/intl-manager';
import { promiseWithTimeout, TIMEOUT_ERROR } from '../../utils/promise';
import { bind } from '../../utils/context';
import { connectContext, getGlobalContext } from '../../utils/state';
export class ArcgisHubMetricCard {
  constructor() {
    this.metric = undefined;
    this.encodedMetric = undefined;
    this.cardConfig = undefined;
    this.encodedCardConfig = undefined;
    this.resolvedMetric = undefined;
    this.errorMessage = undefined;
    this.isLoading = false;
    this._context = getGlobalContext();
    bind(this, 'beginResolveMetric');
  }
  connectedCallback() {
    connectContext(this);
  }
  disconnectedCallback() {
    this.disconnectContext();
  }
  /**
   * Calls resolveMetric in hub.js to return the IResolvedMetric for the metric.
   */
  async resolveMetric() {
    var _a;
    const decodedMetric = this.encodedMetric ? decodeProp(this.encodedMetric) : this.prepareMetric(this.metric);
    // if we have a source, try to get the metric
    if (this.verifyCompleteSource(decodedMetric) && this._context) {
      this.resolvedMetric = await this.resolveMetricWithTimeout(decodedMetric, this._context, (_a = this._cardConfig) === null || _a === void 0 ? void 0 : _a.serverTimeout);
    }
    else {
      console.info('Incomplete metric source.');
      this.resolvedMetric = undefined;
      this.isLoading = false;
    }
  }
  beginResolveMetric() {
    this.isLoading = true;
    this.resolveMetric();
  }
  componentWillLoad() {
    this.beginResolveMetric();
    this.intl = intlManager.getIntlForComponent(this.element);
  }
  async resolveMetricWithTimeout(metric, context, serverTimeout) {
    let resolvedMetric;
    // try to get the metric
    try {
      // if we have a valid server timeout amount, have a race condition
      // else, resolve and take as long as we need
      resolvedMetric = serverTimeout && !isNaN(serverTimeout) ?
        await promiseWithTimeout(resolveMetric(metric, context), serverTimeout) :
        await resolveMetric(metric, context);
      // successful, so reset error message state
      this.errorMessage = undefined;
    }
    catch (e) {
      // timeout error
      if (e == TIMEOUT_ERROR) {
        this.errorMessage = { premadeType: METRIC_ERRORS.timeout };
        console.error("Timeout error");
        // other error with fetching metric
      }
      else {
        console.error("Error resolving metric: ", e);
        this.errorMessage = { premadeType: METRIC_ERRORS.generic };
      }
    }
    this.isLoading = false;
    return resolvedMetric;
  }
  verifyCompleteSource(metric) {
    let res = false;
    // check that we have a source
    if (metric === null || metric === void 0 ? void 0 : metric.source) {
      const { type } = metric.source;
      // verify specific requirements
      if (type === "static-value") {
        res = this.verifyStaticQuery(metric.source);
      }
      else if (type === "service-query") {
        res = this.verifyServiceQuery(metric.source);
      }
    }
    return res;
  }
  verifyStaticQuery(source) {
    const { value, type } = source;
    return !isNil(value) && !isNil(type);
  }
  verifyServiceQuery(source) {
    const { type, serviceUrl, layerId, field, statistic } = source;
    return field && !isNil(type) && !isNil(serviceUrl) && !isNil(layerId) && !isNil(field) && !isNil(statistic);
  }
  /**
   * Prepares a metric that was not encoded and passed in. Will decode specific encoded properties.
   * If property is not encoded, running decodeURIComponent on the property has no effect.
   * @param metric
   * @returns
   */
  prepareMetric(metric) {
    const metricCopy = cloneObject(metric);
    // decode where clause if it exists
    if ((metricCopy === null || metricCopy === void 0 ? void 0 : metricCopy.source) && metricCopy.source.where) {
      const metricSource = metricCopy.source;
      metricSource.where = decodeURIComponent(metricSource.where);
    }
    return metricCopy;
  }
  get cardComponent() {
    return {
      'stat-card': "arcgis-stat-card"
    }[this._cardConfig.displayType] || 'stat-card';
  }
  get _cardConfig() {
    let _cardConfig = { metricId: '', displayType: 'stat-card' };
    if (this.cardConfig) {
      _cardConfig = this.cardConfig;
    }
    else if (this.encodedCardConfig) {
      _cardConfig = decodeProp(this.encodedCardConfig);
    }
    return _cardConfig;
  }
  render() {
    const statCardConfig = metricToStatCardConfig(this.resolvedMetric, this._cardConfig, this.intl);
    const Component = this.cardComponent;
    return (h(Host, { "data-element": "metrics-card" }, h(Shareable, { context: { element: this.element, shareable: this._cardConfig.shareable, shareableOnHover: this._cardConfig.shareableOnHover, shareableByReference: this._cardConfig.shareableByReference, shareableByValue: this._cardConfig.shareableByValue }, showShareUi: true }, h(Component, Object.assign({ errorMessage: this.errorMessage }, statCardConfig, { isLoading: this.isLoading })))));
  }
  static get is() { return "arcgis-hub-metric-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-metric-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-metric-card.css"]
    };
  }
  static get properties() {
    return {
      "metric": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IMetric",
          "resolved": "IMetric",
          "references": {
            "IMetric": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "metric to resolve through resolveMetric."
        }
      },
      "encodedMetric": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "metric object encoded as a base-64 string"
        },
        "attribute": "encoded-metric",
        "reflect": false
      },
      "cardConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IMetricDisplayConfig",
          "resolved": "IMetricDisplayConfig",
          "references": {
            "IMetricDisplayConfig": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "All display configuration properties to change the appearance of the rendered card\ne.x. corners, drop shadow, accent color, etc"
        }
      },
      "encodedCardConfig": {
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
          "text": "cardConfig object encoded as a base-64 string"
        },
        "attribute": "encoded-card-config",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "resolvedMetric": {},
      "errorMessage": {},
      "isLoading": {},
      "_context": {}
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "metric",
        "methodName": "beginResolveMetric"
      }, {
        "propName": "encodedMetric",
        "methodName": "beginResolveMetric"
      }, {
        "propName": "_context",
        "methodName": "beginResolveMetric"
      }];
  }
}
