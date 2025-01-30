const HUB_COMPONENTS_URL = "https://hubcdn.arcgis.com/@esri/hub-components";
/**
 * Get the element attributes as an object
 * @param element the element
 * @param attributeBlacklist an array of attribute names to exclude from the results
 * @returns an object representing the element attributes
 */
export function getCardState(element, attributeBlacklist = []) {
  const blacklist = ['class', 'data-hmr', 'hydrated', 'shareable-on-hover', 'style', ...attributeBlacklist];
  return element.getAttributeNames().reduce((acc, name) => {
    if (!blacklist.includes(name)) {
      return Object.assign(Object.assign({}, acc), { [name]: element.getAttribute(name) });
    }
    return acc;
  }, {});
}
/**
 * Creates link and script tags for embeds
 *
 * @param version the hub-components version to point to
 * @returns the link and script tags for embeds
 */
export function getLinkAndScriptTags(version) {
  return `<link rel="stylesheet" href="${HUB_COMPONENTS_URL}/${version}/dist/calcite/calcite.css">\n<script type="module" async src="${HUB_COMPONENTS_URL}/${version}/dist/hub-components/hub-components.esm.js"></script>`;
}
/**
 * Convert a string to kebab-case
 * @param prop a camelCase or kebab-case string
 * @returns a kebab-case string
 */
function propNameToAttribute(prop) {
  return prop.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}
/**
 * Convert an object to a string of attributes like `foo="foo" bar="bar" ...`
 * @param obj the object to convert
 * @returns a string of attributes
 */
function objectToAttrs(obj) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const attr = propNameToAttribute(key);
    return [...acc, `${attr}="${val}"`];
  }, []).join(' ');
}
/**
 * Creates a code snippet for embedding the passed in element
 * @param element the html element for which to create the snippet
 * @param state an object representing the state of the element
 * @returns a snippet for embedding the element
 */
export function getSnippetByVal(element, state) {
  const tagName = element.tagName.toLowerCase();
  const innerHTML = element.innerHTML;
  const attrs = objectToAttrs(state);
  return `<${tagName} ${attrs}>${innerHTML}</${tagName}>`;
}
/**
 * Creates a code snippet for embedding the passed in element by reference
 * @param element the html element for which to create the snippet
 * @returns a snippet for embedding the element by reference
 */
export function getSnippetByRef(element) {
  const tagName = element.tagName.toLowerCase();
  const innerHTML = element.innerHTML;
  return `<${tagName} config-url="...">${innerHTML}</${tagName}>`;
}
