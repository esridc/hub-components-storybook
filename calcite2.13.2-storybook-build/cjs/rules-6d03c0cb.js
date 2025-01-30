'use strict';

const getPropertyFrom = require('./getPropertyFrom-29c68996.js');
const resources = require('./resources-42021303.js');
const isNil = require('./is-nil-e28a2884.js');
const ajv = require('./ajv-1ae2417a.js');
const state = require('./state-6637df8c.js');
const logger = require('./logger-5db3d659.js');
const _commonjsHelpers = require('./_commonjsHelpers-dcc4cf71.js');
const types = require('./types-60347c5c.js');
const getProp = require('./get-prop-4bd8fc1a.js');

const blockWords = {
  validate: (data) => {
    if (!data.length) {
      return true;
    }
    const trimmed = data.trim();
    const rawStrings = trimmed.split(',');
    const toValidUnique = (acc, str) => {
      const trimmed = str.trim();
      return trimmed && acc.indexOf(trimmed) === -1
        ? [...acc, trimmed]
        : acc;
    };
    const { length: numValid } = rawStrings.reduce(toValidUnique, []);
    return numValid <= 20 && rawStrings.length === numValid;
  },
};

/**
 * AJV custom formatter for slug validation
 * @param data - input being validated
 */
const slug = {
  validate: (data) => {
    if (!data.length) {
      return true;
    }
    // NOTE: this is use to validate the slugified title
    // portion of a site's URL, and was taken from:
    // https://github.com/ArcGIS/opendata-ui/blob/aa2e842a73b8530f97152d2654fe5643ad6cf929/packages/layout-editor-engine/addon/components/domain-settings-modal/component.js#L31
    // if we have to validate slugs w/ the `org-key|` prefix
    // then we will need a separate formatter like:
    // /^[a-z0-9]+(?:(-|\|)[a-z0-9]+)*$/.test(data)
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data);
  }
};

/**
 * Custom AJV format to support performing validations for
 * `hub-field-input-time` (i.e. `calcite-time-picker`) fields
 * in a form schema.
 */
const timePickerTime = {
  /**
   * Validates that the `hub-field-input-time` field's value is a valid
   * 24-hour time string in the format of `00:00:00` - `23:59:59`
   * @param value a string
   * @returns true when the string passes validation
   */
  validate: (value) => {
    let results = true;
    if (typeof value === 'string' && Boolean(value) && /^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$/.test(value)) {
      const [hours, minutes, seconds = 0] = value.split(':').map(segment => {
        try {
          return parseInt(segment, 10);
        }
        catch (e) {
          return null;
        }
      });
      results = hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60;
    }
    else {
      results = false;
    }
    return results;
  },
  /**
   * Compares two `hub-field-input-time` field values. This enables the ability to
   * perform more complex validations based on the value of other field values using
   * data references. See https://ajv.js.org/guide/combining-schemas.html#data-reference
   *
   * Eg. In the following schema, the `endTime` field will fail validation when it's time
   * value is before the time value of the `startTime` field.
   *
   * {
   *   properties: {
   *     startTime: {
   *       type: "string",
   *       format: "timePickerTime",
   *     },
   *     endTime: {
   *       type: "string",
   *       format: "timePickerTime",
   *       formatExclusiveMinimum: { $data: "1/startTime" },
   *     },
   *   },
   * }
   *
   * @param time1 the current `hub-field-input-time` field value
   * @param time2 a different `hub-field-input-time` field value
   * @returns 1 when time1 is greater, -1 when time2 is greater, else 0
   */
  compare: (time1, time2) => {
    const now = new Date();
    const getDate = (time) => {
      const [hours, minutes, seconds = 0] = time.split(':').map(segment => parseInt(segment, 10));
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds, 0);
    };
    const date1 = getDate(time1);
    const date2 = getDate(time2);
    if (date1 > date2) {
      return 1;
    }
    else if (date1 < date2) {
      return -1;
    }
    else {
      return 0;
    }
  },
};

/**
 * AJV custom formatter for URL validation. For
 * now, string must begin with "https://" or "/"
 * @param data - input being validated
 */
const url = {
  validate: (data) => {
    if (!data.length) {
      return true;
    }
    try {
      const isRelative = data.startsWith("/");
      new URL(data, isRelative ? window.location.origin : undefined);
      return data.startsWith("https://") || data.startsWith('/');
    }
    catch (e) {
      return false;
    }
  }
};

/**
 * Custom AJV format to support performing validations for
 * entity title fields in a form schema.
 * This format is used to validate that the provided string does not contain any emojis, or "<, >, =" characters
 */
const entityTitleValidator = {
  /**
 * Validates that the provided string does not contain any emojis, or "<, >, =" characters
 * @param value a string
 * @returns true when the string passes validation (no emoji present or "<, >, =" characters)
 */
  validate: (value) => {
    // Regex pattern for emoji characters pulled from https://regex101.com/r/0anB6Z/1
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    const doesNotHaveEmoji = typeof value === 'string' && !emojiRegex.test(value);
    // Regex pattern to check for <, >, and =
    const invalidCharRegex = /[<>==]/g;
    const doesNotHaveInvalidChar = typeof value === 'string' && !invalidCharRegex.test(value);
    return doesNotHaveEmoji && doesNotHaveInvalidChar;
  },
};

/**
 * Custom AJV format to support performing validations for
 * site entity title fields in a form schema.
 * This format is used to validate that the provided string does not contain any emojis,
 * nor unicode characters such as ë, É, Б, Г, Д, Ж
 */
const siteEntityTitleValidator = {
  /**
 * Validates that the provided string does not contain any or other unallowed characters
 * @param value a string
 * @returns true when the string passes validation (no emoji present or other unallowed characters)
 */
  validate: (value) => {
    // regex pattern for emoji characters pulled from https://regex101.com/r/0anB6Z/1
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
    const doesNotHaveEmoji = typeof value === 'string' && !emojiRegex.test(value);
    // regex pattern to check for unallowed unicode characters
    const invalidCharRegex = /[^\x00-\x7F]/;
    const doesNotHaveInvalidChar = typeof value === 'string' && !invalidCharRegex.test(value);
    return doesNotHaveEmoji && doesNotHaveInvalidChar;
  },
};

/**
 * TODO: if we need to pass context into the formatters, let's make this into a function
 * so that we can give context as a param
 */
const AJV_FORMATS = {
  blockWords,
  slug,
  timePickerTime,
  url,
  entityTitleValidator,
  siteEntityTitleValidator
};

/**
 * A custom keyword to determine if the entered domain is already in use
 */
const isUniqueDomain = {
  keyword: "isUniqueDomain",
  async: true,
  type: "object",
  validate: validateUniqueDomain,
};
// see ./readme.md#arguments for more info on schema and data
async function validateUniqueDomain(schema, data) {
  // NOTE: using dynamic import b/c this keyword
  // is currently added to _all_ validators
  const { lookupDomain } = await Promise.resolve().then(function () { return require('./index-c2124961.js'); });
  const context = state.getGlobalContext();
  const hostname = data.defaultHostname;
  // siteId is only passed in when editing an existing site
  const siteId = schema === null || schema === void 0 ? void 0 : schema.siteId;
  let isValid;
  try {
    const domain = await lookupDomain(hostname, context.hubRequestOptions);
    // if lookupDomain does NOT throw, we found a domain record
    // which is only valid if it is associated with the site we are editing
    isValid = domain.siteId === siteId;
  }
  catch (_) {
    // no domain found, so it's available
    isValid = true;
  }
  return isValid;
}

/**
 * A custom keyword to determine if the entered domain is already in use
 */
const isUniqueSlug = {
  keyword: "isUniqueSlug",
  async: true,
  type: "string",
  validate: validateUniqueSlug,
};
// NOTE: this expects the data to be the entity's
// slug _without_ the `${orgUrlKey}|` prefix
// see ./readme.md#arguments for more info on schema and data
async function validateUniqueSlug(schema, data) {
  // NOTE: using dynamic import b/c this keyword
  // is currently added to _all_ validators
  const { findItemsBySlug } = await Promise.resolve().then(function () { return require('./index-571c1b09.js'); });
  const context = state.getGlobalContext();
  // id is only passed in when editing an existing entity
  const exclude = schema === null || schema === void 0 ? void 0 : schema.id;
  const orgUrlKey = schema === null || schema === void 0 ? void 0 : schema.orgUrlKey;
  const slug = `${orgUrlKey}|${data}`;
  let isValid;
  try {
    const results = await findItemsBySlug({ slug, exclude }, context.requestOptions);
    isValid = results.length === 0;
  }
  catch (e) {
    logger.Logger.error(`Error checking for unique slug: ${slug}`, e);
    isValid = false;
  }
  return isValid;
}

const AJV_KEYWORDS = [
  isUniqueDomain,
  isUniqueSlug
];

var formats = _commonjsHelpers.createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
function fmtDef(validate, compare) {
    return { validate, compare };
}
exports.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: fmtDef(date, compareDate),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: fmtDef(time, compareTime),
    "date-time": fmtDef(date_time, compareDateTime),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte,
    // signed 32 bit integer
    int32: { type: "number", validate: validateInt32 },
    // signed 64 bit integer
    int64: { type: "number", validate: validateInt64 },
    // C-type float
    float: { type: "number", validate: validateNumber },
    // C-type double
    double: { type: "number", validate: validateNumber },
    // hint to the UI to hide input strings
    password: true,
    // unchecked string payload
    binary: true,
};
exports.fastFormats = {
    ...exports.fullFormats,
    date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
    time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareTime),
    "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
};
exports.formatNames = Object.keys(exports.fullFormats);
function isLeapYear(year) {
    // https://tools.ietf.org/html/rfc3339#appendix-C
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function date(str) {
    // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
    const matches = DATE.exec(str);
    if (!matches)
        return false;
    const year = +matches[1];
    const month = +matches[2];
    const day = +matches[3];
    return (month >= 1 &&
        month <= 12 &&
        day >= 1 &&
        day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]));
}
function compareDate(d1, d2) {
    if (!(d1 && d2))
        return undefined;
    if (d1 > d2)
        return 1;
    if (d1 < d2)
        return -1;
    return 0;
}
const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
function time(str, withTimeZone) {
    const matches = TIME.exec(str);
    if (!matches)
        return false;
    const hour = +matches[1];
    const minute = +matches[2];
    const second = +matches[3];
    const timeZone = matches[5];
    return (((hour <= 23 && minute <= 59 && second <= 59) ||
        (hour === 23 && minute === 59 && second === 60)) &&
        (!withTimeZone || timeZone !== ""));
}
function compareTime(t1, t2) {
    if (!(t1 && t2))
        return undefined;
    const a1 = TIME.exec(t1);
    const a2 = TIME.exec(t2);
    if (!(a1 && a2))
        return undefined;
    t1 = a1[1] + a1[2] + a1[3] + (a1[4] || "");
    t2 = a2[1] + a2[2] + a2[3] + (a2[4] || "");
    if (t1 > t2)
        return 1;
    if (t1 < t2)
        return -1;
    return 0;
}
const DATE_TIME_SEPARATOR = /t|\s/i;
function date_time(str) {
    // http://tools.ietf.org/html/rfc3339#section-5.6
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], true);
}
function compareDateTime(dt1, dt2) {
    if (!(dt1 && dt2))
        return undefined;
    const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
    const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
    const res = compareDate(d1, d2);
    if (res === undefined)
        return undefined;
    return res || compareTime(t1, t2);
}
const NOT_URI_FRAGMENT = /\/|:/;
const URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
    // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
    return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}
const BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
function byte(str) {
    BYTE.lastIndex = 0;
    return BYTE.test(str);
}
const MIN_INT32 = -(2 ** 31);
const MAX_INT32 = 2 ** 31 - 1;
function validateInt32(value) {
    return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
}
function validateInt64(value) {
    // JSON and javascript max Int is 2**53, so any int that passes isInteger is valid for Int64
    return Number.isInteger(value);
}
function validateNumber() {
    return true;
}
const Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
    if (Z_ANCHOR.test(str))
        return false;
    try {
        return true;
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=formats.js.map
});

var limit = _commonjsHelpers.createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLimitDefinition = void 0;


const ops = ajv.codegen.operators;
const KWDs = {
    formatMaximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    formatMinimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    formatExclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
};
const error = {
    message: ({ keyword, schemaCode }) => ajv.codegen.str `should be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode }) => ajv.codegen._ `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
};
exports.formatLimitDefinition = {
    keyword: Object.keys(KWDs),
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, schemaCode, keyword, it } = cxt;
        const { opts, self } = it;
        if (!opts.validateFormats)
            return;
        const fCxt = new ajv.ajv.KeywordCxt(it, self.RULES.all.format.definition, "format");
        if (fCxt.$data)
            validate$DataFormat();
        else
            validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats,
            });
            const fmt = gen.const("fmt", ajv.codegen._ `${fmts}[${fCxt.schemaCode}]`);
            cxt.fail$data(ajv.codegen.or(ajv.codegen._ `typeof ${fmt} != "object"`, ajv.codegen._ `${fmt} instanceof RegExp`, ajv.codegen._ `typeof ${fmt}.compare != "function"`, compareCode(fmt)));
        }
        function validateFormat() {
            const format = fCxt.schema;
            const fmtDef = self.formats[format];
            if (!fmtDef || fmtDef === true)
                return;
            if (typeof fmtDef != "object" ||
                fmtDef instanceof RegExp ||
                typeof fmtDef.compare != "function") {
                throw new Error(`"${keyword}": format "${format}" does not define "compare" function`);
            }
            const fmt = gen.scopeValue("formats", {
                key: format,
                ref: fmtDef,
                code: opts.code.formats ? ajv.codegen._ `${opts.code.formats}${ajv.codegen.getProperty(format)}` : undefined,
            });
            cxt.fail$data(compareCode(fmt));
        }
        function compareCode(fmt) {
            return ajv.codegen._ `${fmt}.compare(${data}, ${schemaCode}) ${KWDs[keyword].fail} 0`;
        }
    },
    dependencies: ["format"],
};
const formatLimitPlugin = (ajv) => {
    ajv.addKeyword(exports.formatLimitDefinition);
    return ajv;
};
exports.default = formatLimitPlugin;
//# sourceMappingURL=limit.js.map
});

var dist = _commonjsHelpers.createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



const fullName = new ajv.codegen.Name("fullFormats");
const fastName = new ajv.codegen.Name("fastFormats");
const formatsPlugin = (ajv, opts = { keywords: true }) => {
    if (Array.isArray(opts)) {
        addFormats(ajv, opts, formats.fullFormats, fullName);
        return ajv;
    }
    const [formats$1, exportName] = opts.mode === "fast" ? [formats.fastFormats, fastName] : [formats.fullFormats, fullName];
    const list = opts.formats || formats.formatNames;
    addFormats(ajv, list, formats$1, exportName);
    if (opts.keywords)
        limit.default(ajv);
    return ajv;
};
formatsPlugin.get = (name, mode = "full") => {
    const formats$1 = mode === "fast" ? formats.fastFormats : formats.fullFormats;
    const f = formats$1[name];
    if (!f)
        throw new Error(`Unknown format "${name}"`);
    return f;
};
function addFormats(ajv$1, list, fs, exportName) {
    var _a;
    var _b;
    (_a = (_b = ajv$1.opts.code).formats) !== null && _a !== void 0 ? _a : (_b.formats = ajv.codegen._ `require("ajv-formats/dist/formats").${exportName}`);
    for (const f of list)
        ajv$1.addFormat(f, fs[f]);
}
module.exports = exports = formatsPlugin;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formatsPlugin;
//# sourceMappingURL=index.js.map
});

const addFormats = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(dist);

/**
 * Instantiate a JSON schema validator for a provided schema. The returned
 * validator can then be used to validate data against the schema.
 */
function instantiateValidator(schema) {
  const ajv = _buildValidatorInstance();
  return ajv.compile(schema);
}
function _buildValidatorInstance() {
  const withFormats = (ajv, [formatName, formatDefinition]) => ajv.addFormat(formatName, formatDefinition);
  // instantiate ajv with formats
  const ajv = Object.entries(AJV_FORMATS)
    .reduce(withFormats, _instantiateAjvWithFormats());
  // add custom keywords
  AJV_KEYWORDS.forEach(keyword => ajv.addKeyword(keyword));
  return ajv;
}
/**
 * Builds base validator instance
 * @returns
 */
function _instantiateAjvWithFormats() {
  const instance = new ajv.Ajv({ allErrors: true, $data: true });
  addFormats(instance);
  return instance;
}
/**
 * Synchronous version of the validate function.
 *
 * We use this on rules and required property evaluation, as long as they are not using async validators/formats.
 * @param validator
 * @param values
 * @returns
 */
function validate(validator, values) {
  let valid = false;
  let errors = [];
  try {
    valid = !!validator(values);
    errors = validator.errors || [];
  }
  catch (e) {
    errors = e.errors;
  }
  return { valid, errors };
}
/**
 * Async version of the validate function
 *
 * A universal validate function that utilizes try/catch to determine if a schema passes.
 * Should only be used if the schema has async validators/formats and those errors are relevant. Otherwise, use the synchronous version.
 * @param validator
 * @param values
 * @returns
 */
async function validateAsync(validator, values) {
  let valid = false;
  let errors = [];
  try {
    valid = !!await validator(values);
    errors = validator.errors || [];
  }
  catch (e) {
    errors = e.errors;
  }
  return { valid, errors };
}

/**
 * Iterates over a uiSchema's rule(s), evaluates them, and returns
 * an array of effects (e.g. DISABLE, SHOW, etc.)
 * @param rules
 * @param model
 * @returns
 */
function evaluateUiSchemaRules(rules = [], model) {
  let result = [types.UiSchemaRuleEffects.SHOW];
  // only run rules if we have a schema to validate against
  if (model === null || model === void 0 ? void 0 : model.schema) {
    result = Array.isArray(rules)
      ? rules.map(rule => evaluateUiSchemaRule(rule, model))
      : [evaluateUiSchemaRule(rules, model)];
  }
  return result;
}
/**
 * Evaluates a given uiSchema rule based on the schema defined
 * in the rule and the field's current value. Returns the effect
 * that should be taken based on the evaluation
 */
function evaluateUiSchemaRule(uiSchemaRule, model) {
  let ruleEffect = types.UiSchemaRuleEffects.SHOW;
  if (uiSchemaRule) {
    const ruleEvalutesTrue = uiSchemaRule.condition ? evaluateCondition(uiSchemaRule.condition, model) : evaluateConditions(uiSchemaRule.conditions, model);
    const evaluationInverses = {
      [types.UiSchemaRuleEffects.SHOW]: types.UiSchemaRuleEffects.HIDE,
      [types.UiSchemaRuleEffects.HIDE]: types.UiSchemaRuleEffects.SHOW,
      [types.UiSchemaRuleEffects.DISABLE]: types.UiSchemaRuleEffects.ENABLE,
      [types.UiSchemaRuleEffects.ENABLE]: types.UiSchemaRuleEffects.DISABLE,
      [types.UiSchemaRuleEffects.RESET]: types.UiSchemaRuleEffects.NONE
    };
    ruleEffect = ruleEvalutesTrue ? uiSchemaRule.effect : evaluationInverses[uiSchemaRule.effect];
  }
  return ruleEffect;
}
/**
 * Evaluates an array of rule conditions, returning whether the condition is
 * true with the given condition scope and schema
 */
function evaluateConditions(conditions = [], model) {
  // if there are no conditions, someone set the rule up incorrectly and we want to return false
  let evaluation = false;
  if (conditions) {
    evaluation = conditions.every(condition => typeof condition === 'boolean' ? condition : evaluateCondition(condition, model));
  }
  return evaluation;
}
/**
 * Evaluates a schema condition, returning whether the condition
 * is true with the given condition scope and schema
 */
function evaluateCondition(condition, model) {
  let evaluation = false;
  if (condition) {
    // single evaluation
    if (condition.scope) {
      const schema = getPropertyFrom.jsonPointer.get(model.schema, condition.scope);
      const propertyPath = getPropertyFrom.getPropertyPathFromScope(condition.scope);
      const value = [
        getProp.getProp(model.values, propertyPath),
        schema.default,
        resources.SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE[schema.type]
      ].find(val => !isNil.isNil(val));
      const validator = instantiateValidator(condition.schema);
      evaluation = validate(validator, value).valid;
    }
    // multiple rules
    else {
      const properties = Object.keys(condition.schema.properties);
      const values = properties.reduce((acc, key) => {
        const scope = `/properties/${key}`;
        const schema = getPropertyFrom.jsonPointer.get(model.schema, scope);
        const value = [
          getProp.getProp(model.values, key),
          schema.default,
          resources.SCHEMA_TYPE_TO_DEFAULT_FIELD_VALUE[schema.type]
        ].find(val => !isNil.isNil(val));
        return Object.assign(Object.assign({}, acc), { [key]: value });
      }, {});
      const validator = instantiateValidator(condition.schema);
      evaluation = validate(validator, values).valid;
    }
  }
  return evaluation;
}

exports.evaluateCondition = evaluateCondition;
exports.evaluateConditions = evaluateConditions;
exports.evaluateUiSchemaRules = evaluateUiSchemaRules;
exports.instantiateValidator = instantiateValidator;
exports.validate = validate;
exports.validateAsync = validateAsync;
