export const initialState = {
  tag: "SpecifyInfo",
  component: "arcgis-configuration-editor",
  configurationValues: {},
  selectedGroupIds: [],
  stepIndex: 0,
  componentArgs: {
    schema: {
      $async: true,
      type: "object",
      required: [
        "name",
        "slug"
      ],
      properties: {
        name: {
          type: "string",
          minLength: 1,
          maxLength: 250,
          format: "entityTitleValidator"
        },
        slug: {
          type: "string",
          pattern: "^[a-z0-9]+(?:-[a-z0-9]+-*)*$"
        }
      }
    },
    scale: "l",
    uiSchema: {
      type: "Layout",
      elements: [
        {
          labelKey: "form.title.label",
          scope: "/properties/name",
          type: "Control",
          options: {
            messages: [
              {
                type: "ERROR",
                keyword: "required",
                icon: true,
                labelKey: "form.title.requiredError"
              },
              {
                type: "ERROR",
                keyword: "format",
                icon: true,
                labelKey: "form.title.entityTitleValidatorError"
              }
            ]
          }
        },
        {
          labelKey: "form.slug.label",
          scope: "/properties/slug",
          type: "Control",
          options: {
            control: "hub-field-input-input",
            helperText: {
              labelKey: "form.slug.helperText"
            },
            messages: [
              {
                type: "ERROR",
                keyword: "pattern",
                icon: true,
                labelKey: "form.slug.patternError"
              },
              {
                type: "ERROR",
                keyword: "required",
                icon: true,
                labelKey: "form.slug.requiredError"
              }
            ]
          }
        }
      ]
    },
    values: {
      name: "Jupe Page Migration Test",
      slug: "jupe-page-migration-test"
    }
  },
  helpStateProps: {
    heading: "Page information",
    icon: "file-text",
    isMain: false
  },
  steps: [
    {
      labelKey: "steps.specifyInfo",
      complete: false,
      disabled: false,
      error: false
    },
    {
      labelKey: "steps.selectGroups",
      complete: false,
      disabled: true,
      error: false
    },
    {
      labelKey: "steps.confirmation",
      complete: false,
      disabled: true,
      error: false
    }
  ],
  controls: {
    back: {
      visible: false,
      labelKey: "controls.back"
    },
    selection: {
      visible: false,
      count: 0
    },
    next: {
      visible: true,
      disabled: true,
      labelKey: "controls.next"
    },
    cancel: {
      visible: true,
      labelKey: "controls.cancel"
    },
    close: {
      visible: false,
      disabled: false,
      labelKey: "controls.close"
    }
  }
};
export const selectGroupsState = {
  tag: "SelectGroups",
  component: "arcgis-hub-gallery",
  selectedGroupIds: [],
  stepIndex: 1,
  componentArgs: {
    corners: "round",
    gallerySelection: {
      group: []
    },
    layout: "grid",
    limit: 8,
    linkTarget: "siteRelative",
    newTab: true,
    query: {
      targetEntity: "group",
      filters: [
        {
          predicates: [
            {
              searchUserAccess: "groupMember",
              searchUserName: "jupe_pa",
              id: [
                "4a9c8ce6b1514a99b54d5872ee1488a9"
              ]
            }
          ]
        }
      ]
    },
    selectionMode: "multiple",
    showLayoutSwitcher: true,
    showMoreResultsBtn: true,
    showResultsCount: true,
    showSearch: true,
    showSelection: true,
    showSort: true,
    state: {}
  },
  configurationValues: {
    valid: true,
    values: {
      name: "Jupe Page Migration Test",
      slug: "jupe-page-migration-test"
    },
    schema: {
      $async: true,
      type: "object",
      required: [
        "name",
        "slug"
      ],
      properties: {
        name: {
          type: "string",
          minLength: 1,
          maxLength: 250,
          format: "entityTitleValidator",
          title: "Page name"
        },
        slug: {
          type: "string",
          pattern: "^[a-z0-9]+(?:-[a-z0-9]+-*)*$",
          title: "Slug"
        }
      }
    },
    required: {}
  },
  steps: [
    {
      labelKey: "steps.specifyInfo",
      complete: true,
      disabled: false,
      error: false
    },
    {
      labelKey: "steps.selectGroups",
      complete: false,
      disabled: false,
      error: false
    },
    {
      labelKey: "steps.confirmation",
      complete: false,
      disabled: true,
      error: false
    }
  ],
  controls: {
    back: {
      visible: true,
      labelKey: "controls.back"
    },
    selection: {
      visible: true,
      count: 0
    },
    next: {
      visible: true,
      disabled: true,
      labelKey: "controls.migrate"
    },
    cancel: {
      visible: true,
      labelKey: "controls.cancel"
    },
    close: {
      visible: false,
      disabled: false,
      labelKey: "controls.close"
    }
  }
};
export const workingState = {
  tag: "Working",
  componentArgs: {
    state: "loading",
    headingKey: "working.heading",
    loadingLabel: "working.loadingLabel"
  },
  stepIndex: 2,
  configurationValues: {
    valid: true,
    values: {
      name: "Jupe Page Migration Test",
      slug: "jupe-page-migration-test"
    },
    schema: {
      $async: true,
      type: "object",
      required: ["name", "slug"],
      properties: {
        name: {
          type: "string",
          minLength: 1,
          maxLength: 250,
          format: "entityTitleValidator",
          title: "Page name"
        },
        slug: {
          type: "string",
          pattern: "^[a-z0-9]+(?:-[a-z0-9]+-*)*$",
          title: "Slug"
        }
      }
    },
    required: {}
  },
  selectedGroupIds: ["4a9c8ce6b1514a99b54d5872ee1488a9"],
  steps: [
    {
      labelKey: "steps.specifyInfo",
      complete: true,
      disabled: true,
      error: false
    },
    {
      labelKey: "steps.selectGroups",
      complete: true,
      disabled: true,
      error: false
    },
    {
      labelKey: "steps.confirmation",
      complete: false,
      disabled: false,
      error: false
    }
  ],
  controls: {
    back: {
      visible: false,
      labelKey: "controls.back"
    },
    selection: {
      visible: false,
      count: 1
    },
    next: {
      visible: false,
      disabled: true,
      labelKey: "controls.next"
    },
    cancel: {
      visible: false,
      labelKey: "controls.cancel"
    },
    close: {
      visible: true,
      disabled: true,
      labelKey: "controls.close"
    }
  }
};
export const confirmationState = {
  tag: "Confirmation",
  component: "arcgis-hub-page-migration-results",
  stepIndex: 2,
  componentArgs: {
    results: {
      overallStatus: "success",
      groups: [
        {
          name: "Custom Domain Premium Alpha Content 1",
          summary: "Applications, maps, data, etc. shared with this group generates the custom-1-qa-pre-a-hub content catalog.",
          access: "public",
          autoJoin: false,
          description: "Use this group to organize the items that you want to share as part of your initiative. Shared items become available in your initiative's search results and only people who have access to these items will be able to find them. Members of the core team get access to shared items and can update them at any time. Certain cards, like the Gallery card, will automatically populate with shared items so that you don't have to search for them when choosing what you want to display on your site.<br /><br />Contact support with any questions related to this group or content management for your site.<br /><br /><strong>DO NOT DELETE THIS GROUP.</strong>",
          id: "4a9c8ce6b1514a99b54d5872ee1488a9",
          isInvitationOnly: false,
          isReadOnly: false,
          isViewOnly: false,
          owner: "thervey_qa_pre_a_hub",
          orgId: "Xj56SBi2udA78cC9",
          protected: true,
          sortField: "modified",
          sortOrder: "desc",
          tags: [
            "Hub Group",
            "Hub Content Group",
            "Hub Site Group",
            "Hub Initiative Group"
          ],
          typeKeywords: [],
          userMembership: {
            username: "jupe_pa",
            memberType: "admin",
            applications: 0
          },
          hiddenMembers: false,
          leavingDisallowed: false,
          thumbnailUrl: null,
          createdDate: "2023-07-24T15:36:32.000Z",
          createdDateSource: "group.created",
          updatedDate: "2024-05-15T21:11:34.000Z",
          updatedDateSource: "group.modified",
          type: "Group",
          isDiscussable: true,
          isSharedUpdate: false,
          memberType: "admin",
          membershipAccess: "anyone",
          canEdit: true,
          canDelete: true,
          links: {
            self: "https://qa-pre-a-hub.mapsqa.arcgis.com/home/group.html?id=4a9c8ce6b1514a99b54d5872ee1488a9",
            siteRelative: "/groups/4a9c8ce6b1514a99b54d5872ee1488a9",
            siteRelativeEntityType: "",
            workspaceRelative: "/workspace/groups/4a9c8ce6b1514a99b54d5872ee1488a9",
            thumbnail: null
          }
        }
      ],
      entities: [
        {
          name: "Jupe Page Migration Test",
          permissions: [],
          schemaVersion: 1,
          tags: [
            ""
          ],
          typeKeywords: [
            "Hub",
            "hubPage",
            "OpenData",
            "slug|jupe-page-migration-test"
          ],
          view: {
            contacts: [],
            featuredContentIds: [],
            showMap: true
          },
          layout: {
            sections: []
          },
          isDiscussable: true,
          access: "shared",
          created: 1734370289000,
          culture: "en-us",
          extent: [],
          id: "c0f79cf2db184dd08aeb17e19b8eaccd",
          itemControl: "admin",
          modified: 1734536156000,
          owner: "jupe_pa",
          categories: [],
          type: "Hub Page",
          thumbnail: "thumbnail/ago_downloaded.png",
          slug: "jupe-page-migration-test",
          orgUrlKey: "qa-pre-a-hub",
          canEdit: true,
          canDelete: true,
          canRecycle: false,
          protected: false,
          createdDate: "2024-12-16T17:31:29.000Z",
          createdDateSource: "item.created",
          updatedDate: "2024-12-18T15:35:56.000Z",
          updatedDateSource: "item.modified",
          location: {
            type: "none"
          },
          thumbnailUrl: "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/c0f79cf2db184dd08aeb17e19b8eaccd/info/thumbnail/ago_downloaded.png?token=A9c8WvJvIVAxBi3eaqXqiWCUah_a6vZHayBnw0WO5noO2Ed1H4tSnGO8fYm-Nq8S1JVTReLwyoQjxvPmSe1MNYTrBq9z63ozLzrPtiUK0WnF2wj9N_fzNwP-BfJXZs8yHlDv8YkcOmTpPCEv-HVXQg3InB3qBN4jm1oevBAoRsbHxBtqYzxBhdU_Yr2em57cCasfrtfOxACXIk62OxcNSbPIirpJDRjWTzf0Ji4vwRI.",
          links: {
            self: "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=c0f79cf2db184dd08aeb17e19b8eaccd",
            siteRelative: "/pages/jupe-page-migration-test~c0f79cf2db184dd08aeb17e19b8eaccd",
            siteRelativeEntityType: "",
            workspaceRelative: "/workspace/pages/c0f79cf2db184dd08aeb17e19b8eaccd",
            thumbnail: "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/c0f79cf2db184dd08aeb17e19b8eaccd/info/thumbnail/ago_downloaded.png?token=A9c8WvJvIVAxBi3eaqXqiWCUah_a6vZHayBnw0WO5noO2Ed1H4tSnGO8fYm-Nq8S1JVTReLwyoQjxvPmSe1MNYTrBq9z63ozLzrPtiUK0WnF2wj9N_fzNwP-BfJXZs8yHlDv8YkcOmTpPCEv-HVXQg3InB3qBN4jm1oevBAoRsbHxBtqYzxBhdU_Yr2em57cCasfrtfOxACXIk62OxcNSbPIirpJDRjWTzf0Ji4vwRI.",
            layoutRelative: "/pages/c0f79cf2db184dd08aeb17e19b8eaccd/edit"
          },
          features: {}
        }
      ],
      results: [
        {
          id: "c0f79cf2db184dd08aeb17e19b8eaccd",
          groupId: "4a9c8ce6b1514a99b54d5872ee1488a9",
          status: "success"
        }
      ],
      receipts: [
        {
          group: {
            name: "Custom Domain Premium Alpha Content 1",
            summary: "Applications, maps, data, etc. shared with this group generates the custom-1-qa-pre-a-hub content catalog.",
            access: "public",
            autoJoin: false,
            description: "Use this group to organize the items that you want to share as part of your initiative. Shared items become available in your initiative's search results and only people who have access to these items will be able to find them. Members of the core team get access to shared items and can update them at any time. Certain cards, like the Gallery card, will automatically populate with shared items so that you don't have to search for them when choosing what you want to display on your site.<br /><br />Contact support with any questions related to this group or content management for your site.<br /><br /><strong>DO NOT DELETE THIS GROUP.</strong>",
            id: "4a9c8ce6b1514a99b54d5872ee1488a9",
            isInvitationOnly: false,
            isReadOnly: false,
            isViewOnly: false,
            owner: "thervey_qa_pre_a_hub",
            orgId: "Xj56SBi2udA78cC9",
            protected: true,
            sortField: "modified",
            sortOrder: "desc",
            tags: [
              "Hub Group",
              "Hub Content Group",
              "Hub Site Group",
              "Hub Initiative Group"
            ],
            typeKeywords: [],
            userMembership: {
              username: "jupe_pa",
              memberType: "admin",
              applications: 0
            },
            hiddenMembers: false,
            leavingDisallowed: false,
            thumbnailUrl: null,
            createdDate: "2023-07-24T15:36:32.000Z",
            createdDateSource: "group.created",
            updatedDate: "2024-05-15T21:11:34.000Z",
            updatedDateSource: "group.modified",
            type: "Group",
            isDiscussable: true,
            isSharedUpdate: false,
            memberType: "admin",
            membershipAccess: "anyone",
            canEdit: true,
            canDelete: true,
            links: {
              self: "https://qa-pre-a-hub.mapsqa.arcgis.com/home/group.html?id=4a9c8ce6b1514a99b54d5872ee1488a9",
              siteRelative: "/groups/4a9c8ce6b1514a99b54d5872ee1488a9",
              siteRelativeEntityType: "",
              workspaceRelative: "/workspace/groups/4a9c8ce6b1514a99b54d5872ee1488a9",
              thumbnail: null
            }
          },
          targetEntity: "item",
          success: [
            "c0f79cf2db184dd08aeb17e19b8eaccd"
          ],
          successQuery: {
            targetEntity: "item",
            filters: [
              {
                predicates: [
                  {
                    id: [
                      "c0f79cf2db184dd08aeb17e19b8eaccd"
                    ]
                  }
                ]
              }
            ]
          },
          fail: [],
          failQuery: {
            targetEntity: "item",
            filters: [
              {
                predicates: [
                  {
                    id: []
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    icon: "check-circle",
    helpStateConfig: {
      heading: "successHeading",
      icon: "check-circle",
      kind: "success",
      isMain: false
    }
  },
  steps: [
    {
      labelKey: "steps.specifyInfo",
      complete: true,
      disabled: true,
      error: false
    },
    {
      labelKey: "steps.selectGroups",
      complete: true,
      disabled: true,
      error: false
    },
    {
      labelKey: "steps.confirmation",
      complete: true,
      disabled: false,
      error: false
    }
  ],
  controls: {
    back: {
      visible: false,
      labelKey: "controls.back"
    },
    selection: {
      visible: false,
      count: 0
    },
    next: {
      visible: false,
      disabled: true,
      labelKey: "controls.next"
    },
    cancel: {
      visible: false,
      labelKey: "controls.cancel"
    },
    close: {
      visible: true,
      disabled: false,
      labelKey: "controls.close"
    }
  }
};
export const failureState = {
  tag: "Failure",
  configurationValues: {
    valid: true,
    values: {
      name: "Jupe Page Migration Test",
      slug: "jupe-page-migration-test"
    },
    schema: {
      $async: true,
      type: "object",
      required: [
        "name",
        "slug"
      ],
      properties: {
        name: {
          type: "string",
          minLength: 1,
          maxLength: 250,
          format: "entityTitleValidator",
          title: "Page name"
        },
        slug: {
          type: "string",
          pattern: "^[a-z0-9]+(?:-[a-z0-9]+-*)*$",
          title: "Slug"
        }
      }
    },
    required: {}
  },
  selectedGroupIds: [
    "4a9c8ce6b1514a99b54d5872ee1488a9"
  ],
  stepIndex: 2,
  componentArgs: {
    actionKey: "failure.action",
    headingKey: "failure.heading",
    icon: "frown",
    kind: "danger",
    messageKey: "failure.message"
  },
  steps: [
    {
      labelKey: "steps.specifyInfo",
      complete: true,
      disabled: true,
      error: false
    },
    {
      labelKey: "steps.selectGroups",
      complete: true,
      disabled: true,
      error: false
    },
    {
      labelKey: "steps.confirmation",
      complete: false,
      disabled: false,
      error: true
    }
  ],
  controls: {
    back: {
      visible: false,
      labelKey: "controls.back"
    },
    selection: {
      visible: false,
      count: 1
    },
    next: {
      visible: false,
      disabled: true,
      labelKey: "controls.next"
    },
    cancel: {
      visible: false,
      labelKey: "controls.cancel"
    },
    close: {
      visible: true,
      disabled: false,
      labelKey: "controls.close"
    }
  }
};
