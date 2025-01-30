import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Metadata/Timeline/Timeline',
  component: 'arcgis-hub-timeline',
  argTypes: {
    timeline: {
      control: {
        type: 'object'
      }
    }
  },
  decorators: [
    withRenderCallback('arcgis-hub-timeline', ($el, { args }) => {
      $el.timelineTitle = args.timeline.title;
      $el.description = args.timeline.description;
      $el.stages = args.timeline.stages;
    }),
    // Story => `<div style="width: 400px; margin: auto;">${Story()}</div>`
  ],
  parameters: {
    layout: 'centered',
  }
};
const defaultArgs = {
  timeline: {
    "title": "The Project We Need",
    "description": "We promise to listen to you",
    "stages": [
      {
        "title": "Discuss It Quickly!",
        "timeframe": "March 3rd, 2022",
        "stageDescription": "It is important that we do this now, in terms of one thing and another",
        "link": {
          "href": "https://google.com",
          "title": "Click here for more information",
        },
        "key": 1638572046394,
        "status": "Not Started"
      },
      {
        "title": "Build It",
        "timeframe": "07.23.2021",
        "stageDescription": "This is a 5 point endeavor, here is how the endeavor will be built while we are building it",
        "key": 1638572046399,
        "status": "In Progress"
      },
      {
        "title": "Ship It",
        "timeframe": "Winter Solstice",
        "stageDescription": "Enemy should not be the perfect of good",
        "link": {
          "href": "https://some-project.com"
        },
        "key": 1638572069521,
        "status": "Skipped"
      },
      {
        "title": "Measure It",
        "timeframe": "The First of January",
        "stageDescription": "We did good work, in my opinion",
        "key": 1638572079915,
        "status": "Complete"
      }
    ]
  }
};
const Component = () => `<arcgis-hub-timeline></arcgis-hub-timeline>`;
export const Default = Component.bind({});
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Timeline';
