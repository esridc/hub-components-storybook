import { withRenderCallback } from '../../../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../../../.storybook/decorators/withNotice';
export default {
  title: 'Discussions/Thread',
  component: 'arcgis-hub-discussions-thread',
  decorators: [
    withRenderCallback('arcgis-hub-discussions-thread', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-discussions-thread/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
};
export const ThreadPostAndReplies = () => `
  <arcgis-hub-discussions-thread></arcgis-hub-discussions-thread>
`;
ThreadPostAndReplies.args = {
  channelId: '18d3cf60063b4e9799fe5b882bfdd3c0',
  parentId: '1327097e3dd446d585ec6bb2555876d0',
  isMobile: false,
  showChannelAvatar: false,
  showChannelName: false,
};
ThreadPostAndReplies.argTypes = {
  post: { control: false },
  postId: { control: false },
  parent: { control: false },
  parentCreator: { control: false },
  parentCreatorOrg: { control: false },
  channel: { control: false },
  channelGroups: { control: false },
  hasMap: { control: false },
  isHub: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedExistingFeatures: { control: false },
  discussion: { control: false },
  entityId: { control: false },
  entityType: { control: false },
  entity: { control: false },
  displayFieldValid: { control: false },
  displayFieldValue: { control: false },
  displayFieldKey: { control: false },
  locationId: { control: false },
  postCreator: { control: false },
  postCreatorOrg: { control: false },
  showLocations: { control: false },
  disableSelectExistingLocation: { control: false },
};
ThreadPostAndReplies.storyName = 'Parent and replies';
export const ThreadPostAndReply = () => `
  <arcgis-hub-discussions-thread></arcgis-hub-discussions-thread>
`;
ThreadPostAndReply.args = {
  channelId: '18d3cf60063b4e9799fe5b882bfdd3c0',
  parentId: '1327097e3dd446d585ec6bb2555876d0',
  postId: 'bdac75267ae14a2ea1b7f71913fc540d',
};
ThreadPostAndReply.argTypes = {
  post: { control: false },
  parent: { control: false },
  parentCreator: { control: false },
  parentCreatorOrg: { control: false },
  channel: { control: false },
  channelGroups: { control: false },
  hasMap: { control: false },
  isHub: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedExistingFeatures: { control: false },
  discussion: { control: false },
  entityId: { control: false },
  entityType: { control: false },
  entity: { control: false },
  displayFieldValid: { control: false },
  displayFieldValue: { control: false },
  displayFieldKey: { control: false },
  isMobile: { control: false },
  locationId: { control: false },
  postCreator: { control: false },
  postCreatorOrg: { control: false },
  showLocations: { control: false },
  disableSelectExistingLocation: { control: false },
};
ThreadPostAndReply.storyName = 'Parent and single reply';
