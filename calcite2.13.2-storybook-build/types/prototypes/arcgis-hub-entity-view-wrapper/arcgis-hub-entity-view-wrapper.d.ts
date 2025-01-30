import { HubEntity, HubEntityType } from '@esri/hub-common';
import { EventEmitter } from '../../stencil-public-runtime';
import { IHubEntityBreadcrumb } from '../../components/arcgis-hub-entity-view/arcgis-hub-entity-breadcrumbs/arcgis-hub-entity-breadcrumbs';
export declare class ArcgisHubEntityViewWrapper {
  entity: HubEntity;
  identifier: string;
  type: HubEntityType;
  private get _context();
  view: "view" | "workspace";
  mode: "default" | "inline";
  breadcrumbs: IHubEntityBreadcrumb[];
  path: string;
  loading: boolean;
  arcgisHubEntityViewWrapperViewChanged: EventEmitter<string>;
  onIdentifierChange(): Promise<void>;
  private loadEntity;
  componentWillLoad(): void;
  renderLoading(): any;
  onEditClick(): void;
  onViewClick(): void;
  renderContent(): any;
  renderWorkspace(): any;
  renderView(): any;
  render(): any;
}
