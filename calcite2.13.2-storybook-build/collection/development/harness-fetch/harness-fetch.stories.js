export default {
  title: 'Development/Harness Fetch',
  component: 'harness-fetch',
  parameters: {
    actions: {
      handles: ['harnessFetchEntity', 'harnessFetchIdentifierChange', 'harnessFetchTypeChange'],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => `<div style="width:80vw;">${Story()}</div>`
  ]
};
const defaultArgs = {
  identifier: '62b7be7ae93943f5bb5d13310baf435f',
  type: 'site',
  showIdentifierInput: true,
  showTypeInput: true
};
export const Default = (args) => `
  <harness-fetch
    identifier="${args.identifier}"
    show-type-input="${args.showTypeInput}"
    show-identifier-input="${args.showIdentifierInput}"
    type="${args.type}"
  ></harness-fetch>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Harness Fetch';
