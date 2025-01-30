import { HubCapability, HubEntity, IHubCatalog, IQuery } from '@esri/hub-common';
import { EventEmitter, VNode } from '../../stencil-public-runtime';
export declare class ArcgisHubBrowseCollections {
  entity: HubEntity;
  capability: HubCapability;
  searchValue: string;
  onSearchChange(event: CustomEvent): void;
  constructor();
  /**
   * Raise event when a collection is selected
   */
  hubBrowseCollectionSelected: EventEmitter<string>;
  get catalog(): IHubCatalog;
  private get _context();
  handleClickMore(evt: MouseEvent): void;
  get queries(): any[];
  renderHeader(): VNode;
  renderGallery(qry: IQuery & {
    key: string;
    label: string;
  }): VNode;
  render(): any;
}
