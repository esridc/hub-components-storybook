import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IPrivacySettings } from '../../../utils/privacy/types';
import { IOrgInfo } from '../interfaces';
/**
 * This component renders the consent settings
 * it is not likely to be used by itself but exists so we get style encapsulation
 * when rendered in a wormholed modal and to simplify testing
 * @export
 * @class ArcGisPrivacySettings
 */
export declare class ArcGisPrivacySettings {
  userSettings: IPrivacySettings;
  intl: ComponentIntl;
  /**
   * Controls whether we show the anonymous tracking settings
   * @memberof ArcGisPrivacySettings
   */
  anonTrackingConfigured: boolean;
  /**
   * Controls whether we show the third party tracking settings
   *
   * @memberof ArcGisPrivacySettings
   */
  thirdPartyTrackingConfigured: boolean;
  orgInfo: IOrgInfo;
  get eueiDisabled(): boolean;
  hubInternalUserPrivacySettingsChanged: EventEmitter<IPrivacySettings>;
  constructor();
  handleSettingsChange(evt: CustomEvent): void;
  render(): any;
}
