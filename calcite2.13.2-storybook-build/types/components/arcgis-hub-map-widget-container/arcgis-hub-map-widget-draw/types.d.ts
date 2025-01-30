/// <reference types="arcgis-js-api" />
/**
 * Drawing create operation mode
 * https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html#defaultCreateOptions
 */
export declare type Mode = 'hybrid' | 'freehand' | 'click';
/**
 * SketchViewModel states
 * https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html#event-create
 */
export declare enum DrawState {
  START = "start",
  ACTIVE = "active",
  COMPLETE = "complete",
  CANCEL = "cancel"
}
/**
 * Map Tip states
 * 'start' -> before first location added
 * 'active' -> first location added, adding more points
 * 'inactive' -> not drawing / editing
 */
export declare enum TipState {
  START = "start",
  ACTIVE = "active",
  INACTIVE = "inactive"
}
/**
 * Drawing tool options available
 */
export declare type Tool = 'select' | 'point' | 'polyline' | 'polygon' | 'circle' | 'rectangle';
/**
 * Calcite icon name by drawing tool
 */
export declare type ToolIcons = {
  [key in Tool]: {
    icon: string;
  };
};
/**
 * Available symbol line styles
 */
export declare type LineStyle = 'short-dash' | 'solid';
/**
 * Sketch change event details
 */
export declare type GraphicChangeDetails = {
  graphics: __esri.Collection<__esri.Graphic>;
  bufferGraphics?: __esri.Collection<__esri.Graphic>;
  save?: boolean;
  canceled?: boolean;
  unsaved?: boolean;
};
