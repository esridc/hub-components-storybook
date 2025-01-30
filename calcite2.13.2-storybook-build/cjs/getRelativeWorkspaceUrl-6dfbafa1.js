'use strict';

const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');

const HUB_ENTITY_TYPES = [
    "content",
    "discussion",
    "event",
    "group",
    "initiative",
    "initiativeTemplate",
    "org",
    "page",
    "project",
    "site",
    "survey",
    "template",
    "user",
];

const isValidEntityType = (type) => {
    return HUB_ENTITY_TYPES.includes(type);
};

/**
 * From within the context of a hub site, the following util
 * returns an entity's relative workspace URL
 *
 * @param type item type
 * @param identifier entity id or slug
 */
const getRelativeWorkspaceUrl = (type, identifier, pane) => {
    let url = "/";
    const entityType = getTypeFromEntity.getTypeFromEntity({ type });
    /**
     * Note: this logic will likely need to be enhanced to:
     * 1. accommodate enterprise
     * 2. handle entity variation
     */
    if (isValidEntityType(entityType)) {
        let typeSegment = entityType;
        if (typeSegment !== "content") {
            typeSegment = `${typeSegment}s`;
        }
        url = `/workspace/${typeSegment}/${identifier}`;
        if (pane) {
            url += `/${pane}`;
        }
    }
    return url;
};

exports.HUB_ENTITY_TYPES = HUB_ENTITY_TYPES;
exports.getRelativeWorkspaceUrl = getRelativeWorkspaceUrl;
exports.isValidEntityType = isValidEntityType;
