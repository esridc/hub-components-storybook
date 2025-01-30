import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IGroup } from '@esri/arcgis-rest-portal';
import { IArcGISContext, IChannel, IHubContent } from '@esri/hub-common';
import { IWithContext } from '../../utils/state';
export declare class ArcgisHubDiscussionsView implements IWithContext {
  element: HTMLArcgisHubDiscussionsViewElement;
  /**
   * Global context
   */
  _context: IArcGISContext;
  /**
   * A reference to the discussion board entity (content or group). If not provided, it will
   * be fetched using the given `entityId` and `entityType`.
   */
  entity?: IHubContent | IGroup;
  /**
   * The UUID of the discussion board entity (content or group). Can be provided when a reference
   * to the `entity` is not availabile in a higher scope.
   */
  entityId?: string;
  /**
   * The type of discussion board entity (content or group). Can be provided when a reference
   * to the `entity` is not availabile in a higher scope.
   */
  entityType?: string;
  /**
   * If the discussion board component is rendered within the context of a Hub Site application.
   * If not explicitly provided, the domain record will be fetched from the domains service to
   * determine.
   */
  isHub?: boolean;
  /**
   * If the body width is < 768px
   */
  isMobile?: boolean;
  /**
   * The IChannel record, if available. Providing `channel` will prevent the call to fetch
   * the entity settings and the IChannel record.
   */
  channel: IChannel;
  /**
   * The channel ID, if known. Providing `channelId` will prevent the call to fetch the
   * entity settings. If `channel` is not provided, the IChannel record will be fetched.
   */
  channelId: string;
  /**
   * The allowed channel IDs from the entity settings, if known. Providing `allowedChannelIds` will
   * prevent the call to fetch the entity settings when `channelId` and `channel` are not provided.
   */
  allowedChannelIds: string[];
  /**
   * Whether to show 'View discussion' button, which emits `arcgisHubDiscussionsViewButtonClicked` event
   */
  showViewButton: boolean;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * True when dependencies are being fetched
   */
  pending: boolean;
  /**
   * Number of posts for metrics
   */
  postCount: number;
  /**
   * Emitted when 'View discussion' button clicked
   */
  arcgisHubDiscussionsViewButtonClicked: EventEmitter<void>;
  /**
   * Emits hub telemetry
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Pre-binds context to methods that get passed as references/callbacks.
   * @constructor
   */
  constructor();
  /**
   * Component will load lifecycle event, loads translations and dependencies
   */
  componentWillLoad(): Promise<void>;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Loads translations
   */
  loadTranslations(): Promise<void>;
  /**
   * Loads dependencies and manages pending state
   */
  loadDependencies(): Promise<void>;
  /**
   * Fetches dependencies, enforcing a minimum delay so skeleton state can be observed
   */
  fetchDependencies(): Promise<any>;
  /**
   * Handles changes to `context`, loads dependencies
   * @param context
   * @param prevContext
   */
  handleContextChanged(context: IArcGISContext, prevContext: IArcGISContext): void;
  /**
   * Fetches and resolves all dependencies
   */
  _fetchDependencies(): Promise<any>;
  /**
   * Handles when 'View Discussion' button is clicked and emits
   * arcgisHubDiscussionsViewButtonClicked
   */
  handleViewButtonClicked(): void;
  /**
   * Checks if discussion item is currently discussable
   */
  get isOpenForSubmissions(): boolean;
  /**
   * Date range for last 30 days in ISO 8601 date time string format
   */
  get dateRange(): string[];
  /**
   * Sanitizes the entity description
   */
  get sanitizedEntityDescription(): string;
  renderHeader(): HTMLElement;
  renderMain(): HTMLElement;
  renderMetadata(): HTMLElement;
  renderMetrics(): HTMLElement;
  renderTags(): HTMLElement;
  renderCategories(): HTMLElement;
  renderSidebar(): HTMLElement;
  renderSkeleton(): HTMLElement;
  renderView(): HTMLElement;
  render(): any;
}
