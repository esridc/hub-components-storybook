/** mock initiative to render in the view */
export const MOCK_ENTITY = {
  id: "parent-00a",
  type: "Hub Initiative",
  name: "Mock initiative",
  associations: {
    groupId: "group-00a",
    rules: {
      schemaVersion: 1,
      query: {
        targetEntity: "item",
        filters: [{ predicates: [{ group: "group-00a" }] }],
      },
    },
  },
  view: {
    hero: 'image',
    featuredImageUrl: "https://example.com/foo.jpg",
  },
};
/** mock results from hubSearch */
export const RESULTS = {
  results: [
    { links: { siteRelative: '/foo' } }
  ]
};
/** mock query for finding associated projects */
export const MOCK_ASSOC_PROJECTS_QUERY = {
  filters: [
    {
      operation: "AND",
      predicates: [
        {
          type: [
            "Hub Project",
          ],
          typekeywords: [
            "ref|initiative|parent-00a",
          ],
        },
      ],
    },
    {
      predicates: [
        {
          group: "group-00a",
        },
      ],
    },
  ],
  targetEntity: "item",
};
export const MOCK_INITIATIVE_QUERY = {
  filters: [
    {
      predicates: [
        {
          id: "parent-00a"
        }
      ]
    }
  ],
  targetEntity: "item",
};
export const MOCK_CONTEXT = {
  requestOptions: { getToken: () => 'cool-token' },
  featureFlags: [],
  currentUser: {
    privileges: ["portal:user:createItem"]
  },
  hubLicense: "hub-premium",
  isAuthenticated: true,
  serviceStatus: {
    portal: "online"
  },
  session: {
    portal: 'https://somewhere.arcigis.com/sharing/rest',
    token: 'token-123'
  },
};
