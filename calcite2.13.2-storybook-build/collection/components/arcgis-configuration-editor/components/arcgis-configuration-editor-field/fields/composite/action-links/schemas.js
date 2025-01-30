import { UiSchemaRuleEffects } from "@esri/hub-common";
export const LINK_SCHEMA = {
  type: 'object',
  required: ["label"],
  properties: {
    source: {
      type: "string",
      default: "external",
      enum: ["external", "content"]
    },
    label: { type: 'string' },
    description: { type: 'string' },
    href: {
      type: 'string',
    },
    contentId: {
      type: "array",
      maxItems: 1,
      items: {
        type: "string"
      }
    },
    section: {
      type: "string"
    }
  },
  allOf: [
    // conditionally validate formatting for "href" for "external" links
    {
      if: {
        properties: {
          source: { const: "external" },
          href: { minLength: 1 }
        }
      },
      then: { properties: { "href": {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            format: "url"
          } } },
    },
    // conditionally require "href" for "external" links
    {
      if: { required: ['source'], properties: { source: { const: "external" } } },
      then: { required: ['href'] },
    },
    // conditionally require "contentId" for "content" links
    {
      if: {
        required: ['source'],
        properties: { source: { const: "content" } },
      },
      then: {
        required: ["contentId"],
        properties: { contentId: { not: { const: [] } } }
      },
    }
  ],
};
export const buildLinkUiSchema = (opts) => {
  let sectionItems = [];
  const cardTitleKey = opts.type === "block" ? "block" : `button${opts.links.findIndex(link => link.key === opts.editKey) + 1}`;
  if (opts.type === "block") {
    sectionItems = getSectionItems(opts.links);
  }
  return {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        labelKey: `linkEditor.title.${cardTitleKey}`,
        options: {
          section: "card",
          actions: [
            {
              action: "delete",
              slot: "footer-start",
              label: "Delete",
              kind: "danger",
              appearance: "transparent",
              round: true
            },
            {
              action: "cancel",
              slot: "footer-end",
              label: "Cancel",
              appearance: "transparent",
              kind: "neutral",
              round: true
            },
            {
              action: "save",
              slot: "footer-end",
              label: "Save",
              round: true,
              disableWhenInvalid: true
            }
          ]
        },
        elements: [
          {
            scope: '/properties/source',
            type: 'Control',
            options: {
              control: 'hub-field-input-radio',
              labels: ["{{linkEditor.link.source.external.label:translate}}", "{{linkEditor.link.source.content.label:translate}}"]
            }
          },
          {
            scope: '/properties/label',
            labelKey: 'linkEditor.link.label.label',
            type: 'Control',
            options: {
              helperText: {
                labelKey: `linkEditor.link.label.helperText.${opts.type}`
              },
              messages: [
                {
                  type: "ERROR",
                  keyword: "required",
                  icon: true,
                  labelKey: 'linkEditor.link.label.requiredError',
                },
              ],
            }
          },
          ...(opts.type === "block"
            ? [{
                scope: '/properties/description',
                labelKey: 'linkEditor.link.description.label',
                type: 'Control',
                options: {
                  helperText: {
                    labelKey: "linkEditor.link.description.helperText"
                  }
                }
              }]
            : []),
          {
            scope: '/properties/href',
            labelKey: 'linkEditor.link.href.label',
            type: 'Control',
            rule: {
              effect: UiSchemaRuleEffects.HIDE,
              condition: {
                scope: '/properties/source',
                schema: { const: 'content' }
              }
            },
            options: {
              messages: [
                {
                  type: "ERROR",
                  keyword: "minLength",
                  icon: true,
                  labelKey: 'linkEditor.link.href.requiredError',
                },
                {
                  type: "ERROR",
                  keyword: "format",
                  icon: true,
                  labelKey: 'linkEditor.link.href.formatError',
                },
                {
                  type: "ERROR",
                  keyword: "if",
                  hidden: true,
                },
              ]
            }
          },
          {
            scope: '/properties/contentId',
            labelKey: 'linkEditor.link.contentId.label',
            type: 'Control',
            rule: {
              effect: UiSchemaRuleEffects.HIDE,
              condition: {
                scope: '/properties/source',
                schema: { const: 'external' }
              }
            },
            options: {
              control: 'hub-field-input-gallery-picker',
              targetEntity: "item",
              catalogs: opts.catalogs,
              facets: opts.facets,
              messages: [
                {
                  type: "ERROR",
                  // matches the error keyword when contentId is conditionally required
                  keyword: "not",
                  icon: true,
                  labelKey: 'linkEditor.link.contentId.requiredError',
                },
              ],
            }
          },
          ...(opts.type === "block"
            ? [{
                scope: '/properties/section',
                labelKey: 'linkEditor.link.section.label',
                type: 'Control',
                options: {
                  control: 'hub-field-input-combobox',
                  items: sectionItems,
                  selectionMode: "single",
                  disabled: !sectionItems.length,
                  placeholder: sectionItems.length
                    ? '{{linkEditor.link.section.placeholder.notSet:translate}}'
                    : '{{linkEditor.link.section.placeholder.noSections:translate}}'
                }
              }]
            : [])
        ]
      }
    ]
  };
};
export const getSectionItems = (links) => {
  return links.reduce((acc, link) => {
    if (link.kind === "section") {
      acc.push({ value: link.key, label: link.label });
    }
    return acc;
  }, []);
};
export const SECITON_SCHEMA = {
  type: 'object',
  required: ["label"],
  properties: {
    label: { type: 'string' },
    description: { type: 'string' }
  }
};
export const SECTION_UI_SCHEMA = {
  type: "layout",
  elements: [
    {
      type: 'Section',
      labelKey: 'sectionEditor.title',
      options: {
        section: "card",
        actions: [
          {
            action: "delete",
            slot: "footer-start",
            label: "Delete",
            kind: "danger",
            appearance: "outline",
            round: true
          },
          {
            action: "cancel",
            slot: "footer-end",
            label: "Cancel",
            appearance: "outline",
            round: true
          },
          {
            action: "save",
            slot: "footer-end",
            label: "Save",
            round: true,
            disableWhenInvalid: true
          }
        ]
      },
      elements: [
        {
          scope: '/properties/label',
          labelKey: 'sectionEditor.section.label.label',
          type: 'Control',
          options: {
            messages: [
              {
                type: "ERROR",
                keyword: "required",
                icon: true,
                labelKey: 'sectionEditor.section.label.requiredError',
              },
            ],
          }
        },
        {
          scope: '/properties/description',
          labelKey: 'sectionEditor.section.description.label',
          type: 'Control'
        },
        {
          type: "Slot",
          options: { name: "delete-warning" }
        }
      ]
    }
  ]
};
