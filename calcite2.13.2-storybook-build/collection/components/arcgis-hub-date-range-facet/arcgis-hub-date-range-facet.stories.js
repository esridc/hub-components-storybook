export default {
  title: 'Search/Date Range Facet',
  component: 'arcgis-hub-date-range-facet',
  parameters: {
    layout: 'centered'
  }
};
const defaultArgs = {
  display: 'date-range',
  label: 'test',
  key: 'test',
  field: 'modified',
  max: new Date(),
};
export const Default = (args) => `
  <arcgis-hub-date-range-facet
    facet="${args}"
  ></arcgis-hub-date-range-facet>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Date Range Facet';
