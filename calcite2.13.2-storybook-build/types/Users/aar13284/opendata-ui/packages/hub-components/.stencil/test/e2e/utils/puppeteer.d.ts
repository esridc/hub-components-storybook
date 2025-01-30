import { E2EPage } from "@stencil/core/testing/puppeteer/puppeteer-declarations";
import { PageFnOptions, ElementHandle } from "puppeteer";
import { Organization, User } from ".";
import { IE2EUserInfo, NewHubE2EPageOptions } from "../types";
/**
 * Waits for an element at `selector` to have an attribute named
 * `name` to have value `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Attribute name
 * @param value Attribute value
 * @param options Timeout options
 */
export declare const waitForAttributeEquals: (page: E2EPage, selector: string, name: string, value: any, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to have an attribute named
 * `name` to match `pattern`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Attribute name
 * @param pattern RegExp pattern
 * @param options Timeout options
 */
export declare const waitForAttributeMatches: (page: E2EPage, selector: string, name: string, pattern: RegExp, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to have an attribute named
 * `name`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Attribute name
 * @param options Timeout options
 */
export declare const waitForHasAttribute: (page: E2EPage, selector: string, name: string, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to not have an attribute named
 * `name`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Attribute name
 * @param options Timeout options
 */
export declare const waitForNotHasAttribute: (page: E2EPage, selector: string, name: string, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to have textContent
 * equal to `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param value textContent value
 * @param options Timeout options
 */
export declare const waitForTextContentEquals: (page: E2EPage, selector: string, value: string, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for some of the elements at `selector` to have
 * textContent equal to `value`
 * @param page An E2E page instance
 * @param selector A CSS selector for multiple elements, supports >>> piercing selector
 * @param value textContent value
 * @param options Timeout options
 */
export declare const waitForSomeTextContentEquals: (page: E2EPage, selector: string, value: string, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for none of the elements at `selector` to have
 * textContent equal to `value`
 * @param page An E2E page instance
 * @param selector A CSS selector for multiple elements, supports >>> piercing selector
 * @param value textContent value
 * @param options Timeout options
 */
export declare const waitForNoTextContentEquals: (page: E2EPage, selector: string, value: string, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to have value
 * equal to `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param value value to verify
 * @param options Timeout options
 */
export declare const waitForValueEquals: (page: E2EPage, selector: string, value: string, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to have textContent
 * that includes `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param value textContent value
 * @param options Timeout options
 */
export declare const waitForTextContentIncludes: (page: E2EPage, selector: string, value: string, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to exist
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param options Timeout options
 */
export declare const waitForExists: (page: E2EPage, selector: string, options?: PageFnOptions) => Promise<ElementHandle<Element>>;
/**
 * Waits for an element at `selector` to be visible
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param options Timeout options
 */
export declare const waitForVisible: (page: E2EPage, selector: string, options?: PageFnOptions) => Promise<ElementHandle<Element>>;
/**
 * Waits for the given `duration` to ellapse
 * @param duration Duration in ms
 */
export declare const waitForDuration: (duration: number) => Promise<void>;
/**
 * Waits for an element at `selector` to not exist
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param options Timeout options
 */
export declare const waitForNotExists: (page: E2EPage, selector: string, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to have textContent
 * that matches `pattern`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param pattern RegExp pattern
 * @param options Timeout options
 */
export declare const waitForTextContentMatches: (page: E2EPage, selector: string, pattern: RegExp, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to have an property named
 * `name` to have a value that deep equals `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Property name
 * @param value Property value
 * @param options Timeout options
 */
export declare const waitForPropertyEquals: (page: E2EPage, selector: string, name: string, value: any, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to have an property named
 * `name` that includes `value`
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param name Property name
 * @param value Property value
 * @param options Timeout options
 */
export declare const waitForPropertyIncludes: (page: E2EPage, selector: string, name: string, value: any, options?: PageFnOptions) => Promise<void>;
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
export declare const waitForAndClick: (page: E2EPage, selector: string, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to be visible then attempts
 * to focus it
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param options Timeout options
 */
export declare const waitForAndFocus: (page: E2EPage, selector: string, options?: PageFnOptions) => Promise<void>;
/**
 * Waits for an element at `selector` to be in focus, then attempts
 * to type `input` into the element
 * @param page An E2E page instance
 * @param selector A CSS selector, supports >>> piercing selector
 * @param input Text to type
 * @param options Timeout options
 */
export declare const waitForFocusAndType: (page: E2EPage, selector: string, input: string, options?: PageFnOptions) => Promise<void>;
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
export declare const scrollIntoView: (page: E2EPage, selector: string, options?: PageFnOptions) => Promise<void>;
/**
 * Injects a `debugger` statement into the browser context. This
 * is useful for inspecting the DOM while writing/debugging E2E tests.
 * `page.debugger();` should do something similar, but does not appear
 * to work at this time.
 * @param page An E2E page instance
 */
export declare const debug: (page: E2EPage) => Promise<void>;
/**
 * Gets the credentials for the given User and Organization
 * @param organization
 * @param user
 */
export declare function getUserInfo(organization: Organization, user: User): IE2EUserInfo;
/**
 * Creates a new E2EPage, loads all scripts necessary to
 * create `UserSession` and `ArcGISContext` from inside the Puppeteer
 * browser context (so tokens work as expected), creates ArcGISContext,
 * optionally authenticating a user, and applies to all elements matching
 * selectors from `selectors` array
 * @param options A NewE2EPageOptions object
 */
export declare const newHubE2EPage: (options?: NewHubE2EPageOptions) => Promise<E2EPage>;
/**
 * Creates an instance of ArcGISContext and UserSession for the
 * given Organization and User from inside the browser context
 * (so XHR calls work as expected) and applies the `context` property
 * to all elements matching the given `selectors` array
 * @param options
 */
export declare const signIn: (options: {
  page: E2EPage;
  organization: Organization;
  user: User;
  selectors: string[];
}) => Promise<void>;
/**
 * Creates a new ArcGISContext for an anonymous user
 * and applies the `context` property to all elements
 * matching the given `selectors` array
 * @param options
 */
export declare const signOut: (options: {
  page: E2EPage;
  organization: Organization;
  selectors: string[];
}) => Promise<void>;
