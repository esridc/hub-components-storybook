import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Editing/Add Content',
  component: 'arcgis-hub-add-content',
  decorators: [
    withNotice(`The <code>arcgis-hub-add-content</code> is a component that facilitates adding content to a Hub. This component is difficult to represent fully in storybook. Please visit our harness.`, { text: 'Try the harness examples', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-add-content/index.html' }, undefined, { icon: "information", kind: "brand" })
  ],
};
export const Default = () => ``;
Default.args = {};
Default.storyName = 'Add Content';
