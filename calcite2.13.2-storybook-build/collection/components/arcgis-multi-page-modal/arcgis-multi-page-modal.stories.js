export default {
  title: 'Search/Multi Page Modal',
  component: 'arcgis-multi-page-modal',
  parameters: {
    actions: {
      handles: ['arcgisMultiPageModalClose']
    }
  }
};
const defaultArgs = {
  open: 'true'
};
export const Default = args => `
    <arcgis-multi-page-modal open="${args.open}">
        <div slot="header">Header</div>

        <arcgis-modal-page>
            <img alt="" role="presentation" slot="thumbnail" src="https://picsum.photos/200/150">
            <div slot="page-title">Page Title 1</div>
            <div slot="page-content">Page Content 1</div>
        </arcgis-modal-page>

        <arcgis-modal-page>
            <img alt="" role="presentation" slot="thumbnail" src="https://picsum.photos/200/150">
            <div slot="page-title">Page Title 2</div>
            <div slot="page-content">Page Content 2</div>
        </arcgis-modal-page>

    </arcgis-multi-page-modal>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Multi Page Modal';
