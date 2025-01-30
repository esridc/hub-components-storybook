import { UiSchemaRuleEffects } from "@esri/hub-common";
export const BASIC_SCHEMA = {
  type: 'object',
  properties: {
    input: {
      type: 'string'
    }
  }
};
export const BASIC_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      scope: '/properties/input',
      type: 'Control',
      label: 'Input'
    }
  ]
};
export const VALIDATION_SCHEMA = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string' }
  }
};
export const VALIDATION_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      scope: '/properties/name',
      type: 'Control',
      label: 'Name',
      options: {
        control: 'hub-field-input-input'
      }
    }
  ]
};
export const STEPPED_SCHEMA = {
  type: 'object',
  required: ['input1', 'input2'],
  properties: {
    input1: {
      type: 'string'
    },
    input2: {
      type: 'string'
    },
    input3: {
      type: 'string'
    }
  }
};
export const STEPPED_UI_SCHEMA = {
  type: 'Layout',
  elements: [
    {
      type: 'Section',
      options: {
        section: "stepper"
      },
      elements: [
        {
          type: 'Section',
          label: 'Step 1',
          options: {
            section: "step"
          },
          elements: [
            {
              scope: '/properties/input1',
              label: 'Step 1 Field',
              type: 'Control'
            },
          ]
        },
        {
          type: 'Section',
          label: 'Step 2',
          options: {
            section: "step"
          },
          rule: {
            effect: UiSchemaRuleEffects.DISABLE,
            condition: {
              scope: "/properties/input1",
              schema: { const: "" },
            },
          },
          elements: [
            {
              scope: '/properties/input2',
              label: 'Step 2 Field',
              type: 'Control'
            },
          ]
        },
        {
          type: 'Section',
          label: 'Step 3',
          options: {
            section: "step"
          },
          rule: {
            effect: UiSchemaRuleEffects.DISABLE,
            condition: {
              scope: "/properties/input2",
              schema: { const: "" },
            },
          },
          elements: [
            {
              scope: '/properties/input3',
              label: 'Step 3 Field',
              type: 'Control'
            }
          ]
        }
      ]
    }
  ]
};
