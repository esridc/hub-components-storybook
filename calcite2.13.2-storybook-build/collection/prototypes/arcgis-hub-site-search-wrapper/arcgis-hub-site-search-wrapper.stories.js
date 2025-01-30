export default {
  title: 'Prototypes/Hub Site Search Wrapper',
  component: 'arcgis-hub-site-search-wrapper',
};
const defaultArgs = {
  argOne: 'arg-one-value'
};
export const Default = args => `
  <arcgis-hub-site-search-wrapper
    arg-one="${args.argOne}"
  ></arcgis-hub-site-search-wrapper>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Hub Site Search Wrapper';
