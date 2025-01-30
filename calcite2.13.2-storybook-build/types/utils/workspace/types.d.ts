import { HubEntity, HubEntityType, Permission } from '@esri/hub-common';
export declare const WORKSPACE_PANES: readonly ["catalog", "catalog-content", "catalog-events", "collaborators", "content", "dashboard", "details", "discussion", "events", "followers", "groups", "initiatives", "members", "metrics-coming-soon", "metrics", "overview", "participation", "projects", "registrants", "settings"];
export declare type WorkspacePane = typeof WORKSPACE_PANES[number];
export declare enum PANE_ICONS {
  catalog = "data-magnifying-glass",
  catalogContent = "files",
  catalogEvents = "event",
  collaborators = "group",
  content = "files",
  dashboard = "dashboard",
  details = "edit-attributes",
  discussion = "speech-bubbles",
  events = "event",
  followers = "walking",
  group = "group",
  initiatives = "initiative",
  members = "group",
  metrics = "chart-gear",
  overview = "home",
  pages = "file-code",
  participation = "speech-bubbles",
  projects = "projects",
  registrants = "user-calendar",
  settings = "gear"
}
export declare type WorkspaceLinkDefinition = {
  entity: HubEntityType;
  pane: WorkspacePane;
  i18nLabel: string;
  icon: string;
  component?: string;
  permissions?: Permission[];
  order?: number;
  children?: WorkspaceLinkDefinition[];
};
export interface IWorkspaceLink {
  i18nKey: string;
  pane: WorkspacePane;
  icon: string;
  children?: IWorkspaceLink[];
  displayOnly?: boolean;
}
export interface IWorkspaceLinkClicked {
  clickEvent: MouseEvent | KeyboardEvent;
  pane?: WorkspacePane;
  href?: string;
}
export interface IWorkspaceEntityChange {
  isDirty: boolean;
  entity: Partial<HubEntity>;
}
export interface IWorkspaceAccess {
  canAccess: boolean;
  reason?: {
    message: string;
    i18nKey: string;
  };
}
