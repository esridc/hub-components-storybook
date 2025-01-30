declare const _default: {
  title: string;
  component: string;
  parameters: {
    actions: {
      handles: string[];
    };
    a11y: {
      config: {
        rules: {
          id: string;
          enabled: boolean;
        }[];
      };
    };
    layout: string;
  };
};
export default _default;
export declare const Default: {
  (args: any): string;
  args: {
    value: string;
    required: boolean;
    disabled: boolean;
    placeholder: string;
  };
  storyName: string;
};
