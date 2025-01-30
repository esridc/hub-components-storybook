import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { IChangeEventDetail, IConfigurationSchema, IConfigurationValues, IUiSchema } from '@esri/hub-common';
import { IFacet } from '../../utils/types';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IWithContext } from '../../utils/state';
export declare class ArcgisStatCardEditor implements IWithContext {
  element: HTMLElement;
  /**
   * The stat card values.
   *
   * @type {IConfigurationValues}
   * @memberof ArcgisStatCardEditor
   */
  values: IConfigurationValues;
  /**
   * The saved colors that should render in the color picker
   */
  themeColors: string[];
  /**
   * Current values that the configuration editor has -- emitted to whatever is listening to arcgisStatCardEditorChange event
   */
  currentValues: IConfigurationValues;
  /**
   * internal schema
   */
  _schema: IConfigurationSchema;
  /**
   * internal uiSchema
   */
  _uiSchema: IUiSchema;
  _context: import("@esri/hub-common").IArcGISContext;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  intl: ComponentIntl;
  /**
   * Event that fires when any values change in the editor. should be subscribed to by the consuming ui.
   */
  arcgisStatCardEditorChange: EventEmitter<IChangeEventDetail>;
  constructor();
  get uiSchemaOptions(): {
    themeColors: string[];
  };
  /**
   * Facets not automatically created with catalogs, used by the gallery picker
   * for the dynamic stat card
   */
  get facets(): IFacet[];
  /**
   * Sets up internationalization and schema/uiSchema
   */
  componentWillLoad(): Promise<void>;
  _getEditorConfig(): Promise<void>;
  migrateValues(values: IConfigurationValues): IConfigurationValues;
  /**
   * Event handler firing on arcgis-stat-card-editor change
   * @param event CustomEvent<IChangeEventDetail> from arcgis-configuration-editor
   */
  handleEditorChangeEvent(event: CustomEvent<IChangeEventDetail>): Promise<void>;
  /**
   * Updates ui schema -- must watch context in case there is any change in authentication
   */
  updateSchemas(): void;
  private translationFunc;
  render(): VNode;
}
