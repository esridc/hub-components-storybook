import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { HubEntityType, IArcGISContext } from '@esri/hub-common';
import { ComponentIntl } from '../../utils/stencil-intl';
import { TIME_DIMENSIONS, IOrderBy } from '@esri/telemetry-reporting-client';
import { ITelemetryDataTransform } from '../arcgis-telemetry-report/interfaces';
import { SubscriptionEntity } from '@arcgis-hub/arcgis-newsletters-ts';
import { CalciteTabTitleCustomEvent } from '@esri/calcite-components';
import { PredefinedDateOption } from '../arcgis-hub-date-range-picker/utils';
declare enum Tabs {
  chart = "chart",
  table = "table"
}
export declare class ArcgisTelemetryDashboard {
  element: HTMLElement;
  /**
   * hostname for which to fetch and render telemetry
   *
   * @type {string}
   * @memberof ArcgisHubEngagementDashboard
   */
  hostname: string;
  /**
   * contentId to scope telemetry to
   *
   * @type {string}
   * @memberof ArcgisHubEngagementDashboard
   */
  contentId: string;
  /**
   * Entity type; used to determine whether or not to display specific metrics
   */
  contentType: HubEntityType;
  /**
   * provides auth & portal information
   *
   * @type {IArcGISContext}
   * @memberof ArcgisHubEngagementDashboard
   */
  context: IArcGISContext;
  /**
   * initial date range to display
   *
   * @memberof ArcgisHubEngagementDashboard
   */
  dateRange: PredefinedDateOption;
  /**
   * title to render above the dashboard
   *
   * @type {string}
   * @memberof ArcgisHubEngagementDashboard
   */
  dashboardTitle: string;
  hubAnalyticsEnabled: boolean;
  showSubscriptions: boolean;
  startDate: string;
  endDate: string;
  _dateRange: PredefinedDateOption;
  telemetrySubscription: SubscriptionEntity;
  shouldShowSubscriptionUpdateAlert: boolean;
  subscriptionUpdateType: 'update' | 'subscribe';
  subscriptionUpdateSucceeded: boolean;
  subscriptionAlertTitle: string;
  subscriptionAlertMessage: string;
  arcgisTelemetryDashboardDateChanged: EventEmitter<string>;
  /**
   * An event to emit telemetry events
   */
  hubTelemetry: EventEmitter<any>;
  get _contentId(): string;
  private get _subscriptionApiOptions();
  private get _hasSubscription();
  private get _hasActiveSubscription();
  private get _showDiscussionsMetrics();
  private subscriptions;
  intl: ComponentIntl;
  constructor();
  contextChanged(): Promise<void>;
  componentWillLoad(): Promise<void>;
  get dateRangeValue(): string[] | PredefinedDateOption;
  handleCalciteAlertClose(): void;
  renderSubscriptionUpdateAlert(): VNode;
  toggleTelemetrySubscription(): Promise<void>;
  getOrderBy(category: string): IOrderBy[];
  /**
   * category to pass to the child arcgis-telemetry-report components
   * we want to vary how the data is categorized depending on the date range selected
   *
   * @readonly
   * @type {TIME_DIMENSIONS}
   * @memberof ArcgisHubEngagementDashboard
   */
  get category(): TIME_DIMENSIONS;
  getPageViewsTableTransforms(category: any): ITelemetryDataTransform[];
  handlePopoverOpened(): void;
  handleExternalLinkClicked(): void;
  handleSubUnsubButtonClicked(): void;
  get telemetryUpdateInfo(): string;
  get subscribeButtonProps(): Record<string, any>;
  setDateRange: (event: CustomEvent) => void;
  activeTab: Tabs;
  onTabChange(event: CalciteTabTitleCustomEvent<void>): void;
  dateRangeOptions: PredefinedDateOption[];
  renderControls(): HTMLCalcitePopoverElement;
  sessionActivityTransforms: ITelemetryDataTransform[];
  render(): any;
}
export {};
