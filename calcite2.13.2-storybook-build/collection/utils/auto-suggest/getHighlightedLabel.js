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
export function getHighlightedLabel(label, term) {
  let result = label;
  if (term) {
    const lowerCaseLabel = label.toLowerCase();
    const lowerCaseTerm = term.toLowerCase();
    // Get the indices of all the term matches within the label
    const termIndices = [];
    let index = lowerCaseLabel.indexOf(lowerCaseTerm);
    while (index !== -1) {
      termIndices.push(index);
      index = lowerCaseLabel.indexOf(lowerCaseTerm, index + 1);
    }
    // Separate the label into term and non-term segments
    const segments = [];
    let startIndex = 0;
    let termIndicesIndex = 0;
    while (startIndex < label.length) {
      // There are still term matches left in the label
      if (termIndicesIndex < termIndices.length) {
        const termIndex = termIndices[termIndicesIndex];
        // Create term segment
        if (startIndex === termIndex) {
          const value = label.slice(startIndex, startIndex + term.length);
          segments.push({ type: 'term', value });
          startIndex += term.length;
          termIndicesIndex++;
        }
        // Create non-term segment
        else {
          const value = label.slice(startIndex, termIndex);
          segments.push({ type: 'non-term', value });
          startIndex = termIndex;
        }
      }
      // No term matches are left, create non-term segment out of remaining characters
      else {
        const value = label.slice(startIndex);
        segments.push({ type: 'non-term', value });
        startIndex = label.length;
      }
    }
    // Bold non-term segments
    result = segments
      .map(({ type, value }) => type === 'non-term' ? `<b>${value}</b>` : value)
      .join('');
  }
  return result;
}
