import { EventEmitter } from '../../stencil-public-runtime';
import { HubEntityType, IHubGroup } from '@esri/hub-common';
import { IWithContext } from '../../utils/state';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisHubFollowAction implements IWithContext {
  element: HTMLArcgisHubFollowActionElement;
  /**
   * Id of entity to follow
   */
  entityId: string;
  /**
   * Entity type
   */
  entityType: HubEntityType;
  /**
   * Entity access
   */
  entityAccess: string;
  /**
   * Follow button text
   */
  buttonText: string;
  /**
   * Unfollow button text
   */
  unfollowButtonText: string;
  /**
   * Follow/unfollow button button style
   */
  buttonStyle: 'solid' | 'outline-fill';
  /**
   * Follow/unfollow button button alignment
   */
  buttonAlign: 'center' | 'start' | 'end';
  /**
   * Event fired when the follow action is toggled
   */
  arcgisHubFollowActionChange: EventEmitter<boolean>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  /**
   * Event fired when an anonymous user clicks the follow button
   */
  startFollowActionPopoutAuth: EventEmitter<void>;
  /**
   * The followed entity's followers group
   */
  followersGroup: IHubGroup;
  isFollowing: boolean;
  showAlert: boolean;
  cannotUnfollow: boolean;
  /**
   * Whether it is an auth'ed or anonymous user that clicks follow
   */
  _clicksFollowWithoutAuth: boolean;
  intl: ComponentIntl;
  constructor();
  _context: import("@esri/hub-common").IArcGISContext;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentWillLoad(): Promise<void>;
  /**
   * Fetch the current user's follow status of the item
   */
  fetchFollowStatus(): Promise<void>;
  /**
   * User cannot leave a followers group if they are
   * the owner of the group
   */
  setCannotUnfollow(): void;
  /**
   * This is triggered whenever the context changes, but we do not want to
   * toggle follow every time when context changes, instead, we only want to
   * toggle when an anonymous user clicks follow and successfully signs in
   */
  toggleFollowWithContextChange(): Promise<void>;
  get buttonClass(): string;
  /**
   * Calls when the follow/unfollow button is clicked
   * @param onSignIn whether the button is clicked when user is unauth'ed
   */
  toggleFollow(onSignIn?: boolean): Promise<void>;
  /**
   * If the user is auth'ed, we will toggle follow, otherwise, we will
   * show the sign in window, _clicksFollowWithoutAuth indicates whether
   * the user is unauth'ed when they clicks the follow button
   */
  handleFollowToggle(): Promise<void>;
  logTelemetry(isFollowing: boolean, response: string): void;
  handleAlertClose(): void;
  renderButton(): any;
  renderAlert(): any;
  render(): any;
}
