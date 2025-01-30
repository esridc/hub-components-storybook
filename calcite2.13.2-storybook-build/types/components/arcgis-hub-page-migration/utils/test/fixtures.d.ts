import { IArcGISContext, IHubCatalog } from "@esri/hub-common";
export declare const context: IArcGISContext;
export declare const catalog: IHubCatalog;
export declare const page: {
  isDiscussable: boolean;
  access: string;
  created: number;
  culture: string;
  extent: any[];
  id: string;
  itemControl: string;
  modified: number;
  owner: string;
  tags: string[];
  categories: any[];
  type: string;
  typeKeywords: string[];
  thumbnail: string;
  view: {
    contacts: any[];
    featuredContentIds: any[];
    showMap: boolean;
  };
  slug: string;
  schemaVersion: number;
  orgUrlKey: string;
  name: string;
  layout: {
    sections: any[];
  };
  canEdit: boolean;
  canDelete: boolean;
  canRecycle: boolean;
  protected: boolean;
  createdDate: string;
  createdDateSource: string;
  updatedDate: string;
  updatedDateSource: string;
  location: {
    type: string;
  };
  thumbnailUrl: string;
  links: {
    self: string;
    siteRelative: string;
    siteRelativeEntityType: string;
    workspaceRelative: string;
    thumbnail: string;
    layoutRelative: string;
  };
  features: {};
};
export declare const site: {
  access: string;
  created: number;
  culture: string;
  description: string;
  id: string;
  itemControl: string;
  modified: number;
  owner: string;
  tags: string[];
  categories: any[];
  type: string;
  typeKeywords: string[];
  thumbnail: string;
  url: string;
  orgId: string;
  slug: string;
  summary: string;
  schemaVersion: number;
  orgUrlKey: string;
  name: string;
  feeds: {
    disabled: boolean;
  };
  permissions: {
    permission: string;
    collaborationType: string;
    collaborationId: string;
  }[];
  pages: {
    id: string;
    title: string;
    slug: string;
  }[];
  subdomain: string;
  defaultHostname: string;
  customHostname: string;
  clientId: string;
  catalog: IHubCatalog;
  features: {
    "hub:site:events": boolean;
    "hub:site:content": boolean;
    "hub:site:discussions": boolean;
    "hub:site:feature:follow": boolean;
    "hub:site:feature:discussions": boolean;
  };
  canEdit: boolean;
  canDelete: boolean;
  canRecycle: boolean;
  protected: boolean;
  createdDate: string;
  createdDateSource: string;
  updatedDate: string;
  updatedDateSource: string;
  thumbnailUrl: string;
  links: {
    self: string;
    siteRelative: string;
    siteRelativeEntityType: string;
    workspaceRelative: string;
    thumbnail: string;
    layoutRelative: string;
  };
};
