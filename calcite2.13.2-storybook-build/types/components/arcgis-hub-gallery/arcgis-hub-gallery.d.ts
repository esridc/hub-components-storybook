import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ActiveSortOption } from '../arcgis-hub-search-sort/arcgis-hub-search-sort';
import { ComponentIntl } from "../../utils/stencil-intl";
import { CORNERS, DROP_SHADOWS, IMAGE_TYPES } from "../interfaces";
import { IBulkActions, IComponentAction, IFacet, IGallerySelection, IGalleryState, ISerializedGalleryState, LayoutOptions } from '../../utils/types';
import { Appearance } from '@esri/calcite-components/dist/types/components/interfaces';
import { IHubSearchResult, IHubSearchOptions, IHubSearchResponse, IQuery, EntityType, IFilter, CardModelTarget, ICardActionLink, IHubCardViewModel, ISortOption, SortOption, IHubMapSettings, Kilobyte } from '@esri/hub-common';
import { SelectionMode } from '../interfaces';
import { CardViewModelCallback, IHubCardTitleLinkClickEvent } from '../../utils/cardModelConverters/types';
import { IGalleryMapSettings } from './utils/location';
import { IHubAutoSuggestMatch, IHubAutoSuggestSearchMatch } from '../../utils/auto-suggest/types';
import { ITelemetryInfo } from '../../utils/telemetry';
import { IWithContext } from '../../utils/state';
import { WellKnownFacetTypes } from './utils/facets';
import { GalleryTableColumnName, IGalleryTableColumn } from './utils/get-table-columns';
interface IInternalComponentAction extends IComponentAction {
  children?: IInternalComponentAction[];
  handler?: (action: IComponentAction) => void;
  key: string;
}
declare type ErrorSource = 'initialization' | 'search';
/**
 * arcgis-hub-gallery
 *
 * @slot loading-screen - A slot for overriding the default skeleton-loader loading state. Useful for
 * showing a custom loading experience (example: <calcite-loader />)
 *
 * TODO: Document other <slots />
 */
export declare class ArcgisHubGallery implements IWithContext {
  element: HTMLElement;
  /**
   * Default to the global context.
   *
   * Use this for API calls
   */
  _context: import("@esri/hub-common").IArcGISContext;
  disconnectContext: () => void;
  /**
   * [Syntactic Sugar Property, used to create a base IQuery object if `this.query` is not passed in]
   *
   * The search term that the gallery should scope its results to. If `this.query` is not passed in, this term
   * becomes a permanant scope for the gallery (i.e., changing the value in the search bar will
   * not change the base query's scope).
   */
  term: string;
  /**
   * Base url that individual result cards use when deriving their model's target url.
   * If provided, cards will link to `baseUrl` + the url determined by the designated "linkTarget"
   */
  baseUrl: any;
  /**
   * Content Hierarchy Path that will be appended onto the urls of individual cards
   * as `?path=${path}`
   */
  path: string;
  /**
   * Pre-defined options of where the card should redirect
   */
  linkTarget: CardModelTarget;
  /**
   * The search API that should be targeted.
   */
  api: 'portal' | 'hub';
  /**
   * Default number of results to show
   */
  limit: number;
  /**
   * Default sort field. Null indicates that no sorting should be applied to the initial search requests.
   */
  sortField: string;
  /**
   * Default sort order. Null indicates that the backing api's default sort direction should be used in
   * the initial search requests.
   */
  sortOrder: "asc" | "desc";
  /**
   * Only useful when the search results of a gallery are known ahead of time (e.g. a gallery is meant to
   * render the same 6 results every time).
   *
   * When specified, search results that match one of the supplied ids will appear at the top of the gallery
   * in the same order of the array. If a supplied id doesn't have a corresponding search result, the id is
   * removed from the sort flow.
   *
   * For example, if `sortByIds = ['1', '2', '3'], but no search result with id `2` is returned, then the gallery
   * would render the results in the following order:
   * - Result with id `1`
   * - Result with id `3`
   * - Any other results that came back with the search
   */
  sortByIds: string[];
  /**
   * List layout: list, grid, grid-filled, or map - default is list
   */
  layout: LayoutOptions;
  /**
   * List of layout options that the user can switch between
   * These options are rendered by the layout switcher in the header
   */
  layoutOptions: LayoutOptions[];
  /**
   * Show/hide the thumbnail image on individual cards
   */
  showThumbnail: boolean;
  /**
   * The type of image that individual cards will display.
   * Either thumbnail or icon, defaults to thumbnail.
   */
  imageType: IMAGE_TYPES;
  /**
   * Indicates if the thumbnail on individual cards should lazy load
   */
  lazy: boolean;
  /**
   * Show/hide the sort ui
   */
  showSort: boolean;
  /**
   * Show/hide search input
   */
  showSearch: boolean;
  /**
   * Whether the search input should display term suggestions from recent searches.
   * Must be used in conjunction with `showSearch`
   */
  matchRecent: boolean;
  /**
   * Whether the search input should display search results as the user types.
   * Must be used in conjunction with `showSearch`
   */
  matchSearch: boolean;
  /**
   * Show/hide facet chips. Must be used in conjuntion with `showFacets`
   */
  showChips: boolean;
  /**
   * Show/hide facets
   */
  showFacets: boolean;
  /**
   * Whether the target url for individual cards should open up in a new tab
   */
  newTab: boolean;
  /**
   * Whether individual cards are selectable via a checkbox
   */
  selectionMode: SelectionMode;
  /**
   * Configuration for bulk actions
   * will cause the gallery to render bulk actions ui
   * and raise events accordingly
   * @type {IBulkActions}
   * @memberof ArcgisHubGallery
   */
  bulkActions: IBulkActions;
  /**
   * Whether to show "More Results" button on bottom of the gallery
   */
  showMoreResultsBtn: boolean;
  /**
   * Whether to show results count on the top and bottom of the gallery
   */
  showResultsCount: boolean;
  /**
   * Whether to show the Back to Top button at the bottom of the gallery
   */
  showBackToTopBtn: boolean;
  /**
   * Query that defines the Gallery scope
   */
  query: IQuery;
  /**
   * Facets to display in the gallery. Will not be shown unless the `showFacets` flag is enabled
   */
  facets: Array<WellKnownFacetTypes | IFacet>;
  /**
   * [Syntactic Sugar Property, ONLY used to create a base IQuery if `this.query` is not passed in
   * DO NOT use this prop for other purposes, use `this.query.targetEntity` instead]
   * Defines the target entity of the gallery
   */
  galleryType: EntityType;
  /**
   * Defines what tag (i.e <h3>, <h4>) should wrap the titles on each card. Used for accessibility compliance.
   */
  cardTitleTag: string;
  /**
   * Specify the include parameter sent in the request.
   * sent as | delimited strings
   * e.g. `"server.layers.length as layerCount | group.memberCount as members"`
   */
  include: string;
  private get _include();
  /**
   * Serialized Gallery State
   * When passed into the component, it is applied to the
   * gallery before it is passed to child components.
   * This is used to restore a previous state, i.e. when a
   * user returns to a bookmarked page
   */
  state: ISerializedGalleryState;
  /**
   * Defines how the corners of each card are styled.
   */
  corners: CORNERS;
  /**
   * Whether individual cards should display additional info (metadata) about their view models
   */
  showAdditionalInfo: boolean;
  /**
   * Whether the gallery should show special empty state when the current search has returned no results
   */
  showEmptyState: boolean;
  /**
   * Whether telemetry events in the gallery should be disabled
   */
  disableTelemetry: boolean;
  /**
   * Defines how heavy of a drop shadow should be applied to the individual cards
   */
  shadow: DROP_SHADOWS;
  /**
   * Whether the individual cards should add a link button (as opposed to relying on
   * the link in the card's title). Must be used in conjunction with `linkButtonText`.
   */
  showLinkButton: boolean;
  /**
   * The text to display on each card's link button. Must be used in conjunction with `showlinkButton`.
   */
  linkButtonText: string;
  /**
   * Sets the style of each card's link button. Must be used in conjunction with `showlinkButton`.
   */
  linkButtonStyle: Appearance;
  /**
   * Whether the gallery is being rendered on a mobile device. When set to true, facets will move
   * from the side of the gallery into a toggleable modal (controlled via `showFacetModal`)
   */
  mobileView: boolean;
  /**
   * Show/hide the add content button
   */
  showAddContent: boolean;
  /**
   * Pass in props that will be applied to the -add-content component
   */
  addContentProps: Record<string, any>;
  /**
   * Controls the visibility of the facets modal. Must be used in conjunction with `mobileView`.
   * Used to show the facets modal from outside when the gallery is in mobile view.
   * This should not really be needed as we show a button on the gallery when there are facets and mobileView is true
   */
  showFacetModal: boolean;
  _shouldShowFacetModal: boolean;
  /**
   * Show/hide available badges on each card. Badges are defined in the view model of each card.
   */
  showBadges: boolean;
  /**
   * Show/hide the view model's family name and icon on each card
   */
  showType: boolean;
  /**
   * Show/hide the view model's source information on each card
   */
  showOwner: boolean;
  /**
   * Show/hide the layout switcher UI.
   * Is not respected when mobile-view is true.
   */
  showLayoutSwitcher: boolean;
  /**
   * IHubMapSettings object that defines the map's initial state.  Currently this is used to set
   * the underlying web map or web scene by itemId.  In the future this will hold additional settings
   * that are passed into the map component.
   * Example: { itemId: '1234567890' }
   */
  mapSettings: IHubMapSettings;
  /**
   * Map configuration settings specific to the gallery experience
   * - extent
   *   - 'default' - Uses site extent, or org extent if not available.  If neither are available, uses extent of initial results.
   *   - 'results' - Uses extent of initial results.  Changes to query do not update extent.
   *   - 'continuous' - Uses extent of initial results.  Changes to query update extent.
   * TODO - We will likely want to conflate this into the mapSettings prop, so this component
   * would only have one mapSettings prop to manage.
   * @type {IGalleryMapSettings}
   *
   */
  galleryMapSettings: IGalleryMapSettings;
  /**
   * Expand extent by given factor
   * https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Extent.html#expand
   */
  expand: number;
  /**
   * Show/hide the list of results. This is primarily useful when the
   * layout is set to 'map' and the user wants to hide the list of results
   * which are already displayed on the map.
   */
  showResults: boolean;
  /**
   * Whether to disable mouse wheel scroll zooming on the map
  */
  disableMapMouseWheelZoom: boolean;
  /**
   * An additional facet that can be passed in and prepend the facet list.
   */
  additionalFacet: any;
  /**
   * Existing selection as an IGallerySelection object
   * This is the selection that the consuming app passes in
   * if selectable, cards in gallerySelection will display as selected
   * if showSelection is set to false, those cards will be excluded from the search query,
   * so they won't appear in the results list
   */
  gallerySelection: IGallerySelection;
  /**
   * A copy of the gallerySelection that we want to return back to the consuming app when
   * a card is being selected/deselected
   */
  _gallerySelection: IGallerySelection;
  /**
   * Whether to show the pre-selected cards
   */
  showSelection: boolean;
  /**
   * Allow action links to be passed in
   */
  cardActionLinks: ICardActionLink[];
  /**
   * Passing a callback function into the gallery allows the developer to apply custom
   * business logic to the processing of the Card View model. This is useful in scenarios
   * where we want to show non-standard metadata, badges, actions and to apply logic to
   * the selectability of the card.
   */
  callback: CardViewModelCallback;
  /**
   * A list of sort options for the sort field
   */
  sortOptions: SortOption[];
  /**
   * The number of actions to render as primary actions
   */
  primaryActionsToRender: 1 | 2 | 3;
  /**
   * The columns to render when the layout is 'table'
   * If not provided, the default columns for the entity type will be used
   * see ../layouts.md for more info
   */
  tableColumns: (IGalleryTableColumn | GalleryTableColumnName)[];
  /**
   * Indicates whether the gallery has finished initializing.
   */
  isInitialized: boolean;
  /**
   * Indicates whether the gallery is currently in a searching state.  Current primary
   * use case is in e2e tests to determine when the gallery is not in a loading state.
   */
  isSearching: boolean;
  /**
   * Holds the passed in slots
  */
  actions: Array<any>;
  /**
   * hub search results
   */
  searchResults: IHubSearchResult[];
  /**
   * If an error or exception has been thrown, and the component needs
   * to show a help-state
   * (currently used for hubSearch and component initialization errors)
   */
  error: Error;
  _facets: IFacet[];
  /**
   * Event that fires for recording telemetry
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Event that fires when results are selected/deselected.
   * Payload is the selected IHubSearchResult objects
   */
  arcgisHubGallerySelect: EventEmitter<IGallerySelection>;
  /**
   * Event that fires when the the Query changes
   */
  arcgisHubGalleryQueryChange: EventEmitter<IQuery>;
  /**
   * Event that fires when the filter changes and carries a payload that is the
   * state of the component. Host components or applications can use this state
   * to re-hydrate the Gallery
   */
  arcgisHubGalleryStateChange: EventEmitter<ISerializedGalleryState>;
  /**
   * Event that's fired when the search results change
   * This allows other components to be kept in sync with the search
   * (i.e. a Map showing the result bounds)
   */
  arcgisHubGalleryResultsChange: EventEmitter<IHubSearchResult[]>;
  arcgisHubGalleryAction: EventEmitter<{
    action: string;
    model: IHubCardViewModel;
  }>;
  /**
   * Event that fires when the facet modal is closed by a user
   */
  arcgisHubContentGalleryFacetModalClose: EventEmitter<void>;
  /**
   * Event that fires when a user clicks a bulk action button
   */
  arcgisHubGalleryBulkAction: EventEmitter<any>;
  /**
   * Event that fires when a query is executed and emits the length of the query string
   */
  arcgisHubGalleryExecutedQuerySize: EventEmitter<Kilobyte>;
  /**
   * List of sort options to pass to `arcgis-hub-search-sort`
   */
  _sortOptions: ISortOption[];
  /**
   * The currently active SortOption
   */
  private get _activeSortOption();
  /**
   * The last search response. We maintain this so that
   * we can call `.next()` when the user requests more results
   */
  lastSearchResponse: IHubSearchResponse<IHubSearchResult>;
  /**
   * Focusable (but invisible) element at the top of the gallery result list.
   * Used to comply with accessibility requirements.
   */
  resultTopSpan: HTMLSpanElement;
  /**
   * This stores total search results count before requesting a new
   * search results by clicking "Load More" button
   * Passed to results components so they can set focus appropriately after render
   */
  lastSearchResultsCount: number;
  /**
   * Intl service
   */
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * Builds the facets for the gallery with the facets
   * passed in, hydrating them so if a facet is a string,
   * it is converted to an IFacet, and filtering them
   * based on the targetEntity
   */
  buildFacets(): IFacet[];
  initialize(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  handleContextChange(): Promise<void>;
  fetchFacetsAndSearch(): Promise<void>;
  /**
   * Build the search options and filters then excute the search
   */
  prepareAndExecuteSearch(): void;
  onStateChanged(): void;
  onGallerySelectionChanged(gallerySelection: IGallerySelection): void;
  /**
   * Re-fetches the search results up to the current "page"
   * For use in cases where the consumer knows the results have changed
   * @return {*}  {Promise<void>}
   * @memberof ArcgisHubGallery
   */
  refresh(): Promise<void>;
  clearSelection(): Promise<void>;
  setResultTopSpan(el: HTMLSpanElement): void;
  /**
   * Apply serialize state to the Gallery
   * @param state
   */
  applySerializedState(state: ISerializedGalleryState): void;
  /**
   * Batches of fields that need aggregations fetched from the API
   * Note: Because the portal API can only handle 3 aggregation fields at a time,
   * each batch has a max size of 3
   */
  private get _aggFieldBatches();
  /**
  * The max number of aggregations to get from the API
  * For the portal API the max is 200, and regardless of how many
  * fields are requested, the same number is applied to all.
  */
  private get _aggLimit();
  get hasSearchResults(): boolean;
  /**
   * return array of `IFilter`'s which represent the selected/active
   * facets options
   */
  get activeFacetFilters(): IFilter[];
  get activeDateRangeFilters(): IFilter[];
  get activeMapFilters(): IFilter[];
  /**
   * True if error is present on @State() error
   */
  get hasError(): boolean;
  fetchDynamicFacetOptions(): Promise<void>;
  /**
   * 'Execute' the hubSearch fn and assign state variables based on the response
   * @param query IQuery
   * @param options IHubSearchOptions
   */
  search(query: IQuery, options: IHubSearchOptions): Promise<void>;
  /**
   * Fired when "Load More" button is clicked
   */
  fetchMore(): Promise<void>;
  backToTop(): void;
  /**
   * Compute the `IQuery`  based on the current state of the component
   */
  get activeQuery(): IQuery;
  /**
   * Construct an `IHubSearchOptions` based on the current state of the component
   */
  private get _searchOptions();
  /**
   * Construct batches of `IHubSearchOptions` for aggregations based on the current state of the component.
   * We have to batch the requests due to the Portal API's limit of 3 aggregation fields per request.
   */
  private get _aggSearchOptionBatches();
  /**
   * Return a single structure that represents the current state of the gallery
   */
  get galleryState(): IGalleryState;
  /**
   * Return the serialized state of the gallery
   */
  get serializedGalleryState(): ISerializedGalleryState;
  get _hasSlottedGalleryActions(): boolean;
  handleLayoutSelect(event: CustomEvent<LayoutOptions>): void;
  sendCardTitleClickTelemetry(event: CustomEvent<IHubCardTitleLinkClickEvent>): void;
  sendMoreLessClickTelemetry(event: CustomEvent<{
    facet: IFacet;
    isMore: boolean;
  }>): void;
  /**
   * Add/remove a card ID from the `gallerySelection` list when it is selected/deselected
   * It emits the `arcgisHubGallerySelect` event that's being listened by the consumer component
   * @param event
   */
  cardSelect(event: CustomEvent<IHubCardViewModel>): void;
  /**
   * Handle any gallery errors by setting error state to thrown error, clearing
   * any existing search results, setting isInitialized to true, clearing the map,
   * and logging the message as a warning to the console.
   * @param message string - the custom error to log to the console
   * @param err Error - the error object
   * @param source ErrorSource - the source of the error
   */
  handleError(message: string, err: Error, source: ErrorSource): void;
  /**
   * Listen for changes on the search input
   * @param event
   */
  handleSearchChange(event: CustomEvent<string>): void;
  /**
   * Executes a new search based on the updated term
   * @param term term to search
   */
  searchTerm(term: string): void;
  /**
   * Handles when a match is selected from the auto-suggest component
   */
  handleMatchSelected(event: CustomEvent<IHubAutoSuggestMatch>): void;
  /**
   * Navigate to the corresponding url of a search match
   * @param match match to navigate to
   */
  handleSearchMatchSelected(match: IHubAutoSuggestSearchMatch): void;
  /**
  * Handle changes in the facets
  * @param event
  */
  onFacetChange(event: CustomEvent<IFacet>): void;
  /**
   * Reset the facets to the original state
   */
  resetFacets(): void;
  /**
   * Handle the telemetry event on arcgis-hub-auto-suggest and stop it from propagating
   * if it's a search query
   * @param e CustomEvent<any> - A custom event that contains the telemetry data
   */
  handleHubTelemetry(e: CustomEvent<ITelemetryInfo>): void;
  /**
   * Wrapper for emiting telemetry
   */
  maybeSendTelemetry(data: Record<string, any>): void;
  /**
   * Triggered every time sort field has changed
   * @param event
   */
  changeSortField(event: CustomEvent<ActiveSortOption>): void;
  /**
   * Render the search input
   * @returns
   */
  renderSearch(): VNode;
  renderMobileFacetsTrigger(): VNode;
  renderLayoutSwitcher(): VNode;
  /**
   * Render the More Results button
   * @returns
   */
  renderMoreResultsBtn(): VNode;
  renderBackToTopBtn(): VNode;
  /**
    * Get the sort options for the sort field
    * defaultOrder is the default sort order and order is the current order
    * label is unused but is here because it is required in ISortOption
    * Note that 'relevance' has null attributes. That is because selecting 'relevance'
    * is meant to remove any explicit sort field on our end and rely instead on the backing
    * API's ranking algorithm. In other words, it's actually the _absence_ of a sort field.
  */
  setSortOptions(sortOptions: SortOption[]): void;
  /**
 * Only render sort when set to do so
 * @returns the -search-sort component
 */
  renderSort(): VNode;
  handleFacetModalChange(newValue: boolean): void;
  openFacetModal(): void;
  /**
   * Forces the calcite-modal component to fire the calciteModalClose
   * event when the "View Results" button is clicked.
   */
  closeFacetModal(): void;
  /**
   * arcgis-wormhole prevents targeting of the underlying `calciteModalClose` event,
   * so binding this callback and firing a new custom event guarantees that consumers can
   * be notified that the modal is closed.
   *
   * @param event
   */
  onFacetModalClose(event: CustomEvent<any>): void;
  onFacetModalOpen(event: CustomEvent<any>): void;
  renderFacets(): VNode;
  renderDesktopFacets(facets: IFacet[]): VNode;
  renderMobileFacets(): VNode;
  actionHandler(evt: CustomEvent<{
    action: string;
    model: IHubCardViewModel;
  }>): void;
  get resultsComponent(): string;
  renderResults(): VNode;
  renderMain(): VNode;
  renderListHeader(): VNode;
  handleEntityCreated(_evt: Record<string, any>): Promise<void>;
  renderAddContent(): VNode;
  get selectable(): boolean;
  get selectionCount(): number;
  get hasSelection(): boolean;
  /**
   * Getter for the internal _bulkActions
   * Used so that we can augment each action with a key for rendering and a pre-bound action handler
   * @readonly
   * @type {IInternalComponentAction[]}
   * @memberof ArcgisHubGallery
   */
  get _bulkActions(): IInternalComponentAction[];
  /**
   * Handler for bulk actions
   * @param {IComponentAction} action
   * @memberof ArcgisHubGallery
   */
  handleBulkAction(action: IComponentAction): Promise<void>;
  /**
   * renders each bulk action
   * @param {IInternalComponentAction} action
   * @returns bulk action along with the tooltip associated with the action
   */
  renderBulkAction: (action: IInternalComponentAction) => VNode;
  renderBulkActions(): VNode;
  renderGalleryActionsPopover(): VNode;
  logGalleryActionsTelemetry(): void;
  renderListFooter(): VNode;
  renderResultsCount(): VNode;
  renderGallery(): VNode;
  /**
   * Render the gallery with the default layout
   */
  renderGalleryDefault(): VNode;
  renderLoadingScreen(): VNode;
  /**
   * Main Render
   * @returns
   */
  render(): any;
}
export {};
