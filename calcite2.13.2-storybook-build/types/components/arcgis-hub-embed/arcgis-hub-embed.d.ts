import { IArcGISContext } from '@esri/hub-common';
import { VNode } from '../../stencil-public-runtime';
export declare class ArcgisHubEmbed {
  /**
   * The source content for the iframe w/o authentication
   */
  src: string;
  /**
   * Title for the iframe. This is necessary for a11y purposes. Include a description of what the iframe is.
   */
  iframeTitle: string;
  /**
   * The height of the iframe in pixels.
   */
  height?: number;
  /**
   * Property to determine if the iframe should be scrollable
   */
  isScrollable: boolean;
  /**
   * Property for allow attribute on the iframe. Determines if the iframe can autoplay media that is requested.
   */
  autoplay: boolean;
  /**
   * Property for allow attribute on the iframe. Determines if the iframe can use video input devices.
   */
  camera: boolean;
  /**
   * Property for allow attribute on the iframe. Determines if the iframe can read from the clipboard.
   */
  clipboardRead: boolean;
  /**
   * Property for allow attribute on the iframe. Determines if the iframe can write to the clipboard.
   */
  clipboardWrite: boolean;
  /**
   * Property for allow attribute on the iframe. Determines if the iframe can use getDisplayMedia() method to capture screen contents.
   */
  displayCapture: boolean;
  /**
   * Property for allow attribute on the iframe. Determines if the iframe can request to be fullscreen.
   */
  fullscreen: boolean;
  /**
   * Property for allow attribute on the iframe. Determines if the iframe can use the geolocation interface to get information like current position.
   */
  geolocation: boolean;
  /**
   * Property for allow attribute on the iframe. Determines if the iframe can request to use audio input devices.
   */
  microphone: boolean;
  /**
   * Ref to the iframe element in the component
   */
  iframeEl: HTMLIFrameElement;
  get _context(): IArcGISContext;
  /**
   * Builds a custom allow string for the iframe
   */
  get _allow(): string;
  get _iframeSrc(): string;
  get embeddedAuthSrc(): string;
  renderIframe(): VNode;
  render(): any;
}
