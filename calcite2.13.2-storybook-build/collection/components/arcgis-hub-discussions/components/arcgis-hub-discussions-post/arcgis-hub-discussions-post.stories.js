import { withRenderCallback } from '../../../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../../../.storybook/decorators/withNotice';
export default {
  title: 'Discussions/Post',
  component: 'arcgis-hub-discussions-post',
  decorators: [
    withRenderCallback('arcgis-hub-discussions-post', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-discussions-post/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
};
export const Post = () => `
  <arcgis-hub-discussions-post></arcgis-hub-discussions-post>
`;
Post.args = {
  postId: '0ebcd4c7752a4962a6c645d45a7b3422',
  isMobile: false,
  showChannelAvatar: false,
  showChannelName: false,
};
Post.argTypes = {
  post: { control: false },
  postCreator: { control: false },
  postCreatorOrg: { control: false },
  postError: { control: false },
  postMentionedUsers: { control: false },
  parent: { control: false },
  parentId: { control: false },
  parentCreator: { control: false },
  parentCreatorOrg: { control: false },
  channelId: { control: false },
  channel: { control: false },
  channelGroups: { control: false },
  hasMap: { control: false },
  isHub: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedExistingFeatures: { control: false },
  preview: { control: false },
  index: { control: false },
  discussion: { control: false },
  entityId: { control: false },
  entityType: { control: false },
  entity: { control: false },
  displayFieldValid: { control: false },
  displayFieldValue: { control: false },
  displayFieldKey: { control: false },
  locationId: { control: false },
  lead: { control: false },
  lastIndex: { control: false },
  loading: { control: false },
  showLocations: { control: false },
  disableSelectExistingLocation: { control: false },
};
Post.storyName = 'Post';
