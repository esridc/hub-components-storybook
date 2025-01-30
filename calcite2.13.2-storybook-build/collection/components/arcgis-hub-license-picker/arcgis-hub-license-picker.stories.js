import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Metadata/License Picker',
  component: 'arcgis-hub-license-picker',
  decorators: [withCenteredLayout('30%')],
};
const defaultArgs = {
  licenseInfo: "CC BY",
};
export const Default = (args) => `
  <arcgis-hub-license-picker license-info="${args.licenseInfo}" />
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'License Picker';
