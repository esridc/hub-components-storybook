export const BASIC_SCHEMA = {
  type: 'string'
};
export const KEYWORD_SCHEMA = {
  type: 'string',
  minLength: 2
};
export const COLOR_PICKER_UI_SCHEMA = {
  type: 'Control',
  options: {
    control: 'hub-field-input-color'
  }
};
export const UI_SCHEMA_WITH_HELPER_TEXT = {
  type: 'Control',
  options: {
    helperText: {
      labelKey: 'some.label.key'
    }
  }
};
export const UI_SCHEMA_WITH_TOOLTIP = {
  type: 'Control',
  options: {
    tooltip: {
      labelKey: 'some.label.key'
    }
  }
};
export const UI_SCHEMA_WITH_INLINE_LAYOUT = {
  type: 'Control',
  options: {
    layout: 'inline-space-between'
  }
};
export const UI_SCHEMA_WITH_ERRORS_AND_SUCCESS = {
  type: 'Control',
  options: {
    messages: [
      {
        type: "ERROR",
        labelKey: 'some.label.key',
        icon: true,
        keyword: 'minLength',
      },
      {
        type: "SUCCESS",
        icon: true,
        labelKey: 'some.label.key',
      }
    ]
  }
};
export const MOCK_COLLECTIONS = [
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
];
export const MOCK_CATALOGS = [
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
    collections: MOCK_COLLECTIONS
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
    collections: MOCK_COLLECTIONS
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
    collections: MOCK_COLLECTIONS
  },
];
export const MOCK_FACETS = [
  {
    label: "Access",
    key: "access",
    display: "multi-select",
    operation: "OR",
    options: [
      {
        label: "Public",
        key: "public",
        selected: false,
        predicates: [{
            access: "public",
          }],
      },
      {
        label: "Shared",
        key: "shared",
        selected: false,
        predicates: [{
            access: "shared",
          },]
      },
      {
        label: "Org",
        key: "org",
        selected: false,
        predicates: [{
            access: "org",
          }],
      },
      {
        label: "Mine",
        key: "mine",
        selected: false,
        predicates: [{
            owner: "dbouwman_dc",
          }],
      }
    ],
  },
  {
    label: "Types",
    key: "types",
    display: "multi-select",
    pageSize: 4,
    operation: "OR",
    options: [
      {
        label: "Web Maps",
        key: "webmaps",
        selected: false,
        predicates: [{
            type: "Web Map"
          }]
      },
      {
        label: "Sites",
        key: "sites",
        selected: false,
        predicates: [{
            type: "Hub Site Application"
          }]
      },
      {
        label: "Services",
        key: "services",
        selected: false,
        predicates: [{
            type: ["Feature Service", "Map Service"]
          }]
      },
      {
        label: "Document",
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
  }
];
