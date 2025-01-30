import { EventEmitter } from '../../stencil-public-runtime';
import { HTMLCalciteSwitchElement } from '@esri/calcite-components/dist';
import { ComponentIntl } from "../../utils/stencil-intl";
declare enum Provider {
  Google = "google",
  Adobe = "adobe",
  SiteImprove = "siteImprove",
  ConsentMessage = "consentMessage"
}
interface IProviderConfig {
  disabled: boolean;
}
interface IGoogleProviderConfig extends IProviderConfig {
  measurementId: string;
}
interface IAdobeProviderConfig extends IProviderConfig {
  trackingServer: string;
  trackingServerSSL?: string;
  reportSuite: string;
}
interface ISiteImproveProviderConfig extends IProviderConfig {
  code: string;
}
interface IConsentMessageConfig extends IProviderConfig {
  text: string;
}
export interface IArcgisTelemetryConfigurationProps {
  consentMessage?: IConsentMessageConfig;
  plugins: {
    [key: string]: IProviderConfig;
  };
}
export declare class ArcgisTelemetryConfiguration {
  intl: ComponentIntl;
  private element;
  configuration: IArcgisTelemetryConfigurationProps;
  allowGA3: boolean;
  showArcgisOnlineDisclosure: boolean;
  ui: "accordion" | "flat";
  /**
   * Emitted when any Telemetry Config value changes
   */
  arcgisTelemetryConfigurationChange: EventEmitter<IArcgisTelemetryConfigurationProps>;
  isUpdatingObj: {
    [providerID: string]: boolean;
  };
  isListenerSetup: {
    [providerID: string]: boolean;
  };
  configurationState: IArcgisTelemetryConfigurationProps;
  get numberOfProviders(): number;
  get _getConsentConfiguredMsg(): string;
  get googleConfig(): IGoogleProviderConfig;
  get adobeConfig(): IAdobeProviderConfig;
  get siteImproveConfig(): ISiteImproveProviderConfig;
  get consentMessage(): IConsentMessageConfig;
  get isUpdating(): boolean;
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  isConsentMessageValid: boolean;
  private _tempConsentMessageValue;
  _assignConsentListener(editorElement: any): void;
  _addSwitchListener(providerID: Provider, calciteSwitch: HTMLCalciteSwitchElement): void;
  render(): any;
  private _renderAccordionUI;
  private _renderFlatUI;
  private _renderProviderForms;
  private _renderConsentForm;
  private _renderProvider;
  private _renderLoader;
  private _updateOutput;
  private _renderInfoMsg;
  isGAValid: boolean;
  _googleAnalyticsKeyValueTemp: string;
  private _renderGoogleAnalyticsForm;
  isAdobeTrackingServerValid: boolean;
  isAdobeTrackingServerSSLValid: boolean;
  isALReportSuiteValid: boolean;
  _adobeTrackingServerValueTemp: string;
  _adobeTrackingServerSSLValueTemp: string;
  _adobeLReportSuiteValueTemp: string;
  private _renderAdobeForm;
  isSIValid: boolean;
  _siCodeValueTemp: string;
  private _renderSiteImproveForm;
  private _calcStatus;
  private _saveGoogleKey;
  private _saveAdobeTrackingServer;
  private _saveAdobeTrackingServerSSL;
  private _saveAdobeReportSuite;
  private _saveSiteCode;
  private _validateGMeasurementID;
  private _validateAdobeTrackingServer;
  private _validateAdobeSSLTrackingServer;
  private _validateAdobeReportSuite;
  private _validateSICode;
  private _validateConsentMessage;
  /** Runs Form Validation and assigns values properly */
  private _validateForm;
}
export {};
