import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { IChangeEventDetail, IConfigurationSchema, IHubSiteUrlInfo, IUiSchema } from '@esri/hub-common';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { IRenderParams } from '../../resources';
/**
 * A composite input field for a site's URL.
 *
 * Currently only supports "default" URLs (i.e. subdomains of hub.arcgis.com or opendata.arcgis.com).
 *
 */
export declare class SiteUrl {
  element: HTMLElement;
  /**
   * The site's URL info including subdomain and hostname
   */
  urlInfo: IHubSiteUrlInfo;
  /**
   * The site's organization's URL key, ex: 'my-org'
   */
  orgUrlKey: string;
  /**
   * The render parameters for the component
   */
  params: IRenderParams;
  /**
   * Every field component emits this event. The
   * arcgis-configuration-editor-field component
   * listens for these events to emit editor changes
   * up to the arcgis-configuration-editor
   */
  arcgisCompositeSiteUrlFieldChange: EventEmitter<IHubSiteUrlInfo>;
  _intl: ComponentIntl;
  /**
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  _translationFunc: (key: any, values?: any, opts?: any) => string;
  /**
   * Contextual auth & portal information
   */
  private get _context();
  private get _orgUrlKey();
  private get _hubSiteHostname();
  get _schema(): IConfigurationSchema;
  get _uiSchema(): IUiSchema;
  get _values(): {
    subdomain: string;
    hubDomain: string;
  };
  get _urlPreview(): string;
  constructor();
  componentWillLoad(): Promise<void>;
  /**
   * Handles the internal change event from the configuration editor
   * @param event
   */
  handleInternalEditorChangeEvent(event: CustomEvent<IChangeEventDetail>): void;
  render(): any;
}
