const environmentIds = {
  dev: {
    esriTemplateOrgIds: ['VLx4vrvwONglS8iz'],
    alphaOrgs: ['LjjARY1mkhxulWPq', 'q2ikdtW0bkt5EgtQ', 'yHYVvboBBOdmcKci', '0NqqyC4CsJL19Fld'],
    betaOrgs: ['LjjARY1mkhxulWPq', 'WUQfmD5lsOhcAT0g'],
    hubHomeItemId: '2292b4f949c649b980fc6d3c4e768697',
    templateItems: {
      experience: '2b76e16a42d84466b5b2c37eb2a56914'
    }
  },
  qa: {
    esriTemplateOrgIds: ['97KLIFOSt5CxbiRI', 'i7gAfcdQl7MlSCjA'],
    alphaOrgs: ['97KLIFOSt5CxbiRI', 'MiFBHFxEZWumnKCx', '8HRYeOqprj872mxP', 'Xj56SBi2udA78cC9', '76I6Tq3eOJRBzqnC', 'uFEMdY4VMonzH8sG'],
    betaOrgs: ['97KLIFOSt5CxbiRI', 'MiFBHFxEZWumnKCx', 'nt4jSaTcGSE6onvN'],
    hubHomeItemId: '5e427004a807413597330485cd763172',
    templateItems: {
      experience: '465e45c70c53403099b0982d2858b171'
    }
  },
  prod: {
    esriTemplateOrgIds: ['TWfU0bgvgUkCgHLa', 'P3ePLMYs2RVChkJx'],
    alphaOrgs: [
      // 'gGHDlz6USftL5Pau', usfs - removed 2/27/2024
      'CrA5hYOKgL3Vwan8',
      'zj227gjeSqEyG4HF',
      'vIu5NCxQFilhVymO',
      'bkrWlSKcjUDFDtgw' // dcdev
    ],
    betaOrgs: [
      'bkrWlSKcjUDFDtgw',
      // 'OwiQO3QpAXsZqKvZ', // andrew (stauffer) - removed 2/27/2024
      'BBpPn9wZu2D6eTNY' // cityx
    ],
    hubHomeItemId: '715727e65c4c47c4b670838ff46c2645',
    templateItems: {
      experience: 'b17105db52af4a4498b23250be7e5789'
    }
  }
};
// TODO: use this in opendata-ui/config/shared/shared.js
/**
 * Get the well known item and group ids for a given environment
 * @param envName
 * @returns well known item and group ids for the given environment
 */
export const getEnvironmentIds = (envName) => {
  return environmentIds[envName];
};
// should the following be hoisted to hub.js?
/**
 * Get the suffix to append to subdomains for a given environment urls
 * @param envName
 * @returns the suffix to append to subdomains for the given environment urls
 * @example '' for prod (hub.arcgis.com), 'qa' for qa (hubqa.arcgis.com), 'dev' for dev (hubdev.arcgis.com)
 */
export const getEnvSuffix = (envName) => {
  return envName === 'prod' ? '' : envName;
};
/**
 * Get the ArcGIS Online subdomain for a given environment
 * @param envName
 * @returns the ArcGIS Online subdomain for the given environment
 * @example www, qaext, or devext
 */
export const getAgoEnvSubdomain = (envName) => {
  const suffix = getEnvSuffix(envName);
  return suffix ? `${suffix}ext` : 'www';
};
