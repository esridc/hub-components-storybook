import { HubEntity, IArcGISContext, ICardActionLink, IHubCardViewModel, IHubSearchResult } from '@esri/hub-common';
import { CardLayout } from '../types/CardLayout';
import { ComponentIntl } from '../stencil-intl';
/** Defines an enum SortDirection */
export declare enum SortDirection {
  asc = "asc",
  desc = "desc"
}
export interface IHubCardTitleLinkClickEvent {
  model: IHubCardViewModel;
  event: MouseEvent;
}
export declare type CardModelTarget = 'self' | 'siteRelative' | 'workspaceRelative' | 'none' | 'event';
export interface IConvertToCardModelOpts {
  actionLinks?: ICardActionLink[];
  baseUrl?: string;
  /**
   * TODO: move transform logic to FE so we don't need to pass
   * locale down (follow https://devtopia.esri.com/dc/hub/issues/7255)
   */
  locale?: string;
  target?: CardModelTarget;
}
/**
 * Function signature for converting a HubEntity or IHubSearchResult to an IHubCardViewModel
 */
export declare type CardConverterFn = (model: HubEntity | IHubSearchResult, layout: CardLayout, context: IArcGISContext, intl: ComponentIntl, opts?: IConvertToCardModelOpts) => IHubCardViewModel;
/**
 * A callback function that takes allows a IHubCardViewmodel to be customized
 * before it is rendered in a gallery
 * @param model The current model to render
 * @param layout The layout to use
 * @param context The current context
 * @param raw The search response or entity that the model came from
 */
export declare type CardViewModelCallback = (model: IHubCardViewModel, layout: CardLayout, context: IArcGISContext, result: IHubSearchResult | HubEntity) => IHubCardViewModel;
