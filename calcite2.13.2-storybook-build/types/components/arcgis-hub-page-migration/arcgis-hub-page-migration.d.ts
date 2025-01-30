import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IHubSite } from '@esri/hub-common';
export declare class ArcgisHubPageMigration {
  element: HTMLArcgisHubPageMigrationElement;
  /**
   * The id of the page this component will migrate.
   */
  pageId: string;
  /**
   * A reference to the current site entity.
   */
  site: IHubSite;
  intl: ComponentIntl;
  shouldShowModal: boolean;
  canMigratePage: boolean;
  shouldMigratePage: boolean;
  arcgisHubPageMigrationWorkflowComplete: EventEmitter<string>;
  arcgisHubPageMigrationWorkflowClose: EventEmitter<void>;
  componentWillLoad(): Promise<void>;
  handleButtonClick: () => void;
  /**
   * Handler for onCalciteDialogClose event
   */
  handleModalClose: () => void;
  /**
   * Handler for onArcgisHubAddContentWorkflowClose event
   */
  handleClose: () => void;
  handlePageMigrationWorkflowComplete: (evt: CustomEvent) => void;
  _renderButton(): VNode;
  renderDialog(): VNode;
  render(): any;
}
