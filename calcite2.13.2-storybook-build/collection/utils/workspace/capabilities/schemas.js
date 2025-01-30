/**
 * Return the base schema for an entity caoability
 * These are used to display the capability in the configuration editor, in the
 * capability's pane
 * @param groups
 * @param context
 * @returns
 */
export function getCapabilityBaseSchemas(groups, context) {
  return {
    schema: {
      type: "object",
      properties: {
        enabled: {
          type: "boolean",
          default: "false"
        },
        groups: {
          type: "array",
          items: {
            type: "string"
          },
          default: groups
        }
      }
    },
    uiSchema: {
      type: "Layout",
      elements: [
        {
          label: "Enabled",
          // labelKey: "enabled",
          scope: "/properties/enabled",
          type: "Control"
        },
        {
          label: "Choose the groups to use as a source for the content",
          // labelKey: "groups",
          scope: "/properties/groups",
          type: "Control",
          options: {
            control: "hub-field-input-gallery-picker",
            targetEntity: "group",
            catalogs: [
              {
                schemaVersion: 1,
                title: "View Groups",
                scopes: {
                  group: {
                    targetEntity: "group",
                    filters: [
                      {
                        predicates: [
                          {
                            capabilities: {
                              not: [
                                "updateitemcontrol"
                              ]
                            }
                          }
                        ]
                      }
                    ]
                  }
                },
                collections: [
                  {
                    targetEntity: "group",
                    key: "viewGroups",
                    label: "viewGroups",
                    scope: {
                      targetEntity: "group",
                      filters: [
                        {
                          predicates: [
                            {
                              q: "*"
                            }
                          ]
                        }
                      ]
                    }
                  }
                ]
              }
            ],
            facets: [
              {
                label: "From",
                key: "from",
                display: "single-select",
                operation: "OR",
                options: [
                  {
                    label: "My groups",
                    key: "My groups",
                    selected: true,
                    predicates: [
                      {
                        owner: context.currentUser.username
                      }
                    ]
                  },
                  {
                    label: "My organization",
                    key: "My organization",
                    selected: false,
                    predicates: [
                      {
                        orgid: context.portal.id
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  };
}
