import { HTMLCalciteCardElement, HTMLCalciteModalElement, HTMLCalciteNoticeElement } from '@esri/calcite-components/dist';
import { IChannel } from '@esri/hub-discussions';
import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IGroup } from '@esri/arcgis-rest-portal';
export declare type StatusColor = 'blue' | 'green' | 'red' | 'yellow';
interface IChannelSettingsNotice {
  color?: StatusColor;
  title: string;
  message: string;
  link?: string;
  url?: string;
}
interface IChannelSettingsStepOption {
  checked?: boolean;
  description: string;
  heading: string;
  icon: string;
  value: boolean;
}
interface IChannelSettingsStep {
  description?: string;
  disabled?: boolean;
  heading: string;
  options: IChannelSettingsStepOption[];
  notice: IChannelSettingsNotice;
  name: string;
}
/** @internal */
export declare class ArcgisHubDiscussionsChannelSettingsEditor {
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * id of relevant channel
   */
  channelId: string;
  /**
   * Active state of modal
   */
  open?: boolean;
  /**
   * IChannel object if available
   */
  channel: IChannel;
  /**
   * Array of Channel Groups if available
   */
  channelGroups: IGroup[];
  /**
   * Whether the component is in a saving state
   */
  saving: boolean;
  /**
   * total number of posts user has made in channel
   */
  postTotal: number;
  /**
   * Index of active stepper item
   */
  activeStepIndex: number;
  /**
   * Whether user has selected to enable notifications
   */
  notifications: boolean;
  /**
   * Whether user has selected to keep their post activity
   */
  activity: boolean;
  /**
   * Error messages
   */
  notices: IChannelSettingsNotice[];
  /**
   * Emits telemetry information
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * reference to this element
   */
  element: HTMLArcgisHubDiscussionsChannelSettingsEditorElement;
  private get _context();
  /**
   * Whether the currently authenticated user is a member of this channel
   */
  get isMember(): boolean;
  constructor();
  /**
   * Lifecycle "componentWillLoad" method
   */
  componentWillLoad(): Promise<void>;
  get stepItems(): IChannelSettingsStep[];
  /**
   * Gets number of posts user has posted in channel
   */
  fetchTotalPosts(): Promise<number>;
  /**
   * Sets activeStepIndex and emits telemetry for stepper item selected
   * @param evt
   */
  handleStepperItemSelected(evt: PointerEvent): void;
  /**
   * Closes modal when cancel button clicked
   */
  handleCancelButtonClicked(): void;
  removeChannelActivity(): Promise<void>;
  createChannelNotificationOptOut(): Promise<void>;
  removeChannelNotificationOptOut(): Promise<void>;
  /**
   * On "Save Preferences" run the relevant API calls
   */
  handleSaveButtonClicked(): void;
  /**
   * Emits telemetry for modal close
   */
  handleModalClosed(): void;
  /**
   * Opens relevant notices and sets selected options
   */
  handleTileSelect(evt: CustomEvent<void>): void;
  handleNoticeClosed(): void;
  renderMetadata(): HTMLElement;
  renderChannelDetails(): HTMLCalciteCardElement;
  renderContent(): HTMLElement;
  renderNotice(): HTMLCalciteNoticeElement;
  renderModal(): HTMLCalciteModalElement;
  render(): any;
}
export {};
