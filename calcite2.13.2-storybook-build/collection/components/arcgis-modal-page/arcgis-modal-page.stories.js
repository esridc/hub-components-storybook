export default {
  title: 'Search/Modal Page',
  component: 'arcgis-modal-page',
};
const defaultArgs = {
  pageTitle: 'Page Title',
  pageContent: 'Page Content'
};
export const Default = args => `
    <arcgis-multi-page-modal open="true">
        <div slot="header">Header</div>

        <arcgis-modal-page>
            <div slot="page-title">${args.pageTitle} without thumbnail</div>
            <div slot="page-content">${args.pageContent}</div>
        </arcgis-modal-page>

        <arcgis-modal-page>
            <img alt="" role="presentation" slot="thumbnail" src="https://picsum.photos/200/150">
            <div slot="page-title">${args.pageTitle} with thumbnail</div>
            <div slot="page-content">${args.pageContent}</div>
        </arcgis-modal-page>

    </arcgis-multi-page-modal>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Modal Page';
