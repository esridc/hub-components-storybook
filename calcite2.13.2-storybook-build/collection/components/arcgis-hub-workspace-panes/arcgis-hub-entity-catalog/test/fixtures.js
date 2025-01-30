import { CORNERS, DROP_SHADOWS } from "../../../interfaces";
// valid item | event scope configured
export const VALID_ITEM_SCOPE = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {
    item: {
      targetEntity: "item",
      filters: [{ predicates: [{ group: ["some-id"] }] }]
    }
  },
  collections: []
};
export const VALID_ITEM_SCOPE_WITH_DISPLAY_CONFIG = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {
    item: {
      targetEntity: "item",
      filters: [{ predicates: [{ group: ["some-id"] }] }]
    }
  },
  collections: [],
  displayConfig: {
    layout: "table",
    corners: CORNERS.round,
    shadow: DROP_SHADOWS.heavy,
    showLinkButton: true,
    linkButtonStyle: "outline-fill",
    linkButtonText: "some-link-button-text",
  }
};
export const VALID_EVENT_SCOPE = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {
    event: {
      targetEntity: "event",
      filters: [{ predicates: [{ group: ["some-id"] }] }]
    }
  },
  collections: []
};
// invalid item | event scope configured (filter is incomplete)
export const INVALID_ITEM_SCOPE = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {
    item: {
      targetEntity: "item",
      filters: [{ predicates: [] }]
    }
  },
  collections: []
};
export const INVALID_EVENT_SCOPE = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {
    event: {
      targetEntity: "event",
      filters: [{ predicates: [] }]
    }
  },
  collections: []
};
// valid item-backed collection configured
export const VALID_ITEM_COLLECTION = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {},
  collections: [
    {
      label: "Projects",
      key: "projects-123",
      targetEntity: "item",
      scope: {
        targetEntity: "item",
        filters: [{ predicates: [{ type: ["Hub Project"] }] }]
      }
    }
  ]
};
// valid event-backed collection configured
export const VALID_EVENT_COLLECTION = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {},
  collections: [
    {
      label: "Upcoming events",
      key: "upcoming-events-123",
      targetEntity: "event",
      scope: {
        targetEntity: "event",
        filters: [{ predicates: [{ occurrence: "upcoming" }] }]
      }
    }
  ]
};
// invalid item-backed collection configured (collection label missing)
export const INVALID_ITEM_COLLECTION_NO_COLLECTION_LABEL = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {},
  collections: [
    {
      label: undefined,
      key: "projects-123",
      targetEntity: "item",
      scope: {
        targetEntity: "item",
        filters: [{ predicates: [{ type: ["Hub Project"] }] }]
      }
    }
  ]
};
// invalid item-backed collection configured (filter is incomplete)
export const INVALID_ITEM_COLLECTION_INCOMPLETE_FILTER = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {},
  collections: [
    {
      label: "Projects",
      key: "projects-123",
      targetEntity: "item",
      scope: {
        targetEntity: "item",
        filters: [{ predicates: [] }]
      }
    }
  ]
};
// valid item & event scope configured
export const VALID_ITEM_AND_EVENT_SCOPE = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {
    item: {
      targetEntity: "item",
      filters: [{ predicates: [{ group: ["some-id"] }] }]
    },
    event: {
      targetEntity: "event",
      filters: [{ predicates: [{ group: ["some-id"] }] }]
    }
  },
  collections: []
};
// valid item & event collections configured
export const VALID_ITEM_AND_EVENT_COLLECTIONS = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {},
  collections: [
    {
      label: "Projects",
      key: "projects-123",
      targetEntity: "item",
      scope: {
        targetEntity: "item",
        filters: [{ predicates: [{ type: ["Hub Project"] }] }]
      }
    },
    {
      label: "Upcoming events",
      key: "upcoming-events-123",
      targetEntity: "event",
      scope: {
        targetEntity: "event",
        filters: [{ predicates: [{ occurrence: "upcoming" }] }]
      }
    }
  ]
};
export const VALID_ITEM_AND_EVENT_SCOPE_AND_COLLECTIONS = {
  title: "My Catalog",
  schemaVersion: 1,
  scopes: {
    item: {
      targetEntity: "item",
      filters: [{ predicates: [{ group: ["some-id"] }] }]
    },
    event: {
      targetEntity: "event",
      filters: [{ predicates: [{ group: ["some-id"] }] }]
    }
  },
  collections: [
    {
      label: "Projects",
      key: "projects-123",
      targetEntity: "item",
      scope: {
        targetEntity: "item",
        filters: [{ predicates: [{ type: ["Hub Project"] }] }]
      }
    },
    {
      label: "Upcoming events",
      key: "upcoming-events-123",
      targetEntity: "event",
      scope: {
        targetEntity: "event",
        filters: [{ predicates: [{ occurrence: "upcoming" }] }]
      }
    }
  ]
};
export const ENTITY = {
  id: "00123",
  name: "Mock Entity",
  type: "Hub Initiative",
  associations: {
    groupId: "c148a24786ba43ac99f4fdb097cbe32b",
    "rules": {
      "schemaVersion": 1,
      "query": {
        "targetEntity": "item",
        "filters": [
          {
            "predicates": [
              {
                "group": "c148a24786ba43ac99f4fdb097cbe32b"
              }
            ]
          }
        ]
      }
    }
  }
};
