import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IArcGISContext, IConfigurationValues, IUiSchema, IChannel, IChangeEventDetail, IQuery, IHubCatalog, IHubCardViewModel, ICardActionLink } from '@esri/hub-common';
import { ISearchGroupUsersResult } from '@esri/arcgis-rest-portal';
import { IFacet, IGallerySelection } from '../../utils/types';
interface INoticeConfig {
  title?: string;
  message?: string;
  link?: {
    text: string;
    action: () => any;
  };
  kind?: string;
  icon?: string;
}
export declare class ArcgisHubChannelEditor {
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * An IConfigurationSchema representing that defines the form configuration
   */
  schema: import("@esri/hub-common").IConfigurationSchema;
  /**
   * A reference to the configuration-form element
   */
  editorRef: HTMLArcgisConfigurationEditorElement;
  /**
   * A reference to the host element
   */
  element: HTMLArcgisHubChannelEditorElement;
  /**
   * An optional channelId representing a channel to edit.
   */
  channelId: string;
  /**
   * The prefix to interpolate into the channel name input placeholder text
   */
  namePrefix: string;
  /**
   * Disables all form controls when true
   */
  disabled: boolean;
  /**
   * An optional HTML element reference to render the save button into
   */
  footerSlotRef: HTMLElement;
  /**
   * The channel record for the `channelId` value.
   */
  channel: IChannel;
  /**
   * The configuration form values
   */
  values: IConfigurationValues;
  /**
   * True when dependencies are being fetched
   */
  isLoading: boolean;
  /**
   * True when a create or update XHR is in flight.
   */
  isSaving: boolean;
  /**
   * True when all form validation pass
   */
  isValid: boolean;
  /**
   * Configures the title and kind of any active succes/error alert
   */
  alertConfig: {
    title: string;
    kind: string;
  };
  /**
   * True when we cannot create or edit a channel due to an access configuration
   * conflict with an existing channel
   */
  channelAlreadyExists: boolean;
  /**
   * An array of of all channel groups manager usernames
   */
  channelGroupsManagers: string[];
  /**
   * True when the gallery-picker is open
   */
  isGalleryPickerOpen: boolean;
  /**
   * An array of group ids that exists on the channel that the current user does not have access to
   */
  inaccessibleGroups: string[];
  /**
   * True when the user attempts to modify an existing channel is such a way that would result in the user losing
   * privileges to modify the channel. E.g. Channel org admins are permitted to modify channels with access `org`
   * and `public`, but are only permitted to modify `private` channels when they are owners/managers of one, or more,
   * of the channel groups.
   */
  showModifyConfirmationModal: boolean;
  /**
   * Emitted when the form successfully saves. Specifies whether the save was a `create` or `update`
   * operation and provides the updated channel record
   */
  arcgisHubChannelEditorSaved: EventEmitter<{
    action: 'create' | 'update';
    channel: IChannel;
  }>;
  /**
   * Emitted when the form fails to save
   */
  arcgisHubChannelEditorError: EventEmitter<void>;
  /**
   * Emitted when a user clicks the `Use existing channel` action that is rendered in a calcite-notice
   * when a create or update operation fails due to channel access configuration conflicts.
   */
  arcgisHubChannelEditorSelected: EventEmitter<IChannel>;
  hubTelemetry: EventEmitter<Record<string, any>>;
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
   * Getter for the global ArcGISContext
   */
  get _context(): IArcGISContext;
  /**
   * Computes true if the currently authenticated user is an org admin,
   * which includes custom roles
   */
  get isOrgAdmin(): boolean;
  /**
   * Computes the participantCatalogs for the group picker
   */
  get participantCatalogs(): IHubCatalog[];
  /**
   * Computes the facets for the participant group picker
   */
  get particpantFacets(): IFacet[];
  /**
   * Computes the IUiSchema for the form
   */
  get uiSchema(): IUiSchema;
  /**
   * Computes the channel orgs. When editing a channel, this will be the value of
   * the channel's `orgs` property. When creating a new channel, this will be an
   * array containing only the currently authenticated user's org id
   */
  get channelOrgsIds(): string[];
  /**
   * Computes an Array of notice configs to be rendered
   */
  get noticeConfigs(): INoticeConfig[];
  /**
   * Computes the IQuery used to populate the gallery component with relevant channel moderators.
   * For channels without groups, this will build a query for org admins only. When channel groups
   * exist, it will build a query for org admins and all channel group managers
   */
  get channelModeratorsQuery(): IQuery;
  /**
   * Computes the IQuery to be used to populate the gallery-picker component with potential
   * participant groups.
   */
  get participantGroupsQuery(): IQuery;
  /**
   * Computes the card action links for moderator cards
   */
  get moderatorsActionLinks(): ICardActionLink[];
  /**
   * Computes the participant action links
   */
  get participantActionLinks(): ICardActionLink[];
  /**
   * Loads channel groups managers
   */
  loadChannelGroupsManagers(): Promise<void>;
  /**
   * Fetches all dependencies then updates the form values
   */
  initialize(): Promise<void>;
  /**
   * Loads all dependencies
   */
  loadDependencies(): Promise<void>;
  /**
   * Updates the form values to match the relevant channel properties
   * and provides sane defaults
   */
  updateValues(): void;
  /**
   * Fetches all dependencies
   */
  fetchDependencies(): Promise<{
    channel: IChannel;
  }>;
  /**
   * Recursively searches for and resolves an array of all of a group's managers
   */
  searchAllGroupManagers(groupId: string): Promise<ISearchGroupUsersResult[]>;
  /**
   * Handles changes to the `values` state member, conditionally rebuilds
   * the channel moderators query when any of the channel groups change
   */
  handleValuesChanged(newValues: IConfigurationValues, prevValues: IConfigurationValues): Promise<void>;
  /**
   * Re-initializes the component when the `channelId` property changes
   */
  handleChannelIdChanged(): void;
  /**
   * Loads component translations
   */
  loadTranslations(): Promise<void>;
  /**
   * Handles `arcgisConfigurationEditorChange` events, updates `values`
   * and `isValid`
   */
  handleFormChanged(event: CustomEvent<IChangeEventDetail>): void;
  /**
   * Handles `arcgisConfigurationEditorInitialized` events, updates `isValid` to match
   * the validation result so `Save` button disabled state is set properly upon form load
   */
  handleFormInitialized(event: CustomEvent<IChangeEventDetail>): void;
  /**
   * Handles clicks to the `Save` button.
   */
  handleSaveClicked(): void;
  /**
   * Handles clicks to the `Confirm` button when prompting the user that their changes
   * will result in them losing update privileges to the channel.
   */
  handleConfirmUpdateClicked(): void;
  /**
   * Handles `calciteModalClose` events and clicks to the Cancel button, resets
   * `showModifyConfirmationModal` to false
   */
  handleModifyConfirmationModalClosed(): void;
  /**
   * Calls `updateChannel` when editing an existing channel, else will call `createChannel`. Sets
   * state members so appropriate notices and alerts render. Emits `arcgisHubChannelEditorSaved`
   * when successful or `arcgisHubChannelEditorError` when unsuccessful.
   */
  saveChannel(disabled: any): Promise<void>;
  /**
   * Handles `calciteAlertClose` events and updates component state to
   * no longer try to render the alert
   */
  handleAlertClosed(): void;
  /**
   * Handles clicks to the `Use existing channel` button. Searches for
   * the existing channel with the same channel access properties the
   * user has selected, then emits `arcgisHubChannelEditorSelected` with
   * that channel record
   */
  handleUseExistingChannel(): Promise<void>;
  /**
   * Handles clicks to the `Add participant group` button. opens the gallery-picker
   */
  handleAddParticipantGroupClicked(): void;
  /**
   * Handles `arcgisHubGalleryPickerClose` events emitted from the gallery-picker when it closes.
   * Updates local `isGalleryPickerOpen` state to keep it in sync with the actual
   * gallery-picker open/close state
   */
  handleParticipantsPickerClosed(): void;
  /**
   * Handles `arcgisHubGalleryPickerSelectionUpdate` events emitted by the gallery-picker when
   * the group selections change, manually validates the form since we're updating values outside
   * of the configuration-form
   */
  handleParticipantsPickerSelectionUpdated(evt: CustomEvent<IGallerySelection>): void;
  /**
   * Removes a participant group from values.groups and validates the form
   */
  removeParticipantGroup(model: IHubCardViewModel): void;
  /**
   * Redirects to the given URL
   */
  goToUrl(url: string): void;
  /**
   * Handles `arcgisHubGalleryAction` events and invokes the appropriate handler
   */
  handleGalleryAction(evt: CustomEvent<{
    action: string;
    model: IHubCardViewModel;
  }>): void;
  /**
   * Debounces calls to _validate
   */
  validate(): void;
  /**
   * Calls validate on the configuration editor. Useful to validate the form when
   * `values` is updated outside the configuration editor, e.g. when `values.groups`
   * is updated by the gallery-picker; that component is rendered into the configuration
   * editor via a slot at this time. Once the gallery-picker configuration-editor field
   * component is flexible for our needs, we can revisit removing this.
   */
  _validate(): Promise<void>;
  /**
   * Renders a gallery component of user cards for all
   * moderators (org admins, group managers) inferred
   * from the `access` and `groups` values
   */
  renderModerators(): HTMLElement;
  /**
   * Renders the appropriate success or error alert
   */
  renderAlert(): HTMLElement;
  /**
   * Renders relevant warning and error notices
   */
  renderNotices(): HTMLElement[];
  /**
   * Renders a notice for the given INoticeConfig
   */
  renderNotice({ title, message, link, kind, icon }: INoticeConfig): HTMLElement;
  /**
   * Renders the save button. If `footerSlotRef` is provided, we render
   * the save button into that element using `arcgis-wormhole`, else we
   * render the save button immediately below the form
   */
  renderSaveButton(): HTMLElement;
  /**
   * Renders the participants gallery and button
   */
  renderParticipants(): HTMLElement;
  /**
   * Renders the configuration editor
   */
  renderConfigurationEditor(): HTMLElement;
  renderModifyConfirmationModal(): HTMLElement;
  /**
   * Renders the form ui
   */
  renderForm(): HTMLElement;
  /**
   * Renders the skeleton ui
   */
  renderSkeleton(): HTMLElement;
  /**
   * Primary render method
   */
  render(): any;
}
export {};
