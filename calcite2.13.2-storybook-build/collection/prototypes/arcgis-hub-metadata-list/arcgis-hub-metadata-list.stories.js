export default {
  title: 'Prototypes/Metadata List',
  component: 'arcgis-hub-metadata-list',
};
const defaultArgs = {
  entityId: 'f6c3c04113944f23a7993f2e603abaf2',
  metadata: ['title', 'tags']
};
export const Default = (args) => `
  <arcgis-hub-metadata-list
    entity-id="${args.entityId}"
    metadata="${args.metadata}"
  ></arcgis-hub-metadata-list>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Metadata List';
