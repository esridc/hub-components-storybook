import { IHubStage, IHubStageLink } from '@esri/hub-common';
import { ComponentIntl } from "../../utils/stencil-intl";
/** @internal */
export declare class ArcgisHubTimeline {
  /**
   * Timeline title
   */
  timelineTitle: string;
  /**
   * Timeline description
   */
  description: string;
  /**
   * Timeline stages
   */
  stages: IHubStage[];
  /**
   * User has the the option to collapse the timeline, but ONLY IF it has at least 6 stages
   */
  canCollapse: boolean;
  element: HTMLElement;
  /**
   * This is to determine whether the timeline is collapsed, so we will know
   * what button and icon to show
   */
  isCollapsed: boolean;
  hubTelemetry: Record<string, any>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * Whether we should collapse the timeline, meaning all conditions have been met
   */
  get shouldCollapse(): boolean;
  renderStageLink(link: IHubStageLink): HTMLElement;
  handleCollapseExpandBtnClick(): void;
  renderCollapseExpandIconAndBtn(): HTMLElement;
  renderStages(): HTMLElement;
  renderStage(stage: IHubStage): HTMLElement;
  renderFirstThreeStages(): HTMLElement[];
  renderLastStage(): HTMLElement;
  renderExpandedStages(): HTMLElement[];
  /**
   * This is where we choose to render the collapsed timeline or expanded timeline
   * it is a bit tricky and can be confusing...
   * not only we have to consider whether expanded timeline should be shown
   * but we also have to consider if it should be shown, whether it's already been expanded
   * (after user clicks the 'expand timeline' button, marked by the isCollapsed flag)
   * so at the initial stage, when a timeline is first created, isCollapsed is set to align with
   * shouldCollapse, after that, it will be altered by the 'collapse/expand timeline' button
   */
  renderRemainingStages(): any;
  render(): any;
}
