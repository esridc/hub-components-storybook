import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IPrivacySettings, IPrivacyConfig } from '../../utils/privacy/types';
import { IOrgInfo } from './interfaces';
export declare class ArcGisPrivacy {
  element: HTMLElement;
  /**
   * The privacy configuration of the site
   * @type {IPrivacyConfig}
   * @memberof ArcGisPrivacy
   */
  config: IPrivacyConfig;
  /**
   * The user's privacy settings
   * @type {IPrivacySettings}
   * @memberof ArcGisPrivacy
   */
  userSettings: IPrivacySettings;
  /**
   * Controls whether we show the manage privacy button
   * This is for cases where we want to show the consent notice without rendering the manage button
   * eg on in the hub application on the explore routes
   * @memberof ArcGisPrivacy
   */
  hideManageButton: boolean;
  /**
   * Controls whether we show the anonymous tracking settings
   * @memberof ArcGisPrivacy
   */
  anonTrackingConfigured: boolean;
  /**
   * Controls whether we show the third party tracking settings
   * @memberof ArcGisPrivacy
   */
  thirdPartyTrackingConfigured: boolean;
  orgInfo: IOrgInfo;
  hubUserPrivacySettingsChanged: EventEmitter<IPrivacySettings>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  intl: ComponentIntl;
  _userSettings: IPrivacySettings;
  shouldShowModal: boolean;
  shouldShowNonmodal: boolean;
  get allTrackingConfigured(): boolean;
  get eueiDisabled(): boolean;
  /**
   * Should we show the consent notice or the privacy settings in the modal
   */
  shouldShowNotice: boolean;
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  userSettingsChanged(newSettings: IPrivacySettings): void;
  handleManagePrivacyClick(): Promise<void>;
  handleAcceptAllClick(): void;
  handleAcceptNecessaryClick(): void;
  handleViewSettingsClick(): void;
  handleSettingsChange(evt: CustomEvent): void;
  handleConfirmClick(): Promise<void>;
  handleModalClose(): void;
  handleNonmodalClose(): void;
  renderButtons(): VNode[];
  /**
   * Renders the consent notice
   * this will either be rendered into the modal or the non-modal
   * @return {*}  {VNode}
   * @memberof ArcGisPrivacy
   */
  renderNotice(): VNode;
  /**
   * Renders the settings ui
   * this will always be rendered into the modal
   * @return {*}  {VNode}
   * @memberof ArcGisPrivacy
   */
  renderSettings(): VNode;
  /**
   * Renders the modal privacy consent ui
   * this will contain either the notice or the settings
   * @return {*}  {VNode}
   * @memberof ArcGisPrivacy
   */
  renderModal(): VNode;
  /**
   * Renders the non-modal privacy notice
   * this will always contain the notice
   * @return {*}  {VNode}
   * @memberof ArcGisPrivacy
   */
  renderNonmodal(): VNode;
  /**
   * Renders the manage privacy button
   * @return {*}  {VNode}
   * @memberof ArcGisPrivacy
   */
  renderButton(): VNode;
  _render(): VNode;
  render(): any;
}
