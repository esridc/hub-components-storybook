import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Editing/Entity Editor',
  component: 'arcgis-hub-entity-editor',
  decorators: [
    withNotice(`<div>The <code>arcgis-hub-entity-editor</code> is a wrapper around the <code>arcgis-configuration-editor</code> specifically used to create and update Hub entities. It's used throughout workspaces and within our new content creation experience. As such, we suggest visiting one of these harnesses (<code>arcgis-hub-entity-workspace</code> or <code>arcgis-hub-new-content</code>) to further explore this component.</div>`, {
      text: 'arcgis-hub-workspace',
      href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-workspace/entity-workspace-harness.html'
    }, undefined, {
      icon: "information",
      kind: "brand",
    })
  ]
};
export const Default = () => '';
Default.storyName = 'Entity Editor';
