export declare const STATIC_METRIC: {
  description: string;
  name: string;
  source: {
    type: string;
    value: number;
  };
  units: string;
};
export declare const DYNAMIC_METRIC: {
  description: string;
  name: string;
  source: {
    field: string;
    layerId: number;
    serviceUrl: string;
    statistic: string;
    type: string;
  };
  units: string;
};
export declare const STATIC_CARD_CONFIG: {
  cardTitle: string;
  sourceLink: string;
  sourceTitle: string;
  type: string;
  textAlign: string;
  trailingText: string;
  unit: string;
  valueColor: string;
};
export declare const DYNAMIC_CARD_CONFIG: {
  cardTitle: string;
  sourceLink: string;
  sourceTitle: string;
  type: string;
  textAlign: string;
  trailingText: string;
  unit: string;
  valueColor: string;
};
