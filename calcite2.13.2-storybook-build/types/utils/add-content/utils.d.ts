import { EntityType, IArcGISContext, IHubGroup, IHubItemEntity, IQuery } from "@esri/hub-common";
export interface ISharingStatus {
  id: string;
  groupId: string;
  status: "success" | "fail";
}
export interface IGroupReciept {
  group: IHubGroup;
  targetEntity: EntityType;
  success: string[];
  successQuery: IQuery;
  fail: string[];
  failQuery: IQuery;
}
export interface IHubGroupSharingResults {
  overallStatus: "success" | "fail";
  groups: IHubGroup[];
  entities: IHubItemEntity[];
  results: ISharingStatus[];
  receipts: IGroupReciept[];
}
/**
 * Unshare a set of entities from a set of groups, returning a flat list of the results
 * NOTE: This is not used in the application, thus not returing an object optimized
 * for display in the UI
 * @param groups
 * @param entities
 * @param context
 * @returns
 */
export declare function unshareEntitiesToGroups(groups: IHubGroup[], entities: IHubItemEntity[], context: IArcGISContext): Promise<any>;
/**
 * Share a set of entities to a set of groups, returning a structured response
 * that can be used to display the results in the UI
 * @param groups
 * @param entities
 * @param context
 * @returns
 */
export declare function shareEntitiesToGroups(groups: IHubGroup[], entities: IHubItemEntity[], context: IArcGISContext): Promise<IHubGroupSharingResults>;
