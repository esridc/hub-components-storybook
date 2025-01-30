import { VNode } from '../../stencil-public-runtime';
import { FileFormat, IGeometry, ILayerOptions, IServerDefinition } from '../../utils/download-features';
import { ComponentIntl } from "../../../src/utils/stencil-intl";
import { IItem } from '@esri/arcgis-rest-types';
/**
 * DEPRECATED. Use `arcgis-hub-download-list` instead. This component will be removed
 * once the new component is fully tested and ready for production.
 */
export declare class ArcgisDownloadList {
  element: HTMLElement;
  /**
   * The portal item representing the targeted feature service.
   *
   * Used for telemetry and for determining the service definition.
   *
   * When passed in, the service definition will be dynamically
   * fetched from the root level of `item.url`'s service.
   */
  item: IItem;
  /**
   * Either a url to (or a definition of) the targeted feature service.
   * If a url is passed, the definition will be dynamically fetched.
   * When a definition is passed, it must include a `url` property.
   *
   * This field takes precendence over the `item.url`
   */
  server: string | IServerDefinition;
  serverDefinition: IServerDefinition;
  /**
   * Specifies which layers of the Feature Service should be included
   * in a download and optionally defines filters that will be applied
   * to each layer
   */
  layers: string | number[] | ILayerOptions[];
  /**
   * Sets a geographic filter on which features should be included in
   * a download
   */
  filterGeometry: IGeometry;
  /**
   * Sets the layout format. As a default, the list will render with
   * the `cards` format
   */
  layout: 'cards' | 'links' | 'dropdown';
  intl: ComponentIntl;
  handleDownloadSuccess(event: CustomEvent<any>): void;
  componentWillLoad(): Promise<void>;
  onItemUpdate(): Promise<void>;
  onServerUpdate(): Promise<void>;
  loadServer(): Promise<void>;
  get availableFormats(): FileFormat[];
  renderCards(): VNode[];
  renderLinks(): VNode[];
  renderDropdown(): VNode[];
  render(): any;
}
