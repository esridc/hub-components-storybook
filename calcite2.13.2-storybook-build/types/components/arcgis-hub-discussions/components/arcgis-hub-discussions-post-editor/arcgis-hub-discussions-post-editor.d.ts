import { EventEmitter } from '../../../../stencil-public-runtime';
import { HTMLCalciteActionElement, HTMLCalciteButtonElement } from '@esri/calcite-components/dist';
import { SharingAccess, IPost, IChannel } from '@esri/hub-discussions';
import { IArcGISContext, IHubContent, IQuery } from '@esri/hub-common';
import { Feature, Geometry } from 'geojson';
import { IPostRelatedFeatureDetails, IPostDrawCreateDetails } from '../../utils/discussions';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { STEP } from './types';
import { Status } from '@esri/calcite-components/dist/types/components/interfaces';
import { ArcgisHubDiscussionsBlockedNoticeVariant } from '../arcgis-hub-discussions-blocked-notice/resources';
import { Tool } from '../../../arcgis-hub-map-widget-container/arcgis-hub-map-widget-draw/types';
import { IGroup, IPortal, IUser } from '@esri/arcgis-rest-portal';
import { IChannelDetailsWithLatestUserPost } from '../../../../utils/discussions/types';
import { IWithContext } from '../../../../utils/state';
export declare class ArcgisHubDiscussionsPostEditor implements IWithContext {
  /**
   * Reference to the post title form input element
   */
  titleElement: HTMLInputElement;
  /**
   * Reference to the post body form input element
   */
  bodyElement: HTMLArcgisHubRichTextElement;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Reference to calcite-popover component with location actions
   */
  locationPopoverElement: HTMLCalcitePopoverElement;
  /**
   * A reference to the help button
   */
  helpButtonRef: HTMLCalciteButtonElement;
  /**
   * A reference to the anonymous toggle switch
   */
  anonToggleRef: HTMLCalciteSwitchElement;
  /**
   * Reference to host element
   */
  element: HTMLArcgisHubDiscussionsPostEditorElement;
  /**
   * An optional reference to an existing IPost to edit. If `post` is not provided
   * but `postId` is, the IPost record will be fetched.
   */
  post?: IPost;
  /**
   * An optional reference to an IUser representing the post author. If not
   * provided, the IUser record will be fetched.
   */
  postCreator?: IUser;
  /**
   * An optional reference to an existing IPortal object representing the post author's
   * organization. If not provided, the IPortal record will be fetched.
   */
  postCreatorOrg?: IPortal;
  /**
   * An optional UUID string of an existing IPost to edit. If `postId`
   * is provided but `post` is not, the IPost record will be fetched.
   */
  postId?: string;
  /**
   * An optional reference to a parent IPost for which to create a replies. If `parentId`
   * is provided, but `parent` is not, the IPost record will be fetched.
   */
  parent?: IPost;
  /**
   * An optional reference to an IUser representing the parent post author. If not
   * provided, the IUser record will be fetched.
   */
  parentCreator?: IUser;
  /**
   * An optional UUID string of an existing parent IPost for which to create replies. If
   * `parentId` is provided but `parent` is not, the IPost record will be fetched.
   */
  parentId?: string;
  /**
   * An optional reference to an existing IChannel to create new IPost records within, or a reference
   * to an existing IChannel for a given `postId`, `post`, `parentId`, or `parent`. If `channel`
   * is not provided, it will be fetched using the given `channelId`, `postId`, `post`, `parentId`,
   * or `parent`.
   */
  channel?: Partial<IChannel>;
  /**
   * An optional string representing a channel access level when creating a new parent post and the
   * IChannel is not yet known. When providing `channelAccess` and `channelGroupIds` and an IChannel
   * does not yet exist with those access settings, a new IChannel will be created on the fly at the
   * time the IPost record is created. If an IChannel already exists with the provided `channelAccess`
   * and `channelGroupIds`, that IChannel will be reused.
   */
  channelAccess?: SharingAccess;
  /**
   * An optional UUID string array representing a private channel's groups when creating a new parent
   * post and the IChannel is not yet known. When providing `channelGroupIds` and `channelAccess` and
   * an IChannel does not yet exist with those access settings, a new IChannel will be created on the
   * fly at the IPost record is created. If an IChannel already exists with the provided `channelGroupIds`
   * and `channelAccess`, that IChannel will be reused.
   */
  channelGroupIds?: string[] | null;
  /**
   * An optional Array of IGroup objects representing a private IChannel groups. If `channelGroups` is
   * not provided, it will be fetched.
   */
  channelGroups?: IGroup[] | null;
  /**
   * An optional UUID string of an existing IChannel to create new IPost records within, or an existing
   * IChannel for a given `postId`, `post`, `parentId`, or `parent`. If `channelId` is provided but
   * `channel` is not, the IChannel will be fetched.
   */
  channelId?: string;
  /**
   * An optional reference to the IHubContent or IGroup representing the subject entity of the discussion.
   * If `entity` is not provided, it will be fetched using the given `entityId` & `entityType` or the given
   * `discussion`.
   */
  entity?: IHubContent | IGroup;
  /**
   * An optional UUID string of an IHubContent or IGroup representing the subject entity of the discussion.
   * If `entityId` and `entityType` are provided but `entity` is not, the entity will be fetched.
   */
  entityId?: string;
  /**
   * An optional string representing the type (`content` or `group`) of subject entity of the discussion.
   * If `entityType` and `entityId` are provided but `entity` is not, the entity will be fetched.
   */
  entityType?: string;
  /**
   * A URI string representing the subject entity of the discussion, e.g. `hub://content/1fc` or `hub://group/2fc`.
   * When `entity`, `entityId`, and `entityType` are not provided, the entity will be fetched by parsing the URI.
   */
  discussion: string;
  /**
   * An optional display field key as configured by the layer when entity is IHubContent. Will be fetched if not
   * explicitly provided.
   */
  displayFieldKey?: string;
  /**
   * An optional boolean indicating if the display field key configured by the layer is valid when entity is IHubContent
   */
  displayFieldValid?: boolean;
  /**
   * An optional display field value as configured by the layer when entity is IHubContent. Will be fetched if not
   * explicitly provided.
   */
  displayFieldValue?: any;
  /**
   * A UUID string representing a feature ID on the map that is the target of the discussion
   */
  locationId?: string;
  /**
   * If a map is present on the page
   */
  hasMap: boolean;
  /**
   * If this component is embedded in a Hub site. The domain service will be called to make this
   * determination if a value is not explicitly provided.
   */
  isHub: boolean;
  /**
   * New features (geometry) unsaved for location updates
   */
  unsavedFeatures: Feature[];
  /**
   * New related features unsaved for location updates
   */
  unsavedRelatedFeatures: IPostRelatedFeatureDetails[];
  /**
   * Feature geometry edits for existing post locations
   */
  unsavedExistingFeatures: Feature[];
  /**
   * An optional index when the post is rendered within a list
   */
  index: number;
  /**
   * If the body width is < 768px
   */
  isMobile: boolean;
  /**
   * Overrides the Create Post save button text
   */
  createParentSaveButtonText: string;
  /**
   * Overrides the Create Post `body` placeholder text
   */
  createParentBodyPlaceholderText: string;
  /**
   * Add Location button and post location list render when true
   */
  showLocations: boolean;
  /**
   * Disable 'Select' location draw action
   */
  disableSelectExistingLocation: boolean;
  /**
   * The post heaader, e.g. `Add Post`, `Edit Post`, etc, render when true
   */
  showHeader: boolean;
  /**
   * When true, the component can be toggled between expanded/collapsed states
   */
  collapsible: boolean;
  /**
   * When true and `collapsible` is true, the component will render a collapsed state that hides
   * the title field, add location button, cancel button & location list, and renders fewer post/channel
   * details
   */
  collapsed: boolean;
  /**
   * When `true` allows for changing the channel when creating a new parent post
   */
  channelModifiable: boolean;
  /**
   * Intial values used to pre-populate editor
   */
  initialValues: Pick<IPost, "title" | "body">;
  /**
   * Global context
   */
  _context: IArcGISContext;
  /**
   * Internal feature state tracking
   */
  _unsavedFeatures: Feature[];
  /**
   * Internal related feature state tracking
   */
  _unsavedRelatedFeatures: IPostRelatedFeatureDetails[];
  /**
   * Internal existing feature state tracking
   */
  _unsavedExistingFeatures: Feature[];
  /**
   * A create or edit XHR is currently in flight
   */
  pending: boolean;
  /**
   * If dependencies are currently being fetched
   */
  loading: boolean;
  /**
   * Post title string
   */
  titleValue: string;
  /**
   * Post body string
   */
  bodyValue: string;
  /**
   * Initial Post discussion URI
   */
  discussionValue: string;
  /**
   * Initial Post geometry
   */
  geometryValue: Geometry;
  /**
   * If this.geometryValue differs from original post.geometry
   */
  geometryValueHasChanges: boolean;
  /**
   * Reference to calcite-action component that enables location to
   * be added to the map
   */
  locationActionElement: HTMLCalciteActionElement;
  /**
   * An Array of IChannelDetails for Channels in which the currently authenticated
   * user has recently posted to
   */
  recentChannelsResults: IChannelDetailsWithLatestUserPost[];
  /**
   * Represents whether the component is in the group selection or
   * content creation step
   */
  step: STEP;
  /**
   * An event failed
   */
  errorMessage: string;
  /**
   * Whether or not to render the cancel confirmation
   */
  confirmCancel: boolean;
  /**
   * Currently selected geometry type from the 'Add Locations' popover
   */
  addLocationsActiveGeometryType: Tool;
  /**
   * Determines if add locations popover is currently open
   */
  addLocationsPopoverOpen: boolean;
  /**
   * Whether or not to post anonymously
   */
  asAnonymous: boolean;
  /**
   * Emitted when the editor's dependencies have been fetched
   */
  arcgisHubDiscussionsPostEditorReady: EventEmitter<IPost>;
  /**
   * Emitted when the user elects to cancel creating or editing a post
   */
  arcgisHubDiscussionsPostCancel: EventEmitter<void>;
  /**
   * Emitted when the user successfully creates a new post
   */
  arcgisHubDiscussionsPostCreate: EventEmitter<IPost>;
  /**
   * Emitted when the user successfully edits an existing post
   */
  arcgisHubDiscussionsPostEdit: EventEmitter<IPost>;
  /**
   * Emitted when the user changes the post title or body
   */
  arcgisHubDiscussionsPostChanged: EventEmitter<Pick<IPost, "title" | "body">>;
  /**
   * Emitted when the user requests to begin drawing a geometry for the post
   */
  arcgisHubDiscussionsGeometryDrawCreate: EventEmitter<IPostDrawCreateDetails>;
  /**
   * Emitted when the user requests to draw a specific geometry type
   */
  arcgisHubDiscussionsGeometryDrawTypeSelect: EventEmitter<Tool>;
  /**
   * Emitted when the user edits a drawn geometry for the post
   */
  arcgisHubDiscussionsGeometryDrawEdit: EventEmitter<Feature>;
  /**
   * Emitted when the user resets a drawn geometry for the post
   */
  arcgisHubDiscussionsGeometryDrawReset: EventEmitter<void>;
  /**
   * Emitted when the user selects a feature on the map
   */
  arcgisHubDiscussionsGeometrySelect: EventEmitter<string>;
  /**
   * Emitted when the user deselects a feature on the map
   */
  arcgisHubDiscussionsGeometryDeselect: EventEmitter<void>;
  /**
   * Emitted when the user cancels or submits a post - clears all unsaved features
   */
  arcgisHubDiscussionsGeometryClearAll: EventEmitter<void>;
  /**
   * Emitted when the close button is clicked from the post editor header
   */
  arcgisHubDiscussionsPostClose: EventEmitter<void>;
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
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * True when the language is rtl
   */
  get isRtl(): boolean;
  /**
   * Computes if cancel action should be confirmed
   */
  get shouldConfirmCancel(): boolean;
  /**
   * IPost with augmented with current location edits
   */
  get postWithLocationEdits(): IPost;
  get hasMentionedUsers(): boolean;
  /**
   * Fetches the post editor dependencies
   */
  fetchDependencies(): Promise<void>;
  /**
   * Initializes the component
   */
  initialize(context?: IArcGISContext, prevContext?: IArcGISContext): Promise<void>;
  /**
   * Sets initial title and body values, useful when wanting to render the
   * editor component with any previously entered title or body strings
   */
  initializeValues(): void;
  /**
   * Emits arcgisHubDiscussionsPostChanged when title and
   * body values are changed
   */
  handleTitleBodyValueUpdate(): void;
  /**
   * Fetches a collection of channel detailss in which the user has most recently
   * posted to and enforces a minimum delay of 300ms before the promise resolves
   * so skeleton state can be observed
   * @returns Promise that resolves IChannelDetails[]
   */
  _fetchRecentChannelDetails(): Promise<IChannelDetailsWithLatestUserPost[]>;
  /**
   * Fetches a collection of channel details in which the user has most recently
   * posted to and updates state
   */
  fetchRecentChannelDetails(): Promise<void>;
  /**
   * Emits telemetry with default props
   * @param telemetry
   */
  emitHubTelemetry(telemetry: {
    [key: string]: any;
  }): void;
  formatTimeString(date: Date): string;
  /**
   * Called when the user selects a group from the Recent Groups section
   * @param evt A mouse click event object
   */
  handleSelectRecentChannel(evt: MouseEvent): void;
  /**
   * Handles users clicking the Select Group button after having selected
   * a group from the combobox
   */
  handleChannelSelectedFromCombobox(): void;
  /**
   * Change to the content creation step
   */
  proceedToContentCreation(): void;
  /**
   * Handles the calcite-combobox calciteComboboxChange event, if a group is selected
   * it fetches the group details to use for net new posts
   * @param evt A CustomEvent that includes the items selected by the calcite-combobox
   */
  handleComboboxChange(evt: CustomEvent<void>): Promise<void>;
  handleGeometryValueUpdated(): void;
  /**
   * Updates internal _feature state when the unsavedFeatures prop value changes
   * @param feature A Feature object
   */
  mapFeaturePropToState(unsavedFeatures: Feature[]): void;
  /**
   * Updates internal _feature state when the unsavedExistingFeatures prop value changes
   * @param feature A Feature object
   */
  mapExistingFeaturePropToState(unsavedExistingFeatures: Feature[]): void;
  /**
   * Updates internal _relatedFeature state when the relatedFeature prop value changes
   * @param relatedFeature An IPostRelatedFeatureDetails object
   */
  mapRelatedFeaturePropToState(unsavedRelatedFeatures: IPostRelatedFeatureDetails[]): void;
  handleAddLocationsActiveGeometryTypeChanged(geometryType: Tool): void;
  /**
   * Handles form submissions when editing or creating a net new post
   * @param evt A form submit event
   * @returns a Promise<IPost>
   */
  handleSubmit(evt: Event): Promise<IPost>;
  /**
   * Creates a net new post
   * @returns a Promise<IPost>
   */
  handleCreate(): Promise<IPost>;
  /**
   * Edits an existing post
   * @returns a Promise<IPost>
   */
  handleEdit(): Promise<IPost>;
  /**
   * Called when the user elects to cancel creating a net new post or
   * an editing an existing post. Emits arcgisHubDiscussionsPostCancel
   * @param evt A mouse click event
   */
  handleCancel(evt: MouseEvent): void;
  /**
   * Determines whether to confirm the cancellation or close the editor
   */
  handleCancelOrConfirm(evt: MouseEvent): void;
  handleStepChanged(step: STEP, prevStep?: STEP): void;
  /**
   * Called when the cancel confirmation back button is clicked
   */
  handleConfirmBackButtonClicked(): void;
  /**
   * Called when the user elects to traverse from the content creation step
   * back to the group selection step. Resets any previously selected groups
   * from the combobox and refreshes the recent groups list
   */
  handleBack(): void;
  /**
   * Emit telemetry when help popover is opened
   */
  handleHelpPopoverOpen(): void;
  /**
   * Emit telemetry when help popover is closed
   */
  handleHelpPopoverClose(): void;
  /**
   * Modify state when add location popover is opened
   */
  handleLocationPopoverOpen(): void;
  /**
   * Modify state when add location popover is closed
   */
  handleLocationPopoverClose(): void;
  /**
   * Expands the editor when the focusin event is handled
   */
  handleFocusin(): void;
  /**
   * Expands the editor
   */
  expand(): void;
  /**
   * Collapses the editor
   */
  collapse(): void;
  /**
   * Collapses the editor when the focusout event is handled
   */
  handleFocusout(): void;
  /**
   * Called when the group search combobox is opened
   */
  handleGroupSearchOpened(): void;
  /**
   * Called when the user changes the text of the post body content
   * @param evt An onChange event for the post body calcite-input
   */
  updateBodyValue(evt: CustomEvent<void>): void;
  handleFeatureRemove(evt: CustomEvent<Feature>): void;
  removeFeature(index: number, relatedFeatureId: string, unsaved: boolean): void;
  handleDrawDone(): void;
  handleDrawCancel(): void;
  /**
   * Called when the user changes the text of the post title content
   * @param evt An onChange event for the reply body calcite-inpu
   */
  updateTitleValue(evt: Event): void;
  setActiveGeometryDrawType(evt: PointerEvent): void;
  resetActiveGeometryDrawType(): void;
  enableAddLocation(): void;
  /**
   * Computes if the title value is valid
   */
  get isTitleValid(): boolean;
  /**
   * Computes if the body value is valid
   */
  get isBodyValid(): boolean;
  /**
   * Returns true if post has new location changes or updates
   */
  get hasLocationChanges(): boolean;
  /**
   * Computes title warning/error messages
   */
  get titleMessage(): {
    status: Status;
    icon?: string;
    text: string;
  };
  /**
   * Computes body warning/error messages
   */
  get bodyMessage(): {
    status: Status;
    icon?: string;
    text: string;
  };
  /**
   * Computes if the editor is creating or editing a reply
   */
  get isReply(): boolean;
  /**
   * Computes the blocked noticed variant
   */
  get blockedNotice(): ArcgisHubDiscussionsBlockedNoticeVariant;
  /**
   * Builds the appropriate mention query for the given channel and input string
   * @param input The user-provided input text
   * @returns an IQuery
   */
  getMentionQuery(input: string): IQuery;
  /**
   * Renders the editor's primary action button for editing an existing
   * or creating a net new post
   */
  renderPrimaryActionButton(): HTMLCalciteButtonElement;
  /**
   * Renders the editor's secondary action button, currently the cancel
   * edit/create post button
   */
  renderSecondaryActionButton(): HTMLCalciteButtonElement;
  renderAddLocationsButton(): HTMLElement;
  /**
   * Renders the title field
   */
  renderTitleField(): HTMLElement;
  /**
   * Renders the body field
   */
  renderBodyField(): HTMLElement;
  /**
   *
   * @param iconScale The scale of the creator or channel avatar, creator avatar takes precendence when both are rendered
   * @param showCreatorAvatar Shows the creator avatar
   * @param showChannelAvatar Shows the channel avatar
   * @param showChannelAccessIcon Shows the channel access icon
   * @param showChannelName Shows the channel name
   * @param showTimestamp Shows the post timestamp text
   * @param showCreatorUsername Shows the post creator username
   * @param showPostPopover Wraps the avatars in the post popover
   */
  renderPostHeader(iconScale?: 'l' | 'm' | 's', showCreatorAvatar?: boolean, showChannelAvatar?: boolean, showChannelAccessIcon?: boolean, showChannelName?: boolean, showTimestamp?: boolean, showCreatorUsername?: boolean, showPostPopover?: boolean): HTMLElement;
  /**
   * Handles anonymous onCalciteSwitchChange
   * @param e Event
   */
  handleAnonToggle(e: CustomEvent): void;
  /**
   * Renders anonymous posting toggle switch
   * @returns HTMLElement
   */
  renderAnonToggle(): HTMLElement;
  /**
   * Renders the UI for creating/editing post content step
   */
  renderContentStep(): HTMLElement;
  /**
   * Renders the header UI for the group selection and content creation steps
   */
  renderHeader(): HTMLElement;
  /**
   * Renders the UI for cancel confirmation
   */
  renderConfirmCancel(): HTMLElement;
  /**
   * Renders the UI for the group selection step
   */
  renderGroupSelectionStep(): HTMLElement;
  /**
   * Renders a channel details
   * @param channelDetails An IChannelDetails object
   * @param index The index to build the data-channel-index value
   * @returns
   */
  renderRecentChannelDetails(channelDetails: IChannelDetailsWithLatestUserPost, index: number): HTMLElement;
  /**
   * Renders a recent channel skeleton loader
   * @param index The index to build the key
   */
  renderRecentChannelSkeleton(index: number): HTMLElement;
  /**
   * Renders the empty state when no recent channels exist yet
   */
  renderRecentChannelsEmpty(): HTMLElement;
  /**
   * Renders the error when recent channels fail to load
   */
  renderRecentChannelsError(): HTMLElement;
  /**
   * Renders the recent channels list
   */
  renderRecentChannels(): HTMLElement;
  /**
   * Renders the UI for creating net new posts
   */
  renderCreate(): HTMLElement;
  /**
   * Renders the post editor
   */
  renderPostEditor(): HTMLElement;
  /**
   * Primary render entrypoint
   */
  render(): any;
  /**
   * True when the component is collapsible and is in a collapsed state
   */
  get isCollapsed(): boolean;
  /**
   * Computes input warning/error messages
   */
  get inputMessage(): {
    status: Status;
    icon?: string;
    text: string;
  };
  handleTitleElementRef(titleElement: HTMLInputElement): void;
  handleBodyElementRef(bodyElement: HTMLArcgisHubRichTextElement): void;
  /**
   * Sets focus on the appropriate input control
   */
  focusInput(): void;
  /**
   * Handles reply create/edit form submissions and performs actions common to both
   * @param evt An onsubmit event
   */
  handleReplySubmit(evt: Event): Promise<IPost>;
  /**
   * Handles reply create form submissions
   */
  handleCreateReply(): Promise<IPost>;
  /**
   * Handles reply edit form submissions
   */
  handleEditReply(): Promise<IPost>;
  /**
   * Renders the calcite-input element
   */
  renderInput(): HTMLElement;
  /**
   * Renders the post geographies
   */
  renderGeographies(): HTMLElement;
  /**
   * Renders the editor form controls
   */
  renderEditor(): HTMLElement;
  /**
   * Renders the reply editor
   */
  renderReplyEditor(): HTMLElement;
}
