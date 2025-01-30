import { IExtent } from '@esri/arcgis-rest-feature-layer';
import { IBasemapOptions } from '../arcgis-hub-map/arcgis-hub-map';
import { ComponentIntl } from "../../utils/stencil-intl";
import { IHubMapSettings } from '@esri/hub-common';
export declare class ArcgisHubContentHero {
  element: HTMLElement;
  /**
   * hero header title
   */
  heroTitle: string;
  /**
   * url of thumbnail to render in hero media
   */
  thumbnailUrl: string;
  /**
   * well known basemap ID
   */
  basemap: IBasemapOptions;
  /**
   * geometry Object for setting map extent
   */
  extent: IExtent;
  /**
   * array of graphics that will be added to the view's graphics layer
   */
  graphics: any[];
  /**
   * Should we show, or hide the map in the hero?
   */
  showMap: boolean;
  /**
   * IHubMapSettings object that defines the map's initial state.  Currently this is used to set
   * the underlying web map or web scene by itemId.  In the future this will hold additional settings
   * that are passed into the map component.
   * Example: { baseViewItemId: '1234567890' }
   */
  mapSettings: IHubMapSettings;
  /**
   * apply a "vertical" class to the hero if we are on a small screen (i.e. mobile)
   */
  orientationClass: string;
  intl: ComponentIntl;
  /**
   * if a thumbnailUrl is provided, we append a w=800
   * query parameter to render the highest quality
   * thumbnail possible
   */
  get _thumbnailUrl(): string;
  get mediaClass(): string;
  /**
   * concatenated classes to apply to the host element
   */
  get hostClass(): string;
  constructor();
  componentWillLoad(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * handle screen reflow - for mobile, we should switch the orientation
   * of the hero so that the thumbnail/extent is above the hero content
   */
  handleResize(): Promise<void>;
  renderMedia(): HTMLImageElement | HTMLArcgisHubMapElement | null;
  renderThumbnail(thumbnailUrl?: string): HTMLImageElement;
  renderMap(): HTMLArcgisHubMapElement;
  renderHeader(): HTMLElement;
  renderMain(): HTMLElement;
  renderFooter(): HTMLElement;
  render(): any;
}
