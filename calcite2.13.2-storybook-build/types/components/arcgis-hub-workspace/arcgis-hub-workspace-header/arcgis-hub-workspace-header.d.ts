import { HubEntity, HubEntityType, IHubSite, SettableAccessLevel } from '@esri/hub-common';
import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IWorkspaceEntityChange, IWorkspaceLinkClicked } from '../../../utils/workspace';
import { IHubBreadcrumb } from '../../functional/breadcrumbs';
export interface IPopoverItem {
  href?: string;
  icon?: string;
  key: string;
  target?: string;
  onClick?: (e: MouseEvent) => void;
}
export declare class ArcgisHubWorkspaceHeader {
  element: HTMLElement;
  entity: HubEntity;
  site: IHubSite;
  layout: 'default' | 'inline';
  isDirty: boolean;
  isMobile: boolean;
  isAccessModalOpen: boolean;
  isDirtyStateModalOpen: boolean;
  access: SettableAccessLevel;
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  arcgisHubWorkspaceHeaderLinkClick: EventEmitter<IWorkspaceLinkClicked>;
  intl: ComponentIntl;
  private _popoverButtonEl;
  private get _context();
  constructor();
  componentWillLoad(): Promise<void>;
  convertAccess(access: SettableAccessLevel | 'shared'): SettableAccessLevel;
  /**
   * Given a HubEntity, return it's HubEntityType
   */
  get type(): HubEntityType;
  /**
   * Returns whether the current user can change the access of the
   * entity by checking whether:
   *
   * For item entities:
   * 1. user has the (portal:admin:shareToOrg OR portal:admin:shareToPublic) OR (portal:user:shareToOrg OR portal:user:shareToPublic) privileges
   * AND
   * 2. user has admin privileges over the item (itemControl:admin)
   *
   * For group entities:
   * 1. user has the portal:admin:updateGroups privilege
   * OR
   * 2. user has admin or owner membership in the group
   *
   * If these conditions are met, we allow the user to open the access
   * modal which further restricts which options are enabled based
   * on the portal privs
   *
   */
  get canChangeAccess(): boolean;
  get hideViewButton(): boolean;
  /**
   * Should we show the access button in the header?
   */
  get showAccessButton(): boolean;
  /**
   * Should we hide the sharing link in the sharing access modal?
   */
  get hideSharingLink(): boolean;
  get viewUrl(): string;
  get _popoverItems(): IPopoverItem[];
  get editLayoutUrl(): string;
  get viewEntityTelemetry(): Record<string, any>;
  get useWorkspaceLink(): boolean;
  get orgLogoHref(): string;
  get breadcrumbs(): IHubBreadcrumb[];
  handleOrgLogoClick: (clickEvent: any) => void;
  handleOpenAccessModal: () => void;
  handleClickGroupSharingLink: (e: CustomEvent<IWorkspaceLinkClicked>) => void;
  handleCloseAccessModal: (evt: CustomEvent) => void;
  handleAccessChange: (evt: CustomEvent) => Promise<void>;
  handleAccessSave: (evt: CustomEvent) => Promise<void>;
  arcgisEntityView: EventEmitter<any>;
  handleViewClick: () => void;
  handleBreadcrumbClick: (clickEvent: any) => void;
  _handlePortalHomeClick: (e: MouseEvent) => void;
  _setPopoverButtonEl(el: HTMLCalciteButtonElement): void;
  renderAccessModal(): HTMLCalciteModalElement;
  renderAccessButton(): HTMLElement;
  renderPopoverMenu(): HTMLElement;
  renderEntityNavigation(): HTMLElement;
  renderViewLink(): HTMLElement;
  renderViewButton(): HTMLElement;
  get shouldShowAddContent(): boolean;
  get addContentConfig(): any;
  showNotice(result: 'success' | 'failure'): any;
  renderDirtyStateModal(): HTMLElement;
  handleDirtyStateModalClosed(event: CustomEvent): void;
  render(): any;
}
