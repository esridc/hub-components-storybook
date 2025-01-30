import { EventEmitter } from '../../../stencil-public-runtime';
import { HubEntity } from '@esri/hub-common';
import { IWorkspaceLink, WorkspacePane, IWorkspaceLinkClicked } from '../../../utils/workspace';
import { ComponentIntl } from "../../../utils/stencil-intl";
export declare class ArcgisHubWorkspaceNavigation {
  element: HTMLElement;
  activePane: WorkspacePane;
  entity: HubEntity;
  isMobile: boolean;
  intl: ComponentIntl;
  links: IWorkspaceLink[];
  hubTelemetry: EventEmitter;
  arcgisHubWorkspaceNavigationLinkClick: EventEmitter<IWorkspaceLinkClicked>;
  constructor();
  private get _context();
  componentWillLoad(): Promise<void>;
  private _getWorkspaceLinks;
  /**
   * Prevents the page from rerouting with the default refresh
   * @param event
   */
  preventRefresh(event: MouseEvent): void;
  /**
   * Handle when a menu item is selected
   * @param event
   */
  onMenuItemSelect(event: MouseEvent | KeyboardEvent): void;
  /**
   * Allows for pressing enter on the menu item to select it
   * @param evt
   */
  handleKeyDown(evt: KeyboardEvent): void;
  renderWorkspaceNavigationLink(link: IWorkspaceLink, isChild?: boolean): HTMLElement;
  render(): any;
}
