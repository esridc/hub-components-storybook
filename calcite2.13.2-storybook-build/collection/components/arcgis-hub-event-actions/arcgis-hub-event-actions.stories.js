import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Events/Event Actions',
  component: 'arcgis-hub-event-actions',
  decorators: [
    withCenteredLayout('30%'),
    withNotice('This component requires authentication to render. Please auth as paige_pa on QA.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/arcgis-hub-event-actions/index.html?identifier=cluja1blq00368c01jc1fkakhx' }, undefined, { style: "margin-block-end: 2rem;" })
  ],
  argTypes: {
    identifier: {
      control: { type: 'text' }
    },
    entity: { control: false }
  }
};
const defaultArgs = {
  identifier: 'clyegwbsz004x6q01866nq5cr',
};
export const Default = (args) => `
  <arcgis-hub-event-actions
    identifier='${args.identifier}'
  ></arcgis-hub-event-actions>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Event Actions';
