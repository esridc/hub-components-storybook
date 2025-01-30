import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Metadata/File Metadata Editor',
  component: 'arcgis-hub-file-metadata-editor',
  decorators: [
    withRenderCallback('arcgis-hub-file-metadata-editor', ($el, { args }) => {
      $el.values = args.values;
    }),
    withCenteredLayout('30%')
  ]
};
const defaultArgs = {
  values: {
    title: 'Nifty Title here',
    summary: 'all the summary',
    tags: ['Hub Item']
  }
};
export const Default = () => `
  <arcgis-hub-file-metadata-editor />
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'File Metadata Editor';
