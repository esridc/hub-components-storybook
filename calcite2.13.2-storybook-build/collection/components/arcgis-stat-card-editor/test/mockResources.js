export const STATIC_METRIC = {
  description: "Trailing Text",
  name: "Card Title",
  source: {
    type: "static-value",
    value: 13,
  },
  units: "%",
};
export const DYNAMIC_METRIC = {
  description: "Trailing Text",
  name: "Card Title",
  source: {
    field: "budget",
    layerId: 0,
    serviceUrl: "https://servicesqa.arcgis.com/T5cZDlfUaBpDnk6P/arcgis/rest/services/2019_US_coastline/FeatureServer",
    statistic: "count",
    type: "service-query",
  },
  units: "%",
};
export const STATIC_CARD_CONFIG = {
  cardTitle: "Card Title",
  sourceLink: "link",
  sourceTitle: "title",
  type: "static",
  textAlign: "center",
  trailingText: "Trailing Text",
  unit: "%",
  valueColor: "#ffffff",
};
export const DYNAMIC_CARD_CONFIG = {
  cardTitle: "Card Title",
  sourceLink: "link",
  sourceTitle: "title",
  type: "dynamic",
  textAlign: "center",
  trailingText: "Trailing Text",
  unit: "%",
  valueColor: "#ffffff",
};
