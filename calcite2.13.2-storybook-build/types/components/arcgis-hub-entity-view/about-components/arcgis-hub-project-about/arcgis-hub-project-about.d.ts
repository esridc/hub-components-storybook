import { HubEntity, IHubProject, IQuery } from '@esri/hub-common';
import { EventEmitter } from '../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { CalciteTabTitleCustomEvent } from '@esri/calcite-components';
export declare class ArcgisHubProjectAbout {
  element: HTMLElement;
  /** ArcGIS Hub project entity */
  entity: HubEntity;
  /**
   * Content Hierarchy Path that will be passed onto the gallery component
   * so links are constructed with the correct path
   */
  path: string;
  /**
   * count of the project's associated initiatives - we
   * keep track of this to conditionally render an overflow
   * pattern (explore all button + Initiatives tab) when the
   * project has > 5 associated initiatives
   */
  _associatedInitiativesCount: number;
  /**
   * Event emitted when a button or other element is interacted with to change tabs.
   */
  arcgisHubEntityAboutTabChange: EventEmitter<CalciteTabTitleCustomEvent<void>>;
  /** Instance of the ComponentIntl class used for i18n */
  intl: ComponentIntl;
  /** query to fetch all of the project's associated initiatives */
  _associatedInitiativesQuery: IQuery;
  constructor();
  init(): Promise<void>;
  /** global context: contextual portal & auth information */
  private get _context();
  get project(): IHubProject;
  componentWillLoad(): Promise<void>;
  handleTabChange(evt: CalciteTabTitleCustomEvent<void>): void;
  /**
   * Renders associated initiatives of the project
   * Renders at max 4 -- if there are more, then we
   * render a button to explore all initiatives
   */
  renderAssociatedInitiatives(): HTMLElement;
  render(): any;
}
