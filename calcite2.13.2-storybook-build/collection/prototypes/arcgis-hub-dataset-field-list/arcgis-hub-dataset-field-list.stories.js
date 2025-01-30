export default {
  title: 'Prototypes/Dataset Field List',
  component: 'arcgis-hub-dataset-field-list',
};
const defaultArgs = {
  argOne: 'arg-one-value'
};
export const Default = (args) => `
  <arcgis-hub-dataset-field-list
    arg-one="${args.argOne}"
  ></arcgis-hub-dataset-field-list>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Dataset Field List';
