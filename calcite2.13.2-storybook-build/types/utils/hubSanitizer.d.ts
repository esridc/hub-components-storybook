/// <reference types="xss" />
export interface ISanitizedString {
  isValid: boolean;
  sanitized: string;
}
/**
 * Remove all html tags
 * @param {string} text text to sanitize
 */
export declare function stripHtml(text: string): string;
/**
 * All Hub Rules
 * @param {string} text text to sanitize
 */
export declare function sanitizeMarkdown(text: string): string;
/**
 * All Hub Rules, but strip hrefs
 * @param {string} text text to sanitize
 */
export declare function sanitizePreviewMarkdown(text: string): string;
/**
 * Normal Hub Sanitize Rules
 * @param {string} text text to sanitize
 */
export declare function sanitizeHtml(text: string, rulesetName?: string): string;
/**
 * Return the sanitized string, and a flag indicating if
 * changes were made during sanitization
 * @param {string} text Text to sanitize
 * @param {string} rulesetName ruleset to use
 */
export declare function validateHtml(text: string, rulesetName?: string): ISanitizedString;
/**
 * Only allow links
 * @param {string} text text to sanitize
 */
export declare function onlyLinks(text: string): string;
export declare function sanitizeHeadContent(text: string, page?: boolean): string;
/**
 * Sanitize a url
 * @param {string} value href or src property
 */
export declare function sanitizeUrl(value?: string, forceSsl?: boolean): string;
export declare const ALLOWED_PROTOCOLS: string[];
export declare const SVG_TAGS: string[];
/**
 * Hub-specific implementation of the jsxss safeAttrValue function
 * Take over safe attribute filtering for `a` `href`, `img` `src`,
 * and `source` `src` attributes, otherwise pass onto the
 * default `XSS.safeAttrValue` method.
 *
 * @export
 * @param {*} tag
 * @param {*} name
 * @param {*} value
 * @param {*} cssFilter
 * @returns
 */
export declare function hubSafeAttrValue(tag: string, name: string, value: string, cssFilter: XSS.ICSSFilter): string;
