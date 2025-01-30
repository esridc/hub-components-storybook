export const scenario1 = [{
  title: "Catalog with no scopes + no collections",
  schemaVersion: 1
}]

export const scenario2 = [{
  title: "Catalog with empty scopes + no collections",
  schemaVersion: 1,
  scopes: {
    item: {
      targetEntity: "item",
      filters: [
        { predicates: [] }
      ]
    },
    event: {
      targetEntity: "event",
      filters: [
        { predicates: [] }
      ]
    },
  }
}]

export const scenario3 = [
  {
    title: "Catalog with no scopes + empty collections",
    schemaVersion: 1,
    collections: [
      {
        label: "Items",
        key: "collection_123",
        targetEntity: "item",
        scope: {
          targetEntity: "item",
          filters: [
            { predicates: [] }
          ]
        },
      },
      {
        label: "Events",
        key: "collection_456",
        targetEntity: "event",
        scope: {
          targetEntity: "event",
          filters: [
            { predicates: [] }
          ]
        },
      },
    ]
  }
];

export const scenario4 = [
  {
    title: "Catalog with empty scopes + empty collections",
    schemaVersion: 1,
    scopes: {
      item: {
        targetEntity: "item",
        filters: [
          { predicates: [] }
        ]
      },
      event: {
        targetEntity: "event",
        filters: [
          { predicates: [] }
        ]
      }
    },
    collections: [
      {
        label: "Items",
        key: "collection_123",
        targetEntity: "item",
        scope: {
          targetEntity: "item",
          filters: [
            { predicates: [] }
          ]
        },
      },
      {
        label: "Events",
        key: "collection_456",
        targetEntity: "event",
        scope: {
          targetEntity: "event",
          filters: [
            { predicates: [] }
          ]
        },
      },
    ]
  }
];

export const scenario5 = [{
  title: "Catalog with scopes + no collections",
  schemaVersion: 1,
  scopes: {
    item: {
      targetEntity: "item",
      filters: [
        {
          predicates: [
            { owner: "paige_pa" }
          ]
        }
      ]
    },
    event: {
      targetEntity: "event",
      filters: [
        {
          predicates: [
            // note: this is paige_pa's id
            { owner: "0326236361294abfa5fdcca705a081e6" }
          ]
        }
      ]
    }
  }
}]

export const scenario6 = [{
  title: "Catalog with no scopes + collections",
  schemaVersion: 1,
  collections: [
    {
      label: "Sites",
      key: "sites",
      targetEntity: "item",
      scope: {
        targetEntity: "item",
        filters: [{ predicates: [{ type: "$site" }] }]
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
      label: "Events",
      key: "events",
      targetEntity: "event",
      include: [],
      scope: {
        targetEntity: "event",
        filters: [{ predicates: [] }]
      }
    },
  ]
}]

export const scenario7 = [{
  title: "Catalog with scopes + collections",
  schemaVersion: 1,
  scopes: {
    item: {
      targetEntity: "item",
      filters: [
        {
          predicates: [
            { owner: "paige_pa" }
          ]
        }
      ]
    },
    event: {
      targetEntity: "event",
      filters: [
        {
          predicates: [
            // note: this is paige_pa's id
            { owner: "0326236361294abfa5fdcca705a081e6" }
          ]
        }
      ]
    }
  },
  collections: [
    {
      label: "Sites",
      key: "sites",
      targetEntity: "item",
      scope: {
        targetEntity: "item",
        filters: [{ predicates: [{ type: "$site" }] }]
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
      label: "Events",
      key: "events",
      targetEntity: "event",
      include: [],
      scope: {
        targetEntity: "event",
        filters: [{ predicates: [] }]
      }
    },
  ]
}]

export const facets = [
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
        label: "Organization",
        key: "org",
        selected: false,
        predicates: [{
          access: "org",
        }],
      },
      {
        label: "Shared",
        key: "shared",
        selected: false,
        predicates: [{
          access: "shared",
        }]
      }
    ],
  }
];
