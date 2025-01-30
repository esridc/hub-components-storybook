export default {
  title: 'Editing/Rich Text',
  component: 'arcgis-hub-rich-text',
};
const defaultArgs = {
  disabled: false,
  label: 'My a11y label',
  readonly: false,
  mention: false,
  mentionCount: 10,
  name: 'my-rich-text-editor',
  placeholder: 'Custom placeholder text',
  scale: 'm',
  status: 'idle',
  textTransform: false,
  pasteFromOffice: false,
  toolbar: 'heading,|,bold,italic,link,|,undo,redo',
  value: 'A pre-populated value',
  wrapperClass: 'my-custom-wrapper-class',
};
export const Default = (args) => `
  <arcgis-hub-rich-text
    disabled="${args.disabled}"
    label="${args.label}"
    mention="${args.mention}"
    mentionCount="${args.mentionCount}"
    name="${args.name}"
    placeholder="${args.placeholder}"
    readonly="${args.readonly}"
    scale="${args.scale}"
    status="${args.status}"
    text-transform="${args.textTransform}"
    paste-from-office="${args.pasteFromOffice}"
    toolbar="${args.toolbar}"
    value="${args.value}"
    wrapper-class="${args.wrapperClass}"
  ></arcgis-hub-rich-text>
`;
Default.args = Object.assign({}, defaultArgs);
Default.argTypes = {
  getMentionQuery: { control: false },
};
Default.storyName = 'Rich Text';
