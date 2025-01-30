import { HubEntity, IQuery, SortOption } from '@esri/hub-common';
import { EventEmitter, VNode } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IWorkspaceEntityChange } from '../../../utils';
import { IArcgisHubEntityEditorSavedEvent } from '../../arcgis-hub-entity-editor/types';
import { IFacet } from '../../../utils/types/IFacet';
import { IBulkActions, IGallerySelection } from '../../../utils/types';
declare enum RegistrantsPaneTabs {
  REGISTRANTS = "Registrants",
  SETTINGS = "Settings"
}
export declare class ArcgisHubEntityRegistrants {
  element: HTMLElement;
  /**
   * Entity of the workspace
   */
  entity: HubEntity;
  intl: ComponentIntl;
  selectedPrimaryTab: RegistrantsPaneTabs;
  footerSlotElement: HTMLElement;
  galleryElement: HTMLArcgisHubGalleryElement;
  gallerySelection: IGallerySelection;
  isDirty: boolean;
  /**
   * This state is used to store the tab the user attempted to click
   *
   * See the `attemptedClick` prop in `arcgis-hub-workspace` for a similar use
   * case with panes, hrefs, and opening the share modal
   */
  attemptedClick: {
    tab: RegistrantsPaneTabs;
    clickEvent: MouseEvent | KeyboardEvent;
  };
  /**
   * Emitted when the workspace is saved
   */
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  /**
   * Hub telemetry
   */
  hubTelemetry: EventEmitter<any>;
  componentWillLoad(): Promise<void>;
  constructor();
  private get _context();
  get tabConfigurations(): {
    title: string;
    key: RegistrantsPaneTabs;
    content: () => VNode;
    telemetry: Record<string, any>;
  }[];
  get query(): IQuery;
  get facets(): IFacet[];
  get sortOptions(): SortOption[];
  get bulkActions(): IBulkActions;
  handlePrimaryTabSelect(evt: any): void;
  handlePrimaryTabKeyDown(evt: KeyboardEvent): void;
  handleDirtyStateModalClosed(event: CustomEvent): void;
  handleEntityChange(event: CustomEvent): void;
  handleEditorChanged: (event: CustomEvent) => void;
  handleEditorSaved: (event: CustomEvent<IArcgisHubEntityEditorSavedEvent>) => void;
  handleGallerySelection: (event: CustomEvent<IGallerySelection>) => void;
  handleOnArcgisHubGalleryBulkAction: (event: CustomEvent) => Promise<void>;
  renderRegistrantsTab: () => VNode;
  renderSettingsTab: () => VNode;
  renderTabs(): VNode;
  get shouldShowDirtyStateModal(): boolean;
  renderDirtyStateModal(): HTMLElement;
  render(): any;
}
export {};
