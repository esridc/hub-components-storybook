declare const _default: {
  title: string;
  component: string;
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
    modalTitle: string;
    open: boolean;
    sourceLabel: string;
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
      field: string;
      options: any[];
      operation: string;
      aggLimit: number;
    } | {
      label: string;
      key: string;
      display: string;
      field: string;
      options: any[];
      operation: string;
      aggLimit?: undefined;
    })[];
    currentSelection: {
      item: string[];
      group: any[];
      user: any[];
      groupMember: any[];
      event: any[];
    };
    showSelection: boolean;
    showSearch: boolean;
    showThumbnail: boolean;
    limit: number;
  };
  storyName: string;
};
