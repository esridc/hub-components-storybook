import { IHubCollection } from '@esri/hub-common';
import { CORNERS, DROP_SHADOWS, IShareableCard } from "../interfaces";
import { ComponentIntl } from "../../utils/stencil-intl";
import { MODE } from './interfaces';
import { IWithContext } from '../../utils/state';
export declare class ArcgisHubGalleryCard implements IShareableCard, IWithContext {
  element: HTMLElement;
  /**
   * Default to the global context
   */
  _context: import("@esri/hub-common").IArcGISContext;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * access level by which to filter items
   */
  access: string | string[];
  /**
   * catolog item ids for filtering items
   */
  catalogs: string | string[];
  /**
   * categories by which to filter items
   */
  categories: string | string[];
  /**
   * groups by which to filter items
   */
  groups: string | string[];
  /**
   * item ids to show in the gallery
   * supersedes all other filters
   */
  ids: string | string[];
  /**
   * Maximum number of items to show in the gallery
   */
  limit: number;
  /**
   * orgid by which to filter items
   */
  orgid: string;
  /**
   * Field by which to sort
   */
  sort: string;
  /**
   * tags by which to filter items
   */
  tags: string | string[];
  /**
   * types by which to filter items
   */
  types: string | string[];
  mode: MODE;
  /**
   * Indicates whether links to items will open in new tab
   */
  newTab: boolean;
  /**
   * The tag to use for the title
   * Intended to allow specifying h1 - h6 but can be any tag
   */
  cardTitleTag: string;
  /**
   * Specifies whether corners should be round or square
   * refelected so we can target it with css
   */
  corners: CORNERS;
  imageType: string;
  /**
   * Indicates if the thumbnail on the cards should be lazily loaded.
   * Will lazy load by default
   */
  lazy: boolean;
  showEmptyState: boolean;
  shadow: DROP_SHADOWS;
  showLinkButton: boolean;
  linkButtonText: string;
  linkButtonStyle: string;
  linkButtonBackgroundColor: string;
  linkButtonBackgroundHoverColor: string;
  linkButtonTextColor: string;
  /**
   * Whether the card should render a share button
   */
  shareable: boolean;
  shareableByValue: boolean;
  shareableByReference: boolean;
  shareableOnHover: boolean;
  /**
   * Base url from which to generate urls
   */
  baseUrl: string;
  private get _limit();
  private get _linkButtonStyle();
  private get _linkButtonText();
  private get _imageType();
  private get _isManualMode();
  catalogData: any;
  hasResults: boolean;
  intl: ComponentIntl;
  private setButtonStyles;
  onResultsChange(event: CustomEvent): void;
  componentWillLoad(): Promise<void>;
  private _fetchCatalogData;
  private _getArrayProps;
  private _getArrayProp;
  getState(): Promise<any>;
  private get typeFilters();
  private get scope();
  private get sortDirection();
  private _oldCollection;
  get collection(): IHubCollection;
  private get shouldQuery();
  private _renderGallery;
  render(): any;
}
