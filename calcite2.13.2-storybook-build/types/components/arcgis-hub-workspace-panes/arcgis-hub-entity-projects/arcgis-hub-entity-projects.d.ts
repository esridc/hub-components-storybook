import { EventEmitter } from '../../../stencil-public-runtime';
import { HubEntity, IHubCatalog, IArcGISContext, HubEntityType, IHubCardViewModel, IHubGroup, Permission } from '@esri/hub-common';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IWorkspaceEntityChange } from "../../../utils";
import { ProjectsPaneTabs } from './resources';
import { IArcgisHubEntityEditorSavedEvent } from '../../arcgis-hub-entity-editor/types';
export declare class ArcgisHubEntityProjects {
  element: HTMLElement;
  /** Hub entity */
  entity: HubEntity;
  /** Clone of entity passed in */
  _entity: HubEntity;
  /** association group for the entity */
  _associationGroup: IHubGroup;
  /** has access to the association group */
  _hasGroupAccess: boolean;
  /** current tab selected */
  _activeTab: ProjectsPaneTabs;
  /** association state (associated, pending & requesting) catalogs */
  _associationCatalogs: IHubCatalog[];
  /** whether the "request association" picker is open */
  _isPickerOpen: boolean;
  /** title of the active association state catalog */
  _activeCatalogKey: string;
  /** number of projects that have been requested by the entity to associate with */
  _requestingProjectsCount: number;
  /** whether the "add members" picker is open */
  _isUserPickerOpen: boolean;
  /** number of members in the association group */
  _membersCount: number;
  /** number of members in the association group that have joined in the past 30 days */
  _newMembersCount: number;
  /** reference to the slotted footer element */
  _footerSlotEl: HTMLElement;
  /** reference to the selected entity cards */
  groupMembersSelected: string[];
  /** Event to signal to the workspace that the entity has been saved */
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  /*** Emits telemetry information */
  hubTelemetry: EventEmitter<Record<string, any>>;
  /** request association gallery picker catalogs */
  _availableToRequestCatalogs: IHubCatalog[];
  /** reference to the arcgis-hub-catalog element */
  _catalogEl: HTMLArcgisHubCatalogElement;
  /** reference to members gallery arcgis-hub-gallery element */
  _membersGallery: HTMLArcgisHubGalleryElement;
  intl: ComponentIntl;
  /**
   * Pre-binds method context
   * @constructor
   */
  constructor();
  componentWillLoad(): Promise<void>;
  /** loads translations */
  loadTranslations(): Promise<void>;
  /** Group id for the association group */
  get _associationGroupId(): string;
  get _canCreateAssociationGroup(): boolean;
  /** contextual auth and portal information */
  get _context(): IArcGISContext;
  /** gets tab configs for the pane */
  get tabConfigurations(): {
    title: string;
    key: ProjectsPaneTabs;
    permissions: Permission[];
    content: HTMLElement;
  }[];
  /**
   * Callback fn to pass into the main associations gallery
   * to modify the card view models
   */
  get _associationsGalleryCallback(): (model: IHubCardViewModel, _layout: string, _context: IArcGISContext, _result: IHubCardViewModel) => IHubCardViewModel;
  get _associationGroupTelemetryDimensions(): Record<string, any>;
  /** sets the user's current access state to the association group */
  setGroupAccess(): Promise<void>;
  /** user can share content to the group
   * if isViewOnly is true, then managers or members can use actions
   * otherwise, just manager
  */
  get _canShareContent(): boolean;
  /** type of entity */
  get _type(): HubEntityType;
  get _isAssociationGroupManager(): boolean;
  /**
   * Function to initialize the pane.
   *
   * 1. gets the association state (associated, pending and requesting)
   * catalogs to populate the main gallery
   * 2. gets the catalogs to populate the "request association" picker
   */
  init: () => Promise<void>;
  /**
   * Fires after an action is taken in the gallery, like canceling or accepting a request.
   * @param evt
   */
  handleGalleryAction(evt: CustomEvent<{
    action: string;
    model: IHubCardViewModel;
  }>): Promise<void>;
  /**
   * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
   * intercept its telemetry and re-emit it from this component so
   * we don't lose the DOM context
   */
  handleHubTelemetry: (evt: CustomEvent<Record<string, any>>) => void;
  /** handler to update the active association state catalog */
  handleCatalogChange: (evt: CustomEvent<string>) => void;
  /** handler to open the "request association" picker */
  handlePickerOpen: () => void;
  /** handler to close the "request association" picker */
  handlePickerClose: () => void;
  /**
   * handler that fires when a tab is clicked
   * it render the correct content for the new tab
   */
  handleTabActivated: (evt: CustomEvent<void>) => void;
  /** handler to request associations with the selected projects */
  handlePickerSelectionUpdate: (evt: CustomEvent) => Promise<void>;
  /**
   * Creates an association group for the entity.
   * @param evt
   */
  handleAssociationGroupCreation: (evt: CustomEvent) => Promise<void>;
  /** handles the entity-editor's onEntityChange event */
  handleEditorChanged(event: CustomEvent): void;
  /** handles the entity-editor's onEntitySaved event */
  handleEditorSaved(event: CustomEvent<IArcgisHubEntityEditorSavedEvent>): void;
  /**
   * refresh the association gallery after confirming the
   * projects have been shared/unshared from the initiative's
   * association group
   * @param ids
   * @param isDissociation
   */
  refreshGallery(ids: string[], isDissociation?: boolean): Promise<void>;
  /**
   * Renders the members tab showing the members of the group
   * and potentially allowing adding new members
   * @returns
   */
  renderMembersTab(): HTMLElement;
  /**
   * Renders the settings for the association group
   */
  renderSettingsTab(): HTMLElement;
  /**
   * Renders the pane with all options
   * @returns
   */
  renderProjectsTab(): HTMLElement;
  /**
   * Renders the gallery of associations with facets.
   * @returns
   */
  renderAssociationsCatalog(): HTMLArcgisHubCatalogElement;
  /**
   * Renders the "Find projects" button and the gallery picker when the button is clicked.
   * The picker is used to request associations with projects.
   * @returns
   */
  renderRequestAssociation(): HTMLArcgisWormholeElement;
  /**
   * When the user does not have access to the association group,
   * render a help state to inform them of the restriction.
   * @returns
   */
  renderRestrictedAccessState(): HTMLArcgisHubHelpStateElement;
  renderMissingAssociationGroupState(): HTMLArcgisHubHelpStateElement;
  renderTabs(): HTMLCalciteTabsElement;
  /**
   * Determines what to render in the pane based on the association group state and the current user.
   * @returns
   */
  renderAssociationPaneContent(): HTMLElement;
  render(): any;
}
