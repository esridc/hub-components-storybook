import { bBoxToExtent } from "@esri/hub-common";
/**
 * max number of associated initiatives to render on the project view
 * before revealing the overflow pattern ("Explore associations" button
 * + "Initiatives" tab with full gallery of associated initiatives)
 */
export const FEATURED_ASSOCIATED_INITIATIVES_MAX = 5;
/**
 * Callback fn to pass into the associated initiatives gallery
 * to modify the card view models
 *
 * @param model - card view model
 * @param _layout - card layout
 * @param _context - contextual portal & auth information
 * @param _result - raw search result
 * @returns {IHubCardViewModel}
 */
export const associatedInitiativesGalleryCallback = (model, _layout, _context, _result) => {
  // 1. set the summary to undefined so that it doesn't render
  // beneath the title
  model.summary = undefined;
  return model;
};
/**
 * Return the facets for the Initiative associations gallery
 * (on the Initiatives tab)
 * @param intl - component intl
 * @returns {IFacet[]}
 */
export const getAssociatedInitiativesFacets = (intl) => {
  return [
    {
      label: intl.t('facets.location.label'),
      tooltip: intl.t('facets.location.tooltip'),
      key: 'bbox',
      display: 'map',
      field: 'bbox',
      value: null,
      extent: bBoxToExtent([[-180, -90], [180, 90]])
    },
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
      label: intl.t("facets.tags"),
      key: 'tags',
      field: 'tags',
      operation: 'OR',
      display: 'multi-select',
      options: []
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
