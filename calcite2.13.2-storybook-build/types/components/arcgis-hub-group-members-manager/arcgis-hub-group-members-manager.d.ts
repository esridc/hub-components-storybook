import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { ComponentIntl } from "../../utils/stencil-intl";
import { IHubGroup, IQuery } from "@esri/hub-common";
import { IBulkActions, IGallerySelection } from "../../utils/types";
export declare class ArcgisHubGroupMembersManager {
  el: HTMLElement;
  /**
   * Group ID of the group we are managing members
   */
  groupId: string;
  /**
   * Should the group members gallery show facets or not
   */
  showGalleryFacets: boolean;
  isMobile: boolean;
  membersCount: number;
  newMembersCount: number;
  isUserPickerOpen: boolean;
  group: IHubGroup;
  /** reference to the selected entity cards */
  groupMembersSelected: string[];
  hubTelemetry: EventEmitter<Record<string, any>>;
  memberGallery: HTMLArcgisHubGalleryElement;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * Loads translations
   */
  loadTranslations(): Promise<void>;
  private get _context();
  handlePickerOpen(): void;
  handlePickerClose(): void;
  /** query to fetch the group's members */
  get query(): IQuery;
  get canAssignMembers(): boolean;
  /** Get bulk actions */
  get bulkActions(): IBulkActions;
  /**
   * 1. Fetch all members of the group
   * 2. Fetch members of the group who have joined
   * in the last 30 days
   *
   * These counts will get rendered in stat cards
   * above the members gallery
   */
  fetchStats(): Promise<void>;
  fetchGroup(): Promise<void>;
  /** Build telemetry props for add/remove users */
  buildTelemetryProps(path: any, failures: number, successes: number): any;
  /**
   * Defines the selected ids/members/arcgis-hub-cards
   * @param event
   */
  handleMemberSelection(event: CustomEvent<IGallerySelection>): void;
  handleGalleryBulkAction(event: CustomEvent): Promise<void>;
  removeUsersFromGroup(selection: string[]): Promise<void>;
  changeRole(selection: string[], role: 'member' | 'admin'): Promise<void>;
  handlePickerSelectionUpdate(event: CustomEvent): Promise<void>;
  renderStats(): HTMLElement;
  renderMembersGallery(): HTMLArcgisHubGalleryElement;
  renderUserPicker(): VNode;
  render(): any;
}
