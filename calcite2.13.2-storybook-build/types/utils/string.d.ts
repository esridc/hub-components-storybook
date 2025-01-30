import { ComponentIntl } from "./stencil-intl";
export interface IAutoLinkOptions {
  ignoreTags?: string[];
  tagName?: string;
  replaceExisting?: boolean;
}
export declare function autoLink(text: string, options?: IAutoLinkOptions): string;
/**
 * TODO: Remove this and use hub-common's `capitalize()` instead
 *
 * @param text Text to capitalize
 * @returns Capitalized text (text -> Text)
 */
export declare function capitalize(text: string): string;
/**
 * Searches text for blocked words and wraps them to be highlighted
 * @param text Text content
 * @param words Array of restricted strings
 * @param componentClassName Class name of component
 * @returns String with highlighted text
 */
export declare function highlightWords(text: string, words: string[], idPrefix: string, className: string, intl: ComponentIntl, tooltipConfig: {
  labelKey: string;
  textKey: string;
}): string;
