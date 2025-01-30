export const SUBTITLE = `The following harness demonstrates how to include notices in your editor:

1. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of editing experience.`

export const SCHEMA = {
  type: 'object',
  properties: {
    interest: {
      type: 'string',
      enum: [ 'pets', 'colors' ],
      default: 'pets'
    }
  }
}

export const UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      type: "Section",
      label: "This is a notice that is configured directly in the uiSchema.",
      elements: [
        {
          type: "Notice",
          options: {
            notice: {
              configuration: {
                id: "config-harness-notice",
                noticeType: "notice",
                closable: false,
                kind: "info",
                scale: "m",
              },
              title: "An example of an autoshow notice.",
              message: "This notice was configured dynamically by passing in the notice configuration directly into the uiSchema.",
              autoShow: true,
              actions: [
                {
                  label: "Go to organization settings",
                  icon: "launch",
                  href: `${context.portalUrl}/home/organization.html?#settings`,
                  target: "_blank",
                },
              ],
            }
          }
        },
      ]
    },
    {
      type: "Section",
      label: "This is a notice that is configured in the notices.ts file and referenced by id.",
      elements: [
        {
          type: "Notice",
          options: {
            noticeId: "20240517-initiatives-manage",
          }
        },
      ]
    },
    {
      scope: "/properties/interest",
      label: "I like...",
      type: "Control",
      options: {
        control: "hub-field-input-select",
        labels: [ "Animals", "Colors" ]
      }
    },

    {
      type: "Notice",
      options: {
        notice: {
          configuration: {
            id: "config-harness-notice-modal",
            noticeType: "modal",
            closable: true,
            kind: "info",
            scale: "m",
          },
          title: "An example of an autoshow notice.",
          message: "This notice was configured dynamically by passing in the notice configuration directly into the uiSchema.",
          autoShow: true,
          actions: [
            {
              label: "Go to organization settings",
              icon: "launch",
              href: `${context.portalUrl}/home/organization.html?#settings`,
              target: "_blank",
            },
          ],
        }
      }
    },

  ]
}
