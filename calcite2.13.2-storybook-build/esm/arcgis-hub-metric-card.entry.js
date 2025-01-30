import { r as registerInstance, h, H as Host, a as getElement } from './index-57f71b44.js';
import { M as METRIC_ERRORS } from './interfaces-2d2f56a7.js';
import { m as metricToStatCardConfig } from './metrics-31a6916b.js';
import { b as base64ToUnicode } from './encoding-1c5014ff.js';
import { S as Shareable } from './shareable-757262ff.js';
import { i as isNil } from './is-nil-03b9a6b5.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext, h as connectContext } from './state-31a09db0.js';
import { r as resolveMetric } from './resolveMetric-7286227d.js';
import { a as cloneObject } from './util-3e6872d9.js';
import './feature-service-308c7df6.js';
import './fetchHubEntity-28d04ab4.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './get-prop-ec5be510.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './get-form-json-1d4e3591.js';
import './HubInitiatives-4f4e24ce.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './types-db540898.js';
import './resources-3b88c839.js';
import './index-0a8fd06b.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';

/**
 * Decodes a Base64 encoded string into a JSON object. Used for decoding complex web props that
 * are passed in as Base64 encoded strings.
 * See more: https://developer.mozilla.org/en-US/docs/Web/API/atob
 * @param encoded
 * @returns JSON object | undefined
 */
function decodeProp(encoded) {
  try {
    return JSON.parse(base64ToUnicode(encoded));
  }
  catch (e) {
    console.error('could not parse prop JSON', e);
  }
}

// special timeout error
const TIMEOUT_ERROR = new Error("Timeout");
/**
 * Function to allow a promise to race against a timeout. If the promise finishes before the specified timeout,
 * the promise's value will be returned. If the timeout elapses before the promise finishes,
 * a timeout exception is returned.
 * @param prom Promise to race against a timeout (e.g. call to api)
 * @param timeoutAmount Amount of time (in seconds) to wait for the promise to finish before throwing an error
 * @returns Either returns the promise's resolved/rejected value, or TIMEOUT_ERROR
 */
const promiseWithTimeout = (prom, timeoutAmount) => {
  let timer;
  const timeout = timeoutAmount * 1000; // convert to milliseconds
  return Promise.race([
    prom,
    new Promise((_r, rej) => timer = setTimeout(rej, timeout, TIMEOUT_ERROR))
  ]).finally(() => clearTimeout(timer));
};

const arcgisHubMetricCardCss = ":host{display:block}";

const ArcgisHubMetricCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get element() { return getElement(this); }
  static get watchers() { return {
    "metric": ["beginResolveMetric"],
    "encodedMetric": ["beginResolveMetric"],
    "_context": ["beginResolveMetric"]
  }; }
};
ArcgisHubMetricCard.style = arcgisHubMetricCardCss;

export { ArcgisHubMetricCard as arcgis_hub_metric_card };
