import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Access/Groups Sharing',
  component: 'arcgis-hub-groups-sharing',
  decorators: [
    withRenderCallback('arcgis-hub-groups-sharing', ($el, { args }) => {
      $el.groups = args.groups;
      $el.selectedGroups = args.selectedGroups;
    })
  ],
  parameters: {
    layout: 'centered',
  }
};
const defaultArgs = {
  groups: [{ id: "1234", title: "Group 1" }, { id: "5678", title: "Group 2" }],
  selectedGroups: ['1234']
};
export const Default = () => `
  <arcgis-hub-groups-sharing />
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Groups Sharing';
