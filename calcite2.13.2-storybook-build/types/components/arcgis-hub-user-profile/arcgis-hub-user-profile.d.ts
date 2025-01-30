import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IWorkspaceLinkClicked } from '../../utils';
export declare class ArcgisHubUserProfile {
  element: HTMLElement;
  variant: 'default' | 'minimal';
  intl: ComponentIntl;
  private get context();
  arcgisHubUserProfileSignout: EventEmitter<void>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  arcgisHubUserProfileLinkClick: EventEmitter<IWorkspaceLinkClicked>;
  componentWillLoad(): Promise<void>;
  handleDropdownClick: () => void;
  handleLinkClick: (clickEvent: any) => void;
  handleViewProfileClick: (clickEvent: any) => void;
  handleViewOverviewClick: (clickEvent: any) => void;
  handleWorkspaceHomeClick: (clickEvent: any) => void;
  handleSignOut: () => void;
  get profileUrl(): string;
  get overviewUrl(): string;
  get workspaceHomeUrl(): string;
  get useWorkspaceLink(): boolean;
  renderUserProfile(): VNode;
  renderMenu(): VNode;
  render(): any;
}
