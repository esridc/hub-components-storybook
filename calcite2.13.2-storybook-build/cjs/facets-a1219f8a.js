'use strict';

const extent = require('./extent-715f7c8d.js');
const getProp = require('./get-prop-4bd8fc1a.js');

/**
 * A list of facet types that we can build IFacets for.
 * The default facet definitions are item based, for
 * entities that have different facet definations for
 * the same facet types, we prefix those facet types with
 * the entity type to differentiate them, e.g. "group-type".
 *
 * NOTE: This is the order in which the facets will be
 * displayed.
 *
 * NOTE: When adding a new facet for an entity type, first
 * check if the facet exists in the FacetTypes already and
 * if the facet definition is the same as the default one,
 * if so, just simply add the entity type to that facet's
 * validTargetEntities. Otherwise, add the new facet type
 * here and a new function to create the facet, make sure
 * to add the entity type to its validTargetEntities and
 * add the corresponding function to the facetFnMap.
 */
const WELL_KNOWN_FACET_TYPES = [
  "location",
  "type",
  "source",
  "tags",
  "categories",
  "license",
  "modified",
  "access",
  "group-role",
  "group-type",
  "group-access",
  "event-from",
  "event-access",
  "event-date",
];
/**
 * A map of facet types to functions that create the
 * default IFacet for that type.
 */
const facetFnMap = {
  'type': createTypeFacet,
  'source': createSourceFacet,
  'tags': createTagsFacet,
  'categories': createCategoriesFacet,
  'license': createLicenseFacet,
  'modified': createModifiedFacet,
  'access': createAccessFacet,
  'location': createLocationFacet,
  'group-type': createGroupTypeFacet,
  'group-role': createGroupRoleFacet,
  'group-access': createGroupAccessFacet,
  'event-from': createEventFromFacet,
  'event-access': createEventAccessFacet,
  'event-date': createEventDateFacet,
};
/**
 * Builds a list of IFacets based on the facets passed in.
 * If a facet is a string and is in the facetFnMap, we
 * will call the corresponding function to build the facet.
 * If the facet is an IFacet, we will pass it through.
 * @param facets a list of IFacets or facet names, or a mix of both
 * @param context
 * @param intl
 *
 * @returns a list of IFacets
 */
function hydrateFacets(facets, context, intl, options) {
  return facets.reduce((acc, facet) => {
    if (typeof facet === 'string' && facet in facetFnMap) {
      const f = facetFnMap[facet](context, intl, options);
      // some facets are not available in portal, so they
      // will return null
      f && acc.push(f);
    }
    else if (facet) {
      acc.push(facet);
    }
    return acc;
  }, []);
}
/**
 * Filters the facets based on the target entity, if the
 * facet has a validTargetEntities property and the
 * target entity is not in the list, the facet will be
 * removed from the list. If the facet does not have a
 * validTargetEntities property, it will be passed
 * through so we don't break the existing behavior
 * @param facets
 * @param targetEntity
 * @returns
 */
function filterFacetsbyTargetEntity(facets, targetEntity) {
  return facets.filter(facet => !facet.validTargetEntities || facet.validTargetEntities.includes(targetEntity));
}
function createTypeFacet(_context, intl) {
  return {
    label: intl.t(`facets.type.label`),
    key: 'type',
    display: 'multi-select',
    field: 'type',
    options: [],
    operation: 'OR',
    aggLimit: 100,
    validTargetEntities: ["item"],
  };
}
function createAccessFacet(_context, intl) {
  return {
    label: intl.t(`facets.access.label`),
    key: 'access',
    display: 'multi-select',
    field: 'access',
    options: [],
    operation: 'OR',
    validTargetEntities: ["item"],
  };
}
function createModifiedFacet(_context, intl) {
  return {
    label: intl.t(`facets.dateUpdated.label`),
    key: 'modified',
    display: 'date-range',
    field: 'modified',
    state: 'open',
    max: new Date().toString(),
    validTargetEntities: ["item"],
  };
}
/**
 * License and Source facets are only available with
 * the OGC API and currently only being used on the
 * search route. We will not include item in their
 * validTargetEntities, instead they will be manually
 * added to `facets` when needed
 */
function createLicenseFacet(_context, intl) {
  // Instead of checking isPortal, we check if the service is online
  return _context.serviceStatus['hub-search'] === 'online' ? {
    label: intl.t(`facets.license.label`),
    key: 'license',
    display: 'multi-select',
    field: 'license',
    options: [],
    operation: 'OR',
    aggLimit: 100,
    tooltip: intl.t(`facets.license.tooltip`),
    validTargetEntities: []
  } : null;
}
function createSourceFacet(_context, intl) {
  // Instead of checking isPortal, we check if the service is online
  return _context.serviceStatus['hub-search'] === 'online' ? {
    label: intl.t(`facets.source.label`),
    key: 'source',
    display: 'multi-select',
    field: 'source',
    options: [],
    operation: 'OR',
    aggLimit: 100,
    tooltip: intl.t(`facets.source.tooltip`),
    validTargetEntities: [],
  } : null;
}
function createTagsFacet(_context, intl) {
  return {
    label: intl.t(`facets.tags.label`),
    key: 'tags',
    display: 'multi-select',
    field: 'tags',
    options: [],
    operation: 'OR',
    aggLimit: 15,
    validTargetEntities: ["item"],
  };
}
function createLocationFacet(_context, intl, options) {
  return {
    label: intl.t(`facets.location.label`),
    key: 'bbox',
    display: 'map',
    field: 'bbox',
    value: null,
    extent: (options === null || options === void 0 ? void 0 : options.facetExtent) || extent.bBoxToExtent([[-180, -90], [180, 90]]),
    tooltip: intl.t(`facets.location.tooltip`),
    validTargetEntities: ["item"],
  };
}
function createCategoriesFacet(_context, intl) {
  return {
    label: intl.t(`facets.categories.label`),
    key: 'categories',
    display: 'tree',
    field: 'categories',
    operation: 'OR',
    aggLimit: 100,
    options: [],
    validTargetEntities: ["item"],
  };
}
function createGroupTypeFacet(_context, intl) {
  return {
    label: intl.t(`facets.group.type.label`),
    key: 'type',
    display: 'single-select',
    operation: 'OR',
    options: [
      {
        label: intl.t(`facets.group.type.all`),
        key: 'all',
        selected: true,
        predicates: [],
      },
      {
        label: intl.t(`facets.group.type.view`),
        key: 'view',
        selected: false,
        predicates: [{
            capabilities: {
              not: ['updateitemcontrol']
            }
          }],
      },
      {
        label: intl.t(`facets.group.type.edit`),
        key: 'edit',
        selected: false,
        predicates: [{
            capabilities: 'updateitemcontrol'
          }],
      }
    ],
    validTargetEntities: ["group"],
  };
}
function createGroupRoleFacet(_context, intl) {
  var _a;
  const managerGroupIds = (_a = getProp.getProp(_context, 'currentUser.groups')) === null || _a === void 0 ? void 0 : _a.reduce((accum, g) => {
    if (g.userMembership.memberType === 'admin') {
      accum.push(g.id);
    }
    return accum;
  }, []);
  return {
    label: intl.t(`facets.group.role.label`),
    key: 'role',
    display: 'single-select',
    operation: 'OR',
    options: [
      {
        label: intl.t(`facets.group.role.all`),
        key: 'all',
        selected: true,
        predicates: [{
            searchUserAccess: 'groupMember'
          }]
      },
      {
        label: intl.t(`facets.group.role.member`),
        key: 'member',
        selected: false,
        predicates: [{
            searchUserAccess: 'groupMember',
            owner: {
              not: getProp.getProp(_context, 'session.username')
            }
          }]
      },
      {
        label: intl.t(`facets.group.role.manager`),
        key: 'manager',
        selected: false,
        predicates: [{
            id: managerGroupIds === null || managerGroupIds === void 0 ? void 0 : managerGroupIds.slice(0, 140)
          }]
      },
      {
        label: intl.t(`facets.group.role.owner`),
        key: 'owner',
        selected: false,
        predicates: [{
            owner: getProp.getProp(_context, 'session.username')
          }]
      }
    ],
    validTargetEntities: ["group"],
  };
}
function createGroupAccessFacet(_context, intl) {
  return {
    label: intl.t(`facets.group.sharing.label`),
    key: 'access',
    display: 'multi-select',
    operation: 'OR',
    options: [
      {
        label: intl.t(`facets.group.sharing.private`),
        key: 'private',
        selected: false,
        predicates: [{
            access: ['private', 'org']
          }]
      },
      {
        label: intl.t(`facets.group.sharing.public`),
        key: 'public',
        selected: false,
        predicates: [{
            access: 'public'
          }]
      }
    ],
    validTargetEntities: ["group"],
  };
}
function createEventDateFacet(_context, intl) {
  return {
    label: intl.t(`facets.event.startDate.label`),
    key: 'modified',
    display: 'date-range',
    field: 'startDateRange',
    state: 'open',
    validTargetEntities: ["event"],
  };
}
function createEventFromFacet(_context, intl) {
  return {
    label: intl.t(`facets.event.from.label`),
    key: 'from',
    display: 'single-select',
    operation: 'OR',
    options: [
      {
        label: intl.t(`facets.event.from.myContent`),
        key: 'myContent',
        selected: true,
        predicates: [
          {
            owner: getProp.getProp(_context, 'currentUser.id'),
          },
        ],
      },
      {
        label: intl.t(`facets.event.from.myOrganization`),
        key: 'myOrganization',
        selected: false,
        predicates: [
          {
            orgId: getProp.getProp(_context, 'currentUser.orgId'),
          },
        ],
      },
      {
        label: intl.t(`facets.event.from.world`),
        key: 'world',
        selected: false,
        predicates: [
          {
            access: ['public', 'private', 'org'],
          },
        ],
      },
    ],
    validTargetEntities: ["event"],
  };
}
function createEventAccessFacet(_context, intl) {
  return {
    label: intl.t(`facets.event.access.label`),
    key: 'access',
    field: 'access',
    display: 'multi-select',
    operation: 'OR',
    options: [
      {
        label: intl.t(`facets.event.access.private`),
        key: 'private',
        selected: false,
        predicates: [
          {
            access: 'private',
          },
        ],
      },
      {
        label: intl.t(`facets.event.access.org`),
        key: 'org',
        selected: false,
        predicates: [
          {
            access: 'org',
          },
        ],
      },
      {
        label: intl.t(`facets.event.access.public`),
        key: 'public',
        selected: false,
        predicates: [
          {
            access: 'public',
          },
        ],
      },
    ],
    validTargetEntities: ["event"],
  };
}

exports.WELL_KNOWN_FACET_TYPES = WELL_KNOWN_FACET_TYPES;
exports.filterFacetsbyTargetEntity = filterFacetsbyTargetEntity;
exports.hydrateFacets = hydrateFacets;
