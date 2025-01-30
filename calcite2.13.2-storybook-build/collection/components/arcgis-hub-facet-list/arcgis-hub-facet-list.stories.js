import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Search/Gallery List',
  component: 'arcgis-hub-facet-list',
  argTypes: {
    facets: {
      control: { type: 'array' }
    },
    orderBy: {
      control: { type: 'select' },
      options: ['count', 'label']
    },
  },
  decorators: [
    withRenderCallback('arcgis-hub-facet-list', ($el, { args }) => {
      args.facets.forEach((f) => f.display === 'multi-select' && (f.orderBy = args.orderBy));
      $el.facets = args.facets;
    }),
    withCenteredLayout('300px')
  ]
};
const defaultArgs = {
  orderBy: 'count',
  facets: [
    {
      label: "From",
      key: "from",
      attribute: "",
      display: "single-select",
      options: [
        {
          label: "Esri",
          key: "esri",
          value: "",
          selected: true,
          filter: {
            filterType: "content",
            owner: "esri",
          },
        },
        {
          label: "Anyone",
          key: "anyone",
          value: "",
          selected: false,
          filter: {
            filterType: "content",
            access: "public",
          },
        },
      ],
    },
    {
      label: "Types",
      key: "types",
      attribute: "",
      display: "multi-select",
      options: [
        {
          label: "Web Experience",
          key: "web-experience",
          value: "",
          selected: false,
          count: 10,
          filter: {
            filterType: "content",
            type: "Web Experience"
          }
        },
        {
          label: "Story Maps",
          key: "story-maps",
          value: "",
          selected: false,
          count: 9,
          filter: {
            filterType: "content",
            type: "Web Mapping Application"
          }
        },
        {
          label: "Sites",
          key: "sites",
          value: "",
          selected: false,
          count: 8,
          filter: {
            filterType: "content",
            type: "Site Application"
          }
        },
        {
          label: "PDF",
          key: "pdf",
          value: "",
          selected: false,
          count: 7,
          filter: {
            filterType: "content",
            type: "PDF"
          }
        },
        {
          label: "Initiative",
          key: "initiative",
          value: "",
          selected: false,
          count: 6,
          filter: {
            filterType: "content",
            type: "Hub Initiative"
          }
        },
        {
          label: "Dashboards",
          key: "dashboards",
          value: "",
          selected: true,
          count: 5,
          filter: {
            filterType: "content",
            type: "Dashboard"
          }
        },
        {
          label: "Application (Next Gen)",
          key: "application-next-gen",
          value: "",
          selected: false,
          count: 4,
          filter: {
            filterType: "content",
            type: "Application (Next Gen)"
          }
        },
        {
          label: "Application (Legacy)",
          key: "application-legacy",
          value: "",
          selected: false,
          count: 3,
          filter: {
            filterType: "content",
            type: "Application (Legacy)"
          }
        },
        {
          label: "Application",
          key: "application",
          value: "",
          selected: true,
          count: 2,
          filter: {
            filterType: "content",
            type: "Application"
          }
        },
      ]
    }
  ]
};
export const Default = () => {
  return `<arcgis-hub-facet-list></arcgis-hub-facet-list>`;
};
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Facet List';
