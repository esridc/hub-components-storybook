import { EventEmitter } from '../../../stencil-public-runtime';
import { IWorkspaceLinkClicked, WorkspacePane } from '../../../utils/workspace';
/**
 * The arcgis-hub-workspace-link is a utility component meant to
 * simplify linking in workspaces. It accepts content into its default
 * slot, wraps it in a calcite-link (unless it is a button), and
 * dynamically computes the appropriate HREF based on the provided
 * props.
 *
 * NOTE: In an effort to future-proof linking in workspaces (as we
 * potentially transition to a different FE framework), we should
 * rely as much as possible on relative linking
 *
 * NOTE: currently this component implements some slightly complex
 * logic to support button links; however, designs are under review
 * to determine whether a button should ever be used to simply link
 * between routes or if they should only be used when performing an
 * action; therefore, there's a chance this logic will be removed
 * moving forward
 */
export declare class ArcgisHubWorkspaceLink {
  element: HTMLElement;
  /**
   * If a pane is provided, we assume that this link is for
   * inter-pane navigation, and the provided pane is the
   * pane that the link should navigate to.
   */
  pane: WorkspacePane;
  /**
   * specifies the URL of the linked resource, which can be
   * set as an absolute or relative path.
   */
  href: string;
  /**
   * If a relative href is provided, this prop can be set to
   * specify whether it should be relative to the current url
   * or to the origin url
   */
  relativeToOrigin: boolean;
  /**
   * Telemetry to log when the link is clicked. We log default
   * telemetry based on the other props provided, but exposing
   * this gives the consumer some flexibility around the telemetry
   * that gets logged. NOTE: telemetry events passed into this
   * prop should come from our telemetry dictionary
   */
  telemetry: Record<string, any>;
  /**
   * specifies an icon to display at the start of the component.
   */
  iconStart: string;
  /**
   * specifies an icon to display at the end of the component.
   */
  iconEnd: string;
  /**
   * specifies the frame or window to open the linked document.
   */
  target: string;
  isText: boolean;
  isButton: boolean;
  arcgisHubWorkspaceLinkClicked: EventEmitter<IWorkspaceLinkClicked>;
  hubTelemetry: EventEmitter<any>;
  constructor();
  /**
   * 1. We default to the provided href (relative or absolute)
   * 2. If pane is provided, we assume this is an inter-workspace-pane
   * link and we construct a relative href using the existing url
   * 3. If a (relative) href is provided and specified to be
   * relativeToOrigin, we construct an absolute url relative to the
   * origin url
   */
  get _href(): string;
  /**
   * This function is called when the slotted content changes. It
   * checks whether the slotted content is a calcite-button and
   * if so, sets the "isButton" flag to true and sets the href
   * on the calcite-button to the computed _href.
   *
   * In the render function, you'll see that we use the "isButton"
   * state to conditionally render a calcite-link around the slotted
   * content. If a button is slotted in, we do NOT want to wrap it
   * in a calcite-link as it is improper HTML to wrap a button
   * in an anchor tag. Instead, we simply render the button and
   * manually set its href
   */
  handleSlotChange(evt: CustomEvent): void;
  handleClick(evt: MouseEvent | KeyboardEvent): void;
  handleKeyDown(evt: KeyboardEvent): void;
  render(): any;
}
