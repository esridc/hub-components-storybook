/***
 *    ######## ######## ##     ## ########
 *       ##    ##       ###   ### ##     ##
 *       ##    ##       #### #### ##     ##
 *       ##    ######   ## ### ## ########
 *       ##    ##       ##     ## ##
 *       ##    ##       ##     ## ##
 *       ##    ######## ##     ## ##
 *    FUNCTIONS IN THIS FILE WILL BE IMPLEMENTED IN HUB.JS
 */
import { deletePage, deleteProject, deleteContent, deleteInitiative, deleteSite, deleteDiscussion, deleteInitiativeTemplate, deleteTemplate, deleteHubGroup, createProject, createSite, createInitiative, createDiscussion, createContent, createPage, createInitiativeTemplate, createTemplate, deleteSurvey, setProp, deleteHubEvent } from '@esri/hub-common';
/**
 * adds orgUrlKey to entity, derived
 * from context.portal.urlKey
 */
function withOrgUrlKey(entity, context) {
  var _a;
  return Object.assign(Object.assign({}, entity), { orgUrlKey: (_a = context === null || context === void 0 ? void 0 : context.portal) === null || _a === void 0 ? void 0 : _a.urlKey });
}
/**
 * centralized function to create a Hub entity - delegates
 * to the appropriate create function by entity type
 */
export async function createHubEntity(type, entity, context) {
  let result;
  const _entity = withOrgUrlKey(entity, context);
  switch (type) {
    case "project":
      result = await createProject(_entity, context.userRequestOptions);
      break;
    case "site":
      result = await createSite(_entity, context.hubRequestOptions);
      break;
    case "initiative":
      result = await createInitiative(_entity, context.userRequestOptions);
      break;
    case "discussion":
      result = await createDiscussion(_entity, context.userRequestOptions);
      break;
    case "content":
      result = await createContent(_entity, context.userRequestOptions);
      break;
    case "page":
      result = await createPage(_entity, context.userRequestOptions);
      break;
    case "initiativeTemplate":
      result = await createInitiativeTemplate(_entity, context.userRequestOptions);
    case "template":
      result = await createTemplate(_entity, context.userRequestOptions);
      break;
  }
  return result;
}
/**
 * centralized function to delete a Hub entity - delegates
 * to the appropriate delete function by entity type
 */
export async function deleteHubEntity(type, entity, context, permanent = false) {
  const uro = Object.assign({}, context.userRequestOptions);
  // Add the owner to the request options if the current user is not the owner
  if (entity.owner !== context.currentUser.username) {
    setProp('owner', entity.owner, uro);
  }
  // If the entity is recycleable, we need to add `permanentDelete`
  if (permanent) {
    uro.params = { permanentDelete: true };
  }
  switch (type) {
    case "project":
      await deleteProject(entity.id, uro);
      break;
    case "initiative":
      await deleteInitiative(entity.id, uro);
      break;
    case "site":
      // Sites need to delete the domain entry, which requires the IHubRequestOptions
      // and we also need to add the owner to the request options if the current user is not the owner
      // without affecting the original context.hubRequestOptions, so we create a new object
      const siteHuro = Object.assign({}, context.hubRequestOptions);
      if (entity.owner !== context.currentUser.username) {
        setProp('owner', entity.owner, siteHuro);
      }
      await deleteSite(entity.id, siteHuro);
      break;
    case "content":
      await deleteContent(entity.id, uro);
      break;
    case "discussion":
      // discussions can't be recycled, so we don't need to pass the permanent flag
      // Discussion also requires the IHubRequestOptions, so we do that same thing as with sites
      const huro = Object.assign({}, context.hubRequestOptions);
      if (entity.owner !== context.currentUser.username) {
        setProp('owner', entity.owner, huro);
      }
      await deleteDiscussion(entity.id, huro);
      break;
    case "page":
      await deletePage(entity.id, uro);
      break;
    case "initiativeTemplate":
      await deleteInitiativeTemplate(entity.id, uro);
      break;
    case "template":
      await deleteTemplate(entity.id, uro);
      break;
    case "group":
      await deleteHubGroup(entity.id, uro);
      break;
    case "event":
      await deleteHubEvent(entity.id, context.hubRequestOptions);
      break;
    case "survey":
      await deleteSurvey(entity.id, uro);
      break;
  }
}
