import { EventEmitter } from '../../../../stencil-public-runtime';
import { IChannel, IPost } from '@esri/hub-discussions';
import { IGroup, IPortal, IUser } from '@esri/arcgis-rest-portal';
import { ComponentIntl } from '../../../../utils/stencil-intl';
/** @internal */
export declare class ArcgisHubDiscussionsPopover {
  buttonEl: HTMLButtonElement;
  post: IPost | null;
  postCreator: IUser | null;
  postCreatorOrg: IPortal | null;
  channel: IChannel;
  channelGroups: IGroup[];
  parent: IPost;
  parentCreator: IUser;
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
  element: HTMLArcgisHubDiscussionsPopoverElement;
  /**
   * Emits telemetry information
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Emitted just before popover opens
   */
  arcgisHubDiscussionPopoverBeforeOpen: EventEmitter<void>;
  /**
   * Emitted when popover closes
   */
  arcgisHubDiscussionPopoverClose: EventEmitter<void>;
  intl: ComponentIntl;
  private get _context();
  constructor();
  componentWillLoad(): Promise<void>;
  emitHubTelemetry(telemetry: {
    [key: string]: any;
  }): void;
  handlePopoverOpened(): void;
  handleCalcitePopoverBeforeOpened(): void;
  handlePopoverClosed(): void;
  handleGoToProfile(): void;
  renderCreatorAvatar(): HTMLElement;
  renderCreatorDetails(): HTMLElement;
  renderCreatorExpandedDetails(): HTMLElement;
  renderPostDetails(): HTMLElement;
  render(): any;
}
