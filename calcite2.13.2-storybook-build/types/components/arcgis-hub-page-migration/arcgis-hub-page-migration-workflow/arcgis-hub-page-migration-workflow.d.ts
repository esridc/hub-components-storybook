import { EventEmitter, VNode } from '../../../stencil-public-runtime';
import { IMachine } from '../utils/migrate-page-machine';
import { State as WorkflowState } from '../utils/states';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IHubSite } from '@esri/hub-common';
export declare class ArcgisHubPageMigrationWorkflow {
  element: HTMLArcgisHubPageMigrationWorkflowElement;
  /**
   * The page id of the page to be migrated
   */
  pageId: string;
  /**
   * A reference to the current site entity.
   */
  site: IHubSite;
  intl: ComponentIntl;
  private get _context();
  /**
  * The state machine that drives the behavior of this component
  */
  machine: IMachine;
  /**
  * The current state of the workflow
  * this is the driver for the UI
  */
  state: WorkflowState;
  shouldShowModal: boolean;
  hubTelemetry: EventEmitter<Record<string, any>>;
  arcgisHubPageMigrationWorkflowComplete: EventEmitter<string>;
  arcgisHubPageMigrationWorkflowClose: EventEmitter<void>;
  componentWillLoad(): Promise<void>;
  initMachine(): Promise<void>;
  private sharePageWithGroups;
  migratePage(state: WorkflowState): Promise<void>;
  stateChanged(state: WorkflowState): void;
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
  handleConfigEditorChange(event: CustomEvent): void;
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
