declare const _default: {
  title: string;
  component: string;
  decorators: any[];
};
export default _default;
export declare const View: {
  (): string;
  args: {
    entityId: string;
    entityType: string;
    isHub: boolean;
    isMobile: boolean;
    showViewButton: boolean;
  };
  argTypes: {
    entityType: {
      control: {
        type: string;
      };
      options: string[];
    };
    entity: {
      control: boolean;
    };
    channel: {
      control: boolean;
    };
    allowedChannelIds: {
      control: boolean;
    };
    isHub: {
      control: boolean;
    };
    isMobile: {
      control: string;
    };
    showViewButton: {
      control: string;
    };
  };
  storyName: string;
};
