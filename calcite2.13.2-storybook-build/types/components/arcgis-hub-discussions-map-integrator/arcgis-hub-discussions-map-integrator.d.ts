/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../stencil-public-runtime';
import { HTMLCalciteActionPadElement } from '@esri/calcite-components/dist';
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import { IPost } from '@esri/hub-discussions';
import { SYMBOL_STATE, ISymbolOptions, IGeometries } from './utils/utils';
import { GraphicChangeDetails, Tool } from '../arcgis-hub-map-widget-container/arcgis-hub-map-widget-draw/types';
import { IActiveMapDiscussionDetails, IPostDrawCreateDetails, IPostType } from '../arcgis-hub-discussions/utils/discussions';
import { PopoverEventDetails } from '../arcgis-hub-map-popover/types';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IHubContent, ISearchPosts } from '@esri/hub-common';
import { IGroup } from '@esri/arcgis-rest-portal';
import { IWithContext } from '../../utils/state';
export declare class ArcgisHubDiscussionsMapIntegrator implements IWithContext {
  element: HTMLArcgisHubDiscussionsMapIntegratorElement;
  /**
   * Reference to on map discussions element
   */
  onMapDiscussionsRef: HTMLArcgisHubDiscussionsElement;
  /**
   * Reference to on map discussions preview element
   */
  onMapDiscussionsPreviewRef: HTMLArcgisHubDiscussionsMapPreviewElement;
  /**
   * True when esri modules are loaded and layers are added to the view
   */
  initialized: boolean;
  /**
   * Cache of Discussion post features
   */
  cachedFeatures: Feature[];
  /**
   * Unsaved original geometry used when editing original geometry on a post
   */
  unsavedExistingGeometry: {
    id: string;
    index: number;
    geometry: __esri.Geometry;
  }[];
  /**
   * Cache of feature layer geometries used to avoid duplicate queries
   * to feature service
   */
  cachedRelatedFeatureGeometry: {
    [key: string]: IGeometries;
  };
  /**
   * Graphics Layer used for displaying drawn post geometries
   */
  geometryGraphicsLayer: __esri.GraphicsLayer;
  /**
   * Graphics Layer used to store pre-commit unsaved geometry updates
   */
  unsavedGeometryGraphicsLayer: __esri.GraphicsLayer;
  /**
   * Graphics Layer used for displaying callout icon associated with
   * post geometries and related features
   */
  calloutGraphicsLayer: __esri.GraphicsLayer;
  /**
   * Graphics layer used show custom symbol highlights
   */
  highlightGraphicsLayer: __esri.GraphicsLayer;
  /**
   * Unique ID's for discussion layers
   */
  layerIds: string[];
  /**
   * Handle for highlights
   */
  highlightHandle: __esri.Handle;
  /**
   * Handle for map pointer move
   */
  mapPointerMoveHandler: __esri.Handle;
  /**
   * Handle for map click specific to floating discussions panel
   */
  mapClickDiscussionsHandler: __esri.Handle;
  /**
   * Handle for view size changes
   */
  mapViewSizeChangeHandler: __esri.Handle;
  /**
   * Handle for the view center changing, such as during drag or zoom events
   */
  mapViewCenterChangeHandler: __esri.Handle;
  /**
   * Currently selected feature layer graphic
   */
  selectedGraphic: __esri.Graphic;
  /**
   * Staged attribute to signal graphic should persist on map
   */
  persistAttribute: string;
  /**
   * Post ID of actively edited post
   */
  sketchPostId: string;
  /**
   * Indicates if actively edited post is of type 'post' or 'reply'
   */
  sketchPostType: IPostType;
  /**
   * Index position of currently edited post geometry
   */
  sketchIndex: number;
  /**
   * True if sketch is an unsaved addition (vs existing geometry)
   */
  sketchIsUnsaved: boolean;
  /**
   * Stores initial props for drawRef element
   */
  initialDrawOptions: {
    buffer: boolean;
    disablePrimaryOptions: boolean;
    disableEditOptions: boolean;
    enableMapTips: boolean;
  };
  /**
   * Currently selected graphic
   */
  graphicGeometry: __esri.Point;
  /**
   * Whether or not the currently selected graphic point is offset
   */
  isOffset: boolean;
  /**
   * Reference to map view
   */
  view: __esri.MapView;
  /**
   * Reference to connected discussions component element
   */
  discussionsRef: HTMLArcgisHubDiscussionsElement | HTMLArcgisHubDiscussionsBoardElement;
  /**
   * Reference to connected draw widget element
   */
  drawRef: HTMLArcgisHubMapWidgetDrawElement;
  /**
   * Reference to connected search widget element
   */
  searchRef: HTMLArcgisHubMapWidgetSearchElement;
  /**
   * Options to configure symbol styles to hosting app theme
   */
  theme: ISymbolOptions;
  /**
   * An optional discussion URI string
   */
  discussion: string;
  /**
   * A reference to the IHubContent or IGroup representing the subject entity of the discussion.
   */
  entity?: IHubContent | IGroup;
  /**
   * A UUID string of an IHubContent or IGroup representing the subject entity of the discussion.
   */
  entityId?: string;
  /**
   * A string representing the type (`content` or `group`) of subject entity of the discussion.
   */
  entityType?: string;
  /**
   * If this component is embedded in a Hub site
   */
  isHub: boolean;
  /**
   * If the body width is < 768px
   */
  isMobile: boolean;
  /**
   * The feature that should be active on first render
   */
  activeFeature: Feature;
  /**
   * Active discussion displayed in floating map panel
   */
  activeMapDiscussion: IActiveMapDiscussionDetails;
  /**
   * Used to filter post results to those with specific `channelId` values
   */
  channelIds: string[];
  /**
   * Whether to render channel avatar in the post header
   */
  showChannelAvatar: boolean;
  /**
   * Whether to render channel name in the post header
   */
  showChannelName: boolean;
  /**
   * Global context
   */
  _context: import("@esri/hub-common").IArcGISContext;
  /**
   * Height of map view
   */
  viewHeight: number;
  /**
   * Width of map view
   */
  viewWidth: number;
  /**
   * Whether the discussions element is displaying in preview mode
   */
  preview: boolean;
  /**
   * Height of the discussions preview element
   */
  previewHeight: number;
  /**
   * left offset for discussions element position
   */
  leftOffset: number;
  /**
   * top offset for discussions element position
   */
  topOffset: number;
  /**
   * True if map-action-notice should be displayed on map, which
   * currently indicates if locations are being added via draw tools
   */
  mapActionNoticeActive: boolean;
  /**
   * The current active post that is open in the post or reply editor
   */
  activePost: IPost;
  /**
   * The current graphic that the user hovers over which is associated
   * with the active post
   */
  activeGraphicDetails: {
    id: string;
    index: number;
    unsaved: boolean;
    geometry: __esri.Geometry;
  };
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
  hubTelemetry: EventEmitter<any>;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor();
  /**
   * Component will load lifecycle method, handles initial JSAPI initialization
   */
  componentWillLoad(): Promise<void>;
  disconnectContext: () => void;
  connectedCallback(): void;
  /**
   * Disconnected callback lifecycle method, handles teardown of
   * layers on map to return to original state.  Also removes any
   * outstanding map handlers for garbage collection.
   */
  disconnectedCallback(): void;
  /**
   * Determines if target of an event originated from the connected discussions component or floating
   * discussions map panel
   * @param event An event
   * @returns True if target is a reference to connected discussions component or floating discussions map panel
   */
  eventTargetIsDiscussionsRef(event: CustomEvent): boolean;
  /**
   * Reusable method for emitting telemetry events
   */
  emitHubTelemetry(telemetry: {
    [key: string]: any;
  }): void;
  /**
   * Initialization - loads JSAPI modules and adds necessary layers
   */
  initialize(): Promise<void>;
  /**
   * Handles initial JSAPI initialization in instances where MapView is not available
   * during componentWillLoad lifecycle method.  If a different MapView is
   * provided, it will teardown the old MapView and initialize the new one
   * @param view JSAPI MapView
   * @param prevView Old JSAPI MapView
   */
  attachView(view: __esri.View, prevView: __esri.View): void;
  /**
   * Setup and teardown of map when discussions is connected / disconnected
   * @param discussionsRef HTML Element reference to discussions component
   */
  attachdiscussionsRef(discussionsRef: HTMLArcgisHubDiscussionsElement): void;
  /**
   * Preserve drawRef props when it's connected
   */
  handleDrawRefUpdate(): void;
  /**
   * Calculates position offsets for discussions element
   */
  calculateOffsets(): void;
  /**
   * Gets height of preview element
   * @param evt CustomEvent
   */
  handlePreviewDidLoad(evt: CustomEvent<number>): void;
  /**
   * Expands the discussions component
   */
  handlePreviewExpanded(): void;
  handleSearchWidgetPanelToggled(event: CustomEvent): void;
  /**
   * Handles request to ease to current discussions graphics
   */
  handleGeometryGoTo(event: CustomEvent<IPost>): void;
  /**
   * Notifies map integrator of discussion API feature create / edit changes
   */
  handleGeometryFeature(event: CustomEvent<{
    post: IPost;
    create: boolean;
  }>): void;
  /**
   * Removes featues from the map when deleted via discussions actions
   */
  handleGeometryFeatureDeleted(event: CustomEvent<IPost>): void;
  /**
   * Handles event that requests that a feature be selected on the map
   */
  handleGeometryFeatureSelect(event: CustomEvent<Feature>): void;
  selectFeature(feature: Feature): void;
  /**
   * Handles event that requests that a feature be highlighted on the map
   * @param event
   */
  handleGeometryFeatureHighlight(event: CustomEvent<Feature>): void;
  /**
   * During a post editing session, removes unsaved features or related features
   */
  handleFeatureRemove(event: CustomEvent<Feature>): void;
  /**
   * Remove graphic from the map and discussions props
   */
  removeGraphic(id: string, relatedFeatureId: string, index: number, unsaved: boolean): void;
  /**
   * Sets up internals for
   * when the user elects to draw a new geometry drawing on the map from discussions
   * @param event IPostDrawCreateDetails
   */
  handleGeometryDrawCreate(event: CustomEvent<IPostDrawCreateDetails>): void;
  /**
   * When geometry type is selected, sets map and draw tools to active draw state
   */
  handleGeometryDrawTypeSelect(event: CustomEvent<Tool>): void;
  /**
   * Resets active state when a draw session is completed
   */
  handleGeometryDrawDone(): void;
  /**
   * Clears active tool when a draw session is canceled
   */
  handleGeometryDrawCancel(): void;
  /**
   * Remove pending graphics when draw tool is changed
   */
  handleActiveToolChange(event: CustomEvent<Tool>): void;
  /**
   * Handles event that requests that a feature's drawn geometry
   * be edited
   * @param event
   */
  handleGeometryDrawEdit(event: CustomEvent<Feature>): void;
  /**
   * Edit a graphic by passing in graphic geometry to draw tools
   */
  editGraphic(id: string, index: number, unsaved: boolean): void;
  /**
   * Define active post when post / reply editor is rendered
   */
  handlePostEditorReady(event: CustomEvent<IPost>): void;
  /**
   * Handles event to stop a current edit session
   */
  handleGeometryDrawEditCancel(): void;
  /**
   * When SketchViewModel emits change details, update map graphics and
   * discussion props with updates
   */
  handleDrawGraphicsChange(event: CustomEvent<GraphicChangeDetails>): void;
  /**
   * Handles event to force drawing tools to reset
   * @param event
   */
  handleGeometryDrawReset(): void;
  /**
   * Remove and reset map graphics and any active draw session state
   */
  handleGeometryClearAll(): void;
  /**
   * Look for graphics that intersect draw 'select' tool event and
   * render options to add / remove related features to discussions
   */
  handleMapDrawSelect(event: CustomEvent<__esri.ViewPointerDownEvent>): Promise<void>;
  /**
   * Reset's active discussion state when panel is closed or dismissed
   */
  handleDiscussionsClose(event: CustomEvent<void>): void;
  /**
   * Add related feature to post
   */
  addRelatedFeature(): void;
  /**
   * Remove related feature from post
   */
  removeRelatedFeature(): void;
  /**
   * Reset's related feature selections tate
   */
  cancelAddRelatedFeature(): void;
  /**
   * Used to inform connected discussions component if map is available
   * @param hasMap Boolean - if map is available
   */
  setDiscussionsRefHasMap(hasMap: boolean): void;
  /**
   * Teardown of component to return map to original state
   * and remove map handlers
   */
  teardown(): void;
  /**
   * Pre-fetches subject details for faster initial discussions
   * on-map panel load time
   */
  fetchSubject(): Promise<void>;
  /**
   * Fetches all posts with location to load onto map for
   * current discussion
  */
  fetchPosts(): void;
  /**
   * Add graphics layer that will hold post graphics
   */
  addGeometryGraphicsLayer(): void;
  /**
   * Adds graphics layer that will temporarily hold graphics for post that is being edited
   */
  addStagedGeometryGraphicsLayer(): void;
  addCalloutGraphicsLayer(): void;
  addHighlightGraphicsLayer(): void;
  /**
   * Add graphic to highlight layer and clear non-persisted graphics
   * @param isCallout True of graphic is the callout
   * @param graphic An Esri JSAPI Graphic
   * @param state SYMBOL_STATE
   * @param persist If graphic should stay active until overwritten
   */
  addHighlightGraphic(isCallout: boolean, graphic: __esri.Graphic, state: SYMBOL_STATE, persist?: boolean): void;
  /**
   * Add styled hover graphic for post callouts when the mouse intersects an existing callout
   * @param event Esri JSAPI ViewPointerMoveEvent
   */
  setCalloutSymbolOnPointerMove(event: __esri.ViewPointerMoveEvent): void;
  /**
   * Adds location popover on map for discussion geometry actions
   * @param event Esri JSAPI ViewPointerMoveEvent
   */
  setLocationEditPopover(event: __esri.ViewPointerMoveEvent): void;
  publishPendingGraphics(): void;
  deletePendingGraphics(): void;
  /**
   * Remove layers from the map
   */
  removeLayers(): void;
  /**
   * Hide layers on the map by setting opacity to .10
   */
  hideLayers(): void;
  /**
   * Show layers on the map by setting opacity to 1
   */
  showLayers(): void;
  /**
   * Remove a layer from the map
   * @param layer Esri JSAPI GraphicsLayer
   */
  removeLayer(layer: __esri.GraphicsLayer): void;
  /**
   * Empties any graphics from existing graphics layers
   */
  emptyFeatures(): void;
  /**
   * Adds graphics to a specified graphics layer
   * @param layer Esri JSAPI GraphicsLayer
   * @param graphics Array of Esri JSAPI Graphics
   */
  addGraphicsToGraphicsLayer(layer: __esri.GraphicsLayer, graphics: __esri.Graphic[]): void;
  /**
   * Takes array of GeoJSON features and adds them to the map, replacing all previous features
   * @param features An array of GeoJSON Features
   */
  refreshFeatures(features: Feature[]): Promise<void>;
  /**
   * Creates an extent from a point, used for determining zoom level
   * @param geometry Esri JSAPI Point Geometry
   * @param tolerance Number in Degrees to expand point extent
   * @returns
   */
  pointToExtent(geometry: __esri.Point, tolerance?: number): __esri.Extent;
  /**
   * Eases map to given location
   * @param target Target location / viewpoint to navigate to
   */
  goTo(goToTarget: __esri.GoToTarget2D): void;
  /**
   * Constructs a valid GeoJSON object given a geometry type and properties object
   * @param geometry GeoJSON geometry type string
   * @param properties GeoJSON properties object
   * @returns GeoJSON Feature
   */
  postToGeoJSON(geometry: Geometry, properties: GeoJsonProperties): Feature;
  /**
   * Construct an Esri Graphic from a GeoJSON Feature
   * @param feature GeoJSON Feature
   * @returns Esri JSAPI Graphic
   */
  makeGraphic(feature: Feature): __esri.Graphic;
  /**
   * Construct an Esri Graphic that is a callout icon for the underlying GeoJSON Feature
   * @param feature GeoJSON Feature
   * @returns Esri JSAPI Graphic
   */
  makeCalloutGraphic(feature: Feature): __esri.Graphic;
  /**
   * Queries feature service for related feature geometry and constructs GeoJSON feature
   * @param feature GeoJSON Feature
   * @returns Promise that resolves with a GeoJSON Feature
   */
  getRelatedFeature(objectId: string): Feature;
  /**
   * Caches realted feature geometry in single optimized query
   * @param objectIds Array of feature service object ids
   */
  cacheRelatedFeatureGeometry(objectIds: string[]): Promise<void>;
  /**
   * Given feature with identifying attributes, finds matching
   * map graphic
   * @param feature Feature object
   * @returns Esri Graphic
   */
  getMatchingGraphic(feature: Feature): __esri.Graphic;
  /**
   * Query graphics layer for existing graphic matching post ID
   * @param id Unique identifier of feature (post id)
   * @returns
   */
  getGraphicById(id: string, index?: number): __esri.Graphic;
  /**
   * Highlight a feature on the map
   * @param graphic Esri JSAPI Graphic to highlight
   * @returns
   */
  highlightGraphic(graphic?: __esri.Graphic): void;
  /**
   * Clear any existing highlighted graphics
   */
  clearHighlights(): void;
  /**
   * Clear any existing active or hover graphics
   */
  clearHoverActiveGraphics(all?: boolean): void;
  /**
   * Remove MapView handlers for garbage collection
   */
  removeViewHandlers(): void;
  /**
   * Remove map click handler used for selecting related features
   */
  resetSelect(): void;
  /**
   * Remember initial drawing component properties so that they can be restored
   */
  saveInitialDrawOptions(): void;
  /**
   * Restore drawing component properties back to their initial state
   */
  restoreInitialDrawOptions(): void;
  /**
   * Reset any staged post / reply edits
   */
  resetStagedFeatures(): void;
  /**
   * When map is clicked on discussions geometries, set active discussion for on map discussions panel
   * @param event Esri JSAPI ViewClickEvent
   */
  handleMapClickDiscussions(event: __esri.ViewClickEvent): void;
  /**
   * Set's view height and width state when view size changes
   */
  handleViewSizeChange(): void;
  /**
   * Calls methods that listen for 'pointer-move' event on View
   * @param event Esri JSAPI ViewPointerMoveEvent
   */
  handlePointerMove(event: __esri.ViewPointerMoveEvent): void;
  /**
   * Edit the active graphic
   */
  handleEditActiveGraphic(): void;
  /**
   * Delete the active graphic
   */
  handleDeleteActiveGraphic(): void;
  /**
   * Puslish pending graphic, and show tooltip on drawing component
   * after first unsaved graphic is created
   */
  handlePostPendingGraphic(): void;
  /**
   * Computes a ISearchPosts object used to search for posts
   */
  get searchParams(): Pick<ISearchPosts, "channels" | "discussion">;
  /**
   * The active dicsussions component reference
   */
  get currentDiscussionsRef(): HTMLArcgisHubDiscussionsElement | HTMLArcgisHubDiscussionsBoardElement;
  /**
   * Returns default theme mixed with any custom theme options
   */
  get themeWithDefaults(): ISymbolOptions;
  /**
   * Returns true if current view is a SceneView
   */
  get is3D(): boolean;
  /**
   * The primary feature layer for current discussion
   */
  get targetLayer(): __esri.FeatureLayer;
  /**
   * Style object
   */
  get styles(): {
    [key: string]: string;
  };
  /**
   * Render related feature map options
   */
  renderAddLocation(): HTMLCalciteActionPadElement;
  /**
   * Render option to remove related features if they are already included on a post
   */
  renderRemoveLocation(): HTMLCalciteActionPadElement;
  /**
   * Render the primary options for pending map graphics, requiring
   * confirmation before 'officially' adding to a post or reply
   */
  renderPostLocationPrimaryOptions(): void;
  /**
   * Render options to edit or delete an active map graphic
   */
  renderPostLocationEditOptions(): void;
  /**
   * Render on map discussions component
   */
  renderMapDiscussion(): HTMLElement;
  render(): any;
}
