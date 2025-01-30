/**
 * lazy load a stylesheet, optionally before a specific DOM node
 * otherwise it will be inserted at the end of the head tag
 * @param href URL to the stylesheet
 * @param before CSS selector for the element to insert the link before
 * @returns
 */
export declare function loadCss(href: string, before?: string): HTMLLinkElement;
