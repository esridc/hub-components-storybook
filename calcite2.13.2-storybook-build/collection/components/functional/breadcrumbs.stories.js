import { withNotice } from '../../../.storybook/decorators/withNotice';
export default {
  title: 'Functional/Breadcrumbs',
  decorators: [
    withNotice('Because this is a functional component, it is difficult to represent fully in storybook. Please visit our harness.', { text: 'Try the harness example', href: 'https://friendly-adventure-7w1eyl2.pages.github.io/harnesses/html/functional/breadcrumbs.html' }, undefined, { icon: "information", kind: "brand" }),
  ],
};
export const Default = () => '';
Default.storyName = 'Breadcrumbs';
