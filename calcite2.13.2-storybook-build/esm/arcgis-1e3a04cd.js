import esriConfig from '@arcgis/core/config.js';

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
function loadCss(href, before) {
  let link = getLink(href);
  if (!link) {
    // create & load the css link
    link = createStylesheetLink(href);
    insertLink(link, before);
  }
  return link;
}

// NOTE: esriConfig is very small, so it is the
// default CSS loading options
const CSS_OPTIONS = {
  // use the light theme from the configured asset path
  themeOrUrl: 'light',
  // insert the ArcGIS CSS above the first style or stylesheet in the document
  // so that we can override esri styles w/o having to increase specificity
  insertBefore: 'style, link[rel="stylesheet"]'
};
/**
 * Call this once _before_ calling loadArcGisCss() or rendering
 * any mapping components to override the default options
 * @param options
 */
const setArcGisCssOptions = (options) => {
  CSS_OPTIONS.themeOrUrl = options.themeOrUrl;
  CSS_OPTIONS.insertBefore = options.insertBefore === undefined
    ? CSS_OPTIONS.insertBefore
    : options.insertBefore;
};
/**
 * Get the URL for the ArcGIS CSS
 * based on the configured options
 * @returns
 */
const getArcGisCssUrl = () => {
  const { themeOrUrl } = CSS_OPTIONS;
  return ['light', 'dark'].includes(themeOrUrl)
    // build a URL that points to the theme's stylesheet
    // in the configured asset path for this version of the API
    ? `${esriConfig.assetsPath}/esri/themes/${themeOrUrl}/main.css`
    // otherwise assume it's a valid URL
    : themeOrUrl;
};
/**
 * Utility to inject the JSAPI stylesheet into the target element
 * @param element: HTMLElement
 */
const injectMapStyleSheet = (element) => {
  const link = document.createElement('link');
  link.href = getArcGisCssUrl();
  link.rel = 'stylesheet';
  element.shadowRoot.appendChild(link);
};
/**
 * Lazy-load the ArcGIS CSS using the configured options
 * By default this will load the light theme from the configured asset path,
 * but you can change that by first calling setArcGisCssOptions()
 */
const loadArcGisCss = () => {
  const { insertBefore } = CSS_OPTIONS;
  loadCss(getArcGisCssUrl(), insertBefore);
};
/**
 * find the first graphic in hitTest results
 * @param results
 * @returns
 */
const getFirstHitGraphic = (results) => {
  let result;
  results.some(r => {
    if (r.type === 'graphic') {
      result = r;
    }
    return !!result;
  });
  return result;
};

export { getFirstHitGraphic as g, injectMapStyleSheet as i, loadArcGisCss as l, setArcGisCssOptions as s };
