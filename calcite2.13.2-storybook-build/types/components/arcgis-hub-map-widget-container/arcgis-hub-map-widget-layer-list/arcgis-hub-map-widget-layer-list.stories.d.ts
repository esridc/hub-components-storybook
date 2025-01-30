declare const _default: {
  title: string;
  component: string;
  argTypes: {
    scale: {
      options: string[];
      control: {
        type: string;
      };
    };
    view: {
      control: boolean;
    };
    showZoomAction: {
      control: {
        type: string;
      };
    };
    showRemoveAction: {
      control: {
        type: string;
      };
    };
    showLegend: {
      control: {
        type: string;
      };
    };
  };
  decorators: any[];
  parameters: {
    layout: string;
  };
};
export default _default;
export declare const Default: {
  (args: any): string;
  args: {
    scale: string;
    showZoomAction: boolean;
    showRemoveAction: boolean;
    showLegend: boolean;
  };
  storyName: string;
};
