import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IHubCatalog, IHubSearchResult, WellKnownCatalog } from '@esri/hub-common';
import { IGallerySelection } from '../../utils/types/IGallerySelection';
import { IFacet } from '../../utils/types';
import { IGroupsChangedEvent } from './types';
import { IWithContext } from '../../utils/state';
export declare class ArcgisHubGroupListManager implements IWithContext {
  element: HTMLElement;
  groupIds: string[];
  allowAdd: boolean;
  allowRemove: boolean;
  metadataMode: 'default' | 'members';
  wellKnownPickerCatalog: WellKnownCatalog;
  pickerFacets: IFacet[];
  pickerToggleLabel: string;
  showEmptyState: boolean;
  pickerClassName: string;
  currentGroupSelection: IGallerySelection;
  currentGroups: IHubSearchResult[];
  showGroupPicker: boolean;
  _context: import("@esri/hub-common").IArcGISContext;
  intl: ComponentIntl;
  groupsChangedEvent: EventEmitter<IGroupsChangedEvent>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  get pickerCatalogDefinition(): IHubCatalog;
  constructor();
  componentWillLoad(): Promise<void>;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  fetchCurrentGroups(): Promise<void>;
  handleRemove(event: any): void;
  handlePickerOpen(): void;
  handlePickerClose(): void;
  handlePickerSelectionUpdate(evt: CustomEvent): void;
  /**
   * because we wrap the arcgis-hub-gallery-picker in a wormhole, we
   * intercept its telemetry and re-emit it from this component so
   * we don't lose the DOM context
   */
  handleHubTelemetry: (evt: CustomEvent<Record<string, any>>) => void;
  renderGroup(group: IHubSearchResult): VNode;
  renderGroupPicker(): VNode;
  renderEmptyState(): HTMLElement;
  renderGroupList(): VNode;
  render(): any;
}
