declare const _default: {
  title: string;
  component: string;
};
export default _default;
export declare const Default: {
  (args: any): string;
  args: {
    staticMetric: {
      id: string;
      name: string;
      description: string;
      units: string;
      source: {
        type: string;
        value: string;
      };
      entityInfo: {
        id: string;
        type: string;
        name: string;
      };
    };
    staticCardConfig: {
      cardTitle: string;
      displayType: string;
      shareable: boolean;
      shareableByValue: boolean;
      metricId: string;
      trailingText: string;
      type: string;
      sourceLink: string;
      sourceTitle: string;
      corners: string;
      valueColor: string;
    };
    dynamicMetric: {
      id: string;
      name: string;
      description: string;
      units: string;
      source: {
        type: string;
        serviceUrl: string;
        layerId: number;
        field: string;
        statistic: string;
      };
      entityInfo: {
        id: string;
        type: string;
        name: string;
      };
    };
    dynamicCardConfig: {
      cardTitle: string;
      displayType: string;
      shareable: boolean;
      shareableByValue: boolean;
      metricId: string;
      trailingText: string;
      type: string;
      sourceLink: string;
      sourceTitle: string;
      corners: string;
      valueColor: string;
    };
    encodedStaticMetric: string;
    encodedStaticCardConfig: string;
    encodedDynamicMetric: string;
    encodedDynamicCardConfig: string;
  };
  storyName: string;
};
