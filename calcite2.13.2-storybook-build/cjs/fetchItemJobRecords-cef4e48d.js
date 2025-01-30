'use strict';

const HubError = require('./HubError-44e07249.js');

exports.JobRecordType = void 0;
(function (JobRecordType) {
    JobRecordType["DOWNLOAD"] = "download";
    JobRecordType["UPDATE"] = "update";
})(exports.JobRecordType || (exports.JobRecordType = {}));
exports.JobRecordStatus = void 0;
(function (JobRecordStatus) {
    JobRecordStatus["SUCCESS"] = "success";
    JobRecordStatus["ERROR"] = "error";
    JobRecordStatus["WARNING"] = "warning";
    JobRecordStatus["INFO"] = "info";
})(exports.JobRecordStatus || (exports.JobRecordStatus = {}));
// END of epic types -- https://devtopia.esri.com/dc/hub/issues/10590

/**
 * Fetches job records for a specific item.
 *
 * @param id - The ID of the item.
 * @param options - The options for fetching job records.
 * @returns A promise that resolves to an array of job records.
 * @throws {HubError} If any unimplemented options are provided.
 */
async function fetchItemJobRecords(id, options) {
    const unimplementedOptions = [
        "types",
        "statuses",
    ];
    if (unimplementedOptions.some((option) => options[option])) {
        throw new HubError.HubError("fetchItemJobRecords", `The following options are not yet implemented: ${unimplementedOptions.join(", ")}`);
    }
    const { context } = options;
    const requestUrl = `${context.hubUrl}/api/download/v1/items/${id}/errors${getQueryString(options)}`;
    const { errors: rawErrors } = await fetch(requestUrl).then((response) => response.json());
    // TODO: account for additional row types once the API supports them
    return rawErrors.map(rowToDownloadJobRecord);
}
function getQueryString(options) {
    const params = new URLSearchParams();
    options.from && params.append("fromDate", options.from);
    options.to && params.append("toDate", options.to);
    options.limit && params.append("limit", options.limit.toString());
    const result = params.toString();
    return result && `?${result}`;
}
function rowToDownloadJobRecord(row) {
    return {
        type: exports.JobRecordType.DOWNLOAD,
        message: row.message,
        created: new Date(row.timestamp).getTime(),
        layerId: row.layerId,
        // implement the rest of the fields once the API supports them
        id: null,
        status: null,
        messageId: null,
        modified: null,
    };
}

exports.fetchItemJobRecords = fetchItemJobRecords;
