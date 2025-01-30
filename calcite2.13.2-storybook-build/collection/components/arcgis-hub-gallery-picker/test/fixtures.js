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
];
export const GALLERY_SELECTION = {
  channel: [],
  item: [
    "06b1b320d43542e4ae2b126ac0eee6ca"
  ],
  group: [],
  user: [],
  groupMember: [],
  event: []
};
export const CURRENT_SELECTION = {
  channel: [],
  item: [
    "06b1b320d43542e4ae2b126ac0eee6ca",
    "06b1b320d43sfasaa42e4ae32426ac0g"
  ],
  group: [],
  user: [],
  groupMember: [],
  event: [],
};
