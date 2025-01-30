import { getStructuredLicense } from "@esri/hub-common";
export var GenericLicenseType;
(function (GenericLicenseType) {
  GenericLicenseType["Custom"] = "custom";
  GenericLicenseType["None"] = "none";
})(GenericLicenseType || (GenericLicenseType = {}));
export const LICENSE_CUSTOM = { type: GenericLicenseType.Custom };
export const LICENSE_NONE = { type: GenericLicenseType.None };
export const LicenseDescriptionI18nKeys = {
  'custom': 'licenseDescriptionCustom',
  'cc0': 'licenseDescriptionCc0',
  'cc-by': 'licenseDescriptionCcBy',
  'cc-by-sa': 'licenseDescriptionCcBySa',
  'cc-by-nd': 'licenseDescriptionCcByNd',
  'cc-by-nc': 'licenseDescriptionCcByNc',
  'cc-by-nc-sa': 'licenseDescriptionCcByNcSa',
  'cc-by-nc-nd': 'licenseDescriptionCcByNcNd',
  'pddl': 'licenseDescriptionPddl',
  'odbl': 'licenseDescriptionOdbl',
  'odc-by': 'licenseDescriptionOdcBy'
};
export function composeLicenses(abbrs) {
  return abbrs.map(abbr => getStructuredLicense(abbr));
}
export function getLicenseDescriptionI18nKey(structuredLicenseType) {
  const matchNotVersion = /(?:(?!-\d).)+/;
  const licensePrefixMatchs = structuredLicenseType.toString().match(matchNotVersion);
  const licensePrefix = licensePrefixMatchs && licensePrefixMatchs[0].toLowerCase();
  return LicenseDescriptionI18nKeys[licensePrefix] || null;
}
export function getLicenseDescription(intl, structuredLicenseType) {
  const licenseDescriptionI18nKey = getLicenseDescriptionI18nKey(structuredLicenseType);
  return licenseDescriptionI18nKey && intl.t(licenseDescriptionI18nKey);
}
export function isCustomLicense(type) {
  return type === GenericLicenseType.Custom;
}
export function isGenericLicense(type) {
  return Object.values(GenericLicenseType).includes(type);
}
