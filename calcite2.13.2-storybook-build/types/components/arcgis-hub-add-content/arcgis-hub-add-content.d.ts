import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { HubEntity, HubEntityType, IAddContentCreateWorkflowConfig, IAddContentExistingWorkflowConfig, IAddContentUploadWorkflowConfig, IAddContentWorkflowConfig, IHubCatalog, IHubSite, IQuery } from '@esri/hub-common';
export declare type AddContentEntityType = Exclude<HubEntityType, 'initiativeTemplate' | 'content' | 'org' | 'template' | 'survey' | 'user'>;
export interface IAddContentDropdownEntry {
  label?: string;
  description?: string;
  workflowConfig: IAddContentCreateWorkflowConfig | IAddContentExistingWorkflowConfig | IAddContentUploadWorkflowConfig;
  entityType: AddContentEntityType;
}
/**
 * Add content component
 * Renders dropdown with options to add content to a Hub entity
 * Currently only supports adding existing content
 * In the near future will support creating new content and uploading content
 */
export declare class ArcgisHubAddContent {
  element: HTMLArcgisHubAddContentElement;
  /**
   * The query to use to create the configuration for the add content workflow
   * If provided, will override the catalog prop
   */
  query: IQuery;
  /**
   * Catalog to use to create the configuration for the add content workflow
   * Providing either the Query or Config prop will override this prop
   */
  catalog: IHubCatalog;
  /**
   * The configuration for the add content workflow
   * If provided, will override the query and catalog props
   * If none of the above are provided, will use the default configuration
   */
  config: IAddContentWorkflowConfig;
  /**
   * A reference to the entity this component is being rendered within the context of. E.g. an IHubProject when in a project's Workspace or View
   */
  entity: HubEntity;
  /**
   * A reference to the current site entity.
   */
  site: IHubSite;
  /**
   * When provided and an entry exists within the config for the provided type, will render a create button for the entity type rather than a dropdown
   */
  entityType?: AddContentEntityType;
  /**
   * The active configuration for the add content workflow
   * This may have been passed in as a prop or derived from the query or catalog
   */
  workflowConfig: IAddContentWorkflowConfig;
  /**
   * Whether to show the group selection step in the create workflow
   */
  allowGroupSelection: boolean;
  /**
   * The text to render on the button - optional, will default to 'Add content'
   */
  buttonText: string;
  /**
   * The props to apply to the calcite-button
   */
  buttonProps: Record<string, any>;
  /**
   * Override for the "create" dropdown item title
   */
  addExistingTitle: string;
  /**
   * Override for the "create" dropdown item description
   */
  addExistingDescription: string;
  intl: ComponentIntl;
  _context: import("@esri/hub-common").IArcGISContext;
  disconnectContext: () => void;
  shouldShowModal: boolean;
  selectedConfig: IAddContentDropdownEntry;
  hubTelemetry: EventEmitter<Record<string, any>>;
  arcgisHubAddContentWorkflowComplete: EventEmitter<void>;
  componentWillLoad(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  processConfiguration(): void;
  get dropDownEntries(): IAddContentDropdownEntry[];
  get isMemberOfRequiredGroup(): boolean;
  get isDisabled(): boolean;
  get tooltip(): string;
  get specificEntityTypeToCreate(): IAddContentDropdownEntry;
  /**
   * Computes the button text
   */
  get _buttonText(): string;
  handleAddContentWorkflowComplete: (evt: CustomEvent) => void;
  /**
   * Handler for the dropdown button click
   */
  handleDropdownButtonClick: () => void;
  /**
   * Handler for dropdown item click
   */
  handleDropdownItemSelect: (event: CustomEvent) => void;
  /**
   * Click handler for button to create a specific entity type
   */
  handleButtonClick: () => void;
  /**
   * Sets the selectedConfig to the provided dropdownEntry
   * @param dropdownEntry The dropdown entry to set as the selectedConfig
   */
  selectDropdownEntry(dropdownEntry: IAddContentDropdownEntry): void;
  /**
   * Handler for onCalciteModalClose event
   */
  handleModalClose: () => void;
  /**
   * Handler for onArcgisHubAddContentWorkflowClose event
   */
  handleClose: () => void;
  /**
   * workaround for dropdown scrolling issue.
   * This should be addressed by passing maxItems to the dropdown
   * but https://github.com/Esri/calcite-components/issues/6230
   * TODO: remove when calcite issue is addressed
   */
  handleCalciteDropdownRef: (dropdown: HTMLCalciteDropdownElement) => void;
  get modalHeader(): string;
  renderModalContent(): VNode;
  renderDropdownItem: (config: IAddContentDropdownEntry, index: number) => VNode;
  renderDropdown(): VNode;
  _renderButton(props?: Record<string, any>): VNode;
  renderButton(): VNode;
  render(): any;
}
