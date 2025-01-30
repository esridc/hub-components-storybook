declare const _default: {
  title: string;
  component: string;
  argTypes: {
    fileFormat: {
      control: {
        type: string;
      };
      options: string[];
    };
    layers: {
      control: {
        type: string;
      };
    };
    filterGeometry: {
      control: {
        type: string;
      };
    };
    server: {
      control: {
        type: string;
      };
    };
    item: {
      control: {
        type: string;
      };
    };
  };
  parameters: {
    actions: {
      handles: string[];
    };
  };
  decorators: any[];
};
export default _default;
export declare const ItemUrl: {
  (args: any): string;
  args: {
    fileFormat: string;
    item: {
      id: string;
      type: string;
      orgId: string;
      access: string;
      url: string;
    };
    layers: string;
    appearance: string;
  };
  storyName: string;
};
export declare const ServerUrl: {
  (args: any): string;
  args: {
    server: string;
    layers: string;
    fileFormat: string;
    appearance: string;
  };
  storyName: string;
};
export declare const ServerDefinition: {
  (args: any): string;
  args: {
    server: {
      url: string;
      capabilities: string;
      supportedExportFormats: string;
    };
    layers: string;
    fileFormat: string;
    appearance: string;
  };
  storyName: string;
};
export declare const LayerOptions: {
  (args: any): string;
  args: {
    server: string;
    layers: {
      id: number;
      where: string;
    }[];
    fileFormat: string;
    appearance: string;
  };
  storyName: string;
};
export declare const FilterGeometry: {
  (args: any): string;
  args: {
    server: string;
    layers: string;
    fileFormat: string;
    filterGeometry: {
      type: string;
      spatialReference: number;
      xmin: number;
      ymin: number;
      xmax: number;
      ymax: number;
    };
    appearance: string;
  };
  storyName: string;
};
export declare const Errored: {
  (args: any): string;
  args: {
    server: string;
    layers: string;
    fileFormat: string;
    filterGeometry: {
      type: string;
      spatialReference: number;
      xmin: number;
      ymin: number;
      xmax: number;
      ymax: number;
    };
    appearance: string;
  };
  storyName: string;
};
