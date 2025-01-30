import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Views/Group Member Summary',
  component: 'arcgis-hub-group-member-summary',
  decorators: [
    withRenderCallback('arcgis-hub-group-member-summary', ($el, { args }) => {
      $el.membershipSummary = args.membershipSummary;
    })
  ],
  parameters: {
    layout: 'centered',
  }
};
const defaultArgs = {
  membershipSummary: {
    "total": 5,
    "users": [
      {
        "username": "juliana_pa",
        "fullName": "Juliana Mascasa",
        "memberType": "member",
        "thumbnail": "hub-profile-1559840260833.png",
        "joined": 1585083488000
      },
      {
        "username": "paige_pa",
        "joined": 1568748572000
      },
      {
        "username": "qa_pre_a_hub_admin",
        "joined": 1597785206000
      }
    ]
  }
};
export const Default = () => `
  <arcgis-hub-group-member-summary />
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Group Member Summary';
