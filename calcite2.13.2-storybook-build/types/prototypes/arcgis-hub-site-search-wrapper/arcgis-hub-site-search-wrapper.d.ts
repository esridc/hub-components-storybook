import { HubEntity, HubEntityType, IHubCatalog } from '@esri/hub-common';
export declare class ArcgisHubSiteSearchWrapper {
  entity: HubEntity;
  identifier: string;
  type: HubEntityType;
  private get _context();
  view: string;
  mode: "unified" | "separate";
  term: string;
  loading: boolean;
  onIdentifierChange(): Promise<void>;
  private loadEntity;
  componentWillLoad(): void;
  get catalogs(): IHubCatalog[];
  get showBrowseAll(): boolean;
  onSearchChange(event: CustomEvent): void;
  renderLoading(): any;
  renderContent(): any;
  render(): any;
}
