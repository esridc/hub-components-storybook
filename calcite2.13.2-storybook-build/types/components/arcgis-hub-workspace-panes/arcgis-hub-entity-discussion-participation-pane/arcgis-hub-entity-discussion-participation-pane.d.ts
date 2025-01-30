import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IArcGISContext, ICardActionLink, IHubCardViewModel, IChannel, HubEntity, IHubSearchResult, IWithDiscussions } from '@esri/hub-common';
import { IChannelDetails } from '../../../utils/discussions/types';
import { IFacet, IGallerySelection } from '../../../utils/types';
import { IGroup } from '@esri/arcgis-rest-portal';
import { IWorkspaceEntityChange } from '../../../utils/workspace';
import { IGroupsChangedEvent } from '../../arcgis-hub-group-list-manager/types';
import { CardViewModelCallback } from '../../../utils/cardModelConverters/types';
declare type ArcgisHubEntityDiscussionParticipationPaneView = 'createChannel' | 'viewChannel' | 'editChannel' | 'default';
interface IActionConfig {
  onClick: () => void;
  appearance?: string;
  text: string;
  className: string;
}
export declare class ArcgisHubEntityDiscussionParticipationPane {
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * A reference to the `arcgis-hub-workspace-pane` element. Used to scroll
   * to the top of the pane when the `arcgis-hub-channel-editor` component
   * is rendered and an error occurs creating/saving a channel
   */
  workspacePaneRef: HTMLArcgisHubWorkspacePaneElement;
  /**
   * A reference to the host element
   */
  element: HTMLArcgisHubEntityDiscussionParticipationPaneElement;
  /**
   * Entity of the workspace
   */
  entity: HubEntity;
  /**
   * The record for the configured channel
   */
  channel: IChannel;
  /**
   * The channel groups for the configured channel
   */
  channelGroups: IGroup[];
  /**
   * Tracks the open state of the gallery picker
   */
  galleryPickerOpen: boolean;
  /**
   * True when dependencies are being fetched
   */
  isLoading: boolean;
  /**
   * The view of the component, one of "createChannel", "viewChannel", "editChannel" or "default"
   */
  view: ArcgisHubEntityDiscussionParticipationPaneView;
  /**
   * The channel ID to provide to the channel editor component, controls whether we edit an existing channel
   * or create a net-new channel
   */
  channelEditorId: string;
  /**
   * A reference to the sticky footer div that we render the `Save` button into
   */
  footerSlotEl: HTMLElement;
  /**
   * True if there are available existing channels
  */
  channelsExist: boolean;
  /**
   * Array of edit groups the user is a member of
   */
  currentEditGroups: string[];
  /**
   * Array of view groups the user is a member of
   */
  currentViewGroups: string[];
  /**
   * True when the remove channel confirmation modal is visible
   */
  showRemoveChannelConfirmation: boolean;
  /**
   * Emits hub telemetry events
   */
  hubTelemetry: EventEmitter<Record<string, any>>;
  /**
   * Emitted when the entity is updated from within this component so upstream references
   * can be updated to reflect the changes
   */
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  /**
   * Pre-binds context to methods that are passed by reference
   * @constructor
   */
  constructor();
  /**
   * Component will load lifecycle method. Loads translations and dependencies
   */
  componentWillLoad(): Promise<void>;
  /**
   * Computes the card action links to be rendered by the channel card when a channel is configured,
   * or by the channel cards rendered by the gallery component
   */
  get cardActionLinks(): ICardActionLink[];
  /**
   * Computes relevant warnings when the user cannot edit the selected channel
   */
  get editChannelWarningConfig(): {
    title: string;
    message: string;
  };
  /**
   * Getter for the global IArcGISContext
   */
  get _context(): IArcGISContext;
  /**
   * Can the current user edit the channel
   */
  get canEditChannel(): boolean;
  /**
   * Computes the channel editor flow configuration, specifies the
   * appropriate header text and back action
   */
  get channelEditorFlowConfig(): {
    heading: string;
    action: () => void;
  };
  get discussableEntity(): IWithDiscussions;
  get discussionSettings(): import("@esri/hub-common").IDiscussionsSettings;
  get entitySettingsId(): string;
  /**
   * Computes the channel help state config
   */
  get channelHelpState(): {
    heading: string;
    message: string;
    actions: IActionConfig[];
  };
  /**
   * Convert channel to search result format
   */
  get channelSearchResult(): IHubSearchResult;
  /**
   * Callback fn to translate card view model
   *
   * @param model - A IHubCardViewModel object
   * @returns {IHubCardViewModel}
   */
  channelCardCallback: CardViewModelCallback;
  /**
   * Loads translations
   */
  loadTranslations(): Promise<void>;
  /**
   * Loads dependencies
   */
  loadDependencies(): Promise<void>;
  /**
   * Fetches dependencies, imposing a minimum 300ms delay for the promise
   * to resolve so skeleton state can be observed
   */
  fetchDependencies(): Promise<{
    channel: IChannel;
    channelGroups: IGroup[];
  }>;
  formatAccess(access: string): string;
  formatDate(date: Date): string;
  /**
   * Returns the user to the default view
   */
  handleViewBackClicked(): void;
  /**
   * Resets galleryPickerOpen to false when the gallery picker closes
   */
  handleHubGalleryPickerClose(): void;
  /**
   * Loads channel details for the channel selected from the gallery picker
   * and updates the channel settings
   */
  handleHubGalleryPickerSelectionUpdate(event: CustomEvent<IGallerySelection>): Promise<void>;
  /**
   * Open the gallery picker modal to select a channel when the `Browse all channels`
   * button is clicked
   */
  handleBrowseButtonClicked(): void;
  /**
   * Sets channelEditorId to the channel ID to edit or view and
   * sets the appropriate view
   */
  handleEditOrViewChannel(model: IHubCardViewModel, action: string): void;
  /**
   * Handles `arcgisHubCardAction` events and delegates to the appropriate handler method.
   * We need to use `@Listen` here vs directly assigning `onArcgisHubCardAction` because we
   * need to handle this event when it's emitted from both the channel card and gallery
   * components
   */
  handleHubCardAction(event: CustomEvent<{
    action: string;
    model: IHubCardViewModel;
  }>): void;
  /**
   * Navigates the user away from the current URL to the Hub Home user profile page
   */
  goToUserProfile(username: string): void;
  /**
   * Handles `arcgisHubChannelEditorSaved` events. Loads the channel details
   * for new events & refreshes channel details after editing the set/configured event.
   * Updates settings when a new channel is created.
   */
  handleChannelEditorSaved(evt: CustomEvent<{
    action: 'create' | 'update';
    channel: IChannel;
  }>): Promise<void>;
  /**
   * Scrolls to the top of the workspace pane when the channel editor encounters
   * an error so the user will see the calcite-notice with `Use existing channel`
   * button when a channel cannot be created/updated due to channel access conflicts.
   */
  handleChannelEditorError(): void;
  /**
   * Loads channel details for the given partial channel details.
   */
  loadChannelDetails(options: Partial<IChannelDetails>): Promise<void>;
  /**
   * Handles `arcgisHubChannelEditorSelected` events that's emitted when a user
   * clicks the `Use existing channel` action thats' renderd when the channel editor
   * cannot create/edit a channel due to channel access conflicts. Loads channel details
   * for the selected channel and updates settings.
   */
  handleChannelEditorSelected(evt: CustomEvent<IChannel>): Promise<void>;
  /**
   * Handles `arcgisHubCardAction` events emitted when the `Select`
   * action is clicked from a channel card
   */
  handleSelectChannelClicked(model: IHubCardViewModel): Promise<void>;
  /**
   * Handles `arcgisHubCardAction` events emitted when the `Remove`
   * action is clicked from a channel card
   */
  handleRemoveChannelClicked(): Promise<void>;
  /**
   * Handles clicks to the Remove channel button that is rendered in the channel help state
   * when a channel is set, but the user doesn't have access to the channel
   */
  handleRemoveInaccessibleChannelClicked(): void;
  /**
   * Handles clicks to the Cancel button or the close X of the remove channel confirmation modal
   */
  handleRemoveChannelCanceled(): void;
  /**
   * Creates or updates the discussion entity settings
   */
  createOrUpdateSettings(): Promise<void>;
  /**
   * Handles click events from the `New Channel` button, changes to the
   * create channel view
   */
  handleNewChannelClicked(): void;
  handleAccessChange(evt: CustomEvent): Promise<void>;
  get canShareToGroups(): boolean;
  get isEntityOwner(): boolean;
  fetchExistingSharingGroups(entityId: string, context: IArcGISContext): Promise<void>;
  get facets(): IFacet[];
  handleEditGroupUpdate(evt: CustomEvent<IGroupsChangedEvent>): Promise<void>;
  handleViewGroupUpdate(evt: CustomEvent): Promise<void>;
  shareEntityWithGroups(entity: HubEntity, groupIds: string[]): Promise<void>;
  /**
   * Renders the gallery picker element
   */
  renderGalleryPicker(): HTMLArcgisHubGalleryPickerElement;
  /**
   * Renders the channel editor in a calcite-flow-item when viewing, editing or creating
   * a new channel
   */
  renderChannelEditor(): HTMLElement;
  /**
   * Renders the default view of the component
   */
  renderDefault(): HTMLElement;
  /**
   * Renders the channel card for the configured/selected channel
   */
  renderChannelCard(): HTMLElement;
  /**
   * Renders the help state for when a channel is not yet set, or one is set
   * but the user doesn't have access to it
   */
  renderChannelHelpState(): HTMLElement;
  /**
   * Renders the remove confirmation modal
   */
  renderRemoveChannelConfirmation(): HTMLElement;
  /**
   * Renders the footer div that the save button will be rendered into
   */
  renderFooter(): HTMLElement;
  renderWhoCanView(): HTMLElement;
  renderWhoCanEdit(): HTMLElement;
  renderWhoCanParticipate(): HTMLElement;
  renderHeader(): HTMLElement;
  renderSidePanel(): HTMLElement;
  renderPane(): HTMLElement;
  /**
   * Renders skeleton state
   */
  renderSkeleton(): HTMLElement;
  /**
   * Primary render method
   */
  render(): any;
}
export {};
