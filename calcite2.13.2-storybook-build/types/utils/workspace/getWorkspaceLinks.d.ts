import { IWorkspaceLink } from './types';
import { IArcGISContext, HubEntity } from '@esri/hub-common';
/**
 * returns an array of workspace links for a given entity that the
 * current user is granted access to
 */
export declare function getWorkspaceLinks(entity: HubEntity, _context: IArcGISContext): Promise<IWorkspaceLink[]>;
