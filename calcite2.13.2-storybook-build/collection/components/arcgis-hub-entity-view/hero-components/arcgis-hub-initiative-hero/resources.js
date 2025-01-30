/**
 * Enum defining a key for each tab. This is also
 * the value that will be emitted as the label on
 * navigation telemetry
 */
export var EntityViewTabs;
(function (EntityViewTabs) {
  EntityViewTabs["OVERVIEW"] = "overview";
  EntityViewTabs["PROJECTS"] = "projects";
  EntityViewTabs["METRICS"] = "metrics";
  EntityViewTabs["CONTENT"] = "content";
})(EntityViewTabs || (EntityViewTabs = {}));
/**
 * max number of associated projects to render on the initiative view
 * before revealing the overflow pattern ("Explore associations" button
 * + "Projects" tab with full gallery of associated projects)
 */
export const FEATURED_ASSOCIATED_PROJECTS_MAX = 4;
/**
 * Return the facets for the Project associations gallery
 * (on the Projects tab)
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export const getAssociatedProjectsFacets = (intl) => {
  return [
    {
      label: intl.t("facets.status"),
      key: 'status',
      operation: 'OR',
      display: 'multi-select',
      options: [
        {
          label: intl.t("status.notStarted"),
          key: 'notStarted',
          predicates: [{ typekeywords: 'status|notStarted' }],
          selected: false
        },
        {
          label: intl.t("status.inProgress"),
          key: 'inProgress',
          predicates: [{ typekeywords: 'status|inProgress' }],
          selected: false
        },
        {
          label: intl.t("status.onHold"),
          key: 'onHold',
          predicates: [{ typekeywords: 'status|onHold' }],
          selected: false
        },
        {
          label: intl.t("status.complete"),
          key: 'complete',
          predicates: [{ typekeywords: 'status|complete' }],
          selected: false
        }
      ]
    },
    {
      label: intl.t('facets.tags'),
      key: 'tags',
      display: 'multi-select',
      field: 'tags',
      options: [],
      operation: 'OR',
    },
    {
      label: intl.t('facets.categories'),
      key: 'categories',
      display: 'tree',
      field: 'categories',
      options: [],
      operation: 'OR',
    },
    {
      label: intl.t('facets.dateUpdated'),
      key: 'modified',
      display: 'date-range',
      field: 'modified',
      state: 'open',
      max: new Date(),
    },
  ];
};
/**
 * Return the combined query for associated projects and
 * the initiative
 * @param initiativeId - initiative id
 * @param associatedProjectsQuery - query for associated projects
 * @param context - arcgis context
 */
export const combineInitiativeAndAssociatedProjectsQuery = (initiativeId, associatedProjectsQuery) => {
  // for each filter, get the predicates and add its key/value pairs to the acc and return the acc
  const predicates = associatedProjectsQuery.filters.reduce((acc, filter) => {
    return filter.predicates.reduce((acc, predicate) => {
      return Object.assign(Object.assign({}, acc), predicate);
    }, acc);
  }, {});
  // combine the initiative and project queries with an OR
  // so that we get all assoc projects and the initiative
  return {
    targetEntity: 'item',
    filters: [{
        operation: "OR",
        predicates: [
          { id: initiativeId },
          predicates
        ]
      }]
  };
};
