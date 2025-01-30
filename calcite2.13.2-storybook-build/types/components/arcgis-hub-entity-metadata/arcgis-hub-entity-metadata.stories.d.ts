declare const _default: {
  title: string;
  component: string;
  parameters: {
    withAuth: {
      components: string[];
    };
  };
  decorators: any[];
  argTypes: {
    listHeader: {
      control: {
        type: string;
      };
    };
    headingLevel: {
      control: {
        type: string;
      };
    };
    additionalMetadata: {
      control: {
        type: string;
      };
    };
    exclude: {
      control: {
        type: string;
      };
    };
    entity: {
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
    headingLevel: number;
    listHeader: string;
    additionalMetadata: {
      title: string;
      description: {
        value: string;
        link: {
          url: string;
          target: string;
          iconEnd: string;
        };
      };
    }[];
    exclude: string[];
    entity: {
      type: string;
      access: string;
      createdDate: string;
      owner: string;
      updatedDate: string;
      size: string;
      records: number;
      members: number;
      license: string;
    };
  };
  storyName: string;
};
