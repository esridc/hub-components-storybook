import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Telemetry/Privacy Config',
  component: 'arcgis-privacy-config',
  decorators: [
    withRenderCallback('arcgis-privacy-config', ($el, { args }) => {
      args.config && ($el.config = args.config);
    })
  ],
  parameters: {
    actions: {
      handles: ['hubPrivacyPreferencesConfigChanged'],
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
    policyURL: ''
  },
  isLayoutEditor: false
};
export const Default = args => `
  <arcgis-privacy-config
    config="${args.config}"
    is-layout-editor="${args.isLayoutEditor}"
  ></arcgis-privacy-config>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Privacy Config';
