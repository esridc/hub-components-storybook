export default {
  title: 'Display/Nonmodal',
  component: 'arcgis-hub-nonmodal',
};
const defaultArgs = {
  open: true
};
export const Default = args => `
  <arcgis-hub-nonmodal
    open="${args.open}"
  >
    <div slot="header">This is the "header" slot content</div>
    <div slot="content">This is the "content" slot content</div>
    <calcite-button slot="back">Back slot</calcite-button>
    <calcite-button slot="secondary">Secondary slot</calcite-button>
    <calcite-button slot="primary">Primary slot</calcite-button>
  </arcgis-hub-nonmodal>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Nonmodal';
