export default {
  title: 'Entity Views/Hub Entity Breadcrumbs',
  component: 'arcgis-hub-entity-breadcrumbs',
};
const defaultArgs = {};
export const Default = () => `
  <arcgis-hub-entity-breadcrumbs
    path="/sites/0e3b18d105b94c39a1f75ed525244658/initiatives/03310862bd5a49a1a20fef1c818c7640/projects/98b390e1f5654f76ab910b1d79f7b2dd"
  ></arcgis-hub-entity-breadcrumbs>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Hub Entity Breadcrumbs';
