import { E2EPage, NewE2EPageOptions } from "@stencil/core/testing/puppeteer/puppeteer-declarations";
export declare enum Environment {
  devext = "devext",
  qaext = "qaext",
  prod = "prod"
}
export declare enum Organization {
  hubBasicPublic = "hubBasicPublic",
  hubPremiumPublic = "hubPremiumPublic",
  hubBasicPrivate = "hubBasicPrivate",
  hubPremiumPrivate = "hubPremiumPrivate",
  hubBasicAlpha = "hubBasicAlpha",
  hubPremiumAlpha = "hubPremiumAlpha"
}
export declare enum User {
  admin = "admin",
  hubAdmin = "hubAdmin",
  publisher = "publisher",
  communityMember = "communityMember"
}
export interface IE2EUserInfo {
  username: string;
  password: string;
  resources?: IE2EUserResources;
}
export interface IE2EUserResources {
  gallery?: {
    itemGroup: string;
  };
}
export interface IE2EUsersContext {
  [User.admin]: IE2EUserInfo;
  [User.hubAdmin]?: IE2EUserInfo;
  [User.publisher]?: IE2EUserInfo;
  [User.communityMember]?: IE2EUserInfo;
}
interface IE2EOrganizationContext {
  subdomain: string;
  users: IE2EUsersContext;
}
export interface IE2EEnvironmentContext {
  portalDomain: string;
  agoBaseDomain: string;
  organizations: {
    [Organization.hubBasicPublic]?: IE2EOrganizationContext;
    [Organization.hubPremiumPublic]?: IE2EOrganizationContext;
    [Organization.hubBasicPrivate]?: IE2EOrganizationContext;
    [Organization.hubPremiumPrivate]?: IE2EOrganizationContext;
    [Organization.hubBasicAlpha]?: IE2EOrganizationContext;
    [Organization.hubPremiumAlpha]?: IE2EOrganizationContext;
  };
}
export interface HubComponentPage {
  page: E2EPage;
  root: string;
  initialize(): Promise<void>;
}
export declare type HubComponentPageConstructor<T extends HubComponentPage> = new (page: E2EPage, options?: {
  parent?: HubComponentPage;
  shadow?: boolean;
  [key: string]: any;
}) => T;
export interface NewHubE2EPageOptions extends NewE2EPageOptions {
  selectors?: string[];
  organization?: Organization;
  user?: User;
}
export {};
