import { VNode } from '../../stencil-public-runtime';
import { CardLayout } from '../../utils/types/CardLayout';
import { HubEntity, IArcGISContext, IHubCardViewModel, IHubSearchResult, IQuery } from '@esri/hub-common';
import { HeadingLevel } from '@esri/calcite-components';
/**
 * Display a gallery of links to help docs, blog posts and other Hub related resources.
 * Resources are automatically limited to the standard Hub Resource group for
 * the user's environment (DEV/QA/PROD).
 * To further subset the resources to display, provide an array of tags.
 */
export declare class ArcgisHubResourceGallery {
  element: HTMLElement;
  /**
   * Header text for the gallery
   */
  headingText: string;
  /**
  * HTML tag to use for the header
  */
  headingLevel: HeadingLevel;
  /**
   * Tags to filter the resources by e.g. `["userworkspace", "hub doc"]`
   */
  tags: string[];
  /**
   * Maximum number of resources to display
   */
  limit: number;
  _context: IArcGISContext;
  /**
   * Flag to indicate if we have results to display
   * If not, we don't render the header
   */
  hasResults: boolean;
  get resourceQuery(): IQuery;
  /**
   * Callback to modify the model for the resource gallery
   * where we want to clear any action links and additional infos
   * so it's a very minimal rendering
   * @param model
   * @param _layout
   * @param _context
   * @param _result
   * @returns
   */
  resourceCallback: (model: IHubCardViewModel, _layout: CardLayout, _context: IArcGISContext, _result: IHubSearchResult | HubEntity) => IHubCardViewModel;
  renderHeader(): VNode;
  onResourceGalleryResultsChanged(event: CustomEvent<IHubSearchResult[]>): void;
  render(): any;
}
