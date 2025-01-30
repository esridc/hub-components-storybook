import { IStructuredLicense } from "@esri/hub-common";
import { ComponentIntl } from "./stencil-intl";
export declare enum GenericLicenseType {
  Custom = "custom",
  None = "none"
}
export declare const LICENSE_CUSTOM: IStructuredLicense;
export declare const LICENSE_NONE: IStructuredLicense;
export declare const LicenseDescriptionI18nKeys: {
  custom: string;
  cc0: string;
  'cc-by': string;
  'cc-by-sa': string;
  'cc-by-nd': string;
  'cc-by-nc': string;
  'cc-by-nc-sa': string;
  'cc-by-nc-nd': string;
  pddl: string;
  odbl: string;
  'odc-by': string;
};
export declare function composeLicenses(abbrs: string[]): IStructuredLicense[];
export declare function getLicenseDescriptionI18nKey(structuredLicenseType: string): string | null;
export declare function getLicenseDescription(intl: ComponentIntl, structuredLicenseType: string): string | null;
export declare function isCustomLicense(type: string): boolean;
export declare function isGenericLicense(type: string): boolean;
