import { IHubInitiative, IHubMapSettings, IQuery } from '@esri/hub-common';
import { ComponentIntl } from '../../../../utils/stencil-intl';
export declare class ArcgisHubInitiativeHero {
  element: HTMLElement;
  /** ArcGIS Hub initiative entity */
  entity: IHubInitiative;
  /** query to fetch all of the initiative's associated projects */
  _associatedProjectsQuery: IQuery;
  /** whether or not the associated projects have a location set */
  _associatedProjectsHaveLocation: boolean;
  intl: ComponentIntl;
  private get _context();
  /** query for the initiative itself */
  get _initiativeQuery(): IQuery;
  /** initiative view featured image url */
  get featuredImageUrl(): string;
  get mapSettings(): IHubMapSettings;
  componentWillLoad(): Promise<void>;
  init(): Promise<void>;
  get mapGalleryQuery(): IQuery;
  /** Renders the map within the hero if the map should be rendered */
  renderMap(): HTMLArcgisHubMapElement;
  /** renders the initiative's featured image */
  renderFeaturedImage(): HTMLArcgisHubImageElement;
  renderHero(): HTMLElement;
  render(): HTMLElement;
}
