import { HubEntity, HubEntityType, IArcGISContext } from '@esri/hub-common';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IHubBreadcrumb } from '../../functional/breadcrumbs';
export interface IHubEntityBreadcrumb {
  identifier: string;
  type: HubEntityType;
  entity?: HubEntity;
}
export interface IHubBreadcrumbEntry extends IHubEntityBreadcrumb {
  title: string;
  label: string;
  icon?: string;
  url?: string;
}
export declare class ArcgisHubEntityBreadcrumbs {
  element: HTMLElement;
  private get _context();
  breadcrumbs: IHubEntityBreadcrumb[];
  path: "";
  /**
   * Breadcrumb objecys we pass to the Breadcrumb functional component
   */
  breadcrumbEntries: IHubBreadcrumb[];
  /** Instance of the ComponentIntl class used for i18n */
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  /**
   * When the component is about to render, construct the breadcrumbs
   */
  componentWillRender(): Promise<void>;
  /**
   * Given a path like `/projects/:identifier`, construct the breadcrumbs
   * @param path
   * @param context
   * @returns
   */
  buildBreadcrumbsFromPath(path: string, context: IArcGISContext): Promise<IHubBreadcrumb[]>;
  /**
   * Given an array of IHubBreadcrumb, construct the breadcrumb entries
   * @param crumbs
   * @param context
   * @returns
   */
  buildBreadcrumbsFromArray(crumbs: IHubEntityBreadcrumb[], context: IArcGISContext): Promise<IHubBreadcrumb[]>;
  /**
   * Iterate an array of IHubBreadcrumb and fetch the entity for each
   * if not already present
   * @param crumbs
   * @param context
   * @returns
   */
  fetchCrumbEntities(crumbs: IHubEntityBreadcrumb[], context: IArcGISContext): Promise<IHubEntityBreadcrumb[]>;
  /**
   * Convert a path like `/projects/:identifier` into an IHubBreadcrumb[]
   * which is then used to construct the breadcrumb entries
   * @param path
   * @returns
   */
  constructCrumbsFromPath(path: string): IHubEntityBreadcrumb[];
  getEntityPathFromTypeAndId(type: HubEntityType, id: string): string;
  /**
   * Construct the breadcrumb entries from an array of IHubBreadcrumb
   * These are the objects used to render the actual breadcrumbs
   * @param crumbs
   * @returns
   */
  constructBreadcrumbs(crumbs: IHubEntityBreadcrumb[]): IHubBreadcrumb[];
  renderBreadcrumbs(): any;
  render(): any;
}
