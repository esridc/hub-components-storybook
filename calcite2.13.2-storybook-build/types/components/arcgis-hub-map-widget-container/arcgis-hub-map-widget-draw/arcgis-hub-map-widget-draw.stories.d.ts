declare const _default: {
  title: string;
  component: string;
  argTypes: {
    geometry: {
      control: boolean;
    };
    mode: {
      options: string[];
      control: {
        type: string;
      };
    };
    tools: {
      options: string[];
      control: {
        type: string;
      };
    };
    view: {
      control: boolean;
    };
    disablePrimaryOptions: {
      control: string;
    };
    disableEditOptions: {
      control: string;
    };
    enableMapTips: {
      control: string;
    };
    drawTip: {
      control: boolean;
    };
    color: {
      control: string;
    };
    buffer: {
      control: string;
    };
    condensed: {
      control: string;
    };
    resetOnDisconnect: {
      control: boolean;
    };
    disabled: {
      control: string;
    };
    boundaries: {
      control: boolean;
    };
  };
  decorators: any[];
  parameters: {
    layout: string;
  };
};
export default _default;
export declare const Default: {
  (_args: any): string;
  args: {
    mode: string;
    tools: string[];
    disablePrimaryOptions: boolean;
    disableEditOptions: boolean;
    enableMapTips: boolean;
    color: number[];
    buffer: boolean;
    condensed: boolean;
  };
  storyName: string;
};
