import { IQuery, IHubCollection } from '@esri/hub-common';
import { VNode, EventEmitter } from '../../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../../utils/stencil-intl';
import { IFacet, ISerializedGalleryState } from '../../../../../utils/types';
import { ContentPaneTabs, HubEntityWithCatalog } from '../../types';
import { IWithContext } from '../../../../../utils/state';
export declare class ArcgisHubEntityContentCatalog implements IWithContext {
  element: HTMLElement;
  entity: HubEntityWithCatalog;
  isMobile: boolean;
  intl: ComponentIntl;
  facets: IFacet[];
  _context: import("@esri/hub-common").IArcGISContext;
  selectedCollectionKey: string;
  showThumbnail: boolean;
  arcgisHubEntityContentTabChangeRequest: EventEmitter<ContentPaneTabs>;
  constructor();
  componentWillLoad(): Promise<void>;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  contentGalleryRef: HTMLArcgisHubGalleryElement;
  setFacets(): void;
  openCatalogConfigTab(): void;
  /**
   * Combines the entity's catalog scope with the selected collection's scope
   * to create the unified IQuery that will be the base of the gallery's display
   */
  get query(): IQuery;
  get selectedCollection(): IHubCollection;
  get _selectedCollectionKey(): string;
  get collections(): IHubCollection[];
  handleCollectionSelect(evt: any): void;
  get addContentConfig(): any;
  renderNoCollectionsView(): VNode;
  updateShowThumbnail(event: CustomEvent<ISerializedGalleryState>): void;
  handleAddContentWorkflowComplete(): void;
  get catalogGroupIds(): string[];
  render(): any;
}
