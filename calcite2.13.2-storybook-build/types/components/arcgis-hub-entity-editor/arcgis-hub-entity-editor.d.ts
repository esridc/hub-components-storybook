import { EventEmitter } from '../../stencil-public-runtime';
import { IArcGISContext, IEntityEditorContext } from '@esri/hub-common';
import { ComponentIntl } from '../../utils/stencil-intl';
import { HubEntityEditor, IArcgisHubEntityEditorSavedEvent } from './types';
import { HubEntity, HubEntityType, EntityEditor, IConfigurationSchema, IUiSchema, IConfigurationValues, EntityEditorType } from '@esri/hub-common';
import { CONFIGURATION_VARIANTS } from '../arcgis-configuration-editor/resources';
import { Scale } from '@esri/calcite-components';
/**
 * @slot header A slot for adding a form title to render above the form. In the case of a "modal" layout, this will render in the calcite-modal header slot
 * @slot form-start A slot for adding content above the form
 */
export declare class ArcgisHubEntityEditor {
  intl: ComponentIntl;
  element: HTMLElement;
  /**
   * Hub entity object: site, project, discussion, initiative, etc.
   */
  entity: HubEntity;
  /**
   * optional hub-specific contextual information to help
   * pre-populate the editor
   */
  editorContext: IEntityEditorContext;
  /**
   * Enrichments to add to the entity
   *
   * ex: "followersGroup AS followersGroup"
   * followersGroup.access AS _followersGroup.access"
   */
  include: string[];
  /**
   * Specifies which uiSchema to dynamically import.
   * This dictates how the form will look in the UI
   */
  editorType: EntityEditorType;
  /**
   * Indicates how the entity form should be rendered:
   * fixed: on-page form with fixed footer
   * sticky: on-page form with sticky footer
   * modal: form is rendered in a calcite modal
   */
  layout: "fixed" | "sticky" | "modal" | "step";
  /**
   * Specifies where the editor's footer should be slotted.
   *
   * This is needed, for example, to slot the editor
   * footer into the "footer" slot of workspace panels.
   * This pattern is somewhat specific to the complexities
   * of workspace panel styling and should not be
   * implemented liberally
   */
  footerSlotRef: HTMLElement;
  /**
   * If the layout is "modal", this prop must be provided
   * to open/close the modal
   */
  isOpen: boolean;
  /**
   * Style variant to render the editor with (optional)
   */
  variant: CONFIGURATION_VARIANTS;
  /** whether the form's primary button (Save) is disabled */
  isDisabled: boolean;
  /**
   * Use this property to override translated strings
   * used by this compoennt
   * note: we can add more as necessary
   */
  messageOverrides: {
    primaryBtnTooltip?: string;
  };
  scale: Scale;
  configurationFormEl: HTMLArcgisConfigurationFormElement;
  isLoading: boolean;
  isSaving: boolean;
  schema: IConfigurationSchema;
  uiSchema: IUiSchema;
  values: HubEntityEditor;
  arcgisHubEntityEditorChange: EventEmitter<IConfigurationValues>;
  arcgisHubEntityEditorSaved: EventEmitter<IArcgisHubEntityEditorSavedEvent>;
  /** fired from form initialization, receiving the initialization event from the configuration form */
  arcgisHubEntityEditorInitialization: EventEmitter<IConfigurationValues>;
  hubTelemetry: EventEmitter<any>;
  editor: EntityEditor;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
  * We execute these XHRs in componentDidLoad rather than componentWillLoad
  * so that render isn't blocked. We want the underlying configuration form
  * to render so that the loading state is visible to the consumer while
  * these values load
  */
  componentDidLoad(): Promise<void>;
  initializeForm(): Promise<void>;
  get _messageOverrides(): Record<string, string>;
  /**
   * stops propogation and fires new event to alert initialization
   *
   * @param event - listens for the arcgisConfigurationForm to be initialized
   */
  handleConfigurationInitialized(event: CustomEvent<IConfigurationValues>): void;
  /**
   * If the entity changes, we need to re-initialize the form and it's fields
   * as a refresh with the latest information.
   */
  handleEntityChanged(): Promise<void>;
  /**
   * For cases where we are creating a new entity, we need to create
   * the minimum entity object to pass to the editor.
   * @param entityType
   * @returns
   */
  private getDefaultEntity;
  /**
   * Contextual auth & portal information
   */
  get _context(): IArcGISContext;
  /**
   * Computes the entity type based on the entity (if defined).
   * When undefined (in the case of entity creation), we assume
   * the entity type can be determined from the editorType which
   * has the form "context:type:action", e.g. "hub:project:create"
   */
  get entityType(): HubEntityType;
  /**
   * Computes a contextual label to include in our telemetry
   * payload based on the editorType which has the form
   * "context:type:action:...", e.g. "hub:project:edit"
   */
  get telemetryLabel(): string;
  /**
   * If the entity id is undefined, we assume we're in an entity
   * "creation" experience
   */
  get isCreateForm(): boolean;
  setConfigurationFormEl(el: HTMLArcgisConfigurationFormElement): void;
  translationFunc(key: any, values?: any, opts?: any): string;
  /**
   * when editor values are saved, we log telemetry to give us insight
   * into the changes our users are making. We compare the original
   * editor values to the updated values and emit individual telemetry
   * events for each meaningful change. See the parseTelemetryEvents
   * util for more details on how we construct these telemetry events.
   *
   * we also log an event to indicate whether the save was a success/failure
   */
  emitSaveTelemetry(opts: {
    isSuccess: boolean;
    entity?: HubEntity;
    originalValues?: HubEntityEditor;
    updatedValues?: HubEntityEditor;
  }): void;
  handleEntityEditorChange(evt: CustomEvent<IConfigurationValues>): void;
  handleEntityEditorSave(evt: CustomEvent<IConfigurationValues>): Promise<void>;
  get shouldShowForm(): boolean;
  render(): any;
}
