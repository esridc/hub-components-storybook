import { VNode } from '../../../stencil-public-runtime';
import { IPrivacyConfig } from '../../../utils/privacy/types';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IOrgInfo } from '../interfaces';
/**
 * This component renders the consent messages
 * it is not likely to be used by itself but exists so we get style encapsulation
 * when rendered in a wormholed modal
 * @export
 * @class ArcGisPrivacyConsent
 */
export declare class ArcGisPrivacyConsent {
  config: IPrivacyConfig;
  intl: ComponentIntl;
  anonTrackingConfigured: boolean;
  thirdPartyTrackingConfigured: boolean;
  orgInfo: IOrgInfo;
  get allTrackingConfigured(): boolean;
  get eueiDisabled(): boolean;
  renderEueiNotice(): VNode;
  /**
   * Renders the consent message
   * this will be rendered into the notice and the settings ui
   * @return {*}  {VNode[]}
   * @memberof ArcGisPrivacy
   */
  renderConsentMessage(): VNode[];
  render(): any;
}
