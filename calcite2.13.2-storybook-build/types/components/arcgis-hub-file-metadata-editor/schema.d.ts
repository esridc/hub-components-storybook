export declare const SCHEMA: {
  required: string[];
  type: string;
  properties: {
    title: {
      type: string;
      minLength: number;
    };
    snippet: {
      type: string;
      maxLength: number;
    };
    tags: {
      type: string;
      items: {
        type: string;
      };
    };
  };
};
export declare const UI_SCHEMA: {
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
  } | {
    labelKey: string;
    scope: string;
    type: string;
    options: {
      control: string;
      type?: undefined;
    };
  })[];
};
