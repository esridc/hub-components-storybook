import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Entity Views/Hub Entity View',
  component: 'arcgis-hub-entity-view',
  decorators: [
    withNotice('Entity View needs to be passed an IHubEntity so we can not render it here.', {
      text: 'Try the harness example',
      href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-entity-view-wrapper/index.html'
    }, undefined, { icon: "information", kind: "brand" }),
  ],
};
export const Default = () => '';
Default.storyName = 'Hub Entity View';
