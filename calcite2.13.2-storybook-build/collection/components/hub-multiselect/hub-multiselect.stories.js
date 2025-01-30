import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Editing/Inputs/Multiselect',
  component: 'hub-multiselect',
  parameters: {
    actions: {
      handles: ['hubMultiselectChange'],
    }
  },
  argTypes: {
    values: {
      control: { type: 'object' }
    }
  },
  decorators: [withCenteredLayout('30%')]
};
const defaultArgs = {
  values: ['tag_1', 'tag_2'],
  label: 'Tags',
  disabled: false
};
export const HubMultiselect = args => `
  <hub-multiselect
    values='${args.values.toString()}'
    label='${args.label}'
    ${args.disabled ? 'disabled' : ''}
  >
  </hub-multiselect>
`;
HubMultiselect.args = Object.assign({}, defaultArgs);
HubMultiselect.storyName = 'Hub Multiselect';
