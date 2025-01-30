/// <reference types="node" />
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { FileFormat, ICreateReplicaOptions, ILayerOptions, IGeometry, IServerDefinition, CreateReplicaStatus, ICreateReplicaStatusChangePayload } from '../../utils/download-features';
import { IItem } from '@esri/arcgis-rest-types';
import { ComponentIntl } from '../../utils/stencil-intl';
interface IButtonDisplayConfig {
  content: VNode | string;
  icon?: string;
}
/**
 * DEPRECATED. Use `arcgis-hub-download-list` instead. This component will be
 * removed once the new component is fully tested and ready for production.
 */
export declare class ArcgisDownloadFeaturesButton {
  element: HTMLElement;
  /**
   * The portal item representing the targeted feature service.
   * Used for determining the service's root url.
   */
  item: IItem;
  /**
   * Either a url to (or a definition of) the targeted feature service.
   * When a definition, it must include a `url` property.
   * This field takes precendence over the `item.url`
   */
  server: string | IServerDefinition;
  /**
   * Specifies which layers of the Feature Service should be included
   * in a download and optionally defines filters that will be applied
   * to each layer
   */
  layers: string | number[] | ILayerOptions[];
  /**
   * The format of the file to download
   */
  fileFormat: FileFormat;
  /**
   * Sets a geographic filter on which features should be included in
   * a download
   */
  filterGeometry: IGeometry;
  /**
   * Pass-through prop to the underlying calcite button.
   * Sets predefined styling classes
   */
  appearance: 'solid' | 'outline' | 'transparent';
  /**
   * Pass-through prop to the underlying calcite button.
   * Sets width of the button
   */
  width: 'auto' | 'full' | 'half';
  /**
   * Defines the amount of time (in milliseconds) that the button will display in a success or error state
   *
   * E.g., after the "successful download" state has been displayed for _resetInterval milliseconds,
   * the button will go back to the default state
   */
  _resetInterval: number;
  _resetTimeoutId: NodeJS.Timeout;
  loading: boolean;
  status: CreateReplicaStatus;
  totalFeatureCount: number;
  /**
   * The progress of the replica creation process, represented as a number between 0 and 1
   */
  replicaProgress: number;
  hubTelemetry: EventEmitter<any>;
  /**
   * @private
   *
   * This event is used in utility function `getDownloadUrlFromService()`
   * where it emits status and exported record count from create replica.
   * Consumers of this component should not listen to this event.
   *
  **/
  _createReplicaStatusChange: EventEmitter<ICreateReplicaStatusChangePayload>;
  /**
   * Emits when the feature service successfully makes the file and has it
   * ready for client download
   */
  arcgisDownloadSuccess: EventEmitter<{
    serviceUrl: string;
    fileFormat: string;
    downloadUrl: string;
  }>;
  /**
   * Emits when an error occurs in the file-making process
   */
  arcgisDownloadError: EventEmitter<{
    serviceUrl: string;
    fileFormat: string;
    error: any;
  }>;
  /**
   * Emits when the button is clicked and the file-making process begins
   */
  arcgisDownloadInitiated: EventEmitter<null>;
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  get hasSlottedContent(): boolean;
  get serviceUrl(): string;
  /**
   * Resets the button to its default state after a set interval
   */
  resetAfterInterval(): void;
  handleClick(): Promise<void>;
  handleCreateReplicaStatusChange(event: CustomEvent<ICreateReplicaStatusChangePayload>): void;
  get createReplicaOptions(): ICreateReplicaOptions;
  get loadingButtonContent(): VNode;
  get buttonDisplayConfig(): IButtonDisplayConfig;
  renderProgressBar(): VNode;
  render(): any;
}
export {};
