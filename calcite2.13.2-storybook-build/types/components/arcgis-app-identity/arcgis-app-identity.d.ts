import { EventEmitter } from '../../stencil-public-runtime';
import { ArcGISContextManager, IArcGISContext, IFeatureFlags } from '@esri/hub-common';
export interface IIdentityChangeEvent {
  state: "signed-in" | "signed-out";
}
export declare class ArcgisAppIdentity {
  /**
   * oAuth ClientId
   */
  clientId: string;
  /**
   * Redirect Uri associated with the clientid
   */
  redirectUri: string;
  /**
   * Use popup or redirect based oauth
   * NOTE: only popup is currently supported
   */
  popup: boolean;
  /**
   * Should the identity be persisted in localStorage
   */
  persist: boolean;
  /**
   * Popup window features
   * i.e. `height=400,width=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes`
   */
  features: string;
  /**
   * Set of feature flags to enable
   */
  flags: IFeatureFlags;
  /**
   * Portal to authenticate against
   * defaults to https://www.arcgis.com
   */
  portal: string;
  /**
   * If a host application will be providing
   * an ArcGISContext instance, set mode to 'app'
   * otherwise leave as the default 'html'
   * in which case this will create it's own
   * ArcGISContext instance and will check localStorage
   * when it starts up
   */
  mode: 'html' | 'app';
  /**
   * Container for settings and session
   * This is mutable because when in `html` mode,
   * the component will re-hydrate a session from
   * localStorage, and then assign it to `.context`
   */
  contextManager: ArcGISContextManager;
  signInCompleted: EventEmitter<IArcGISContext>;
  signOutCompleted: EventEmitter<IArcGISContext>;
  portalUpdated(): Promise<void>;
  /**
   * Sharing API base url
   */
  get sharingApiUrl(): string;
  onSignInHandler(event: CustomEvent): Promise<void>;
  onSignOutHandler(): Promise<void>;
  componentWillLoad(): void;
  componentWillRender(): void;
  componentDidRender(): void;
  render(): any;
  private _initContextManager;
}
