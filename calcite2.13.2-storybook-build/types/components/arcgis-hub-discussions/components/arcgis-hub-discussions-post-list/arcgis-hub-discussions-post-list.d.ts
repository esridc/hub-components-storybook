import { EventEmitter } from '../../../../stencil-public-runtime';
import { IArcGISContext, IHubContent } from '@esri/hub-common';
import { DiscussionsBoardLayout, IPostRelatedFeatureDetails, IViewConfig } from '../../utils/discussions';
import { Feature, Geometry } from 'geojson';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { IGroup } from '@esri/arcgis-rest-portal';
import { IPost, ISearchPosts, PostSort, PostStatus, SharingAccess, SortOrder } from '@esri/hub-discussions';
import { IEntityDetails, IEnvironmentDetails } from '../../../../utils/discussions/types';
import { IWithContext } from '../../../../utils/state';
declare enum PostListView {
  List = "list",
  Loading = "isLoading"
}
interface IPostListViewConfigs {
  [PostListView.List]: IViewConfig;
  [PostListView.Loading]: IViewConfig;
}
/**
 * @slot list-before - A slot for adding custom content immediately before the list
 * @slot empty - A slot for adding custom empty state UI
 * @slot error - A slot for adding custom error state UI
 */
export declare class ArcgisHubDiscussionsPostList implements IWithContext {
  /**
   * Whether the list open impression was logged
   */
  impressionLogged: boolean;
  /**
   * Reference to the layout list element
   */
  layoutListRef: HTMLArcgisLayoutListElement;
  /**
   * Reference to host element
   */
  element: HTMLArcgisHubDiscussionsPostListElement;
  /**
   * A URI string representing the subject entity of the discussion, e.g. `hub://content/1fc` or `hub://group/2fc`.
   * When `entity`, `entityId`, and `entityType` are not provided, they will be fetched by parsing the URI.
   */
  discussion: string;
  /**
   * An optional UUID string of an IHubContent or IGroup representing the subject entity of the discussion.
   * If `entityId` and `entityType` are provided but `entity` is not, the entity will be fetched.
   */
  entityId: string;
  /**
   * An optional string representing the type (`content` or `group`) of subject entity of the discussion.
   * If `entityType` and `entityId` are provided but `entity` is not, the entity will be fetched.
   */
  entityType: string;
  /**
   * An optional reference to the IHubContent or IGroup representing the subject entity of the discussion.
   * If `entity` is not provided, it will be fetched using the given `entityId` & `entityType` or the given
   * `discussion`.
   */
  entity: IHubContent | IGroup;
  /**
   * An optional boolean indicating if the display field key configured by the layer is valid when entity is IHubContent
   */
  displayFieldValid: boolean;
  /**
   * An optional display field value as configured by the layer when entity is IHubContent. Will be fetched if not
   * explicitly provided.
   */
  displayFieldValue: string;
  /**
   * An optional display field key as configured by the layer when entity is IHubContent. Will be fetched if not
   * explicitly provided.
   */
  displayFieldKey: string;
  /**
   * If a map is present on the page
   */
  hasMap: boolean;
  /**
   * If this component is embedded in a Hub site
   */
  isHub: boolean;
  /**
   * A Feature selected from a map
   */
  unsavedFeatures: Feature[];
  /**
   * A related Feature from a map
   */
  unsavedRelatedFeatures: IPostRelatedFeatureDetails[];
  /**
   * Feature geometry edits for existing post locations
   */
  unsavedExistingFeatures: Feature[];
  /**
   * The next `start` value when fetching subsequent pages of results
   */
  nextStart: number;
  /**
   * The `start` value when fetching the original page of results
   */
  start: number;
  /**
   * The `total` number of results
   */
  total: number;
  /**
   * An Array of IPost results
   */
  items: IPost[];
  /**
   * The field to sort the results by
   */
  sortBy: PostSort;
  /**
   * The sort order of the results, either "ASC" or "DESC"
   */
  sortOrder: SortOrder;
  /**
   * Used to filter post results to those with a `title` value
   */
  titleText: string;
  /**
   * Used to filter post result to those with a `bodyText` value
   */
  bodyText: string;
  /**
   * Used to filter post results to those with a `geometry` value
   */
  geometry: Geometry;
  /**
   * Used to filter post results to those with a `featureGeometry` value
   */
  featureGeometry: Geometry;
  /**
   * Used to filter post results to those with specific `parentId` values
   */
  parentIds: string[];
  /**
   * Used to filter post results to those with a `creator` value
   */
  creator: string;
  /**
   * Used to filter post results to those with a `editor` value
   */
  editor: string;
  /**
   * Used to filter post results to those with specific `status` values
   */
  status: PostStatus[];
  /**
   * Used to filter post results to those with Channel configs containing the given `groupIds`
   */
  groupIds: string[];
  /**
   * Used to filter post results to those with specific `channelId` values
   */
  channelIds: string[];
  /**
   * Used to filter post results to those created before a specific date
   */
  createdBefore: Date | string | number;
  /**
   * Used to filter post results to those created after a specific date
   */
  createdAfter: Date | string | number;
  /**
   * Used to filter post results to those updated before a specific date
   */
  updatedBefore: Date | string | number;
  /**
   * Used to filter post results to those updated after a specific date
   */
  updatedAfter: Date | string | number;
  /**
   * Used to filter post results to those with Channel configs containing the given `access`
   */
  access: SharingAccess[];
  /**
   * Used to limit the number of results per page
   */
  num: number;
  /**
   * If the body width is < 768px
   */
  isMobile: boolean;
  /**
   * Used to filter post results to those with a discussion URI containing the given `locationId`
   */
  locationId: string;
  /**
   * The layout of the list, either `map`, `grid` or `list`
   */
  layout: DiscussionsBoardLayout;
  /**
   * Renders the layout actions when true
   */
  showLayoutActions: boolean;
  /**
   * Renders the search input when true
   */
  showSearchActions: boolean;
  /**
   * Renders the results counts when true
   */
  showCounts: boolean;
  /**
   * Renders the sort actions when true
   */
  showSortActions: boolean;
  /**
   * Render method to render custom post component configurations
   */
  renderPost: (post: IPost, index: number, posts: IPost[], loading?: boolean) => HTMLArcgisHubDiscussionsPostElement;
  /**
   * Controls whether the Add Location button and arcgis-hub-discussions-post-geography component render on posts
   */
  showLocations: boolean;
  /**
   * Disable 'Select' location draw action
   */
  disableSelectExistingLocation: boolean;
  /**
   * An alternative location description string
   */
  locationDescriptionText: string;
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
  _context: IArcGISContext;
  /**
   * If results are being fetched
   */
  pending: boolean;
  /**
   * Any error that occurred while fetching post search results
   */
  error: Error;
  /**
   * An Array of postIds whose details have been fetched. Used to force skeleton state for all posts within a page of results
   * until all that page's post results have loaded their details
   */
  loadedPostIds: string[];
  /**
   * Represents when all elements (post, post editor, reply or post list) have emitted their ready events
   */
  ready: boolean;
  /**
   * An array of post ids for the most recently fetched page of results, used to force loading state for an entire page
   * of results until all those posts' dependencies have loaded
   */
  mostRecentPagePostIds: string[];
  /**
   * True when dependencies are being fetched
   */
  _loading: boolean;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Emitted when the search results have been updated
   */
  arcgisHubDiscussionsPostListUpdated: EventEmitter<void>;
  /**
   * Emitted when all the posts dependencies have been loaded
   */
  arcgisHubDiscussionsPostListReady: EventEmitter<void>;
  /**
   * Emitted when layout is changed
   */
  arcgisHubDiscussionsPostListLayoutChanged: EventEmitter<DiscussionsBoardLayout>;
  /**
   * Emits hub telemetry events
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Constructor function, pre-binds context to necessary methods
   */
  constructor();
  /**
   * Component will load lifecycle hook
   */
  componentWillLoad(): Promise<void>;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Loads translations and dependencies
   */
  initialize(): Promise<void>;
  /**
   * Loads translations
   */
  loadTranslations(): Promise<void>;
  /**
   * Loads dependencies
   */
  loadDependencies(): Promise<void>;
  /**
   * Wraps the _fetchDependencies method with a minimum delay so
   * skeleton state can be observed
   */
  fetchDependencies(): Promise<IEnvironmentDetails & IEntityDetails>;
  /**
   * Fetches dependencies
   */
  _fetchDependencies(): Promise<IEnvironmentDetails & IEntityDetails>;
  /**
   * Reloads dependencies when context changes
   */
  handleContextChanged(context: IArcGISContext, prevContext: IArcGISContext): Promise<void>;
  /**
   * Watches for changes to ready and emits arcgisHubDiscussionsPostListReady when ready is true
   */
  handleReadyChanged(ready: boolean): void;
  /**
   * Watches for changes to loadedPostIds and updates ready once all elements ready events have fired
   */
  handleLoadedPostIdsChanged(loadedPostIds: string[]): void;
  /**
   * Emits the post list open event
   */
  emitPostListOpenEvent(success: boolean): void;
  /**
   * Handles arcgisHubDiscussionsPostReady events, adds the post's id to loadedPostIds
   * so skeleton state can be determined on a page-by-page basis
   * @param evt arcgisHubDiscussionsPostReady event
   */
  handlePostReady(evt: CustomEvent<void>): void;
  /**
   * Handles arcgisLayoutListLayoutSelected events and reemits own event arcgisHubDiscussionsPostListLayoutChanged
   * @param evt arcgisLayoutListLayoutSelected event
   */
  handleLayoutSelected(evt: CustomEvent<DiscussionsBoardLayout>): void;
  /**
   * Computes an array of sort menu config objects used to render the sort dropdown items
   */
  get sortByMenuConfigs(): {
    label: string;
    value: PostSort;
  }[];
  /**
   * The config from `sortByMenuConfigs` for the currently actived sort parameter
   */
  get activeSortConfig(): {
    label: string;
    value: PostSort;
  };
  /**
   * True when the user's locale is rtl. Used to flip some margins that cause alignment issues
   * in rtl languages.
   */
  get isRtl(): boolean;
  /**
   * Computes the view config
   */
  get views(): IPostListViewConfigs;
  /**
   * Computes true when intl, _context, or items are not truthy
   */
  get isLoading(): boolean;
  /**
   * Computes the active view and returns it's markup
   */
  get view(): IViewConfig;
  /**
   * Handles arcgisHubDiscussionsPostDelete events, updates local state and emits
   * arcgisHubDiscussionsPostListUpdated if results changed
   * @param evt arcgisHubDiscussionsPostDelete event
   */
  handlePostDeleted(evt: CustomEvent<IPost>): void;
  /**
   * Handles arcgisHubDiscussionsPostCreate events, reconciles if the post should be added
   * to this post list instance, updates state and emits arcgisHubDiscussionsPostListUpdated accordingly
   * @param evt arcgisHubDiscussionsPostCreate event
   */
  handlePostCreated(evt: CustomEvent<IPost>): void;
  /**
   * Handles arcgisHubDiscussionsPostEdit events, updates local state and emits
   * arcgisHubDiscussionsPostListUpdated if results changed
   * @param evt arcgisHubDiscussionsPostEdit event
   */
  handlePostEdited(evt: CustomEvent<IPost>): void;
  /**
   * Handles arcgisLoadMoreChange events and initiatives fetching of the next page of search results
   * @param evt arcgisLoadMoreChange event
   */
  handleLoadMoreChange(evt: CustomEvent<number>): void;
  /**
   * Method to obtain an ArcgisHubDiscussionsPostElement reference for a given postId string
   * @param postId A UUID string representing the id of a post
   * @returns ArcgisHubDiscussionsPostElement
   */
  getPostRefByPostId(postId: string): Promise<HTMLArcgisHubDiscussionsPostElement>;
  /**
   * Handles changes to sortBy property, performs a fresh search
   */
  handleSortByChanged(): void;
  /**
   * Sets sortBy property to the data-value attribute value when a user clicks
   * a sortBy action
   */
  handleSortBySelect(evt: CustomEvent<any>): void;
  /**
   * Computes a ISearchPosts object used to search for posts
   */
  get searchParams(): ISearchPosts;
  /**
   * Searches for a page of post results and updates state
   * @param start The `start` value for the search
   */
  searchPosts(start: number): Promise<void>;
  /**
   * Renders the `1 - N of X` count text
   */
  renderCount(): HTMLElement;
  /**
   * Renders the sort by dropdown menu
   */
  renderSortByDropdown(): HTMLElement;
  /**
   * Toggles the `sortOrder` when the user clicks the sort direction action
   */
  handleSortOrderSelected(): void;
  /**
   * Handles users changing search input text
   */
  handleSearchInputChanged(evt: CustomEvent<any>): void;
  /**
   * Handles changes to `sortOrder`, initiates a new search
   */
  handleSortOrderChanged(): void;
  /**
   * Handles changes to `bodyText`, initiates a new search
   */
  handleBodyChanged(): void;
  /**
   * Renders the sort direction action
   */
  renderSortDirectionAction(): HTMLElement;
  /**
   * Renders the search control
   */
  renderSearch(): HTMLElement;
  /**
   * Renders the list of posts
   */
  renderList(): HTMLElement;
  /**
   * Calls and returns the result of `renderPost`, if provied, else renders a default implementation of a post component
   * as used by the private content discussions
   * @param post The post record
   * @param index The post record index
   * @param posts An Array of all post records
   */
  _renderPost(post: IPost, index: number, posts: IPost[]): HTMLElement;
  /**
   * Renders the count, sort & layout actions
   */
  renderCountAndActions(): HTMLElement;
  /**
   * Renders the actions and list of posts
   */
  renderListAndActions(): HTMLElement;
  /**
   * Renders the skelton state
   * @returns
   */
  renderLoading(): HTMLElement;
  /**
   * Renders the slot[name="empty"]
   */
  renderEmpty(): HTMLElement;
  /**
   * Renders the slot[name="error"]
   */
  renderError(): HTMLElement;
  /**
   * Primary render entrypoint
   */
  render(): any;
}
export {};
