import { HubEntity, HubEntityType, IQuery } from '@esri/hub-common';
import { VNode } from '../../stencil-public-runtime';
export declare class ArcgisHubBrowseCollectionsWrapper {
  entity: HubEntity;
  identifier: string;
  domain: string;
  view: "browse" | "collection";
  collection: string;
  type: HubEntityType;
  private get _context();
  loading: boolean;
  onIdentifierChange(): Promise<void>;
  onDomainChange(): Promise<void>;
  onCollectionSelected(event: CustomEvent): void;
  private loadDomain;
  private loadEntity;
  componentWillLoad(): void;
  get query(): IQuery;
  renderLoading(): any;
  renderGallery(): VNode;
  renderBrowse(): VNode;
  renderContent(): any;
  render(): any;
}
