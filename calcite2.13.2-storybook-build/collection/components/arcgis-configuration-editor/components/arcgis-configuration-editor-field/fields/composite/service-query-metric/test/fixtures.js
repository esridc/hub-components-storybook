import { ArcGISContext } from "@esri/hub-common";
import { USER } from "../../../../../../../arcgis-hub-metric-card/test/fixtures";
export const MOCK_SERVICE_URL = "https://servicesqa.arcgis.com/T5cZDlfUaBpDnk6P/arcgis/rest/services/2019_US_coastline/FeatureServer";
export const MOCK_SERVICE_LAYER_URL = "https://servicesqa.arcgis.com/T5cZDlfUaBpDnk6P/arcgis/rest/services/2019_US_coastline/FeatureServer/0";
export const MOCK_ENTITY = {
  url: "https://servicesqa.arcgis.com/T5cZDlfUaBpDnk6P/arcgis/rest/services/2019_US_coastline/FeatureServer",
  name: "Coastline Feature Service",
  links: {
    self: "",
    siteRelative: "/maps/id",
  }
};
export const MOCK_STRING_FIELD = {
  name: "category",
  type: "esriFieldTypeString",
};
export const MOCK_LAYER = {
  fields: [MOCK_STRING_FIELD]
};
export const MOCK_SERVICE = {
  serviceDescription: "",
  hasVersionedData: false,
  supportedQueryFormats: "",
  supportsDisconnectedEditing: false,
  supportsRelationshipsResource: false,
  supportsReturnDeleteResults: false,
  maxRecordCount: 0,
  capabilities: "",
  description: "",
  copyrightText: "",
  advancedEditingCapabilities: {},
  spatialReference: {},
  initialExtent: { xmax: 0, ymax: 0, ymin: 0, xmin: 0 },
  fullExtent: { xmax: 0, ymax: 0, ymin: 0, xmin: 0 },
  allowGeometryUpdates: false,
  syncEnabled: false,
  validationSystemLayers: { validationLineErrorlayerId: 0, validationObjectErrortableId: 0, validationPointErrorlayerId: 0, validationPolygonErrorlayerId: 0 },
  extractChangesCapabilities: { supportsLayerQueries: false, supportsReturnAttachments: false, supportsReturnExtentOnly: false, supportsReturnFeature: false, supportsReturnIdsOnly: false, supportsSpatialFilter: false },
  units: "",
  syncCapabilities: { supportedSyncDataOptions: 0, supportsASync: false, supportsPerLayerSync: false, supportsPerReplicaSync: false, supportsRegisteringExistingData: false, supportsRollbackOnFailure: false, supportsSyncDirectionControl: false },
  editorTrackingInfo: { enableEditorTracking: false, enableOwnershipAccessControl: false, allowOthersToDelete: false, allowOthersToUpdate: false },
  tables: [],
  relationships: [{ id: 0, name: "", backwardPathLabel: "", forwardPathLabel: "", originForeignKey: "", originLayerId: 0, originPrimaryKey: "", destinationForeignKey: "", destinationLayerId: 0, destinationPrimaryKey: "", composite: false, relationshipTableId: 0, rules: [{ ruleID: 0, originMaximumCardinality: 0, originMinimumCardinality: 0, originSubtypeCode: 0, destinationMaximumCardinality: 0, destinationMinimumCardinality: 0, destinationSubtypeCode: 0 }], cardinality: "esriRelCardinalityOneToOne", attributed: false }],
  isLocationTrackingService: false,
  isLocationTrackingView: false,
  layers: [{ id: 0 }],
};
export const FIELDS = [
  {
    type: "esriFieldTypeString",
    name: "string"
  },
  {
    type: "esriFieldTypeInteger",
    name: "integer"
  },
  {
    type: "esriFieldTypeSmallInteger",
    name: "smallInteger",
  },
  {
    type: "esriFieldTypeDate",
    name: "date",
  },
  {
    type: "esriFieldTypeDouble",
    name: "double",
  },
  {
    type: "esriFieldTypeGUID",
    name: "guid"
  }
];
export const PORTAL_CONTEXT = new ArcGISContext({
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
    isPortal: true,
    urlKey: 'www'
  }
});
