import { EventEmitter, VNode } from '../../../../stencil-public-runtime';
import { IVersionMetadata } from '@esri/hub-common';
import { ComponentIntl } from "../../../../utils/stencil-intl";
export declare class ArcgisHubVersionsDeleteModal {
  /**
   * Reference to host element
   */
  element: HTMLElement;
  /**
   * The versions for the specified item
   */
  version: IVersionMetadata;
  displayName: string;
  arcgisHubVersionsDeleteModalDelete: EventEmitter<IVersionMetadata>;
  arcgisHubVersionsDeleteModalClose: EventEmitter<null>;
  /**
   * Should we show the delete modal?
  */
  shouldShow: boolean;
  error: boolean;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor();
  /**
   * Component will load lifecycle method, fetches translations and data
   * needed to render the UI
   */
  componentWillLoad(): Promise<void>;
  onHide(event: Event): void;
  onDelete(event: Event): Promise<void>;
  renderError(): VNode;
  render(): any;
}
