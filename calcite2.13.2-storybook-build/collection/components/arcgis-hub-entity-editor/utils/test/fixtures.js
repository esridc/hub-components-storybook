export const ENTITY_CREATE_EDITOR_VALUES = {
  name: "Mock Entity",
  access: "shared",
  summary: "this is an entity summary",
  groups: ["group_1"],
  location: {
    type: "custom",
    spatialReference: { wkid: 4326 },
    extent: [[-87.76875870296065, 41.82501713512609], [-87.74262594052858, 41.83922261453605]],
    geometries: [{
        spatialReference: { wkid: 4326 },
        x: -90.14573652290936,
        y: 40.48091834369439,
        type: "point"
      }]
  }
};
export const ENTITY_EDIT_EDITOR_VALUES = {
  id: "mock_id_123",
  owner: "mock_owner",
  orgUrlKey: 'mock-url-key',
  location: {
    type: "custom",
    spatialReference: { wkid: 4326 },
    extent: [[-87.76875870296065, 41.82501713512609], [-87.74262594052858, 41.83922261453605]],
    geometries: [{
        spatialReference: { wkid: 4326 },
        x: -90.14573652290936,
        y: 40.48091834369439,
        type: "point"
      }]
  },
  view: {
    featuredImage: {
      blob: {},
      base64: "mock-base64",
      fileName: "mock-featured-image",
      format: "png"
    }
  }
};
