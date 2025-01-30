/** type of entity being associated with */
export const ASSOCIATION_TYPE = "project";
/**
 * Enum defining a key for each tab. This is also
 * the value that will be emitted as the label on
 * navigation telemetry
 */
export var ProjectsPaneTabs;
(function (ProjectsPaneTabs) {
  ProjectsPaneTabs["PROJECTS"] = "projects";
  ProjectsPaneTabs["MEMBERS"] = "members";
  ProjectsPaneTabs["SETTINGS"] = "settings";
})(ProjectsPaneTabs || (ProjectsPaneTabs = {}));
/**
 * Return the facets for the main associations gallery
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export const getAssociationsGalleryFacets = (intl) => {
  return [
    {
      label: intl.t("shared.facets.status.label"),
      key: 'status',
      operation: 'OR',
      display: 'multi-select',
      options: [
        {
          label: intl.t("shared.facets.status.notStarted"),
          key: 'notStarted',
          predicates: [{ typekeywords: 'status|notStarted' }],
          selected: false
        },
        {
          label: intl.t("shared.facets.status.inProgress"),
          key: 'inProgress',
          predicates: [{ typekeywords: 'status|inProgress' }],
          selected: false
        },
        {
          label: intl.t("shared.facets.status.onHold"),
          key: 'onHold',
          predicates: [{ typekeywords: 'status|onHold' }],
          selected: false
        },
        {
          label: intl.t("shared.facets.status.complete"),
          key: 'complete',
          predicates: [{ typekeywords: 'status|complete' }],
          selected: false
        }
      ]
    },
    {
      label: intl.t("shared.facets.tags.label"),
      key: 'tags',
      field: 'tags',
      aggLimit: 15,
      operation: 'OR',
      display: 'multi-select',
      options: []
    },
    {
      label: intl.t("shared.facets.access.label"),
      key: "access",
      display: "multi-select",
      field: "access",
      options: [],
      operation: "OR",
    }
  ];
};
/**
 * Return the facets for the association group's members gallery
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export const getMembersGalleryFacets = (intl) => {
  return [
    {
      label: intl.t("members.facets.role.label"),
      key: 'access',
      display: 'single-select',
      field: 'access',
      options: [
        {
          label: intl.t("members.facets.role.all"),
          key: "all",
          selected: true,
          predicates: [],
        },
        {
          label: intl.t("members.facets.role.manager"),
          key: "admin",
          selected: false,
          predicates: [{
              memberType: "admin",
            }],
        },
        {
          label: intl.t("members.facets.role.member"),
          key: "member",
          selected: false,
          predicates: [{
              memberType: "member",
            }],
        }
      ],
      operation: 'OR',
    },
    {
      label: intl.t("members.facets.dateJoined.label"),
      key: 'joined',
      display: 'date-range',
      state: 'open',
      field: 'joined',
      max: new Date(),
    },
  ];
};
/**
 * Return the facets for the request association(s)
 * gallery picker
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export const getRequestAssociationFacets = (intl) => {
  return getAssociationsGalleryFacets(intl).filter(facet => facet.key !== 'tags');
};
