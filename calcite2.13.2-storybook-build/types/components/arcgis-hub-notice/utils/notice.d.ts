import { IArcGISContext } from "@esri/hub-common";
import { IHubNotice } from "../../../utils/notices";
/**
 * Returns true if any of the the places specifid in the notice match the provided place
 *
 * @export
 * @param {IHubNotice} notice
 * @param {string} place
 * @return {*}  {boolean}
 */
export declare function placesMatch(notice: IHubNotice, place: string): boolean;
/**
 * Returns true if all the dates on the notice match
 *
 * @export
 * @param {IHubNotice} notice
 * @return {*}  {boolean}
 */
/**
 * Returns true if all the dates on the notice match
 *
 * @export
 * @param {IHubNotice} notice
 * @return {*}  {boolean}
 */
export declare function datesMatch(notice: IHubNotice): boolean;
/**
 * Returns true if all the permissions on the notice match
 *
 * @export
 * @param {IHubNotice} notice
 * @param {IArcGISContext} context
 * @return {*}  {boolean}
 */
export declare function permissionsMatch(notice: IHubNotice, context: IArcGISContext): boolean;
