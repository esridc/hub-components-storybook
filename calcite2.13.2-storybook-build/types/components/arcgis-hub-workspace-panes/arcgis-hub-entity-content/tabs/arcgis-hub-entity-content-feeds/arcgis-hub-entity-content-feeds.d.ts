import { FeedFormat, IUiSchemaElement, IConfigurationSchema, IConfigurationValues, IHubCatalog, IHubSearchResult, IFilter } from "@esri/hub-common";
import { VNode, EventEmitter } from "../../../../../stencil-public-runtime";
import { ComponentIntl } from "../../../../../utils/stencil-intl";
import { ContentPaneTabs, HubEntityWithFeeds } from "../../types";
import { IWorkspaceEntityChange } from "../../../../../utils/workspace/types";
/**
 * This component is responsible for configuring feeds for a Hub entity.
 * As of now, feeds are only supported for public sites with a group-based catalog.
 * Feeds also only support item-based results, so other entity types are not supported (e.g., events)
 * Once our backend APIs support feeds for other entity types, we can expand functionality here.
 */
export declare class ArcgisHubEntityContentFeeds {
  element: HTMLArcgisHubEntityContentFeedsElement;
  /**
   * The entity to configure feeds for
   */
  entity: HubEntityWithFeeds;
  /**
   * Reference passed from above so we can correctly place the save button
   */
  footerSlotRef: HTMLElement;
  /**
   * Whether the entity's catalog definition does not have any groups.
   * This is a blocker for configuring feeds based on the current implementation.
   */
  hasGrouplessCatalog: boolean;
  /**
   * Whether the entity has no public items in its catalog.
   * Due to the existing implementation, feeds are useless
   * if there is no public content to federate.
   */
  hasEmptyPublicCatalog: boolean;
  /**
   * Whether feeds toggle is currently enabled on the form
   */
  isFeedsToggleEnabled: boolean;
  /**
   * The base feed format that is currently being configured.
   */
  feedFormat: FeedFormat;
  /**
   * The version of the feed format that is currently being configured.
   */
  feedVersion: string;
  /**
   * The template string that is currently present in the code editor.
   * May represent a full or partial JSON object.
   */
  feedTemplate: string;
  /**
   * Whether the user has toggled the "preview" functionality for the current feed template.
   */
  isPreviewing: boolean;
  /**
   * Since previewing requires a valid item to function, we have an item picker present
   * in the right rail. This schema is used to configure the item picker.
   */
  previewPickerSchema: IConfigurationSchema;
  /**
   * Since previewing requires a valid item to function, we have an item picker present
   * in the right rail. This uiSchema is used to configure the item picker. We need to have
   * this as state so we can update the options based on the current entity's catalog.
   */
  previewPickerUiSchema: IUiSchemaElement;
  /**
   * The hubId of the item that is currently selected for previewing.
   * NOTE: The current implementation of feeds requires a valid hubId to preview,
   * not an item id. This is due to limitations in our indexer.
   */
  previewHubId: string;
  /**
   * Pre-formatted preview of the current feed template.
   */
  formattedPreview: string;
  /**
   * Used to track whether the feeds toggle has been changed by the user.
   * We need to keep this separate from the template editor dirty state since
   * the template is a mini form in itself and can be reset independently.
   */
  isFeedsToggleDirty: boolean;
  /**
   * Used to track whether the feed template editor has been changed by the user.
   */
  isTemplateEditorDirty: boolean;
  isSaving: boolean;
  /**
   * When a user has unsaved changes and attempts to change the actively edited feed format,
   * we prompt the user to either discard changes or cancel the transition. This state
   * is used to keep track of the format change that was attempted.
   */
  attemptedFormatChange: {
    format: FeedFormat;
    version: string;
    event: MouseEvent | KeyboardEvent;
  };
  /**
   * Whether the component is currently loading data / initializing.
   */
  isLoading: boolean;
  previewStatus: {
    state: 'loading' | 'error' | 'success';
    message?: string;
  };
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  /**
   * Event emitted when the user clicks a button that requires a tab change from the parent
   * <arcgis-hub-entity-content> component (e.g.,"Configure Catalog" button that displays
   * when the entity has no groups configured for their catalog. "View Catalog" button that
   * displays when the entity has no public items in their catalog, etc.)
   */
  arcgisHubEntityContentTabChangeRequest: EventEmitter<ContentPaneTabs>;
  hubTelemetry: EventEmitter<any>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * Whenever the entity changes (e.g., sharing level is changed in the workspace header)
   * we need to re-initialize the component to reflect the new state. Feeds is very dependent
   * on the current configuration of the entity.
   */
  initializeComponent(): Promise<void>;
  setIsLoading(value: boolean): void;
  /**
   * Initializes the component state based on the current entity configuration.
   * NOTE: Call this.initializeComponent() instead of this method directly.
   */
  _initializeState(): Promise<void>;
  /**
   * TODO: consider moving to a utility
   * Fetch the first public item from the entity's catalog. Used to derive the
   * item for previewing and to set the state of the preview picker.
   * @param additionalFilters additional filters to apply to the search query
   * @returns the first public result within the entity's catalog
   */
  fetchPublicResultFromCatalog(additionalFilters?: IFilter[]): Promise<IHubSearchResult>;
  /**
   * TODO: consider moving to a utility
   *
   * Derive a valid hubId for the preview functionality based on a search result.
   * Due to idiosyncrasies of our indexing system, we need to jump through
   * a number of hoops to calculate the correct id.
   * @param searchResult IHubSearchResult used derive the preview hubId from.
   * Should be enriched with server info if it's a service.
   * @returns a valid hubId for the preview picker
   */
  getPreviewHubId(searchResult: IHubSearchResult): string;
  setPreviewPickerSchemas(): void;
  /**
   * Returns whether feeds could even be configured for the current entity.
   */
  get isFeedsSupported(): boolean;
  get supportedFeeds(): {
    format: FeedFormat;
    version: string;
  }[];
  get hasUneditableAttributes(): boolean;
  /**
   * returns the base i18n key for the current feed format and version
   */
  get baseFeedIntlKey(): string;
  /**
   * Calculates the base i18n key for a given feed format and version.
   * @param format
   * @param version
   * @returns the base i18n key
   */
  getBaseFeedIntlKey(format: FeedFormat, version: string): string;
  /**
   * Whether the current feed template in the editor contains invalid JSON.
   * We use this for messaging and to prevent the user from saving invalid JSON.
   */
  get hasInvalidJson(): boolean;
  /**
   * Returns a modified version of the entity's catalog that is suitable for feeds,
   * (Namely it only includes public items and removes extraneous collections)
   */
  get _publicItemCatalog(): IHubCatalog;
  /**
   * Returns the values for the preview functionality's item picker
   */
  get previewPickerValues(): IConfigurationValues;
  /**
   * Returns the entity's access url for the currently selected format and version.
   */
  get feedAccessUrl(): string;
  /**
   * Returns whether the component is generally in a dirty state. (i.e,
   * the user has made changes to the feeds toggle OR the template editor)
   *
   * NOTE: Be very careful when relying on this property. Due to the form-
   * within-a-form nature of the template editor, it's possible that the property
   * you actually care about is `this.isTemplateEditorDirty`
   */
  get isDirty(): boolean;
  get shouldDisableSaveButton(): boolean;
  /**
   * Clears the dirty state of the template editor and re-populates
   * it with the template for the given format and version.
   *
   * Will also respect the preview toggle state and attempt to preview if active.
   *
   * @param format feed format to initialize the editor with
   * @param version feed format version to initialize the editor with
   */
  initializeTemplateEditor(format: FeedFormat, version: string): void;
  openCatalogConfigTab(): void;
  openCatalogTab(): void;
  handleFeedsEnabledToggle(): void;
  /**
   * Function that intercepts the feed format change event if the template editor is dirty.
   * If the editor is dirty, we prompt the user to either discard changes or cancel the transition.
   */
  handleFeedFormatChange(event: MouseEvent | KeyboardEvent): void;
  handlePreviewToggle(): Promise<void>;
  /**
   * Called whenever the preview toggle is activated. If appropriate
   * conditions are met, we attempt to preview the current feed template.
   */
  handlePreviewAttempt(): Promise<void>;
  setPreviewStatus(status: 'loading' | 'error' | 'success', message: string): void;
  /**
   * Handles the event emitted by the preview picker when the user
   * selects a new item to preview (or clears the selection entirely)
   */
  handlePreviewItemChange(event: CustomEvent): Promise<void>;
  handleCodeEditorChange(event: CustomEvent<string>): void;
  _handleCodeEditorChange(event: CustomEvent<string>): void;
  /**
   * Emits telemetry for the save attempt
   * @param response the response from the save attempt
   */
  saveTelemetry(response: string): void;
  handleSaveFeedsClick(): Promise<void>;
  setIsSaving(value: boolean): void;
  /**
   * This is a listener for the dirty state modal that is specific to the template editor.
   * When a user attempts to change the feed format while the template editor is dirty,
   * we prompt the user to either discard changes or cancel the transition. This listener
   * is responsible for handling the user's choice.
   */
  handleDirtyStateModalClosed(event: CustomEvent): void;
  renderHeaderRow(): VNode;
  renderFeedsNotSupportedUi(): VNode;
  renderEditorColumn(): VNode;
  renderTemplateEditor(): VNode;
  renderPreview(): VNode;
  /**
   * Emits telemetry when the user clicks the copy button for the feed access url
   */
  handleCopyButtonClicked(): void;
  renderToolsColumn(): VNode;
  renderPreviewPicker(): VNode;
  renderFeedDescription(): VNode;
  renderFeedVerificationLabel(): VNode;
  renderDirtyStateModal(): VNode;
  renderMain(): VNode;
  renderLoading(): VNode;
  render(): VNode;
}
