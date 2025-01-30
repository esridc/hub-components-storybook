import { IUser } from '@esri/arcgis-rest-auth';
import { EventEmitter } from '../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { IChannel, IPost } from '@esri/hub-discussions';
import { IGroup } from '@esri/arcgis-rest-portal';
import { IChannelDetails, IPostDetails, IPostUserDetails } from '../../../../utils/discussions/types';
export declare class ArcgisHubDiscussionsMapPreview {
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Location id of an existing feature, if associated with this discussion
   */
  locationId: string;
  /**
   * Post id for current post or parent post
   */
  postId: string;
  /**
   * The UUID of the parent post
   */
  parentId: string;
  /**
   * UUID string of post's IChannel.
   */
  channelId: string;
  /**
   * Discussion URI
   */
  discussion: string;
  /**
   * Whether to render channel avatar in the post header
   */
  showChannelAvatar: boolean;
  /**
   * If component is in loading state
   */
  loading: boolean;
  /**
   * The IPost to preview
   */
  post: IPost;
  /**
   * The IUser for the post creator
   */
  postCreator: IUser;
  /**
   * The IChannel of the post
   */
  channel: IChannel;
  /**
   * An Array of channel groups
   */
  channelGroups: IGroup[];
  /**
   * Expands the preview to a full discussion
   */
  arcgisHubDiscussionsViewFull: EventEmitter<void>;
  /**
   * Zoom to associated geometry
   */
  arcgisHubDiscussionsGeometryZoomTo: EventEmitter<IPost>;
  /**
   * Emits height when preview is fully rendered
   */
  arcgisHubDiscussionsPreviewDidRender: EventEmitter<number>;
  /**
   * Dismisses the component
   */
  arcgisHubDiscussionsPreviewDismiss: EventEmitter<void>;
  /**
   * Emits telemetry information
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Reference to this element
   */
  element: HTMLArcgisHubDiscussionsMapPreviewElement;
  constructor();
  private get _context();
  /**
   * Computes creator full name string
   */
  get creatorFullName(): string;
  /** Lifecycle Methods */
  componentWillLoad(): Promise<void>;
  componentDidRender(): void;
  /**
   * Enrich thread details
   */
  initialize(): Promise<void>;
  _initialize(): Promise<void>;
  /**
   * Fetch thread when only location id is provided
   * @returns Promise<IPostAggregate>
   */
  fetchDetailsByLocationId(): Promise<IPostDetails & IChannelDetails & IPostUserDetails>;
  fetchDetails(postId: string, post?: IPost): Promise<IPostDetails & IChannelDetails & IPostUserDetails>;
  /**
   * Telemetry helper
   * @param telemetry Dictionary string to emit
   */
  emitHubTelemetry(telemetry: {
    [key: string]: any;
  }): void;
  /**
   * Emits arcgisHubDiscussionsViewFull
   */
  handleViewFullThread(): void;
  /**
   * Emits arcgisHubDiscussionsGeometryZoomTo
   */
  handleZoomTo(): void;
  /**
   * Emits arcgisHubDiscussionsPreviewDismiss
   */
  handleDismiss(): void;
  /**
   * Renders the reply creator avatar and optionally the channel avatar
   */
  renderAvatars(): HTMLElement;
  /**
   * Renders main content body
   * @returns HTMLElement
   */
  renderContent(): HTMLElement;
  /**
   * Renders loading state
   * @returns HTMLArcgisHubDiscussionsPostSkeletonElement
   */
  renderLoading(): HTMLArcgisHubDiscussionsPostSkeletonElement;
  render(): any;
}
