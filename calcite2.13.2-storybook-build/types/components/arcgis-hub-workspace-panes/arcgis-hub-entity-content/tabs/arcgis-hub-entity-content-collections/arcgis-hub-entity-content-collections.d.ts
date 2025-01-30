import { IHubCollectionPersistance, IConfigurationSchema, IUiSchema } from '@esri/hub-common';
import { EventEmitter, VNode } from '../../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../../utils/stencil-intl';
import { IWorkspaceEntityChange } from '../../../../../utils/workspace/types';
import { HubEntityWithCatalog } from '../../types';
import { IListItem } from '../../../../arcgis-configuration-editor/components/arcgis-configuration-editor-field/fields/list/resources';
export declare class ArcgisHubEntityContentCollections {
  element: HTMLArcgisHubEntityContentCollectionsElement;
  entity: HubEntityWithCatalog;
  footerSlotRef: HTMLElement;
  intl: ComponentIntl;
  configurableCollections: IHubCollectionPersistance[];
  isSaving: boolean;
  isDirty: boolean;
  saveOperationAlert: HTMLCalciteAlertElement;
  sortableListSchema: IConfigurationSchema;
  sortableListUiSchema: IUiSchema;
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  constructor();
  componentWillLoad(): Promise<void>;
  setSortableListSchema(): void;
  setConfigurableCollections(): void;
  /**
   * Convert IHubCollectionsPersistance to IListItem
   */
  get configurableCollectionsListItems(): IListItem[];
  translationFunction(key: string): string;
  saveCollectionConfiguration(): Promise<void>;
  triggerSaveOperationAlert(type: 'success' | 'failure'): Promise<void>;
  /**
   * Convert IListItem to IHubCollectionsPersistance and update the state
   * @param event
   */
  handleConfigEditorChange(event: CustomEvent): void;
  renderListControl(): VNode;
  render(): any;
}
