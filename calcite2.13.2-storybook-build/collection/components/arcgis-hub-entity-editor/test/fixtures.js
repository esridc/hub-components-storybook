import { ArcGISContext, HubEntityStatus } from "@esri/hub-common";
export const MOCK_ENTITY = {
  access: "shared",
  canEdit: true,
  canDelete: true,
  categories: ["Basemap imagery", "Creative maps"],
  catalog: {},
  catalogs: [],
  createdDate: new Date(1673545032000),
  createdDateSource: "item.created",
  description: "this is a project description",
  extent: [[-87.76875870296065, 41.82501713512609], [-87.74262594052858, 41.83922261453605]],
  id: "mock_id_123",
  itemControl: "admin",
  name: "Mock Project",
  orgUrlKey: "qa-pre-a-hub",
  owner: "mock_owner",
  schemaVersion: 1,
  slug: "qa-pre-a-hub|mock-project",
  status: HubEntityStatus.notStarted,
  summary: "this is a project summary",
  tags: ["tag 1", "tag 2"],
  type: "Hub Project",
  typeKeywords: ["Hub", "Hub Project", "slug|qa-pre-a-hub|mock-project"],
  updatedDate: new Date(1686171305000),
  updatedDateSource: "item.modified",
  location: {
    type: "custom",
    spatialReference: { wkid: 4326 },
    extent: [[-87.76875870296065, 41.82501713512609], [-87.74262594052858, 41.83922261453605]],
    geometries: [
      {
        spatialReference: { wkid: 4326 },
        paths: [[
            [-87.76875870296065, 41.83922261453605],
            [-87.74262594052858, 41.838630615977],
            [-87.74329314002102, 41.82504811561426],
            [-87.75974044570034, 41.82501713512609]
          ]],
        type: "polyline"
      }
    ],
  },
  view: {
    featuredImageUrl: "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/320d5995b77c4e2eae27c85faa75e1e2/resources/featuredImage.png",
    featuredContentIds: [
      "0003b14f3f1b41c8898181a64558503c",
      "2da121b858704d0e8cf1e1668d6c96ba",
      "246b43396c6749038fbe96eade69e253"
    ]
  }
};
export const GROUPS = [
  {
    id: 'group_1',
    title: 'Group 1',
    isInvitationOnly: false,
    owner: 'user_2',
    description: 'Group 1 description',
    snippet: 'Group 1 snippet',
    tags: ['Hub Group'],
    typeKeywords: [],
    phone: null,
    sortField: 'title',
    sortOrder: 'asc',
    isViewOnly: false,
    featuredItemsId: null,
    thumbnail: null,
    created: 1604076680000,
    modified: 1604076680000,
    access: 'public',
    capabilities: [],
    isFav: false,
    isReadOnly: false,
    protected: true,
    autoJoin: true,
    notificationsEnabled: false,
    provider: null,
    providerGroupName: null,
    leavingDisallowed: false,
    hiddenMembers: false,
    displaySettings: {
      itemTypes: '',
    },
    memberOrgIds: ['org_id_1'],
    properties: null,
    userMembership: {
      username: 'user_1',
      memberType: 'admin',
      applications: 0,
    },
  },
];
export const USER = {
  username: 'mock_user',
  fullName: 'Mock User',
  firstName: 'Mock',
  lastName: 'User',
  preferredView: null,
  description: 'You may also know me as Mock User.',
  email: 'mock_user@esri.com',
  orgId: 'org_id_1',
  role: 'org_admin',
  privileges: ["portal:user:shareToGroup"],
  roleId: 'role_id_1',
  access: 'public',
  created: 1558412566000,
  modified: 1616690771000,
  provider: 'arcgis',
  groups: GROUPS
};
export const CONTEXT = new ArcGISContext({
  id: 123,
  currentUser: USER,
  portalUrl: 'https://qaext.arcgis.com/sharing/rest',
  authentication: {
    portal: 'https://somewhere.arcigis.com/sharing/rest',
    token: 'token-123'
  },
  portalSelf: {
    id: '123',
    name: 'My org',
    isPortal: false,
    urlKey: 'www'
  },
  serviceStatus: {
    portal: "online",
    discussions: "online",
    events: "online",
    metrics: "online",
    notifications: "online",
    "hub-search": "online",
    domains: "online",
    "hub-downloads": "online",
  }
});
