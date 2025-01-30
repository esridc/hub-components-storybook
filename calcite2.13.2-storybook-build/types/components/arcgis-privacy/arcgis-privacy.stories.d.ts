declare const _default: {
  title: string;
  component: string;
  decorators: any[];
  parameters: {
    actions: {
      handles: string[];
    };
    layout: string;
  };
};
export default _default;
export declare const Default: {
  (args: any): string;
  args: {
    config: {
      allowPrivacyConfig: boolean;
      blocking: boolean;
      disclaimer: {
        text: string;
      }[];
      policyURL: string;
    };
    anonTrackingConfigured: boolean;
    thirdPartyTrackingConfigured: boolean;
    userSettings: {
      accepted: boolean;
      performance: boolean;
      targeting: boolean;
      functional: boolean;
    };
    orgInfo: {
      eueiEnabled: boolean;
      orgName: string;
    };
    hideManageButton: boolean;
  };
  storyName: string;
};
