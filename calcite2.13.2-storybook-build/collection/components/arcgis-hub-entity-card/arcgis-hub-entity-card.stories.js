import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Search/Entity Card',
  component: 'arcgis-hub-entity-card',
  decorators: [
    withNotice(`<div> The <code>arcgis-hub-entity-card</code> is a light-weight wrapper
    around the <code>arcgis-hub-card</code> responsible for constructing an
    entity-specific view model. Because the entity card works by accepting a full
    hub entity OR a hub search result, it is difficult to represent fully in storybook.
    Please visit our harness. </div>`, {
      text: 'Try the harness examples',
      href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-entity-card/index.html'
    }, undefined, {
      icon: "information",
      kind: "brand",
    })
  ]
};
export const Default = () => '';
Default.storyName = 'Entity Card';
