import { EventEmitter } from "../../../stencil-public-runtime";
import { ImagePosition } from "../types";
/** @internal **/
export declare class ArcgisHubImageUploadEditStep {
  el: HTMLArcgisHubImageUploadEditStepElement;
  aspectRatio: number;
  previewSrc: string;
  loadingImage: boolean;
  editingExisting: boolean;
  zoomToFit: boolean;
  height: number;
  imageProperties: {
    scale: number;
    top: number;
    left: number;
    origin: {
      x: string;
      y: string;
    };
  };
  dragging: boolean;
  previousPosition: ImagePosition;
  previewStyle: any;
  zoomValue: string;
  initiallySettingZoom: boolean;
  firstImagePropertiesChange: boolean;
  isLoading: boolean;
  arcgisImageUploadEditStepImageChanged: EventEmitter;
  thumbContainerStyle: any;
  translucentContainerStyle: any;
  transparentContainerStyle: any;
  imageEl: HTMLImageElement;
  imageContainerEl: HTMLDivElement;
  private intl;
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  getImageExtent(): any;
  getDrawDimensions(): any;
  getDrawParameters(): Promise<any>;
  handleImagePropertiesChange(): void;
  handleWheel: (event: any) => void;
  handleDragStart: () => void;
  handleDrag: (event: any) => void;
  handleDragEnd: () => void;
  handleImageLoaded: () => void;
  handleZoomInput: (event: any) => void;
  handleImageKeydown: (event: KeyboardEvent) => void;
  getImageContainerEl(el: HTMLDivElement): void;
  getImageEl(el: HTMLImageElement): void;
  render(): any;
}
