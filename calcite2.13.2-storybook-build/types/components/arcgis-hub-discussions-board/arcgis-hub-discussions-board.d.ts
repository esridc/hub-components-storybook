/// <reference types="arcgis-js-api" />
import { IGroup } from '@esri/arcgis-rest-portal';
import { IArcGISContext, IDiscussionsSettings, IHubContent } from '@esri/hub-common';
import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IChannelDetails, IEntityDetails, IEnvironmentDetails, IPostSelectDetails, ThreadScrollTarget } from '../../utils/discussions/types';
import { IChannel, IPost } from '@esri/hub-discussions';
import { DiscussionBoardView, DiscussionsBoardLayout, IPostDrawCreateDetails, IPostRelatedFeatureDetails } from '../arcgis-hub-discussions/utils/discussions';
import { Feature } from 'geojson';
import { Tool } from '../arcgis-hub-map-widget-container/arcgis-hub-map-widget-draw/types';
import { Geometry } from 'geojson';
import { IWithContext } from '../../utils/state';
interface INoticeConfig {
  title: string;
  message?: string;
  kind: string;
  link?: {
    text: string;
    href?: string;
    action?: () => void;
  };
  icon?: string;
}
export declare class ArcgisHubDiscussionsBoard implements IWithContext {
  /**
    * A reference to the HTMLArcgisHubDiscussionsThreadElement
    */
  thread: HTMLArcgisHubDiscussionsThreadElement;
  /**
   * A reference to the HTMLArcgisHubDiscussionsPostListElement
   */
  postListEl: HTMLArcgisHubDiscussionsPostListElement;
  /**
   * The feature that the map-integrator should
   * select on initial render
   */
  activeFeature: Feature;
  /**
   * A reference to the hero & content container, used as the scroll recipient
   * in desktop map layout
   */
  heroContentContainerEl: HTMLElement;
  /**
   * Reference to the discussion options action button
   */
  discussionOptionsActionEl: HTMLCalciteActionElement;
  /**
   * Reference to the discussion options popover
   */
  discussionOptionsPopoverEl: HTMLCalcitePopoverElement;
  /**
   * A reference to the host element
   */
  element: HTMLArcgisHubDiscussionsBoardElement;
  /**
   * A reference to the discussion board entity (content or group). If not provided, it will
   * be fetched using the given `entityId` and `entityType`.
   */
  entity?: IHubContent | IGroup;
  /**
   * The UUID of the discussion board entity (content or group). Can be provided when a reference
   * to the `entity` is not availabile in a higher scope.
   */
  entityId?: string;
  /**
   * The type of discussion board entity (content or group). Can be provided when a reference
   * to the `entity` is not availabile in a higher scope.
   */
  entityType?: string;
  /**
   * An optional UUID string of a parent post. Required when
   * `postId` is provided. Used when deep linking to a parent
   * or a reply
   */
  parentId: string;
  /**
   * An optional UUID string of a reply post. Used when deep linking
   * to a reply
   */
  postId: string;
  /**
   * An optional channel ID string used for deep-linking to a specific post or reply.
   * Required when parentId is provided.
   */
  channelId: string;
  /**
   * If the discussion board component is rendered within the context of a Hub Site application.
   * If not explicitly provided, the domain record will be fetched from the domains service to
   * determine.
   */
  isHub?: boolean;
  /**
   * If the body width is < 768px
   */
  isMobile?: boolean;
  /**
   * The layout of when view is `explore`, either `map`, `grid` or `list`
   */
  layout: DiscussionsBoardLayout;
  /**
   * Features (geometries) unsaved for location updates
   */
  unsavedFeatures: Feature[];
  /**
   * Related Features (ID's of features in associated feature service) unsaved for location updates
   */
  unsavedRelatedFeatures: IPostRelatedFeatureDetails[];
  /**
   * Feature geometry edits for existing post locations
   */
  unsavedExistingFeatures: Feature[];
  /**
   * If a map is present in the DOM that this component should integrate with
   */
  hasMap: boolean;
  /**
   * The view of the component, either `explore` or `about`
   */
  view: DiscussionBoardView;
  /**
   * Global context
   */
  _context: IArcGISContext;
  /**
   * Allowed channel ids array from entity settings
   */
  allowedChannelIds: string[];
  /**
   * Allowed locations array from entity settings
   */
  allowedLocations: Geometry[];
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
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * True when dependencies are being fetched
   */
  pending: boolean;
  /**
   * The channel record, when configured
   */
  channel: IChannel;
  /**
   * The channel groups, when channel is configured
   */
  channelGroups: IGroup[];
  /**
   * Discussion URI for the idea board
   */
  discussion: string;
  /**
   * Blocked words array from discussion settings
   */
  blockedWords: string[];
  /**
   * Default Channel ID from discussion settings
   */
  defaultChannelId: string;
  /**
   * A map of post element references per post id. `postRef` stores a reference to the post component so fetched properties
   * can be passed to other components without managing that state internally.
   */
  postRefs: Record<string, HTMLArcgisHubDiscussionsPostElement>;
  /**
    * A target post to auto-scroll to within the post-list upon clicking back from a thread
    */
  listScrollTarget: string;
  /**
   * A string representing the element within the thread to auto scroll to. Either 'list', 'editor' or falsey
   */
  threadScrollTarget: ThreadScrollTarget;
  /**
   * A cache of properties used to pre-populate the post list element with a set of results upon clicking back
   * from a thread and auto-scroll to the previously selected post.
   */
  postListProps: Record<string, any>;
  /**
    * A cache of properties used to pre-populate the parent post within a thread
    */
  threadProps: Record<string, any>;
  /**
   * MapView instance
   */
  mapView: __esri.MapView;
  /**
   * Reference to draw tool element
   */
  drawRef: HTMLArcgisHubMapWidgetDrawElement;
  /**
   * Reference to search tool element
   */
  searchRef: HTMLArcgisHubMapWidgetSearchElement;
  /**
   * Emitted when the user transitions between thread and original post list views. Event detail
   * will be null when traversing to original post list, else will be the thread's original post id
   */
  arcgisHubDiscussionsViewThread: EventEmitter<{
    parentId: string;
    channelId: string;
  }>;
  /**
   * Prompts the app identity manager to start sign in process
   */
  arcgisAppIdentityStartSignIn: EventEmitter<void>;
  /**
   * Emitted when a discussions post or reply has been deleted for map updates (map-integration)
   */
  arcgisHubDiscussionsFeatureDeleted: EventEmitter<IPost>;
  /**
   * Emitted when a discussions post or reply changes for map updates (map-integration)
   */
  arcgisHubDiscussionsFeature: EventEmitter<{
    post: IPost;
    create: boolean;
  }>;
  /**
   * Emitted when the post or reply editor is first connected to the DOM (map-integration)
   */
  arcgisHubPostEditorReady: EventEmitter<IPost>;
  /**
   * Emitted to select a feature on the map (map-integration)
   */
  arcgisHubGeometryFeatureSelect: EventEmitter<Feature>;
  /**
   * Emitted to highlight a feature on the map (map-integration)
   */
  arcgisHubGeometryFeatureHover: EventEmitter<Feature>;
  /**
   * Emitted when the user elects to draw a new geometry drawing on the map (map-integration)
   */
  arcgisHubGeometryDrawCreate: EventEmitter<IPostDrawCreateDetails>;
  /**
   * Emitted when the user selects a specific geometry type to draw (map-integration)
   */
  arcgisHubGeometryDrawTypeSelect: EventEmitter<Tool>;
  /**
   * Emitted when the user elects to edit an existing geometry drawing on the map (map-integration)
   */
  arcgisHubGeometryDrawEdit: EventEmitter<Feature>;
  /**
   * Emitted when the user elects to stop editing an existing geometry drawing on the map (map-integration)
   */
  arcgisHubGeometryDrawEditCancel: EventEmitter<void>;
  /**
   * Emitted when the user elects to reset an existing geometry drawing on the map (map-integration)
   */
  arcgisHubGeometryDrawReset: EventEmitter<void>;
  /**
   * Emitted to select a geometry drawing on the map (map-integration)
   */
  arcgisHubGeometrySelect: EventEmitter<string>;
  /**
   * Emitted to deselect a geometry drawing on the map (map-integration)
   */
  arcgisHubGeometryDeselect: EventEmitter<void>;
  /**
   * Emitted when a location should be removed from the map (map-integration)
   */
  arcgisHubFeatureRemove: EventEmitter<Feature>;
  /**
   * Emitted to clear geometry graphics unsaved in the map editor (map-integration)
   */
  arcgisHubGeometryClearAll: EventEmitter<void>;
  /**
   * Emits hub telemetry
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Emitted when the view of the component changes
   */
  arcgisHubDiscussionsViewChanged: EventEmitter<DiscussionBoardView>;
  /**
   * Emitted when the layout of the component changes when `view` is `explore`
   */
  arcgisHubDiscussionsLayoutChanged: EventEmitter<DiscussionsBoardLayout>;
  /**
   * Pre-binds context to methods that get passed as references/callbacks.
   * @constructor
   */
  constructor();
  /**
   * Component will load lifecycle event, loads translations and dependencies
   */
  componentWillLoad(): void;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Loads translations
   */
  loadTranslations(): Promise<void>;
  /**
   * Loads dependencies and manages pending state
   */
  loadDependencies(): Promise<void>;
  /**
   * Handles changes to `context`, loads dependencies
   * @param context
   * @param prevContext
   */
  handleContextChanged(context: IArcGISContext, prevContext: IArcGISContext): void;
  /**
   * From within the 'about flow' panel header, set view to
   * default when user clicks back
   */
  handleAboutBack(): void;
  handleSignInClicked(): void;
  handleLayoutToggleClicked(): void;
  /**
   * Set's mapView state to instance emitted by arcgisHubMapViewReady and
   * clears any default UI components
   */
  handleMapViewReady(evt: CustomEvent<{
    view: __esri.MapView;
  }>): Promise<void>;
  /**
   * Fetches dependencies, enforcing a mininimum delay so skeleton state can be observed
   */
  fetchDependencies(): Promise<IEnvironmentDetails & IEntityDetails & IDiscussionsSettings & IChannelDetails>;
  /**
   * Fetches and resolves all dependencies
   */
  _fetchDependencies(): Promise<IEnvironmentDetails & IEntityDetails & IDiscussionsSettings & IChannelDetails>;
  /**
   * Computes true when intl or dependencies are loading or context is not provided
   */
  get isLoading(): boolean;
  /**
   * Determines if the board is open for discussions.
   */
  get isOpenForSubmissions(): boolean;
  /**
   * Computes the appropriate access icon configuration
   */
  get accessIcon(): {
    icon: string;
    label: string;
  };
  /**
   * Computes the notice configuration
   */
  get noticeConfig(): INoticeConfig;
  /**
   * Computes the relative workspace url for the discussion board
   */
  get relativeWorkspaceUrl(): string;
  /**
   * The alternative location description string when not in map layout
   */
  get locationDescriptionText(): string;
  get allowedLocationsArcGIS(): __esri.Polygon[];
  /**
   * The entity's map settings values,
   * allows for custom map or scene under discussion
   * e.g.: { baseViewItemId: 'abc123' }
   */
  get mapSettings(): any;
  /**
   * Sanitizes the entity prompt
   */
  get sanitizedEntityPrompt(): string;
  handlePostDeleted(evt: CustomEvent<IPost>): Promise<void>;
  /**
   * Handles the event that's emitted when a post is edited, updates the edited post
   * from any cached post list or thread results
   * @param evt A arcgisHubDiscussionsPostEdit event
   */
  handlePostEdited(evt: CustomEvent<IPost>): Promise<void>;
  /**
   * Handles arcgisHubDiscussionsPostSelect events and emits arcgisHubDiscussionsViewThread
   * when a user elects to view a full thread
   * @param evt A arcgisHubDiscussionsPostEdit event
   */
  handlePostSelect(evt: CustomEvent<IPostSelectDetails>): void;
  /**
   * Handles arcgisHubDiscussionsPostListLayoutChanged events to modify layout when switched
   * to map layout
   * @param evt arcgisHubDiscussionsPostListLayoutChanged event
   */
  handleLayoutChanged(evt: CustomEvent<DiscussionsBoardLayout>): void;
  /**
   * Re-emits arcgisHubPostEditorReady so map integrator can reconcile the event
   * @param evt arcgisHubDiscussionsPostEditorReady event
   */
  handlePostEditorReady(evt: CustomEvent<IPost>): void;
  /**
   * Handles arcgisHubDiscussionsPostCreate events, emits arcgisHubDiscussionsFeature
   * @param evt arcgisHubDiscussionsPostCreate event
   */
  handlePostCreate(evt: CustomEvent<IPost>): void;
  /**
   * Handles the event that's emitted when a feature is to be selected on
   * the map
   * @param evt A custom event with a Feature payload
   */
  handleGeometryFeatureSelect(evt: CustomEvent<Feature>): void;
  handleDrawDone(): void;
  /**
   * Handles the event that's emitted when a feature is hovered on
   * the map
   * @param evt A custom event with a Feature payload
   */
  handleGeometryFeatureHover(evt: CustomEvent<Feature>): void;
  /**
   * Handles the event that's emitted when a drawing geometry is to be
   * captured on the map
   * @param evt A custom event with post or reply ID payload
   */
  handleGeometryDrawCreate(evt: CustomEvent<IPostDrawCreateDetails>): void;
  /**
   * Handles the event that's emitted when a user selects a specific
   * geometry type to draw
   * @param evt A custom event with type Tool payload
   */
  handleGeometryDrawTypeSelect(evt: CustomEvent<Tool>): void;
  /**
   * Handles the event that's emitted when a drawing is to be edited
   * on the map
   * @param evt A custom event with a Feature payload
   */
  handleGeometryDrawEdit(evt: CustomEvent<Feature>): void;
  /**
   * Handles the event that's emitted when a drawing that is being edited
   * on the map is canceled
   * @param evt A custom event with a Feature payload
   */
  handleGeometryDrawEditCancel(evt: CustomEvent<void>): void;
  /**
   * Handles the event that's emitted when a drawing is to be reset
   * on the map
   * @param evt A custom event
   */
  handleGeometryDrawReset(evt: CustomEvent<boolean>): void;
  /**
   * Handles the event that's emitted when a drawing geometry is to
   * be selected on the map
   * @param evt A custom event with a post or reply ID payload
   */
  handleGeometrySelect(evt: CustomEvent<string>): void;
  /**
   *
   * Handles the event that's emitted when a feature should
   * be removed from the map
   */
  handleFeatureRemove(evt: CustomEvent<Feature>): void;
  /**
   * Handles the event that's emitted when a drawing geometry is to
   * be deselected on the map
   * @param evt A custom event
   */
  handleGeometryDeselect(evt: CustomEvent<void>): void;
  /**
   *
   * Handles the event to clear all staging graphics from
   * the map editor
   */
  handleGeometryClearAll(evt: CustomEvent<void>): void;
  handleDiscussionsDownloadClick(): Promise<void>;
  /**
   * Scrolls to the given HTMLElement
   * @param target HTMLElement
   */
  scrollToTarget(target: HTMLElement): void;
  /**
   * Updates the view to the given view and emits an arcgisHubDiscussionsLayoutChanged
   * event with the given layout
   * @param layout
   */
  changeView(view: DiscussionBoardView): void;
  /**
   * Updates the layout to the given layout and emits an arcgisHubDiscussionsLayoutChanged
   * event with the given layout
   * @param layout
   */
  changeLayout(layout: DiscussionsBoardLayout): void;
  /**
   * Optionally scrolls to the post editor or post list upon drilling into a thread
   * when the Reply or View N replies actions are clicked,
   */
  scrollToThreadTarget(): Promise<void>;
  /**
   * Scrolls to the post whose thread was most recently drilled into upon returning
   * to the post list
   */
  scrollToListTarget(): Promise<void>;
  /**
   * Handles arcgisHubDiscussionsThreadReady event and calls scrollToThreadTarget
   * after a short delay
   */
  handleThreadReady(): void;
  /**
   * Handles arcgisHubDiscussionsPostListReady event and calls scrollToListTarget
   * after a short delay
   */
  handlePostListReady(): void;
  /**
   * Updates postListProps cache when the post results change
   * @param evt arcgisHubDiscussionsPostListUpdated event
   */
  handlePostListUpdated(evt: CustomEvent<void>): void;
  /**
   * Handles users clicking the back panel action when deep-linked to a parent post
   */
  handleBackToList(): void;
  /**
   * Handles users clicking the back panel action when deep-linked to a reply
   */
  handleBackToThread(): void;
  /**
   * Handles `arcgisHubDiscussionsPostReady` event and updates `postRefs` with a reference to
   * the post element.
   */
  handlePostReady(evt: CustomEvent<void>): void;
  /**
   * Handles about this discussion board being clicked and changes view
   */
  handleAboutSelected(event: KeyboardEvent): void;
  /**
   * Renders the skeleton ui
   */
  renderSkeleton(): HTMLElement;
  /**
   * Renders the channel status
   */
  renderHeroChannelStatus(): HTMLElement;
  /**
   * Renders the entity info
   */
  renderHeroEntityInfo(): HTMLElement;
  /**
   * Renders the hero thumbnail
   */
  renderHeroThumbnail(): HTMLElement;
  /**
   * Renders the hero links
   */
  renderHeroLinks(): HTMLElement;
  /**
   * Renders the hero intro section
   */
  renderHeroIntro(): HTMLElement;
  /**
   * Renders the hero section
   */
  renderHero(): HTMLElement;
  /**
   * Renders the post editor
   */
  renderEditor(): HTMLElement;
  /**
   * Custom render method for discussion board original posts
   * @param post The post record
   * @param index The post index
   * @param posts An Array of all post records
   * @param loading If the post is in a forced loading state, e.g. waiting for all posts within a page of results to finish loading their dependencies
   */
  renderParent(post: IPost, index: number, posts: IPost[], loading?: boolean): HTMLArcgisHubDiscussionsPostElement;
  /**
   * Renders the post list
   */
  renderPostList(): HTMLElement;
  /**
   * Renders the thread
   */
  renderThread(): HTMLElement;
  /**
   * Renders notices
   */
  renderNotice(): HTMLElement;
  /**
   * Renders the post-editor & post-list
   */
  renderEditorAndPostList(): HTMLElement;
  /**
   * Renders the discussion board content (post-editor, post-list, thread & notices)
   */
  renderContent(): HTMLElement;
  /**
   * Renders the 'about' view
   */
  renderAbout(): HTMLElement;
  /**
   * Renders the map and map-integrator
   */
  renderMap(): HTMLElement;
  /**
   * Renders the discussion board
   */
  renderExplore(): HTMLElement;
  /**
   * Renders the map/list toggle button on mobile
   */
  renderMapListToggle(): HTMLElement;
  renderMapIntegrator(): HTMLElement;
  /**
   * Renders the discussion board
   */
  renderBoard(): HTMLElement;
  /**
   * Primary render method
   */
  render(): any;
}
export {};
