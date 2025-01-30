declare const _default: {
  title: string;
  component: string;
  parameters: {
    actions: {
      handles: string[];
    };
    layout: string;
  };
  decorators: ((Story: any) => string)[];
};
export default _default;
export declare const Default: {
  (args: Record<string, any>): string;
  args: {
    identifier: string;
    type: string;
    showIdentifierInput: boolean;
    showTypeInput: boolean;
  };
  storyName: string;
};
