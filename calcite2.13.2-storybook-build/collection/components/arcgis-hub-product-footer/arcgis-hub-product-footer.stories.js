export default {
  title: 'Navigation/Product Footer',
  component: 'arcgis-hub-product-footer',
  parameters: {
    actions: {
      handles: ['hubTelemetry'],
    },
  },
  decorators: [
    (Story) => `<div style="height:100%; display:flex; align-items:flex-end;">${Story()}</div>`
  ]
};
const defaultArgs = {};
export const Default = () => `
  <arcgis-hub-product-footer>
  </arcgis-hub-product-footer>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Product Footer';
