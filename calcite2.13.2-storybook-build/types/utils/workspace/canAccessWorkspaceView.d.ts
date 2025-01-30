import { IArcGISContext, HubEntity } from '@esri/hub-common';
import { IWorkspaceAccess } from './types';
export declare function canAccessWorkspaceView(_action: string, _entity: HubEntity, _context: IArcGISContext): Promise<IWorkspaceAccess>;
