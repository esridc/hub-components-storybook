import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IWorkspaceEntityChange } from '../../../utils';
import { HubEntity, Permission, HubEntityType, IHubGroup } from '@esri/hub-common';
import { IArcgisHubEntityEditorSavedEvent } from '../../arcgis-hub-entity-editor/types';
/**
 * Enum defining a key for each tab. This is also
 * the value that will be emitted as the label on
 * navigation telemetry
 */
declare enum FollowersPaneTabs {
  FOLLOWERS = "Followers",
  SETTINGS = "Followers Settings"
}
export declare class ArcgisHubEntityFollowers {
  element: HTMLElement;
  /** arcgis hub entity */
  entity: HubEntity;
  isMobile: boolean;
  activeTab: FollowersPaneTabs;
  followersCount: number;
  newFollowersCount: number;
  footerSlotEl: HTMLElement;
  isUserPickerOpen: boolean;
  /** reference to the selected entity cards */
  groupMembersSelected: string[];
  isDirty: boolean;
  /**
   * This state is used to store the tab the user attempted to click
   *
   * See the `attemptedClick` prop in `arcgis-hub-workspace` for a similar use
   * case with panes, hrefs, and opening the share modal
   */
  attemptedClick: {
    tab: FollowersPaneTabs;
    clickEvent: MouseEvent | KeyboardEvent;
  };
  hubTelemetry: EventEmitter<Record<string, any>>;
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  followersGroup: IHubGroup;
  workspacePaneEl: HTMLArcgisHubWorkspacePaneElement;
  memberGallery: HTMLArcgisHubGalleryElement;
  intl: ComponentIntl;
  /**
   * Async work to fetch the full followers group
   * (for facet purposes) and follower group stats. This
   * is called when the component loads and any time the
   * underlying entity is updated
   */
  init(): Promise<void>;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
 * Loads translations
 */
  loadTranslations(): Promise<void>;
  private get _context();
  get entityType(): HubEntityType;
  /**
   * checks whether the current user is a member
   * of the followers group
   */
  get isMember(): boolean;
  /**
   * Checks whether the current user can:
   * 1. create groups (portal:user:createGroup)
   * 2. has < the org limit # of groups
   * 3. can add external members to the group (portal:user:addExternalMembersToGroup)
   */
  get canCreateFollowersGroup(): boolean;
  get followersGroupId(): string;
  get tabConfigurations(): {
    title: string;
    key: FollowersPaneTabs;
    permissions: Permission[];
    content: HTMLElement;
  }[];
  /**
   * fetch the full followers group - this is needed to
   * construct the picker facets
   */
  fetchFollowersGroup(): Promise<void>;
  handleTabActivated: (evt: any) => void;
  handlePrimaryTabKeyDown(evt: KeyboardEvent): void;
  handleDirtyStateModalClosed(event: CustomEvent): void;
  /** handle new follower group creation */
  handleFollowersGroupCreation: (evt: CustomEvent) => Promise<void>;
  renderTabs(): HTMLCalciteTabsElement;
  get shouldShowDirtyStateModal(): boolean;
  renderDirtyStateModal(): HTMLElement;
  handleEntityChange(event: CustomEvent): void;
  renderFollowersTab(): HTMLElement;
  handleEditorChanged(event: CustomEvent): void;
  handleEditorSaved(event: CustomEvent<IArcgisHubEntityEditorSavedEvent>): void;
  renderSettingsTab(): HTMLElement;
  /**
   * If a followers group does NOT exist, we
   * render an empty state prompting the user
   * (when allowed) to create a followers group
   */
  renderEmptyState(): HTMLElement;
  /**
   * If a followers group exists, but the current
   * user is not a member of the group, we render
   * a restricted access state
   */
  renderRestrictedAccessState(): HTMLElement;
  render(): any;
}
export {};
