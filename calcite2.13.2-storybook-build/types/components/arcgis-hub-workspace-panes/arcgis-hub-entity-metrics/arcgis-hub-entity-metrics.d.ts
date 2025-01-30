import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { CalciteDropdownItemCustomEvent } from '@esri/calcite-components';
import { IWorkspaceEntityChange } from '../../../utils/workspace';
import { IArcgisHubEntityEditorSavedEvent } from '../../arcgis-hub-entity-editor/types';
import { MetricEditorTabs } from './resources';
import { HubEntity, HubEntityType, IMetric, IMetricDisplayConfig, MetricVisibility, IConfigurationValues } from '@esri/hub-common';
export declare class ArcgisHubEntityMetrics {
  element: HTMLElement;
  /** Hub entity of which metrics and metricDisplays will be pulled off of */
  entity: HubEntity;
  isMobile: boolean;
  /** Metric displays on entity */
  metricDisplays: IMetricDisplayConfig[];
  /** Metrics on entity */
  metrics: IMetric[];
  /** If the editor flow item is currently viewed */
  isEditorOpen: boolean;
  /** The current metric in focus, selected through the editing experience, if any */
  metricInFocus: IMetric;
  /** Reference to the slot for the footer in the workspace pane */
  footerSlotEl: HTMLElement;
  /** Handles whether the delete modal should be displayed */
  showDeleteModal: boolean;
  /** Handles whether the component is currently deleting a metric */
  isDeleting: boolean;
  /** Live edited values of the component */
  editorValues: IConfigurationValues;
  /** Live state of the side-panel selected tab when editing or creating a metric */
  activeTab: MetricEditorTabs;
  /** Event to signal to the workspace that the entity has been saved */
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  /*** Emits telemetry information */
  hubTelemetry: EventEmitter;
  intl: ComponentIntl;
  constructor();
  /**
    * provides auth & portal information
    */
  private get _context();
  /**
   * type of entity, used for i18nScope
   */
  get type(): HubEntityType;
  /**
   * getter for if we have reached the maximum number of metrics
   */
  get isAtMetricCapacity(): boolean;
  componentWillLoad(): Promise<void>;
  /** Creates state for metrics and metrics displays. */
  initializeMetrics(): void;
  hubTelemetryHandler(event: CustomEvent<any>): void;
  /**
   * Updates the hub entity with the new metrics and metricDisplays arrays.
   * Also updates the local state.
   * @param metrics
   * @param metricDisplays
   */
  updateEntity(metrics: IMetric[], metricDisplays: IMetricDisplayConfig[]): Promise<HubEntity>;
  /**
   * entity-editor updates the current metric being initialized.
   *
   * @param event - listens for entity editor to be initialized
   */
  handleEditorInitialized(event: CustomEvent<IConfigurationValues>): void;
  /** fires when edit is clicked from the metric calcite-dropdown menu */
  handleEdit(e: CalciteDropdownItemCustomEvent<any>): void;
  /** fires when delete is clicked from the metric calcite-dropdown menu */
  handleDelete(e: CalciteDropdownItemCustomEvent<any>): void;
  handleCloseDeleteModal(telemetry?: boolean): void;
  handleConfirmDelete(): Promise<void>;
  /** Fired when add metric button is clicked to open editor to create new metrics */
  handleAddMetric(evt: CustomEvent<any>): void;
  /**
   * Fired when the entity-editor updates the current metric being worked on.
   * Fires an event to let the workspace know that the entity is dirty.
   */
  handleOnChangedMetric(event: CustomEvent): void;
  /**
   * Fired when the entity-editor saves the current metric being worked on.
   * Fires an event to let the workspace know that the entity has been updated, and closes the editor.
   */
  handleOnSavedMetric(event: CustomEvent<IArcgisHubEntityEditorSavedEvent>): void;
  /** Fires when the editor is closed by backing out of the calcite-flow-item. */
  handleOnEditorClose(telemetry?: boolean): void;
  /**
   * Handles a move operation to change visibilities.
   * @param e
   */
  handleMove(e: CalciteDropdownItemCustomEvent<any>): void;
  /**
   * updates the metricInFocus state to either have the metric corresponding to the metricId,
   * or resets the state to undefined
   */
  setMetricInFocus(metricId?: string): void;
  /**
   * Returns a specific dropdown item for the move actions for a metric.
   * @param options: should have metricId, visibility, targetVisibility, and text to rendedr
  */
  getMoveDropdownItem(options: {
    metricId: string;
    visibility: MetricVisibility;
    targetVisibility: MetricVisibility;
    text: string;
  }): HTMLCalciteDropdownItemElement;
  /**
   * Renders the specific move actions for each metric depending on its visibility.
   * "Featured", "Show", "Hide", etc.
   * @param metricId
   * @param visibility
   * @returns
   */
  renderMoveActions(metricId: string, visibility: string): HTMLElement;
  /**
   * Renders the specific actions in the calcite-dropdown menu that can be
   * clicked on when interacting with a metric (edit, delete, move)
   * @param metricDisplay
   * @returns
   */
  renderMetricActions(metricDisplay: IMetricDisplayConfig, metric: IMetric): HTMLElement;
  /**
   * Renders a single empty featured metric
   * @param metricOrder
   * @returns
   */
  renderEmptyFeaturedMetric(metricOrder: number): HTMLElement;
  /**
   * Renders a metric display by finding the corresponding metric on the entity. This is either a visible, hidden, or featured metric. Will render empty state if the metric is featured.
   * Will not render if a metric cannot be found.
   * @param metricDisplay IMetricDisplayConfig
   * @param metricOrder number -- number rendered inside of empty state for a featured metric
   * @param isFeatured boolean
   * @returns
   */
  renderMetric(metricDisplay: IMetricDisplayConfig, isFeatured: boolean, metricOrder?: number): HTMLElement;
  /**
   * renders all "featured metrics, in the metrics pane
   */
  renderFeaturedMetrics(): HTMLElement;
  /**
   * renders all "visible" metrics, in the metrics pane.
   */
  renderVisibleMetrics(): HTMLElement;
  /**
   * Renders any hidden metric displays, if there are any.
   * @returns
   */
  renderHiddenMetrics(): HTMLElement;
  /**
   * Renders all metrics (featured, visible, and hidden) in the publishing part of the metrics pane.
   */
  renderMetrics(): HTMLCalciteFlowItemElement;
  /**
   * Renders the entity-editor in a calcite-flow-item.
   * Used for creating or editing a metric.
   */
  renderEditor(): HTMLCalciteFlowItemElement;
  /**
   * Renders the confirm delete modal for a metric.
   */
  renderDeleteModal(): HTMLCalciteModalElement;
  renderEditorPreview(): HTMLElement;
  /** renders the pane side panel of calcite-notices. */
  renderSidePanel(): HTMLElement;
  /** renders the current count of metrics created in the workspace */
  renderMetricCount(): HTMLElement;
  /** renders the "Add metric" button at the top of the pane to allow users to add a new metric. Navigates to the editor calcite-flow-item. */
  renderAddMetric(): HTMLElement;
  /**
   * Renders the add metric button in the primary actions slot.
   * Will render with a tooltip wrapping it if the user is at the metric capacity.
   * @returns
   */
  renderAddMetricButton(): HTMLElement;
  render(): any;
}
