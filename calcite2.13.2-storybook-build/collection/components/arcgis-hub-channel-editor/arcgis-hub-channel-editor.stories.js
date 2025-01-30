import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Discussions/Channel Editor',
  component: 'arcgis-hub-channel-editor',
  decorators: [
    withNotice('This component requires authentication to render. Please auth as juliana_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-channel-editor/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
};
export const ChannelEditor = (args) => `
  <arcgis-hub-channel-editor
    channel-id="${args.channelId}"
    disabled="${args.disabled}"
    name-prefix="${args.namePrefix}"
  ></arcgis-hub-channel-editor>
`;
ChannelEditor.args = {
  channelId: '26bff894-1fb1-4145-99ef-145297c00a68',
  namePrefix: 'My Entity Name',
  disabled: false,
};
ChannelEditor.argTypes = {
  footerSlotRef: { control: false },
};
ChannelEditor.storyName = 'Channel Editor';
