import { HubEntity, IHubInitiative, IQuery } from '@esri/hub-common';
import { EventEmitter } from '../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { CalciteTabTitleCustomEvent } from '@esri/calcite-components';
export declare class ArcgisHubInitiativeAbout {
  element: HTMLElement;
  /** ArcGIS Hub initiative entity */
  entity: HubEntity;
  /**
   * Content Hierarchy Path that will be passed onto the gallery component
   * so links are constructed with the correct path
   */
  path: string;
  /**
   * count of the initiative's associated projects - we
   * keep track of this to conditionally render an overflow pattern (explore button
   * + projects tab) when the initiative has > 4 associated projects
   */
  _associatedProjectsCount: number;
  /**
  * Event emitted when a button or other element is interacted with to change tabs.
  */
  arcgisHubEntityAboutTabChange: EventEmitter<CalciteTabTitleCustomEvent<void>>;
  /** Instance of the ComponentIntl class used for i18n */
  intl: ComponentIntl;
  /** query to fetch all of the initiative's associated projects */
  _associatedProjectsQuery: IQuery;
  constructor();
  init(): Promise<void>;
  get initiative(): IHubInitiative;
  /** global context: contextual portal & auth information */
  private get _context();
  componentWillLoad(): Promise<void>;
  handleTabChange: (evt: CalciteTabTitleCustomEvent<void>) => void;
  /**
   * Renders associated projects of the initiative
   * Renders at max 4 -- if there are more, then we
   * render a button to explore all projects
   */
  renderAssociatedProjects(): HTMLElement;
  render(): any;
}
