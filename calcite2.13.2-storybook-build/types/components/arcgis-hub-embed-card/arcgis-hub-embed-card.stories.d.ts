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
    embed: {
      control: {
        type: string;
      };
    };
  };
};
export default _default;
export declare const MapEmbed: {
  (): string;
  args: {
    embed: {
      kind: string;
      id: string;
    };
  };
  storyName: string;
};
export declare const AppEmbed: {
  (): string;
  args: {
    embed: {
      id: string;
      kind: string;
    };
  };
  storyName: string;
};
/** APP EMBED END */
