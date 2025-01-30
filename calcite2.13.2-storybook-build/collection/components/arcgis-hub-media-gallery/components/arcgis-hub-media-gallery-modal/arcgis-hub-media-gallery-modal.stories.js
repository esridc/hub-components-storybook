import { withNotice } from '../../../../../.storybook/decorators/withNotice';
export default {
  title: 'Layouts/Media Gallery/Media Gallery Modal',
  component: 'components/arcgis-hub-media-gallery-modal',
  // we're temporarily using the harness for the media gallery modal until we can resolve an issue
  // where the intersection observer in hub-image does not seem to be triggered in Storybook for this component
  decorators: [
    withNotice('This component is best observed in the harness', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-media-gallery/index.html' }, undefined, { style: "margin-block-end: 2rem;" })
  ]
};
const defaultArgs = {
  // NOTE: the global context defaults to unauthenticated QA for all stories
  // prod
  // itemId: '211ec658c4a34dc28d6903a7b4e76931',
  // qa
  // itemId: '4e694269e30a476daa3b2d995f643687',
  itemId: '',
  isOpen: false
};
export const Default = args => `
  <arcgis-hub-media-gallery-modal
    item-id="${args.itemId}"
    is-open="${args.isOpen}"
    selectable
  />
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Media Gallery Modal';
