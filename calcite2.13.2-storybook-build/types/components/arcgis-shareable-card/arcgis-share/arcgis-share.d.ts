import { EventEmitter, VNode } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
export declare class ArcgisShare {
  element: HTMLElement;
  intl: ComponentIntl;
  hubTelemetry: EventEmitter;
  /**
   * The origin of the shareable link (optional)
   *
   * @type {string}
   * @memberof ArcgisShare
   */
  origin: string;
  /**
   * The pathname of the shareable link (optional)
   *
   * @type {string}
   * @memberof ArcgisShare
   */
  pathname: string;
  /**
   * The query string of the shareable link (optional)
   *
   * @type {string}
   * @memberof ArcgisShare
   */
  search: string;
  /**
   * The url hash of the shareable link (optional)
   *
   * @type {string}
   * @memberof ArcgisShare
   */
  hash: string;
  /**
   * Indicates whether the card is shareable via link
   * @memberof ArcgisShare
   */
  shareable: boolean;
  /**
   * Indicates whether the card is shareable via embed
   * @memberof ArcgisShare
   */
  shareableByValue: boolean;
  /**
   * Indicates whether the card is shareable via embed by reference
   * @memberof ArcgisShare
   */
  shareableByReference: boolean;
  /**
   * The element to to be shared
   * @type {HTMLElement}
   * @memberof ArcgisShare
   */
  referenceElement: HTMLElement;
  get linkUrl(): string;
  private getCardState;
  private getSnippetByVal;
  private getSnippetByRef;
  private updateSnippets;
  domId: string;
  snippetByVal: string;
  snippetByRef: string;
  /**
   * Hooks
   */
  constructor();
  componentWillLoad(): Promise<void>;
  componentWillRender(): void;
  onCopyButtonClicked(event: CustomEvent): void;
  render(): VNode;
}
