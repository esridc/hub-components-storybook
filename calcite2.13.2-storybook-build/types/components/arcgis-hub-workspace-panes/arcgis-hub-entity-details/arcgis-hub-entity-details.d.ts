import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IWorkspaceEntityChange, WorkspacePane } from '../../../utils/workspace';
import { HubEntity, HubEntityType, IConfigurationValues } from '@esri/hub-common';
import { IArcgisHubEntityEditorSavedEvent } from '../../arcgis-hub-entity-editor/types';
export declare class ArcgisHubEntityDetails {
  intl: ComponentIntl;
  element: HTMLElement;
  entity: HubEntity;
  pane: WorkspacePane;
  isMobile: boolean;
  values: IConfigurationValues;
  footerSlotEl: HTMLElement;
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  componentWillLoad(): Promise<void>;
  private get _context();
  get entityType(): HubEntityType;
  get isDisabled(): boolean;
  get messageOverrides(): Record<string, string>;
  /**
   * Whether or not we should be rendering the details side panel
   */
  get shouldRenderSidePanel(): boolean;
  handleEditorChanged(event: CustomEvent): void;
  handleEditorSaved(event: CustomEvent<IArcgisHubEntityEditorSavedEvent>): void;
  /** renders the pane's side panel */
  renderSidePanel(): HTMLElement;
  /**
   * Dynamically sets the css values for the component
   */
  setCssValues(): void;
  render(): any;
}
