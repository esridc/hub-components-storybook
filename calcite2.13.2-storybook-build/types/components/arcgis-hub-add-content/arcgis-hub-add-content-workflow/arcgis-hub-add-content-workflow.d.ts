import { EventEmitter, VNode } from '../../../stencil-public-runtime';
import { IMachine } from '../utils/machine';
import { State as WorkflowState } from '../utils/states';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IHubItemEntity, AddContentWorkflowConfig, HubEntity, IHubSite } from '@esri/hub-common';
/**
 * Add content workflow component
 * Renders a stepper that guides the user through the process of adding content to a Hub
 * Currently only supports adding existing content
 * In the near future will support creating new content and uploading content
 * This component is primarily intended to be used by th arcgis-hub-add-content component but could be used standalone
 */
export declare class ArcgisHubAddContentWorkflow {
  element: HTMLArcgisHubAddContentElement;
  intl: ComponentIntl;
  private get _context();
  /**
  * Configuration for the workflow
  */
  workflowConfig: AddContentWorkflowConfig;
  /**
   * Allow overriding the workflow config (typically used when no config is provided)
   */
  allowGroupSelection: boolean;
  /**
   * A reference to the entity this component is being rendered within the context of. E.g. an IHubProject when in a project's Workspace or View
   */
  entity?: HubEntity;
  /**
   * A reference to the current site entity.
   */
  site: IHubSite;
  /**
  * The state machine that drives the behavior of this component
  */
  machine: IMachine;
  /**
  * The current state of this component, derived from the state machine
  */
  state: WorkflowState;
  arcgisHubAddContentWorkflowClose: EventEmitter<void>;
  arcgisHubAddContentWorkflowComplete: EventEmitter<void>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  componentWillLoad(): Promise<void>;
  initMachine(): Promise<void>;
  stateChanged(state: WorkflowState): void;
  /**
  * Fetches the content we will share to the selected groups
  */
  fetchContent(state: WorkflowState): Promise<IHubItemEntity[]>;
  private shareEntitiesWithGroups;
  /**
  * Adds the selected content to the selected groups
  */
  addExistingContent(state: WorkflowState): Promise<void>;
  private pollForContent;
  addNewContent(state: WorkflowState): Promise<void>;
  /**
  * Handler for clicking a step item in the stepper header
  */
  handleStepperItemChange: (evt: CustomEvent) => void;
  /**
  * Handler for gallery state change events
  * This is used for the content gallery and the groups gallery - the state machien decides what to do with it
  */
  handleGalleryStateChange(event: CustomEvent): void;
  /**
  * Handler for gallery selection events
  * This is used for the content gallery and the groups gallery - the state machien decides what to do with it
  */
  handleGallerySelect(event: CustomEvent): void;
  /**
  * Handler for clicks of the arcgis-hub-help-state action
  * This is currently only used for the retry action
  */
  handleHelpStateActionClick(): void;
  handleEntityEditorChange(event: CustomEvent): void;
  /**
  * Handler for the back button
  */
  handleBackButton: () => void;
  /**
  * Handler for the next button
  */
  handleNextButton: () => void;
  /**
  * Handler for the cancel button
  */
  handleCancelButton: () => void;
  /**
   * Handler for the browse button
   */
  handleBrowseTemplatesButton: () => void;
  /**
  * Handler for the close/done button
  */
  handleCloseButton: () => void;
  /**
  * Renders the content for the active step based on the component and component args provided on the state
  */
  renderCurrentStep(stepIndex: number): VNode[];
  renderSelectionCount(state: WorkflowState): VNode;
  renderControls(state: WorkflowState): VNode;
  render(): any;
}
