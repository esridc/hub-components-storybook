export interface IPrivacyConsentDisclaimer {
  lang?: string;
  text: string;
  default?: boolean;
}
export interface IPrivacyConfig {
  allowPrivacyConfig?: boolean;
  blocking?: boolean;
  disclaimer?: IPrivacyConsentDisclaimer[];
  policyURL?: string;
}
export interface IPrivacySettings {
  accepted: boolean;
  performance: boolean;
  targeting: boolean;
  functional: boolean;
  id: string;
  timestamp: number;
}
