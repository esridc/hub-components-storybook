'use strict';

const getFamily = require('./get-family-cafa88bb.js');

/**
 * Given a HubEntity, return its HubEntityType
 * @param entity
 * @returns
 */
function getTypeFromEntity(entity) {
    let type;
    switch (entity.type) {
        case "Hub Site Application":
        case "Site Application":
            type = "site";
            break;
        case "Hub Page":
        case "Site Page":
            type = "page";
            break;
        case "Hub Project":
            type = "project";
            break;
        case "Hub Initiative":
            type = "initiative";
            break;
        case "Discussion":
            type = "discussion";
            break;
        case "Solution":
            type = "template";
            break;
        case "Group":
            type = "group";
            break;
        case "Form":
            type = "survey";
            break;
        case "Hub Initiative Template":
            type = "initiativeTemplate";
            break;
        case "Event":
            type = "event";
            break;
        case "User":
            type = "user";
            break;
        // case "Hub Content": // needed for future ticket in getLocationOptions
        //   type = "content";
        //   break;
        default:
            // TODO: other families go here? feedback? solution? template?
            const contentFamilies = ["app", "content", "dataset", "document", "map"];
            if (contentFamilies.includes(getFamily.getFamily(entity.type || ""))) {
                type = "content";
            }
    }
    return type;
}

exports.getTypeFromEntity = getTypeFromEntity;
