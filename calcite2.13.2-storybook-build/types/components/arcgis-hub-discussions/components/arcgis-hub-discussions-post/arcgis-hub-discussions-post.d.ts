import { EventEmitter } from '../../../../stencil-public-runtime';
import { HTMLCalciteActionElement, HTMLCalciteActionGroupElement, HTMLCalcitePopoverElement } from '@esri/calcite-components/dist';
import { IPost, IChannel } from '@esri/hub-discussions';
import { IArcGISContext, IHubContent, RemoteServerError } from '@esri/hub-common';
import { Feature } from 'geojson';
import { IPostRelatedFeatureDetails, IViewConfig } from '../../utils/discussions';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { IGroup, IPortal, IUser } from '@esri/arcgis-rest-portal';
import { IChannelDetails, IEntityDetails, IEnvironmentDetails, IMentionedUserDetails, IParentDetails, IParentUserDetails, IPostDetails, IPostMentionedUserDetails, IPostSelectDetails, IPostUserDetails } from '../../../../utils/discussions/types';
import { IWithContext } from '../../../../utils/state';
declare enum PostView {
  Skeleton = "skeleton",
  Post = "post",
  Reply = "reply",
  OutOfContext = "outOfContext",
  Editor = "editor",
  Deleted = "deleted",
  Hidden = "hidden"
}
interface IPostViewConfigs {
  [PostView.Skeleton]: IViewConfig;
  [PostView.Post]: IViewConfig;
  [PostView.Reply]: IViewConfig;
  [PostView.OutOfContext]: IViewConfig;
  [PostView.Editor]: IViewConfig;
  [PostView.Deleted]: IViewConfig;
  [PostView.Hidden]: IViewConfig;
}
declare enum ANIMATION_CLASSES {
  IN = "in",
  OUT = "out",
  HIDDEN = "hidden"
}
/**
 * @slot editor - A slot to render an arcgis-hub-discussions-post-editor component instance with custom configuration
 * @slot metadata - A slot to render an arcgis-hub-discussions-post-header component instance with custom configuration
 */
export declare class ArcgisHubDiscussionsPost implements IWithContext {
  /**
   * Reference to calcite-popover that renders calcite-action items
   */
  menuPopoverElement: HTMLCalcitePopoverElement;
  /**
   * Deleted post impression should only be captured when viewing a deleted post
   * via a deep link. It should not be captured if the user elects to delete the
   * post during the session.
   */
  deletedDuringSession: boolean;
  /**
   * Reference to the copy tooltip element
   */
  copyTooltipRef: HTMLCalciteTooltipElement;
  /**
   * Reference to the copy link action when available
   */
  copyActionRef: HTMLCalciteActionElement;
  /**
   * Reference to calcite-action that triggers menu popover to open
   */
  menuActionElement: HTMLCalciteActionElement;
  /**
   * An optional UUID string of an existing IPost to edit. If `postId`
   * is provided but `post` is not, the IPost record will be fetched.
   */
  postId: string;
  /**
   * An optional reference to an existing IPost to edit. If `post` is not provided
   * but `postId` is, the IPost record will be fetched.
   */
  post: IPost;
  /**
   * An optional reference to an IUser representing the post author. If not
   * provided, the IUser record will be fetched.
   */
  postCreator: IUser;
  /**
   * An optional reference to an existing IPortal object representing the post author's
   * organization. If not provided, the IPortal record will be fetched.
   */
  postCreatorOrg: IPortal;
  /**
   * An optional reference to a RemoteServerError related to the fetch request for the post
   */
  postError: RemoteServerError;
  /**
   * An optional reference to an IMentionedUserDetails array representing the mentioned users
   * within the post body. If not provided, will be fetched.
   */
  postMentionedUsers: IMentionedUserDetails[];
  /**
   * An optional UUID string of post's IChannel.
   */
  channelId: string;
  /**
   * An optional reference to an IChannel representing the channel the post was created within.
   * If not provided, will be fetched.
   */
  channel: IChannel;
  /**
   * An optional Array of IGroup objects representing a private IChannel groups. If `channelGroups` is
   * not provided, it will be fetched.
   */
  channelGroups: IGroup[];
  /**
   * An optional UUID string of a parent IPost. If `parentId` is provided
   * but `parent` is not, the IPost record for the parent will be fetched.
   */
  parentId: string;
  /**
   * An optional reference to a parent IPost. If `parentId`
   * is provided, but `parent` is not, the IPost record will be fetched.
   */
  parent: IPost;
  /**
   * An optional reference to an IUser representing the parent post author. If not
   * provided, the IUser record will be fetched.
   */
  parentCreator: IUser;
  /**
   * An optional reference to an IPortal representing the parent post author's org. If not
   * provided, the IPortal record will be fetched.
   */
  parentCreatorOrg: IPortal;
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
   * Truncates the post body text, adds Read More link that links to full thread
   */
  preview: boolean;
  /**
   * An optional index when the post is rendered within a list
   */
  index: number;
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
   * If the body width is < 768px
   */
  isMobile: boolean;
  /**
   * A UUID string representing a feature ID on the map that is the target of the discussion
   */
  locationId: string;
  /**
   * Render the lead line
   */
  lead: boolean;
  /**
   * The last index number when the post is rendered within a list
   */
  lastIndex: number;
  /**
   * Renders skeleton state when true
   */
  loading: boolean;
  /**
   * Controls whether the Add Location button and arcgis-hub-discussions-post-geography component render in the post-editor
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
   * Enforces minimum height for the component. This is used to prevent a janky user
   * experience where this component briefly collapses down between transitions
   * between the post content and post editor views when a user elects to edit the
   * post.
   */
  minHeight: number;
  /**
   * If <arcgis-hub-discussions-popover /> is open
   */
  popoverIsOpen: boolean;
  /**
   * Animation class to be applied to the article element when transitioning
   * between post content and post editor views
   */
  articleClass: ANIMATION_CLASSES;
  /**
   * Animation class to be applied to the editor element when transitioning
   * between post content and post editor views
   */
  editorClass: ANIMATION_CLASSES;
  /**
   * A reference to the article or post editor component
   */
  renderedEl: HTMLElement;
  /**
   * The user elected to edit the post
   */
  editing: boolean;
  /**
   * An event failed
   */
  errorMessage: string;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Whether or not the deep link to the post has been copied
   */
  isCopied: boolean;
  /**
   * If dependencies are currently being fetched
   */
  _loading: boolean;
  /**
   * A reference to the host element
   */
  element: HTMLArcgisHubDiscussionsPostElement;
  /**
   * Emitted when the user successfully edits an existing post
   */
  arcgisHubDiscussionsPostEdit: EventEmitter<IPost>;
  /**
   * Emitted when an orignal post is deleted
   */
  arcgisHubDiscussionsPostDelete: EventEmitter<IPost>;
  /**
   * Emitted when the user elects to traverse to the full thread view
   * by clicking Read More link or the num replies action
   */
  arcgisHubDiscussionsPostSelect: EventEmitter<IPostSelectDetails>;
  /**
   * Emitted when the arcgisHubDiscussionsPostCancel event is handled
   */
  arcgisHubDiscussionsGeometryDrawReset: EventEmitter<void>;
  /**
   * Emitted when the arcgisHubDiscussionsPostCancel event is handled
   */
  arcgisHubDiscussionsGeometryDeselect: EventEmitter<void>;
  /**
   * Emits telemetry information
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Emitted when the post's dependencies have been fetched
   */
  arcgisHubDiscussionsPostReady: EventEmitter<void>;
  /**
   * Constructor method, pre-bind context to methods that are passed by reference
   */
  constructor();
  disconnectContext: () => void;
  /**
   * Connected callback lifecycle hook
   */
  connectedCallback(): void;
  /**
   * Component will load lifecycle hook
   */
  componentWillLoad(): void;
  /**
   * Disconnected callback lifecycle hook
   */
  disconnectedCallback(): void;
  /**
   * Handles arcgisHubDiscussionsPostViewAllGeography events from parent posts, emits arcgisHubDiscussionsPostSelect
   * to load the full thread view
   */
  handlePostViewAllGeography(): void;
  /**
   * Handles clicks to the Read More action in the multiline-ellipsis component
   * @param evt
   */
  handleMultilineEllipsisExpanded(evt: CustomEvent<void>): void;
  /**
   * Handles calcitePopoverOpen events, ensures proper focus is set
   */
  handleCalcitePopoverOpen(evt: CustomEvent<void>): void;
  /**
   * Handles arcgisHubDiscussionsPostReactionChange event when a reaction
   * is created or removed
   */
  handleReactionChanged(evt: CustomEvent<void>): void;
  /**
   * Emits hub telemetry events, adding common properties
   */
  emitHubTelemetry(telemetry: {
    [key: string]: any;
  }): void;
  /**
   * Fetches dependencies and emits arcgisHubDiscussionsPostReady when complete
   */
  loadDependencies(): Promise<void>;
  /**
   * Wraps the _fetchDependencies method with a minimum delay so
   * skeleton state can be observed
   */
  fetchDependencies(): Promise<IPostDetails & IEnvironmentDetails & IPostUserDetails & IParentDetails & IParentUserDetails & IChannelDetails & IEntityDetails & IPostMentionedUserDetails>;
  /**
   * Fetches all dependencies
   */
  _fetchDependencies(): Promise<IPostDetails & IEnvironmentDetails & IPostUserDetails & IParentDetails & IParentUserDetails & IChannelDetails & IEntityDetails & IPostMentionedUserDetails>;
  /**
   * Loads translations and dependencies
   */
  initialize(): Promise<void>;
  /**
   * Loads translations
   */
  loadTranslations(): Promise<void>;
  /**
   * Sanitizes body text and renders urls as links. Caches post body so operation is only performed as needed.
   * @returns string: body text of a post with urls rendered as calcite-links
   */
  get postBody(): string;
  get postTitle(): string;
  /**
   * Handles clicks to the Delete action
   */
  handleDelete(): Promise<void>;
  /**
   * Handles clicks to the Edit action
   */
  handleEdit(): void;
  /**
   * Handles clicks to the Copy Link action is clicked
   */
  handleCopyLink(): void;
  /**
   * Handles alciteTooltipBeforeOpen events from the Copy Link tooltip
   */
  handleCopyTooltipBeforeOpen(): void;
  /**
   * Handles calciteTooltipClose events from the Copy Link tooltip
   */
  handleCopyTooltipClose(): void;
  /**
   * Handles calcitePopoverBeforeClose and calcitePopoverBeforeOpen
   * events emitted from the actions menu popover
   */
  handleActionsPopoverBeforeOpenClose(): void;
  /**
   * Toggle the visibility (status) of a post
   * @returns IPost: Returns the modified post object
   */
  handleToggleVisibility(): Promise<IPost>;
  /**
   * Emits arcgisHubDiscussionsPostSelect to traverse to a thread
   */
  handleViewThread(): void;
  /**
   * Handles clicks to the Reply action
   */
  handleReply(): void;
  /**
   * Handles clicks to the View N repl(y|ies) action
   */
  handleViewReplies(): void;
  /**
   * Handles clicks to non-mention calcite-links in the post body.
   */
  handleLinkClicked(evt: PointerEvent): void;
  /**
   * Emits the hubTelemetry impression for a deep linked thread
   */
  capturePostDeepLinkImpression(): void;
  /**
   * Emits the hubTelemetry impression for a post rendered within a list
   */
  capturePostListImpression(): void;
  /**
   * Emits the hubTelemetry impression for a deleted post
   */
  capturePostDeletedImpression(): void;
  /**
   * Emits the hubTelemetry impression for a hidden post
   */
  capturePostHiddenImpression(): void;
  /**
   * Watches for changes to the renderedEl (article or editor component) and wires
   * up animationend directly on the element reference as animation events don't bubble
   * up the DOM.
   * @param renderedEl The currently rendered element
   * @param prevRenderedEl The previously rendered element
   */
  handleRenderedElChange(renderedEl: HTMLElement, prevRenderedEl: HTMLElement): void;
  /**
   * Reloads dependencies when context changes
   */
  handleContextChanged(context: IArcGISContext, prevContext: IArcGISContext): void;
  /**
   * Adds relevant animation event listeners to the provided element reference
   * @param el An HTMLElement reference
   */
  addAnimationEventListeners(el: HTMLElement): void;
  /**
   * Removes relevant animation event listeners from the provided element reference
   * @param el An HTMLElement reference
   */
  removeAnimationEventListeners(el: HTMLElement): void;
  /**
   * Emits arcgisHubDiscussionsPostSelect when reply is deleted and
   * user clicks View all replies link from calcite-notice
   */
  handleViewAllReplies(): void;
  /**
   * Emits arcgisHubDiscussionsPostSelect when Read More is clicked for an out-of-context reply
   */
  handleReplyOutOfContextReadMore(): void;
  /**
   * Emits arcgisHubDiscussionsPostSelect when View Post action is clicked from
   * an out of context reply
   */
  handleViewPost(evt: CustomEvent<void>): void;
  /**
   * Assigns a reference to the article element so we
   * can calculate it's height
   * @param article A reference to the article element
   */
  handleSetComponentRef(renderedEl?: HTMLElement): void;
  /**
   * Handles users clicking the Cancel button
   * from the post editor
   */
  handlePostCanceled(evt: CustomEvent<void>): void;
  /**
   * Refreshes the parent post record when a reply is created for the post,
   * emits arcgisHubDiscussionsPostEdit so upstream references are updated as well.
   */
  handlePostCreatedOrDeleted(evt: CustomEvent<IPost>): Promise<void>;
  /**
   * Handles animationend events for the renderedEl. Used to initiate
   * secondary animation when transitioning between post content and editor
   * views. Additionally removes temporarily enforced min height after chained
   * animations complete.
   * @param evt  An AnimationEvent
   */
  handleAnimationEnd(evt: AnimationEvent): void;
  /**
   * Handles users successfully editing a post. Listens on body so the post
   * is updated to reflect most recent changes regardless of if it was edited
   * from the post editor rendered by this component
   */
  handlePostEditedBody(evt: CustomEvent<IPost>): void;
  /**
   * Handles the post being edited, closes the editor
   */
  handlePostEdited(evt: CustomEvent<IPost>): void;
  /**
   * Handles the arcgisHubDiscussionPopoverBeforeOpen event, updates popoverIsOpen state
   */
  handlePopoverOpen(): void;
  /**
   * Handles the arcgisHubDiscussionPopoverClose event, updates popoverIsOpen state
   */
  handlePopoverClose(): void;
  /**
   * Initiates the animations related to showing and hiding
   * the post editor
   * @param showEditor  Whether to show or hide the post editor
   */
  transitionEditorView(showEditor: boolean): void;
  /**
   * Computes true when context is not provided, intl is not yet loaded, or dependencies are being fetched
   */
  get isLoading(): boolean;
  /**
   * Computes when the location list should be disabled from interaction
   */
  get locationListIsDisabled(): boolean;
  /**
   * Computes map of views to render methods
   */
  get views(): IPostViewConfigs;
  /**
   * Computes the correct view to render
   */
  get view(): IViewConfig;
  /**
   * Computes the appropriate action menu actions for a post or reply
   */
  get actionMenuActions(): {
    icon: string;
    text: string;
    fn(): void;
    ref?(el: HTMLCalciteActionElement): void;
  }[];
  /**
   * Computes creator full name string
   */
  get creatorFullName(): string;
  /**
   * If this component is rendered out of context of parent post (post-list vs thread)
   */
  get outOfContext(): boolean;
  /**
   * Computes inline styles to be temporarily applied to the host element to prevent
   * jankiness when transitioning between post/reply content & editor views.
   */
  get styles(): Record<string, string>;
  /**
   * Computes true when the post is a reply
   */
  get isReply(): boolean;
  /**
   * Renders the post editor when editing a post
   */
  renderEditor(): HTMLElement;
  /**
   * Renders the reactions component
   */
  renderReactions(): HTMLElement;
  /**
   * Renders the post metadata, i.e. the post-header component
   */
  renderMetadata(metadataOrientation: 'inline' | 'block', showChannelAccessIcon?: boolean, showChannelAvatar?: boolean, showChannelName?: boolean, showCreatorAvatar?: boolean, showPopover?: boolean, showReplyingTo?: boolean, showViewPostAction?: boolean, showTimestamp?: boolean): HTMLElement;
  /**
   * Renders the parent post view
   */
  renderPost(): HTMLElement;
  /**
   * Renders the inline actions for a parent post
   */
  renderTextActions(): HTMLCalciteActionGroupElement;
  /**
   * Renders ths post actions menu dropdown
   */
  renderActionMenu(): HTMLElement;
  /**
   * Renders the post deleted notice
   */
  renderDeleted(): HTMLElement;
  /**
   * Renders the post hidden notice
   */
  renderHidden(): HTMLElement;
  /**
   * Renders the skeleton loader
   */
  renderSkeleton(): HTMLArcgisHubDiscussionsPostSkeletonElement;
  /**
   * Primary render method
   */
  render(): any;
  /**
   * Renders the reply creator avatar and optionally the channel avatar
   */
  renderAvatars(): HTMLElement[];
  /**
   * Renders the inline actions for a reply
   */
  renderActions(): HTMLElement;
  /**
   * Render the reply out of context view
   */
  renderReplyOutOfContext(): HTMLElement;
  /**
   * Renders the post geography
   * @param toggleable Component `toggleable` property value
   * @param expandable Component `expandable` property value
   */
  renderGeography(toggleable: boolean, expandable: boolean): HTMLElement;
  /**
   * Renders the reply view
   */
  renderReply(): HTMLElement;
}
export {};
