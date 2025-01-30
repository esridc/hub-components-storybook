declare const _default: {
  title: string;
  component: string;
  argTypes: {
    noticeId: {
      control: {
        type: string;
      };
      options: string[];
    };
    notice: {
      control: {
        type: string;
      };
    };
  };
  parameters: {
    controls: {
      expanded: boolean;
      exclude: string[];
      sort: string;
    };
  };
};
export default _default;
export declare const NoticeId: {
  (args: any): string;
  args: {
    notice: {
      message: string;
      title: string;
      configuration: {
        noticeType: string;
      };
    };
    noticeId: string;
    place: string;
  };
  decorators: any[];
  storyName: string;
};
export declare const Notice: {
  (args: any): string;
  args: {
    notice: {
      message: string;
      title: string;
      configuration: {
        noticeType: string;
      };
    };
    noticeId: string;
    place: string;
  };
  decorators: any[];
  parameters: {
    controls: {
      expanded: boolean;
      exclude: string[];
      sort: string;
    };
  };
  storyName: string;
};
