// TODO: move files in thiis directory out from
// under this component and into the utils
import callout from './callout';
import point from './point';
import polyline from './polyline';
import polygon from './polygon';
// Geometry Defaults
const DEFAULT_GEOM_COLOR = [115, 96, 167];
const DEFAULT_GEOM_STROKE_WIDTH = 2;
// SYMBOL_STATE defaults (default, active, hover)
const DEFAULT_ACTIVE_COLOR = [39, 129, 153];
const DEFAULT_HOVER_COLOR = [169, 169, 169];
// Callout Defaults
const DEFAULT_CALLOUT_BACKGROUND_COLOR = [255, 255, 255];
const DEFAULT_CALLOUT_TEXT_COLOR = [0, 0, 0];
const DEFAULT_CALLOUT_STROKE_WIDTH = 2;
const pointTheme = {
  activeColor: DEFAULT_ACTIVE_COLOR,
  color: DEFAULT_GEOM_COLOR,
  hoverColor: DEFAULT_HOVER_COLOR
};
const polylineTheme = Object.assign(Object.assign({}, pointTheme), { width: DEFAULT_GEOM_STROKE_WIDTH });
/**
 * Default theme options
 */
export const defaultLayerThemeOptions = {
  point: pointTheme,
  polyline: polylineTheme,
  polygon: polylineTheme,
  callout: {
    backgroundColor: DEFAULT_CALLOUT_BACKGROUND_COLOR,
    textColor: DEFAULT_CALLOUT_TEXT_COLOR,
    hoverColor: DEFAULT_HOVER_COLOR,
    activeColor: DEFAULT_ACTIVE_COLOR,
    width: DEFAULT_CALLOUT_STROKE_WIDTH,
    isOffset: false
  },
  extent: polylineTheme
};
export default {
  callout,
  extent: polygon,
  point,
  polyline,
  polygon
};
