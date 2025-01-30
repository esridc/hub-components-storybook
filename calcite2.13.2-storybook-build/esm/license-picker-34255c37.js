import { g as getStructuredLicense } from './get-structured-license-33306790.js';

var GenericLicenseType;
(function (GenericLicenseType) {
  GenericLicenseType["Custom"] = "custom";
  GenericLicenseType["None"] = "none";
})(GenericLicenseType || (GenericLicenseType = {}));
const LicenseDescriptionI18nKeys = {
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
function composeLicenses(abbrs) {
  return abbrs.map(abbr => getStructuredLicense(abbr));
}
function getLicenseDescriptionI18nKey(structuredLicenseType) {
  const matchNotVersion = /(?:(?!-\d).)+/;
  const licensePrefixMatchs = structuredLicenseType.toString().match(matchNotVersion);
  const licensePrefix = licensePrefixMatchs && licensePrefixMatchs[0].toLowerCase();
  return LicenseDescriptionI18nKeys[licensePrefix] || null;
}
function getLicenseDescription(intl, structuredLicenseType) {
  const licenseDescriptionI18nKey = getLicenseDescriptionI18nKey(structuredLicenseType);
  return licenseDescriptionI18nKey && intl.t(licenseDescriptionI18nKey);
}
function isCustomLicense(type) {
  return type === GenericLicenseType.Custom;
}
function isGenericLicense(type) {
  return Object.values(GenericLicenseType).includes(type);
}

export { isGenericLicense as a, composeLicenses as c, getLicenseDescription as g, isCustomLicense as i };
