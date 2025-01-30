/**
 * A custom Stencil component for rendering a Search Result or Hub Entity in a card.
 *
 * @remarks
 * This component displays information about a Search Result or Hub Entity, such as a dataset or initiative, in a card format.
 * It supports various customization options, such as clickable behavior, round or square corners, and different layouts.
 *
 * @example
 * ```tsx
 * <arcgis-hub-entity-card
 *   actionLinks={[{ label: 'View Details', url: 'https://example.com' }]}
 *   baseUrl="https://example.com"
 *   clickable={true}
 *   corners="round"
 *   imageType="thumbnail"
 *   layout="row"
 *   lazy={false}
 *   linkTarget="_blank"
 *   newTab={true}
 *   selectable={true}
 *   selected={false}
 *   shadow="none"
 *   showAdditionalInfo={true}
 *   showBadges={true}
 *   showOwner={true}
 *   showThumbnail={true}
 *   showType={true}
 *   titleTag="h3"
 *   callback={customCallback}
 *   searchResult={searchResult}
 *   entity={entity}
 * ></arcgis-hub-entity-card>
 * ```
 *
 * @public
 */
import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { CORNERS, DROP_SHADOWS, IMAGE_TYPES } from '../interfaces';
import { IHubSearchResult, ICardActionLink, HubEntity, IHubCardViewModel } from '@esri/hub-common';
import { CardModelTarget, CardViewModelCallback, IHubCardTitleLinkClickEvent } from '../../utils/cardModelConverters/types';
export declare class ArcgisHubEntityCard {
  element: HTMLArcgisHubEntityCardElement;
  /** actions to render in the card */
  actionLinks: ICardActionLink[];
  /** base url to work in conjunction with the linkTarget */
  baseUrl: string;
  /** indicates whether the entire card is a clickable target */
  clickable: boolean;
  /** indicates whether the card's corners are round or square */
  corners: CORNERS;
  /** indicates whether the card renders a thumbnail or icon */
  imageType: IMAGE_TYPES;
  /** the card's layout */
  layout: 'row' | 'card';
  /** indicates whether the card's thumbnail should lazy load */
  lazy: boolean;
  /** indicates where the card should redirect */
  linkTarget: CardModelTarget;
  /** indicates whether the target url should open in a new tab */
  newTab: boolean;
  /** indicates whether the card is selectable (renders a checkbox) */
  selectable: boolean;
  /** indicates whether the card is selected */
  selected: boolean;
  /** hub search result */
  searchResult: IHubSearchResult;
  /** full entity */
  entity: HubEntity;
  /** defines the heaviness of the card's drop shadow */
  shadow: DROP_SHADOWS;
  /** indicates whether additional metadata should be displayed */
  showAdditionalInfo: boolean;
  /** indicates whether all additional metadata should be displayed */
  showAllAdditionalInfo: boolean;
  /** indicates whether badges should be displayed */
  showBadges: boolean;
  /** indicates whether the source information should be displayed */
  showOwner: boolean;
  /** indicates whether the thumbnail should be displayed */
  showThumbnail: boolean;
  /** indicates whether the family name + icon should be displayed */
  showType: boolean;
  /** defines what tag (i.e. <h3>, etc) should wrap the title */
  titleTag: string;
  /** optional callback to customize the IHubCardViewModel before it is rendered */
  callback: CardViewModelCallback;
  primaryActionsToRender: 1 | 2 | 3;
  isLoading: boolean;
  /**
   * Emits when a user clicks the card title and the title is a link
   * Note that this is emitted by the underlying `arcgis-hub-card` component
   */
  arcgisHubCardTitleLinkClick: EventEmitter<IHubCardTitleLinkClickEvent>;
  intl: ComponentIntl;
  get _model(): IHubCardViewModel;
  private get context();
  componentWillLoad(): Promise<void>;
  render(): any;
}
