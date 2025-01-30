export default {
  title: 'Access/Access Level Controls',
  component: 'arcgis-hub-access-level-controls',
  argTypes: {
    accessLevel: {
      control: { type: 'radio' },
      options: ['public', 'org', 'private']
    }
  },
  parameters: {
    layout: 'centered'
  }
};
const defaultArgs = {
  accessLevel: 'org',
  itemType: 'Web Map',
  orgName: 'Happy Hub Day'
};
export const Default = (args) => `
  <arcgis-hub-access-level-controls
    access-level="${args.accessLevel}"
    item-type="${args.itemType}"
    org-name="${args.orgName}"
  />

`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Access Level Controls';
