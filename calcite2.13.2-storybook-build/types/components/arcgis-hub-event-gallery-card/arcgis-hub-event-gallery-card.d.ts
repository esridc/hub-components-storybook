import { VNode } from '../../stencil-public-runtime';
import { CurrentEventGalleryCardSchema, EventGalleryCardSchema } from '../../utils/event-gallery-card';
import { IPredicate, IQuery } from '@esri/hub-common';
import { LayoutOptions } from '../../utils/types/ILayoutButtonOptions';
import { IGalleryMapSettings } from '../arcgis-hub-gallery/utils/location';
/**
 * A layout card component to render a gallery of events. This component supports dynamically populating the gallery with events that possess a reference to one or more selected entities in dynamic mode, else specifically selected events in manual mode.
 */
export declare class ArcgisHubEventGalleryCard {
  /**
   * A date range object representing the unix epoch
   */
  unixEpochPredicate: IPredicate;
  /**
   * Host element reference
   */
  element: HTMLArcgisHubFacetListElement;
  /**
   * An EventGalleryCardSchema object representing the card configuration values
   */
  cardConfig: EventGalleryCardSchema;
  /**
   * True when the card is being rendered in a mobile screen context
   */
  isMobile: boolean;
  /**
   * Applies migrations to the cardConfig to make sure we're working with the latest supported
   * schema structure
   */
  get _cardConfig(): CurrentEventGalleryCardSchema;
  /**
   * Builds the query predicate value for dynamic mode
   */
  get dynamicModePredicate(): IPredicate;
  /**
   * Builds the query predicate value for manual mode
   */
  get manualModePredicate(): IPredicate;
  /**
   * Builds the query property value used by the gallery to populate event results
   */
  get query(): IQuery;
  /**
   * Computes the limit property value used by the gallery to limit the results
   */
  get limit(): number;
  /**
   * Computes the openIn property value used by the gallery to control whether card title links open in the same or a new tab
   */
  get newTab(): boolean;
  /**
   * Computes the gallery layout options
   */
  get layoutOptions(): LayoutOptions[];
  /**
   * Computes the gallery map settings
   */
  get galleryMapSettings(): IGalleryMapSettings;
  /**
   * Primary render method
   */
  render(): VNode;
}
