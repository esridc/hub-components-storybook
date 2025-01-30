import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ALIGNMENTS, UNIT_POSITIONS, CORNERS, LAYOUTS, SOURCE, IShareableCard, SCALE, DROP_SHADOWS, VISUAL_INTEREST, ICONS } from "../interfaces";
import { IErrorMessage, METRIC_ERRORS } from '../arcgis-hub-metric-card/interfaces';
import { ComponentIntl } from '../../utils/stencil-intl';
/**
 * @slot header-media - A slot for adding markup in the upper right corner of the card. This is intended for things like a logo, an icon, or a tiny chart.
 * @slot value-media - A slot for adding markup to follow the value. This is intended for something like a trend indicator.
 * @slot footer - A slot for adding markup to the footer. This will render below any text provided via the `trailingText` prop. This is intended for things like charts.
 */
export declare class ArcgisStatCard implements IShareableCard {
  element: HTMLElement;
  /**
   * Whether the statistic being rendered was manually input or dynamically created.
   * possible values are 'dynamic' | 'static'
   *
   * @type {Source}
   * @memberof ArcgisStatCard
   */
  type: SOURCE;
  /**
   * The layout chosen for the styling of the stat card (optional)
   *
   * @type {Layout}
   * @memberof ArcgisStatCard
   */
  layout: LAYOUTS;
  /**
   * The title to appear at the top of the card (optional)
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  cardTitle: string;
  /**
   * The alignment of the text (optional)
   *
   * @type {Alignment}
   * @memberof ArcgisStatCard
   */
  textAlign: ALIGNMENTS;
  /**
   * A subtitle to appear before the value (optional)
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  subtitle: string;
  /**
   * The value to render in the main content area
   * It is expected that the consumer will format the value appropriately
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  value: string;
  /**
   * The color in which to render the value (optional)
   *
   * @type {string=--calcite-color-brand}
   * @memberof ArcgisStatCard
   */
  valueColor: string;
  /**
   * The unit to render next to the value (optional)
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  unit: string;
  /**
   * Where to render the unit (optional)
   *
   * @type {UnitPosition=after}
   * @memberof ArcgisStatCard
   */
  unitPosition: UNIT_POSITIONS;
  /**
   * If any unit rendering should be allowed. Defaults to true (optional)
   */
  allowUnitFormatting: boolean;
  /**
   * Text to render in the footer of the card (optional)
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  trailingText: any;
  /**
   * The hyperlink to the source of the stat card's data
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  sourceLink: any;
  /**
   * The clickable text rendered for the hyperlink to the source of the stat card's data
   */
  sourceTitle: any;
  /**
   * If any source link and source title rendering should be allowed. Defaults to true (optional)
   */
  allowLink: boolean;
  /**
   * Text to provide additional information, rendered inside the calcite-modal
   * Only relevant if layout is "informational"
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  popoverText: any;
  /**
   * Information about the publisher, rendered inside the calcite-modal
   * Only relevant if layout is "informational"
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  publisherText: any;
  /**
   * Sets the icon type (caretUp, caretDown, caretDouble) based on visual interest.
   */
  icon: ICONS;
  /**
   * Controls whether visual interest icons are displayed ('none' or 'icon')
   */
  visualInterest: VISUAL_INTEREST;
  /**
   * Whether the card should render a share button
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  shareable: boolean;
  shareableByValue: boolean;
  shareableByReference: boolean;
  shareableOnHover: boolean;
  /**
   * The style of the card's corners
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  corners: CORNERS;
  /**
   * Adds a drop shadow to the calcite-card. Currently just for internal use.
   *
   * @type {string}
   * @memberof ArcgisStatCard
   */
  shadow: DROP_SHADOWS;
  /**
   * What border to render the card with, if any
   */
  border: boolean;
  /**
   * The scale of the font sizes on the stat card: "s", "m" or "l"
   */
  scale: SCALE;
  /**
   * Error message to display instead of any value (optional)
   */
  errorMessage: IErrorMessage;
  /**
   * Allows a component to dictate when the stat card is
   * finished loading or not
   */
  isLoading: boolean;
  /**
   * The state of the open attribute on the modal
   *
   * @type {boolean}
   */
  isModalOpen: boolean;
  intl: ComponentIntl;
  hubTelemetry: EventEmitter;
  onColorChanged(newVal: string): void;
  onCornersChanged(style: string): void;
  getState(): Promise<any>;
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  updateCSSProp(cssVar: string, newVal: string): void;
  /**
   * Emits hubTelemetry once source link is selected
   */
  handleLinkNavigation(): void;
  /**
   * Closes the calcite-modal
   */
  handleModalClose(): void;
  /**
   * Opens the calcite-modal
   */
  handleModalOpen(): void;
  /**
   * Renders the information calcite-icon wrapped in a calcite-button with interactability
   * @returns HTMLElement
   */
  renderInfoIcon(): HTMLElement;
  /**
   * Renders the selected visual interest icon
   * @returns HTMLElement
   */
  renderVisualInterestIcon(): HTMLElement;
  /**
   * Renders the selected icon dependent on layout type. In the future, we look to
   * expand icon choices by adding a dependencies on source and card style
   * @returns HTMLElement
   */
  renderIcon(): HTMLElement;
  /**
   * Renders the title, headerMedia, subtitle, and icon on the stat card
   * @param title - title of stat card
   */
  renderHeader(title: string): HTMLElement;
  /**
   * Renders the calcite-modal on info-icon click to give user more information
   * @returns HTMLElement
   */
  renderInformationalModal(): HTMLElement;
  renderSubtitle(subtitle: string): HTMLElement;
  renderValue(value: string, unit: string): Array<HTMLElement>;
  shouldShowLink(allowLink: boolean, sourceLink: string, type: SOURCE): boolean;
  renderFooter(trailingText: string, sourceLink: string, sourceTitle: string, allowLink: boolean, type: SOURCE): HTMLElement;
  renderTrailingText(trailingText: string): HTMLElement;
  /**
   * Helper function to determine if we are linking out to an external source rather than something on the same site.
   * @param type
   * @param sourceLink
   * @returns
   */
  shouldShowLaunchIcon(type: SOURCE, sourceLink: string): boolean;
  /**
   * Renders the source link and source title text of the stat card.
   * @param sourceLink
   * @param sourceTitle
   * @param type
   * @param usePrefix
   * @returns
   */
  renderSourceLink(sourceLink: string, sourceTitle: string, type: SOURCE, usePrefix: boolean): HTMLElement;
  getPremadeError(type: METRIC_ERRORS): IErrorMessage;
  renderErrorMessage(errorMessage: IErrorMessage): HTMLElement;
  get _isLoading(): boolean;
  renderContent(): VNode;
  render(): VNode;
}
