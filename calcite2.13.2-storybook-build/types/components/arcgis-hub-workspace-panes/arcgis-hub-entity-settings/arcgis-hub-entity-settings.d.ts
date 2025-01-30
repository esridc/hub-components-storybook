import { EventEmitter, VNode } from '../../../stencil-public-runtime';
import { HubEntity, HubEntityType, EntityEditorType } from '@esri/hub-common';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IWorkspaceEntityChange } from '../../../utils/workspace';
import { IArcgisHubEntityEditorSavedEvent } from '../../arcgis-hub-entity-editor/types';
export declare class ArcgisHubEntitySettings {
  element: HTMLElement;
  entity: HubEntity;
  isMobile: boolean;
  arcgisHubWorkspacePaneEntityDelete: EventEmitter<HubEntity>;
  isDeleteModalOpen: boolean;
  footerSlotEl: HTMLElement;
  workspacePane: HTMLArcgisHubWorkspacePaneElement;
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  private get _context();
  get editorType(): EntityEditorType;
  get type(): HubEntityType;
  get showSettingsEditor(): boolean;
  get showDeleteConfirmation(): boolean;
  get isValidEditorType(): boolean;
  get canAccessPane(): boolean;
  get isFormDisabled(): boolean;
  get formMessageOverrides(): Record<string, string>;
  handleEditorChanged(event: CustomEvent): void;
  handleEditorSaved(event: CustomEvent<IArcgisHubEntityEditorSavedEvent>): void;
  handleEntityDelete(event: CustomEvent): void;
  renderSidePanel(): VNode;
  render(): VNode;
  renderDeleteConfirmation(): VNode;
  /**
   * User does not have access to the pane
   * @returns
   */
  renderAccessDenied(): VNode;
  renderSettings(): VNode;
}
