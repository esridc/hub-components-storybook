import { EventEmitter } from '../../../../stencil-public-runtime';
import { IChannel, IPost } from '@esri/hub-discussions';
import { IArcGISContext, IHubContent } from '@esri/hub-common';
import { Feature } from 'geojson';
import { IPostRelatedFeatureDetails, IViewConfig } from '../../utils/discussions';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { ArcgisHubDiscussionsBlockedNoticeVariant } from '../arcgis-hub-discussions-blocked-notice/resources';
import { IGroup, IPortal, IUser } from '@esri/arcgis-rest-portal';
import { IEntityDetails, IEnvironmentDetails, IParentDetails, IChannelDetails, IPostDetails, IPostSelectDetails, IParentUserDetails } from '../../../../utils/discussions/types';
import { IWithContext } from '../../../../utils/state';
declare enum ThreadView {
  Loading = "loading",
  ParentAndReply = "parent_and_reply",
  ParentAndReplies = "parent_and_replies",
  ThreadDeleted = "thread_deleted",
  ChannelDeleted = "channel_deleted"
}
interface IThreadViewConfigs {
  [ThreadView.Loading]: IViewConfig;
  [ThreadView.ParentAndReply]: IViewConfig;
  [ThreadView.ParentAndReplies]: IViewConfig;
  [ThreadView.ThreadDeleted]: IViewConfig;
  [ThreadView.ChannelDeleted]: IViewConfig;
}
export declare class ArcgisHubDiscussionsThread implements IWithContext {
  /**
   * Deleted thread impression should only be captured when viewing a thread post
   * via a deep link. It should not be captured if the user elects to delete the
   * post and reply during the session.
   */
  deletedDuringSession: boolean;
  /**
   * A reference to the HTMLArcgisHubDiscussionsPostListElement
   */
  postListRef: HTMLArcgisHubDiscussionsPostListElement;
  /**
   * A reference to the HTMLArcgisHubDiscussionsPostEditorElement
   */
  postEditorRef: HTMLArcgisHubDiscussionsPostEditorElement;
  /**
   * A reference to the parent HTMLARcgisHubDiscussionsPostElement
   */
  parentRef: HTMLArcgisHubDiscussionsPostElement;
  /**
   * A reference to the reply HTMLARcgisHubDiscussionsPostElement
   */
  postRef: HTMLArcgisHubDiscussionsPostElement;
  /**
   * A reference to the host element
   */
  element: HTMLArcgisHubDiscussionsThreadElement;
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
   * An optional UUID string of an existing reply.
   */
  postId: string;
  /**
   * An optional reference to a reply IPost. If not
   * provided, the IPost record will be fetched.
   */
  post?: IPost;
  /**
   * An optional reference to an IUser representing the reply post author. If not
   * provided, the IUser record will be fetched.
   */
  postCreator: IUser;
  /**
   * An optional reference to an IPortal representing the reply post author's org. If not
   * provided, the IPortal record will be fetched.
   */
  postCreatorOrg: IPortal;
  /**
   * An optional reference to a parent IPost.
   */
  parent?: IPost;
  /**
   * An optional UUID string of a parent IPost.
   */
  parentId: string;
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
   * If the component is being rendered within a mobile layout
   */
  isMobile: boolean;
  /**
   * A UUID string representing a feature ID on the map that is the target of the discussion
   */
  locationId: string;
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
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * True when dependencies are being fetched
   */
  _loading: boolean;
  /**
   * True when the parent ArcGISHubDiscussionsPostElement has fired it's arcgisHubDiscussionsPostReady event
   */
  parentReady: boolean;
  /**
   * True when the reply ArcGISHubDiscussionsPostElement has fired it's arcgisHubDiscussionsPostReady event
   */
  postReady: boolean;
  /**
   * True when the ArcGISHubDiscussionsPostListElement has fired it's arcgisHubDiscussionsPostListReady event
   */
  postListReady: boolean;
  /**
   * True when the ArcGISHubDiscussionsPostEditorElement has fired it's arcgisHubDiscussionsPostEditorReady event
   */
  postEditorReady: boolean;
  /**
   * True when all elements (parent, post editor, reply or post list) have fired their ready events
   */
  ready: boolean;
  /**
   * Emitted when the user clicks the View All Posts or View All Replies actions
   */
  arcgisHubDiscussionsPostSelect: EventEmitter<IPostSelectDetails>;
  /**
   * Prompts the app identity manager to start sign in process
   */
  arcgisAppIdentityStartSignIn: EventEmitter<void>;
  /**
   * Emits telemetry information
   */
  hubTelemetry: EventEmitter<any>;
  arcgisHubDiscussionsThreadReady: EventEmitter<void>;
  /**
   * Constructor method, pre-bind context to methods that are passed by reference
   */
  constructor();
  /**
   * Component will load lifecycle hook
   */
  componentWillLoad(): void;
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
  fetchDependencies(): Promise<IEnvironmentDetails & IEntityDetails & IChannelDetails & IPostDetails & IParentDetails & IParentUserDetails>;
  /**
   * Watches for changes to context and loads dependencies
   */
  handleContextChanged(context: IArcGISContext, prevContext: IArcGISContext): void;
  /**
   * Handles parent post's arcgisHubDiscussionsPostReady event
   */
  handleParentReady(): void;
  /**
   * Handles reply post's arcgisHubDiscussionsPostReady event
   */
  handlePostReady(): void;
  /**
   * Handles arcgisHubDiscussionsPostEditorReady event
   */
  handlePostEditorReady(): void;
  /**
   * Handles arcgisHubDiscussionsPostListReady event
   */
  handlePostListReady(): void;
  /**
   * Watches for change to ready and fires arcgisHubDiscussionsThreadReady when true
   */
  handleReadyChange(ready: boolean): void;
  /**
   * Updates ready state when elements (parent, post editor, reply or post list) fire their ready event
   */
  updateReady(): void;
  /**
   * Method that resolves a reference to the post editor component
   */
  getPostEditorRef(): Promise<HTMLArcgisHubDiscussionsPostEditorElement>;
  /**
   * Method that resolves a reference to the post list component
   */
  getPostListRef(): Promise<HTMLArcgisHubDiscussionsPostListElement>;
  /**
   * Fetches dependencies
   */
  _fetchDependencies(): Promise<IEnvironmentDetails & IEntityDetails & IChannelDetails & IPostDetails & IParentDetails & IParentUserDetails>;
  /**
   * Computes true when no context provided or dependencies are
   * being fetched
   */
  get loading(): boolean;
  /**
   * Handles arcgisHubDiscussionsPostDelete events and updates state if the deleted
   * post is rendered within this thread
   * @param evt arcgisHubDiscussionsPostDelete event
   */
  handlePostOrReplyDeleted(evt: CustomEvent<IPost>): void;
  /**
   * Handles clicks to the View All Replies action
   */
  handleViewAllReplies(): void;
  /**
   * Handles clicks to the View All Posts action
   */
  handleViewAllPosts(): void;
  /**
   * Emits hub telemetry events, adding common properties
   */
  emitHubTelemetry(telemetry: {
    [key: string]: any;
  }): void;
  /**
   * Computes map of views to render methods
   */
  get views(): IThreadViewConfigs;
  /**
   * Computes the correct view to render
   */
  get view(): IViewConfig;
  /**
   * Overrides or suppresses specific telemetry events that vary when viewing within
   * a thread. This is not ideal, but avoids the need to pass telemetry-only props after
   * consolidation refactor
   * @param evt hubTelemetry event
   */
  handleHubTelemetry(evt: CustomEvent<any>): void;
  /**
   * Captures thread deleted impression
   */
  captureThreadDeletedImpression(): void;
  /**
   * Computes blocked notice configuration
   */
  get blockedNotice(): ArcgisHubDiscussionsBlockedNoticeVariant;
  /**
   * Renders when deep linking to a thread or reply but the channel was deleted.
   * TODO: add long-term UI.
   */
  renderChannelDeleted(): HTMLElement;
  /**
   * Renders the parent post
   */
  renderParent(): HTMLElement;
  /**
   * Renders the reply editor
   */
  renderReplyEditor(): HTMLElement;
  handleSignInClicked(): void;
  /**
   * Renders applicable notice
   */
  renderNotice(): HTMLElement;
  /**
   * Renders the post + replies view
   */
  renderParentAndReplies(): HTMLElement;
  /**
   * Renders deep-linked reply view
   */
  renderParentAndReply(): HTMLElement;
  /**
   * Renders thread deleted notice
   */
  renderThreadDeleted(): HTMLElement;
  /**
   * Renders loading state
   */
  renderLoading(): HTMLElement;
  /**
   * Primary render method
   */
  render(): any;
}
export {};
