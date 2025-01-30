import { VNode, EventEmitter } from '../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { HubEntity, HubEntityType, IHubCatalog, IConfigurationValues, IContentConfig, HubCapability } from '@esri/hub-common';
import { ICapabilityBaseSchema } from '../../../../utils/workspace/capabilities/schemas';
import { IWorkspaceEntityChange } from '../../../../utils/workspace/types';
export declare class ArcgisHubEntityCapabilityPane {
  element: HTMLElement;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  private catalogRef;
  private defaultConfig;
  capability: HubCapability;
  /**
   * Since this is generic, we don't use interfaces
   * we will simply read/write props via getProp/setProp
   */
  entity: HubEntity;
  isSaving: boolean;
  /**
   * An event that is emitted when the workspace is saved
   */
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  constructor();
  get entityType(): HubEntityType;
  get capabilityProp(): string;
  private get _context();
  componentWillLoad(): Promise<void>;
  translationFunc(key: any, values?: any, opts?: any): string;
  get config(): IContentConfig;
  get isConfigured(): boolean;
  get canCreate(): boolean;
  get catalog(): IHubCatalog;
  get values(): {
    enabled: boolean;
    groups: string[];
  };
  /** At this point we are limiting the catalog to groups on the base level item scope */
  get catalogGroupIds(): string[];
  get schemas(): ICapabilityBaseSchema;
  handleFormChange: (evt: CustomEvent<IConfigurationValues>) => void;
  handleFormSave(evt: CustomEvent<IConfigurationValues>): Promise<void>;
  renderNotConfigured(): VNode;
  renderCapabilityView(): VNode;
  handleEntityCreated(_evt: Record<string, any>): Promise<void>;
  render(): VNode;
}
