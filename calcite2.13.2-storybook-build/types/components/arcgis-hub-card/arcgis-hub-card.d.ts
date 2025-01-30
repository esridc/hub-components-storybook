import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { IHubCardViewModel, ICardActionLink, IInfoConfig } from '@esri/hub-common';
import { ComponentIntl } from "../../utils/stencil-intl";
import { CORNERS, DROP_SHADOWS, IMAGE_TYPES } from "../interfaces";
import { Sanitizer } from '@esri/arcgis-html-sanitizer';
import { Appearance } from '@esri/calcite-components/dist/types/components/interfaces';
import { IHubCardTitleLinkClickEvent } from '../../utils/cardModelConverters/types';
export declare class ArcgisHubCard {
  element: HTMLElement;
  /**
   * Model received from the parent component
   */
  model: IHubCardViewModel;
  /**
   * Layout of each hub card, row(list) or card(grid) layout
   */
  layout: 'row' | 'card' | 'header';
  /**
   * We show the loading state when item is being fetched
   */
  loading: boolean;
  /**
   * Show/hide the thumbnail
   */
  showThumbnail: boolean;
  imageType: IMAGE_TYPES;
  /**
   * Indicates if the thumbnail should lazy load
   */
  lazy: boolean;
  /**
   * Whether to open the card url in a new tab
   */
  newTab: boolean;
  /**
   * Whether the card/row is selectable
   */
  selectable: boolean;
  /**
   * Whether the card/row is selected
   */
  selected: boolean;
  itemTitle: string;
  source: string;
  summary: string;
  thumbnailUrl: string;
  family: string;
  additionalInfo: string;
  /**
   * @deprecated - use cardActionLinks instead
   */
  actionLinks: string;
  cardActionLinks: ICardActionLink[];
  badges: string;
  type: string;
  identifier: string;
  corners: CORNERS;
  titleTag: string;
  showAdditionalInfo: boolean;
  /**
   * If true, all additional info items will be
   * displayed when layout === 'row'
   */
  showAllAdditionalInfo: boolean;
  shadow: DROP_SHADOWS;
  showBadges: boolean;
  showType: boolean;
  showOwner: boolean;
  primaryActionsToRender: 1 | 2 | 3;
  /**
   * AVOID USING prop until accessibility violations are resolved
   */
  clickable: boolean;
  /**
   * When the select box is being check/unchecked
   */
  arcgisHubCardSelect: EventEmitter<IHubCardViewModel>;
  /**
   * Emits when a user clicks the card title and the title is a link
   */
  arcgisHubCardTitleLinkClick: EventEmitter<IHubCardTitleLinkClickEvent>;
  arcgisHubCardAction: EventEmitter<{
    action: string;
    model: IHubCardViewModel;
  }>;
  /**
   * Internal variables
   */
  sanitizer: Sanitizer;
  internalId: string;
  /**
   * Date and time formatter to use based on locale
   */
  dateTimeFormatter: Intl.DateTimeFormat;
  intl: ComponentIntl;
  constructor();
  /**
   * Get the icon for the content type
   */
  get contentTypeIcon(): string;
  /**
   * Get the primary infos to be shown in the body of
   * the row. Cards do not display any infos
   */
  get primaryInfos(): Array<IInfoConfig>;
  /**
   * Get the secondary info to be shown in the pop-over
   * - Pop-over should only contain max 4 entries
   * - Actions are always shown
   * - we show as many info's as we have space for
   */
  get secondaryInfos(): Array<IInfoConfig>;
  /**
   * Do we have any content to render in the pop-over. If not
   * lets not render it
   */
  get hasPopoverContent(): boolean;
  /**
   * Do we have a primary action?
   */
  get hasPrimaryAction(): boolean;
  /**
   * Primary action is the first action in model.actionLinks
   */
  get primaryActions(): Array<ICardActionLink>;
  /**
   * Secondary Actions are the 2nd, 3rd and 4th actions in model.actionLinks
   */
  get secondaryActions(): Array<ICardActionLink>;
  /**
   * AVOID USING getter until accessibility violations are resolved
   */
  get isClickable(): boolean;
  componentWillLoad(): Promise<void>;
  componentWillRender(): Promise<void>;
  /**
   * Fired when a card is selected/deselected
   */
  handelCardSelectEvent(): void;
  get _thumbnailUrl(): string;
  get _fallbackUrl(): string;
  private get _messageOverrides();
  /**
   * Render the thumbnail if showThumbnail is true
   * We will render an image icon with a gray background if the item does not contain a thumbnail
   * @returns thumbnail html element
   */
  renderThumbnail(model: IHubCardViewModel): VNode;
  getThumbnailClassName(model: IHubCardViewModel): string;
  configureFullNameAvatar(model: IHubCardViewModel): string;
  renderAvatar(model: IHubCardViewModel): VNode;
  /**
   * When there is no card url, render a plain text title instead of a link
   * @returns card url
   */
  renderCardTitle(model: IHubCardViewModel): VNode;
  onTitleLinkClick(event: MouseEvent): void;
  renderFooter(): VNode[];
  renderAdditionalInfo(infos: Array<IInfoConfig>): VNode[];
  renderPopoverAdditionalInfo(): VNode;
  actionHandler(action: string, model: IHubCardViewModel): void;
  renderActions(actions: Array<ICardActionLink>, buttonStyle?: Appearance): VNode[];
  renderHeader(model: IHubCardViewModel): VNode;
  renderChips(model: IHubCardViewModel): VNode;
  renderPopover(): VNode;
  renderSourceSlot(model: IHubCardViewModel): VNode;
  /**
   * Render the card or row
   * @param model
   * @param isLoading
   * @param layout card or row
   * @returns layout element
   */
  renderLayout(model: IHubCardViewModel, isLoading?: boolean): VNode;
  render(): VNode | "No data.";
}
