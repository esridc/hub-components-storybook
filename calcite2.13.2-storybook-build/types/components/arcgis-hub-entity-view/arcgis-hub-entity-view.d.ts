import { HubEntity, HubEntityType, IHubGroup, IHubUser } from '@esri/hub-common';
import { VNode, EventEmitter } from '../../stencil-public-runtime';
import { IViewDefinition, ViewTabs } from './types';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisHubEntityView {
  element: HTMLElement;
  private get _context();
  /**
   * View tab to land on
   */
  view: ViewTabs;
  /**
   * The entity to display
   */
  entity: Exclude<HubEntity, IHubGroup | IHubUser>;
  /**
   * Content Hierarchy Path used to display breadcrumbs aand construct links.
   * This is passed into the workspace so that it can be passed into any galleries
   * or other components that need to know the current path so they can construct
   * links that go another level deeper
   */
  path: string;
  /** Whether or not we are viewing in mobile */
  isMobile: boolean;
  /**`
   * Only used in the arcgis-hub-entity-view-wrapper component which
   * is designed so that the view and workspace can be displayed on the same route
   */
  mode: 'default' | 'inline';
  _hasAboutSlot: boolean;
  _typeSpecificViews: IViewDefinition[];
  hubTelemetry: EventEmitter<any>;
  init(): Promise<void>;
  intl: ComponentIntl;
  get entityType(): HubEntityType;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  handleResize(): Promise<void>;
  componentWillLoad(): Promise<void>;
  /**
   * About component to display in the Overview tab,
   * either the default entity about or a type-specific about
   */
  get aboutComponent(): string;
  /**
   * Views are rendered in tabs and in the future will be user-configurable.
   * At this time we generate the view definitions based on the type but once
   * we enable configurablity, we will pull the configured views from the entity.
   */
  get views(): IViewDefinition[];
  get hasViews(): boolean;
  /**
   * Hero component to display at the top of the view,
   * either the default entity hero or a type-specific hero
   */
  get heroComponent(): string;
  /** This is needed for clicks from the about pane */
  handleTabChange(evt: CustomEvent): void;
  renderViewName(view: IViewDefinition): string;
  renderViews(): VNode;
  renderHero(): VNode;
  render(): any;
}
