import { EventEmitter, VNode } from '../../../../stencil-public-runtime';
import { IVersionMetadata } from '@esri/hub-common';
import { ComponentIntl } from "../../../../utils/stencil-intl";
export declare class ArcgisHubVersionsDetailsModal {
  /**
   * Reference to host element
   */
  element: HTMLElement;
  /**
   * The versions for the specified item
   */
  version: IVersionMetadata;
  arcgisHubVersionsDetailsModalSave: EventEmitter<IVersionMetadata>;
  arcgisHubVersionsDetailsModalClose: EventEmitter<null>;
  /**
   * Should we show the details modal?
  */
  shouldShow: boolean;
  _version: IVersionMetadata;
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
  versionChangeHandler(version: IVersionMetadata): void;
  onDetailsChange(event: CustomEvent): void;
  onHide(event: Event): void;
  onSave(event: Event): Promise<void>;
  private translationFunc;
  renderError(): VNode;
  render(): any;
}
