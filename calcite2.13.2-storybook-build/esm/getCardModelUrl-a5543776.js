/**
 * given a target and hub search result, this util
 * returns a gallery card's title url
 *
 * @param result hub search result
 * @param target context the card should redirect to
 * @param baseUrl base url to work in conjunction with the target
 */
function getCardModelUrlFromResult(result, target, baseUrl) {
    var _a, _b, _c, _d, _e, _f;
    let titleUrl;
    if (target === "event") {
        titleUrl = "#";
    }
    else if (target === "none") {
        titleUrl = undefined;
    }
    else {
        switch (result.type) {
            default:
                titleUrl = {
                    self: (_a = result.links) === null || _a === void 0 ? void 0 : _a.self,
                    siteRelative: baseUrl
                        ? `${baseUrl}${((_b = result.links) === null || _b === void 0 ? void 0 : _b.siteRelative) || ""}`
                        : (_c = result.links) === null || _c === void 0 ? void 0 : _c.siteRelative,
                    workspaceRelative: baseUrl
                        ? `${baseUrl}${((_d = result.links) === null || _d === void 0 ? void 0 : _d.workspaceRelative) || ""}`
                        : (_e = result.links) === null || _e === void 0 ? void 0 : _e.workspaceRelative,
                }[target];
                break;
            case "Hub Site Application":
                titleUrl = (_f = result.links) === null || _f === void 0 ? void 0 : _f.self;
                break;
        }
    }
    return titleUrl;
}
/**
 * given a target and hub entity, this util
 * returns a gallery card's title url
 *
 * @param entity hub entity
 * @param context auth & portal information
 * @param target context the card should redirect to
 * @param baseUrl base url to work in conjunction with the target
 */
function getCardModelUrlFromEntity(entity, context, target, baseUrl) {
    var _a, _b, _c, _d, _e, _f;
    let titleUrl;
    if (target === "event") {
        titleUrl = "#";
    }
    else if (target === "none") {
        titleUrl = undefined;
    }
    else {
        switch (entity.type) {
            default:
                titleUrl = {
                    self: (_a = entity.links) === null || _a === void 0 ? void 0 : _a.self,
                    siteRelative: baseUrl
                        ? `${baseUrl}${((_b = entity.links) === null || _b === void 0 ? void 0 : _b.siteRelative) || ""}`
                        : (_c = entity.links) === null || _c === void 0 ? void 0 : _c.siteRelative,
                    workspaceRelative: baseUrl
                        ? `${baseUrl}${((_d = entity.links) === null || _d === void 0 ? void 0 : _d.workspaceRelative) || ""}`
                        : (_e = entity.links) === null || _e === void 0 ? void 0 : _e.workspaceRelative,
                }[target];
                break;
            case "Hub Site Application":
                titleUrl = (_f = entity.links) === null || _f === void 0 ? void 0 : _f.self;
                break;
        }
    }
    return titleUrl;
}

export { getCardModelUrlFromEntity as a, getCardModelUrlFromResult as g };
