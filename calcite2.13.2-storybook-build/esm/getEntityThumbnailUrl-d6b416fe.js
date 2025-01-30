// stop gap so we don't need to keep propagating
// use of the deprecated thumbnailUrl property
const getEntityThumbnailUrl = (entity) => {
    var _a;
    return ((_a = entity.links) === null || _a === void 0 ? void 0 : _a.thumbnail) || entity.thumbnailUrl;
};

export { getEntityThumbnailUrl as g };
