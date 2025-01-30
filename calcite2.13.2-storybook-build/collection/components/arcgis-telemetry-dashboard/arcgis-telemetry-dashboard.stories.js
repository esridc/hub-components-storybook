import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Telemetry/Telemetry Dashboard',
  component: 'arcgis-telemetry-dashboard',
  argTypes: {
    dateRange: {
      control: { type: 'select' },
      options: ['yesterday', 'last7Days', 'last30Days', 'thisMonth', 'lastMonth', 'pastYear']
    }
  },
  parameters: {
    actions: {
      handles: ['arcgisTelemetryDashboardDateChanged'],
    },
  },
  decorators: [withCenteredLayout('60%')],
};
const defaultArgs = {
  contentId: '',
  dateRange: 'last30Days',
  hostname: 'brollywood.hikes.dev',
  dashboardTitle: 'Telemetry Dashboard',
  hubAnalyticsEnabled: true,
  showSubscriptions: false
};
export const Default = args => `
  <arcgis-telemetry-dashboard
    content-id="${args.contentId}"
    date-range="${args.dateRange}"
    hostname="${args.hostname}"
    dashboard-title="${args.dashboardTitle}"
    hub-analytics-enabled="${args.hubAnalyticsEnabled}"
    show-subscriptions="${args.showSubscriptions}"
  ></arcgis-telemetry-dashboard>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Telemetry Dashboard';
