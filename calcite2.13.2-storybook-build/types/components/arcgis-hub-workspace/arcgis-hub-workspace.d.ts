import { EventEmitter } from '../../stencil-public-runtime';
import { WorkspacePane, IWorkspaceEntityChange, IWorkspaceLinkClicked } from '../../utils/workspace';
import { HubEntity, HubEntityType, IHubSite, IPermissionAccessResponse } from '@esri/hub-common';
import { IWithContext } from '../../utils/state';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IHubInitializedEventDetail } from '../../utils/types';
/**
 * The arcgis-hub-workspace is the top-level workspace
 * component responsible for rendering the internal
 * management experience for Hub entities.
 */
export declare class ArcgisHubWorkspace implements IWithContext {
  element: HTMLElement;
  _context: import("@esri/hub-common").IArcGISContext;
  intl: ComponentIntl;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  isMobile: boolean;
  handleResize(): Promise<void>;
  layout: "default" | "inline";
  /**
   * Hub entity that this workspace is managing.
   *
   * Note: This component works by providing either
   * an entity OR an identifier + type
   */
  entity: HubEntity;
  /**
   * The slug or id of a hub entity that this workspace
   * is managing.
   *
   * Note: This component works by providing either
   * an entity OR an identifier + type
   */
  identifier: string;
  /** current workspace pane */
  pane: WorkspacePane;
  /**
   * A reference to the current site entity.
   */
  site: IHubSite;
  /**
   * Hub entity type
   *
   * Note: this is required if an identifier (rather than
   * an entity) is provided
   */
  type: HubEntityType;
  isLoading: boolean;
  _entity: HubEntity;
  isDirty: boolean;
  attemptedClick: IWorkspaceLinkClicked;
  shouldFocusPaneContainer: boolean;
  paneContainer: HTMLElement;
  arcgisHubWorkspaceAccessDenied: EventEmitter<IPermissionAccessResponse>;
  arcgisHubWorkspaceSignOut: EventEmitter<void>;
  arcgisHubWorkspaceEntityDelete: EventEmitter<HubEntity>;
  arcgisHubWorkspaceEntitySave: EventEmitter<void>;
  arcgisHubWorkspaceNavigate: EventEmitter<IWorkspaceLinkClicked>;
  arcgisHubWorkspaceInitialized: EventEmitter<IHubInitializedEventDetail>;
  dispatchInitializedEvent(): void;
  handleWorkspaceEntityDelete(evt: CustomEvent<HubEntity>): void;
  handleWorkspaceLinkClicked(evt: CustomEvent<IWorkspaceLinkClicked>): void;
  handlePaneInitialized(): void;
  handleEntityChanged(evt: CustomEvent<IWorkspaceEntityChange>): void;
  onSignout(): void;
  onDirtyStateModalClosed(): void;
  /**
   * This component works by allowing the consumer to provide either:
   * 1. a full entity (HubEntity)
   * 2. an entity type and identifier - in this case, we fetch the
   * HubEntity based on the provided information
   *
   * We store the provided or fetched HubEntity on the internal
   * _entity state property
   */
  handleFetchingPropsChanged(): Promise<void>;
  private _setPaneContainer;
  /**
   * Fetches the workspace's entity and populates the internal _entity state property.
   * Fetches can trigger the loading UI (e.g., on initial startup) or be silent (e.g.,
   * refreshing after an entity has been updated)
   * @param showLoading
   */
  fetchEntity(opts?: {
    showLoading?: boolean;
  }): Promise<void>;
  /**
   * We need to watch the provided HubEntity so we can reset the
   * internal _entity state property if it changes
   */
  handleEntityChange(): void;
  handle_EntityChange(): void;
  checkEntityAccess(): void;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * As described above, this component works by providing either:
   * 1. a full entity (HubEntity)
   * 2. an entity type and identifier
   *
   * since type is only optionally provided, we need an internal
   * _type property that's either the provided type or derived
   * from the provided entity
   */
  get _type(): HubEntityType;
  /**
   * if a component is not defined in the entity's link definitions,
   * we should fall back to the pane default
   */
  get defaultPaneComponents(): Record<string, string>;
  get paneComponent(): string;
  get shouldShowDirtyStateModal(): boolean;
  get _isSelfFetching(): boolean;
  renderHeader(): HTMLArcgisHubWorkspaceHeaderElement;
  renderNavigation(): HTMLArcgisHubWorkspaceNavigationElement;
  renderPane(): HTMLElement;
  renderFooter(): HTMLElement;
  renderDirtyStateModal(): HTMLElement;
  render(): any;
}
