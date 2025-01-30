import { EventEmitter } from '../../stencil-public-runtime';
import { CalcitePopoverCustomEvent } from '@esri/calcite-components';
import { IUser } from '@esri/arcgis-rest-portal';
import { IArcGISContext } from '@esri/hub-common';
import { IPost, IChannel, IReaction, PostReaction } from '@esri/hub-discussions';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IWithContext } from '../../utils/state';
declare type HubReactionRecordGroups = Record<PostReaction, IReaction[]>;
/**
 * A component that allows for adding & removing reactions from a Discussions post or reply.
 *
 * Example 1: Invoking when you already have a `channel` and `post` reference.
 *   <arcgis-hub-discussions-post-reactions
 *     channel={channel}
 *     post={post}
 *   />
 *
 * Example 2: Invoking when you only have a post ID
 *   <arcgis-hub-discussions-post-reactions
 *     post-id="<POST_ID>"
 *   />
 */
export declare class ArcgisHubDiscussionsPostReactions implements IWithContext {
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * A map of calcite-button refs for each of the reactions that have been submitted by users
   */
  reactionListButtons: Record<PostReaction, HTMLCalciteButtonElement>;
  /**
   * A reference to the overflow reactions calcite-button
   */
  overflowButton: HTMLCalciteButtonElement;
  /**
   * A reference to the add reaction button
   */
  addReactionButton: HTMLCalciteButtonElement;
  /**
   * An optional post ID string. If not provided, the `post` and `channel` must be provided
   */
  postId?: string;
  /**
   * Fetches updated `post` and `channel` records when the `postId` changes
   */
  handlePostIdChanged(postId?: string, prevPostId?: string): Promise<void>;
  /**
   * An optional IPost object. Must be provided if `postId` is not.
   */
  post?: IPost;
  /**
   * An optional IChannel object. Must be provided if `postId` is not.
   */
  channel?: IChannel;
  /**
   * Global context
   */
  _context: IArcGISContext;
  /**
   * Resets the user cache when the context changes
   * @param context An instance of the IArcGISContext class
   * @param prevContext An instance of the IArcGISContext class
   */
  handleContextChanged(context: IArcGISContext, prevContext: IArcGISContext): void;
  /**
   * Controls whether the `default` set or `full` set of emojis is rendered in the `add reaction` popover
   */
  showAllReactions: boolean;
  /**
   * Controls popover `open` state. Prevents multiple popovers from being rendered simultaneously
   */
  activePopover: string;
  /**
   * Set to true while reaction create/delete XHRs are in flight
   */
  pending: boolean;
  /**
   * A cache of user records fetched within this session
   */
  users: Record<string, IUser | null>;
  /**
   * Host element reference
   */
  element: HTMLArcgisHubDiscussionsPostReactionsElement;
  /**
   * An event to emit telemetry events
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Emitted when a reaction is created or deleted
   */
  arcgisHubDiscussionsPostReactionChange: EventEmitter<void>;
  /**
   * Listens for `calcitePopoverOpen` events on the `body` element. Closes this component's popovers when any other
   * calcite-popover is opened within the DOM.
   * @param evt A `calcitePopoverOpen` event
   */
  handlePopoverOpen(evt: CustomEvent<void>): void;
  /**
   * Pre-binds context to methods that get passed as references/callbacks.
   * @constructor
   */
  constructor();
  /**
   * Component pre-load setup. Loads translations and post & channel, if necessary
   * @returns Promise that resolves void
   */
  componentWillLoad(): Promise<void>;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Computes if the component is considered disabled based on user session, channel setting,
   * and pending state
   * @returns boolean
   */
  get isDisabled(): boolean;
  /**
   * Computes a collection of reaction records to be rendered in the overflow popover
   */
  get overflowReactionRecords(): IReaction[];
  /**
   * Computes a collection of reaction records submitted by the currently authenticated user, sorted by total reaction count
   */
  get currentUserReactions(): IReaction[];
  /**
   * Computes a collection of reaction records submitted by other users, sorted by total reaction count
   */
  get otherUserReactions(): IReaction[];
  /**
   * Computes a collection of reaction records used to render the submitted reactions list
   */
  get listReactions(): IReaction[];
  /**
   * Computes a map of reaction/reaction record groups, records sorted by timestamp
   */
  get reactionRecordGroups(): HubReactionRecordGroups;
  /**
   * Conditionally fetches the `post` with `reactions` and `channel` when the `postId` is truthy
   * and does not match the `prevPostId`.
   * @param postId A post ID
   * @param prevPostId The previous post ID value
   */
  fetchPostDetails(postId?: string, prevPostId?: string): Promise<void>;
  /**
   * Handles clicks to the add reaction button. Opens the add reaction picker popover
   * @param evt A MouseEvent
   */
  handleAddReactionClick(evt: MouseEvent): void;
  /**
   * Handles clicks to the view all reactions button inside the add reaction popover.
   * Shows the full collection of available reactions.
   */
  handleViewAllReactionsClick(): void;
  /**
   * Handles calcitePopoverClose events emitted from the add reaction popover.
   * Resets state so default reactions render inside the add reaction popover
   * next time vs full collection
   */
  handleAddReactionPopoverClose(): void;
  /**
   * Handles focus events emitted from the reaction count and overflow buttons,
   * opens the appropriate popover
   * @param evt A FocusEvent
   */
  handleReactionFocus(evt: FocusEvent): void;
  /**
   * Handles mouse enter events emitted from the reaction count and overflow buttons,
   * opens the appropriate popover. Filters out events emitted by mousing over elements
   * nested within the button to prevent janky popover behavior.
   * @param evt A MouseEvent
   */
  handleReactionMouseEnter(evt: MouseEvent): void;
  /**
   * Handles calcitePopoverClose events, conditionally resets activePopover state
   * when no other popovers are open so the most recently opened popover can be
   * reopened
   * @param evt
   */
  handleReactionPopoverClose(evt: CustomEvent<any>): void;
  /**
   * Handles calcitePopoverBeforeOpen events emitted by popovers that contain user
   * details. Fetches only the necessary user records to render the popover, caching
   * the results to avoid duplicate requests for other popovers
   * @param evt A CalcitePopoverCustomEvent<void> event
   */
  handleReactionPopoverBeforeOpen(evt: CalcitePopoverCustomEvent<void>): Promise<void>;
  /**
   * Handles clicks to the reaction count buttons and reaction buttons from the
   * add reactions popover. If the user has not previously created a reaction
   * for the post, a new reaction will be created for the post. If the user has
   * previously created the reaction that was clicked, that reaction will be
   * deleted. If the user created one or more reactions other than what was
   * clicked, the previously existing reactions will be deleted before creating
   * the a the reaction
   * @param evt A MouseEvent
   */
  handleReactionClicked(evt: MouseEvent): Promise<void>;
  /**
   * Handles calcitePopoverOpen events emitted by popovers for reaction count and overflow
   * buttons.
   * @param evt A CalcitePopoverCustomEvent event
   */
  handleReactionPopoverOpen(evt: CalcitePopoverCustomEvent<void>): void;
  /**
   * Receives a reference to all reaction buttons in the add reaction popover's
   * expanded view of all reactions. Sets initial focus to the first button rendered
   * when the full collection of reactions renders
   * @param button
   */
  handleReactionRef(button: HTMLCalciteButtonElement): Promise<void>;
  /**
   * Builds an array of usernames to fetch, then fetches those user records
   * and updates the users cache
   * @returns A promise
   */
  fetchUserRecords(reaction: string): Promise<Record<string, IUser | null>>;
  /**
   * Fetches a user record for the given username. Imposes a 300ms artificial delay
   * so skeleton state can be observed
   * @param username The username whose record to fetch
   * @returns A promise that resolves an IUser or null
   */
  fetchUserRecord(username: string): Promise<IUser | null>;
  /**
   * Creates a reaction record for the current reaction and logs
   * telemetry
   * @param reaction The reaction to create
   */
  createReaction(reaction: PostReaction): Promise<void>;
  /**
   * Deletes a reaction record for the current reaction and logs
   * telemetry
   * @param reaction The reaction to create
   */
  deleteUserReaction(userReaction: IReaction): Promise<void>;
  /**
   * Renders a list containing reaction count buttons and popovers
   * @returns a list element
   */
  renderList(): HTMLElement[];
  /**
   * Renders a user reaction skeleton state
   * @param showEmoji
   * @returns A skeleton loader element
   */
  renderUserSkeleton(showEmoji: boolean): HTMLElement;
  /**
   * Renders a user reaction item
   * @param userReaction An IReaction to render
   * @param showEmoji If the emoji should render
   * @returns a list item
   */
  renderUserReaction(userReaction: IReaction, showEmoji: boolean): HTMLElement;
  /**
   * Renders a list of user reactions
   * @param userReactions The user reactions to render
   * @param showEmoji If the emoji should render
   * @returns a list item
   */
  renderUserReactions(userReactions: IReaction[], showEmoji: boolean): HTMLElement;
  /**
   * Renders the overflow button and popover
   * @returns a fragment
   */
  renderOverflow(): HTMLElement[];
  /**
   * Renders a list of the "default" reactions that initially render
   * in the add reaction popover
   * @returns a div
   */
  renderDefaultReactions(): HTMLElement;
  /**
   * Renders a list of all available reactions to be displayed in the
   * add reaction popover
   * @returns a list
   */
  renderAllReactions(): HTMLElement[];
  /**
   * Renders the add reaction button and popover
   * @returns a fragment
   */
  renderAddReaction(): HTMLElement;
  /**
   * Primary render method
   * @returns host element
   */
  render(): any;
}
export {};
