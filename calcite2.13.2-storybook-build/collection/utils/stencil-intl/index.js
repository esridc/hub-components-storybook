// NOTE: we hope to move this module into it's own library
// like @esri/stencil-intl to be shared w/ other teams at Esri
import { createIntl, createIntlCache } from '@formatjs/intl';
import { getAssetPath } from '@stencil/core';
import { getLocaleInfo, fetchComponentLocaleStrings } from '../localization';
class _ComponentIntl {
  constructor(componentName, intl, formatIntl, direction) {
    this._componentName = componentName;
    this._intl = intl;
    this._formatIntl = formatIntl || intl;
    // NOTE: we currently set this in the constructor b/c we allow
    // component's dir attribute to override, but
    // maybe it should just be a getter based on locale instead
    this.direction = direction;
  }
  // expose intl properties and methods
  get locale() {
    return this._intl.locale;
  }
  // expose ember-intl API
  t(key, values, opts) {
    const id = `${this._componentName}.${key}`;
    let result = this._intl.formatMessage({ id }, values, opts);
    if ((opts === null || opts === void 0 ? void 0 : opts.fallback) !== undefined && result === id) {
      // runtime fallback mechanism
      result = opts.fallback;
    }
    return result;
  }
  formatRelativeTime(value, unit, options) {
    return this._formatIntl.formatRelativeTime(value, unit, options);
  }
  formatDisplayName(value, options) {
    return this._formatIntl.formatDisplayName(value, options);
  }
  formatDate(value, options) {
    return this._formatIntl.formatDate(value, options);
  }
  formatNumber(value, options) {
    return this._formatIntl.formatNumber(value, options);
  }
  formatDateTimeRange(from, to, options) {
    return this._formatIntl.formatDateTimeRange(from, to, options);
  }
}
class _IntlManager {
  constructor(options = {}) {
    // intl instances for each locale
    this._intls = {};
    const { assetPath = 't9n', fileNamePattern = '{tagName}.t9n.{locale}.json' } = options;
    this.assetPath = assetPath,
      this.fileNamePattern = fileNamePattern;
  }
  getIntlForComponent(element) {
    // determine component locale
    const { direction, formatLocale } = getLocaleInfo(element);
    const componentName = element.tagName.toLowerCase();
    // for date/time/number formatting, we support a superset of locales that we have translations for
    // since this function is used to instantiate intl for components without translations (to make use of format* functions)
    // we use the formatLocale
    // this is for cases like `en` locale w/ `en-GB` formatLocale
    const messages = {};
    const intl = createIntl({
      locale: formatLocale,
      messages,
    });
    // cache the instance for use amongst other components
    this._intls[formatLocale] = intl;
    const formatIntl = intl;
    return new _ComponentIntl(componentName, intl, formatIntl, direction);
  }
  async loadIntlForComponent(element, baseUrl) {
    // determine component locale
    const { locale, direction, formatLocale } = getLocaleInfo(element);
    // fetch messages for this component
    // TODO: lazy load these
    const { fileNamePattern, assetPath } = this;
    const { strings } = await fetchComponentLocaleStrings(element, baseUrl || getAssetPath(assetPath), fileNamePattern);
    // prepend component name to all message keys
    // and merge w/ existing messages for this locale, if any
    const componentName = element.tagName.toLowerCase();
    let intl = this._intls[locale];
    const messages = this.parseStrings(strings, componentName, intl ? intl.messages : {});
    // NOTE: for now, we _always_
    // create a new intl instance for this locale w/ this component's messages
    // though we'd like to re-use a previous instance
    // and just append the new messages
    const cache = createIntlCache();
    intl = createIntl({
      locale,
      messages
    }, cache);
    // cache the instance for use amongst other components
    this._intls[locale] = intl;
    // for date/time/number formatting, we support a superset of locales that we have translations for
    // if the formatLocale is different than the locale, we need to create a separate instance
    // this is for cases like `en` locale w/ `en-GB` formatLocale
    let formatIntl = intl;
    if (locale !== formatLocale) {
      formatIntl = createIntl({
        locale: formatLocale,
        messages: {},
      });
    }
    return new _ComponentIntl(componentName, intl, formatIntl, direction);
  }
  parseStrings(strings, pathName, messages) {
    return Object.entries(strings).reduce((accum, [key, val]) => {
      if (typeof val === 'string') {
        accum[`${pathName}.${key}`] = val;
      }
      else {
        this.parseStrings(val, `${pathName}.${key}`, accum);
      }
      return accum;
    }, messages);
  }
}
/**
 * Factory function to initialize a new instance of IntlManager
 * @param options
 * @returns
 */
export const createIntlManager = (options) => {
  return new _IntlManager(options);
};
