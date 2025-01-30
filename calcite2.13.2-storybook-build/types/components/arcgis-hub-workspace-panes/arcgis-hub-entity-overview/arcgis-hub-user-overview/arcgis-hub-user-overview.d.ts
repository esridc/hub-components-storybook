import { HubEntity, IQuery } from '@esri/hub-common';
import { ComponentIntl } from '../../../../utils/stencil-intl';
export declare class ArcgisHubEntityOverview {
  element: HTMLElement;
  entity: HubEntity;
  isMobile: boolean;
  intl: ComponentIntl;
  contentCount: number;
  groupCount: number;
  componentWillLoad(): Promise<void>;
  get entityTypes(): Array<string>;
  _context: import("@esri/hub-common").IArcGISContext;
  get userEditGroupIds(): string[];
  get recentHubEntityQuery(): IQuery;
  get allContentQuery(): IQuery;
  get recentContentQuery(): IQuery;
  get recentGroupsQuery(): IQuery;
  get galleryProps(): Record<string, any>;
  get groupsGalleryProps(): Record<string, any>;
  get addContentProps(): Record<string, any>;
  render(): any;
}
