declare const _default: {
  title: string;
  component: string;
  parameters: {
    actions: {
      handles: string[];
    };
  };
  decorators: any[];
  argTypes: {
    sources: {
      control: {
        type: string;
      };
    };
    extent: {
      control: {
        type: string;
      };
    };
    state: {
      control: {
        type: string;
      };
      options: string[];
    };
  };
};
export default _default;
export declare const Default: {
  (args: any): string;
  args: {
    extent: {
      xmin: number;
      ymin: number;
      xmax: number;
      ymax: number;
      type: string;
      spatialReference: {
        wkid: number;
      };
    };
    sources: ({
      value: string;
      graphic?: undefined;
      selected?: undefined;
    } | {
      value: string;
      graphic: {
        geometry: {
          xmin: number;
          ymin: number;
          xmax: number;
          ymax: number;
          type: string;
          spatialReference: {
            wkid: number;
          };
        };
      };
      selected: boolean;
    })[];
    state: any;
    authenticated: boolean;
  };
  storyName: string;
};
