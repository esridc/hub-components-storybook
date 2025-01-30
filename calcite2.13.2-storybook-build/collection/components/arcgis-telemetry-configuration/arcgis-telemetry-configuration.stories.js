import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Telemetry/Telemetry Configuration',
  component: 'arcgis-telemetry-configuration',
  decorators: [
    withRenderCallback('arcgis-telemetry-configuration', ($el, { args }) => {
      args.configuration && ($el.configuration = args.configuration);
    }),
    withCenteredLayout()
  ]
};
const defaultArgs = {
  configuration: {
    adobeLaunch: {
      enabled: true,
      reportSuite: "devTest",
      scriptTag: "abcdejg/abcdefj/test-12303895-dev.min.js"
    },
    consentMessage: {
      enabled: true,
      text: "<p>Test Consent Message with <a href=\"https://google.com\">Link</a></p>"
    }
  },
  showArcgisOnlineDisclosure: false,
  ui: 'block'
};
export const Default = args => `
  <arcgis-telemetry-configuration
    show-arcgis-online-disclosure="${args.showArcgisOnlineDisclosure}"
    ui="${args.ui}"
  ></arcgis-telemetry-configuration>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Telemetry Configuration';
