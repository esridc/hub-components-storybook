declare const _default: {
  title: string;
  component: string;
  decorators: any[];
};
export default _default;
export declare const Board: {
  (): string;
  args: {
    entityId: string;
    entityType: string;
    isHub: boolean;
    isMobile: boolean;
    layout: string;
    view: string;
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
    isHub: {
      control: boolean;
    };
    isMobile: {
      control: string;
    };
    layout: {
      control: {
        type: string;
      };
      options: string[];
    };
    view: {
      control: {
        type: string;
      };
      options: string[];
    };
    unsavedExistingFeatures: {
      control: boolean;
    };
    unsavedRelatedFeatures: {
      control: boolean;
    };
    unsavedFeatures: {
      control: boolean;
    };
    hasMap: {
      control: boolean;
    };
  };
  storyName: string;
};
