import { VNode } from '../../../stencil-public-runtime';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IHelpStateProps } from '../../arcgis-hub-help-state/arcgis-hub-help-state';
import { IQuery } from '@esri/hub-common';
import { IHubGroupSharingResults } from '../../../utils/add-content/utils';
/**
 * @internal
 * This component is for internal use by the arcgis-hub-page-migration-workflow component
 */
export declare class ArcgisHubPageMigrationResults {
  element: HTMLArcgisHubPageMigrationResultsElement;
  intl: ComponentIntl;
  results: IHubGroupSharingResults;
  icon: string;
  helpStateConfig: IHelpStateProps;
  componentWillLoad(): Promise<void>;
  renderGallery: (query: IQuery) => VNode;
  renderGroups: (groupIds: string[]) => VNode;
  _renderResults(which: string): VNode;
  render(): any;
}
