import { IArcGISContext, HubEntity } from '@esri/hub-common';
/**
 * Returns the default workspace pane for a given entity or entity type.
 * Should pass entityOptions, which should have either entity or entityType.
 * @param _context
 * @param entityOptions
 * @returns
 */
export declare function getDefaultWorkspacePane(entity: Partial<HubEntity>, _context?: IArcGISContext): Promise<string>;
