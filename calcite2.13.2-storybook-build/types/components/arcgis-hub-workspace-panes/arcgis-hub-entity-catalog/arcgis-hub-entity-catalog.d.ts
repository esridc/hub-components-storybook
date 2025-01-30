import { EventEmitter } from '../../../stencil-public-runtime';
import { HubEntity, IConfigurationValues, IHubCatalog, IQuery, IUiSchema, Kilobyte, EntityType } from '@esri/hub-common';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IWorkspaceEntityChange, WorkspacePane } from '../../../utils';
import { WellKnownFacetTypes } from '../../arcgis-hub-gallery/utils/facets';
import { LayoutOptions } from '../../../utils/types';
export declare class ArcgisHubEntityCatalog {
  element: HTMLElement;
  /** Hub entity */
  entity: HubEntity;
  /** Hub workspace pane -- what is the target entity right now */
  pane: WorkspacePane;
  /** internal copy of an entity's catalog */
  _catalog: IHubCatalog;
  /** indicates whether the catalog config panel is open */
  _isConfigurationPanelOpen: boolean;
  /** ref to the element to slot the footer save changes button into */
  footerSlotEl: HTMLElement;
  /** indicates whether the catalog appearance panel is open */
  _isAppearancePanelOpen: boolean;
  /** the key of the collection currently being edited */
  _editedCollectionKey: string;
  /** the key of the collection currently being viewed */
  _renderedCollectionKey: string;
  /**
  * query string sizes to determine if we are close to limits
  * stored as a record with keys as target entities or collection keys, depending on if it is a catalog or collection query
  * collection query sizes are stored taking the catalog query size into account
  */
  _currentQuerySizes: Record<string, Kilobyte>;
  /**
   * whether or not at least one query size limit has currently been reached
   * if so, we disable the publish button
   */
  _querySizeLimitReached: boolean;
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  /** event to emit Hub telemetry */
  hubTelemetry: EventEmitter<any>;
  _intl: ComponentIntl;
  /**
   * ref to the currently open panel
   */
  _activePanelRef: HTMLCalcitePanelElement;
  /**
   * ref to the configure catalog button that opens the configuration panel,
   * */
  _configureCatalogButtonRef: HTMLCalciteButtonElement;
  /**
   * ref to the calcite flow component that contains the panel.
   */
  _calciteFlowRef: HTMLCalciteFlowElement;
  constructor();
  componentWillLoad(): Promise<void>;
  init(): void;
  /** contextual portal and auth information */
  private get _context();
  /** whether the entity has a catalog configured */
  get _hasCatalog(): boolean;
  /** whether the configured catalog is technically "empty" */
  get _isCatalogEmpty(): boolean;
  /**
   * The UI schema for the catalog builder
   */
  get _catalogBuilderUiSchema(): IUiSchema;
  get _targetEntity(): EntityType;
  /**
   * We pass this to the arcgis-hub-catalog component as it takes an array
   * We memoize this so that we don't have to recompute it every time (causing a new array in memory, causing a rerender of the component)
   */
  get _catalogs(): IHubCatalog[];
  /**
   * We pass this to the arcgis-hub-catalog component as it takes an array
   * We memoize this so that we don't have to recompute it every time (causing a new array in memory, causing a rerender of the component)
   */
  get _facets(): WellKnownFacetTypes[];
  /**
   * We pass this to the arcgis-hub-catalog component as it takes an array
   * We memoize this so that we don't have to recompute it every time (causing a new array in memory, causing a rerender of the component)
   */
  get _layoutOptions(): LayoutOptions[];
  /**
   * A callback to get the ref to the calcite flow. This allows us
   * to pass the flow into the uiSchema for the collections editor,
   * which will allow us to open the collections editor in a third
   * level of flow.
   *
   * NOTE: we use a function to get the ref rather than passing the ref itself
   * because the configuration editor will wipe an html reference when loading (in cloning the object)
   */
  getCalciteFlowRef: () => HTMLCalciteFlowElement;
  /**
   * Handles the event emitted by the arcgis-hub-gallery component
   * when a query is executed. This is used to determine the size
   * of the query string that was just executed
   * @param event
   */
  handleArcgisHubGalleryExecutedQuerySize(event: CustomEvent): void;
  /**
   * Handles when the key of the collection being edited changes
   * @param key: string
   */
  handleArcgisHubCollectionsBuilderEditedCollectionKeyChange(key: string): Promise<void>;
  /**
   * Called when collections are removed from the catalog.
   * This is used to remove the query sizes of the removed collections
   * @param collectionKeys
   */
  handleCollectionsRemoved: (collectionKeys: string[]) => void;
  /**
   * Called when the catalog scope is changed in the catalog builder.
   * This is used to recalculate the query sizes of the target entity's scope
   * and all of its collections
   * @param query
   * @param targetEntity
   */
  handleCatalogScopeChange: (query: IQuery, targetEntity: EntityType) => void;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  /**
   * Closes all open panels and sets focus back onto the action button that opened the panel
   */
  collapseAllPanels: () => void;
  /**
   * Toggles the active panel
   * @param evt
   */
  toggleActivePanel: () => void;
  /**
   * Sets the ref to the currently shown calcite panel. Also sets focus on it
   * if it was just opened.
   * @param panel
   */
  setPanelRef: (panel: HTMLCalcitePanelElement) => void;
  /**
   * Sets the ref of the configure catalog button so that we can set focus on it later.
   * @param action
  */
  setConfigureButtonRef: (button: HTMLCalciteButtonElement) => void;
  /**
   * Sets the ref of the calcite flow in the panel.
   * @param flow
   */
  setCalciteFlowRef: (flow: HTMLCalciteFlowElement) => void;
  /**
   * Sets the key of the collection that is currently in view on the catalog
   * @param evt
   */
  setRenderedCollectionKey: (evt: CustomEvent) => void;
  /**
   * Handles the change event emitted by the configuration form
   * @param evt
   */
  handleCatalogChange: (evt: CustomEvent<IConfigurationValues>) => void;
  /** persist the updated catalog configuration on the entity */
  handleCatalogSave: () => Promise<void>;
  /** render the entity's configured catalogs
   * we pass a holistic set of facets to the catalog
   * and the gallery will filter them based on the
   * target entity type
   */
  renderCatalogs(): HTMLArcgisHubCatalogElement;
  /**
 * Renders query size warnings and danger notices if
 * any of the query sizes are over the limits
 * @returns
 */
  renderQuerySizeNotices(): HTMLElement[];
  /**
   * If a catalog is NOT configured on the entity,
   * we render an empty state prompting the user
   * to configure one
   */
  renderEmptyState(): HTMLElement;
  /** render the panel to configure the details of a catalog */
  renderDetailsPanel(): HTMLCalcitePanelElement;
  /** render the shell panel */
  renderConfigurationShellPanel(): HTMLCalciteShellPanelElement;
  render(): any;
}
