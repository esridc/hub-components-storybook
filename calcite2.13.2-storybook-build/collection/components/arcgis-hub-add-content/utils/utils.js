import { getHubEntityTypeFromType } from "../../../utils/type-converters";
/**
 * Get the configuration for a gallery of "existing" content
 * @param _
 * @param options
 * @returns
 */
export function getContentGalleryConfig(_, options) {
  const response = {
    corners: 'round',
    facets: [
      {
        label: options.t("contentGallery.facets.type.label"),
        key: 'type',
        display: 'multi-select',
        field: 'type',
        options: [],
        operation: 'OR',
        aggLimit: 100,
      },
      {
        label: options.t("contentGallery.facets.tags.label"),
        key: 'tags',
        display: 'multi-select',
        field: 'tags',
        options: [],
        operation: 'OR',
      },
      {
        label: options.t("contentGallery.facets.categories.label"),
        key: 'categories',
        display: 'tree',
        field: 'categories',
        options: [],
        operation: 'OR',
      },
      {
        label: options.t("contentGallery.facets.modified.label"),
        key: 'modified',
        display: 'date-range',
        field: 'modified',
        state: 'open',
        max: new Date(),
      }
    ],
    gallerySelection: { [options.query.targetEntity]: (options === null || options === void 0 ? void 0 : options.selectedContentIds) || [] },
    layout: 'grid',
    limit: 8,
    linkTarget: 'siteRelative',
    query: options.query,
    selectionMode: 'multiple',
    showFacets: true,
    showLayoutSwitcher: true,
    showMoreResultsBtn: true,
    showResultsCount: true,
    showSearch: true,
    showSelection: true,
    state: options === null || options === void 0 ? void 0 : options.state
  };
  if (options.canAddOthersContent) {
    // add the access facet
    response.facets = [
      {
        label: options.t("contentGallery.facets.access.label"),
        key: 'access',
        display: 'multi-select',
        field: 'access',
        options: [],
        operation: 'OR',
      },
      ...response.facets
    ];
  }
  return response;
}
/**
 * Get the configuration for a gallery of groups the user can choose to share to
 * @param context
 * @param options
 * @returns
 */
export function getGroupsGalleryConfig(context, options) {
  var _a, _b, _c;
  // the base query - further filtered by the facets
  const query = {
    targetEntity: "group",
    filters: [
      {
        predicates: [
          {
            searchUserAccess: 'groupMember',
            searchUserName: context.currentUser.username,
          },
        ]
      }
    ]
  };
  const idsOfUserAdminGroups = context.currentUser.groups
    .reduce((acc, group) => {
    group.userMembership.memberType === 'admin' && acc.push(group.id);
    return acc;
  }, []);
  const result = {
    corners: 'round',
    facets: [
      {
        label: options.t("groupsGallery.facets.access.label"),
        key: "access",
        display: "multi-select",
        operation: "OR",
        options: [
          {
            label: options.t("groupsGallery.facets.access.options.public"),
            key: "public",
            selected: false,
            predicates: [{
                access: "public",
              }],
          },
          {
            label: options.t('groupsGallery.facets.access.options.org'),
            key: "organization",
            selected: false,
            predicates: [{
                access: "org",
              },]
          },
          {
            label: options.t("groupsGallery.facets.access.options.private"),
            key: "mine",
            selected: false,
            predicates: [{
                access: "private",
              }],
          }
        ],
      },
      {
        label: options.t('groupsGallery.facets.type.label'),
        key: "types",
        display: "multi-select",
        pageSize: 4,
        operation: "AND",
        options: [
          {
            label: options.t('groupsGallery.facets.type.options.sharedUpdate'),
            key: "sharedUpdate",
            selected: false,
            predicates: [{ capabilities: "updateitemcontrol" }]
          },
          {
            label: options.t('groupsGallery.facets.type.options.opendata'),
            key: "opendata",
            selected: false,
            predicates: [{ isopendata: true }]
          }
        ]
      },
      {
        label: options.t('groupsGallery.facets.from.label'),
        key: 'from',
        display: 'single-select',
        options: [
          {
            label: options.t('groupsGallery.facets.from.options.myGroups'),
            key: 'myGroups',
            selected: false,
            predicates: [
              {
                owner: context === null || context === void 0 ? void 0 : context.currentUser.username
              }
            ]
          },
          {
            label: options.t('groupsGallery.facets.from.options.myOrganization'),
            key: 'myOrganization',
            selected: true,
            predicates: [
              ((_a = options.catalogGroupIds) === null || _a === void 0 ? void 0 : _a.length) ? {
                orgid: (_b = context === null || context === void 0 ? void 0 : context.currentUser) === null || _b === void 0 ? void 0 : _b.orgId,
                id: options.catalogGroupIds
              } : {
                orgid: (_c = context === null || context === void 0 ? void 0 : context.currentUser) === null || _c === void 0 ? void 0 : _c.orgId,
                isviewonly: false
              }
            ]
          }
        ]
      }
    ],
    gallerySelection: { group: options.selectedGroupIds },
    layout: 'grid',
    limit: 8,
    linkTarget: 'siteRelative',
    newTab: true,
    query,
    selectionMode: 'single',
    showFacets: true,
    showLayoutSwitcher: true,
    showMoreResultsBtn: true,
    showResultsCount: true,
    showSearch: true,
    showSelection: true,
    showSort: true,
    state: options === null || options === void 0 ? void 0 : options.state
  };
  const fromFacet = result.facets.find(facet => facet.key === 'from');
  if (context === null || context === void 0 ? void 0 : context.communityOrgId) {
    fromFacet.options.push({
      label: options.t('groupsGallery.facets.from.options.myCommunity'),
      key: 'myCommunity',
      selected: false,
      predicates: [
        {
          orgid: context === null || context === void 0 ? void 0 : context.communityOrgId,
          isviewonly: false
        },
        {
          orgid: context === null || context === void 0 ? void 0 : context.communityOrgId,
          id: idsOfUserAdminGroups
        }
      ]
    });
  }
  fromFacet.options.push({
    label: options.t('groupsGallery.facets.from.options.world'),
    key: 'world',
    selected: false,
    predicates: [
      {
        isviewonly: false
      }
    ]
  });
  return result;
}
export function getIcon(entityType) {
  // if an icon is not provided in the config, fallback to a default
  const DEFAULT_ICONS = {
    event: "event",
    discussion: "speech-bubbles",
    group: "group",
    initiative: "initiative",
    page: "file-text",
    project: "projects",
    site: "browser"
  };
  return DEFAULT_ICONS[entityType] || "file";
}
function getDefaultEventEntityValues(options) {
  var _a;
  const values = {};
  let entity;
  if (['project', 'initiative', 'site'].includes(getHubEntityTypeFromType((_a = options === null || options === void 0 ? void 0 : options.entity) === null || _a === void 0 ? void 0 : _a.type))) {
    entity = options.entity;
  }
  else if ((options === null || options === void 0 ? void 0 : options.site) && !options.site.isHubHome) {
    entity = options.site;
  }
  if (entity) {
    values.referencedContentIds = [entity.id];
    values.referencedContentIdsByType = [{
        entityId: entity.id,
        entityType: entity.type,
      }];
  }
  return values;
}
function getDefaultSiteEntityValues(_options) {
  return {
    _urlInfo: {
      // this is a hack to work around what i consider to be a configuration editor bug
      // it removes empty values and that breaks the validation
      _: '_',
    }
  };
}
const DEFAULT_ENTITY_VALUES_MAP = {
  event: getDefaultEventEntityValues,
  site: getDefaultSiteEntityValues
};
export function getDefaultEntityValues(entityType, configurationValues, options) {
  var _a;
  const defaultEntityValues = (_a = DEFAULT_ENTITY_VALUES_MAP[entityType]) === null || _a === void 0 ? void 0 : _a.call(DEFAULT_ENTITY_VALUES_MAP, options);
  return Object.assign(Object.assign({}, configurationValues), defaultEntityValues);
}
