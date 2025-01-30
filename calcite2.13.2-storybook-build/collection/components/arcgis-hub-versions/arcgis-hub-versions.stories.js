export default {
  title: 'Layouts/Versions',
  component: 'arcgis-hub-versions',
  parameters: {
    actions: {
      handles: ['arcgisHubVersionsVersionSelected'],
    },
  },
};
const defaultArgs = {
  itemId: "2b90df90e70549c1a256ebb6230f7451",
  publishedVersionId: "i6d7iyn35",
  activeVersionId: "i6d7iyn35"
};
export const Default = args => `
  <arcgis-hub-versions
    item-id="${args.itemId}"
    published-version-id="${args.publishedVersionId}"
    active-version-id="${args.activeVersionId}"
  ></arcgis-hub-versions>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Versions';
