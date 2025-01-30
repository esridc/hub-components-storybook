import { d as dasherize } from './dasherize-9215e9fc.js';
import { b as capitalize } from './util-3e6872d9.js';
import { g as getProp } from './get-prop-ec5be510.js';

/**
 * Enum of the types of teams mapped to their item properties
 */
const TYPEMAP = {
    core: "collaborationGroupId",
    content: "contentGroupId",
    followers: "followersGroupId"
};

/**
 * function to find all parent elements in an event's composed path with a
 * 'data-element' attribute. This returns a joined string of all of these values
 * @param {EventTarget[]} composedPath composed path of the logged event
 */
const getElementPath = (composedPath) => {
  let length = 0;
  let addEllipsis = false;
  const elementPath = composedPath.reduce((path, el) => {
    var _a;
    const namedItem = (_a = el.attributes) === null || _a === void 0 ? void 0 : _a.getNamedItem('data-element');
    if (namedItem) {
      // standardize the actual value before adding it to the path
      const value = dasherize(namedItem.value).split('-')
        .map(word => capitalize(word)).join(' ');
      // make sure element path is not longer than 256 chars - this
      // is what the Telemetry API allows
      if (length + value.length <= 256) {
        length += value.length;
        path.unshift(value);
      }
      else {
        addEllipsis = true;
      }
    }
    return path;
  }, []);
  return addEllipsis
    ? ['...', ...elementPath].join(' > ')
    : elementPath.join(' > ');
};
/**
 * Extract the id of a specific well-known team from any object
 * @param {Object} object Any object
 * @param {string} type Team Type: (core | content | followers)
 */
const getTeamId = (object, type) => {
  return getProp(object, `${TYPEMAP[type]}`);
};
/**
 * function which returns the transformed groupType. If the groupId provided matches
 * the core, content, or followers group id, this should return 'Core', 'Content', or
 * 'Followers' respectively, otherwise it should return the original groupType
 * (i.e. 'View' or 'Edit').
 * @param {String} groupId
 * @param {String} groupType
 */
const getGroupType = (groupId, groupType, site) => {
  let type = groupType;
  ['core', 'content', 'followers'].forEach(teamType => {
    const id = getTeamId(site, teamType);
    if (id === groupId) {
      type = capitalize(teamType);
    }
  });
  return type;
};
/**
 * function to transform select dimensions before they are
 * appended to the telemetry event object.
 * @param {Object} dimensions telemetry custom dimensions
 */
const transformDimensions = (dimensions = {}, site) => {
  const transformedDimensions = Object.assign({}, dimensions);
  // transform the groupType to be one of: 'Edit', 'View', 'Core', 'Content', or 'Followers'
  if (transformedDimensions.groupId && transformedDimensions.groupType && site) {
    const { groupId, groupType } = transformedDimensions;
    transformedDimensions.groupType = getGroupType(groupId, groupType, site);
  }
  return transformedDimensions;
};
/**
 * function to transform a boolean status to a readable string.
 * We need to explicitly check for strict boolean equality because
 * we don't want an undefined status (i.e. not provided), for example,
 * to result in "Failure" getting logged
 * @param {Boolean | undefined} isSuccess
 * @returns {String}
 */
const getResponse = (isSuccess) => {
  let response;
  if (isSuccess === false) {
    response = 'Failure';
  }
  else if (isSuccess === true) {
    response = 'Success';
  }
  return response;
};
// TODO: use this in places like getDeleteTelemetry and emitSaveTelemetry
// get the dimensions commonly used for entities
const getEntityTelemetryDimensions = (entity) => {
  const { id, type, access, orgId } = entity;
  return type === 'Group'
    ? {
      groupId: id,
      groupType: entity.isSharedUpdate ? "Edit" : "View",
      groupAccess: access,
      groupOrgId: orgId
    }
    : {
      id,
      type,
      access,
      contentOrgId: orgId
    };
};

export { getResponse as a, getEntityTelemetryDimensions as b, getElementPath as g, transformDimensions as t };
