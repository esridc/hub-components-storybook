export default {
  title: 'Editing/Inputs/Search Input',
  component: 'arcgis-hub-search-input',
  parameters: {
    layout: 'centered',
  }
};
const defaultArgs = {
  text: 'Go!',
  placeholder: 'Do it!',
  value: "watere colorado"
};
export const Default = args => `
  <arcgis-hub-search-input
    text="${args.text}"
    placeholder="${args.placeholder}"
    value="${args.value}"
  ></arcgis-hub-search-input>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Search Input';
