import { HubEntity, HubEntityType } from '@esri/hub-common';
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { CalciteSwitchCustomEvent } from '@esri/calcite-components';
/**
 * Delete Confirmation Component
 * Will display a modal to confirm deletion of an entity
 * Will show a self-contained alert when actions are successful or not
 */
export declare class ArcgisHubDeleteConfirmation {
  element: HTMLElement;
  entity: HubEntity;
  titleText?: string;
  entityScopedDeleteButtonText?: string;
  showModal: boolean;
  showAlert: boolean;
  hubTelemetry: EventEmitter<Record<string, any>>;
  arcgisHubDeleteConfirmationEntityDelete: EventEmitter<HubEntity>;
  private get _context();
  action: "protect" | "unprotect" | "delete" | "permanentDelete";
  state: string;
  canRecycle: boolean;
  get entityType(): HubEntityType;
  get type(): string;
  get telemetryCategory(): string;
  get getDeleteButtonText(): string;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  get isProtected(): boolean;
  /**
   * Can the current user delete the entity?
   */
  get canDelete(): boolean;
  /**
   * Does this entity support protection?
   */
  get canBeProtected(): boolean;
  /**
   * Can the user change the protection of the entity?
   * Requires that the entity can be protected and the user can delete the entity
   */
  get canChangeProtection(): boolean;
  handleDeleteBtnClick(): Promise<void>;
  handleCalciteModalClose(): void;
  handleAlertClose(): void;
  handleDeleteModalClose(): void;
  handleProtectionChange: (event: CalciteSwitchCustomEvent<void>) => Promise<void>;
  unprotectEntity(entity: HubEntity): Promise<{
    success: boolean;
  }>;
  protectEntity(entity: HubEntity): Promise<{
    success: boolean;
  }>;
  renderAlert(): VNode;
  renderDeleteModal(): HTMLCalciteModalElement;
  /**
   * Wrapper function b/c jsx does not like arrow functions
   * @returns void
   */
  permanentDeleteEntity(): Promise<void>;
  deleteEntity(): Promise<void>;
  /**
   * Delete the entity. If it can be recycled, it will be moved to the recycle bin,
   * otherwise it will be permanently deleted.
   */
  _deleteEntity(permanent?: boolean): Promise<void>;
  getDeleteTelemetry(action: "delete" | "permanentDelete", entity: HubEntity, response: string): Record<string, any>;
  getProtectionTelemetry(action: "protect" | "unprotect", entity: HubEntity, response: string): Record<string, any>;
  get deleteDisabledTooltip(): string;
  render(): VNode;
}
