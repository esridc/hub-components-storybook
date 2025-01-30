import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../.storybook/decorators/withNotice';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Editing/Configuration Form',
  component: 'arcgis-configuration-form',
  parameters: {
    actions: {
      handles: ['arcgisConfigurationFormChanged', 'arcgisConfigurationFormSaved', 'arcgisConfigurationFormModalClosed'],
    },
  },
  argTypes: {
    schema: {
      control: { type: 'object' }
    },
    values: {
      control: { type: 'object' }
    },
    variant: {
      control: { type: 'select' },
      options: ["variant-workspace", "variant-layout-editor"]
    }
  },
  decorators: [
    withRenderCallback('arcgis-configuration-form', ($el, { args }) => {
      $el.schema = args.schema;
      $el.uiSchema = args.uiSchema;
      $el.values = args.values;
      // It is the consumer's job to open/close the form if the layout
      // is "modal". Here we listen for modal "close" event to toggle
      // the isOpen prop
      $el.addEventListener('arcgisConfigurationFormModalClosed', () => {
        $el.isOpen = false;
      });
      if (args.layout === "sticky") {
        $el.style.setProperty('--arcgis-configuration-form-footer-bg-color', '#ffffff');
        $el.style.setProperty('--arcgis-configuration-form-footer-negative-margin', '1rem');
      }
    }),
    withCenteredLayout(),
    withNotice('The configuration form is a presentational wrapper around the configuration editor and has several variations that are difficult to represent in storybook. For better examples, please visit our harness suite', { text: 'Try the harness examples', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-configuration-editor/configuration-form.html' }, undefined, { icon: "information", kind: "brand", style: "margin-block-start: 2rem; margin-block-end: 2rem;" }),
  ],
};
const defaultArgs = {
  values: {},
  disabled: false,
  isSaving: false,
  isOpen: true,
  layout: "fixed",
  variant: "",
  schema: {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string'
      },
      favoriteAnimal: {
        type: 'string',
        enum: ['dog', 'cat', 'cow']
      },
      additionalInfo: {
        type: 'string'
      }
    }
  },
  uiSchema: {
    type: 'Layout',
    elements: [
      {
        scope: '/properties/name',
        label: 'Name',
        type: 'Control'
      },
      {
        scope: '/properties/favoriteAnimal',
        label: 'Favorite Animal',
        type: 'Control',
        options: {
          control: 'hub-field-input-select',
          helperText: {
            label: "Please select one"
          }
        }
      },
      {
        scope: '/properties/additionalInfo',
        label: 'Additional Information',
        type: 'Control',
        options: {
          control: 'hub-field-input-input',
          type: 'textarea',
          helperText: {
            label: "Please tell us more about yourself"
          }
        }
      }
    ]
  }
};
export const Default = (args) => `
  <arcgis-configuration-form
    disabled="${args.disabled}"
    is-open="${args.isOpen}"
    is-saving="${args.isSaving}"
    layout="${args.layout}"
    variant="${args.variant}">
  </arcgis-configuration-form>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Configuration Form';
