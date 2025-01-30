declare const _default: {
  title: string;
  component: string;
  argTypes: {
    dateRange: {
      control: {
        type: string;
      };
      options: string[];
    };
  };
  parameters: {
    actions: {
      handles: string[];
    };
  };
  decorators: any[];
};
export default _default;
export declare const Default: {
  (args: any): string;
  args: {
    contentId: string;
    dateRange: string;
    hostname: string;
    dashboardTitle: string;
    hubAnalyticsEnabled: boolean;
    showSubscriptions: boolean;
  };
  storyName: string;
};
