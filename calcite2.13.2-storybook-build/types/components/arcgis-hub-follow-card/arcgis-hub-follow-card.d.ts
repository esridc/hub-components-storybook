import { HubEntityType, IHubGroup, IWithFollowers } from '@esri/hub-common';
import { EventEmitter } from '../../stencil-public-runtime';
import { IWithContext } from '../../utils/state';
import { ComponentIntl } from '../../utils/stencil-intl';
interface IFollowCardConfig {
  cardId: string;
  entityId: string;
  entityType: HubEntityType;
  callToActionText: string;
  callToActionAlign: "center" | "start" | "end";
  buttonText: string;
  unfollowButtonText: string;
  buttonAlign: "center" | "start" | "end";
  buttonStyle: "solid" | "outline-fill";
  schemaVersion: number;
}
export declare class ArcgisHubFollowCard implements IWithContext {
  element: HTMLArcgisHubFollowCardElement;
  /**
   * The follow card configuration
   */
  cardConfig: IFollowCardConfig;
  /**
   * Indicates whether the site is in edit mode.
   */
  isEditingSite: boolean;
  /**
   * Event fired when the follow action in the card is toggled
   */
  arcgisHubFollowCardFollowChange: EventEmitter<boolean>;
  /**
   * Event fired when an anonymous user clicks the follow button
   */
  startFollowCardPopoutAuth: EventEmitter<void>;
  followersGroup: IHubGroup;
  _context: import("@esri/hub-common").IArcGISContext;
  _entity: IWithFollowers;
  intl: ComponentIntl;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  constructor();
  componentWillLoad(): Promise<void>;
  cardConfigUpdated(): Promise<void>;
  /**
   * Whether the user has access to the entity's followers group
   */
  get hasGroupAccess(): boolean;
  get callToActionClass(): string;
  handleArcgisHubFollowActionChange(event: CustomEvent): void;
  handleStartFollowCardPopoutAuth(event: any): void;
  renderNotice(): any;
  /**
   * The user won't have access to the group if any of these scenarios happens
   * 1. the item does not have a followers group
   * 2. the user does not have access to the item's followers group
   * 3. the item is inaccessible
   * if so, we will hide the card on the site or if the user is editing the site,
   * we will render a notice
   */
  render(): any;
}
export {};
