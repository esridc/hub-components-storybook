export default {
  title: 'Development/Harness Header',
  component: 'harness-header',
};
const defaultArgs = {
  pageTitle: 'This is the page title'
};
export const Default = (args) => `
  <harness-header
    page-title="${args.pageTitle}"
  ></harness-header>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Harness Header';
