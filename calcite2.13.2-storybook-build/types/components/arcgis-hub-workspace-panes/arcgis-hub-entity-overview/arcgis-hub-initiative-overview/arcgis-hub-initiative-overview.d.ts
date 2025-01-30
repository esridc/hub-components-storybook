import { EventEmitter } from '../../../../stencil-public-runtime';
import { IHubInitiative, IHubMapSettings } from '@esri/hub-common';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { IExtent } from '@esri/arcgis-rest-types';
export declare class ArcgisHubInitiativesOverview {
  element: HTMLElement;
  entity: IHubInitiative;
  hubTelemetry: EventEmitter<Record<string, any>>;
  intl: ComponentIntl;
  orgExtent: IExtent;
  private get _context();
  componentWillLoad(): Promise<void>;
  /**
   * Determine whether to show page views. We don't show page views
   * on the Hub Home or umbrella sites because the telemetry service
   * currently requires they be scoped by a hostname or contentId.
   */
  get shouldShowPageViews(): boolean;
  get hasLocation(): boolean;
  get mapSettings(): IHubMapSettings;
  get extent(): IExtent;
  get graphics(): any[];
  renderPageViews(): HTMLArcgisTelemetryReportElement;
  renderMetadata(): HTMLElement;
  renderLearnAboutNotice(): HTMLCalciteNoticeElement;
  renderStatusAndPurpose(): HTMLElement;
  renderPurpose(): HTMLElement;
  renderMap(): HTMLArcgisHubMapElement;
  renderEditButton(): HTMLCalciteButtonElement;
  render(): any;
}
