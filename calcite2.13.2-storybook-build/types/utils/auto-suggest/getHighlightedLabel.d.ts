/**
 * This function adds highlighting to a label string based on a term.
 * All segments of the label that DO NOT contain the term will be bolded.
 *
 * NOTE: term matching is case-insensitive.
 *
 * e.g. getHighlightedLabel('Hello World', 'hello') => 'Hello<b> World</b>'
 *
 * @param label label to be highlighted
 * @param term term to match against
 * @returns a rich text label string
 */
export declare function getHighlightedLabel(label: string, term: string): string;
