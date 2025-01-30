import { IArcGISContext, IMetric, IResolvedMetric, IServiceQueryMetricSource, IStaticValueMetricSource, IMetricDisplayConfig } from '@esri/hub-common';
import { IErrorMessage } from './interfaces';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IWithContext } from '../../utils/state';
export declare class ArcgisHubMetricCard implements IWithContext {
  element: HTMLElement;
  /**
  * metric to resolve through resolveMetric.
  */
  metric?: IMetric;
  /**
   * metric object encoded as a base-64 string
   */
  encodedMetric?: string;
  /**
  * All display configuration properties to change the appearance of the rendered card
  * e.x. corners, drop shadow, accent color, etc
  */
  cardConfig: IMetricDisplayConfig;
  /**
   * cardConfig object encoded as a base-64 string
   */
  encodedCardConfig: string;
  /**
  * Returned resolved metric that is rendered
  */
  resolvedMetric: IResolvedMetric;
  /**
   * Current error state, if there is one.
   */
  errorMessage: IErrorMessage;
  isLoading: boolean;
  /** global context */
  _context: IArcGISContext;
  intl: ComponentIntl;
  constructor();
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Calls resolveMetric in hub.js to return the IResolvedMetric for the metric.
   */
  resolveMetric(): Promise<void>;
  beginResolveMetric(): void;
  componentWillLoad(): void;
  resolveMetricWithTimeout(metric: IMetric, context: IArcGISContext, serverTimeout: number): Promise<IResolvedMetric | any>;
  verifyCompleteSource(metric: IMetric): boolean;
  verifyStaticQuery(source: IStaticValueMetricSource): boolean;
  verifyServiceQuery(source: IServiceQueryMetricSource): boolean;
  /**
   * Prepares a metric that was not encoded and passed in. Will decode specific encoded properties.
   * If property is not encoded, running decodeURIComponent on the property has no effect.
   * @param metric
   * @returns
   */
  prepareMetric(metric: IMetric): IMetric;
  get cardComponent(): string;
  get _cardConfig(): IMetricDisplayConfig;
  render(): any;
}
