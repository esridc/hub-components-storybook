import { ComponentIntl } from '../../../utils/stencil-intl';
import { HubEntity, IArcGISContext, IHubCardViewModel, IHubSearchResult, IQuery } from '@esri/hub-common';
import { IFacet } from '../../../utils/types/IFacet';
import { CardLayout } from '../../../utils/types/CardLayout';
import { IUser } from '@esri/arcgis-rest-portal';
import { WellKnownFacetTypes } from '../../arcgis-hub-gallery/utils/facets';
import { LayoutOptions } from '../../../utils/types/ILayoutButtonOptions';
export declare class ArcgisHubUserGroupsPane {
  element: HTMLElement;
  intl: ComponentIntl;
  isMobile: boolean;
  _context: IArcGISContext;
  componentWillLoad(): Promise<void>;
  get currentUser(): IUser;
  get query(): IQuery;
  get facets(): Array<WellKnownFacetTypes | IFacet>;
  /**
   * Callback that lets us modify the cardViewModel before it is rendered
   * @param model
   * @param _layout
   * @param _context
   * @param result
   * @returns
   */
  resultCallback: (model: IHubCardViewModel, _layout: CardLayout, _context: IArcGISContext, result: IHubSearchResult | HubEntity) => IHubCardViewModel;
  /**
   * Construct props that will be passed through the gallery, to the
   * `arcgis-hub-add-content` component
   */
  get addContentProps(): Record<string, any>;
  layoutOptions: LayoutOptions[];
  render(): any;
}
