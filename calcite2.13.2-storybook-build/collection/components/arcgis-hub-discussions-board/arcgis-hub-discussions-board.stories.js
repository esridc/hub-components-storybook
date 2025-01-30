import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Discussions/Board',
  component: 'arcgis-hub-discussions-board',
  decorators: [
    withRenderCallback('arcgis-hub-discussions-board', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-discussions-board/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
};
export const Board = () => `
  <arcgis-hub-discussions-board></arcgis-hub-discussions-board>
`;
Board.args = {
  entityId: '39ba5cf645d4481b852ff60cb010d6ef',
  entityType: 'content',
  isHub: false,
  isMobile: false,
  layout: 'map',
  view: 'explore',
};
Board.argTypes = {
  entityType: {
    control: { type: 'inline-radio' },
    // options: ['content', 'group'],
    options: ['content'],
  },
  entity: { control: false },
  isHub: { control: false },
  isMobile: { control: 'boolean' },
  layout: {
    control: { type: 'inline-radio' },
    options: ['grid', 'list', 'map']
  },
  view: {
    control: { type: 'inline-radio' },
    options: ['explore', 'about']
  },
  unsavedExistingFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedFeatures: { control: false },
  hasMap: { control: false },
};
Board.storyName = 'Board';
