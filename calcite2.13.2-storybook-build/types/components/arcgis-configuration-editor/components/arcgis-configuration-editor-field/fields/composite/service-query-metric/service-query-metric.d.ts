import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { IArcGISContext, IConfigurationSchema, IUiSchema, IConfigurationValues, IChangeEventDetail } from '@esri/hub-common';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { IFacet } from "../../../../../../../utils/types";
import { IHubCatalog } from "@esri/hub-common";
import { IField, ILayerDefinition } from '@esri/arcgis-rest-feature-layer';
import { IWithContext } from '../../../../../../../utils/state';
interface IHubCompositeServiceQueryMetric {
  serviceUrl?: string;
  fieldType?: string;
  itemId?: string;
  layerId?: string;
  field?: string;
  statistic?: string;
}
interface IAggregationState {
  aggregationEnum: string[];
  labelsEnum: string[];
}
export declare class ServiceQueryMetric implements IWithContext {
  element: HTMLElement;
  values: IConfigurationValues;
  arcgisCompositeServiceQueryMetricFieldChange: EventEmitter<IHubCompositeServiceQueryMetric>;
  /**
   * The link to the content fetched from the itemId
   */
  sourceLink: string;
  /**
   * The name of the content fetched from the itemId
   */
  sourceTitle: string;
  /**
   * The layers fetched from the itemId
   */
  layers: ILayerDefinition[];
  /**
  * The fields fetched from the feature service url
  */
  fields: IField[];
  /**
  * The url used for the dynamic stat card.
  */
  serviceUrl: string;
  /**
  * The possible aggregations to use for the current combination of itemId/layer/field -- will initialize when intl initializes
  */
  aggregations: IAggregationState;
  isValid: boolean;
  /**
   * Current values that the configuration editor has -- emitted to whatever is listening to arcgisStatCardEditorChange event
   */
  currentValues: IConfigurationValues;
  /**
   * Whether to render skeleton loader or not
   */
  loading: boolean;
  _context: IArcGISContext;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  intl: ComponentIntl;
  _schema: IConfigurationSchema;
  _uiSchema: IUiSchema;
  constructor();
  get uiSchemaOptions(): Record<string, any>;
  get schemaOptions(): Record<string, any>;
  /**
   * Facets not automatically created with catalogs, used by the gallery picker
   * for the dynamic stat card
   */
  get facets(): IFacet[];
  get catalogs(): IHubCatalog[];
  componentWillLoad(): Promise<void>;
  /**
 * Updates ui schema -- must watch context in case there is any change in authentication
 */
  updateUiSchema(): void;
  /**
   * Updates schema -- used when dynamically rendering enums
   */
  updateSchema(): void;
  /**
   * Helper function to fetch dynamic feature service values such as the item's feature service url, the layers of the feature service,
   * and the fields of the layer.
   * @param values new configuration editor values
   */
  updateDynamicValues(values: IConfigurationValues, context: IArcGISContext): Promise<void>;
  /**
   * Intercepts and resets service-query-metric values.
   * This ensures that the service-query-metric component is fully reset when a new item is selected, and no lingering
   * data is set from a previous dataset.
   * @param values
   */
  resetValues(values: IConfigurationValues): void;
  getAggregationsFromField(values: IConfigurationValues): IAggregationState;
  handleCompositeServiceQueryMetricFieldChange(event: CustomEvent<IChangeEventDetail>): Promise<void>;
  private translationFunc;
  render(): any;
}
export {};
