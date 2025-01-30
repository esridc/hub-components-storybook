export default {
  title: 'Editing/Hub Confirm Button',
  component: 'arcgis-hub-confirm-button',
};
const defaultArgs = {
  delete: 'Delete',
  confirmDelete: 'Confirm Delete',
  icon: 'trash',
  kind: 'brand'
};
export const Default = args => `
  <arcgis-hub-confirm-button
    default-text="${args.delete}"
    confirm-text="${args.confirmDelete}"
    icon="${args.icon}"
    kind="${args.kind}"
  ></arcgis-hub-confirm-button>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Hub Confirm Button';
