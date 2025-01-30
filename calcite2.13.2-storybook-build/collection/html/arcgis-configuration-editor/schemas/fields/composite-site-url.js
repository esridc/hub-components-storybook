export const SUBTITLE = `Site URL configuration. Type in the subdomain for an existing site, ex: 'community-manager' and observe that it is invalid.`;

// start w/ existing QA site: tw-test-qa-pre-a-hub.hubqa.arcgis.com
const siteId = 'a4baa617584247b8a2a9838cb59f902b'
const subdomain = 'tw-test';
const orgUrlKey = 'qa-pre-a-hub';
const hubDomain = 'hubqa.arcgis.com';
const defaultHostname = `${subdomain}-${orgUrlKey}.${hubDomain}`;

export const SCHEMA = {
  "$async": true,
  type: 'object',
  required: [],
  properties: {
    _urlInfo: {
      type: 'object',
      isUniqueDomain: { siteId },
    },
  }
};

export const UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      type: "Section",
      label: "Site URL",
      elements: [
        {
          scope: "/properties/_urlInfo",
          type: "Control",
          options: {
            type: "Control",
            control: "hub-composite-input-site-url",
            // NOTE: this should come from the site, and if omitted
            // the component will use the authenticated user's org
            orgUrlKey,
            messages: [
              {
                type: "ERROR",
                keyword: "isUniqueDomain",
                label: 'Error: A site that uses this URL already exists.',
                icon: true,
              }
            ]
          },
        }
      ]
    },
  ]
};

export const VALUES = {
  // this is added to the values in toEditor()
  _urlInfo: {
    defaultHostname,
    subdomain,
  },
  // these exist on the site entity already
  // but are not used by this composite field
  defaultHostname,
  subdomain,
};
