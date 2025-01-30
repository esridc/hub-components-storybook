import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Editing/Page Migration',
  component: 'arcgis-hub-page-migration',
  decorators: [
    withNotice(`The <code>arcgis-hub-page-migration</code> is a component that facilitates migrating legacy pages stored in a site's pages hash into a site's catalog. This component is difficult to represent fully in storybook. Please visit our harness.`, { text: 'Try the harness examples', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-page-migration/index.html' }, undefined, { icon: "information", kind: "brand" })
  ],
};
export const Default = () => ``;
Default.args = {};
Default.storyName = 'Page Migration';
