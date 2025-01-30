import { getPortal } from '@esri/arcgis-rest-portal';
import { getItemHomeUrl, getTypeFromEntity } from '@esri/hub-common';
import { cache } from './cache';
/**
 * A function to fetch a cached organization record. If no hits
 * in the cache, it will request the organization via XHR
 * @param orgId An organization ID
 * @returns a promise that resolves an organization
 */
export const fetchPortalFromCache = cache((orgId, hubRequestOptions) => 
// note: it's considered bad practice to call from the REST API directly, but hub.js functions are insufficient for our needs.
getPortal(orgId, hubRequestOptions), { scope: 'orgs' });
// should this be hoisted to hub-common?
/**
 * Get the home app URL for a given entity
 *
 * @param entity
 * @param portalOrRequestOptions
 * @returns
 */
export const getEntityHomeUrl = (entity, portalOrRequestOptions) => {
  var _a;
  const type = getTypeFromEntity(entity);
  const undefinedTypes = ['event', 'user'];
  return undefinedTypes.includes(type)
    ? undefined
    : type === 'group'
      // groups use self for the home url
      ? (_a = entity === null || entity === void 0 ? void 0 : entity.links) === null || _a === void 0 ? void 0 : _a.self
      // otherwise it should be an item backed entity
      // most of which also use self for the home url, except:
      // sites which us the site's own url and
      // discussions and surveys which currently do not define self (but should)
      // so for now we recompute the home url based on the entity's id
      : getItemHomeUrl(entity.id, portalOrRequestOptions);
};
