import { EventEmitter } from '../../../../stencil-public-runtime';
import { IGroup, IPortal, IUser } from '@esri/arcgis-rest-portal';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { IChannel, IPost } from '@esri/hub-discussions';
/** @internal */
export declare class ArcgisHubDiscussionsPostHeader {
  intl: ComponentIntl;
  element: HTMLArcgisHubDiscussionsPostHeaderElement;
  /**
   * The post ID
   */
  postId: string;
  /**
   * The post record
   */
  post: IPost;
  /**
   * A parent post record
   */
  parent: IPost;
  /**
   * The post creator
   */
  postCreator: IUser;
  /**
   * The post creator
   */
  parentCreator: IUser;
  /**
   * The post creator org
   */
  postCreatorOrg: IPortal;
  /**
   * The channel
   */
  channel: IChannel;
  /**
   * The channel groups
   */
  channelGroups: IGroup[];
  /**
   * Position of post in thread
   */
  index: number;
  /**
   * If this component is embedded in a Hub site
   */
  isHub: boolean;
  /**
   * Renders the creator avatar
   */
  showCreatorAvatar: boolean;
  /**
   * Renders the creator username
   */
  showCreatorUsername: boolean;
  /**
   * Renders the channel avatar
   */
  showChannelAvatar: boolean;
  /**
   * Renders the avatar popover
   */
  showPopover: boolean;
  /**
   * Renders the channel group name
   */
  showChannelName: boolean;
  /**
   * Renders the post timestamp
   */
  showTimestamp: boolean;
  /**
   * Renders the channel access icon
   */
  showChannelAccessIcon: boolean;
  /**
   * Renders the replying to text
   */
  showReplyingTo: boolean;
  /**
   * Renders the view post action
   */
  showViewPostAction: boolean;
  /**
   * Display the current user anonymously (if not already anonymous)
   */
  displayAnon: boolean;
  /**
   * The scale of the creator or channel avatar. Only `l` and `m` are supported
   * when both avatars are rendered, and will be applied the creator avatar.
   */
  iconScale: 'l' | 'm' | 's';
  /**
   * Whether the metadata (creator username, channel group name, post timestamp & channel access icon) display
   * inline or on their own line from the post creator name
   */
  metadataOrientation: 'block' | 'inline';
  /**
   * Emitted when view post action is clicked
   */
  arcgisHubDiscussionsPostSelect: EventEmitter<void>;
  constructor();
  componentWillLoad(): Promise<void>;
  private get _context();
  get creator(): IUser;
  get creatorFullName(): string;
  get accessIcon(): {
    icon: string;
    label: string;
  };
  handleViewPostClicked(): void;
  renderAccessIcon(): HTMLElement;
  renderPopover(avatars: HTMLElement): HTMLElement;
  renderAvatars(): HTMLElement;
  renderCreatorAvatar(): HTMLElement;
  renderChannelAvatar(): HTMLElement;
  renderPostTimestamp(): HTMLElement;
  renderHeader(): HTMLElement;
  renderChannelName(): HTMLElement;
  renderCreatorUsername(): HTMLElement;
  renderReplyingTo(): HTMLElement;
  renderViewPostAction(): HTMLElement;
  get isMetadataInline(): boolean;
  renderMetadata(): HTMLElement;
  render(): any;
}
