import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Deprecated/Download Notice',
  component: 'hub-download-notice',
  decorators: [withCenteredLayout('400px')]
};
const defaultArgs = {
  fileStatus: 'creating',
  exportRequested: true,
  apiError: '',
  lastEditDate: new Date().toISOString()
};
export const Default = args => `
  <hub-download-notice
    file-status="${args.fileStatus}"
    export-requested="${args.exportRequested}"
    api-error="${args.apiError}"
    last-edit-date="${args.lastEditDate}"
  ></hub-download-notice>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Download Notice';
