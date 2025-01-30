import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Telemetry/ArcGIS Privacy',
  component: 'arcgis-privacy',
  decorators: [
    withRenderCallback('arcgis-privacy', ($el, { args }) => {
      args.config && ($el.config = args.config);
      args.userSettings && ($el.userSettings = args.userSettings);
      args.orgInfo && ($el.orgInfo = args.orgInfo);
    })
  ],
  parameters: {
    actions: {
      handles: ['hubUserPrivacySettingsChanged'],
    },
    layout: 'centered'
  }
};
const defaultArgs = {
  config: {
    allowPrivacyConfig: true,
    blocking: false,
    disclaimer: [
      { text: 'This is the consent notice' }
    ],
    policyURL: 'https://foobar.com/privacy'
  },
  anonTrackingConfigured: true,
  thirdPartyTrackingConfigured: true,
  userSettings: {
    accepted: false,
    performance: false,
    targeting: false,
    functional: false
  },
  orgInfo: {
    eueiEnabled: true,
    orgName: 'orgName'
  },
  hideManageButton: false
};
export const Default = args => `
  <arcgis-privacy
  esri-tracking-enabled="${args.anonTrackingConfigured}"
  third-party-tracking-enabled="${args.thirdPartyTrackingConfigured}"
  hide-manage-button="${args.hideManageButton}"
  ></arcgis-privacy>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'ArcGIS Privacy';
