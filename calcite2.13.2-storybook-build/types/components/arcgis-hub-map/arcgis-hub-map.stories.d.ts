declare const _default: {
  title: string;
  component: string;
  parameters: {
    layout: string;
  };
};
export default _default;
export declare const BasicMap: {
  (args: {
    [key: string]: string;
  }): any;
  args: {
    zoom: number;
    center: string;
    basemap: string;
  };
};
export declare const MapGraphics: {
  (args: {
    [key: string]: string;
  }): any;
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
    basemap: string;
    graphics: {
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
  };
  decorators: any[];
};
