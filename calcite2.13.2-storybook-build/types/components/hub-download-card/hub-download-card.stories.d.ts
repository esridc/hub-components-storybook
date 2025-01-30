declare const _default: {
  title: string;
  component: string;
  argTypes: {
    target: {
      control: {
        type: string;
      };
      options: string[];
    };
    format: {
      control: {
        type: string;
      };
      options: string[];
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
export declare const Default: {
  (args: any): string;
  args: {
    host: string;
    name: string;
    datasetId: string;
    format: string;
    spatialRefId: string;
    where: string;
    geometry: string;
    username: string;
    token: string;
    target: string;
  };
  storyName: string;
};
