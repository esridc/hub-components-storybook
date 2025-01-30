export default {
  title: 'Views/Notebook',
  component: 'arcgis-notebook',
  parameters: {
    actions: {
      handles: ['arcGisNotebookError'],
    },
  },
};
const defaultArgs = {
  itemId: '9056733512624eeda8eb1b32625d518b',
  portalUrl: 'https://www.arcgis.com/sharing/rest',
  notebookTitle: 'Analysis Notebook'
};
export const Default = args => `
  <arcgis-notebook
    portal-url="${args.portalUrl}"
    notebook-title="${args.notebookTitle}"
    item-id="${args.itemId}"
    allow-scripts="true"
  ></arcgis-notebook>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Notebook';
