export default {
  title: 'Editing/Inputs/Copyable Input',
  component: 'arcgis-copyable-input',
  parameters: {
    layout: 'centered',
  }
};
const defaultArgs = {
  label: '',
  placeholder: '',
  value: '',
  readonly: false,
  disabled: false,
  type: 'text',
  buttonText: '',
};
export const Default = (args) => `
  <arcgis-copyable-input
    label="${args.label}"
    placeholder="${args.placeholder}"
    value="${args.value}"
    readonly="${args.readonly}"
    disabled="${args.disabled}"
    type="${args.type}"
    button-text="${args.buttonText}"
  ></arcgis-copyable-input>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Copyable Input';
