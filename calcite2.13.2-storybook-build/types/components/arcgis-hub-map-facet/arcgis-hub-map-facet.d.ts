/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../stencil-public-runtime';
import { IMapFacet } from '../../utils/types';
import { MapFacetChangePayload } from '../../utils/state-utils';
import { BBox } from '@esri/hub-common';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisHubMapFacet {
  element: HTMLArcgisHubMapFacetElement;
  facet: IMapFacet;
  resultsCount: number;
  view: __esri.MapView;
  shouldFilterByExtent: boolean;
  arcgisMapFacetChange: EventEmitter<MapFacetChangePayload>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  handleMapViewReady(event: CustomEvent<{
    view: __esri.MapView;
  }>): void;
  handleFacetChange(oldFacet: IMapFacet, newFacet: IMapFacet): void;
  initializeMap(): Promise<void>;
  private get _initialExtent();
  /**
   * Workaround for the idiosyncrasies of the JSAPI.
   *
   * If we want to Programmatically set the extent of the MapView using
   * a non-standard Spatial Reference (i.e, NOT WGS–84 or Web Mercator),
   * We need to manually load the Projection Engine.
   *
   * If the proper criteria are met and the engine has not yet been loaded,
   * this function will do so, otherwise it's a no-op.
   */
  maybeLoadProjectionEngine(): Promise<any>;
  handleExtentChange(): void;
  /**
   * Returns a bbox of the current map extent if the filter is toggled on,
   * otherwise null.
   */
  get bbox(): BBox;
  get shouldShowResultCount(): boolean;
  toggleFilterOnExtent(evt: CustomEvent<any>): void;
  render(): any;
}
