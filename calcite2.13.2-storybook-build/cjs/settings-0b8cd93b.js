'use strict';

const discussionsApiRequest = require('./discussions-api-request-e9e6e346.js');

/**
 * create setting
 *
 * @export
 * @param {ICreateSettingParams} options
 * @return {*} {Promise<IEntitySetting>}
 */
function createSetting(options) {
    options.httpMethod = "POST";
    return discussionsApiRequest.discussionsApiRequest(`/settings`, options);
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
    return discussionsApiRequest.discussionsApiRequest(`/settings/${options.id}`, options);
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
    return discussionsApiRequest.discussionsApiRequest(`/settings/${options.id}`, options);
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
    return discussionsApiRequest.discussionsApiRequest(`/settings/${options.id}`, options);
}

exports.createSetting = createSetting;
exports.fetchSetting = fetchSetting;
exports.removeSetting = removeSetting;
exports.updateSetting = updateSetting;
