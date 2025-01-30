import { EventEmitter } from '../../../stencil-public-runtime';
/**
 * the arcgis-hub-workspace-pane component is a presentational "shell"
 * component which simply exposes several slots for pane content. Its
 * purpose is to provide a consistent layout for workspace panes
 *
 * @slot - default slot for adding custom content to appear in the "main" column of the workspace pane.
 * @slot help-state - slot for adding an arcgis-hub-help-state. Using this slot will ensure consistent styling
 * @slot title - A slot for adding a header title. This content will be positioned at the top of the component.
 * @slot subtitle - A slot for adding a header subtitle.  This content will be positioned below the title.
 * @slot primary-actions - A slot for adding action buttons. This content will be positioned below the header.
 * @slot side-pane - A slot for adding custom content to appear in the "side" column of the workspace pane.
 * @slot shell-panel-end - A slot for adding a calcite-shell-panel to the end of the calcite-shell. This is useful for adding additional configuration panels.
 * @slot footer - A slot for adding footer content. This content will be positioned at the bottom of the component and can be made "sticky" by passing in the stickyFooter prop.
 */
export declare class ArcgisHubWorkspacepane {
  stickyFooter: boolean;
  showHeader: boolean;
  isMobile: boolean;
  skeletonLoader: HTMLArcgisSkeletonLoaderElement;
  arcgisHubWorkspacePaneInitialized: EventEmitter<void>;
  componentDidRender(): void;
  /**
   * This is a public method that consuming components can
   * call to toggle a loading state in the workspace pane
   *
   * @param isLoading whether the loading state should render
   * @param opts skeleton loader options
   */
  toggleLoading(isLoading: boolean, opts?: {
    headingRows?: number;
    rows?: number;
    showFooter?: boolean;
    showHeading?: boolean;
    showThumbnail?: boolean;
  }): Promise<void>;
  renderHeader(): HTMLElement;
  renderPrimaryActions(): HTMLElement;
  renderHelpState(): HTMLElement;
  renderContent(): HTMLElement;
  renderFooter(): HTMLElement;
  renderSkeleton(): HTMLArcgisSkeletonLoaderElement;
  renderShellPanelEnd(): HTMLSlotElement;
  render(): any;
}
