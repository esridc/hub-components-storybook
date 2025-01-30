import { HubEntity, HubEntityType, IHubSearchResult, IMetricDisplayConfig, IWithViewSettings } from '@esri/hub-common';
import { EventEmitter, VNode } from '../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { CalciteTabTitleCustomEvent } from '@esri/calcite-components';
/**
 * generic entity overview tab component
 *
 * note: there is currently no flexibility when it comes to
 * sections/headings/layout. This is something we plan
 * to continue iterating on and integrating with the next
 * generation layout system
 *
 * @slot - main slot for adding content below the default main content
 * @slot - sidebar slot for adding content below the default sidebar content
 */
export declare class ArcgisHubEntityAbout {
  element: HTMLElement;
  /** ArcGIS Hub entity */
  entity: HubEntity;
  /**
   * Content Hierarchy Path that will be passed onto the gallery component
   * so links are constructed with the correct path
   */
  path: string;
  /**
   * Whether the entity has featured content that is
   * visible to the current user
   */
  hasFeaturedContent: boolean;
  /**
   * Event emitted when a button or other element is interacted with to change tabs.
   */
  arcgisHubEntityAboutTabChange: EventEmitter<CalciteTabTitleCustomEvent<void>>;
  /** Instance of the ComponentIntl class used for i18n */
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  constructor();
  /** global context: contextual portal & auth information */
  private get _context();
  get entityType(): HubEntityType;
  get view(): IWithViewSettings;
  get shouldRenderAbout(): boolean;
  get shouldRenderStatus(): boolean;
  get featuredImageUrl(): string;
  get metricDisplays(): Array<IMetricDisplayConfig>;
  get featuredMetricDisplays(): Array<IMetricDisplayConfig>;
  /**
   * We must listen to the change in results from the gallery
   * to determine whether to render the "Featured content" section.
   * We can't simply check the length of the featuredContentIds array
   * because the current user may not have access to all of the items
   */
  handleFeaturedContentResultsChange: (evt: CustomEvent<IHubSearchResult[]>) => void;
  handleTabChange: (evt: CalciteTabTitleCustomEvent<void>) => void;
  renderAbout(): VNode;
  renderMetrics(): VNode;
  renderFeaturedContent(): VNode;
  renderStatus(): VNode;
  renderMetadata(): VNode;
  render(): any;
}
