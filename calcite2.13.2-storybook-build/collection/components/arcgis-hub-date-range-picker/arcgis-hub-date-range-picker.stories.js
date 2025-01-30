export default {
  title: 'Editing/Inputs/Date Range Picker',
  component: 'arcgis-hub-date-range-picker',
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['today', 'yesterday', 'last7Days', 'last30Days', 'thisMonth', 'lastMonth', 'pastYear', 'custom']
    }
  },
  parameters: {
    actions: {
      handles: ['arcgisHubDateRangePickerSelect']
    },
    layout: 'centered'
  }
};
const defaultArgs = {
  value: "last30Days",
  min: "2022-01-01",
  max: "2023-01-01"
};
export const Default = (args) => {
  return `
    <arcgis-hub-date-range-picker
      value="${args.value}"
      min="${args.min}"
      max="${args.max}"></arcgis-hub-date-range-picker>
  `;
};
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Date Range Picker';
