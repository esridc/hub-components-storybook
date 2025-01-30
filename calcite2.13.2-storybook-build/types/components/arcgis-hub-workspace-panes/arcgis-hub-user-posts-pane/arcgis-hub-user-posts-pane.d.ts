import { ComponentIntl } from '../../../utils/stencil-intl';
import { IQuery } from '@esri/hub-common';
/***
 *    ##      ## #### ########
 *    ##  ##  ##  ##  ##     ##
 *    ##  ##  ##  ##  ##     ##
 *    ##  ##  ##  ##  ########
 *    ##  ##  ##  ##  ##
 *    ##  ##  ##  ##  ##
 *     ###  ###  #### ##
 *
 * The Discussion Posts Search api is not fully featured yet, so this component is a placeholder
 */
/**
 * A component that displays a list of discussion posts the current user is participating in.
 * @slot title - The title of the pane
 */
export declare class ArcgisHubUserPostsPane {
  element: HTMLElement;
  intl: ComponentIntl;
  isMobile: boolean;
  _context: import("@esri/hub-common").IArcGISContext;
  componentWillLoad(): Promise<void>;
  get query(): IQuery;
  /**
     * Construct props that will be passed through the gallery, to the
     * `arcgis-hub-add-content` component
     */
  get addContentProps(): Record<string, any>;
  render(): any;
}
