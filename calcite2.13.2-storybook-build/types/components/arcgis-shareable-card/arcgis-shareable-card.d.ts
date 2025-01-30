import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisShareableCard {
  element: HTMLElement;
  intl: ComponentIntl;
  hubTelemetry: EventEmitter;
  /**
   * Indicates whether the card is shareable via link
   * @memberof ArcgisShareableCard
   */
  shareable: boolean;
  /**
   * Indicates whether the card is shareable via embed
   * @memberof ArcgisShareableCard
   */
  shareableByValue: boolean;
  /**
   * Indicates whether the card is shareable via embed by reference
   * @memberof ArcgisShareableCard
   */
  shareableByReference: boolean;
  /**
   * The element to be shared
   * @type {HTMLElement}
   * @memberof ArcgisShareableCard
   */
  referenceElement: HTMLElement;
  /**
   * Whether to hide the sharing ui until the element has :focus or :hover state
   * @memberof ArcgisShareableCard
   */
  shareableOnHover: boolean;
  /**
   * can be used by consumers to disable rendering of the sharing ui completely
   * @memberof ArcgisShareableCard
   */
  showShareUi: boolean;
  get isShareable(): boolean;
  get shouldRender(): boolean;
  private get _messageOverrides();
  modalIsOpen: boolean;
  /**
   * Event Handling
   */
  private onCalciteModalClose;
  private onOpenModalButtonClick;
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  renderSharingUi(): VNode;
  render(): any;
}
