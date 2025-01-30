import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Search/Gallery Picker',
  component: 'arcgis-hub-gallery-picker',
  decorators: [
    withRenderCallback('arcgis-hub-gallery-picker', ($el, { args }) => {
      $el.catalogs = args.catalogs;
      $el.facets = args.facets;
      $el.gallerySelection = args.currentSelection;
      $el.showSelection = args.showSelection;
    })
  ],
  argTypes: {
    catalogs: {
      control: { type: 'object' },
    },
    facets: {
      control: { type: 'object' },
    }
  }
};
const defaultArgs = {
  modalTitle: 'Gallery Picker',
  open: true,
  sourceLabel: '',
  catalogs: [
    {
      schemaVersion: 1,
      title: 'Esri',
      scopes: {
        item: {
          targetEntity: "item",
          filters: [
            {
              predicates: [
                {
                  owner: "esri"
                }
              ]
            }
          ]
        }
      },
      collections: [
        {
          label: "Applications",
          key: "applications",
          targetEntity: "item",
          include: [],
          scope: {
            targetEntity: "item",
            filters: [
              {
                operation: "OR",
                predicates: [
                  {
                    type: {
                      any: ["Web Mapping Application", "Application", "Insights", "Web Experience"],
                      not: ["Insights Theme", "Insights Model"]
                    },
                    typekeywords: {
                      not: ["hubSite", "Story Map"]
                    }
                  },
                  {
                    type: "Web Mapping Experience",
                    typekeywords: "EXB Experience"
                  }
                ]
              }
            ]
          }
        },
        {
          label: "Documents",
          key: "docs",
          targetEntity: "item",
          include: [],
          scope: {
            targetEntity: "item",
            filters: [{ predicates: [{ type: "$document" }] }]
          }
        },
        {
          label: "Maps",
          key: "maps",
          targetEntity: "item",
          include: [],
          scope: {
            targetEntity: "item",
            filters: [{ predicates: [{ type: "$webmap" }] }]
          }
        },
      ]
    },
    {
      schemaVersion: 1,
      title: 'Living Atlas',
      scopes: {
        item: {
          targetEntity: "item",
          filters: [
            {
              predicates: [
                {
                  owner: "esri_livingatlas"
                }
              ]
            }
          ]
        }
      },
      collections: [
        {
          label: "Applications",
          key: "applications",
          targetEntity: "item",
          include: [],
          scope: {
            targetEntity: "item",
            filters: [
              {
                operation: "OR",
                predicates: [
                  {
                    type: {
                      any: ["Web Mapping Application", "Application", "Insights", "Web Experience"],
                      not: ["Insights Theme", "Insights Model"]
                    },
                    typekeywords: {
                      not: ["hubSite", "Story Map"]
                    }
                  },
                  {
                    type: "Web Mapping Experience",
                    typekeywords: "EXB Experience"
                  }
                ]
              }
            ]
          }
        },
        {
          label: "Documents",
          key: "docs",
          targetEntity: "item",
          include: [],
          scope: {
            targetEntity: "item",
            filters: [{ predicates: [{ type: "$document" }] }]
          }
        },
        {
          label: "Maps",
          key: "maps",
          targetEntity: "item",
          include: [],
          scope: {
            targetEntity: "item",
            filters: [{ predicates: [{ type: "$webmap" }] }]
          }
        },
      ]
    },
    {
      schemaVersion: 1,
      title: 'World (Public)',
      scopes: {
        item: {
          targetEntity: "item",
          filters: [
            {
              predicates: [
                {
                  access: "public"
                }
              ]
            }
          ]
        }
      },
      collections: [
        {
          label: "Applications",
          key: "applications",
          targetEntity: "item",
          include: [],
          scope: {
            targetEntity: "item",
            filters: [
              {
                operation: "OR",
                predicates: [
                  {
                    type: {
                      any: ["Web Mapping Application", "Application", "Insights", "Web Experience"],
                      not: ["Insights Theme", "Insights Model"]
                    },
                    typekeywords: {
                      not: ["hubSite", "Story Map"]
                    }
                  },
                  {
                    type: "Web Mapping Experience",
                    typekeywords: "EXB Experience"
                  }
                ]
              }
            ]
          }
        },
        {
          label: "Documents",
          key: "docs",
          targetEntity: "item",
          include: [],
          scope: {
            targetEntity: "item",
            filters: [{ predicates: [{ type: "$document" }] }]
          }
        },
        {
          label: "Maps",
          key: "maps",
          targetEntity: "item",
          include: [],
          scope: {
            targetEntity: "item",
            filters: [{ predicates: [{ type: "$webmap" }] }]
          }
        },
      ]
    }
  ],
  facets: [
    {
      label: 'Type',
      key: 'type',
      display: 'multi-select',
      field: 'type',
      options: [],
      operation: 'OR',
      aggLimit: 100,
    },
    {
      label: 'Sharing',
      key: 'access',
      display: 'multi-select',
      field: 'access',
      options: [],
      operation: 'OR',
    }
  ],
  currentSelection: {
    item: [
      "06b1b320d43542e4ae2b126ac0eee6ca"
    ],
    group: [],
    user: [],
    groupMember: [],
    event: []
  },
  showSelection: false,
  showSearch: true,
  showThumbnail: false,
  limit: 5
};
export const Default = (args) => `
  <arcgis-hub-gallery-picker
    catalogs="${args.catalogs}"
    facets="${args.facets}"
    modal-title="${args.modalTitle}"
    open="${args.open}"
    gallery-selection="${args.currentSelection}"
    show-selection="${args.showSelection}"
    show-search="${args.showSearch}"
    show-thumbnail="${args.showThumbnail}"
    source-label="${args.sourceLabel}"
    limit="${args.limit}"
  ></arcgis-hub-gallery-picker>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Gallery Picker';
