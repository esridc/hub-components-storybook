import { EventEmitter, VNode } from '../../../stencil-public-runtime';
import { IArcGISContext, HubEntityType, IQuery, IHubCardViewModel, ICardActionLink, IHubItemEntity } from '@esri/hub-common';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IFacet } from '../../../utils/types';
import { IGroupsChangedEvent } from '../../arcgis-hub-group-list-manager/types';
import { IWorkspaceEntityChange } from '../../../utils';
/**
 * This component displays the edit and view groups that the entity
 * has been shared with. It also enables the user to share the entity
 * with eligible edit and view groups.
 * An entity can be shared with an edit group if
 * 1. the group has `capabilities: ["updateitemcontrol"]`
 * 2. the user is a mananger of the group OR the user is a member
 * of the group but the group has `isViewOnly: false`
 */
export declare class ArcgisHubEntityCollaborators {
  element: HTMLElement;
  entity: IHubItemEntity;
  isMobile: boolean;
  /**
   * Edit groups the entity is currently being shared with,
   * these are the ids of those groups
   */
  currentEditGroups: string[];
  /**
   * View groups the entity is currently being shared with,
   * these the ids of those groups
   */
  currentViewGroups: string[];
  supportingTeams: string[];
  hubTelemetry: EventEmitter<Record<string, any>>;
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  loadIntl(): Promise<void>;
  private get _context();
  get type(): HubEntityType;
  /** Group creation Privileges */
  get canCreateEditGroups(): boolean;
  get canCreateViewGroups(): boolean;
  /** Group creation defaults */
  get defaultEditGroup(): any;
  get defaultViewGroup(): any;
  /**
   * Fetch for a list of groups that the entity has been shared with
   * The process is:
   * - get the list of groups(IGroups) that the entity has been shared with,
   * - separate those group IDs out into edit and view groups
   * - store lists in local state
   * @param entityId
   * @param context
   */
  fetchExistingSharingGroups(entity: IHubItemEntity, context: IArcGISContext): Promise<void>;
  /**
   * Triggered when the "Add" button is clicked within the group list manager,
   * fetch for the group object and share the entity with the groups.
   * If any existing sharing groups have been deselected,
   * we will unshare the entity from those groups
   */
  handleEditGroupUpdate(evt: CustomEvent<IGroupsChangedEvent>): Promise<void>;
  handleViewGroupUpdate(evt: CustomEvent): Promise<void>;
  /**
   * Get facets for the group picker
   */
  get facets(): IFacet[];
  get createNewGroupsLink(): string;
  get orgOverviewLink(): string;
  /**
  * for now we'll restrict un-sharing to the entity owner. In the future,
  * we will use the permissions system to make this determination.
  */
  get isEntityOwner(): boolean;
  get canShareToGroups(): boolean;
  get canShareToEditGroups(): boolean;
  get canShareToViewGroups(): boolean;
  /** Returns the query for the supporting teams gallery */
  get supportingGroupsQuery(): IQuery;
  /** Returns the actions for the supporting teams gallery */
  get supportingTeamsActionLinks(): ICardActionLink[];
  /** Handles delegating the actions for the supporting teams gallery */
  handleGalleryAction(evt: CustomEvent<{
    action: string;
    model: IHubCardViewModel;
  }>): void;
  /**
   * Unlinks a supporting team from a site. This is
   * a legacy feature and will be removed in the future
   * which also explains why supporting teams are only shown for sites.
   */
  unlinkSupportingTeam(model: IHubCardViewModel): Promise<void>;
  /**
   * Return a translation string, if the path provided does not lead to
   * a valid translation, use the fallback path instead
   */
  getStringWithFallback(path: string, fallbackPath: string): string;
  handleEditGroupCreation(evt: CustomEvent): Promise<void>;
  handleViewGroupCreation(evt: CustomEvent): Promise<void>;
  handleGroupCreation(evt: CustomEvent, groupType: "edit" | "view"): Promise<void>;
  handleGroupCreationFailure(evt: CustomEvent): void;
  renderAddNewPeopleNotice(): HTMLCalciteNoticeElement;
  renderSupportingTeams(): VNode;
  render(): any;
}
