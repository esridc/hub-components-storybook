/// <reference types="arcgis-js-api" />
import { IHubSearchResult, CardModelTarget, ICardActionLink, IHubMapSettings, EntityType } from '@esri/hub-common';
import { EventEmitter, VNode } from '../../../../stencil-public-runtime';
import { IGalleryResultsLayout } from '../../utils/types';
import { IGalleryMapSettings, IHighlightType } from '../../utils/location';
import { CORNERS, DROP_SHADOWS, IMAGE_TYPES, SelectionMode } from '../../../interfaces';
import { Appearance } from '@esri/calcite-components/dist/types/components/interfaces';
import { IMapFacet } from '../../../../utils/types';
import { ComponentIntl } from "../../../../utils/stencil-intl";
import { CardViewModelCallback } from '../../../../utils/cardModelConverters/types';
import { ITelemetryInfo } from '../../../../utils';
/**
 * arcgis-hub-gallery-layout-map
 * A component for rendering an array of IHubSearchResults in a map layout
 * Can be used standalone or via the gallery with layout="map"
 */
export declare class ArcgisHubGalleryLayoutMap implements IGalleryResultsLayout {
  element: HTMLElement;
  /**
   * Popup element reference for rendering cards on the map
   */
  _popupEl: HTMLElement;
  /**
   * Element used as container for map popup content
   */
  get popupEl(): HTMLElement;
  constructor();
  searchResults: IHubSearchResult[];
  loading: boolean;
  selectedIds: string[];
  baseUrl: any;
  linkTarget: CardModelTarget;
  limit: number;
  showThumbnail: boolean;
  imageType: IMAGE_TYPES;
  lazy: boolean;
  newTab: boolean;
  selectionMode: SelectionMode;
  cardTitleTag: string;
  corners: CORNERS;
  showAdditionalInfo: boolean;
  showEmptyState: boolean;
  shadow: DROP_SHADOWS;
  showLinkButton: boolean;
  linkButtonText: string;
  linkButtonStyle: Appearance;
  showBadges: boolean;
  showType: boolean;
  showOwner: boolean;
  cardActionLinks: ICardActionLink[];
  lastSearchResultsCount: number;
  callback: CardViewModelCallback;
  hasError: boolean;
  expand: number;
  shouldShowResults: boolean;
  shouldShowFilterByExtent: boolean;
  shouldFilterByExtent: boolean;
  /**
   * Map configuration settings specific to the gallery experience
   * - extent
   *   - 'default' - Uses site extent, or org extent if not available.  If neither are available, uses extent of initial results.
   *   - 'results' - Uses extent of initial results.  Changes to query do not update extent.
   *   - 'continuous' - Uses extent of initial results.  Changes to query update extent.
   * TODO - We will likely want to fold this into the mapSettings prop, so this component
   * would only have one mapSettings prop to manage.
   * @type {IGalleryMapSettings}
   *
   */
  galleryMapSettings: IGalleryMapSettings;
  /**
   * IHubMapSettings object that defines the map's initial state.  Currently this is used to set
   * the underlying web map or web scene by itemId.  In the future this will hold additional settings
   * that are passed into the map component.
   * Example: { itemId: '1234567890' }
   */
  mapSettings: IHubMapSettings;
  initialExtent: __esri.Extent;
  disableMouseWheelZoom: boolean;
  disableTelemetry: boolean;
  entityType: EntityType;
  /**
   * Reference to map home widget, used for accessing model and overriding
   * viewpoint for zoom extents
   */
  mapHomeRef: HTMLArcgisHubMapWidgetHomeElement;
  hoverGraphicsLayer: __esri.GraphicsLayer;
  highlightGraphicsLayer: __esri.GraphicsLayer;
  /**
   * Handles for highlight results on the map.  These are stored so they
   * can be tracked and cleared.
   * */
  highlightHandles: Record<IHighlightType, __esri.Collection<__esri.Handle>>;
  /**
   * Tracks whether initial map extent has been set
   */
  initialExtentSet: boolean;
  popupContent: VNode;
  /**
   * Reference to the Esri map view when available
   */
  mapView: __esri.MapView;
  selectedMapFeatureIds: string[];
  arcgisHubGalleryFacetChange: EventEmitter<IMapFacet>;
  /**
   * Event that fires for recording telemetry
   */
  hubTelemetry: EventEmitter<any>;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  /**
   * Toggle if results are filtered by map extent
   */
  toggleShouldFilterByExtent(): void;
  /**
   * Array of graphics created from search result geometries
   */
  get searchResultGraphics(): __esri.GraphicProperties[];
  injectMapStyleSheet(): void;
  /**
   * Highlight a collection of features on the map,
   * styled by the highlightType
   * @param view Esri JSAPI MapView
   * @param graphics Esri JSAPI Collection of Graphics to highlight
   * @param layer GraphicsLayer to add the highlighted graphics to
   * @param highlightType Type of highlight to apply
   */
  highlightGraphics(view: __esri.MapView, graphics: __esri.Collection<__esri.Graphic>, layer: __esri.GraphicsLayer, highlightType: IHighlightType): void;
  /**
   * Clear any existing highlighted graphics
   * */
  clearHighlights(layer: __esri.GraphicsLayer, highlightType: string): void;
  expandExtent(extent: __esri.Extent): __esri.Extent;
  goToGraphicsExtent(): void;
  /**
   * Clears popups, highlights, and selected  map features
   */
  clearMap(): void;
  setExtent(): void;
  handleMapViewReady(evt: CustomEvent<{
    view: __esri.MapView;
  }>): Promise<void>;
  /**
   * Handles enabling / disabling of filter by extent and when 'shouldFilterByExtent':
   * true => updates the map facet extent value based on the current map extent
   * false => resets the map facet extent value
   */
  handleShouldFilterByExtentChanged(): void;
  /**
   * 1. When mouse hovers over an entity card, highlight the corresponding graphic on the map
   * 2. When mouse selects an entity card, select the corresponding graphic on the map
   * @param event - mouse event
   */
  handleMouseEventEntityCard(event: MouseEvent): void;
  /**
   * Handles the telemetry event on arcgis-hub-map and adds any extra decoration
   * @param e
   */
  handleMapTelemetry(e: CustomEvent<ITelemetryInfo>): void;
  _renderLoading(): VNode;
  _renderMap(): VNode;
  _renderMapWidgets(): VNode;
  _renderList(): VNode;
  _renderPopupContent(result: IHubSearchResult): VNode;
  render(): any;
}
