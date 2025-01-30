import { IArcGISContext, IConvertToCardModelOpts, IHubCardViewModel, IHubSearchResult } from "@esri/hub-common";
import { CardViewModelCallback } from "../../../utils/cardModelConverters/types";
import { CardLayout } from "../../../utils/types/CardLayout";
import { ComponentIntl } from "../../../utils/stencil-intl";
export declare const getViewModel: (model: IHubSearchResult, layout: CardLayout, opts: IConvertToCardModelOpts, callback: CardViewModelCallback, context: IArcGISContext, intl: ComponentIntl) => IHubCardViewModel;
