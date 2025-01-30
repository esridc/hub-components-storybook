import { EventEmitter } from '../../../stencil-public-runtime';
import { IArcGISContext, HubEntity, IHubEvent } from '@esri/hub-common';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { IWorkspaceEntityChange } from '../../../utils/workspace';
export declare class ArcgisHubEntityEventSettings {
  intl: ComponentIntl;
  element: HTMLElement;
  /**
   * Workspace Entity
   */
  entity: IHubEvent;
  actionPending: boolean;
  /**
   * Emitted when the entity is deleted
   */
  arcgisHubWorkspacePaneEntityDelete: EventEmitter<HubEntity>;
  /**
   * Emitted when the entity's properties change
   */
  arcgisHubWorkspaceEntityChange: EventEmitter<IWorkspaceEntityChange>;
  /**
   * Emits hub telemetry
   */
  hubTelemetry: EventEmitter<Record<string, any>>;
  componentWillLoad(): Promise<void>;
  get _context(): IArcGISContext;
  handleEntityDelete(event: CustomEvent): void;
  handleCancelButtonClicked: () => Promise<void>;
  render(): any;
}
