/// <reference types="arcgis-js-api" />
import { IExtent } from '@esri/arcgis-rest-feature-layer';
import { EventEmitter } from '../../stencil-public-runtime';
import { IHubLocationOption } from '../../utils/types/IHubLocationOption';
import { Tool } from '../../components/arcgis-hub-map-widget-container/arcgis-hub-map-widget-draw/types';
import { IChangeEventDetail, IHubLocation } from '@esri/hub-common';
import { CalciteListItemCustomEvent } from '@esri/calcite-components';
import { ISymbolOptions } from '../../components/arcgis-hub-discussions-map-integrator/utils/utils';
import { PopoverEventDetails } from '../../components/arcgis-hub-map-popover/types';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisHubLocationPicker {
  _currentLocationName: string;
  el: HTMLElement;
  /**
   * Options array to populate the location picker
   */
  options: IHubLocationOption[];
  /**
   * The initial extent of the map
   */
  extent: IExtent;
  /**
   * Optional array of map draw tools
   */
  mapTools: Tool[];
  /**
   * Options to configure symbol styles to hosting app theme
   */
  theme: ISymbolOptions;
  /**
   * Should we reset the hub-map-widget-draw component's state
   * when the component is disconnected from the DOM
   */
  resetDrawingToolsOnDisconnect: boolean;
  /**
   * The max count of vertices/points that can be drawn on the map
   */
  maxVerticesCount: number;
  /**
   * The max count of features that can be drawn on the map
   */
  maxFeaturesCount: number;
  /**
   * Whether or not the location name is a required feature
   */
  locationNameRequired: boolean;
  /**
   * The aria level for the notice title element
   */
  noticeTitleElementAriaLevel: number;
  /**
   * Event emitted when the user selects an option, or when the map is drawn on.
   */
  arcgisHubLocationPickerUpdate: EventEmitter<IHubLocation>;
  /**
   * Event emitted and picked up by the arcgis-hub-map-popover component
   * It indicates that the edit/delete popover should be opened
   */
  arcgisHubMapPopoverOpen: EventEmitter<PopoverEventDetails>;
  /**
   * Event emitted and picked up by the arcgis-hub-map-popover component
   * It indicates that the edit/delete popover should be closed
   */
  arcgisHubMapPopoverClear: EventEmitter<null>;
  /**
   * Hub telemetry event emitted to track user interactions
   */
  hubTelemetry: EventEmitter<Record<string, any>>;
  /**
   * Selected option
   */
  private _selected;
  /**
   * Map view instance
   */
  private _view;
  /**
   * Specific graphic being edited
   */
  private _editingGraphic;
  /**
   * Are we currently editing a graphic
   */
  private _isEditing;
  private _currentDrawTools;
  private _currentActiveDrawTool;
  /**
   * A reference to the custom location draw action button
   */
  customLocationDrawActionRef: HTMLCalciteActionElement;
  /**
   * Graphics Layer used to display the drawn locations
   *
   */
  geometryGraphicsLayer: __esri.GraphicsLayer;
  /**
   * Callback handles that are created/destroyed when connected/disconnected
   * from DOM
   */
  handles: __esri.Handle[];
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  private _drawToolIcons;
  constructor();
  /**
   * The map tools element. We need to keep track of this element
   * So that we can change props on it depending on when/where we are in interacting with the map
   */
  private _mapDrawToolsEl;
  /**
   * Reference to calcite-popover component with location actions
   */
  private locationTypePopoverElement;
  /**
   * Currently selected option type.
   */
  private get _selectedType();
  /**
   * Should we show draw tools and allow the editing of features
   * (currently only allows for custom option editing, but can be expanded)
   */
  private get _shouldEditFeatures();
  /**
   * What is the currently selected option
   */
  private get _selectedOption();
  /**
   * Should we show the extent for a specific option
   */
  private get _showExtent();
  /**
   * Returns the extent of the currently selected option converted into a graphic.
   */
  private get _selectedExtentGraphic();
  /**
   * Returns the graphics for the arcgis-hub-map component.
   * Currently only in use for if the selected option should only show the extent graphic
   * 'custom' option has a graphics layer that is set on the mapEl.
   */
  private get _selectedGraphics();
  private get _schema();
  private get _uiSchema();
  /**
   * Attach the draw tools element
   */
  private _setMapDrawElement;
  /**
  * Returns default theme mixed with any custom theme options
  */
  get themeWithDefaults(): ISymbolOptions;
  componentWillLoad(): Promise<void>;
  /**
   * Connected callback lifecycle method, adds watch handle callbacks
   */
  connectedCallback(): void;
  /**
   * Disconnect callback lifecycle method, removes watch handle callbacks
   * for garbage collection
   */
  disconnectedCallback(): void;
  /**
   * Adds event listeners on view
   */
  addWatchHandles(): void;
  /**
   * Removes event listeners for garbage collection
   */
  removeWatchHandles(): void;
  handleViewChange(view: __esri.View, prevView: __esri.View): void;
  /**
   * Watch for changes to the options prop
   */
  onOptionsUpdate(): Promise<void>;
  handleMapViewReady(e: CustomEvent<{
    view: __esri.MapView;
  }>): Promise<void>;
  /**
   * Listen for when the calcite-list-item is selected
   */
  handleListItemSelect(e: CalciteListItemCustomEvent<void>): Promise<void>;
  /**
   * LIsten for when the map draw tools emit a graphics change event
   */
  handleGraphicsChange(e: CustomEvent<any>): void;
  handleDrawToolSelection(e: CustomEvent): void;
  /**
   * Catches the arcgisHubGeometryResultSelection event and creates a graphic dependent
   * on geometry. Then updates draw tools with userSelection and adds graphic to graphic layer.
   *
   * @param e - CustomEvent<__esri.Geometry, Tool>
   */
  handleGeometrySelection(e: CustomEvent<{
    geometry: __esri.Geometry;
    userSelection: Tool;
    locationName?: string;
  }>): void;
  /**
   * Callback for view 'pointer-move' and 'pointer-down' events
   * and checking for overlap of graphicsLayer && managing popover render
   */
  handleViewPointerMoveOrDown(e: __esri.ViewPointerMoveEvent | __esri.ViewPointerDownEvent): void;
  /**
   * Callback for view 'pointer-leave' event
   * and checking to see if we should clear popover.
   */
  handleViewPointerLeave(e: __esri.ViewPointerLeaveEvent): void;
  handleLocationEditorChange: (evt: CustomEvent<IChangeEventDetail>) => void;
  /**
   * Handles the adding of graphics to the graphics layers specifically after you've just added the graphic to the map or
   * you've just confirmed an edit of the graphic along with a reset and update of draw tools, and selected location.
   * This method performs several tasks to ensure the drawing tools and graphics on the map are reset and updated properly
   *
   * @param graphic - The graphic to be processed and added to the graphics layer.
   */
  private _addGraphic;
  private _updateSelectedLocation;
  private get _getCurrentFeaturesCount();
  private _updateSelectedLocationExtentToGeometry;
  /**
   * Initialize the graphics layer, and if there are any geometries existing in the selected option
   * add them to the graphics layer
   */
  private _initializeGraphicsLayer;
  /**
   * Add graphics layer that will hold the drawn geometries
   */
  private addGeometryGraphicsLayer;
  /**
   * Adds graphics to a specified graphics layer
   */
  _addGraphicsToGraphicsLayer(layer: __esri.GraphicsLayer, graphics: __esri.Graphic[]): void;
  /**
   * Remove layers from the map
   */
  _destroyLayers(): void;
  /**
   *  Gets extent for all graphics in the graphics layer.
   */
  private get _getExtentForAllGraphics();
  /**
   * Creates an extent from a point, used for determining zoom level
   * @param geometry Esri JSAPI Point Geometry
   * @param tolerance Number in Degrees to expand point extent
   * @returns
   */
  pointToExtent(geometry: __esri.Point, tolerance?: number): __esri.Extent;
  _resetToolsAndEditState(resetDrawTools?: boolean): void;
  /**
   * Edit a selected feature, we roll this ourselves as we are working with a graphics layer
   */
  editFeature(): any;
  /**
   * Remove a selected feature, we roll this ourselves as we are working with a graphics layer
   */
  removeFeature(): any;
  _emitLocationWithFallback(): void;
  /**
   * Clear out all existing features, emit it out, and start over
   */
  clearEditState(): Promise<void>;
  /**
   * Render the edit popover
   * Needs to be done at this level as we are working with a graphics layer
   */
  renderEditOptions(): any;
  /**
   * Render the popovers. Both this and the above render method are needed when working with
   * a arcgis-hub-map-popover
   */
  renderPopovers(): any;
  renderNotice(): any;
  private setActiveLocationDrawType;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  private translationFunc;
  get locationActionTypes(): {
    type: string;
    icon: string;
  }[];
  /**
   * Render the custom end of line action which displays the draw tools as well.
   */
  renderCustomAction(option: IHubLocationOption): HTMLElement;
  render(): any;
}
