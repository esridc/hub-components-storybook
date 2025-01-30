import { ComponentIntl } from '../../../utils/stencil-intl';
import { HubEntity, IArcGISContext, IHubCardViewModel, IHubSearchResult, IQuery, SortOption } from '@esri/hub-common';
import { CardLayout } from '../../../utils/types/CardLayout';
import { LayoutOptions } from '../../../utils/types';
import { WellKnownFacetTypes } from '../../arcgis-hub-gallery/utils/facets';
/**
 * A component that allows the current user to view and manage their events
 * This is expected to be used in the user workspace.
 */
export declare class ArcgisHubUserEventsPane {
  element: HTMLElement;
  intl: ComponentIntl;
  isMobile: boolean;
  _context: IArcGISContext;
  componentWillLoad(): Promise<void>;
  get query(): IQuery;
  layoutOptions: LayoutOptions[];
  facets: WellKnownFacetTypes[];
  sortOptions: SortOption[];
  /**
   * Callback that lets us modify the cardViewModel before it is rendered
   * @param model
   * @param _layout
   * @param _context
   * @param result
   * @returns
   */
  resultCallback: (originalModel: IHubCardViewModel, _layout: CardLayout, _context: IArcGISContext, result: IHubSearchResult | HubEntity) => IHubCardViewModel;
  /**
     * Construct props that will be passed through the gallery, to the
     * `arcgis-hub-add-content` component
     */
  get addContentProps(): Record<string, any>;
  render(): any;
}
