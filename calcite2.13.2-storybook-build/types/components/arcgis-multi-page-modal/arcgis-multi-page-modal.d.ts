import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisMultiPageModal {
  el: HTMLArcgisMultiPageModalElement;
  /**
   * Controls whether the modal is open or not
   */
  open: boolean;
  /**
   * References to all child pages
   */
  pages: HTMLArcgisModalPageElement[];
  /**
   * Current page index
   */
  index: number;
  /**
   * Emits when the modal is closed. If the modal was closed via the 'x' button,
   * the payload is 'Exited'. If the modal was closed via the 'okay' button, the
   * payload is 'Accepted'.
   */
  arcgisMultiPageModalClose: EventEmitter<'Accepted' | 'Exited'>;
  /**
   * Flag used to keep track of whether the modal was closed via the 'okay' button
   * or the 'x' button
   */
  isAcceptButtonClicked: boolean;
  intl: ComponentIntl;
  /**
   * As closing the modal does not remove this component from the DOM, we cannot leverage
   * the typical lifecycle hooks to re-initialize the component (i.e., grab the slotted
   * child components, start from the first page, etc.)
   *
   * To mitigate the issue, we re-initialize the component whenever `open` is toggled to `true`
   */
  handleOpenChanged(isNowOpen: boolean, wasPreviouslyOpen: boolean): void;
  constructor();
  componentWillLoad(): Promise<void>;
  connectedCallback(): void;
  initializeModal(): void;
  setVisiblePage(): void;
  showNextPage(): void;
  showPreviousPage(): void;
  handleAccept(): void;
  /**
   * Runs when the underlying modal is closed in any manner
   * @param event a calciteModalClose event
   */
  handleModalClose(event: CustomEvent): void;
  renderSecondaryButton(): VNode;
  renderPrimaryButton(): VNode;
  render(): any;
}
