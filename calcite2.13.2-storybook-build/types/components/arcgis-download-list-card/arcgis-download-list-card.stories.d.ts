declare const _default: {
  title: string;
  component: string;
  parameters: {
    actions: {
      handles: string[];
    };
  };
  argTypes: {
    fileFormat: {
      control: {
        type: string;
      };
      options: string[];
    };
    filterGeometry: {
      control: {
        type: string;
      };
    };
    item: {
      control: {
        type: string;
      };
    };
    layers: {
      control: {
        type: string;
      };
    };
    server: {
      control: {
        type: string;
      };
    };
  };
  decorators: any[];
};
export default _default;
export declare const Default: {
  (args: any): string;
  args: {
    fileFormat: string;
    item: {
      id: string;
      type: string;
      access: string;
      orgId: string;
      url: string;
    };
    layers: string;
  };
  storyName: string;
};
