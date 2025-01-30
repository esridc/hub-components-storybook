/// <reference types="arcgis-js-api" />
/**
 * Interface that defines map configuration settings
 */
export interface IGalleryMapSettings {
  extent?: 'default' | 'results' | 'continuous';
}
/**
 * Default map configuration settings
 */
export declare const DEFAULT_MAP_SETTINGS: IGalleryMapSettings;
/**
 * simple-fill-symbol properties used for representing search location
 * polygon graphics on the map
 */
export declare const SIMPLE_FILL_SYMBOL: __esri.SimpleFillSymbolProperties;
/**
 * simple-marker-symbol properties used for representing search location
 * point graphics on the map
 */
export declare const SIMPLE_MARKER_SYMBOL: __esri.SimpleMarkerSymbolProperties;
/**
 * simple-line-symbol properties used for representing search location
 * line graphics on the map
 */
export declare const SIMPLE_LINE_SYMBOL: __esri.SimpleLineSymbolProperties;
export declare const getSymbol: (geometry: Partial<__esri.Geometry>) => __esri.SymbolProperties;
/**
 * Highlight options for highlighting features on the map on
 * hover
 */
export declare const HOVER_HIGHLIGHT_OPTION: __esri.HighlightOptions;
/**
 * Highlight options for highlighting features on the map on
 * select
 */
export declare const SELECT_HIGHLIGHT_OPTION: __esri.HighlightOptions;
/**
 * Interface that defines the highlight type which is used
 * to determine the appropriate highlight style options
 */
export declare type IHighlightType = 'hover' | 'select';
/**
 * Returns the appropriate highlight options based on the highlight type
 * @param highlightType - IHighlightType => 'hover' | 'select'
 * @returns __esri.HighlightOptions
 */
export declare const getHighlightOptions: (highlightType: IHighlightType) => __esri.HighlightOptions;
/**
 * World extent, useful for setting a default extent or view
 * constraints
 */
export declare const WORLD_EXTENT: Partial<__esri.Extent>;
/**
 * Applies global extent restraints on the view, so users cannot
 * zoom or pan outside of the world extent
 */
export declare const constrainViewToWorldBounds: (view: __esri.MapView) => void;
/**
 * Sort function for sorting geometries by area in order of largest to smallest
 * @param geometryA __esri.Geometry
 * @param geometryB __esri.Geometry
 * @returns
 */
export declare const sortGeometriesByArea: (geometryA: Partial<__esri.Geometry>, geometryB: Partial<__esri.Geometry>, getPolygonArea?: (polygon: __esri.Polygon) => number) => number;
/**
 * Cleans up any active map state by closing popups
 * @param view: __esri.MapView A reference to an Esri map view object
 */
export declare const clearActiveMapState: (view: __esri.MapView) => void;
