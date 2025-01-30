import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
export default {
  title: 'Search/Gallery Options',
  component: 'arcgis-hub-facet-options',
  argTypes: {
    facet: {
      control: {
        type: 'object'
      }
    }
  },
  decorators: [
    withRenderCallback('arcgis-hub-facet-options', ($el, { args }) => {
      $el.facet = args.facet;
    })
  ]
};
const defaultArgs = {
  label: "Types",
  attribute: "",
  type: "multi-select",
  options: [
    {
      label: "Application",
      value: "",
      selected: true,
      filter: {
        filterType: "content",
        type: "Application"
      }
    },
    {
      label: "Story Maps",
      value: "",
      selected: false,
      filter: {
        filterType: "content",
        type: "Web Mapping Application"
      }
    },
    {
      label: "Dashboards",
      value: "",
      selected: true,
      filter: {
        filterType: "content",
        type: "Dashboard"
      }
    },
    {
      label: "PDF",
      value: "",
      selected: false,
      filter: {
        filterType: "content",
        type: "PDF"
      }
    },
    {
      label: "Sites",
      value: "",
      selected: false,
      filter: {
        filterType: "content",
        type: "Site Application"
      }
    },
    {
      label: "Initiative",
      value: "",
      selected: false,
      filter: {
        filterType: "content",
        type: "Hub Initiative"
      }
    },
    {
      label: "Web Experience",
      value: "",
      selected: false,
      filter: {
        filterType: "content",
        type: "Web Experience"
      }
    }
  ]
};
export const Default = (args) => `
  <arcgis-hub-facet-options
    facet="${args.facet}"
  ></arcgis-hub-facet-options>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Facet Options';
