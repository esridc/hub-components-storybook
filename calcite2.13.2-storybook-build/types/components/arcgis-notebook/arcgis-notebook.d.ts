import { EventEmitter } from '../../stencil-public-runtime';
import { UserSession } from '@esri/arcgis-rest-auth';
import { IGetItemResourceOptions } from '@esri/arcgis-rest-portal';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisNotebook {
  el: HTMLElement;
  intl: ComponentIntl;
  iFrameEl: HTMLIFrameElement;
  /**
   * The item id of the notebook preview to render
   *
   * @type {string}
   * @memberof HubArcgisNotebook
   */
  itemId: string;
  onItemIdChanged(): void;
  /**
   * The authentication token
   *
   * @type {string}
   * @memberof HubArcgisNotebook
   */
  token: string;
  onTokenChanged(): void;
  /**
   * The portal rest api url
   *
   * @type {string}
   * @memberof HubArcgisNotebook
   */
  portalUrl: string;
  onPortalUrlChanged(): void;
  /**
   * A title for the notebook, applied to the iframe title attribute
   *
   * @type {string}
   * @memberof HubArcgisNotebook
   */
  notebookTitle: string;
  /**
   * Indicates whether the iframe is allowed to run scripts
   *
   * @type {boolean}
   * @memberof HubArcgisNotebook
   */
  allowScripts: boolean;
  notebookPreview: string;
  onPreviewChanged(newValue: string, oldValue: string): void;
  authentication: UserSession;
  isLoading: boolean;
  error: string;
  /**
   * Error event emitted when the component is unable to fetch the notebook preview
   *
   * @type {EventEmitter<string>}
   * @memberof HubArcgisNotebook
   */
  arcGisNotebookError: EventEmitter<string>;
  componentWillLoad(): Promise<void>;
  componentShouldUpdate(_newVal: any, _oldVal: any, propName: any): boolean;
  get requestOpts(): IGetItemResourceOptions;
  get sandboxSettings(): string;
  reset(): void;
  updateIframe(): void;
  fetchPreview(): void;
  setIframeEl(el: HTMLIFrameElement): void;
  render(): any;
}
