import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Editing/Hub User Settings',
  component: 'arcgis-hub-user-settings',
  decorators: [
    withNotice('The User Settings component relies on the ArcGISContext.userHubSettings object, which can only be fetched in an environment where the authentication is done via a Hub Site Application client id, which enables a token exchange to the hubforarcgis client id, which can then be used to fetch the hub-user-settings.json user-app-resource. At this time, neither the harnesses or storybook can accomodate this requirement.', undefined, 'User Settings', { icon: "information", kind: "brand" }),
  ],
};
export const Default = () => '';
Default.storyName = 'Hub User Settings';
