import { IArcGISContext } from "@esri/hub-common";
export interface ICapabilityBaseSchema {
  schema: any;
  uiSchema: any;
}
/**
 * Return the base schema for an entity caoability
 * These are used to display the capability in the configuration editor, in the
 * capability's pane
 * @param groups
 * @param context
 * @returns
 */
export declare function getCapabilityBaseSchemas(groups: string[], context: IArcGISContext): ICapabilityBaseSchema;
