import { EventEmitter, VNode } from '../../../stencil-public-runtime';
import { Workflow } from '../utils/utils';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IHelpStateProps } from '../../arcgis-hub-help-state/arcgis-hub-help-state';
import { IQuery } from '@esri/hub-common';
import { IGroupReciept, IHubGroupSharingResults } from '../../../utils/add-content/utils';
/**
 * @internal
 * This component is for internal use by the arcgis-hub-add-content-workflow component
 */
export declare class ArcgisHubAddContentResults {
  element: HTMLArcgisHubAddContentResultsElement;
  intl: ComponentIntl;
  workflow: Workflow;
  results: IHubGroupSharingResults;
  icon: string;
  helpStateClass: string;
  helpStateConfig: IHelpStateProps;
  hubTelemetry: EventEmitter<Record<string, any>>;
  componentWillLoad(): Promise<void>;
  handleGroupCardClick: () => void;
  handleResultsItemClick(): void;
  renderGallery: (query: IQuery, slotName?: string) => VNode;
  renderEntities: () => VNode;
  renderAccordionItem: (which: string, receipt: IGroupReciept) => VNode;
  renderReceipt: (receipt: IGroupReciept) => VNode;
  _renderAddExistingResults(): VNode;
  _renderCreateNewResults(): VNode;
  render(): any;
}
