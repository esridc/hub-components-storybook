import * as environments from '../environments';
import { ENVIRONMENT } from './index';
import { setItemAccess, createItem, removeItem, createGroup, removeGroup, updateGroup } from '@esri/arcgis-rest-portal';
import { UserSession } from '@esri/arcgis-rest-auth';
import * as fetch from 'node-fetch';
/**
 * Gets the portal url for the given organization
 * @param organization
 */
export function getPortalUrl(organization) {
  const { agoBaseDomain, portalDomain } = environments[ENVIRONMENT];
  let domainSegments;
  if (organization) {
    const org = environments[ENVIRONMENT].organizations[organization];
    domainSegments = [org.subdomain, agoBaseDomain];
  }
  else {
    domainSegments = [portalDomain];
  }
  return `https://${domainSegments.join('.')}`;
}
;
/**
 * Create an AGO item
 * @param options
 */
export const createAGOItem = async (options) => {
  const response = await createItem({
    item: options.item,
    async: false,
    authentication: options.authentication,
    fetch: fetch,
  });
  if (!response.success) {
    throw new Error(`Failed to create item: CSV`);
  }
  if (options.access !== 'private') {
    await setItemAccess({
      id: response.id,
      access: options.access,
      authentication: options.authentication,
      fetch: fetch,
    });
  }
  return response.id;
};
/**
 * Removes an AGO item
 * @param options IUserItemOptions
 */
export const removeAGOItem = async (options) => {
  const response = await removeItem(Object.assign(Object.assign({}, options), { fetch: fetch }));
  if (!response.success) {
    throw new Error(`Failed to remove item: ${options.id}`);
  }
};
const SESSION_CACHE = {};
/**
 * Gets a Session instance for the given User and Organization
 * @param options IUserGroupOptions
 */
export const getSession = (options) => {
  const portal = getPortalUrl(options.organization);
  const { username, password } = environments[ENVIRONMENT].organizations[options.organization].users[options.user];
  if (SESSION_CACHE[username]) {
    return SESSION_CACHE[username];
  }
  const session = new UserSession({
    username,
    password,
    portal: `${portal}/sharing/rest`,
  });
  SESSION_CACHE[username] = session;
  return session;
};
/**
 * Creates an AGO group
 * @param options IUserGroupOptions
 */
export const createAGOGroup = async (options) => {
  const response = await createGroup(Object.assign(Object.assign({}, options), { fetch: fetch }));
  if (!response.success) {
    throw new Error(`Failed to create group`);
  }
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  return response.group.id;
};
/**
 * Updates an AGO group
 * @param options IUserGroupOptions
 */
export const updateAGOGroup = async (options) => {
  const response = await updateGroup(Object.assign(Object.assign({}, options), { fetch: fetch }));
  if (!response.success) {
    throw new Error(`Failed to update group: ${options.group.id}`);
  }
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  return response.groupId;
};
/**
 * Removes an AGO group
 * @param options IUserGroupOptions
 */
export const removeAGOGroup = async (options) => {
  const response = await removeGroup(Object.assign(Object.assign({}, options), { fetch: fetch }));
  if (!response.success) {
    throw new Error(`Failed to remove group: ${options.id}`);
  }
};
