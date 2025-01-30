// NOTE: the functions in this file were copied from
// https://github.com/Esri/esri-loader/blob/d94019205d251170ccf0f148de95c464cd408e4f/src/utils/css.ts
function createStylesheetLink(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  return link;
}
function insertLink(link, before) {
  if (before) {
    // the link should be inserted before a specific node
    const beforeNode = document.querySelector(before);
    beforeNode.parentNode.insertBefore(link, beforeNode);
  }
  else {
    // append the link to then end of the head tag
    document.head.appendChild(link);
  }
}
// check if the css url has been injected or added manually
function getLink(href) {
  return document.querySelector(`link[href*="${href}"]`);
}
/**
 * lazy load a stylesheet, optionally before a specific DOM node
 * otherwise it will be inserted at the end of the head tag
 * @param href URL to the stylesheet
 * @param before CSS selector for the element to insert the link before
 * @returns
 */
export function loadCss(href, before) {
  let link = getLink(href);
  if (!link) {
    // create & load the css link
    link = createStylesheetLink(href);
    insertLink(link, before);
  }
  return link;
}
