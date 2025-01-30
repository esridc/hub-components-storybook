import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Metadata/Timeline/Timeline Editor',
  component: 'arcgis-hub-timeline-editor',
  argTypes: {
    timeline: {
      control: {
        type: 'object'
      }
    }
  },
  parameters: {
    actions: {
      handles: ['arcgisHubTimelineEditorChange']
    },
  },
  decorators: [
    withRenderCallback('arcgis-hub-timeline-editor', ($el, { args }) => {
      $el.values = args.timeline;
    }),
    withCenteredLayout('30%')
    // Story => `<div style="width: 400px; margin: auto;">${Story()}</div>`
  ]
};
const defaultArgs = {
  showTitleAndDescription: true,
  timeline: {
    "title": "The Project We Need",
    "description": "We Promise to Listen to You!!",
    "stages": [
      {
        "title": "Discuss It Quickly!",
        "timeframe": "March 3rd, 2022",
        "stageDescription": "It is important that we do this now, in terms of one thing and another",
        "link": {
          "href": "https://google.com",
          "title": "Click here for more information",
        },
        "status": "notStarted",
        "key": "stage1638572046394",
      },
      {
        "title": "Build It",
        "timeframe": "07.23.2021",
        "stageDescription": "This is a 5 point endeavor, here is how the endeavor will be built while we are building it",
        "status": "inProgress",
        "key": "stage1638572046399",
      },
      {
        "title": "Ship It",
        "timeframe": "Winter Solstice",
        "stageDescription": "Enemy should not be the perfect of good",
        "link": {
          "href": "https://some-project.com"
        },
        "status": "skipped",
        "key": "stage1638572069521"
      },
      {
        "title": "Measure It",
        "timeframe": "The First of January",
        "stageDescription": "We did good work, in my opinion",
        "status": "complete",
        "key": "stage1638572079915"
      }
    ]
  }
};
const Component = () => `<arcgis-hub-timeline-editor></arcgis-hub-timeline-editor>`;
export const Default = Component.bind({});
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Timeline Editor';
