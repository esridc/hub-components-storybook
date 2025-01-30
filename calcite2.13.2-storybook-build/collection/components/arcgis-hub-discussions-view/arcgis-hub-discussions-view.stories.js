import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Discussions/View',
  component: 'arcgis-hub-discussions-view',
  decorators: [
    withRenderCallback('arcgis-hub-discussions-view', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-discussions-view/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
};
export const View = () => `
  <arcgis-hub-discussions-view></arcgis-hub-discussions-view>
`;
View.args = {
  entityId: '39ba5cf645d4481b852ff60cb010d6ef',
  entityType: 'content',
  isHub: false,
  isMobile: false,
  showViewButton: false
};
View.argTypes = {
  entityType: {
    control: { type: 'inline-radio' },
    options: ['content'],
  },
  entity: { control: false },
  channel: { control: false },
  allowedChannelIds: { control: false },
  isHub: { control: false },
  isMobile: { control: 'boolean' },
  showViewButton: { control: 'boolean' },
};
View.storyName = 'View';
