/**
 * Schema for the ArcGIS Hub User Settings component
 */
export const settingsSchema = {
  type: 'object',
  properties: {
    workspace: {
      type: 'boolean',
      default: false,
    },
  },
};
/**
 * UI Schema for the ArcGIS Hub User Settings component
 */
export const settingsUiSchema = {
  type: 'Layout',
  elements: [
    {
      labelKey: 'workspaceLabel',
      scope: '/properties/workspace',
      type: 'Control',
      options: {
        control: 'hub-field-input-switch',
        helperText: {
          labelKey: 'workspaceHelper',
          placement: 'bottom',
        },
        scale: 'm',
      },
    },
  ],
};
