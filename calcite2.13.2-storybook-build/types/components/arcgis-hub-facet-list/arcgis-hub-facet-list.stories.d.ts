declare const _default: {
  title: string;
  component: string;
  argTypes: {
    facets: {
      control: {
        type: string;
      };
    };
    orderBy: {
      control: {
        type: string;
      };
      options: string[];
    };
  };
  decorators: any[];
};
export default _default;
export declare const Default: {
  (): any;
  args: {
    orderBy: string;
    facets: ({
      label: string;
      key: string;
      attribute: string;
      display: string;
      options: ({
        label: string;
        key: string;
        value: string;
        selected: boolean;
        filter: {
          filterType: string;
          owner: string;
          access?: undefined;
        };
      } | {
        label: string;
        key: string;
        value: string;
        selected: boolean;
        filter: {
          filterType: string;
          access: string;
          owner?: undefined;
        };
      })[];
    } | {
      label: string;
      key: string;
      attribute: string;
      display: string;
      options: {
        label: string;
        key: string;
        value: string;
        selected: boolean;
        count: number;
        filter: {
          filterType: string;
          type: string;
        };
      }[];
    })[];
  };
  storyName: string;
};
