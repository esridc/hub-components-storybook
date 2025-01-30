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
import linkifyHtml from "linkifyjs/lib/linkify-html";
export function autoLink(text, options = {}) {
  var _a;
  const { replaceExisting } = options, opts = __rest(options, ["replaceExisting"]);
  const tagName = (_a = options.tagName) !== null && _a !== void 0 ? _a : 'a';
  const linkifiedText = linkifyHtml(text, opts);
  return tagName !== 'a' && replaceExisting
    ? linkifiedText.replace(/<a /g, `<${tagName} `).replace(/<\/a>/g, `</${tagName}>`)
    : linkifiedText;
}
/**
 * TODO: Remove this and use hub-common's `capitalize()` instead
 *
 * @param text Text to capitalize
 * @returns Capitalized text (text -> Text)
 */
export function capitalize(text) {
  return text[0].toUpperCase() + text.slice(1);
}
/**
 * Searches text for blocked words and wraps them to be highlighted
 * @param text Text content
 * @param words Array of restricted strings
 * @param componentClassName Class name of component
 * @returns String with highlighted text
 */
export function highlightWords(text, words, idPrefix, className, intl, tooltipConfig) {
  let numHighlightedWords = 0;
  const transform = (text, word) => {
    const regexp = new RegExp(`\\b${word}\\b`, 'gmi');
    const matches = text.match(regexp);
    if (!matches) {
      return text;
    }
    else {
      numHighlightedWords = numHighlightedWords + 1;
      const [match] = matches;
      const startIdx = text.indexOf(match);
      const endIdx = startIdx + match.length;
      const before = startIdx > 0 ? text.substring(0, startIdx) : '';
      const toReplace = text.substring(startIdx, startIdx + match.length);
      const id = [idPrefix, numHighlightedWords].join('-');
      const tooltip = `<calcite-tooltip label="${intl.t(tooltipConfig.labelKey, { match })}" placement="bottom" overlay-positioning="fixed" reference-element="${id}">${intl.t(tooltipConfig.textKey)}</calcite-tooltip>`;
      const replaced = toReplace.replace(match, `<span role="mark" id="${id}" tabindex="0" class="${className}">${match}</span>${tooltip}`);
      return before + replaced + transform(text.substring(endIdx), word);
    }
  };
  return text
    ? words.reduce((acc, blockedWord) => transform(acc, blockedWord), text)
    : text;
}
