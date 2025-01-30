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
    disabled: boolean;
    variant: string;
    schema: {
      type: string;
      properties: {
        input: {
          type: string;
        };
        textArea: {
          type: string;
        };
        richText: {
          type: string;
        };
        select: {
          type: string;
          enum: string[];
        };
        multiselect: {
          type: string;
        };
        color: {
          type: string;
        };
        date: {
          type: string;
          format: string;
        };
        datePicker: {
          type: string;
          format: string;
        };
        switch: {
          type: string;
        };
        radio: {
          type: string;
          enum: string[];
        };
        radioGroup: {
          type: string;
          enum: string[];
        };
        checkboxGroup: {
          type: string;
          items: {
            type: string;
            enum: string[];
          };
        };
        alignment: {
          type: string;
        };
        location: {
          type: string;
        };
      };
    };
    uiSchema: {
      type: string;
      elements: ({
        label: string;
        scope: string;
        type: string;
        options: {
          control: string;
          type?: undefined;
          enum?: undefined;
          extent?: undefined;
          options?: undefined;
          notice?: undefined;
        };
      } | {
        label: string;
        scope: string;
        type: string;
        options: {
          control: string;
          type: string;
          enum?: undefined;
          extent?: undefined;
          options?: undefined;
          notice?: undefined;
        };
      } | {
        label: string;
        scope: string;
        type: string;
        options: {
          control: string;
          enum: {
            i18nScope: string;
          };
          type?: undefined;
          extent?: undefined;
          options?: undefined;
          notice?: undefined;
        };
      } | {
        label: string;
        scope: string;
        type: string;
        options: {
          control: string;
          extent: {
            xmin: number;
            ymin: number;
            xmax: number;
            ymax: number;
            type: string;
            spatialReference: {
              wkid: number;
            };
          };
          options: ({
            label: string;
            location: {
              type: string;
              extent?: undefined;
              spatialReference?: undefined;
            };
            description?: undefined;
            selected?: undefined;
          } | {
            label: string;
            description: string;
            selected: boolean;
            location: {
              type: string;
              extent: number[][];
              spatialReference: {
                wkid: number;
              };
            };
          } | {
            label: string;
            description: string;
            location: {
              type: string;
              extent: number[][];
              spatialReference: {
                wkid: number;
              };
            };
            selected?: undefined;
          })[];
          type?: undefined;
          enum?: undefined;
          notice?: undefined;
        };
      } | {
        label: string;
        type: string;
        options: {
          notice: {
            configuration: {
              id: string;
              noticeType: string;
              closable: boolean;
              kind: string;
              scale: string;
            };
            title: string;
            message: string;
          };
          control?: undefined;
          type?: undefined;
          enum?: undefined;
          extent?: undefined;
          options?: undefined;
        };
        scope?: undefined;
      })[];
    };
    values: {
      input: string;
      textArea: string;
      richText: string;
      select: string;
      multiselect: string[];
      color: string;
      date: string;
      switch: boolean;
      radio: string;
      radioGroup: string;
      checkboxGroup: string[];
      alignment: string;
      characterRestrictions: string;
      timeline: {
        title: string;
        description: string;
        stages: {
          title: string;
          timeframe: string;
          stageDescription: string;
          link: {
            href: string;
            title: string;
          };
          status: string;
          key: number;
        }[];
      };
    };
  };
  storyName: string;
};
export declare const BasicSections: {
  (args: any): string;
  storyName: string;
  args: {
    schema: {
      required: string[];
      type: string;
      properties: {
        name: {
          type: string;
        };
        mission: {
          type: string;
        };
        description: {
          type: string;
        };
        access: {
          type: string;
          enum: string[];
        };
      };
    };
    uiSchema: {
      type: string;
      elements: ({
        type: string;
        label: string;
        options: {
          headerTag: string;
        };
        elements: ({
          label: string;
          scope: string;
          type: string;
          options?: undefined;
        } | {
          label: string;
          scope: string;
          type: string;
          options: {
            control: string;
            type: string;
            helperText: {
              label: string;
            };
          };
        })[];
      } | {
        type: string;
        label: string;
        elements: {
          label: string;
          scope: string;
          type: string;
          options: {
            control: string;
          };
        }[];
        options?: undefined;
      })[];
    };
    values: {};
    disabled: boolean;
    variant: string;
  };
};
export declare const BlockSections: {
  (args: any): string;
  storyName: string;
  args: {
    schema: {
      required: string[];
      type: string;
      properties: {
        name: {
          type: string;
        };
        mission: {
          type: string;
        };
        description: {
          type: string;
        };
        tagline: {
          type: string;
        };
        allowLink: {
          type: string;
        };
        linkUrl: {
          type: string;
        };
        linkTitle: {
          type: string;
        };
        access: {
          type: string;
          enum: string[];
        };
      };
    };
    uiSchema: {
      type: string;
      elements: ({
        type: string;
        label: string;
        options: {
          section: string;
          open: boolean;
        };
        elements: ({
          label: string;
          scope: string;
          type: string;
          options?: undefined;
          elements?: undefined;
        } | {
          label: string;
          scope: string;
          type: string;
          options: {
            control: string;
            type: string;
            helperText: {
              label: string;
            };
            section?: undefined;
          };
          elements?: undefined;
        } | {
          type: string;
          label: string;
          options: {
            section: string;
            control?: undefined;
            type?: undefined;
            helperText?: undefined;
          };
          elements: ({
            label: string;
            scope: string;
            type: string;
            options: {
              control: string;
              section?: undefined;
              toggleDisplay?: undefined;
            };
            elements?: undefined;
          } | {
            label: string;
            scope: string;
            type: string;
            options: {
              section: string;
              toggleDisplay: string;
              control?: undefined;
            };
            elements: {
              label: string;
              scope: string;
              type: string;
            }[];
          })[];
          scope?: undefined;
        })[];
      } | {
        type: string;
        label: string;
        options: {
          section: string;
          open?: undefined;
        };
        elements: {
          label: string;
          scope: string;
          type: string;
          options: {
            control: string;
          };
        }[];
      })[];
    };
    values: {};
    disabled: boolean;
    variant: string;
  };
};
export declare const SteppedSections: {
  (args: any): string;
  storyName: string;
  args: {
    schema: {
      required: string[];
      type: string;
      properties: {
        name: {
          type: string;
        };
        mission: {
          type: string;
        };
        description: {
          type: string;
        };
        access: {
          type: string;
          enum: string[];
        };
      };
    };
    uiSchema: {
      type: string;
      elements: {
        type: string;
        options: {
          section: string;
          scale: string;
        };
        elements: ({
          type: string;
          label: string;
          elements: ({
            label: string;
            scope: string;
            type: string;
            options?: undefined;
          } | {
            label: string;
            scope: string;
            type: string;
            options: {
              control: string;
              type: string;
              helperText: {
                label: string;
              };
            };
          })[];
          rule?: undefined;
        } | {
          type: string;
          label: string;
          rule: {
            effect: string;
            condition: {
              scope: string;
              schema: {
                const: string;
              };
            };
          };
          elements: {
            label: string;
            scope: string;
            type: string;
            options: {
              control: string;
            };
          }[];
        })[];
      }[];
    };
    values: {};
    disabled: boolean;
    variant: string;
  };
};
export declare const AccordionSections: {
  (args: any): string;
  storyName: string;
  args: {
    schema: {
      required: string[];
      type: string;
      properties: {
        name: {
          type: string;
        };
        mission: {
          type: string;
        };
        description: {
          type: string;
        };
        access: {
          type: string;
          enum: string[];
        };
      };
    };
    uiSchema: {
      type: string;
      elements: {
        type: string;
        options: {
          section: string;
          scale: string;
        };
        elements: ({
          type: string;
          label: string;
          elements: ({
            label: string;
            scope: string;
            type: string;
            options?: undefined;
          } | {
            label: string;
            scope: string;
            type: string;
            options: {
              control: string;
              type: string;
              helperText: {
                label: string;
              };
            };
          })[];
          rule?: undefined;
        } | {
          type: string;
          label: string;
          rule: {
            effect: string;
            condition: {
              scope: string;
              schema: {
                const: string;
              };
            };
          };
          elements: {
            label: string;
            scope: string;
            type: string;
            options: {
              control: string;
            };
          }[];
        })[];
      }[];
    };
    values: {};
    disabled: boolean;
    variant: string;
  };
};
export declare const CardSections: {
  (args: any): string;
  storyName: string;
  args: {
    schema: {
      required: string[];
      type: string;
      properties: {
        name: {
          type: string;
        };
        mission: {
          type: string;
        };
        description: {
          type: string;
        };
        access: {
          type: string;
          enum: string[];
        };
      };
    };
    uiSchema: {
      type: string;
      elements: ({
        type: string;
        label: string;
        options: {
          section: string;
        };
        elements: ({
          label: string;
          scope: string;
          type: string;
          options?: undefined;
        } | {
          label: string;
          scope: string;
          type: string;
          options: {
            control: string;
            type: string;
            helperText: {
              label: string;
            };
          };
        })[];
      } | {
        type: string;
        label: string;
        options: {
          section: string;
        };
        elements: {
          label: string;
          scope: string;
          type: string;
          options: {
            control: string;
          };
        }[];
      })[];
    };
    values: {};
    disabled: boolean;
    variant: string;
  };
};
