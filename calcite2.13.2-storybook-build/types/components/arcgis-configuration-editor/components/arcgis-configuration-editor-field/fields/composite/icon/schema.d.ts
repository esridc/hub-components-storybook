export declare const SCHEMA: {
  required: any[];
  type: string;
  properties: {
    icon: {
      type: string;
      properties: {
        scope: {
          type: string;
          default: string;
          enum: string[];
        };
        name: {
          type: string;
        };
        url: {
          type: string;
        };
        color: {
          type: string;
        };
        altText: {
          type: string;
        };
      };
    };
  };
};
export declare const UI_SCHEMA: {
  type: string;
  elements: ({
    scope: string;
    type: string;
    options: {
      control: string;
      enum: {
        i18nScope: string;
      };
      name?: undefined;
      helperText?: undefined;
    };
    rule?: undefined;
    labelKey?: undefined;
  } | {
    type: string;
    options: {
      name: string;
      control?: undefined;
      enum?: undefined;
      helperText?: undefined;
    };
    rule: {
      effect: string;
      condition: {
        scope: string;
        schema: {
          const: string;
        };
      };
    };
    scope?: undefined;
    labelKey?: undefined;
  } | {
    scope: string;
    type: string;
    rule: {
      effect: string;
      condition: {
        scope: string;
        schema: {
          const: string;
        };
      };
    };
    options?: undefined;
    labelKey?: undefined;
  } | {
    scope: string;
    type: string;
    options: {
      control: string;
      enum?: undefined;
      name?: undefined;
      helperText?: undefined;
    };
    rule?: undefined;
    labelKey?: undefined;
  } | {
    labelKey: string;
    scope: string;
    type: string;
    options: {
      helperText: {
        labelKey: string;
      };
      control?: undefined;
      enum?: undefined;
      name?: undefined;
    };
    rule?: undefined;
  })[];
};
