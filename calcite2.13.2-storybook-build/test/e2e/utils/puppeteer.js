var __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
import * as environments from '../environments';
import { getPortalUrl } from './ago';
import { ENVIRONMENT } from ".";
import { newE2EPage } from "@stencil/core/testing";
const DEFAULT_TIMEOUT = 30 * 1000;
// from https://github.com/ionic-team/stencil/blob/f63222b00d25f45ca35e422694b80d9032eccdff/src/testing/matchers/events.ts#L137
// which is borrowed from
// from https://www.npmjs.com/package/fast-deep-equal
// latest fast-deep-equal results in errors
/**
 * Deeply compare two objects
 * @param a First object
 * @param b Second object
 */
const _deepEqual = function equal(a, b) {
  if (a === b) {
    return true;
  }
  if (a && b && typeof a == 'object' && typeof b == 'object') {
    const arrA = Array.isArray(a), arrB = Array.isArray(b);
    let i, length, key;
    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) {
        return false;
      }
      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    if (arrA != arrB) {
      return false;
    }
    const dateA = a instanceof Date, dateB = b instanceof Date;
    if (dateA != dateB) {
      return false;
    }
    if (dateA && dateB) {
      return a.getTime() == b.getTime();
    }
    const regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
    if (regexpA != regexpB) {
      return false;
    }
    if (regexpA && regexpB) {
      return a.toString() == b.toString();
    }
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
};
/**
 * Adds common globals for use by other utils
 * @param page An E2E Page instance
 */
const _addGlobals = async (page) => {
  await page.evaluate(async () => {
    if (!globalThis._parseSelector) {
      globalThis._parseSelector = (selector) => selector.split('>>>').reduce((acc, segment) => {
        const trimmed = segment.trim();
        return trimmed ? [...acc, trimmed] : acc;
      }, []);
    }
    if (!globalThis._querySelector) {
      globalThis._querySelector = (selector) => {
        try {
          const [shallow, ...shadows] = globalThis._parseSelector(selector);
          const element = shadows.reduce((acc, shadow) => { var _a; return (_a = acc.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(shadow); }, document.querySelector(shallow));
          return element;
        }
        catch (e) {
          return null;
        }
      };
    }
    if (!globalThis._querySelectorAll) {
      globalThis._querySelectorAll = (selector) => {
        try {
          const [shallow, ...shadows] = globalThis._parseSelector(selector);
          let elements = document.querySelectorAll(shallow);
          if (shadows.length) {
            elements = shadows.reduce((acc, shadow, idx) => {
              var _a, _b;
              return idx < shadows.length
                ? (_a = acc.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(shadow)
                : (_b = acc.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelectorAll(shadow);
            }, document.querySelector(shallow));
          }
          return elements;
        }
        catch (e) {
          return null;
        }
      };
    }
    if (!globalThis._getAttribute) {
      globalThis._getAttribute = (element, name) => {
        var _a;
        // for some reason, calling getAttribute on an `input` element always returns `null`
        // even if its `value` attribute is a string.
        return (element.nodeName === 'INPUT' && name === 'value')
          ? (_a = element[name]) !== null && _a !== void 0 ? _a : null
          : element.getAttribute(name);
      };
    }
  });
  try {
    await page.exposeFunction('_match', (value, source, flags) => (new RegExp(source, flags).test(value)));
    await page.exposeFunction('_deepEqual', (val1, val2) => _deepEqual(val1, val2));
  }
  catch (e) {
    // suppress
  }
};
/**
 * Waits for an element at `selector` to have an attribute named
 * `name` to have value `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Attribute name
 * @param value Attribute value
 * @param options Timeout options
 */
export const waitForAttributeEquals = async (page, selector, name, value, options = {}) => {
  await _addGlobals(page);
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await page.waitForFunction(async (selector, name, value) => {
      const element = globalThis._querySelector(selector);
      if (element) {
        const val = globalThis._getAttribute(element, name);
        return val === value;
      }
      else {
        return false;
      }
    }, Object.assign({ timeout }, restOptions), selector, name, value);
  }
  catch (e) {
    throw new Error(`Element at "${selector}" did not have attribute "${name}" value of "${value}" after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to have an attribute named
 * `name` to match `pattern`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Attribute name
 * @param pattern RegExp pattern
 * @param options Timeout options
 */
export const waitForAttributeMatches = async (page, selector, name, pattern, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  await _addGlobals(page);
  try {
    await page.waitForFunction(async (selector, name, source, flags) => {
      const element = globalThis._querySelector(selector);
      if (Boolean(element)) {
        const value = globalThis._getAttribute(element, name);
        const result = await globalThis._match(value, source, flags);
        return result;
      }
      else {
        return false;
      }
    }, Object.assign({ timeout }, restOptions), selector, name, pattern.source, pattern.flags);
  }
  catch (e) {
    throw new Error(`Element at "${selector}"'s ${name} attribute did not match "${pattern}" after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to have an attribute named
 * `name`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Attribute name
 * @param options Timeout options
 */
export const waitForHasAttribute = async (page, selector, name, options = {}) => {
  await _addGlobals(page);
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await page.waitForFunction(async (selector, name) => {
      const element = globalThis._querySelector(selector);
      return Boolean(element) && globalThis._getAttribute(element, name) !== null;
    }, Object.assign({ timeout }, restOptions), selector, name);
  }
  catch (e) {
    throw new Error(`Element at "${selector}" did not have attribute "${name}" after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to not have an attribute named
 * `name`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Attribute name
 * @param options Timeout options
 */
export const waitForNotHasAttribute = async (page, selector, name, options = {}) => {
  await _addGlobals(page);
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await page.waitForFunction(async (selector, name) => {
      const element = globalThis._querySelector(selector);
      if (element) {
        const res = globalThis._getAttribute(element, name);
        return res === null;
      }
      else {
        return false;
      }
    }, Object.assign({ timeout }, restOptions), selector, name);
  }
  catch (e) {
    throw new Error(`Element at "${selector}" still had attribute "${name}" after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to have textContent
 * equal to `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param value textContent value
 * @param options Timeout options
 */
export const waitForTextContentEquals = async (page, selector, value, options = {}) => {
  await _addGlobals(page);
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await page.waitForFunction(async (selector, value) => {
      const element = globalThis._querySelector(selector);
      if (element) {
        const res = element.textContent === value;
        return res;
      }
      else {
        return false;
      }
    }, Object.assign({ timeout }, restOptions), selector, value);
  }
  catch (e) {
    throw new Error(`Element at "${selector}" did not have textContent "${value}" after ${timeout}ms`);
  }
};
/**
 * Waits for some of the elements at `selector` to have
 * textContent equal to `value`
 * @param page An E2E page instance
 * @param selector A CSS selector for multiple elements, supports >>> piercing selector
 * @param value textContent value
 * @param options Timeout options
 */
export const waitForSomeTextContentEquals = async (page, selector, value, options = {}) => {
  await _addGlobals(page);
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await page.waitForFunction(async (selector, value) => {
      const elements = globalThis._querySelectorAll(selector);
      return Array.from(elements).some((element) => element.textContent === value);
    }, Object.assign({ timeout }, restOptions), selector, value);
  }
  catch (e) {
    throw new Error(`At least one of the elements at "${selector}" did not have textContent "${value}" after ${timeout}ms`);
  }
};
/**
 * Waits for none of the elements at `selector` to have
 * textContent equal to `value`
 * @param page An E2E page instance
 * @param selector A CSS selector for multiple elements, supports >>> piercing selector
 * @param value textContent value
 * @param options Timeout options
 */
export const waitForNoTextContentEquals = async (page, selector, value, options = {}) => {
  await _addGlobals(page);
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await page.waitForFunction(async (selector, value) => {
      const elements = globalThis._querySelectorAll(selector);
      return !Array.from(elements).some((element) => element.textContent === value);
    }, Object.assign({ timeout }, restOptions), selector, value);
  }
  catch (e) {
    throw new Error(`At least one of the elements at "${selector}" has textContent "${value}" after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to have value
 * equal to `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param value value to verify
 * @param options Timeout options
 */
export const waitForValueEquals = async (page, selector, value, options = {}) => {
  await _addGlobals(page);
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await page.waitForFunction(async (selector, value) => {
      const element = globalThis._querySelector(selector);
      if (element) {
        const res = element.value === value;
        return res;
      }
      else {
        return false;
      }
    }, Object.assign({ timeout }, restOptions), selector, value);
  }
  catch (e) {
    throw new Error(`Element at "${selector}" did not have value "${value}" after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to have textContent
 * that includes `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param value textContent value
 * @param options Timeout options
 */
export const waitForTextContentIncludes = async (page, selector, value, options = {}) => {
  await _addGlobals(page);
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await page.waitForFunction(async (selector, value) => {
      var _a;
      const element = globalThis._querySelector(selector);
      return element
        ? Boolean((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.includes(value))
        : false;
    }, Object.assign({ timeout }, restOptions), selector, value);
  }
  catch (e) {
    throw new Error(`Element at "${selector}" did not include "${value}" in textContent after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to exist
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param options Timeout options
 */
export const waitForExists = async (page, selector, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await _addGlobals(page);
    const jsHandle = await page.waitForFunction((selector) => globalThis._querySelector(selector), Object.assign({ timeout }, restOptions), selector);
    return jsHandle.asElement();
  }
  catch (e) {
    throw new Error(`Element at "${selector}" did not exist after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to be visible
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param options Timeout options
 */
export const waitForVisible = async (page, selector, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await _addGlobals(page);
    const elementHandle = await page.waitForFunction((selector) => {
      const element = globalThis._querySelector(selector);
      if (element) {
        const style = globalThis.getComputedStyle(element);
        const isVisible = (style && style.display !== 'none' &&
          style.visibility !== 'hidden' && style.opacity !== '0' &&
          element.clientHeight !== 0);
        return isVisible ? element : false;
      }
      else {
        return false;
      }
    }, Object.assign({ timeout }, restOptions), selector);
    await page.waitForChanges();
    return elementHandle.asElement();
  }
  catch (e) {
    throw new Error(`Element at "${selector}" was not visible after ${timeout}`);
  }
};
/**
 * Waits for the given `duration` to ellapse
 * @param duration Duration in ms
 */
export const waitForDuration = async (duration) => {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};
/**
 * Waits for an element at `selector` to not exist
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param options Timeout options
 */
export const waitForNotExists = async (page, selector, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  try {
    await _addGlobals(page);
    await page.waitForFunction((selector) => !globalThis._querySelector(selector), Object.assign({ timeout }, restOptions), selector);
  }
  catch (e) {
    throw new Error(`Element at "${selector}" still existed after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to have textContent
 * that matches `pattern`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param pattern RegExp pattern
 * @param options Timeout options
 */
export const waitForTextContentMatches = async (page, selector, pattern, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  await _addGlobals(page);
  try {
    await page.waitForFunction(async (selector, source, flags) => {
      const element = globalThis._querySelector(selector);
      return Boolean(element) && await globalThis._match(element.textContent, source, flags);
    }, Object.assign({ timeout }, restOptions), selector, pattern.source, pattern.flags);
  }
  catch (e) {
    throw new Error(`Element at "${selector}" textContent did not match "${pattern}" after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to have an property named
 * `name` to have a value that deep equals `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Property name
 * @param value Property value
 * @param options Timeout options
 */
export const waitForPropertyEquals = async (page, selector, name, value, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  await _addGlobals(page);
  try {
    await page.waitForFunction(async (selector, name, value) => {
      const element = globalThis._querySelector(selector);
      if (element) {
        const val = element[name];
        const result = await globalThis._deepEqual(value, val);
        return result;
      }
      else {
        return false;
      }
    }, Object.assign({ timeout }, restOptions), selector, name, value);
  }
  catch (e) {
    throw new Error(`Element at "${selector}" did not have expected value ${value} for property "${name}" after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to have an property named
 * `name` that includes `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Property name
 * @param value Property value
 * @param options Timeout options
 */
export const waitForPropertyIncludes = async (page, selector, name, value, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  await _addGlobals(page);
  try {
    await page.waitForFunction(async (selector, name, value) => {
      const element = globalThis._querySelector(selector);
      return Boolean(element) && element[name].includes(value);
    }, Object.assign({ timeout }, restOptions), selector, name, value);
  }
  catch (e) {
    throw new Error(`Element at "${selector}" did not receive expected value for property"${name}" after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to be visible then attempts to click
 * the element via JavaScript click. This is different than calling `page.$('.clazz').click()`
 * and `page.find('.clazz').click()` and can be useful in certain circumstances when the element
 * being clicked is visible, but Puppeteer throws an error `Error: Node is either not visible or not an HTMLElement`.
 * See https://github.com/puppeteer/puppeteer/issues/2977 for more context.
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param options Timeout options
 */
export const waitForAndClick = async (page, selector, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  await _addGlobals(page);
  try {
    await waitForVisible(page, selector, Object.assign({ timeout }, restOptions));
    await page.evaluate((selector) => globalThis._querySelector(selector).click(), selector);
    await page.waitForChanges();
  }
  catch (e) {
    console.error('waitForAndClick error:', e);
    throw new Error(`Element at "${selector}" was not clicked after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to be visible then attempts
 * to focus it
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param options Timeout options
 */
export const waitForAndFocus = async (page, selector, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  await _addGlobals(page);
  try {
    await waitForVisible(page, selector, Object.assign({ timeout }, restOptions));
    await page.evaluate((selector) => globalThis._querySelector(selector).focus(), selector);
    await page.waitForChanges();
  }
  catch (e) {
    console.error('waitForAndFocus error:', e);
    throw new Error(`Element at "${selector}" was not focused after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to be in focus, then attempts
 * to type `input` into the element
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param input Text to type
 * @param options Timeout options
 */
export const waitForFocusAndType = async (page, selector, input, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options, restOptions = __rest(options, ["timeout"]);
  await _addGlobals(page);
  try {
    await waitForAndFocus(page, selector, Object.assign({ timeout }, restOptions));
    // Note: increase the delay to 120 if you are running
    // component e2es locally and want to see the typing
    // at a "human" speed
    await page.keyboard.type(input, { delay: 0 });
    await page.waitForChanges();
  }
  catch (e) {
    console.error('typeInput error:', e);
    throw new Error(`"${input}" was not typed in "${selector}" after ${timeout}ms`);
  }
};
/**
 * Waits for an element at `selector` to exist and then attempts to scroll it into view via
 * the JavaScript scrollIntoView. This is is helpful when an element exists out of viewport on
 * initialization, but you need to wait for the element to become visible before an interaction.
 *
 * e.g., just `waitForAndClick()` fails, but `scrollIntoView() && waitForAndClick()` works.
 *
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param options Timeout options
 */
export const scrollIntoView = async (page, selector, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options;
  await _addGlobals(page);
  try {
    await waitForExists(page, selector, options);
    await page.evaluate((selector) => globalThis._querySelector(selector).scrollIntoView(), selector);
  }
  catch (e) {
    console.error('scrollIntoViewError error:', e);
    throw new Error(`Element at "${selector}" was not scrolled into view after ${timeout}ms`);
  }
};
/**
 * Injects a `debugger` statement into the browser context. This
 * is useful for inspecting the DOM while writing/debugging E2E tests.
 * `page.debugger();` should do something similar, but does not appear
 * to work at this time.
 * @param page An E2E page instance
 */
export const debug = async (page) => {
  await page.evaluate(() => { debugger; });
};
/**
 * We can't pass instances from Node.js context to browser context
 * via `page.$eval`, so the ArcGISContext must be created within the
 * browser context. To do this, we need `arcgisHub` and `arcgisRest`
 * variables to be available in the global browser scope. We achieve
 * this by loading the `UMD` build of the following packages from
 * the unpkg CDN.
 */
const SCRIPTS = [
  ['@esri/hub-common', 'common'],
  ['@esri/arcgis-rest-request', 'request'],
  ['@esri/arcgis-rest-auth', 'auth']
].map(([packageName, filePrefix]) => {
  // TODO: we can get the ESM builds from skypack instead
  if (packageName.indexOf('@esri/hub-') === 0) {
    // NOTE: we're no longer publishing a UMD build of hub.js,
    // so this is pointing to the last published (9.x) version
    // at some point, this will probably break
    return `https://cdn.jsdelivr.net/npm/${packageName}@9/dist/umd/${filePrefix}.umd.js`;
  }
  else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version } = require(`${packageName}/package.json`);
    return `https://cdn.jsdelivr.net/npm/${packageName}@${version}/dist/umd/${filePrefix}.umd.min.js`;
  }
});
/**
 * Gets the credentials for the given User and Organization
 * @param organization
 * @param user
 */
export function getUserInfo(organization, user) {
  let userInfo;
  if (user) {
    userInfo = environments[ENVIRONMENT].organizations[organization].users[user];
    if (!userInfo) {
      throw new Error(`No user configured for ${user} in ${ENVIRONMENT} ${organization}`);
    }
  }
  return userInfo;
}
;
/**
 * Creates a new E2EPage, loads all scripts necessary to
 * create `UserSession` and `ArcGISContext` from inside the Puppeteer
 * browser context (so tokens work as expected), creates ArcGISContext,
 * optionally authenticating a user, and applies to all elements matching
 * selectors from `selectors` array
 * @param options A NewE2EPageOptions object
 */
export const newHubE2EPage = async (options) => {
  const _a = Object.assign({}, options), { selectors, organization, user } = _a, newE2EPageOptions = __rest(_a, ["selectors", "organization", "user"]);
  const page = await newE2EPage(newE2EPageOptions);
  await Promise.all(SCRIPTS.reduce((acc, url) => [...acc, page.addScriptTag({ url })], [page.addStyleTag({ path: 'www/calcite/calcite.css' })]));
  await updateContext({
    page,
    organization,
    user,
    selectors,
  });
  await page.waitForChanges();
  return page;
};
/**
 * Creates an instance of ArcGISContext and UserSession for the
 * given Organization and User from inside the browser context
 * (so XHR calls work as expected) and applies the `context` property
 * to all elements matching the given `selectors` array
 * @param options
 */
export const signIn = async (options) => {
  const { page, organization, user, selectors } = options;
  await updateContext({
    page,
    organization,
    user,
    selectors,
  });
};
/**
 * Creates a new ArcGISContext for an anonymous user
 * and applies the `context` property to all elements
 * matching the given `selectors` array
 * @param options
 */
export const signOut = async (options) => {
  const { page, selectors } = options;
  await updateContext({
    page,
    selectors,
  });
};
/**
 * Creates an instance of ArcGISContext and applies the `context` property
 * to all elements matching the given `selectors` array
 * @param options
 */
const updateContext = async (options) => {
  const { page, organization, user, selectors = [] } = options !== null && options !== void 0 ? options : {};
  const portalUrl = getPortalUrl(organization);
  const userInfo = getUserInfo(organization, user);
  await page.$eval('body', async (_body, { portalUrl, userInfo, selectors }) => {
    let authentication;
    if (userInfo) {
      try {
        authentication = new globalThis.arcgisRest.UserSession({
          portal: `${portalUrl}/sharing/rest`,
          username: userInfo.username,
          password: userInfo.password
        });
      }
      catch (e) {
        console.error('Failed to create authentication:', e);
      }
    }
    let context;
    try {
      ({ context } = await globalThis.arcgisHub.ArcGISContextManager.create({
        portalUrl,
        authentication
      }));
    }
    catch (e) {
      console.error('Failed to create ArcGISContext:', e);
    }
    selectors.forEach(selector => {
      const els = document.querySelectorAll(selector);
      els.forEach(el => {
        if (el) {
          Object.assign(el, { context });
        }
      });
    });
  }, {
    portalUrl,
    userInfo,
    selectors
  });
  await page.waitForChanges();
};
