import { withRenderCallback } from '../../../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../../../.storybook/decorators/withNotice';
export default {
  title: 'Discussions/Map Preview',
  component: 'arcgis-hub-discussions-map-preview',
  decorators: [
    withRenderCallback('arcgis-hub-discussions-map-preview', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-discussions-map-preview/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
};
export const Preview = () => `
  <arcgis-hub-discussions-map-preview></arcgis-hub-discussions-map-preview>
`;
Preview.args = {
  postId: '47c71e5f-7340-49fb-a24c-0e68211e8ddc',
  channelId: '0bf5a3d8-cac5-4a71-9cf5-61613a1c59c5',
  discussion: 'hub://content/af97b44f8dbb4cabb8d4d00d22418ace',
  showChannelAvatar: false,
};
Preview.argTypes = {
  locationId: { control: false },
  showChannelAvatar: { control: 'boolean' },
};
Preview.storyName = 'Map Preview';
