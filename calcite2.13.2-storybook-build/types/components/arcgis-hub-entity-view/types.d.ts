import { HubCapability, HubEntityType, IHubCatalog, Permission } from "@esri/hub-common";
/**
 * Generic interface for a view definition
 */
export interface IViewDefinition {
  name: string;
  /**
   * The i18n label for the view
   */
  i18nLabel?: string;
  /**
   * Optional icon to display with the view
   */
  icon?: string;
  /**
   * The component to render for the view
   */
  component: string;
  /**
   * Props to pass to the -entity-{thing} component
   */
  props?: Record<string, any>;
  /**
   * Optional permission or boolean-based flags specifying
   * whether the view should be visible.
   */
  isVisible?: (boolean | Permission)[];
  contentCount?: number;
}
export interface IBrowseAllDefinition {
  /**
   * The capability
   */
  capability: HubCapability;
  /**
   * The i18n label for the view
   */
  i18nLabel: string;
  /**
   * Property on the entity that holds the capability
   */
  property: string;
  /**
   * The catalog from the entity, for the capability
   */
  catalog?: IHubCatalog;
}
export interface ICatalogViewDefinition extends IViewDefinition {
  /**
   * Catalog to display
   */
  catalog: IHubCatalog;
}
/**
 * Definition for a type-specific view
 */
export interface ITypeSpecificViewDefinition extends IViewDefinition {
  /** The entity type(s) that this view is specific to */
  entities: HubEntityType[];
}
export declare enum ViewTabs {
  Overview = "about",
  Metrics = "metrics",
  Content = "content",
  Members = "members",
  Initiatives = "initiatives",
  Projects = "projects"
}
