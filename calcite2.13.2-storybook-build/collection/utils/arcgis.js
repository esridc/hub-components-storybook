// NOTE: esriConfig is very small, so it is the
// **only** @arcgis/core module we allow static imports for
import esriConfig from '@arcgis/core/config';
import { loadCss } from './css';
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
export const setArcGisCssOptions = (options) => {
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
export const injectMapStyleSheet = (element) => {
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
export const loadArcGisCss = () => {
  const { insertBefore } = CSS_OPTIONS;
  loadCss(getArcGisCssUrl(), insertBefore);
};
/**
 * find the first graphic in hitTest results
 * @param results
 * @returns
 */
export const getFirstHitGraphic = (results) => {
  let result;
  results.some(r => {
    if (r.type === 'graphic') {
      result = r;
    }
    return !!result;
  });
  return result;
};
