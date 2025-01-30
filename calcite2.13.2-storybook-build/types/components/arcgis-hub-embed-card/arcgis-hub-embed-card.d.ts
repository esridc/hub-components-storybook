/// <reference types="arcgis-js-api" />
import { IHubEmbedMap, IArcGISContext, IHubEmbedApp, IHubEmbedExternal, IHubEmbed, HubEmbed, IHubEmbedSurvey } from "@esri/hub-common";
import { EventEmitter } from "../../stencil-public-runtime";
import { IItem } from '@esri/arcgis-rest-portal';
import { DeviceViewport } from "../arcgis-configuration-editor/components/arcgis-configuration-editor-field/fields/composite/embed/resources";
import { IShareableCard } from "../interfaces";
/**
 * This component renders an embed component based on the
 * kind of embed, e.g. app, map, etc.
 */
export declare class ArcgisHubEmbedCard implements IShareableCard {
  /** Host element */
  element: HTMLElement;
  /** The full embed config */
  embed: IHubEmbed;
  /** Whether the card should render a share button */
  shareable: boolean;
  /** Whether the card should be shareable by copying a snippet of code with props set "by value" */
  shareableByValue: boolean;
  /** Whether the card should be shareable by copying a snippet of code with props set "by reference" */
  shareableByReference: boolean;
  /** Whether the share ui should be hidden by default and revealed on hover */
  shareableOnHover: boolean;
  /** Is the component on screen currently; used with lazy loading */
  _isInViewport: boolean;
  /** Reference to the Esri map view when available */
  _mapView: __esri.MapView;
  /** current device viewport - updated via the resize observer */
  _viewport: DeviceViewport;
  _iframeSrc: string;
  hubTelemetry: EventEmitter<any>;
  handleMapViewReady(e: CustomEvent<{
    view: __esri.MapView;
  }>): Promise<void>;
  handleViewportChange(): Promise<void>;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  /** contextual portal and auth information */
  get _context(): IArcGISContext;
  /**
   * different embeds can be configured for different viewport
   * breakpoints (e.g. mobile, tablet, desktop). Breakpoints
   * cascade up meaning that if a tablet/desktop embed is not
   * configured, the mobile embed will be used. This getter
   * returns the embed configuration to use based on the
   * current viewport
   */
  get _embedConfigForViewport(): HubEmbed;
  /**
   * add intersection observer to embed element - we do this
   * to lazy load the embed when it is within the viewport
   */
  observeIntersection(): void;
  /**
   * remove intersection observer from element - we do this
   * once the element is within the viewport or if the element
   * is removed from the DOM
   */
  unobserveIntersection(): void;
  /**
   * add resize observer to embed element - we do this to
   * re-render the embed when the viewport changes
   */
  observeResize(): void;
  /**
   * remove resize observer from element - we do this when
   * the element is removed from the DOM
   */
  unobserveResize(): void;
  handleIntersection(): void;
  /**
   * handle screen reflow - different embeds can be configured
   * for different viewport breakpoints (e.g. mobile, tablet,
   * desktop), so we keep track of the current viewport size
   * and render the appropriate embed
   */
  handleResize(): void;
  /**
  * Builds the embeded item's src for the iframe
  * @param item item to build the src for
  * @param context
  */
  buildIframeSrc(item: IItem, context: IArcGISContext): string;
  /** Render embedded map */
  renderMapEmbed(config: IHubEmbedMap): HTMLArcgisHubMapElement;
  /** Render embedded app */
  renderAppEmbed(config: IHubEmbedApp): HTMLArcgisHubEmbedElement;
  /** Render embedded feedback */
  renderFeedbackEmbed(config: IHubEmbedSurvey): HTMLArcgisHubEmbedElement;
  /** Render an iframe embed */
  renderExternalEmbed(config: IHubEmbedExternal): HTMLArcgisHubEmbedElement;
  /** Render embed based on the kind */
  renderEmbed(config: HubEmbed): HTMLElement;
  render(): any;
}
