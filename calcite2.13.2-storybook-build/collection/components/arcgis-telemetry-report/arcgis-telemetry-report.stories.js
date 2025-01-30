import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
const defaultArgTypes = {
  telemetryEvent: {
    control: { type: 'select' },
    options: ["page-views", "referrers", "sessions", "session-activity"]
  },
  startDate: {
    control: { type: 'date' }
  },
  endDate: {
    control: { type: 'date' }
  },
  type: {
    control: { type: 'select' },
    options: ["metric", "value", "tabular", "line", "bar", "pie"]
  },
};
export default {
  title: 'Telemetry/Reports',
  component: 'arcgis-telemetry-report',
  argTypes: defaultArgTypes,
  decorators: [
    withRenderCallback('arcgis-telemetry-report', ($el, { args }) => {
      args.category && ($el.category = args.category);
      args.limit && ($el.limit = args.limit);
      $el.startDate = new Date(args.startDate).toISOString() || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();
      $el.endDate = new Date(args.endDate).toISOString() || new Date().toISOString();
      $el.dimensionFilters = args.dimensionFilters;
      $el.series = args.series;
      $el.orderBy = args.orderBy;
      $el.telemetryEvent = args.telemetryEvent;
      $el.telemetryContext = args.telemetryContext;
      if (args.telemetryEvent === "sessions" || args.telemetryEvent === "session-activity") {
        $el.contentId = null;
      }
      if (["tabular", "line", "bar", "pie"].includes(args.type)) {
        $el.style.width = "90%";
        $el.style.height = "90%";
      }
    }),
    (Story) => `<div style="height:100%; display:flex; align-items:center; justify-content:center;">${Story()}</div>`
  ]
};
// these are probably out of date since brollywood has been retired
const defaultArgs = {
  contentId: "portal:d4f484fe02324aaf86c4275a5ee72d3e",
  dimensionFilters: [],
  hostname: "brollywood.hikes.dev",
  orderBy: [],
  reportTitle: 'Report Title',
  series: [],
  startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
  endDate: new Date(),
  subtitle: 'this is the report subtitle',
  titleTooltip: 'this is the report title tooltip',
  telemetryContext: {},
  telemetryEvent: "page-views"
};
/** DEFAULT TEMPLATE */
const Template = args => `
  <arcgis-telemetry-report
    content-id="${args.contentId}"
    hostname="${args.hostname}"
    report-title="${args.reportTitle}"
    subtitle="${args.subtitle}"
    start-date="${args.startDate}"
    end-date="${args.endDate}"
    title-tooltip="${args.titleTooltip}"
    type="${args.type}">
  </arcgis-telemetry-report>
`;
/** TELEMETRY VALUE */
export const Value = Template.bind({});
Value.args = Object.assign(Object.assign({}, defaultArgs), { type: "value", dimensionFilters: [
    { name: "action", any: ["Manage"] }
  ] });
/** TELEMETRY METRIC */
export const Metric = Template.bind({});
Metric.args = Object.assign(Object.assign({}, defaultArgs), { type: "metric", dimensionFilters: [
    { name: "action", any: ["Manage"] }
  ] });
/** TELEMETRY TABLE */
export const Table = Template.bind({});
Table.args = Object.assign(Object.assign({}, defaultArgs), { type: "tabular", contentId: "", series: [
    "id",
    "type"
  ], limit: 10, orderBy: [{ name: "other-events:count", direction: "desc" }], telemetryEvent: { category: "Navigation", action: "Manage" }, telemetryContext: {
    customDimensionsConfig: {
      details: 1,
      userType: 2,
      id: 3,
      type: 4
    }
  } });
Table.argTypes = Object.assign(Object.assign({}, defaultArgTypes), { telemetryEvent: {
    control: { type: "object" }
  } });
/** TELEMETRY CHART */
export const Chart = Template.bind({});
Chart.args = Object.assign(Object.assign({}, defaultArgs), {
  // override the outdated site info above
  // I think 62b7be7ae93943f5bb5d13310baf435f is the corresponding site id, but
  // contentId: 'portal:62b7be7ae93943f5bb5d13310baf435f',
  // results in all data points being 0
  contentId: '', hostname: 'brollywood-4-qa-pre-a-hub.hubqa.arcgis.com',
  // chart specific arguments
  type: "bar", category: "day", orderBy: [{ name: "day", direction: "asc" }]
});
