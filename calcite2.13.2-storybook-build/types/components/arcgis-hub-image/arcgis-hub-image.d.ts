import { VNode } from '../../stencil-public-runtime';
import { CORNERS } from '../interfaces';
export declare class ArcgisHubImage {
  /**
   * Host element
   */
  element: HTMLElement;
  /**
   * The source of the image. Will be rendered first, and if it fails, will
   * revert to fallback if provided
   */
  src: string;
  /**
   * The alternate text for the image.
   * Used for accessibility reasons
   */
  alt: string;
  /**
   * The fallback source for the image.
   * Only used if the src source doesn't render properly.
   */
  fallback: string;
  /**
   * If true, the image will support lazy loading
   * and will only load the src when in the viewport
   */
  lazy: boolean;
  /**
   * The style of the image's corners
   */
  corners: CORNERS;
  /**
   * Does the original image source have an error when loading
   */
  hasError: boolean;
  /**
   * Is the component on screen currently; used with lazy loading
   */
  inViewport: boolean;
  /**
   * Ref to the image element in the component
   */
  imageEl: HTMLImageElement;
  /**
   * Get the image url to render with, either fallback or original src
   */
  get _imageUrl(): string;
  constructor();
  componentWillLoad(): void;
  disconnectedCallback(): void;
  observe(): void;
  unobserve(): void;
  srcUpdated(): void;
  handleIntersection(): void;
  /**
   * @param el - HTMLImageElement in the component
   * Creates a ref to the image to use with error
   */
  setImageEl(el: HTMLImageElement): void;
  /**
   * On render, check to see if image had error
   * If there was an error, then set state and remove listener.
   * Else add listener for errors
   */
  componentDidRender(): void;
  /**
   * Renders the image
   * @returns Image tag
   */
  renderImage(): VNode;
  render(): any;
}
