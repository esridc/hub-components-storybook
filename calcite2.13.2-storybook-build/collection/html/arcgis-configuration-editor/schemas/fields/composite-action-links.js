import { CATALOGS, FACETS } from "../../fixtures.js";

export const SUBTITLE = `The following harness demonstrates how to use the composite action links field.

1. Open the console to see what events and information are being emitted from the configuration editor.
2. Toggle to the "Schemas" tab to get a better sense of how to define the JSON schema and uiSchema for this type of field.`;

export const SCHEMA = {
  type: 'object',
  properties: {
    buttonEmpty: {
      type: "array"
    },
    button: {
      type: "array"
    },
    blockEmpty: {
      type: "array"
    },
    block: {
      type: "array"
    }
  }
};

export const UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      type: "Section",
      label: "Action links as buttons (empty state)",
      elements: [
        {
          scope: "/properties/buttonEmpty",
          type: "Control",
          options: {
            control: "hub-composite-input-action-links",
            catalogs: CATALOGS,
            facets: FACETS,
            type: "button"
          }
        },
      ]
    },
    {
      type: "Section",
      label: "Action links as buttons",
      elements: [
        {
          scope: "/properties/button",
          type: "Control",
          options: {
            control: "hub-composite-input-action-links",
            catalogs: CATALOGS,
            facets: FACETS,
            targetEntity: "item",
            type: "button"
          }
        },
      ]
    },
    {
      type: "Section",
      label: "Action links as blocks (empty state)",
      elements: [
        {
          scope: "/properties/blockEmpty",
          type: "Control",
          options: {
            control: "hub-composite-input-action-links",
            catalogs: CATALOGS,
            facets: FACETS,
            targetEntity: "item",
            type: "block"
          }
        },
      ]
    },
    {
      type: "Section",
      label: "Action links as blocks",
      elements: [
        {
          scope: "/properties/block",
          type: "Control",
          options: {
            control: "hub-composite-input-action-links",
            catalogs: CATALOGS,
            facets: FACETS,
            targetEntity: "item",
            type: "block"
          }
        },
      ]
    }
  ]
};

export const VALUES = {
  button: [
    {
      kind: "external",
      label: "Create account",
      href: 'https://google.com'
    },
    {
      kind: "content",
      label: "Volunteer manual",
      contentId: '320d5995b77c4e2eae27c85faa75e1e2'
    }
  ],
  block: [
    {
      kind: "external",
      label: "Stop the Spotted Lanternfly",
      description: "A grim Storymap about a beautiful bug",
      href: "https://google.com"
    },
    {
      kind: "section",
      label: "Create a Map",
      description: "Start a map with this data",
      children: [
        {
          kind: "content",
          label: "ArcGIS Map Viewer",
          description: "Advanced mapping in the modernized editor",
          contentId: '320d5995b77c4e2eae27c85faa75e1e2'
        },
        {
          kind: "content",
          label: "ArcGIS Map Viewer Classic",
          description: "Advanced mapping in the legacy editor",
          contentId: '320d5995b77c4e2eae27c85faa75e1e2'
        }
      ]
    }
  ]
};
