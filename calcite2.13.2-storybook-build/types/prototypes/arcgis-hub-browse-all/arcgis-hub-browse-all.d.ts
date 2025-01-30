import { Collection, HubEntity, IHubCatalog, IHubSearchResult, IQuery, CardModelTarget } from '@esri/hub-common';
import { VNode, EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { LayoutOptions } from '../../utils/types';
export declare class ArcgisHubBrowseAll {
  element: HTMLElement;
  /**
   * The entity whose capabilities we are browsing
   */
  entity: HubEntity;
  layout: LayoutOptions;
  showSearch: boolean;
  linkTarget: CardModelTarget;
  /**
   * Content Hierarchy Path that will be appended onto the urls of individual cards
   * as `?path=${path}`
   */
  path: string;
  /**
 * Term passed into the galleries
 */
  term: string;
  /**
   * The mode of the browse all component
   * - gallery-list: display a list of galleries
   * - combined: query all catalogs & collections and show in a big list, sorted by date, with buttons to explore more from each catalog,
   */
  mode: 'gallery-list' | 'combined';
  loading: boolean;
  gridColumns: number;
  combinedResults: IHubSearchResult[];
  onSearchChange(event: CustomEvent): void;
  hubBrowseMoreSelected: EventEmitter<string>;
  /**
    * Instance of the ComponentIntl class used for i18n
    */
  intl: ComponentIntl;
  private get _context();
  constructor();
  componentWillLoad(): Promise<void>;
  get catalogs(): IHubCatalog[];
  handleClickMore(evt: MouseEvent): void;
  combinedSearch(): Promise<void>;
  get resultContainerClass(): string;
  renderHeader(): VNode;
  renderCatalog(catalog: IHubCatalog): VNode[];
  renderCollection(catalogTitle: string, collection: Collection): VNode;
  renderGallery(title: string, query: IQuery): VNode;
  renderCombined(): VNode;
  render(): any;
}
