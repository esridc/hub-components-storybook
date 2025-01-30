export default {
  title: 'Access/Shareable Card',
  component: 'arcgis-shareable-card',
  parameters: {
    layout: 'centered'
  }
};
const defaultArgs = {
  shareable: true,
  shareableByValue: false,
  shareableByReference: false,
  shareableOnHover: false,
  showShareUi: true
};
export const Default = args => `
  <arcgis-shareable-card
    shareable="${args.shareable}"
    shareable-by-value="${args.shareableByValue}"
    shareable-by-reference="${args.shareableByReference}"
    shareable-on-hover="${args.shareableOnHover}"
    show-share-ui="${args.showShareUi}"
  >
    <div id="my-component" style="width: 300px; height: 400px; border: solid 1px lightgray;">some component here</div>
  </arcgis-shareable-card>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Shareable Card';
