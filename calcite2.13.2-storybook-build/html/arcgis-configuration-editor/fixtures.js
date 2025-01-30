export const EXTENT = {
  xmin: -88,
  ymin: 39.1,
  xmax: -87.10000000000001,
  ymax: 40,
  type: "extent",
  spatialReference: {
    wkid: 4326
  }
}

export const LOCATION_PICKER_OPTIONS = [
  {
    label: "No Location",
    location: { type: "none" }
  },
  {
    label: "Organization's Extent",
    description: "City of X",
    selected: true,
    location: {
      type: "org",
      extent: [[-88, 39.1], [-87.10000000000001, 40]],
      spatialReference: {
        wkid: 4326
      }
    }
  },
  {
    label: "Custom",
    description: "Draw one or more locations",
    location: {
      type: "custom",
      extent: [[-88, 39.1], [-87.10000000000001, 40]],
      spatialReference: {
        wkid: 4326
      }
    }
  }
]

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
      {
        targetEntity: "item",
        key: "recommendedTemplates",
        label: `Solutions`,
        scope: {
          targetEntity: "item",
          filters: [
            {
              predicates: [
                {
                  typekeywords: {
                    not: ["hubSolutionType|hubSiteApplication"]
                  }
                },
              ]
            },
            {
              predicates: [
                {
                  typekeywords: {
                    any: [
                      "hubSolutionType|storymap",
                      "hubSolutionType|webmap",
                      "hubSolutionType|dashboard",
                      "hubSolutionType|hubpage",
                      "hubSolutionType|webexperience",
                      "hubSolutionType|webmappingapplication",
                      "hubSolutionType|form",
                      "hubSolutionType|featureservice",
                      "Template"
                    ]
                  }
                },
              ],
              operation: "OR",
            },
            {
              predicates: [
                {
                  typekeywords: ["hubSolutionTemplate"],
                },
                {
                  type: "Solution",
                  typekeywords: ["Template"]
                }
              ],
              operation: "OR",
            }
          ]
        }
      }
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
      {
        targetEntity: "item",
        key: "recommendedTemplates",
        label: `Solutions`,
        scope: {
          targetEntity: "item",
          filters: [
            {
              predicates: [
                {
                  typekeywords: {
                    not: ["hubSolutionType|hubSiteApplication"]
                  }
                },
              ]
            },
            {
              predicates: [
                {
                  typekeywords: {
                    any: [
                      "hubSolutionType|storymap",
                      "hubSolutionType|webmap",
                      "hubSolutionType|dashboard",
                      "hubSolutionType|hubpage",
                      "hubSolutionType|webexperience",
                      "hubSolutionType|webmappingapplication",
                      "hubSolutionType|form",
                      "hubSolutionType|featureservice",
                      "Template"
                    ]
                  }
                },
              ],
              operation: "OR",
            },
            {
              predicates: [
                {
                  typekeywords: ["hubSolutionTemplate"],
                },
                {
                  type: "Solution",
                  typekeywords: ["Template"]
                }
              ],
              operation: "OR",
            }
          ]
        }
      }
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
      {
        targetEntity: "item",
        key: "solutions",
        label: `Solutions`,
        scope: {
          targetEntity: "item",
          filters: [
            {
              predicates: [
                {
                  typekeywords: {
                    not: ["hubSolutionType|hubSiteApplication"]
                  }
                },
              ]
            },
            {
              predicates: [
                {
                  typekeywords: {
                    any: [
                      "hubSolutionType|storymap",
                      "hubSolutionType|webmap",
                      "hubSolutionType|dashboard",
                      "hubSolutionType|hubpage",
                      "hubSolutionType|webexperience",
                      "hubSolutionType|webmappingapplication",
                      "hubSolutionType|form",
                      "hubSolutionType|featureservice",
                      "Template"
                    ]
                  }
                },
              ],
              operation: "OR",
            },
            {
              predicates: [
                {
                  typekeywords: ["hubSolutionTemplate"],
                },
                {
                  type: "Solution",
                  typekeywords: ["Template"]
                }
              ],
              operation: "OR",
            }
          ]
        }
      }
    ]
  }
]

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

export const GROUP_CATALOGS = [
  {
    schemaVersion: 1,
    title: 'View Groups',
    scopes: {
      group: {
        targetEntity: "group",
        filters: [
          {
            predicates: [
              { capabilities: { not: [ "updateitemcontrol" ] } }
            ]
          }
        ]
      }
    },
    collections: [
      {
        targetEntity: "group",
        key: "viewGroups",
        label: "viewGroups",
        scope: {
          targetEntity: "group",
          filters: [
            {
              predicates: [ { q: "*" } ]
            }
          ]
        }
      }
    ]
  }
]

export const GROUP_FACETS = [
  {
    label: "From",
    key: "from",
    display: "single-select",
    operation: "OR",
    options: [
      {
        label: "My groups",
        key: "My groups",
        selected: true,
        predicates: [ { owner: "paige_pa" } ]
      },
      {
        label: "My organization",
        key: "My organization",
        selected: false,
        predicates: [ { orgid: "Xj56SBi2udA78cC9" } ]
      },
    ]
  }
]

