import { withRenderCallback } from '../../../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../../../.storybook/decorators/withNotice';
import { PostSort, SortOrder } from '@esri/hub-discussions';
export default {
  title: 'Discussions/Post List',
  component: 'arcgis-hub-discussions-post-list',
  decorators: [
    withRenderCallback('arcgis-hub-discussions-post-list', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-discussions-post-list/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
};
export const PostList = () => `
  <arcgis-hub-discussions-post-list></arcgis-hub-discussions-post-list>
`;
PostList.args = {
  columns: 1,
  showCounts: false,
  showLayoutActions: false,
  showSearchActions: false,
  showSortActions: false,
  layout: 'list',
  parentIds: [],
  access: ['private'],
  status: ['approved'],
  entityType: 'content',
  entityId: '58de591989fa47989c03ecada1dcb061',
  start: 1,
  isHub: false,
  isMobile: false,
  showChannelAvatar: false,
  showChannelName: false,
  showLocations: false,
  sortBy: PostSort.UPDATED_AT,
  sortOrder: SortOrder.DESC
};
PostList.argTypes = {
  hasMap: { control: false },
  unsavedFeatures: { control: false },
  unsavedRelatedFeatures: { control: false },
  unsavedExistingFeatures: { control: false },
  entity: { control: false },
  discussion: { control: false },
  displayFieldValid: { control: false },
  displayFieldValue: { control: false },
  displayFieldKey: { control: false },
  locationId: { control: false },
  nextStart: { control: false },
  total: { control: false },
  num: { control: false },
  items: { control: false },
  geometry: { control: false },
  featureGeometry: { control: false },
  renderPost: { control: false },
  access: {
    options: ['private', 'org', 'public'],
    control: { type: 'inline-check' },
  },
  status: {
    options: ['pending', 'approved', 'rejected', 'deleted', 'hidden'],
    control: { type: 'inline-check' },
  },
  createdBefore: {
    control: 'number',
  },
  createdAfter: {
    control: 'number',
  },
  updatedBefore: {
    control: 'number',
  },
  updatedAfter: {
    control: 'number',
  },
  entityType: {
    options: ['content', 'group'],
    control: { type: 'inline-radio' },
  },
  disableSelectExistingLocation: { control: false },
  sortBy: {
    options: [PostSort.BODY, PostSort.CHANNEL_ID, PostSort.CREATED_AT, PostSort.CREATOR, PostSort.DISCUSSION, PostSort.EDITOR, PostSort.ID, PostSort.PARENT_ID, PostSort.STATUS, PostSort.TITLE, PostSort.UPDATED_AT],
    control: { type: 'inline-radio' },
  },
  sortOrder: {
    options: [SortOrder.ASC, SortOrder.DESC],
    control: { type: 'inline-radio' },
  },
};
PostList.storyName = 'Post List';
