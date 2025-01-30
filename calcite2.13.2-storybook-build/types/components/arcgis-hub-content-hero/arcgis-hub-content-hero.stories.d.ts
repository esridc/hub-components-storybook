declare const _default: {
  title: string;
  component: string;
  argTypes: {
    layout: {
      options: string[];
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
    heroTitle: string;
    layout: string;
    thumbnailUrl: string;
  };
  storyName: string;
};
export declare const extentHero: {
  (args: any): string;
  args: {
    layout: string;
    basemap: string;
    extent: {
      spatialReference: {
        wkid: number;
      };
      type: string;
      xmax: number;
      xmin: number;
      ymax: number;
      ymin: number;
    };
    graphics: {
      geometry: {
        spatialReference: {
          wkid: number;
        };
        type: string;
        xmax: number;
        xmin: number;
        ymax: number;
        ymin: number;
      };
      symbol: {
        type: string;
        style: string;
        color: number[];
        outline: {
          type: string;
          style: string;
          color: number[];
          width: number;
        };
      };
    }[];
    heroTitle: string;
    thumbnailUrl: string;
  };
  storyName: string;
};
