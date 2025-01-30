import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Editing/File Upload Manager',
  component: 'arcgis-hub-file-upload-manager',
  decorators: [
    withRenderCallback('arcgis-hub-file-upload-manager', ($el, { args }) => {
      $el.groups = args.groups;
      $el.selectedGroups = args.selectedGroups;
    })
  ]
};
const defaultArgs = {
  groups: [{ id: "1234", title: "Fake group 1" }, { id: "5678", title: "Fake group 2" }],
  selectedGroups: ['1234']
};
export const Default = () => `
  <arcgis-hub-file-upload-manager />
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'File Upload Manager';
