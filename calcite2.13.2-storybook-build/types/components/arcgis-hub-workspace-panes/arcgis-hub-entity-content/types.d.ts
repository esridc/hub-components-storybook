import { HubEntity, IFeedsConfiguration, IWithCatalog } from "@esri/hub-common";
export declare type HubEntityWithCatalog = HubEntity & IWithCatalog;
export declare type HubEntityWithFeeds = HubEntityWithCatalog & {
  feeds: IFeedsConfiguration;
};
export declare enum ContentPaneTabs {
  CATALOG = "Catalog",
  CATALOG_CONFIG = "Catalog Configuration",
  COLLECTIONS = "Collections",
  FEEDS = "Feeds Configuration"
}
