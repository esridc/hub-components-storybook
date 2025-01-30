import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withNotice } from '../../../.storybook/decorators/withNotice.js';
const argTypes = {
  noticeId: {
    control: { type: 'select' },
    options: ['20240220-hosted-downloads-1', '20240220-hosted-downloads-2', '20240220-hosted-downloads-3']
  },
  notice: {
    control: { type: 'object' }
  }
};
const parameters = {
  controls: {
    expanded: true,
    exclude: ['notice'],
    sort: 'alpha',
  }
};
export default {
  title: 'Layouts/Notices',
  component: 'arcgis-hub-notice',
  argTypes,
  parameters
};
const storyNoticeOpts = {
  icon: 'information',
  kind: "info",
  open: true,
  scale: "l",
  style: "margin-block-end: 2rem;"
};
const defaultArgs = {
  notice: {
    message: 'This is a notice',
    title: 'This is a title',
    configuration: {
      noticeType: 'notice'
    }
  },
  noticeId: '20240220-hosted-downloads-1',
  place: ''
};
export const NoticeId = args => `
  <arcgis-hub-notice
    notice-id="${args.noticeId}"
    place="${args.place}"
  ></arcgis-hub-notice>
`;
NoticeId.args = Object.assign({}, defaultArgs);
NoticeId.decorators = [withNotice('This story demonstrates usage of the component with a preconfigured notice-id', '', '', storyNoticeOpts)];
NoticeId.storyName = 'Hub Notice with notice-id';
export const Notice = args => `
  <arcgis-hub-notice
    notice="${args.notice}"
    place="${args.place}"
  ></arcgis-hub-notice>
`;
Notice.args = Object.assign({}, defaultArgs);
Notice.decorators = [
  withNotice('This story demonstrates usage of the component with an ad-hoc IHubNotice object', '', '', storyNoticeOpts),
  withRenderCallback('arcgis-hub-notice', ($el, { args }) => {
    args.notice && ($el.notice = args.notice);
  })
];
Notice.parameters = Object.assign(Object.assign({}, parameters), { controls: { expanded: true, exclude: ['noticeId'], sort: 'alpha' } });
Notice.storyName = 'Hub Notice with notice object';
