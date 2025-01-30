/** ArcGIS CSS theme, see: https://developers.arcgis.com/javascript/latest/styling/#themes */
export declare type ArcGISCssTheme = 'light' | 'dark';
export interface IArcGISCssOptions {
  /** either a an ArcGIS CSS theme or a URL to a stylesheet */
  themeOrUrl: ArcGISCssTheme | string;
  /** a CSS selector for the element that you want to insert the stylesheet link before */
  insertBefore?: string;
}
/**
 * Call this once _before_ calling loadArcGisCss() or rendering
 * any mapping components to override the default options
 * @param options
 */
export declare const setArcGisCssOptions: (options: IArcGISCssOptions) => void;
/**
 * Utility to inject the JSAPI stylesheet into the target element
 * @param element: HTMLElement
 */
export declare const injectMapStyleSheet: (element: HTMLElement) => void;
/**
 * Lazy-load the ArcGIS CSS using the configured options
 * By default this will load the light theme from the configured asset path,
 * but you can change that by first calling setArcGisCssOptions()
 */
export declare const loadArcGisCss: () => void;
/**
 * find the first graphic in hitTest results
 * @param results
 * @returns
 */
export declare const getFirstHitGraphic: (results: __esri.ViewHit[]) => __esri.GraphicHit;
