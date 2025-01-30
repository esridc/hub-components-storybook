/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../src/utils/stencil-intl';
export declare class ArcgisHubDiscussionsMapActionNotice {
  el: HTMLArcgisHubDiscussionsMapActionNoticeElement;
  /**
   * Reference to the map view
   */
  view: __esri.MapView;
  /**
   * Track connected state
   */
  isConnected: boolean;
  /**
   * Event to notify that 'done' has been clicked and draw state
   * should be inactive
   */
  arcgisHubDrawDone: EventEmitter<void>;
  /**
   * Styles applied when notice is active
   */
  activeStyles: Record<string, string>;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * Constructor function, pre-binds context to relevant methods
   */
  constructor();
  componentWillLoad(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Connects component element and styles to MapView UI container
   */
  _connect(): void;
  /**
   * Removes component element and styles from UI container
   */
  _disconnect(): void;
  handleDone(): void;
  /**
   * Checks if MapView is available with UI container
   */
  get hasViewUI(): boolean;
  get styles(): {
    [key: string]: string;
  };
  render(): any;
}
