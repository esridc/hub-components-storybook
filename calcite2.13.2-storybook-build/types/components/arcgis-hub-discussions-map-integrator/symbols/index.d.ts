import callout from './callout';
import point from './point';
import polyline from './polyline';
import polygon from './polygon';
import { ISymbolOptions } from '../utils/utils';
/**
 * Default theme options
 */
export declare const defaultLayerThemeOptions: ISymbolOptions;
declare const _default: {
  callout: typeof callout;
  extent: typeof polygon;
  point: typeof point;
  polyline: typeof polyline;
  polygon: typeof polygon;
};
export default _default;
