export declare const TIMELINE_SCHEMA: {
  required: any[];
  type: string;
  properties: {
    title: {
      type: string;
      maxLength: number;
    };
    description: {
      type: string;
      maxLength: number;
    };
    canCollapse: {
      type: string;
    };
  };
};
export declare const TIMELINE_UI_SCHEMA: {
  type: string;
  elements: ({
    labelKey: string;
    scope: string;
    type: string;
    options?: undefined;
  } | {
    labelKey: string;
    scope: string;
    type: string;
    options: {
      control: string;
      type: string;
    };
  })[];
};
export declare const STAGE_SCHEMA: {
  required: string[];
  type: string;
  properties: {
    title: {
      type: string;
      maxLength: number;
      minLength: number;
    };
    timeframe: {
      type: string;
    };
    stageDescription: {
      type: string;
      maxLength: number;
    };
    link: {
      type: string;
      properties: {
        href: {
          type: string;
          if: {
            minLength: number;
          };
          then: {
            format: string;
          };
        };
        title: {
          type: string;
        };
      };
    };
    status: {
      type: string;
      default: string;
    };
  };
};
export declare const STAGE_UI_SCHEMA: {
  type: string;
  elements: ({
    labelKey: string;
    scope: string;
    type: string;
    options: {
      messages: {
        type: string;
        keyword: string;
        icon: boolean;
        labelKey: string;
      }[];
      control?: undefined;
      type?: undefined;
      helperText?: undefined;
      selectionMode?: undefined;
      placeholder?: undefined;
      items?: undefined;
    };
  } | {
    labelKey: string;
    scope: string;
    type: string;
    options?: undefined;
  } | {
    labelKey: string;
    scope: string;
    type: string;
    options: {
      control: string;
      type: string;
      messages?: undefined;
      helperText?: undefined;
      selectionMode?: undefined;
      placeholder?: undefined;
      items?: undefined;
    };
  } | {
    labelKey: string;
    scope: string;
    type: string;
    options: {
      helperText: {
        labelKey: string;
      };
      messages: ({
        type: string;
        keyword: string;
        icon: boolean;
        labelKey: string;
        hidden?: undefined;
      } | {
        type: string;
        keyword: string;
        hidden: boolean;
        icon?: undefined;
        labelKey?: undefined;
      })[];
      control?: undefined;
      type?: undefined;
      selectionMode?: undefined;
      placeholder?: undefined;
      items?: undefined;
    };
  } | {
    labelKey: string;
    scope: string;
    type: string;
    options: {
      control: string;
      selectionMode: string;
      placeholder: string;
      items: {
        value: string;
        label: string;
        icon: string;
      }[];
      messages?: undefined;
      type?: undefined;
      helperText?: undefined;
    };
  })[];
};
