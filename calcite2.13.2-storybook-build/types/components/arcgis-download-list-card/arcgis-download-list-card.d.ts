import { IItem } from '@esri/arcgis-rest-portal';
import { EventEmitter } from '../../stencil-public-runtime';
import { FileFormat, IGeometry, ILayerOptions, IServerDefinition } from '../../utils/download-features';
import { ComponentIntl } from "../../utils/stencil-intl";
/**
 * DEPRECATED. Use `arcgis-hub-download-list` instead.
 * This component will be removed once the new component is fully tested and ready for production.
 */
export declare class ArcgisDownloadListCard {
  element: HTMLElement;
  fileFormat: FileFormat;
  filterGeometry: IGeometry;
  item: IItem;
  layers: string | number[] | ILayerOptions[];
  server: string | IServerDefinition;
  /**
   * Whether an error message should be displayed below the download button.
   */
  showError: boolean;
  errorMessage: string;
  hubTelemetry: EventEmitter<any>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  get formatIcon(): string;
  private get _context();
  get canDisplayErrorMessage(): boolean;
  handleCalciteNoticeClose(): void;
  clearErrors(): void;
  handleArcgisDownloadError(event: CustomEvent<any>): void;
  handleCalciteInternalAccordionChange(e: CustomEvent): void;
  renderErrorContent(): any;
  render(): any;
}
