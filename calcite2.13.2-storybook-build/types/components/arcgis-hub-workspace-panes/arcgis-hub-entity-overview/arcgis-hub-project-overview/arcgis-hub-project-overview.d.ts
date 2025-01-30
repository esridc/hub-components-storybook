import { EventEmitter } from '../../../../stencil-public-runtime';
import { IHubProject, IHubMapSettings } from '@esri/hub-common';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { IExtent } from '@esri/arcgis-rest-types';
export declare class ArcgisHubProjectOverview {
  element: HTMLElement;
  entity: IHubProject;
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
  get mapSettings(): IHubMapSettings;
  get hasLocation(): boolean;
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
