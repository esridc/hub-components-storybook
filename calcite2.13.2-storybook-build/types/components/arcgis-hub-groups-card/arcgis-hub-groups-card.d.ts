import { VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from "../../utils/stencil-intl";
import { IHubCollection } from '@esri/hub-common';
import { CORNERS } from '../interfaces';
export declare class ArcgisHubGroupsCard {
  intl: ComponentIntl;
  element: HTMLElement;
  /**
   * Collection created from the groups and passed to the gallery
   */
  collection: IHubCollection;
  /**
   * Id's of groups to render
   */
  groups: string[];
  /**
   * If true then open in new tab, if false then open in the same tab
   */
  newTab: boolean;
  /**
   * Show/hide thumbnails
   */
  showThumbnail: boolean;
  /**
   * Card cardTitle passed in
   */
  cardTitle: string;
  /**
   * Title alignment in relation to the card.
   */
  titleAlign: 'left' | 'right' | 'center';
  /**
   * Groups displayed as a list or grid, defaults to grid.
   */
  layout: 'list' | 'grid';
  /**
   * Specifies whether corners should be round or square
   * refelected so we can target it with css
   */
  corners: CORNERS;
  showEmptyState: boolean;
  /**
   * Base url from which to generate urls
   */
  baseUrl: string;
  searchResponseHasResults: boolean;
  componentWillLoad(): Promise<void>;
  onGroupsChanged(): void;
  onResultsChange(event: CustomEvent): void;
  generateCollection(): void;
  renderCardTitle(): VNode;
  render(): VNode;
}
