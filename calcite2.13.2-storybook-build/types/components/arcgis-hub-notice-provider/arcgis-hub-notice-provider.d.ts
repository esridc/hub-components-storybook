/**
 * This component is responsible for rendering preconfigured notices as well as on-demand notices pushed to the global state (stencil store).
 * NOTE: we expect a single instance of this component on the page to avoid duplicate notices
 */
export declare class ArcgisHubNoticeProvider {
  /**
   * The current place in the app - this will typically be a url path
   */
  place: string;
  autoShowDisabled: boolean;
  private get _context();
  /**
  * An array of preconfigured notices that should be automatically shown
  * @readonly
  * @private
  * @memberof ArcgisHubNoticeProvider
  */
  private get preConfigured();
  /**
  * An array of notices that are pushed to the global state
  * @readonly
  * @private
  * @memberof ArcgisHubNoticeProvider
  */
  private get onDemand();
  /**
  * An array of all notices that should be rendered
  * @readonly
  * @private
  * @memberof ArcgisHubNoticeProvider
  */
  private get notices();
  onCloseNotice: (evt: any) => void;
  render(): any;
}
