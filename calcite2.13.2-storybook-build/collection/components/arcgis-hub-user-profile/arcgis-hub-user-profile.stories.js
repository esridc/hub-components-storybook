export default {
  title: 'Navigation/User Profile',
  component: 'arcgis-hub-user-profile',
  argTypes: {
    variant: {
      options: ['default', 'minimal'],
      control: { type: 'inline-radio' }
    }
  },
  parameters: {
    actions: {
      handles: ['arcgisHubUserProfileSignout', 'hubTelemetry'],
    },
    layout: 'centered'
  },
};
const defaultArgs = {
  variant: "minimal"
};
export const Default = args => `
  <arcgis-hub-user-profile
    variant="${args.variant}"
  ></arcgis-hub-user-profile>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'User Profile';
