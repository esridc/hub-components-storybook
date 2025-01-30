import { d as discussionsApiRequest } from './discussions-api-request-199cae2d.js';

/**
 * create setting
 *
 * @export
 * @param {ICreateSettingParams} options
 * @return {*} {Promise<IEntitySetting>}
 */
function createSetting(options) {
    options.httpMethod = "POST";
    return discussionsApiRequest(`/settings`, options);
}
/**
 * fetch setting
 *
 * @export
 * @param {IFetchSettingParams} options
 * @return {*} {Promise<IEntitySetting>}
 */
function fetchSetting(options) {
    options.httpMethod = "GET";
    return discussionsApiRequest(`/settings/${options.id}`, options);
}
/**
 * update setting
 *
 * @export
 * @param {IUpdateSettingParams} options
 * @return {*} {Promise<IEntitySetting>}
 */
function updateSetting(options) {
    options.httpMethod = "PATCH";
    return discussionsApiRequest(`/settings/${options.id}`, options);
}
/**
 * remove setting
 *
 * @export
 * @param {IRemoveSettingParams} options
 * @return {*} {Promise<IRemoveSettingResponse>}
 */
function removeSetting(options) {
    options.httpMethod = "DELETE";
    return discussionsApiRequest(`/settings/${options.id}`, options);
}

export { createSetting as c, fetchSetting as f, removeSetting as r, updateSetting as u };
