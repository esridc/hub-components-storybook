import { checkPermission } from "@esri/hub-common";
/**
 * Returns true if any of the the places specifid in the notice match the provided place
 *
 * @export
 * @param {IHubNotice} notice
 * @param {string} place
 * @return {*}  {boolean}
 */
export function placesMatch(notice, place) {
  return !(notice === null || notice === void 0 ? void 0 : notice.places) || notice.places.some(p => {
    // eslint-disable-next-line unicorn/prefer-ternary
    if (typeof p === 'string') {
      return p === place;
    }
    else {
      return p.test(place);
    }
  });
}
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
export function datesMatch(notice) {
  const now = new Date();
  const startDateMatches = !(notice === null || notice === void 0 ? void 0 : notice.startDate) || new Date(notice.startDate) <= now;
  const endDateMatches = !(notice === null || notice === void 0 ? void 0 : notice.endDate) || now <= new Date(notice.endDate);
  return startDateMatches && endDateMatches;
}
/**
 * Returns true if all the permissions on the notice match
 *
 * @export
 * @param {IHubNotice} notice
 * @param {IArcGISContext} context
 * @return {*}  {boolean}
 */
export function permissionsMatch(notice, context) {
  return !(notice === null || notice === void 0 ? void 0 : notice.permissions) || notice.permissions.every(p => checkPermission(p.permission, context).access === p.access);
}
