'use strict';

const interpolate = require('./interpolate-c1fe951a.js');

/**
 * This is used to translate all the strings that we want to translate in an object
 * (including the inherited properties) and interpolate them back into the same object.
 * Those strings in the object must be in the `{{abc.xyz...:translate}}` format
 * in order to be picked up by interpolate.
 *
 * Values can be passed to the strings by adding them in the `{{abc.xyz...|key1=value1|key2=value2:translate}}` format.
 *
 * NOTE: If a translation value contains a special character, it _must_ be url encoded before adding it to the string.
 * E.g. `{{abc.xyz...|key1=https%3A%2F%2Fmy-url.com%3Fquery%3Dstring:translate}}`
 *
 * @param intl The intl service
 * @param object Object to be translated
 * @returns An object with translated strings that are intended to be translated
 */
function interpolateTranslations(intl, object) {
  const transforms = {
    translate(keyAndVariables) {
      const [i18nKey, ...variablePairs] = keyAndVariables.split("|");
      const values = variablePairs.reduce((acc, pair) => {
        const [variable, value] = pair.split("=");
        if (variable && value && value !== 'null' && value !== 'undefined' && value !== 'false') {
          acc[variable] = decodeURIComponent(value);
        }
        return acc;
      }, {});
      return intl.t(i18nKey, values);
    }
  };
  return interpolate.interpolate(object, {}, transforms);
}

exports.interpolateTranslations = interpolateTranslations;
