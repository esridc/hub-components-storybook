import { User, Organization } from '../types';
import { IItemAdd, ICreateGroupOptions, IUserGroupOptions, IUpdateGroupOptions, IUserItemOptions } from '@esri/arcgis-rest-portal';
import { UserSession } from '@esri/arcgis-rest-auth';
/**
 * Gets the portal url for the given organization
 * @param organization
 */
export declare function getPortalUrl(organization?: Organization): string;
/**
 * Create an AGO item
 * @param options
 */
export declare const createAGOItem: (options: {
  access: 'private' | 'org' | 'public';
  item: IItemAdd;
  authentication: UserSession;
}) => Promise<string>;
/**
 * Removes an AGO item
 * @param options IUserItemOptions
 */
export declare const removeAGOItem: (options: IUserItemOptions) => Promise<void>;
/**
 * Gets a Session instance for the given User and Organization
 * @param options IUserGroupOptions
 */
export declare const getSession: (options: {
  organization: Organization;
  user: User;
}) => UserSession;
/**
 * Creates an AGO group
 * @param options IUserGroupOptions
 */
export declare const createAGOGroup: (options: ICreateGroupOptions) => Promise<string>;
/**
 * Updates an AGO group
 * @param options IUserGroupOptions
 */
export declare const updateAGOGroup: (options: IUpdateGroupOptions) => Promise<string>;
/**
 * Removes an AGO group
 * @param options IUserGroupOptions
 */
export declare const removeAGOGroup: (options: IUserGroupOptions) => Promise<void>;
