import { EventEmitter } from '../../stencil-public-runtime';
import { IPost } from '@esri/hub-discussions';
import { IArcGISContext, IHubContent } from '@esri/hub-common';
import { IPostRelatedFeatureDetails, IPostDrawCreateDetails } from './utils/discussions';
import { Feature } from 'geojson';
import { ComponentIntl } from '../../utils/stencil-intl';
import { ArcgisHubDiscussionsBlockedNoticeVariant } from './components/arcgis-hub-discussions-blocked-notice/resources';
import { Tool } from '../arcgis-hub-map-widget-container/arcgis-hub-map-widget-draw/types';
import { IEntityDetails, IEnvironmentDetails, IPostSelectDetails, ThreadScrollTarget } from '../../utils/discussions/types';
import { IGroup } from '@esri/arcgis-rest-portal';
import { IWithContext } from '../../utils/state';
export declare class ArcgisHubDiscussions implements IWithContext {
  /**
   * Empty state impression should only be captured when no results exist on
   * initial load. We should not capture the impression of results exist and
   * the user deletes all original posts to get to the empty state.
   */
  deletedDuringSession: boolean;
  /**
   * A reference to the ArcgisHubDiscussionsOptionsElement
   */
  optionsElement: HTMLArcgisHubDiscussionsOptionsElement;
  /**
   * A reference to the HTMLArcgisHubDiscussionsPostListElement
   */
  postListEl: HTMLArcgisHubDiscussionsPostListElement;
  /**
   * A reference to the HTMLArcgisHubDiscussionsThreadElement
   */
  thread: HTMLArcgisHubDiscussionsThreadElement;
  /**
   * Reference to the discussion options action button
   */
  discussionOptionsActionEl: HTMLCalciteActionElement;
  /**
   * Reference to the discussion options popover
   */
  discussionOptionsPopoverEl: HTMLCalcitePopoverElement;
  /**
   * Reference to host element
   */
  element: HTMLArcgisHubDiscussionsElement;
  /**
   * An optional discussion URI string
   */
  discussion: string;
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
   * An optional location ID string used for displaying posts and replies that
   * reference an location by its' feature ID in the discussion URI
   */
  locationId: string;
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
   * If this component is embedded in a Hub site
   */
  isHub: boolean;
  /**
   * Whether to render channel avatar in the post header
   */
  showChannelAvatar: boolean;
  /**
   * Whether to render channel name in the post header
   */
  showChannelName: boolean;
  /**
   * If the calcite-panel renders the dismiss button
   */
  dismissible: boolean;
  /**
   * If the component renders the header action to go to current extent of posts on the map
   */
  enableGoTo: boolean;
  /**
   * If the component should disable back navigation
   */
  disableNavigation: boolean;
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
   * A string representing the element within the thread to auto scroll to. Either 'list', 'editor' or falsey
   */
  threadScrollTarget: ThreadScrollTarget;
  /**
   * Glboal context
   */
  _context: IArcGISContext;
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
   * A target post to auto-scroll to within the post-list upon clicking back from a thread
   */
  listScrollTarget: string;
  /**
   * Represents if dependencies are currently being loaded
   */
  _loading: boolean;
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
   * Represents if a catastrophic error was encountered that prevents this component
   * from rendering
   */
  error: Error;
  /**
   * Set when an error is encountered while updating discussion options
   */
  optionsError: Error;
  /**
   * True while waiting for discussion options requests to complete
   */
  optionsSaving: boolean;
  /**
   * If the user elected to create a new original post
   */
  showPostEditor: boolean;
  /**
   * If the body width is < 768px
   */
  isMobile: boolean;
  showOptions: boolean;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Emitted when the post or reply editor is first connected to the DOM
   */
  arcgisHubPostEditorReady: EventEmitter<IPost>;
  /**
   * Emitted to zoom to extent of current dicussion thread
   */
  arcgisHubGeometryGoTo: EventEmitter<IPost>;
  /**
   * Emitted when a discussions post or reply changes for map updates
   */
  arcgisHubDiscussionsFeature: EventEmitter<{
    post: IPost;
    create: boolean;
  }>;
  /**
   * Emitted when a discussions post or reply has been deleted for map updates
   */
  arcgisHubDiscussionsFeatureDeleted: EventEmitter<IPost>;
  /**
   * Emitted to select a feature on the map
   */
  arcgisHubGeometryFeatureSelect: EventEmitter<Feature>;
  /**
   * Emitted to highlight a feature on the map
   */
  arcgisHubGeometryFeatureHover: EventEmitter<Feature>;
  /**
   * Emitted when the user elects to draw a new geometry drawing on the map
   */
  arcgisHubGeometryDrawCreate: EventEmitter<IPostDrawCreateDetails>;
  /**
   * Emitted when the user selects a specific geometry type to draw
   */
  arcgisHubGeometryDrawTypeSelect: EventEmitter<Tool>;
  /**
   * Emitted when the user elects to edit an existing geometry drawing on the map
   */
  arcgisHubGeometryDrawEdit: EventEmitter<Feature>;
  /**
   * Emitted when the user elects to stop editing an existing geometry drawing on the map
   */
  arcgisHubGeometryDrawEditCancel: EventEmitter<void>;
  /**
   * Emitted when the user elects to reset an existing geometry drawing on the map
   */
  arcgisHubGeometryDrawReset: EventEmitter<void>;
  /**
   * Emitted to select a geometry drawing on the map
   */
  arcgisHubGeometrySelect: EventEmitter<string>;
  /**
   * Emitted to deselect a geometry drawing on the map
   */
  arcgisHubGeometryDeselect: EventEmitter<void>;
  /**
   * Emitted when the user transitions between thread and thread list views. Event detail
   * will be null when traversing to thread list, else will be the thread's original post id
   */
  arcgisHubDiscussionsViewThread: EventEmitter<{
    parentId: string;
    channelId: string;
  }>;
  /**
   * Emitted when dismissible is true and user clicks the panel dismiss button
   */
  arcgisHubDiscussionsDismiss: EventEmitter<void>;
  /**
   * Emitted when dicussions panel is closed
   */
  arcgisHubDiscussionsClose: EventEmitter<void>;
  /**
   * Emitted when a location should be removed from the map
   */
  arcgisHubFeatureRemove: EventEmitter<Feature>;
  /**
   * Emitted to clear geometry graphics unsaved in the map editor
   */
  arcgisHubGeometryClearAll: EventEmitter<void>;
  /**
   * Emits telemetry information
   */
  hubTelemetry: EventEmitter<any>;
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
   * Component did load lifecycle method, starts observer
   */
  componentDidLoad(): void;
  disconnectContext: () => void;
  /**
   * Connected callback lifecycle method, starts observer
   */
  connectedCallback(): void;
  /**
   * Disconnected callback lifecycle method, ends observing
   */
  disconnectedCallback(): void;
  /**
   * Loads dependencies and updates dpendency states
   */
  loadDependencies(): Promise<void>;
  /**
   * Loads translations and dependencies
   */
  initialize(): Promise<void>;
  /**
   * Loads translations
   */
  loadTranslations(): Promise<void>;
  /**
   * Fetches dependencies, enforcing a mimimum delay for skeleton state to be observed
   */
  fetchDependencies(): Promise<IEnvironmentDetails & IEntityDetails>;
  /**
   * Fetches dependencies
   */
  _fetchDependencies(): Promise<IEnvironmentDetails & IEntityDetails>;
  /**
   * Reloads dependencies when context changes
   */
  handleContextChanged(context?: IArcGISContext, prevContext?: IArcGISContext): void;
  /**
   * Resets state
   */
  resetState(): void;
  /**
   * Resets the active thread so the thread list renders
   */
  handleBackToList(): Promise<void>;
  /**
   * Starts observer
   */
  observe(): void;
  /**
   * Disconnects observer
   */
  disconnect(): void;
  /**
   * Scrolls to the given HTMLElement
   * @param target HTMLElement
   */
  scrollToTarget(target: HTMLElement): void;
  /**
   * Optionally scrolls to the post editor or post list upon drilling into a thread
   * when the Reply or View N replies actions are clicked
   */
  scrollToThreadTarget(): Promise<void>;
  /**
   * Scrolls to the post whose thread was most recently drilled into upon returning
   * to the post list
   */
  scrollToListTarget(): Promise<void>;
  /**
   * Handles user clicks to the new original post button
   */
  handleNewPost(): void;
  /**
   * Updates postListProps cache when the post results change
   * @param evt arcgisHubDiscussionsPostListUpdated event
   */
  handlePostListUpdated(evt: CustomEvent<void>): void;
  /**
   * Re-emits arcgisHubPostEditorReady so map integrator can reconcile the event
   * @param evt arcgisHubDiscussionsPostEditorReady event
   */
  handlePostEditorReady(evt: CustomEvent<IPost>): void;
  /**
   * Handles arcgisHubDiscussionsPostCancel events, hides the post authoring component
   * @param evt arcgisHubDiscussionsPostCancel event
   */
  handlePostCanceled(evt: CustomEvent<void>): void;
  /**
   * Handles arcgisHubDiscussionsPostCreate events, emits arcgisHubDiscussionsFeature
   * @param evt arcgisHubDiscussionsPostCreate event
   */
  handlePostCreate(evt: CustomEvent<IPost>): void;
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
   * Handles the event that's emitted when a post is deleted, removes the deleted post
   * from any cached post list or thread results
   * @param evt A arcgisHubDiscussionsPostDelete event
   */
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
   * Handles users clicking the back panel action when deep-linked to a reply
   */
  handleBackToThread(): void;
  /**
   * Emits event to zoom to current discussion graphics on map
   */
  handleGeometryGoTo(): void;
  /**
   * Handles the event that's emitted when a feature is to be selected on
   * the map
   * @param evt A custom event with a Feature payload
   */
  handleGeometryFeatureSelect(evt: CustomEvent<Feature>): void;
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
   * Handles the event that's emitted when a drawing geometry is to
   * be deselected on the map
   * @param evt A custom event
   */
  handleGeometryDeselect(evt: CustomEvent<void>): void;
  /**
   *
   * Handles the event that's emitted when a feature should
   * be removed from the map
   */
  handleFeatureRemove(evt: CustomEvent<Feature>): void;
  /**
   *
   * Handles the event to clear all staging graphics from
   * the map editor
   */
  handleGeometryClearAll(evt: CustomEvent<void>): void;
  /**
   * Handles event that's emitted when the calcite-panel is dismissed
   * @param evt A custom event
   */
  handleCalcitePanelDismissedChange(evt: CustomEvent<void>): void;
  /**
   * Handles event that's emitted when the calcite-panel close button is clicked
   * @param evt A custom event
   */
  handleCalcitePanelDismissChange(evt: CustomEvent<void>): void;
  /**
   * Captures empty state telemetry impression
   */
  captureEmptyListImpression(): void;
  /**
   * Handles clicks to the check status link when an error occurs
   */
  handleCheckStatus(evt: PointerEvent): void;
  /**
   * Debounces _checkIsMobile
   */
  checkIsMobile(): void;
  /**
   * Checks if the client is in a mobile layout
   */
  _checkIsMobile(el: HTMLElement): void;
  /**
   * Handles clicks to the Discussions Options calcite action
   */
  handleDiscussionOptionsClick(): void;
  handleDiscussionsDownloadClick(): Promise<void>;
  /**
   * Resets the view back to original post list from settings panel
   */
  handleOptionsBack(): void;
  /**
   * Updates the item or group with or without the cannotDiscuss typeKeyord
   * depending on their option selection
   */
  handleSaveOptions(): Promise<void>;
  /**
   * Resets the options error state
   */
  handleResetOptionsError(): void;
  /**
   * Computes true if intl or dependencies loading
   */
  get loading(): boolean;
  /**
   * A getter method that returns the appropriate view
   * for the current component state
   */
  get view(): () => HTMLElement;
  /**
   * Computes if the discussions options action should render in the panel header
   */
  get shouldRenderOptions(): boolean;
  /**
   * Computes blocked notice variant
   */
  get blockedNotice(): ArcgisHubDiscussionsBlockedNoticeVariant;
  /**
   * Renders the requires auth view
   */
  renderRequiresAuth(): HTMLElement;
  /**
   * Renders empty state
   */
  renderEmpty(): HTMLElement;
  /**
   * Renders the discussion options view
   */
  renderOptions(): HTMLElement;
  /**
   * Renders the post authoring component
   */
  renderPostEditor(): HTMLElement;
  /**
   * Renders the Add Post button
   */
  renderAddOrCreatePostButton(): HTMLElement;
  /**
   * Renders Go-to action in panel header
   */
  renderGoToAction(): HTMLElement;
  /**
   * Renders the thread list
   */
  renderPostList(): HTMLElement;
  /**
   * Renders the loading indicator when fetching content necessary
   * to render the UI
   */
  renderLoading(): HTMLElement;
  /**
   * Renders a generic error state if any of the XHRs responsible
   * for fetching content required to render the UI fails
   */
  renderError(): HTMLElement;
  /**
   * Renders an invidual thread
   */
  renderThread(): HTMLElement;
  /**
   * Primary render entrypoint
   */
  render(): any;
}
