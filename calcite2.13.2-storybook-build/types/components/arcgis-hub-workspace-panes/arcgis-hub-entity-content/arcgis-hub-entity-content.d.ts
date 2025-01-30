import { VNode, EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { ContentPaneTabs, HubEntityWithCatalog } from './types';
interface IContentTabConfiguration {
  title: string;
  key: ContentPaneTabs;
  contentRender: () => VNode;
  sidePanelRender?: () => VNode;
  needsFooter?: boolean;
}
export declare class ArcgisHubEntityContent {
  element: HTMLElement;
  entity: HubEntityWithCatalog;
  isMobile: boolean;
  intl: ComponentIntl;
  selectedPrimaryTab: ContentPaneTabs;
  footerSlotElement: HTMLElement;
  isDirty: boolean;
  /**
   * This state is used to store the tab the user attempted to click
   *
   * See the `attemptedClick` prop in `arcgis-hub-workspace` for a similar use
   * case with panes, hrefs, and opening the share modal
   */
  attemptedClick: {
    tab: ContentPaneTabs;
    clickEvent: MouseEvent | KeyboardEvent;
  };
  hubTelemetry: EventEmitter<any>;
  constructor();
  componentWillLoad(): Promise<void>;
  get tabConfigurations(): IContentTabConfiguration[];
  get currentTabConfiguration(): IContentTabConfiguration;
  /**
   * Child tabs will emit this event when they want to change the primary tab
   *
   * ex: when a user clicks a link that isn't necessarily a tab, but should change the tab
   */
  handleTabChangeRequest(event: CustomEvent<ContentPaneTabs>): void;
  openCatalogConfigTab(): void;
  handlePrimaryTabSelect(evt: any): void;
  handlePrimaryTabKeyDown(evt: KeyboardEvent): void;
  handleDirtyStateModalClosed(event: CustomEvent): void;
  handleEntityChange(event: CustomEvent): void;
  setFooterSlotElement(el: any): void;
  renderCatalogTab(): VNode;
  renderCatalogSidePanel(): VNode;
  renderCatalogConfigTab(): VNode;
  renderCatalogConfigSidePanel(): VNode;
  renderCollectionsTab(): VNode;
  renderFeedsTab(): VNode;
  renderTabs(): VNode;
  renderSidePanel(): VNode;
  renderFooter(): VNode;
  get shouldShowDirtyStateModal(): boolean;
  renderDirtyStateModal(): HTMLElement;
  render(): any;
}
export {};
