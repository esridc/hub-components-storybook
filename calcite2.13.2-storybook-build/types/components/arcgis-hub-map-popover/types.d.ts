/// <reference types="arcgis-js-api" />
/**
 * The position in the view at which to add the component
 * https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#add
 */
export declare type Quadrant = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
/**
 * Details supplied to popover that define what to render and where to render it
 */
export declare type PopoverEventDetails = {
  source?: string;
  geometry: __esri.Geometry;
  view: __esri.View;
  render: any;
};
