'use strict';

const domainExists = require('./domain-exists-0c69176a.js');
const teams = require('./teams-d12190bc.js');
const discussions = require('./discussions-09889d00.js');
const utils = require('./utils-7f390376.js');

async function fetchEnvironmentDetails(options, hubRequestOptions) {
  let { isHub } = options;
  if (isHub === undefined) {
    try {
      isHub = await domainExists.domainExists(globalThis.location.hostname, hubRequestOptions);
    }
    catch (e) {
      isHub = false;
    }
  }
  return { isHub };
}

async function fetchEntityDetails(options, hubRequestOptions) {
  var _a;
  const { post, parent, bust, locationId, discussionType } = options;
  let { discussion, entityId, entityType, entity, displayFieldValue, displayFieldKey, displayFieldValid } = options;
  const fetchEntityByType = (id, type, bust) => type === utils.DiscussionType.GROUP ? teams.fetchTeamFromCache(id, hubRequestOptions, { bust }) : discussions.fetchContentFromCache(id, Object.assign(Object.assign({}, hubRequestOptions), { enrichments: ['data', 'ownerUser', 'org'] }), { bust });
  if (entity) {
    entityId = entity.id;
    entityType = entity.type === utils.DiscussionType.GROUP ? utils.DiscussionType.GROUP : 'content';
  }
  else if (entityId && entityType) {
    entity = await fetchEntityByType(entityId, entityType, bust);
  }
  else if (parent || post) {
    ({ type: entityType, id: entityId } = discussions.parseDiscussionURI((parent === null || parent === void 0 ? void 0 : parent.discussion) || (post === null || post === void 0 ? void 0 : post.discussion)));
    entity = await fetchEntityByType(entityId, entityType, bust);
  }
  else if (discussion) {
    ({ type: entityType, id: entityId } = discussions.parseDiscussionURI(discussion));
    if ([utils.DiscussionType.GROUP, utils.DiscussionType.CONTENT].includes(entityType)) {
      entity = await fetchEntityByType(entityId, entityType, bust);
    }
    else if (entityType) {
      entity = await fetchEntityByType(entityId, entityType, bust);
    }
    else {
      throw new Error('must provide an `entityType` when only providing `discussion` with scope that is not `content` or `group`');
    }
  }
  if (entity) {
    displayFieldKey = ((_a = entity.layer) === null || _a === void 0 ? void 0 : _a.displayField) || null;
    displayFieldValid = discussions.hasValidDisplayField(entity);
    if (locationId && displayFieldValid && displayFieldValue === undefined) {
      try {
        ({
          properties: { [entity.layer.displayField]: displayFieldValue },
        } = await discussions.fetchAndTransformFeature(entity.url, locationId));
      }
      catch (error) {
        console.error('Failed to load location:', error.message);
      }
    }
    else {
      displayFieldValue = displayFieldValue || null;
    }
  }
  else {
    displayFieldKey = null;
    displayFieldValid = null;
    displayFieldValue = null;
  }
  discussion = discussion || (post === null || post === void 0 ? void 0 : post.discussion) || (parent === null || parent === void 0 ? void 0 : parent.discussion) || `hub://${entityType}/${entityId}${discussionType ? `/${discussionType}` : ''}`;
  return {
    discussion,
    entityId,
    entityType,
    entity,
    displayFieldKey,
    displayFieldValid,
    displayFieldValue,
  };
}

exports.fetchEntityDetails = fetchEntityDetails;
exports.fetchEnvironmentDetails = fetchEnvironmentDetails;
