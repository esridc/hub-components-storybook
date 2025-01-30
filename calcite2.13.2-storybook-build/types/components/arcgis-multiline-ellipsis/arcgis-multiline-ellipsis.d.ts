import { EventEmitter } from '../../stencil-public-runtime';
import { HTMLCalciteLinkElement } from '@esri/calcite-components/dist';
import { ComponentIntl } from '../../utils/stencil-intl';
/**
 * @slot default - The content to truncated.
 */
export declare class ArcgisMultilineEllipsis {
  /**
   * Host element reference
   */
  element: HTMLElement;
  /**
   * A positive integer representing the maximum number of lines to render
   * before truncating the text and adding the ellipsis
   */
  lines: number;
  /**
   * A boolean indicating whether the expand link should display when
   * the content is truncated
   */
  expandEnabled: boolean;
  /**
   * An optional override for the expand icon
   */
  expandIcon: string;
  /**
   * An optional override for the expand link text
   */
  expandText: string;
  /**
   * A boolean indicating whether the collapse link should display when
   * the content is expanded
   */
  collapseEnabled: boolean;
  /**
   * An optional override for the collapse icon
   */
  collapseIcon: string;
  /**
   * An optional override for the collapse link text
   */
  collapseText: string;
  /**
   * A boolean indicating whether a tooltip should display when
   * the content is truncated
   */
  tooltipEnabled: boolean;
  /**
   * An optional override for the tooltip text. By default
   * we render the full text content that was truncated
   */
  tooltipText: string;
  /**
   * An optional override for tooltip placement
   */
  tooltipPlacement: string;
  /**
   * If the content overflows the allowed number of lines
   */
  isOverflowing: boolean;
  /**
   * If the full, untruncated text should be displayed
   */
  expanded: boolean;
  /**
   * Emitted when the expand link is clicked
   */
  arcgisMultilineEllipsisExpand: EventEmitter<void>;
  /**
   * Emitted when the collapse link is clicked
   */
  arcgisMultilineEllipsisCollapse: EventEmitter<void>;
  /**
   * A reference to the container element
   */
  container: HTMLDivElement;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Constructor function
   */
  constructor();
  /**
   * ComponentWillLoad lifecycle method
   */
  componentWillLoad(): Promise<void>;
  /**
   * componentDidLoad lifecycle method
   */
  componentDidLoad(): void;
  /**
   * connectedCallback lifecycle method
   */
  connectedCallback(): void;
  /**
   * disconnectedCallback lifecycle method
   */
  disconnectedCallback(): void;
  /**
   * Observe the paragraph element for resize changes
   */
  observe(): void;
  /**
   * Stop observing the paragraph element for resize changes
   */
  unobserve(): void;
  /**
   * Handles clicks to the Read More link
   */
  handleExpand(): void;
  /**
   * Handles clicks to the Read Less link
   */
  handleCollapse(): void;
  /**
   * Assigns a reference to the paragraph element
   * @param p A reference to the paragraph element
   */
  handleRef(container: HTMLDivElement): void;
  /**
   * Checks to see if the contents of the paragraph element
   * exceed the desired number of lines
   */
  checkIsOverflowing(): void;
  /**
   * Getter to compute the host element styles
   */
  get styles(): {
    [key: string]: string;
  };
  /**
   * Provided tooltip text or the full text content
   * (either slotted or passed in as innerHTML to the
   * component). On overflow, we render this content
   * in a tooltip if enabled.
   */
  get _tooltipText(): string;
  /**
   * Renders a tooltip with the full text content
   */
  renderTooltip(): HTMLCalciteTooltipElement | null;
  /**
   * Renders the Read More or Read Less link
   */
  renderLink(): HTMLCalciteLinkElement;
  /**
   * Primary render entrypoint
   */
  render(): any;
}
