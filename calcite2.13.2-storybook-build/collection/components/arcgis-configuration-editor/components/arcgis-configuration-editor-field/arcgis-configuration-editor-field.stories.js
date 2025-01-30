import { withRenderCallback } from '../../../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../../../.storybook/decorators/withCenteredLayout.js';
import { withNotice } from '../../../../../.storybook/decorators/withNotice';
import { MOCK_FIELDS, MOCK_NUMERIC_FIELD, MOCK_STRING_FIELD } from './fields/composite/expression-set/test/fixtures';
import { MOCK_CATALOGS, MOCK_FACETS } from './test/fixtures';
export default {
  title: 'Editing/Configuration Editor/Fields',
  component: 'arcgis-configuration-editor-field',
  parameters: {
    actions: {
      handles: ['arcgisConfigurationEditorFieldChange'],
    },
  },
  argTypes: {
    schema: {
      control: { type: 'object' }
    }
  },
  decorators: [
    withRenderCallback('arcgis-configuration-editor-field', ($el, { args }) => {
      $el.uiSchema = args.uiSchema || { type: 'Control' };
      $el.schema = args.schema || {};
      $el.value = args.value || {};
    }),
    withCenteredLayout('50%'),
    withNotice('<div>Fields are declaratively configured based on a simple JSON schema and uiSchema. As such, they are incredibly flexible and there are a vast number of configuration combinations that result in different editing experiences. It is difficult to represent every combination here. For more examples, please visit our harness suite. </br></br><b>note:</b> all fields can be consumed independent of the configuration editor</div></br>', { text: 'Try the harness examples', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-configuration-editor/configuration-editor-fields.html' }, undefined, { icon: "information", kind: "brand" })
  ]
};
/** DEFAULT ARGS FOR ALL STORIES */
const defaultArgs = {
  invalid: false,
  disabled: false,
  required: false,
  uiSchema: {
    label: "Field name",
    options: {
      helperText: { label: "This is some helper text" }
    }
  },
};
/** DEFAULT TEMPLATE */
const Template = args => `<arcgis-configuration-editor-field
  property=${args.property}
  ${args.invalid ? 'invalid' : ''}
  ${args.disabled ? 'disabled' : ''}
  ${args.required ? 'required' : ''}
>
</arcgis-configuration-editor-field>`;
/** ACTION LINKS FIELD (composite) */
export const ActionLinks = Template.bind({});
ActionLinks.args = Object.assign(Object.assign({}, defaultArgs), { property: 'actionLinks', schema: {
    type: 'array',
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: "hub-composite-input-action-links", type: "block", catalogs: MOCK_CATALOGS, facets: MOCK_FACETS }) }), value: [] });
/** ALIGNMENT FIELD */
export const Alignment = Template.bind({});
Alignment.args = Object.assign(Object.assign({}, defaultArgs), { property: 'alignment', schema: {
    type: 'string',
    title: 'Alignment'
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-alignment' }) }), value: 'Left' });
/** COLOR PICKER FIELD */
export const ColorPicker = Template.bind({});
ColorPicker.args = Object.assign(Object.assign({}, defaultArgs), { property: 'color', schema: {
    type: 'string',
    title: 'Color'
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-color', savedColors: ['#f40afc', '#fcaf0a', '#0a8cfc', '#fc0a85'] }) }), value: '#47f344' });
/** COMBOBOX FIELD */
export const Combobox = Template.bind({});
Combobox.args = Object.assign(Object.assign({}, defaultArgs), { property: 'combobox', schema: {
    type: "array",
    items: {
      type: "string",
    },
    maxItems: 6
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-combobox', items: [
        { value: "tag1", label: "Tag 1", icon: 'analysis' },
        { value: "tag2", label: "Tag 2", icon: 'globe' },
        { value: "tag3", label: "Tag 3" },
        { value: "tag4", label: "Tag 4" },
      ], allowCustomValues: true, selectionMode: 'multiple', placeholder: 'Select or enter a tag name', placeholderIcon: 'tag' }) }), value: ['tag1', 'tag2'] });
/** DATE PICKER FIELD */
export const DatePicker = Template.bind({});
DatePicker.args = Object.assign(Object.assign({}, defaultArgs), { property: 'date', schema: {
    type: 'string',
    format: 'date',
    title: 'Date'
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-date' }) }), value: '2021-02-07' });
/** EXPRESSION SET FIELD (composite) */
export const ExpressionSet = Template.bind({});
ExpressionSet.args = Object.assign(Object.assign({}, defaultArgs), { property: 'expressionSet', schema: {
    type: 'array',
  }, uiSchema: {
    options: {
      control: "hub-composite-input-expression-set",
      fields: MOCK_FIELDS
    }
  }, value: [
    {
      field: MOCK_STRING_FIELD,
      key: 'expression-123',
      values: ['matchthis']
    },
    {
      field: MOCK_NUMERIC_FIELD,
      key: 'expression-456',
      values: [0, 2]
    }
  ] });
/** GALLERY PICKER FIELD */
export const GalleryPicker = Template.bind({});
GalleryPicker.args = Object.assign(Object.assign({}, defaultArgs), { property: 'gallery-picker', schema: {
    type: "array",
    maxItems: 3,
    items: {
      type: "string",
    },
    title: 'Gallery Picker',
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-gallery-picker', targetEntity: 'item', showSelection: 'false', catalogs: MOCK_CATALOGS, facets: MOCK_FACETS }) }), value: ['8ad3bc3ac7af446bb69bb0b38ba93f41'] });
/** IMAGE PICKER FIELD */
export const ImagePicker = Template.bind({});
ImagePicker.args = Object.assign(Object.assign({}, defaultArgs), { property: 'image', schema: {
    type: 'object',
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-image-picker', aspectRatio: 3 / 2, sizeDescription: {
        label: 'Max size is 10mb, JPEG, JPG, or PNG'
      } }) }) });
/** INPUT FIELD */
export const Input = Template.bind({});
Input.args = Object.assign(Object.assign({}, defaultArgs), { property: 'address', schema: {
    type: 'string',
    title: 'Address'
  }, value: '123 Any St' });
/** LICENSE PICKER FIELD (composite) */
export const LicensePicker = Template.bind({});
LicensePicker.args = Object.assign(Object.assign({}, defaultArgs), { property: 'license', schema: {
    type: 'string',
  }, uiSchema: {
    options: {
      control: "arcgis-hub-license-picker"
    }
  }, value: "CC BY" });
/** LIST FIELD */
export const List = Template.bind({});
List.args = Object.assign(Object.assign({}, defaultArgs), { property: 'list', schema: {
    type: 'array',
    items: {
      type: 'object',
    }
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-list', allowEdit: true, allowHide: true, allowReorder: true, allowRemove: true }) }), value: [
    { label: 'item 1', key: 'item-1' },
    { label: 'item 2', key: 'item-2' },
    { label: 'item 3', key: 'item-3' },
  ] });
/** LOCATION PICKER FIELD */
export const Location = Template.bind({});
Location.args = Object.assign(Object.assign({}, defaultArgs), { property: 'location', schema: {
    type: 'object',
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-location-picker', extent: {
        "xmin": -88,
        "ymin": 39.1,
        "xmax": -87.10000000000001,
        "ymax": 40,
        "type": "extent",
        "spatialReference": {
          "wkid": 4326
        }
      }, options: [
        {
          label: "No Location",
          location: {
            type: "none",
          }
        },
        {
          label: "Organization's Extent",
          description: "City of X",
          selected: true,
          location: {
            type: "org",
            extent: [[-88, 39.1], [-87.10000000000001, 40]],
            spatialReference: {
              wkid: 4326
            }
          }
        },
        {
          label: "Custom",
          description: "Draw one or more locations",
          location: {
            type: "custom",
            extent: [[-88, 39.1], [-87.10000000000001, 40]],
            spatialReference: {
              wkid: 4326
            }
          }
        },
      ] }) }) });
/** MULTI-SELECT FIELD */
export const Multiselect = Template.bind({});
Multiselect.args = Object.assign(Object.assign({}, defaultArgs), { property: 'state', schema: {
    type: 'array',
    title: 'State',
    items: {
      type: 'string'
    }
  }, value: 'DC,CO' });
/** PRIVACY CONFIG (composite) */
export const PrivacyConfig = Template.bind({});
PrivacyConfig.args = Object.assign(Object.assign({}, defaultArgs), { property: 'privacy', schema: {
    type: 'object',
  }, uiSchema: {
    options: {
      control: "arcgis-privacy-config",
    }
  }, value: {
    allowPrivacyConfig: true,
    blocking: false,
    disclaimer: [
      { text: 'This is the consent notice....' }
    ],
    policyURL: ''
  } });
/** RADIO BUTTON FIELD */
export const Radio = Template.bind({});
Radio.args = Object.assign(Object.assign({}, defaultArgs), { property: 'radio', schema: {
    type: 'string',
    title: 'Radio',
    enum: ['foo', 'bar']
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-radio' }) }), value: 'foo' });
/** RADIO GROUP FIELD */
export const RadioGroup = Template.bind({});
RadioGroup.args = Object.assign(Object.assign({}, defaultArgs), { property: 'radio-group', schema: {
    type: 'string',
    title: 'Radio Group',
    enum: ['foo', 'bar', 'bat']
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-radio-group' }) }), value: 'foo' });
/** CHECKBOX GROUP FIELD */
export const CheckboxGroup = Template.bind({});
CheckboxGroup.args = Object.assign(Object.assign({}, defaultArgs), { property: 'checkbox-group', schema: {
    type: 'array',
    title: 'Checkbox Group',
    items: {
      type: 'string',
      enum: ['private', 'org', 'public']
    },
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-checkbox-group' }) }), value: 'foo' });
/** RICH TEXT FIELD */
export const RichText = Template.bind({});
RichText.args = Object.assign(Object.assign({}, defaultArgs), { property: 'richText', schema: {
    type: 'string',
    title: 'Rich Text'
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-rich-text' }) }), value: '<p>This is rich text</p>' });
/** SCHEDULER FIELD */
export const Scheduler = Template.bind({});
Scheduler.args = Object.assign(Object.assign({}, defaultArgs), { property: 'scheduler', schema: {
    type: 'object',
    properties: {
      schedule: {
        type: 'object',
      },
    }
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { label: 'Scheduler Input', scope: '/properties/schedule', type: 'Control', options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-scheduler', format: 'select', inputs: [
        { label: "Default", type: "automatic", },
        { label: "Daily", type: "daily", expandedHelperText: "Each day at" },
        { label: "Weekly", type: "weekly", expandedHelperText: "Each week on" },
        { label: "Monthly", type: "monthly", expandedHelperText: "Each month on" },
        { label: "Yearly", type: "yearly", expandedHelperText: "Each year on" },
        { label: "Manual", type: "manual", helperActionIcon: "information-f", helperActionText: "Use this option to manually update the search index and cached download files for this item." }
      ] }) }), value: {
    mode: "scheduled",
    cadence: "daily",
    hour: 13,
    timezone: "Africa/Accra"
  } });
/** SELECT FIELD */
export const Select = Template.bind({});
Select.args = Object.assign(Object.assign({}, defaultArgs), { property: 'state', schema: {
    type: 'string',
    title: 'State',
    enum: ['DC', 'CA', 'CO']
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-select' }) }), value: 'CO' });
/** SWITCH FIELD */
export const Switch = Template.bind({});
Switch.args = Object.assign(Object.assign({}, defaultArgs), { property: 'switch', schema: {
    type: 'boolean',
    title: 'Switch'
  }, value: 'false' });
/** TEXT AREA FIELD */
export const Textarea = Template.bind({});
Textarea.args = Object.assign(Object.assign({}, defaultArgs), { property: 'description', schema: {
    type: 'string',
    title: 'Description',
    maxLength: 250
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-input', type: 'textarea' }) }), value: 'This is the text. It could be really long....' });
/** TILE SELECT FIELD */
export const TileSelect = Template.bind({});
TileSelect.args = Object.assign(Object.assign({}, defaultArgs), { property: 'tileSelect', schema: {
    type: 'string',
    enum: ['option1', 'option2', 'option3']
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: Object.assign(Object.assign({}, defaultArgs.uiSchema.options), { control: 'hub-field-input-tile-select', descriptions: ['desc1', 'desc2', 'desc3'], icons: ['analysis', 'globe', 'banana'], type: 'radio', layout: 'vertical' }) }), value: 'option2' });
/** EMBED FIELD (Composite) */
export const Embed = Template.bind({});
Embed.args = Object.assign(Object.assign({}, defaultArgs), { property: 'embed', schema: {
    type: 'object',
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: {
      control: 'hub-composite-input-embed'
    } }) });
/** EMBEDS FIELD (Composite) */
export const Embeds = Template.bind({});
Embeds.args = Object.assign(Object.assign({}, defaultArgs), { property: 'embeds', schema: {
    type: 'array',
  }, uiSchema: Object.assign(Object.assign({}, defaultArgs.uiSchema), { options: {
      control: 'hub-composite-input-embeds'
    } }) });
