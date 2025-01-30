import { EventEmitter } from '../../../stencil-public-runtime';
import { HubEntity, HubEntityType, EntityEditorType } from '@esri/hub-common';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IWorkspaceEntityChange } from '../../../utils';
import { IArcgisHubEntityEditorSavedEvent } from '../../arcgis-hub-entity-editor/types';
export declare class ArcgisHubEntityDiscussionSettingsPane {
  /**
   * A reference to the host element
   */
  element: HTMLArcgisHubEntityDiscussionSettingsPaneElement;
  /**
   * Entity of the workspace
   */
  entity: HubEntity;
  isMobile: boolean;
  /**
   * A reference to the sticky footer div that we render the `Save` button into
   */
  footerSlotEl: HTMLElement;
  /**
   * An event that is emitted when the workspace is saved
   */
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Component will load lifecycle method. Loads translations and dependencies
   */
  componentWillLoad(): Promise<void>;
  private get _context();
  /**
   * EditorType string contructed from entity type
   */
  get editorType(): EntityEditorType;
  /**
   * Entity type
   */
  get type(): HubEntityType;
  get isDisabled(): boolean;
  get messageOverrides(): Record<string, string>;
  handleEditorChanged(event: CustomEvent): void;
  handleEditorSaved(event: CustomEvent<IArcgisHubEntityEditorSavedEvent>): void;
  /**
   * Primary render method
   */
  render(): any;
}
