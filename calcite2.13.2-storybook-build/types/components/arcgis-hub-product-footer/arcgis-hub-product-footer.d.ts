import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
/**
 * The arcgis-hub-product-footer is a simple footer component to be
 * used across our application. It is a thin wrapper around the
 * calcite-menu component that applies appropriate/consistent
 * styling and telemetry
 *
 * Note: this is a first-pass of the new product footer that will
 * be incorporated on workspaces. We will likely iterate on its
 * content and design, and should aim to eventually adopt this
 * footer on main application routes (not just workspaces) as well
 */
export declare class ArcgisHubProductFooter {
  element: HTMLArcgisHubProductFooterElement;
  isMobile: boolean;
  private get _context();
  intl: ComponentIntl;
  productName: string;
  componentWillLoad(): Promise<void>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  emitTelemetry: (evt: MouseEvent) => void;
  render(): any;
}
