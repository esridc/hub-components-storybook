import { EventEmitter } from '../../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../../utils/stencil-intl';
export declare class ArcgisHubDiscussionsMentionPopover {
  /**
   * Reference to the element that opens the popover
   */
  buttonEl: HTMLButtonElement;
  /**
   * Username of mentioned user
   */
  username: string;
  /**
   * Full name of mentioned user
   */
  fullName?: string;
  /**
   * Thumbnail for mentioned user icon
   */
  thumbnail?: string;
  /**
   * Mentioned user ID
   */
  userId: string;
  /**
   * Mentioned user access level
   */
  access?: string;
  /**
   * Session token
   */
  token: string;
  /**
   * Session portal
   */
  portal: string;
  /**
   * Mentioned user region
   */
  region?: string;
  /**
   * Mentioned user organization name
   */
  organization?: string;
  /**
   * Username of creator who mentioned the user
   */
  creatorUsername: string;
  /**
   * Post ID
   */
  postId: string;
  /**
   * If reply, parent post ID
   */
  parentId: string;
  /**
   * Channel ID
   */
  channelId: string;
  /**
   * Channel access level
   */
  channelAccess: string;
  /**
  * Position of post in thread
  */
  index: number;
  /**
  * If this component is embedded in a Hub site
  */
  isHub: boolean;
  /**
  * A reference to the host element
  */
  element: HTMLArcgisHubDiscussionsMentionPopoverElement;
  /**
  * Emits telemetry information
  */
  hubTelemetry: EventEmitter<any>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  emitHubTelemetry(telemetry: {
    [key: string]: any;
  }): void;
  handlePopoverOpened(): void;
  handleGoToProfile(): void;
  renderCreatorAvatar(): HTMLElement;
  renderCreatorDetails(): HTMLElement;
  renderCreatorExpandedDetails(): HTMLElement;
  renderPostDetails(): HTMLElement;
  render(): any;
}
