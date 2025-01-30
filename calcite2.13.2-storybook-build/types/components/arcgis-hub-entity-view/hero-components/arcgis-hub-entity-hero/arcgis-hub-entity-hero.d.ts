import { IExtent } from '@esri/arcgis-rest-feature-layer';
import { HubActionLink, HubEntity, HubEntityType, IHubContentActionLink, IHubGroup, IHubLocation, IHubUser } from '@esri/hub-common';
import { EventEmitter, VNode } from '../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../utils/stencil-intl';
export declare class ArcgisHubEntityHero {
  element: HTMLElement;
  /**
   * ArcGIS Hub entity that excludes IHubGroup and IHubUser
   */
  entity: Exclude<HubEntity, IHubGroup | IHubUser>;
  tooltipRefs: Record<string, HTMLElement>;
  arcgisEntityEdit: EventEmitter<void>;
  hubTelemetry: EventEmitter<any>;
  /** Not currently used, except in a prototype, where we set this to true */
  showEdit: boolean;
  /**
   * Intl service
   */
  intl: ComponentIntl;
  _heroActions: Array<Exclude<HubActionLink, IHubContentActionLink>>;
  private get _context();
  get location(): IHubLocation;
  get hasLocation(): boolean;
  get canEditEntity(): boolean;
  get entityType(): HubEntityType;
  get heroActions(): Array<Exclude<HubActionLink, IHubContentActionLink>>;
  get extent(): IExtent;
  get graphics(): any[];
  get showMap(): boolean;
  handleEditClick: () => void;
  componentWillLoad(): Promise<void>;
  init(): Promise<void>;
  /**
   * Handles clicks to the hero link buttons
   */
  handleHeroActionClick: (event: any) => void;
  /**
   * Show the edit button if the user has permission to edit the entity and the showEdit prop is true
   * This was setup to enable the arcgis-hub-entity-view-wrapper to toggle between the view and workspace
   * in-situ. This is not currently planned behavior for the generic hero, but it's here for future use.
   * @returns
   */
  renderEditButton(): HTMLElement;
  renderHeroActions(heroActions?: any[]): HTMLElement;
  render(): VNode;
}
