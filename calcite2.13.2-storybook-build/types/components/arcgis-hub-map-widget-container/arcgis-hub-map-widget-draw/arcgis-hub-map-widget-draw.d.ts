/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../../stencil-public-runtime';
import { HTMLCalciteActionElement } from '@esri/calcite-components/dist';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { PopoverEventDetails } from '../../arcgis-hub-map-popover/types';
import { Mode, TipState, Tool, GraphicChangeDetails } from './types';
import { BufferDetails } from './arcgis-hub-map-widget-draw-buffer/types';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
export declare class ArcgisHubMapWidgetDraw {
  /**
   * Reference to host element
   */
  el: HTMLArcgisHubMapWidgetDrawElement;
  /**
   * Optional array of restricted draw boundaries, which limit where
   * geometries can be drawn and applies layer mask on map.
   */
  boundaries: Partial<__esri.Polygon>[];
  /**
   * Optional Geometry to load into sketch graphics layer.  If geometry is provided,
   * component's initial state is in edit mode.
   * Only supports: point, polyline, polygon, extent
   */
  geometry: Partial<__esri.Geometry>;
  /**
   * Draw create operation mode
   */
  mode: Mode;
  scale: Scale;
  /**
   * An optional list of available tools
   */
  tools: Tool[];
  /**
   * A reference to the active map View
   */
  view: __esri.View;
  /**
   * If primary options should be disabled so only editing options are available
   */
  disablePrimaryOptions: boolean;
  /**
   * If edit and delete options should be available
   */
  disableEditOptions: boolean;
  /**
   * RGB color array for drawn geometry sybols theming
   */
  color: [number, number, number];
  /**
   * Draw tool bufer panel enable/disable
   */
  buffer: boolean;
  /**
   * Whether or not widget should display as a single icon with popup menu
   */
  condensed: boolean;
  /**
   * Should we reset the components state when the component is disconnected from the DOM
   */
  resetOnDisconnect: boolean;
  /**
   * (optional) If map tooltip is shown during draw and edit, defaults to false
   */
  enableMapTips?: boolean;
  /**
   * (optional) Help tip text shows as popover on drawing tools
   */
  drawTip?: string;
  /**
   * Sometimes we may want to have a popover without site themeing applied.
   * As we usually use the popover via a wormhole we need to do this.
   */
  unthemed?: boolean;
  /**
   * Sometimes, if the parent is 'editing' a graphic we may want to disable the draw tools
   */
  disabled?: boolean;
  /**
   * The current active tool
   */
  activeTool: Tool;
  /**
   * If actively editing a geometry
   */
  isEditing: boolean;
  /**
   * If a filter is applied and primary options should not be displayed
   */
  isFiltered: boolean;
  /**
   * If attempting to draw in an areas outside of the defined boundaries
   */
  geometryIsInvalid: boolean;
  /**
   * Details of buffer events { distance, unit }
   */
  bufferDetails: BufferDetails;
  /**
   * Control buffer panel visibility
   */
  bufferPanelVisible: boolean;
  /**
   * Widget bottom offset
   */
  bottomOffset: number;
  /**
   * Widget top offset
   */
  topOffset: number;
  /**
   * Width of map view
   */
  viewWidth: number;
  /**
   * Tracks if popover is open
   */
  open: boolean;
  /**
   * Reference to options element for consensed drawing tools
   */
  optionsEl: HTMLCalciteActionElement;
  /**
   * Used for tracking map tooltip state
   * helper text and visibility
   */
  mapTipState: TipState;
  /**
   * Emitted when drawn graphic is created or edited, specifies if event was triggered
   * via a explicit save (initial filter or saved changes) or not (active editing)
   */
  arcgisHubMapDrawGraphicsChange: EventEmitter<GraphicChangeDetails>;
  /**
   * Emitted when drawn graphic is removed
   */
  arcgisHubMapDrawGraphicsClear: EventEmitter<null>;
  /**
   * Emitted when 'select' widget is active and user clicks on map
   */
  arcgisHubMapDrawSelect: EventEmitter<__esri.ViewPointerDownEvent>;
  /**
   * Emitted when 'escape' key is pressed to reset any connected drawing
   * processes
   */
  arcgisHubDrawCancel: EventEmitter<void>;
  /**
   * Emitted when active tool changes
   */
  arcgisHubDrawActiveToolChange: EventEmitter<Tool>;
  /**
   * Emitted to request the popover component to open
   * Requires <arcgis-hub-map-popover /> to be present in DOM
   */
  arcgisHubMapPopoverOpen: EventEmitter<PopoverEventDetails>;
  /**
   * Emitted to request the popover component to close
   * Requires <arcgis-hub-map-popover /> to be present in DOM
   */
  arcgisHubMapPopoverClear: EventEmitter<null>;
  /**
   * Emits telemetry information
   */
  hubTelemetry: EventEmitter;
  /**
   * Graphics layer for restricted draw boundary
   */
  boundariesLayer: __esri.GraphicsLayer;
  /**
   * Graphics layer for global masking effect
   */
  boundariesMaskLayer: __esri.GraphicsLayer;
  /**
   * Group layer that contains boundary and
   * mask layer
   */
  boundariesGroupLayer: __esri.GroupLayer;
  /**
   * Layer to show boundary outline
   */
  boundariesOutlineLayer: __esri.GraphicsLayer;
  /**
   * Reference to arcgis-hub-map-widget-draw-buffer element
   */
  bufferWidgetEl: HTMLArcgisHubMapWidgetDrawBufferElement;
  /**
   * Graphics layer for buffer
   */
  bufferGraphicsLayer: __esri.GraphicsLayer;
  /**
   * Graphics that are cached for reverting to if edits are canceled
   */
  cachedGraphics: __esri.Collection<__esri.Graphic>;
  /**
   * Buffer graphics that are cached for when edits are canceled
   */
  cachedBufferGraphics: __esri.Collection<__esri.Graphic>;
  /**
   * Graphics layer for sketch
   */
  graphicsLayer: __esri.GraphicsLayer;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Callback handles that are created/destroyed when connected/disconnected
   * from DOM
   */
  handles: __esri.Handle[];
  /**
   * An instance of the SketchViewModel
   */
  sketchViewModel: __esri.SketchViewModel;
  /**
   * Widget position in map view
   */
  viewPosition: string;
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor();
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
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
   * Handles the event that's emitted when graphics are created or edited
   */
  handleMapDrawFilter(event: CustomEvent<GraphicChangeDetails>): void;
  /**
   * Handles the event that's emitted when a draw tool is
   * selected.  Sets active tool, removes previous graphics from map,
   * removes popover, and empties any previous cached graphics.
   * @param event A Custom event with an icon payload
   */
  handleWidgetSelected(event: CustomEvent): void;
  /**
   * Listens for buffer distance/unit changes
   */
  handleWidgetDrawBufferChanged(event: CustomEvent<BufferDetails>): void;
  /**
   * Listens for buffer reset
   */
  handleWidgetDrawBufferReset(): void;
  /**
   * Listens for buffer panel to be closed
   */
  handleWidgetDrawBufferClosed(): void;
  /**
   * Listen for other panels to be opened and close buffer panel
   */
  handleWidgetPanelToggled(event: CustomEvent): void;
  /**
   * Focuses on the view after a short delay
   */
  focusView(): void;
  /**
   * Listens for activeTool state changes and calls
   * create() method on sketchViewModel for given geometry type
   */
  handleActiveToolChange(curTool: Tool, prevTool: Tool): void;
  handleBoundariesChange(currBoundaries: Partial<__esri.Polygon>[], prevBoundaries: Partial<__esri.Polygon>[]): void;
  handleGraphicsChange(): void;
  /**
   * Listens for isEditing state changes and sets activeTool to null when
   * editing is completed
   */
  handleIsEditingChange(): void;
  /**
   * Listens for isFiltered state changes and sets custom symbol on graphic
   */
  handleIsFilteredChange(): void;
  /**
   * Listens for view prop changes and initializes sketchViewModel
   * and creates watch handles
   * @param view The current map View
   * @param prevView The previous map View
   */
  handleViewChange(view: __esri.View, prevView: __esri.View): void;
  /**
   * Listens for bufferDetails state changes and updates graphics
   */
  handleBufferDetailsChanged(): void;
  /**
   * Public Method to call internal reset()
   */
  forceReset(): Promise<void>;
  /**
  * Set the current drawing tool displayed to the user.
  * 'select' | 'point' | 'polyline' | 'polygon' | 'circle' | 'rectangle'
  * @param tool - 'select' | 'point' | 'polyline' | 'polygon' | 'circle' | 'rectangle';
   */
  setActiveTool(tool: Tool): Promise<void>;
  /**
   * Sets arcgis-hub-map-widget-draw-buffer ref to this.bufferWidgetEl
   */
  handleSetBufferWidgetRef(bufferWidgetEl: HTMLArcgisHubMapWidgetDrawBufferElement): void;
  /**
   * Constructs new graphics layer and makes call to populate with any
   * existing prop geometry
   */
  createGraphicsLayers(): void;
  /**
   * Callback for sketch 'create' event for managing popover
   * @param event SketchViewModelCreateEvent
   */
  handleSketchOnCreate(event: __esri.SketchViewModelCreateEvent): void;
  /**
   * Callback for sketch 'update' event for managing popover
   * and emits event to notify of graphic changes
   * @param event SketchViewModelUpdateEve
   */
  handleSketchOnUpdate(event: __esri.SketchViewModelUpdateEvent): void;
  /**
   * Callback for view 'click' event for closing popover
   */
  handleViewClick(event: __esri.ViewPointerDownEvent): void;
  /**
   * Callback for view 'pointer-move' event for displaying tooptip helper text
   * @param event ViewPointerMoveEvent
   * @returns
   */
  handleViewPointerMove(event: __esri.ViewPointerMoveEvent): void;
  /**
   * Callback for view 'pointer-move' and 'pointer-down' event and checking for overlap of
   * graphicsLayer and managing popover renders
   * @param event ViewPointerMoveEvent or ViewPointerDownEvent
   */
  handleViewPointerMoveOrDown(event: __esri.ViewPointerMoveEvent | __esri.ViewPointerDownEvent): void;
  /**
   * Callback for view extent 'change' to clear popover
   */
  handleViewExtentChange(): void;
  /**
   * Handles popover open event
   */
  handleToolsOpened(): void;
  /**
   * Handles popover closed event
   */
  handleToolsClosed(): void;
  /**
   * Creates instance of SketchViewModel and adds graphics layer to map
   */
  connectViewModel(): Promise<void>;
  /**
   * Resets activeTool to undefined when a user preses escape key while the `select` control is active
   */
  handleViewEscape(_event: any): void;
  /**
   * Adds event listeners on view and sketchViewModel
   */
  addWatchHandles(): void;
  /**
   * Removes event listeners for garbage collection
   */
  removeWatchHandles(): void;
  /**
   * Clears any previous boundaries and populates boundaries graphics layer
   * with any defined boundaries.
   */
  addGeometryToBoundariesLayer(): void;
  /**
   * Add an existing geometry (point, polyline, polygon, extent) to the graphics layer
   * that is utilized by sketchViewModel.
   * Geometry of type extent is converted to polygon and utilizes transform tools only
   * in place of reshape.
   */
  addGeometryToGraphicsLayer(): void;
  /**
   * Notifies of intent to filter data and closes popover
   */
  applyFilter(): any;
  /**
   * Removes sketch graphics, closes popover, and cleares active tool.
   */
  deleteDrawing(): any;
  /**
   * Removes sketch graphics and notifies of intent to clear existing filter
   */
  clearFilter(): any;
  /**
   * Begins sketchViewModel update process on active graphic
   */
  startEditing(): any;
  /**
   * Cancels current sketch edits and reverts to original cached graphics
   */
  cancelEdits(): void;
  /**
   * Completes current sketch and notifies changes via event
   */
  saveEdits(): void;
  /**
   * General reset method to clear graphics and popover
   */
  reset(): void;
  /**
   * Projects geometry to map view projection, converts POJO geometry
   * to instance of __esri.Geometry
   */
  processGeometry(geometry: Partial<__esri.Geometry>): Partial<__esri.Geometry>;
  /**
   * Set bufferPanelVisible state if filter is applied or actively editing geometry
   */
  setBufferPanelVisible(): void;
  /**
   * Set buffer panel height based on widget position in view
   */
  setPanelHeight(): void;
  /**
   * Set view position inherited from parent container
   */
  setViewPosition(): void;
  /**
   * Set reference to DOM element
   * @param el HTMLCalciteActionElement DOM Element reference
   */
  setOptionsEl(el: HTMLCalciteActionElement): void;
  get geometryIsExtent(): boolean;
  /**
   * Returns true of view is a SceneView
   */
  get isScene(): boolean;
  /**
   * Point symbol object
   */
  get pointSymbol(): any;
  /**
   * Polyline symbol object
   */
  get polylineSymbol(): any;
  /**
   * Polygon symbol object
   */
  get polygonSymbol(): __esri.SimpleFillSymbolProperties & {
    type: "simple-fill";
  };
  /**
   * Mask symbol
   */
  get maskSymbol(): __esri.SimpleFillSymbolProperties;
  /**
   * Boundary symbol
   */
  get boundarySymbol(): __esri.SimpleFillSymbolProperties;
  /**
   * Boundary Outline symbol
   */
  get boundaryOutlineSymbol(): __esri.SimpleFillSymbolProperties;
  /**
   * Rectangle symbol object
   */
  get rectangleSymbol(): any;
  /**
   * Line symbol object
   */
  get lineStyle(): any;
  /**
   * Buffer polygon symbol object
   */
  get bufferPolygonSymbol(): any;
  /**
   * Class name indicates view position
   */
  get positionClass(): string;
  /**
   * Computed styles object
   */
  get styles(): {
    [key: string]: string;
  };
  /**
   * Returns current helper text to toolitip (when hasTooltips = true)
   */
  get helperText(): string;
  /**
   * Render function with primary options.  If disablePrimaryOptions = true,
   * primary options are skipped and only edit/editing options are displayed.
   * @param geometryType {Tool} - Type of geometry
   */
  renderPrimaryOptions(geometryType?: Tool): any;
  /**
   * Render function with options to edit / delete active sketch
   */
  renderEditOptions(): any;
  /**
   * Render function to cancel / save current sketch edits
   */
  renderEditingOptions(): any;
  /**
   * Render function for on-map popover tip
   */
  renderMapTip(): any;
  /**
   * Renders draw buffer
   */
  renderDrawBuffer(): HTMLArcgisHubMapWidgetDrawBufferElement;
  /**
   * Renders collection of draw tool widgets
   */
  renderDrawToolWidgets(enableText?: boolean): HTMLArcgisHubMapWidgetGenericElement[];
  /**
   * Renders action button for condensed draw tools widget
   */
  renderDrawingOptionsAction(): HTMLCalciteActionElement;
  /**
   * Renders relevant content for the widget popover
   */
  renderDrawingOptionsPopoverContent(): HTMLElement;
  /**
   * Renders draw tools as a single widget with a popover menu
   */
  renderCondensedDrawTools(): HTMLElement;
  /**
   * Renders draw tools as a list of widgets
   */
  renderDrawTools(): HTMLElement;
  renderPopovers(): any;
  renderDrawPopover(): HTMLCalcitePopoverElement;
  render(): any;
}
