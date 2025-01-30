export const MAP_SETTINGS_SCHEMA = {
  type: 'object',
  properties: {
    baseViewItemId: {
      // This is defined as an array due to incorporation with gallery picker
      type: 'array',
      items: {
        type: "string",
      },
      maxItems: 1,
      default: []
    }
  }
};
export const buildMapSettingsUiSchema = (opts) => {
  const { catalogs, facets, visibleSettings } = opts || {};
  return {
    type: "Layout",
    elements: [
      visibleSettings.includes('gallery') && {
        type: 'Control',
        scope: '/properties/baseViewItemId',
        label: "Map",
        options: {
          control: 'hub-field-input-gallery-picker',
          linkTarget: 'self',
          catalogs,
          facets,
          pickerTitle: { label: "{{itemPickerSelect:translate}}" },
          helperText: {
            label: "{{helperText:translate}}"
          }
        }
      },
    ].filter(Boolean)
  };
};
