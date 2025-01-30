import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from "../../utils/stencil-intl";
import { IHubTimeline, IHubStage, IChangeEventDetail, IConfigurationSchema, IUiSchema } from '@esri/hub-common';
import { CalciteSortableListCustomEvent, CalciteSwitchCustomEvent } from '@esri/calcite-components';
/**
 * the arcgis-hub-timeline-editor is an editor for configuring
 * IHubTimelines. It is a standalone editor that can be consumed
 * in the layout editor, but is also a "composite" field that
 * can be leveraged directly in another configuration editor.
 */
export declare class ArcgisHubTimelineEditor {
  element: HTMLElement;
  /** Timeline details, e.g. title, description */
  values: IHubTimeline;
  /**
   * Indicates whether to expose the title and description fields.
   *
   * On the project workspace, for example, we don't expose these
   * fields; however, for the timeline card in the layout editor,
   * we do.
   */
  showTitleAndDescription: boolean;
  /** Stage details, e.g. title, timeframe, description, link */
  stages: IHubStage[];
  /** index of the stage being edited */
  _currentStageIdx: number;
  /** Event that's fired whenever changes are made to the editor */
  arcgisHubTimelineEditorChange: EventEmitter<IChangeEventDetail>;
  /** Event to emit telemetry to the consuming application */
  hubTelemetry: Record<string, any>;
  /** internationalization service */
  intl: ComponentIntl;
  /** internal copy of the timeline */
  _timeline: IHubTimeline;
  /**
   * The timeline editor is comprised of 2 configuration editors:
   * 1. one for configuring the timeline's title/description
   * 2. one for configuring the timeline's stages
   *
   * The following are the respective schemas/uiSchemas for these editors
   */
  _timelineSchema: IConfigurationSchema;
  _timelineUiSchema: IUiSchema;
  _stageSchema: IConfigurationSchema;
  _stageUiSchema: IUiSchema;
  constructor();
  componentWillLoad(): Promise<void>;
  get isCollapseToggleDisabled(): boolean;
  private translationFunc;
  updateStages(stages: IHubStage[], isValid?: boolean): void;
  handleRemoveStage: (event: CustomEvent) => void;
  handleAddStage(): void;
  setStageFocus(stageKey: string): void;
  handleEditorChangeEvent(event: CustomEvent): void;
  handleStageEditorChangeEvent: (event: CustomEvent) => void;
  onStageEditorOpen: (event: CustomEvent) => void;
  handleStageOrderChangeEvent(event: CalciteSortableListCustomEvent<void>): void;
  handleCalciteSwitchChange: (event: CalciteSwitchCustomEvent<void>) => void;
  renderStages(): HTMLCalciteSortableListElement;
  renderStage(stage: IHubStage, idx: number): VNode;
  render(): any;
}
