'use strict';

const edit$1 = require('./edit-3df37e35.js');
const edit$2 = require('./edit-fd85c003.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const edit = require('./edit-2b7ccc3f.js');
const hubSearch = require('./hubSearch-79d30702.js');

/**
 * centralized function to update a Hub entity - delegates
 * to the appropriate update function by entity type
 * @param type
 * @param entity
 * @param context
 * @returns
 */
const updateHubEntity = async (type, entity, context) => {
    let result;
    switch (type) {
        case "project":
            result = await edit$1.updateProject(entity, context.userRequestOptions);
            break;
        case "site":
            result = await HubInitiatives.updateSite(entity, context.hubRequestOptions);
            break;
        case "initiative":
            result = await HubInitiatives.updateInitiative(entity, context.userRequestOptions);
            break;
        case "discussion":
            result = await edit$2.updateDiscussion(entity, context.hubRequestOptions);
            break;
        case "content":
            result = await edit$1.updateContent(entity, context.userRequestOptions);
            break;
        case "page":
            result = await HubInitiatives.updatePage(entity, context.userRequestOptions);
            break;
        case "template":
            result = await edit$1.updateTemplate(entity, context.userRequestOptions);
            break;
        case "initiativeTemplate":
            result = await edit$1.updateInitiativeTemplate(entity, context.userRequestOptions);
            break;
        case "group":
            result = await hubSearch.updateHubGroup(entity, context.requestOptions);
            break;
        case "survey":
            result = await edit$1.updateSurvey(entity, context.userRequestOptions);
            break;
        case "event":
            result = await edit.updateHubEvent(entity, context.hubRequestOptions);
            break;
    }
    return result;
};

exports.updateHubEntity = updateHubEntity;
