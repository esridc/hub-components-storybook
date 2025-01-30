import { EventEmitter } from '../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../utils/stencil-intl';
export declare class ArcgisHubMediaGalleryModal {
  element: HTMLElement;
  itemId: string;
  layout: 'list' | 'grid';
  /**
   * indicates whether the modal is open
   * @type {boolean}
   * @memberof ArcgisHubMediaGalleryModal
   */
  isOpen: boolean;
  arcgisHubMediaGalleryModalClosed: EventEmitter<null>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  onCalciteModalClose(): void;
  renderModalContent(): HTMLElement;
  render(): any;
}
