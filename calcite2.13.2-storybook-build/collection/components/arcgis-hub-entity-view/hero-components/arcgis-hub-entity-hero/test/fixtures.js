import { HubEntityStatus } from "@esri/hub-common";
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
    ],
    showMap: true
  }
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
  }
};
