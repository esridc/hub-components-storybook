export const MOCK_CONTEXT = {
  requestOptions: { getToken: () => 'cool-token' },
  featureFlags: [],
  currentUser: {
    privileges: [
      "portal:user:createItem"
    ]
  },
  hubLicense: "hub-premium",
  isAuthenticated: true,
  portal: {
    portalProperties: {
      openData: { enabled: true }
    }
  },
  serviceStatus: {
    portal: "online"
  }
};
export const CREATE_GROUP_USER = {
  privileges: [
    "portal:admin:createLeavingDisallowedGroup",
    "portal:admin:createUpdateCapableGroup",
    "opendata:user:designateGroup",
    "portal:user:createItem",
    "portal:user:shareGroupToOrg",
    "portal:user:shareGroupToPublic",
    "portal:user:shareToPublic",
  ]
};
