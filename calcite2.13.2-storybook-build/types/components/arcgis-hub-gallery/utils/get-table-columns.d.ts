import { EntityType, IArcGISContext, IHubCardViewModel, IHubSearchResult } from "@esri/hub-common";
import { ComponentIntl } from "../../../utils/stencil-intl";
import { ITableColumn } from "../../functional/interfaces";
import { VNode } from "../../../stencil-public-runtime";
export interface IGalleryTableRowModel {
  searchResult: IHubSearchResult;
  viewModel: IHubCardViewModel;
}
export interface IGalleryTableColumn extends ITableColumn {
  formatter?: (val: any, model: IGalleryTableRowModel, key: string, intl: ComponentIntl) => string | VNode;
}
export interface IGalleryColumnsOptions {
  newTab?: boolean;
  showThumbnail?: boolean;
  showRowActions?: boolean;
}
export declare type GalleryTableColumnName = 'thumbnail' | 'title' | 'source' | 'owner' | 'type' | 'access' | 'summary' | 'managers' | 'sharedUpdate' | 'created' | 'updated' | 'start' | 'end' | 'username' | 'actions';
export declare const getTableColumns: (entityType: EntityType, opts: IGalleryColumnsOptions, context: IArcGISContext, columns?: (IGalleryTableColumn | GalleryTableColumnName)[]) => IGalleryTableColumn[];
