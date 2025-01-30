export declare const initialState: {
  tag: string;
  component: string;
  configurationValues: {};
  selectedGroupIds: any[];
  stepIndex: number;
  componentArgs: {
    schema: {
      $async: boolean;
      type: string;
      required: string[];
      properties: {
        name: {
          type: string;
          minLength: number;
          maxLength: number;
          format: string;
        };
        slug: {
          type: string;
          pattern: string;
        };
      };
    };
    scale: string;
    uiSchema: {
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
          helperText?: undefined;
        };
      } | {
        labelKey: string;
        scope: string;
        type: string;
        options: {
          control: string;
          helperText: {
            labelKey: string;
          };
          messages: {
            type: string;
            keyword: string;
            icon: boolean;
            labelKey: string;
          }[];
        };
      })[];
    };
    values: {
      name: string;
      slug: string;
    };
  };
  helpStateProps: {
    heading: string;
    icon: string;
    isMain: boolean;
  };
  steps: {
    labelKey: string;
    complete: boolean;
    disabled: boolean;
    error: boolean;
  }[];
  controls: {
    back: {
      visible: boolean;
      labelKey: string;
    };
    selection: {
      visible: boolean;
      count: number;
    };
    next: {
      visible: boolean;
      disabled: boolean;
      labelKey: string;
    };
    cancel: {
      visible: boolean;
      labelKey: string;
    };
    close: {
      visible: boolean;
      disabled: boolean;
      labelKey: string;
    };
  };
};
export declare const selectGroupsState: {
  tag: string;
  component: string;
  selectedGroupIds: any[];
  stepIndex: number;
  componentArgs: {
    corners: string;
    gallerySelection: {
      group: any[];
    };
    layout: string;
    limit: number;
    linkTarget: string;
    newTab: boolean;
    query: {
      targetEntity: string;
      filters: {
        predicates: {
          searchUserAccess: string;
          searchUserName: string;
          id: string[];
        }[];
      }[];
    };
    selectionMode: string;
    showLayoutSwitcher: boolean;
    showMoreResultsBtn: boolean;
    showResultsCount: boolean;
    showSearch: boolean;
    showSelection: boolean;
    showSort: boolean;
    state: {};
  };
  configurationValues: {
    valid: boolean;
    values: {
      name: string;
      slug: string;
    };
    schema: {
      $async: boolean;
      type: string;
      required: string[];
      properties: {
        name: {
          type: string;
          minLength: number;
          maxLength: number;
          format: string;
          title: string;
        };
        slug: {
          type: string;
          pattern: string;
          title: string;
        };
      };
    };
    required: {};
  };
  steps: {
    labelKey: string;
    complete: boolean;
    disabled: boolean;
    error: boolean;
  }[];
  controls: {
    back: {
      visible: boolean;
      labelKey: string;
    };
    selection: {
      visible: boolean;
      count: number;
    };
    next: {
      visible: boolean;
      disabled: boolean;
      labelKey: string;
    };
    cancel: {
      visible: boolean;
      labelKey: string;
    };
    close: {
      visible: boolean;
      disabled: boolean;
      labelKey: string;
    };
  };
};
export declare const workingState: {
  tag: string;
  componentArgs: {
    state: string;
    headingKey: string;
    loadingLabel: string;
  };
  stepIndex: number;
  configurationValues: {
    valid: boolean;
    values: {
      name: string;
      slug: string;
    };
    schema: {
      $async: boolean;
      type: string;
      required: string[];
      properties: {
        name: {
          type: string;
          minLength: number;
          maxLength: number;
          format: string;
          title: string;
        };
        slug: {
          type: string;
          pattern: string;
          title: string;
        };
      };
    };
    required: {};
  };
  selectedGroupIds: string[];
  steps: {
    labelKey: string;
    complete: boolean;
    disabled: boolean;
    error: boolean;
  }[];
  controls: {
    back: {
      visible: boolean;
      labelKey: string;
    };
    selection: {
      visible: boolean;
      count: number;
    };
    next: {
      visible: boolean;
      disabled: boolean;
      labelKey: string;
    };
    cancel: {
      visible: boolean;
      labelKey: string;
    };
    close: {
      visible: boolean;
      disabled: boolean;
      labelKey: string;
    };
  };
};
export declare const confirmationState: {
  tag: string;
  component: string;
  stepIndex: number;
  componentArgs: {
    results: {
      overallStatus: string;
      groups: {
        name: string;
        summary: string;
        access: string;
        autoJoin: boolean;
        description: string;
        id: string;
        isInvitationOnly: boolean;
        isReadOnly: boolean;
        isViewOnly: boolean;
        owner: string;
        orgId: string;
        protected: boolean;
        sortField: string;
        sortOrder: string;
        tags: string[];
        typeKeywords: any[];
        userMembership: {
          username: string;
          memberType: string;
          applications: number;
        };
        hiddenMembers: boolean;
        leavingDisallowed: boolean;
        thumbnailUrl: any;
        createdDate: string;
        createdDateSource: string;
        updatedDate: string;
        updatedDateSource: string;
        type: string;
        isDiscussable: boolean;
        isSharedUpdate: boolean;
        memberType: string;
        membershipAccess: string;
        canEdit: boolean;
        canDelete: boolean;
        links: {
          self: string;
          siteRelative: string;
          siteRelativeEntityType: string;
          workspaceRelative: string;
          thumbnail: any;
        };
      }[];
      entities: {
        name: string;
        permissions: any[];
        schemaVersion: number;
        tags: string[];
        typeKeywords: string[];
        view: {
          contacts: any[];
          featuredContentIds: any[];
          showMap: boolean;
        };
        layout: {
          sections: any[];
        };
        isDiscussable: boolean;
        access: string;
        created: number;
        culture: string;
        extent: any[];
        id: string;
        itemControl: string;
        modified: number;
        owner: string;
        categories: any[];
        type: string;
        thumbnail: string;
        slug: string;
        orgUrlKey: string;
        canEdit: boolean;
        canDelete: boolean;
        canRecycle: boolean;
        protected: boolean;
        createdDate: string;
        createdDateSource: string;
        updatedDate: string;
        updatedDateSource: string;
        location: {
          type: string;
        };
        thumbnailUrl: string;
        links: {
          self: string;
          siteRelative: string;
          siteRelativeEntityType: string;
          workspaceRelative: string;
          thumbnail: string;
          layoutRelative: string;
        };
        features: {};
      }[];
      results: {
        id: string;
        groupId: string;
        status: string;
      }[];
      receipts: {
        group: {
          name: string;
          summary: string;
          access: string;
          autoJoin: boolean;
          description: string;
          id: string;
          isInvitationOnly: boolean;
          isReadOnly: boolean;
          isViewOnly: boolean;
          owner: string;
          orgId: string;
          protected: boolean;
          sortField: string;
          sortOrder: string;
          tags: string[];
          typeKeywords: any[];
          userMembership: {
            username: string;
            memberType: string;
            applications: number;
          };
          hiddenMembers: boolean;
          leavingDisallowed: boolean;
          thumbnailUrl: any;
          createdDate: string;
          createdDateSource: string;
          updatedDate: string;
          updatedDateSource: string;
          type: string;
          isDiscussable: boolean;
          isSharedUpdate: boolean;
          memberType: string;
          membershipAccess: string;
          canEdit: boolean;
          canDelete: boolean;
          links: {
            self: string;
            siteRelative: string;
            siteRelativeEntityType: string;
            workspaceRelative: string;
            thumbnail: any;
          };
        };
        targetEntity: string;
        success: string[];
        successQuery: {
          targetEntity: string;
          filters: {
            predicates: {
              id: string[];
            }[];
          }[];
        };
        fail: any[];
        failQuery: {
          targetEntity: string;
          filters: {
            predicates: {
              id: any[];
            }[];
          }[];
        };
      }[];
    };
    icon: string;
    helpStateConfig: {
      heading: string;
      icon: string;
      kind: string;
      isMain: boolean;
    };
  };
  steps: {
    labelKey: string;
    complete: boolean;
    disabled: boolean;
    error: boolean;
  }[];
  controls: {
    back: {
      visible: boolean;
      labelKey: string;
    };
    selection: {
      visible: boolean;
      count: number;
    };
    next: {
      visible: boolean;
      disabled: boolean;
      labelKey: string;
    };
    cancel: {
      visible: boolean;
      labelKey: string;
    };
    close: {
      visible: boolean;
      disabled: boolean;
      labelKey: string;
    };
  };
};
export declare const failureState: {
  tag: string;
  configurationValues: {
    valid: boolean;
    values: {
      name: string;
      slug: string;
    };
    schema: {
      $async: boolean;
      type: string;
      required: string[];
      properties: {
        name: {
          type: string;
          minLength: number;
          maxLength: number;
          format: string;
          title: string;
        };
        slug: {
          type: string;
          pattern: string;
          title: string;
        };
      };
    };
    required: {};
  };
  selectedGroupIds: string[];
  stepIndex: number;
  componentArgs: {
    actionKey: string;
    headingKey: string;
    icon: string;
    kind: string;
    messageKey: string;
  };
  steps: {
    labelKey: string;
    complete: boolean;
    disabled: boolean;
    error: boolean;
  }[];
  controls: {
    back: {
      visible: boolean;
      labelKey: string;
    };
    selection: {
      visible: boolean;
      count: number;
    };
    next: {
      visible: boolean;
      disabled: boolean;
      labelKey: string;
    };
    cancel: {
      visible: boolean;
      labelKey: string;
    };
    close: {
      visible: boolean;
      disabled: boolean;
      labelKey: string;
    };
  };
};
