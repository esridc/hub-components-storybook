import { ArcGISContext } from "@esri/hub-common";
export const STATIC_METRIC = {
  id: "surveysCompleted",
  name: "coastline",
  description: "The coastline metric",
  units: "%",
  source: {
    type: 'static-value',
    value: '12',
  },
  entityInfo: {
    id: 'siteId',
    type: 'site',
    name: 'My Site',
  }
};
export const INCORRECT_STATIC_METRIC = {
  id: "surveysCompleted",
  name: undefined,
  description: undefined,
  units: undefined,
  source: {
    type: 'static-value',
    value: undefined,
  },
  entityInfo: undefined,
};
export const SERVICE_METRIC = {
  id: 'surveysCompleted',
  source: {
    type: "service-query",
    serviceUrl: "https://servicesqa.arcgis.com/T5cZDlfUaBpDnk6P/arcgis/rest/services/hub_e2e_fixture_tc121302_simple_point_100/FeatureServer",
    layerId: 0,
    field: "quant_val",
    statistic: "count",
    where: "1=1"
  },
  entityInfo: {
    id: '1234',
    type: 'site',
    name: 'My Site'
  }
};
export const SERVICE_CARD_CONFIG = {
  cardTitle: "This is the title",
  shareable: true,
  shareableByValue: false,
  trailingText: "this is the trailing text...",
  type: "dynamic",
  sourceLink: "link",
  sourceTitle: "title",
  corners: "round",
  valueColor: "#366078",
  metricId: 'surveysCompleted',
  displayType: 'stat-card',
};
export const INCORRECT_SERVICE_METRIC = {
  id: 'surveysCompleted',
  source: {
    type: 'service-query',
    serviceUrl: undefined,
    layerId: undefined,
    field: undefined,
    statistic: undefined,
  },
  entityInfo: {
    id: '1234',
    type: 'site',
    name: 'My Site',
  }
};
export const CARD_CONFIG = {
  cardTitle: "This is the title",
  shareable: true,
  shareableByValue: false,
  trailingText: "this is the trailing text...",
  type: "static",
  sourceLink: "link",
  sourceTitle: "title",
  corners: "round",
  valueColor: "#366078",
  metricId: 'surveysCompleted',
  displayType: 'stat-card',
};
export const USER = {
  username: 'user_4',
  fullName: 'User 4',
  firstName: 'User',
  lastName: '4',
  preferredView: null,
  description: 'You may also know me as User 4.',
  email: 'user4@esri.com',
  idpUsername: null,
  favGroupId: 'c4497a77b7a0438b94e3e941a73e25cb',
  lastLogin: 1641918016000,
  mfaEnabled: false,
  storageUsage: 2514975382,
  storageQuota: 2199023255552,
  orgId: 'org_id_1',
  role: 'org_admin',
  privileges: [
    'features:user:edit',
    'portal:admin:assignToGroups',
    'portal:admin:createUpdateCapableGroup',
    'portal:admin:viewGroups',
    'portal:admin:viewUsers',
    'portal:publisher:publishFeatures',
    'portal:publisher:publishScenes',
    'portal:publisher:publishTiles',
    'portal:user:addExternalMembersToGroup',
    'portal:user:createGroup',
    'portal:user:createItem',
    'portal:user:invitePartneredCollaborationMembers',
    'portal:user:joinGroup',
    'portal:user:joinNonOrgGroup',
    'portal:user:shareGroupToOrg',
    'portal:user:shareGroupToPublic',
    'portal:user:shareToGroup',
    'portal:user:shareToOrg',
    'portal:user:shareToPublic',
    'portal:user:viewOrgGroups',
    'portal:user:viewOrgItems',
    'portal:user:viewOrgUsers',
  ],
  roleId: 'role_id_1',
  level: '2',
  disabled: false,
  tags: [],
  culture: 'en-AU',
  region: 'US',
  units: 'english',
  thumbnail: 'hub-profile-15598402608311.png',
  access: 'public',
  created: 1558412566000,
  modified: 1616690771000,
  provider: 'arcgis',
};
export const CONTEXT = new ArcGISContext({
  id: 123,
  currentUser: USER,
  portalUrl: 'https://qaext.arcgis.com/sharing/rest',
  authentication: {
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
