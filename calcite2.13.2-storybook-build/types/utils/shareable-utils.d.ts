/**
 * Get the element attributes as an object
 * @param element the element
 * @param attributeBlacklist an array of attribute names to exclude from the results
 * @returns an object representing the element attributes
 */
export declare function getCardState(element: HTMLElement, attributeBlacklist?: any[]): any;
/**
 * Creates link and script tags for embeds
 *
 * @param version the hub-components version to point to
 * @returns the link and script tags for embeds
 */
export declare function getLinkAndScriptTags(version: string): string;
/**
 * Creates a code snippet for embedding the passed in element
 * @param element the html element for which to create the snippet
 * @param state an object representing the state of the element
 * @returns a snippet for embedding the element
 */
export declare function getSnippetByVal(element: HTMLElement, state: any): string;
/**
 * Creates a code snippet for embedding the passed in element by reference
 * @param element the html element for which to create the snippet
 * @returns a snippet for embedding the element by reference
 */
export declare function getSnippetByRef(element: HTMLElement): string;
