import { u as updateSurvey, a as updateInitiativeTemplate, b as updateTemplate, c as updateContent, d as updateProject } from './edit-237c0a70.js';
import { updateDiscussion } from './edit-9f487804.js';
import { B as updatePage, C as updateInitiative, D as updateSite } from './HubInitiatives-4f4e24ce.js';
import { updateHubEvent } from './edit-fa9666f2.js';
import { u as updateHubGroup } from './hubSearch-41612481.js';

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
            result = await updateProject(entity, context.userRequestOptions);
            break;
        case "site":
            result = await updateSite(entity, context.hubRequestOptions);
            break;
        case "initiative":
            result = await updateInitiative(entity, context.userRequestOptions);
            break;
        case "discussion":
            result = await updateDiscussion(entity, context.hubRequestOptions);
            break;
        case "content":
            result = await updateContent(entity, context.userRequestOptions);
            break;
        case "page":
            result = await updatePage(entity, context.userRequestOptions);
            break;
        case "template":
            result = await updateTemplate(entity, context.userRequestOptions);
            break;
        case "initiativeTemplate":
            result = await updateInitiativeTemplate(entity, context.userRequestOptions);
            break;
        case "group":
            result = await updateHubGroup(entity, context.requestOptions);
            break;
        case "survey":
            result = await updateSurvey(entity, context.userRequestOptions);
            break;
        case "event":
            result = await updateHubEvent(entity, context.hubRequestOptions);
            break;
    }
    return result;
};

export { updateHubEntity as u };
