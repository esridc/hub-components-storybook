declare const _default: {
  title: string;
  component: string;
  parameters: {
    actions: {
      handles: string[];
    };
  };
  decorators: any[];
  argTypes: {
    catalogs: {
      control: {
        type: string;
      };
    };
    facets: {
      control: {
        type: string;
      };
    };
  };
};
export default _default;
export declare const Default: {
  (args: any): string;
  args: {
    layout: string;
    showSearch: boolean;
    sourceLabel: string;
    cardActionLinks: {
      action: string;
      label: string;
      showLabel: boolean;
      buttonStyle: string;
    }[];
    catalogs: ({
      schemaVersion: number;
      title: string;
      scopes: {
        item: {
          targetEntity: string;
          filters: {
            predicates: {
              owner: string;
            }[];
          }[];
        };
      };
      collections: ({
        label: string;
        key: string;
        targetEntity: string;
        include: any[];
        scope: {
          targetEntity: string;
          filters: {
            operation: string;
            predicates: ({
              type: {
                any: string[];
                not: string[];
              };
              typekeywords: {
                not: string[];
              };
            } | {
              type: string;
              typekeywords: string;
            })[];
          }[];
        };
      } | {
        label: string;
        key: string;
        targetEntity: string;
        include: any[];
        scope: {
          targetEntity: string;
          filters: {
            predicates: {
              type: string;
            }[];
          }[];
        };
      })[];
    } | {
      schemaVersion: number;
      title: string;
      scopes: {
        item: {
          targetEntity: string;
          filters: {
            predicates: {
              access: string;
            }[];
          }[];
        };
      };
      collections: ({
        label: string;
        key: string;
        targetEntity: string;
        include: any[];
        scope: {
          targetEntity: string;
          filters: {
            operation: string;
            predicates: ({
              type: {
                any: string[];
                not: string[];
              };
              typekeywords: {
                not: string[];
              };
            } | {
              type: string;
              typekeywords: string;
            })[];
          }[];
        };
      } | {
        label: string;
        key: string;
        targetEntity: string;
        include: any[];
        scope: {
          targetEntity: string;
          filters: {
            predicates: {
              type: string;
            }[];
          }[];
        };
      })[];
    })[];
    facets: ({
      label: string;
      key: string;
      display: string;
      operation: string;
      options: ({
        label: string;
        key: string;
        selected: boolean;
        predicates: {
          access: string;
        }[];
      } | {
        label: string;
        key: string;
        selected: boolean;
        predicates: {
          owner: string;
        }[];
      })[];
      pageSize?: undefined;
    } | {
      label: string;
      key: string;
      display: string;
      pageSize: number;
      operation: string;
      options: ({
        label: string;
        key: string;
        selected: boolean;
        predicates: {
          type: string;
        }[];
        operation?: undefined;
      } | {
        label: string;
        key: string;
        selected: boolean;
        predicates: {
          type: string[];
        }[];
        operation?: undefined;
      } | {
        label: string;
        key: string;
        selected: boolean;
        predicates: {
          type: {
            any: string[];
            not: string[];
          };
          typekeywords: {
            not: string[];
          };
        }[];
        operation?: undefined;
      } | {
        label: string;
        key: string;
        selected: boolean;
        operation: string;
        predicates: ({
          type: string;
          typekeywords?: undefined;
        } | {
          type: string;
          typekeywords: string;
        })[];
      } | {
        label: string;
        key: string;
        selected: boolean;
        predicates: {
          type: string;
          typekeywords: {
            any: string[];
            not: string[];
          };
        }[];
        operation?: undefined;
      } | {
        label: string;
        key: string;
        selected: boolean;
        predicates: {
          typekeywords: {
            any: string[];
            not: string[];
          };
          type: {
            any: string[];
            not: string[];
          };
        }[];
        operation?: undefined;
      })[];
    })[];
  };
  storyName: string;
};
