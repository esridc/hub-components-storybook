import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Discussions/Discussions',
  component: 'arcgis-hub-discussions',
  decorators: [
    withRenderCallback('arcgis-hub-discussions', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-discussions/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
};
export const ParentPosts = () => `
  <arcgis-hub-discussions></arcgis-hub-discussions>
`;
ParentPosts.args = {
  entityId: 'af97b44f8dbb4cabb8d4d00d22418ace',
  entityType: 'content',
  isHub: false,
  showChannelAvatar: false,
  showChannelName: false
};
ParentPosts.argTypes = {
  discussion: { control: false },
  enableGoTo: { control: false },
  hasMap: { control: false },
  locationId: { control: false },
  unsavedExistingFeatures: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  dismissible: { control: false },
  disableNavigation: { control: false },
  channelId: { control: false },
  entity: { control: false },
  entityType: {
    control: { type: 'inline-radio' },
    // options: ['content', 'group'],
    options: ['content'],
  },
  isHub: { control: false },
  parentId: { control: false },
  postId: { control: false },
};
ParentPosts.storyName = 'Parent posts';
export const PostAndReplies = () => `
  <arcgis-hub-discussions></arcgis-hub-discussions>
`;
PostAndReplies.args = {
  entityId: '1c36f0f21ba34a7aa1f5d48f7313cf6b',
  entityType: 'content',
  channelId: '18d3cf60063b4e9799fe5b882bfdd3c0',
  parentId: '1327097e3dd446d585ec6bb2555876d0',
  isHub: false,
  showChannelAvatar: false,
  showChannelName: false
};
PostAndReplies.argTypes = {
  discussion: { control: false },
  enableGoTo: { control: false },
  hasMap: { control: false },
  locationId: { control: false },
  unsavedExistingFeatures: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  dismissible: { control: false },
  disableNavigation: { control: false },
  entity: { control: false },
  entityType: {
    control: { type: 'inline-radio' },
    // options: ['content', 'group'],
    options: ['content'],
  },
  isHub: { control: false },
  postId: { control: false },
};
PostAndReplies.storyName = 'Parent and replies';
export const PostAndReply = () => `
  <arcgis-hub-discussions></arcgis-hub-discussions>
`;
PostAndReply.args = {
  entityId: '1c36f0f21ba34a7aa1f5d48f7313cf6b',
  entityType: 'content',
  channelId: '18d3cf60063b4e9799fe5b882bfdd3c0',
  parentId: '1327097e3dd446d585ec6bb2555876d0',
  postId: 'bdac75267ae14a2ea1b7f71913fc540d',
  isHub: false,
  showChannelAvatar: false,
  showChannelName: false
};
PostAndReply.argTypes = {
  discussion: { control: false },
  enableGoTo: { control: false },
  hasMap: { control: false },
  locationId: { control: false },
  unsavedExistingFeatures: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  dismissible: { control: false },
  disableNavigation: { control: false },
  entity: { control: false },
  entityType: {
    control: { type: 'inline-radio' },
    // options: ['content', 'group'],
    options: ['content'],
  },
  isHub: { control: false },
};
PostAndReply.storyName = 'Parent and single reply';
