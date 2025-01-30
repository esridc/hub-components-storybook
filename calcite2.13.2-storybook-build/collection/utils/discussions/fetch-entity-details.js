import { DiscussionType, parseDiscussionURI } from '@esri/hub-discussions';
import { fetchTeamFromCache } from '../teams';
import { fetchAndTransformFeature, fetchContentFromCache, hasValidDisplayField } from '../../components/arcgis-hub-discussions/utils/discussions';
export async function fetchEntityDetails(options, hubRequestOptions) {
  var _a;
  const { post, parent, bust, locationId, discussionType } = options;
  let { discussion, entityId, entityType, entity, displayFieldValue, displayFieldKey, displayFieldValid } = options;
  const fetchEntityByType = (id, type, bust) => type === DiscussionType.GROUP ? fetchTeamFromCache(id, hubRequestOptions, { bust }) : fetchContentFromCache(id, Object.assign(Object.assign({}, hubRequestOptions), { enrichments: ['data', 'ownerUser', 'org'] }), { bust });
  if (entity) {
    entityId = entity.id;
    entityType = entity.type === DiscussionType.GROUP ? DiscussionType.GROUP : 'content';
  }
  else if (entityId && entityType) {
    entity = await fetchEntityByType(entityId, entityType, bust);
  }
  else if (parent || post) {
    ({ type: entityType, id: entityId } = parseDiscussionURI((parent === null || parent === void 0 ? void 0 : parent.discussion) || (post === null || post === void 0 ? void 0 : post.discussion)));
    entity = await fetchEntityByType(entityId, entityType, bust);
  }
  else if (discussion) {
    ({ type: entityType, id: entityId } = parseDiscussionURI(discussion));
    if ([DiscussionType.GROUP, DiscussionType.CONTENT].includes(entityType)) {
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
    displayFieldValid = hasValidDisplayField(entity);
    if (locationId && displayFieldValid && displayFieldValue === undefined) {
      try {
        ({
          properties: { [entity.layer.displayField]: displayFieldValue },
        } = await fetchAndTransformFeature(entity.url, locationId));
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
