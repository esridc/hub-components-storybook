import { withRenderCallback } from '../../../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../../../.storybook/decorators/withNotice';
export default {
  title: 'Discussions/Post Editor',
  component: 'arcgis-hub-discussions-post-editor',
  decorators: [
    withRenderCallback('arcgis-hub-discussions-post-editor', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-discussions-post-editor/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
};
export const CreateParentPostNoChannel = () => `
  <arcgis-hub-discussions-post-editor></arcgis-hub-discussions-post-editor>
`;
CreateParentPostNoChannel.args = {
  entityId: 'af97b44f8dbb4cabb8d4d00d22418ace',
  entityType: 'content',
  isHub: false,
  showHeader: false,
  showLocations: false
};
CreateParentPostNoChannel.argTypes = {
  postId: { control: false },
  post: { control: false },
  postCreator: { control: false },
  postCreatorOrg: { control: false },
  parent: { control: false },
  parentId: { control: false },
  parentCreator: { control: false },
  channel: { control: false },
  channelAccess: { control: false },
  channelId: { control: false },
  channelGroups: { control: false },
  channelGroupIds: { control: false },
  entity: { control: false },
  entityType: {
    control: { type: 'inline-radio' },
    // options: ['content', 'group'],
    options: ['content'],
  },
  discussion: { control: false },
  displayFieldKey: { control: false },
  displayFieldValid: { control: false },
  displayFieldValue: { control: false },
  locationId: { control: false },
  hasMap: { control: false },
  isHub: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedExistingFeatures: { control: false },
  index: { control: false },
  isMobile: { control: false },
  channelModifiable: { control: false },
  collapsed: { control: false },
  collapsible: { control: false },
  createParentBodyPlaceholderText: { control: false },
  createParentSaveButtonText: { control: false },
  disableSelectExistingLocation: { control: false },
  initialValues: { control: false },
};
CreateParentPostNoChannel.storyName = 'Create parent post: discussion';
export const CreateParentChannelId = () => `
  <arcgis-hub-discussions-post-editor></arcgis-hub-discussions-post-editor>
`;
CreateParentChannelId.args = {
  entityId: 'af97b44f8dbb4cabb8d4d00d22418ace',
  entityType: 'content',
  isHub: false,
  channelId: '6cee5a84d3f74f94a1928fce7e2dd8ff',
};
CreateParentChannelId.argTypes = {
  discussion: { control: false },
  postId: { control: false },
  post: { control: false },
  postCreator: { control: false },
  postCreatorOrg: { control: false },
  parent: { control: false },
  parentId: { control: false },
  parentCreator: { control: false },
  channel: { control: false },
  channelAccess: { control: false },
  channelGroups: { control: false },
  channelGroupIds: { control: false },
  entity: { control: false },
  entityType: {
    control: { type: 'inline-radio' },
    // options: ['content', 'group'],
    options: ['content'],
  },
  displayFieldKey: { control: false },
  displayFieldValid: { control: false },
  displayFieldValue: { control: false },
  locationId: { control: false },
  hasMap: { control: false },
  isHub: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedExistingFeatures: { control: false },
  index: { control: false },
  isMobile: { control: false },
  channelModifiable: { control: false },
  collapsed: { control: false },
  collapsible: { control: false },
  createParentBodyPlaceholderText: { control: false },
  createParentSaveButtonText: { control: false },
  showHeader: { control: false },
  showLocations: { control: false },
  disableSelectExistingLocation: { control: false },
  initialValues: { control: false },
};
CreateParentChannelId.storyName = 'Create parent post: discussion & channelId';
export const CreateParentChannelGroupIdsChannelAccess = () => `
  <arcgis-hub-discussions-post-editor></arcgis-hub-discussions-post-editor>
`;
CreateParentChannelGroupIdsChannelAccess.args = {
  entityId: 'af97b44f8dbb4cabb8d4d00d22418ace',
  entityType: 'content',
  isHub: false,
  channelGroupIds: ['6cee5a84d3f74f94a1928fce7e2dd8ff'],
  channelAccess: 'private',
};
CreateParentChannelGroupIdsChannelAccess.argTypes = {
  discussion: { control: false },
  postId: { control: false },
  post: { control: false },
  postCreator: { control: false },
  postCreatorOrg: { control: false },
  parent: { control: false },
  parentId: { control: false },
  parentCreator: { control: false },
  channel: { control: false },
  channelId: { control: false },
  channelGroups: { control: false },
  channelAccess: {
    control: { type: 'inline-radio' },
    options: ['private', 'org', 'public'],
  },
  entity: { control: false },
  entityId: { control: false },
  entityType: {
    control: { type: 'inline-radio' },
    // options: ['content', 'group'],
    options: ['content'],
  },
  displayFieldKey: { control: false },
  displayFieldValid: { control: false },
  displayFieldValue: { control: false },
  locationId: { control: false },
  hasMap: { control: false },
  isHub: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedExistingFeatures: { control: false },
  index: { control: false },
  isMobile: { control: false },
  channelModifiable: { control: false },
  collapsed: { control: false },
  collapsible: { control: false },
  createParentBodyPlaceholderText: { control: false },
  createParentSaveButtonText: { control: false },
  showHeader: { control: false },
  showLocations: { control: false },
  disableSelectExistingLocation: { control: false },
  initialValues: { control: false },
};
CreateParentChannelGroupIdsChannelAccess.storyName = 'Create parent post: discussion, channelGroupIds & channelAccess';
export const EditParentPostPostId = () => `
  <arcgis-hub-discussions-post-editor></arcgis-hub-discussions-post-editor>
`;
EditParentPostPostId.args = {
  isHub: false,
  postId: '2eea207882bf47b1968db06493e44563',
};
EditParentPostPostId.argTypes = {
  discussion: { control: false },
  post: { control: false },
  postCreator: { control: false },
  postCreatorOrg: { control: false },
  parent: { control: false },
  parentId: { control: false },
  parentCreator: { control: false },
  channel: { control: false },
  channelAccess: { control: false },
  channelId: { control: false },
  channelGroups: { control: false },
  channelGroupIds: { control: false },
  entity: { control: false },
  entityId: { control: false },
  entityType: { control: false },
  displayFieldKey: { control: false },
  displayFieldValid: { control: false },
  displayFieldValue: { control: false },
  locationId: { control: false },
  hasMap: { control: false },
  isHub: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedExistingFeatures: { control: false },
  index: { control: false },
  isMobile: { control: false },
  channelModifiable: { control: false },
  collapsed: { control: false },
  collapsible: { control: false },
  createParentBodyPlaceholderText: { control: false },
  createParentSaveButtonText: { control: false },
  showHeader: { control: false },
  showLocations: { control: false },
  disableSelectExistingLocation: { control: false },
  initialValues: { control: false },
};
EditParentPostPostId.storyName = 'Edit parent post: postId';
export const CreateReplyParentId = () => `
  <arcgis-hub-discussions-post-editor></arcgis-hub-discussions-post-editor>
`;
CreateReplyParentId.args = {
  isHub: false,
  parentId: '2eea207882bf47b1968db06493e44563',
};
CreateReplyParentId.argTypes = {
  discussion: { control: false },
  postId: { control: false },
  post: { control: false },
  postCreator: { control: false },
  postCreatorOrg: { control: false },
  parent: { control: false },
  parentCreator: { control: false },
  channel: { control: false },
  channelAccess: { control: false },
  channelId: { control: false },
  channelGroups: { control: false },
  channelGroupIds: { control: false },
  entity: { control: false },
  entityId: { control: false },
  entityType: { control: false },
  displayFieldKey: { control: false },
  displayFieldValid: { control: false },
  displayFieldValue: { control: false },
  locationId: { control: false },
  hasMap: { control: false },
  isHub: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedExistingFeatures: { control: false },
  index: { control: false },
  isMobile: { control: false },
  channelModifiable: { control: false },
  collapsed: { control: false },
  collapsible: { control: false },
  createParentBodyPlaceholderText: { control: false },
  createParentSaveButtonText: { control: false },
  showHeader: { control: false },
  showLocations: { control: false },
  disableSelectExistingLocation: { control: false },
  initialValues: { control: false },
};
CreateReplyParentId.storyName = 'Create reply: parentId';
export const EditReplyPostId = () => `
  <arcgis-hub-discussions-post-editor></arcgis-hub-discussions-post-editor>
`;
EditReplyPostId.args = {
  isHub: false,
  postId: '565c26609cb04baba22d9f76948a5156',
};
EditReplyPostId.argTypes = {
  discussion: { control: false },
  post: { control: false },
  postCreator: { control: false },
  postCreatorOrg: { control: false },
  parent: { control: false },
  parentId: { control: false },
  parentCreator: { control: false },
  channel: { control: false },
  channelAccess: { control: false },
  channelId: { control: false },
  channelGroups: { control: false },
  channelGroupIds: { control: false },
  entity: { control: false },
  entityId: { control: false },
  entityType: { control: false },
  displayFieldKey: { control: false },
  displayFieldValid: { control: false },
  displayFieldValue: { control: false },
  locationId: { control: false },
  hasMap: { control: false },
  isHub: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedExistingFeatures: { control: false },
  index: { control: false },
  isMobile: { control: false },
  channelModifiable: { control: false },
  collapsed: { control: false },
  collapsible: { control: false },
  createParentBodyPlaceholderText: { control: false },
  createParentSaveButtonText: { control: false },
  showHeader: { control: false },
  showLocations: { control: false },
  disableSelectExistingLocation: { control: false },
  initialValues: { control: false },
};
EditReplyPostId.storyName = 'Edit reply: postId';
