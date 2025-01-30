import { dictionary } from "@esri/telemetry-dictionary-hub";
export const CHANNEL = {
  allowReply: true,
  allowAsAnonymous: false,
  softDelete: true,
  defaultPostStatus: 'approved',
  allowReaction: true,
  id: 'c1f592e6c6a84a37b94613df3683f5e5',
  access: 'public',
  orgs: [],
  groups: ['0008a64a72654f6487f67efd9d66711d'],
  creator: 'user_3',
  editor: 'user_3',
  createdAt: new Date('2021-07-22T15:12:10.970Z'),
  updatedAt: new Date('2021-07-22T15:12:10.970Z'),
};
export const POST = {
  id: '24df9b6686d14ed9b3a4a3edeb702c07',
  title: 'User 4 post',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  discussion: 'hub://group/23240df5ca77439dbb0438af077e7878',
  creator: 'user_4',
  editor: 'user_4',
  createdAt: new Date('2021-09-29T18:57:58.066Z'),
  updatedAt: new Date('2021-09-29T18:57:58.066Z'),
  status: 'approved',
  geometry: null,
  appInfo: null,
  parent: null,
  replyCount: 2,
};
export const CHIP = {
  appearance: 'outline',
  icon: 'view-hide',
  kind: 'neutral',
  tooltip: {
    telemetry: dictionary.category.interaction.action.open.label.tooltip.details.chipComponentWithStringHidden,
    text: 'Hidden by moderator'
  },
  type: 'hidden',
  value: 'Hidden'
};
