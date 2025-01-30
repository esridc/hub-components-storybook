import { HubEntity, IHubInitiative, IHubProject, IMetricDisplayConfig } from "@esri/hub-common";
export declare class ArcgisHubEntityMetricsView {
  element: HTMLElement;
  /** ArcGIS Hub entity */
  entity: HubEntity;
  get metricsEntity(): IHubProject | IHubInitiative;
  /** metrics tab featured + visible metric displays */
  get metricDisplays(): Array<IMetricDisplayConfig>;
  /** render a grid of metrics */
  renderMetrics(): HTMLElement[];
  render(): any;
}
