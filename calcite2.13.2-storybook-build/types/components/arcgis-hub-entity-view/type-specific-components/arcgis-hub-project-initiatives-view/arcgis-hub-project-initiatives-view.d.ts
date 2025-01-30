import { ComponentIntl } from '../../../../utils/stencil-intl';
import { IQuery, IHubProject, IArcGISContext } from '@esri/hub-common';
export declare class ArcgisHubProjectInitiativesView {
  element: HTMLElement;
  /** ArcGIS Hub entity */
  entity: IHubProject;
  intl: ComponentIntl;
  /** Whether or not we are viewing in mobile */
  isMobile: boolean;
  /** query to fetch all of the project's associated initiatives */
  _associatedInitiativesQuery: IQuery;
  componentWillLoad(): Promise<void>;
  init(): Promise<void>;
  /** global context: contextual portal & auth information */
  get _context(): IArcGISContext;
  render(): any;
}
