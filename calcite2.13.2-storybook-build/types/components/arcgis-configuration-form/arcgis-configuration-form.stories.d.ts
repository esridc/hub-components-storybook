declare const _default: {
  title: string;
  component: string;
  parameters: {
    actions: {
      handles: string[];
    };
  };
  argTypes: {
    schema: {
      control: {
        type: string;
      };
    };
    values: {
      control: {
        type: string;
      };
    };
    variant: {
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
  (args: Record<string, any>): string;
  args: {
    values: {};
    disabled: boolean;
    isSaving: boolean;
    isOpen: boolean;
    layout: string;
    variant: string;
    schema: {
      type: string;
      required: string[];
      properties: {
        name: {
          type: string;
        };
        favoriteAnimal: {
          type: string;
          enum: string[];
        };
        additionalInfo: {
          type: string;
        };
      };
    };
    uiSchema: {
      type: string;
      elements: ({
        scope: string;
        label: string;
        type: string;
        options?: undefined;
      } | {
        scope: string;
        label: string;
        type: string;
        options: {
          control: string;
          helperText: {
            label: string;
          };
          type?: undefined;
        };
      } | {
        scope: string;
        label: string;
        type: string;
        options: {
          control: string;
          type: string;
          helperText: {
            label: string;
          };
        };
      })[];
    };
  };
  storyName: string;
};
