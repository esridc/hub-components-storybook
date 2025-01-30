/***
 *    ######## ######## ##     ## ########
 *       ##    ##       ###   ### ##     ##
 *       ##    ##       #### #### ##     ##
 *       ##    ######   ## ### ## ########
 *       ##    ##       ##     ## ##
 *       ##    ##       ##     ## ##
 *       ##    ######## ##     ## ##
 *    FUNCTIONS IN THIS FILE WILL BE IMPLEMENTED IN HUB.JS
 */
import { IArcGISContext, HubEntity, HubEntityType } from '@esri/hub-common';
/**
 * centralized function to create a Hub entity - delegates
 * to the appropriate create function by entity type
 */
export declare function createHubEntity(type: HubEntityType, entity: HubEntity, context: IArcGISContext): Promise<HubEntity>;
/**
 * centralized function to delete a Hub entity - delegates
 * to the appropriate delete function by entity type
 */
export declare function deleteHubEntity(type: HubEntityType, entity: HubEntity, context: IArcGISContext, permanent?: boolean): Promise<void>;
