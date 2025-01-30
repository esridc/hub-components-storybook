import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
import { CORNERS, DROP_SHADOWS, IMAGE_TYPES } from "../interfaces";
export default {
  title: 'Search/Gallery',
  component: 'arcgis-hub-gallery',
  argTypes: {
    api: {
      options: ['portal', 'hub'],
      control: { type: 'inline-radio' }
    },
    corners: {
      options: Object.values(CORNERS),
      control: { type: 'inline-radio' }
    },
    imageType: {
      options: Object.values(IMAGE_TYPES),
      control: { type: 'inline-radio' }
    },
    layoutOptions: {
      options: ['grid', 'list', 'compact', 'map', 'table', 'calendar'],
      control: { type: 'inline-check' }
    },
    linkTarget: {
      options: ["self", "siteRelative", "workspaceRelative", "none", "event"],
      control: { type: 'inline-radio' }
    },
    shadow: {
      options: Object.values(DROP_SHADOWS),
      control: { type: 'inline-radio' }
    },
    selectionMode: {
      options: ['none', 'single', 'multiple'],
      control: { type: 'inline-radio' }
    },
  },
  decorators: [
    withCenteredLayout('75%'),
    withRenderCallback('arcgis-hub-gallery', ($el, { args }) => {
      args.query && ($el.query = args.query);
      args.facets && ($el.facets = args.facets);
      args.sortByIds && ($el.sortByIds = args.sortByIds);
      args.state && ($el.state = args.state);
      args.viewModels && ($el.viewModels = args.viewModels);
      args.bulkActions && ($el.bulkActions = args.bulkActions);
      args.state && ($el.state = args.state);
      args.additionalFacet && ($el.additionalFacet = args.additionalFacet);
      args.gallerySelection && ($el.gallerySelection = args.gallerySelection);
      args.cardActionLinks && ($el.cardActionLinks = args.cardActionLinks);
      args.callback && ($el.callback = args.callback);
      args.sortOptions && ($el.sortOptions = args.sortOptions);
      args.galleryMapSettings && ($el.galleryMapSettings = args.galleryMapSettings);
      args.layoutOptions && ($el.layoutOptions = args.layoutOptions);
    })
  ],
  parameters: {
    actions: {
      handles: ['arcgisHubGallerySelect', 'arcgisHubGalleryQueryChange', 'arcgisHubGalleryStateChange', 'arcgisHubGalleryResultsChange', 'arcgisHubGalleryAction', 'arcgisHubContentGalleryFacetModalClose', 'arcgisHubGalleryBulkAction'],
    }
  }
};
/////////////////////////////////////
// Helpers for Generating Stories
/////////////////////////////////////
/**
 * Factory function that all stories should be instantiated with.
 *
 * The story function returned can interpolate in all simple (i.e.,
 * non-object) props. It will also be unnamed and will not have
 * arguments applied.
 *
 * **Note**: As new simple props are added, interpolate them in here.
 *
 * @returns A unnamed story without arguments applied
 */
function createGenericStory() {
  const story = args => {
    let template = ` <arcgis-hub-gallery
      api=${args.api}
      base-url="${args.baseUrl}"
      ${args.cardTitleTag ? 'card-title-tag=' + args.cardTitleTag : ''}
      corners="${args.corners}"
      disable-telemetry="${args.disableTelemetry}"
      gallery-type="${args.galleryType}"
      image-type="${args.imageType}"
      include="${args.include}"
      layout="${args.layout}"
      layoutOptions="${args.layoutOptions}"
      lazy="${args.lazy}"
      limit="${args.limit}"
      link-button-style="${args.linkButtonStyle}"
      link-button-text="${args.linkButtonText}"
      link-target="${args.linkTarget}"
      gallery-map-settings="${args.galleryMapSettings}"
      mobile-view="${args.mobileView}"
      new-tab="${args.newTab}"
      selection-mode="${args.selectionMode}"
      shadow="${args.shadow}"
      show-additional-info="${args.showAdditionalInfo}"
      show-back-to-top-btn="${args.showBackToTopBtn}"
      show-badges="${args.showBadges}"
      show-chips="${args.showChips}"
      show-empty-state="${args.showEmptyState}"
      show-facet-modal="${args.showFacetModal}"
      show-facets="${args.showFacets}"
      show-layout-switcher="${args.showLayoutSwitcher}"
      show-link-button="${args.showLinkButton}"
      show-more-results-btn="${args.showMoreResultsBtn}"
      show-owner="${args.showOwner}"
      show-results-count="${args.showResultsCount}"
      show-results="${args.showResults}"
      show-search="${args.showSearch}"
      show-sort="${args.showSort}"
      show-thumbnail="${args.showThumbnail}"
      show-type="${args.showType}"
      sort-field="${args.sortField}"
      sort-order="${args.sortOrder}"
      term="${args.term}"
    >`;
    // If slot content is provided, render it here
    const slotValues = [
      args.collectionSelectSlot,
      args.clickActionsSlot,
      args.noResultsActionSlot,
      args.searchErrorActionSlot,
      args.loadingScreenSlot,
    ];
    slotValues.forEach(slot => slot && (template += slot));
    template += `</arcgis-hub-gallery>`;
    return template;
  };
  return story;
}
/**
 * Create a named story with arguments applied for search scenarios.
 * Sets common properties needed for search scenarios, while allowing
 * for overrides.
 *
 * Requires a formal query object in order to function.
 *
 * @param name The name that should be applied to the story
 * @param query IQuery to base searches on
 * @param facets Facets that should be displayed. Pass in null if unneeded.
 * @param overrides Any other property overrides for the story
 * @returns A named search story
 */
function createSearchStory(name, query, facets, overrides) {
  // last updated as a part of https://devtopia.esri.com/dc/hub/issues/9079
  const baseArgs = {
    api: 'portal',
    baseUrl: '',
    bulkActions: {
      position: 'bottom',
      actions: [
        {
          name: 'action1',
          text: 'Action one',
          icon: 'link'
        },
        {
          name: 'action2',
          args: {
            arg1: 'arg1'
          },
          text: 'Action two',
          icon: 'user'
        }
      ]
    },
    cardTitleTag: '',
    corners: CORNERS.round,
    disableTelemetry: false,
    galleryType: '',
    imageType: IMAGE_TYPES.thumbnail,
    include: '',
    layout: 'grid',
    layoutOptions: ['grid', 'list', 'compact', 'table', 'map'],
    lazy: false,
    limit: 9,
    linkButtonStyle: '',
    linkButtonText: '',
    linkTarget: 'self',
    galleryMapSettings: { extent: 'default' },
    matchRecent: false,
    matchSearch: false,
    mobileView: false,
    newTab: false,
    portal: "https://qa-pre-a-hub.mapsqa.arcgis.com",
    term: '',
    selectionMode: 'multiple',
    shadow: DROP_SHADOWS.medium,
    showAdditionalInfo: true,
    showBackToTopBtn: true,
    showBadges: false,
    showChips: facets !== null,
    showEmptyState: true,
    showFacetModal: false,
    showFacets: facets !== null,
    showLayoutSwitcher: true,
    showLinkButton: false,
    showMoreResultsBtn: true,
    showOwner: true,
    showResults: true,
    showResultsCount: true,
    showSearch: true,
    showSelection: false,
    showSort: true,
    showThumbnail: true,
    showType: true,
    sortByIds: [],
    sortField: 'modified',
    sortOrder: "asc",
  };
  const story = createGenericStory();
  story.args = Object.assign(Object.assign(Object.assign({}, baseArgs), { query,
    facets, state: {}, additionalFacet: undefined, gallerySelection: undefined, cardActionLinks: [], callback: undefined, sortOptions: undefined }), overrides);
  story.storyName = name;
  return story;
}
/**
 * Create a named story with arguments applied for display-only scenarios.
 * Disables properties not needed for display-only scenarios, while allowing
 * for overrides.
 *
 * Requires a galleryType and term in order to function. If an IQuery is
 * needed for a more complex scenario, pass in null for galleryType and term
 * and provide a query in the `overrides` hash.
 *
 * @param name The name that should be applied to the story
 * @param galleryType query to base searches on
 * @param term Facets that should be displayed. Pass in null if unneeded.
 * @param overrides Any other property overrides for the story
 * @returns A named search story
 */
function createDisplayStory(name, galleryType, term, overrides) {
  // last updated as a part of https://devtopia.esri.com/dc/hub/issues/9079
  const baseArgs = {
    api: 'portal',
    baseUrl: '',
    cardTitleTag: '',
    corners: CORNERS.round,
    disableTelemetry: false,
    imageType: IMAGE_TYPES.thumbnail,
    include: '',
    layout: "grid",
    layoutOptions: ['grid', 'list', 'compact', 'table', 'map'],
    lazy: false,
    limit: 9,
    linkButtonStyle: '',
    linkButtonText: '',
    linkTarget: 'self',
    galleryMapSettings: { extent: 'default' },
    matchRecent: false,
    matchSearch: false,
    mobileView: false,
    newTab: false,
    portal: "https://qa-pre-a-hub.mapsqa.arcgis.com",
    selectionMode: 'none',
    shadow: DROP_SHADOWS.medium,
    showAdditionalInfo: false,
    showBackToTopBtn: false,
    showBadges: false,
    showChips: true,
    showEmptyState: false,
    showFacetModal: false,
    showFacets: false,
    showLayoutSwitcher: false,
    showLinkButton: false,
    showMoreResultsBtn: false,
    showOwner: true,
    showResults: true,
    showResultsCount: false,
    showSearch: false,
    showSelection: false,
    showSort: false,
    showThumbnail: true,
    showType: true,
    sortByIds: [],
    sortField: '',
    sortOrder: '',
  };
  const story = createGenericStory();
  story.args = Object.assign(Object.assign(Object.assign({}, baseArgs), { galleryType: galleryType || '', term: term || '', state: {}, additionalFacet: undefined, gallerySelection: undefined, cardActionLinks: [], callback: undefined, sortOptions: undefined }), overrides);
  story.storyName = name;
  return story;
}
/**
 * Create a named story with arguments applied for search scenarios.
 * Sets common properties needed for search scenarios, while allowing
 * for overrides.
 *
 * Requires a formal query object in order to function.
 *
 * @param name The name that should be applied to the story
 * @param query IQuery to base searches on
 * @param facets Facets that should be displayed. Pass in null if unneeded.
 * @param overrides Any other property overrides for the story
 * @returns A named search story
 */
function createMapStory(name, query, facets, overrides) {
  // last updated as a part of https://devtopia.esri.com/dc/hub/issues/9079
  const baseArgs = {
    api: 'portal',
    baseUrl: '',
    bulkActions: {
      position: 'bottom',
      actions: [
        {
          name: 'action1',
          text: 'Action one',
          icon: 'link'
        },
        {
          name: 'action2',
          args: {
            arg1: 'arg1'
          },
          text: 'Action two',
          icon: 'user'
        }
      ]
    },
    cardTitleTag: '',
    corners: CORNERS.round,
    disableTelemetry: false,
    galleryType: '',
    imageType: IMAGE_TYPES.thumbnail,
    include: '',
    layout: 'map',
    layoutOptions: ['grid', 'list', 'compact', 'table', 'map'],
    lazy: false,
    limit: 9,
    linkButtonStyle: '',
    linkButtonText: '',
    linkTarget: 'self',
    galleryMapSettings: { extent: 'default' },
    matchRecent: false,
    matchSearch: false,
    mobileView: false,
    newTab: false,
    portal: "https://qa-pre-a-hub.mapsqa.arcgis.com",
    term: '',
    selectionMode: 'multiple',
    shadow: DROP_SHADOWS.medium,
    showAdditionalInfo: true,
    showBackToTopBtn: true,
    showBadges: false,
    showChips: facets !== null,
    showEmptyState: true,
    showFacetModal: false,
    showFacets: facets !== null,
    showLayoutSwitcher: true,
    showLinkButton: false,
    showMoreResultsBtn: true,
    showOwner: true,
    showResults: true,
    showResultsCount: true,
    showSearch: true,
    showSelection: false,
    showSort: true,
    showThumbnail: true,
    showType: true,
    sortByIds: [],
    sortField: 'modified',
    sortOrder: "asc",
  };
  const story = createGenericStory();
  story.args = Object.assign(Object.assign(Object.assign({}, baseArgs), { query,
    facets, state: {}, additionalFacet: undefined, gallerySelection: undefined, cardActionLinks: [], callback: undefined, sortOptions: undefined }), overrides);
  story.storyName = name;
  return story;
}
/////////////////////////
// Story Declarations
/////////////////////////
const itemSearchQuery = {
  targetEntity: 'item',
  filters: [
    {
      predicates: [
        {
          term: 'streets'
        }
      ]
    }
  ]
};
const itemSearchFacets = [
  // Map facet
  {
    label: 'Location',
    key: 'bbox',
    display: 'map',
    state: 'open',
    field: 'bbox',
    tooltip: 'testing 123',
    value: null,
    extent: {
      xmin: -75,
      ymin: -40,
      xmax: 75,
      ymax: 40,
    }
  },
  // Statically Defined, Multi-Select
  {
    label: "Types",
    key: "types",
    display: "multi-select",
    pageSize: 4,
    operation: "OR",
    options: [
      {
        label: "Services",
        key: "services",
        selected: true,
        predicates: [{
            type: ["Feature Service", "Map Service"]
          }]
      },
      {
        label: "Apps",
        key: "apps",
        selected: false,
        predicates: [{
            type: {
              any: [
                "Code Sample",
                "Web Mapping Application",
                "Mobile Application",
                "Application",
                "Desktop Application Template",
                "Desktop Application",
                "Operation View",
                "Dashboard",
                "Operations Dashboard Extension",
                "Workforce Project",
                "Insights Workbook",
                "Insights Page",
                "Insights Model",
                "Hub Page",
                "Hub Initiative",
                "Hub Site Application",
                "StoryMap",
                "Web Experience",
                "Web Experience Template",
                "Form",
              ],
              not: [
                "Code Attachment",
                "Featured Items",
                "Symbol Set",
                "Color Set",
                "Windows Viewer Add In",
                "Windows Viewer Configuration",
                "Map Area",
                "Indoors Map Configuration",
              ],
            },
            typekeywords: {
              not: ["MapAreaPackage", "SMX"],
            },
          }]
      },
      {
        label: "Dashboards",
        key: "dashboards",
        selected: false,
        predicates: [{
            type: "Dashboard",
            typekeywords: {
              any: ["Dashboard"],
              not: ["ArcGIS Operation View", "Add In", "Extension"],
            },
          }]
      },
      {
        label: "Documents",
        key: "documents",
        selected: false,
        predicates: [{
            typekeywords: {
              any: ["Document"],
              not: ["MapAreaPackage", "SMX"],
            },
            type: {
              any: [
                "Image",
                "Layout",
                "Desktop Style",
                "Project Template",
                "Report Template",
                "Pro Report",
                "Statistical Data Collection",
                "360 VR Experience",
                "netCDF",
                "PDF",
                "CSV",
                "Administrative Report",
                "Raster function template",
              ],
              not: [
                "Image Service",
                "Explorer Document",
                "Explorer Map",
                "Globe Document",
                "Scene Document",
                "Code Attachment",
                "Featured Items",
                "Symbol Set",
                "ColorSet",
                "Windows Viewer Add In",
                "Windows Viewer Configuration",
                "Map Area",
                "Indoors Map Configuration",
              ],
            },
          }]
      },
    ]
  },
  // Dynamic Generated, Multi-Select
  {
    label: "Tags",
    key: "tags",
    field: "tags",
    aggLimit: 15,
    operation: "OR",
    display: "multi-select",
    options: []
  },
  // Dynamically Generated, Tree
  {
    label: "Categories",
    key: "categories",
    field: "categories",
    aggLimit: 15,
    operation: "OR",
    display: "tree",
    options: []
  },
  // Date-Range
  {
    label: 'Modified',
    key: 'modified',
    field: 'modified',
    display: 'date-range',
    max: new Date(),
  }
];
export const ItemSearch = createSearchStory('Item Search', itemSearchQuery, itemSearchFacets, {
  collectionSelectSlot: `
      <!-- Content in this slot is for demonstration purposes only-->
      <calcite-tabs slot="collection-select" layout="center" scale="l">
        <calcite-tab-nav slot="tab-nav">
          <calcite-tab-title tab="All" selected> All </calcite-tab-title>
          <calcite-tab-title tab="Datasets"> Datasets </calcite-tab-title>
          <calcite-tab-title tab="Documents"> Documents </calcite-tab-title>
          <calcite-tab-title tab="Apps and Maps"> Apps and Maps </calcite-tab-title>
        </calcite-tab-nav>
      </calcite-tabs>
    `,
  noResultsActionSlot: `
      <!-- Content in this slot is for demonstration purposes only -->
      <calcite-button slot="no-results-action"> View All Results </calcite-button>
    `,
  searchErrorActionSlot: `
      <!-- Content in this slot is for demonstration purposes only -->
      <calcite-button slot="search-error-action"> Try Again </calcite-button>
    `,
  loadingScreenSlot: `
      <!-- Content in this slot is for demonstration purposes only (uncomment to view) -->
      <!-- <calcite-loader slot="loading-screen" label="Gallery Loading..."/> -->
    `
});
export const ItemDisplay = createDisplayStory('Item Display', 'item', 'streets');
const groupSearchQuery = {
  targetEntity: 'group',
  filters: [
    {
      predicates: [
        {
          term: 'redlands'
        }
      ]
    }
  ]
};
const groupSearchFacets = [
  // Statically Defined, Single-Select
  {
    label: "Visibility",
    key: 'visibility',
    display: 'single-select',
    operation: 'OR',
    options: [
      {
        label: 'Private',
        key: 'private',
        selected: false,
        predicates: [{
            access: ['private', 'org']
          }]
      },
      {
        label: 'Public',
        key: 'public',
        selected: false,
        predicates: [{
            access: 'public'
          }]
      }
    ]
  }
];
export const GroupSearch = createSearchStory('Group Search', groupSearchQuery, groupSearchFacets);
export const GroupDisplay = createDisplayStory('Group Display', 'group', 'redlands');
export const MapLayout = createMapStory('Map Layout', itemSearchQuery, itemSearchFacets);
