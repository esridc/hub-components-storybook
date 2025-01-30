export const CATALOGS = [
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
];
export const FACETS = [
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
        label: "Projects",
        key: "projects",
        selected: false,
        predicates: [
          {
            type: "Hub Project"
          }
        ]
      },
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
        label: "Story Maps",
        key: "storymaps",
        selected: false,
        predicates: [
          {
            type: "StoryMap",
          },
          {
            type: "Web Mapping Application",
            typekeywords: "Story Map",
          }
        ]
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
