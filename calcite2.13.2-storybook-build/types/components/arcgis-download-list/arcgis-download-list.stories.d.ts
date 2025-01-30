declare const _default: {
  title: string;
  component: string;
  argTypes: {
    server: {
      control: {
        type: string;
      };
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
  };
  parameters: {
    actions: {
      handles: string[];
    };
  };
  decorators: any[];
};
export default _default;
export declare const Item: {
  (args: any): string;
  args: {
    item: {
      id: string;
      type: string;
      access: string;
      url: string;
    };
    layers: string;
    layout: string;
  };
  storyName: string;
};
export declare const PrivateItem: {
  (args: any): string;
  args: {
    item: {
      id: string;
      type: string;
      access: string;
      url: string;
    };
    layers: string;
    layout: string;
  };
  storyName: string;
};
export declare const ServerUrl: {
  (args: any): string;
  args: {
    server: string;
    layers: string;
    layout: string;
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
    layout: string;
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
    layout: string;
  };
  storyName: string;
};
export declare const LinkView: {
  (args: any): string;
  args: {
    server: string;
    layers: string;
    layout: string;
  };
  storyName: string;
};
export declare const DropdownView: {
  (args: any): string;
  args: {
    server: string;
    layers: string;
    layout: string;
  };
  storyName: string;
};
export declare const HeaderSlot: {
  (args: any): string;
  args: {
    server: string;
    layers: string;
    layout: string;
    header: string;
  };
  storyName: string;
};
