import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Discussions/Post Reactions',
  component: 'arcgis-hub-discussions-post-reactions',
  decorators: [
    withRenderCallback('arcgis-hub-discussions-post-reactions', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-discussions-post-reactions/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
};
export const Reactions = () => `
  <arcgis-hub-discussions-post-reactions></arcgis-hub-discussions-post-reactions>
`;
Reactions.args = {
  postId: '0ebcd4c7752a4962a6c645d45a7b3422'
};
Reactions.argTypes = {
  post: { control: false },
  channel: { control: false },
};
Reactions.storyName = 'Post Reactions';
