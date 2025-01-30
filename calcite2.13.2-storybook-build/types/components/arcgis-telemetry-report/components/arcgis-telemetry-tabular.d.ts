import { ITelemetryDataEntry } from '@esri/telemetry-reporting-client';
import { ITelemetryDataTransformOptions } from '../interfaces';
import { ITableColumn, ITableRow } from '../../functional/interfaces';
import { ComponentIntl } from '../../../utils/stencil-intl';
interface ITabularTransformedData {
  columns: ITableColumn[];
  rows: ITableRow[];
}
export declare class ArcgisTelemetryTabular {
  intl: ComponentIntl;
  element: HTMLElement;
  /**
   * raw telemetry data
   * @type {ITelemetryDataEntry}
   * @memberof ArcgisTelemetryTabular
   */
  data: Array<ITelemetryDataEntry>;
  /**
   * report title
   * @type {string}
   * @memberof ArcgisTelemetryTabular
   */
  reportTitle: string;
  /**
   * report title tooltip
   * @type {string}
   * @memberof ArcgisTelemetryTabular
   */
  titleTooltip: string;
  /**
   * report subtitle
   * @type {string}
   * @memberof ArcgisTelemetryTabular
   */
  subtitle: string;
  /**
   * report transform options
   * @type {ITelemetryDataTransformOptions}
   * @memberof ArcgisTelemetryTabular
   */
  options: ITelemetryDataTransformOptions;
  /**
   * an indication as to whether or not telemetry data
   * is still being fetched
   * @type {boolean}
   * @memberof ArcgisTelemetryTabular
   */
  isLoading: boolean;
  columns: ITableColumn[];
  rows: ITableRow[];
  isTransforming: boolean;
  startItemNumber: any;
  PAGE_VIEWS_TABLE_PAGE_SIZE: number;
  _firstCellRef: HTMLCalciteTableCellElement;
  _calciteTableRef: HTMLCalciteTableElement;
  _paginationRef: HTMLCalcitePaginationElement;
  _pageChanged: boolean;
  componentWillLoad(): Promise<void>;
  /**
   * This method is called after the component has rendered.
   * It performs the following actions:
   * 1. If the pagination reference (`_paginationRef`) is not set and the Calcite table reference (`_calciteTableRef`) is available,
   *    it queries the shadow DOM of the Calcite table for the `calcite-pagination` element and sets the `startItemNumber` to the start item of the pagination.
   * 2. If the page has changed (`_pageChanged`) and the first cell reference (`_firstCellRef`) is available,
   *    it sets focus on the first cell and resets the `_pageChanged` flag to false.
   *
   * @async
   */
  componentDidRender(): Promise<void>;
  handleChange(): void;
  /**
   * function to transform telemetry data into arrays of rows and headers
   * that can be consumed by the arcgis-hub-table component
   */
  transform(data: ITelemetryDataEntry[], options?: ITelemetryDataTransformOptions): Promise<ITabularTransformedData>;
  /**
   * resolves all asynchronous row callback transforms and adds
   * a unique identifier (key) to each row entry
   */
  resolveRow(row: Promise<ITableRow>[], key: string): Promise<ITableRow>;
  handlePageChange: (e: any) => void;
  setTableCellRef: (el: HTMLCalciteTableCellElement) => void;
  capitalize(entry: string): string;
  get shouldRenderErrorTablePagination(): boolean;
  render(): any;
}
export {};
