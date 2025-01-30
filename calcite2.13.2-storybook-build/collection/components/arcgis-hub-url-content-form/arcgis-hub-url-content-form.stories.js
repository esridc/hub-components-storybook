import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Metadata/URL Content Form',
  component: 'arcgis-hub-url-content-form',
  decorators: [withCenteredLayout('30%')],
};
export const Default = () => `
  <arcgis-hub-url-content-form />
`;
Default.storyName = 'URL Content Form';
