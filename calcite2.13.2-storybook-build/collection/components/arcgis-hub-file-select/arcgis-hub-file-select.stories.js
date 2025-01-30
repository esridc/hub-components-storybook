import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Editing/File Select',
  component: 'arcgis-hub-file-select',
  argTypes: {
    allowedFileTypes: {
      control: {
        type: 'object'
      }
    }
  },
  decorators: [
    withRenderCallback('arcgis-hub-file-select', ($el, { args }) => {
      $el.allowedFileTypes = args.allowedFileTypes;
    })
  ]
};
const defaultArgs = {
  allowedFileTypes: {
    types: ['Image', 'Microsoft Powerpoint'],
    extensions: ['doc', 'docx', 'csv', 'xls', 'xlsx']
  }
};
export const Default = () => `
  <arcgis-hub-file-select />
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'File Select';
