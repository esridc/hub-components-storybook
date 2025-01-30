'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const interfaces = require('./interfaces-3c096567.js');
const metrics = require('./metrics-fa51a1d0.js');
const encoding = require('./encoding-211adb23.js');
const shareable = require('./shareable-36054bd4.js');
const isNil = require('./is-nil-e28a2884.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const resolveMetric = require('./resolveMetric-47df0783.js');
const util = require('./util-38e73510.js');
require('./feature-service-49ec8903.js');
require('./fetchHubEntity-88467d55.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./get-prop-4bd8fc1a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./get-form-json-e6831b20.js');
require('./HubInitiatives-25ecf40a.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./fetchContent-963f3885.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./types-751ad3a9.js');
require('./resources-e64df288.js');
require('./index-058372c1.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');

/**
 * Decodes a Base64 encoded string into a JSON object. Used for decoding complex web props that
 * are passed in as Base64 encoded strings.
 * See more: https://developer.mozilla.org/en-US/docs/Web/API/atob
 * @param encoded
 * @returns JSON object | undefined
 */
function decodeProp(encoded) {
  try {
    return JSON.parse(encoding.base64ToUnicode(encoded));
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
    index.registerInstance(this, hostRef);
    this.metric = undefined;
    this.encodedMetric = undefined;
    this.cardConfig = undefined;
    this.encodedCardConfig = undefined;
    this.resolvedMetric = undefined;
    this.errorMessage = undefined;
    this.isLoading = false;
    this._context = state.getGlobalContext();
    context.bind(this, 'beginResolveMetric');
  }
  connectedCallback() {
    state.connectContext(this);
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
    this.intl = intlManager.intlManager.getIntlForComponent(this.element);
  }
  async resolveMetricWithTimeout(metric, context, serverTimeout) {
    let resolvedMetric;
    // try to get the metric
    try {
      // if we have a valid server timeout amount, have a race condition
      // else, resolve and take as long as we need
      resolvedMetric = serverTimeout && !isNaN(serverTimeout) ?
        await promiseWithTimeout(resolveMetric.resolveMetric(metric, context), serverTimeout) :
        await resolveMetric.resolveMetric(metric, context);
      // successful, so reset error message state
      this.errorMessage = undefined;
    }
    catch (e) {
      // timeout error
      if (e == TIMEOUT_ERROR) {
        this.errorMessage = { premadeType: interfaces.METRIC_ERRORS.timeout };
        console.error("Timeout error");
        // other error with fetching metric
      }
      else {
        console.error("Error resolving metric: ", e);
        this.errorMessage = { premadeType: interfaces.METRIC_ERRORS.generic };
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
    return !isNil.isNil(value) && !isNil.isNil(type);
  }
  verifyServiceQuery(source) {
    const { type, serviceUrl, layerId, field, statistic } = source;
    return field && !isNil.isNil(type) && !isNil.isNil(serviceUrl) && !isNil.isNil(layerId) && !isNil.isNil(field) && !isNil.isNil(statistic);
  }
  /**
   * Prepares a metric that was not encoded and passed in. Will decode specific encoded properties.
   * If property is not encoded, running decodeURIComponent on the property has no effect.
   * @param metric
   * @returns
   */
  prepareMetric(metric) {
    const metricCopy = util.cloneObject(metric);
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
    const statCardConfig = metrics.metricToStatCardConfig(this.resolvedMetric, this._cardConfig, this.intl);
    const Component = this.cardComponent;
    return (index.h(index.Host, { "data-element": "metrics-card" }, index.h(shareable.Shareable, { context: { element: this.element, shareable: this._cardConfig.shareable, shareableOnHover: this._cardConfig.shareableOnHover, shareableByReference: this._cardConfig.shareableByReference, shareableByValue: this._cardConfig.shareableByValue }, showShareUi: true }, index.h(Component, Object.assign({ errorMessage: this.errorMessage }, statCardConfig, { isLoading: this.isLoading })))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "metric": ["beginResolveMetric"],
    "encodedMetric": ["beginResolveMetric"],
    "_context": ["beginResolveMetric"]
  }; }
};
ArcgisHubMetricCard.style = arcgisHubMetricCardCss;

exports.arcgis_hub_metric_card = ArcgisHubMetricCard;
