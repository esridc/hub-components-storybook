import { withNotice } from '../../../.storybook/decorators/withNotice.js';
export default {
  title: 'Layouts/Notices',
  component: 'arcgis-hub-notice-provider',
  decorators: [withNotice('This component does not render ui. We expect one and only one instance of it to be on the page to render preconfigured modal and alert notices and catch ad-hoc ones', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-notice-provider/index.html' })],
  parameters: {
    controls: {
      include: ['place', 'autoShow'],
    }
  }
};
export const Default = () => `
  <div></div>
`;
Default.storyName = 'Hub Notice Provider';
