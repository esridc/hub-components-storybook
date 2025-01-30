import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisHubImageUrl {
  intl: ComponentIntl;
  element: HTMLArcgisHubImageUrlElement;
  imgSrc: string;
  imgHeight: number;
  imgWidth: number;
  isValid: boolean;
  isValidated: boolean;
  isValidating: boolean;
  arcgisImageUrlSave: EventEmitter<string>;
  componentWillLoad(): Promise<void>;
  handleCalciteInputInputOrChange: (evt: CustomEvent<void>) => void;
  handleImgSrcUpdated(imgSrc: string, prevImgSrc: string): void;
  _handleImgSrcUpdated(imgSrc: string, prevImgSrc: string): void;
  validate(imgSrc: string): Promise<void>;
  verifyImageExists(imgSrc: string): Promise<boolean>;
  get isInvalidUrl(): boolean;
  get isValidUrl(): boolean;
  render(): any;
}
