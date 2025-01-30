/// <reference types="arcgis-js-api" />
import { VNode } from '../../stencil-public-runtime';
import { IDownloadFormat, IDynamicDownloadFormat, IHubEditableContent, IStaticDownloadFormat } from '@esri/hub-common';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisHubDownloadList {
  element: HTMLArcgisHubDownloadListElement;
  /**
   * The entity to download data from
   */
  entity: IHubEditableContent;
  /**
   * List of layer ids that should be included in the download.
   * Must be provided for Feature Service entities.
   */
  layerIds: number[];
  /**
   * Geometry to filter the download by.
   */
  geometry: __esri.Geometry;
  /**
   * Where clause to filter the download by.
   */
  where: string;
  /**
   * List of download formats available for the entity. This can include a mix
   * of static formats (such as additional resource links) and dynamic formats
   * (such as CSV, Shapefile, etc. that are generated on the fly)
   */
  downloadFormats: IDownloadFormat[];
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  /**
   * Update the list of download formats when the entity or layers change.
   *
   * NOTE: The only reason this operation is async is because anonymous downloads
   * for enterprise requires a complex flow that dynamically fetches exported items
   * from the Portal API using type keywords as discriminator. This is also the only
   * reason we have to re-fetch the download formats when the layers change.
   *
   * We'll be able to remove the "async" once createReplica is stable in enterprise.
   * and we no longer need to use this workaround.
   */
  updateDownloadFormats(): void;
  renderDownloadFormat(downloadFormat: IDownloadFormat): VNode;
  renderStaticDownloadFormat(downloadFormat: IStaticDownloadFormat): VNode;
  renderDynamicDownloadFormat(downloadFormat: IDynamicDownloadFormat): VNode;
  render(): any;
}
