declare const _default: {
  title: string;
  component: string;
  decorators: any[];
  parameters: {
    layout: string;
  };
};
export default _default;
export declare const Default: {
  (): string;
  args: {
    membershipSummary: {
      total: number;
      users: ({
        username: string;
        fullName: string;
        memberType: string;
        thumbnail: string;
        joined: number;
      } | {
        username: string;
        joined: number;
        fullName?: undefined;
        memberType?: undefined;
        thumbnail?: undefined;
      })[];
    };
  };
  storyName: string;
};
