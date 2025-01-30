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
    options: {
      control: {
        type: string;
      };
    };
    extent: {
      control: {
        type: string;
      };
    };
  };
};
export default _default;
export declare const Default: {
  (): string;
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
    options: ({
      label: string;
      location: {
        type: string;
        extent?: undefined;
        spatialReference?: undefined;
      };
      description?: undefined;
      selected?: undefined;
    } | {
      label: string;
      description: string;
      selected: boolean;
      location: {
        type: string;
        extent: number[][];
        spatialReference: {
          wkid: number;
        };
      };
    } | {
      label: string;
      description: string;
      location: {
        type: string;
        extent: number[][];
        spatialReference: {
          wkid: number;
        };
      };
      selected?: undefined;
    })[];
  };
  storyName: string;
};
