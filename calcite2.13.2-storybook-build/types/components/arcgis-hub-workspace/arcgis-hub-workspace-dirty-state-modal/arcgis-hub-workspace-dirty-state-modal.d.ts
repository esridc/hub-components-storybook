import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { WorkspacePane } from '../../../utils/workspace';
/**
 * the arcgis-hub-workspace-dirty-state-modal component should be used
 * to render a warning to users who are trying to navigate away from a
 * "dirty" state in their workspace. Users are given the option to either
 * cancel or proceed.
 */
export declare class ArcgisHubWorkspaceDirtyStateModal {
  element: HTMLElement;
  /**
   * indicates whether the modal is open
   */
  isOpen: boolean;
  /**
   * If a user chooses to proceed (despite the dirty state),
   * this is the workspace pane we will navigate them to
   *
   * Note: only one of "pane" or "href" needs to be provided.
   * If both are provided, pane will take priority
   */
  pane: WorkspacePane;
  /**
   * If a user chooses to proceed (despite the dirty state),
   * this is the URL we will navigate them to. Thi can be
   * provided as an absolute or relative path.
   *
   * Note: only one of "pane" or "href" needs to be provided.
   * If both are provided, pane will take priority
   */
  href: string;
  arcgisHubWorkspaceDirtyStateModalClosed: EventEmitter<boolean>;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  handleCloseDirtyStateModal: () => void;
  handleConfirmDirtyStateModal: () => void;
  get isLeavingPane(): string;
  /**
   * Either render a workspace link if we are navigating to a new pane or href
   * or render a calcite button if we are just closing the modal and staying on the same tab
   * @returns
   */
  renderPrimaryButton(): any;
  render(): any;
}
