export default {
  title: 'Visualization/Hub Metric Card',
  component: 'arcgis-hub-metric-card',
};
const defaultArgs = {
  staticMetric: {
    id: "c123456",
    name: "coastline",
    description: "The coastline metric",
    units: "%",
    source: {
      type: 'static-value',
      value: '12',
    },
    entityInfo: {
      id: 'siteId',
      type: 'site',
      name: 'My Site',
    }
  },
  staticCardConfig: {
    cardTitle: "Coastline info",
    displayType: "stat-card",
    shareable: true,
    shareableByValue: false,
    metricId: "c123456",
    trailingText: "this is the trailing text...",
    type: "static",
    sourceLink: "link",
    sourceTitle: "title",
    corners: "round",
    valueColor: "#366078",
  },
  dynamicMetric: {
    id: "c2345",
    name: "coastline",
    description: "The coastline metric",
    units: "%",
    source: {
      type: "service-query",
      serviceUrl: "https://servicesqa.arcgis.com/T5cZDlfUaBpDnk6P/arcgis/rest/services/2019_US_coastline/FeatureServer",
      layerId: 0,
      field: "FID",
      statistic: "count",
    },
    entityInfo: {
      id: 'siteId',
      type: 'site',
      name: 'My Site',
    }
  },
  dynamicCardConfig: {
    cardTitle: "Coastline FID",
    displayType: "stat-card",
    shareable: true,
    shareableByValue: false,
    metricId: "c2345",
    trailingText: "this is the trailing text...",
    type: "dynamic",
    sourceLink: "link",
    sourceTitle: "Coastline",
    corners: "round",
    valueColor: "#366078",
  },
  encodedStaticMetric: '',
  encodedStaticCardConfig: '',
  encodedDynamicMetric: '',
  encodedDynamicCardConfig: '',
};
defaultArgs.encodedStaticMetric = window.btoa(JSON.stringify(defaultArgs.staticMetric));
defaultArgs.encodedStaticCardConfig = window.btoa(JSON.stringify(defaultArgs.staticCardConfig));
defaultArgs.encodedDynamicMetric = window.btoa(JSON.stringify(defaultArgs.dynamicMetric));
defaultArgs.encodedDynamicCardConfig = window.btoa(JSON.stringify(defaultArgs.dynamicCardConfig));
export const Default = args => `
  <arcgis-hub-metric-card
  encoded-card-config=${args.encodedStaticCardConfig}
  encoded-metric=${args.encodedStaticMetric}
  ></arcgis-hub-metric-card>
  <arcgis-hub-metric-card
  encoded-card-config=${args.encodedDynamicCardConfig}
  encoded-metric=${args.encodedDynamicMetric}
  ></arcgis-hub-metric-card>
  `;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Hub Metric Card';
