import { HubEntity } from '@esri/hub-common';
import { ComponentIntl } from '../../../utils/stencil-intl';
/**
 * The following is the DEFAULT entity overview pane component
 *
 * Note: having a single overview pane component (arcgis-hub-entity-overview)
 * is the end goal; however, it is not the most pragmatic first-pass
 * approach since there will be variation in what we render for different
 * entity types. A single pane component will require some sort of "Layout Player"
 * component that dynamically renders a layout given a JSON configuration.
 * This is still only conceptual and likely a ways off from being implemented.
 *
 * In the meantime, however, we will support workspaces rendering type-specific
 * overview pane components (e.g. arcgis-hub-project-overview, etc.) comprised
 * of reusable sub-components. In order to scaffold this for your entity type:
 *
 * 1. create a type-specific overview pane component (arcgis-hub-<type>-overview)
 * within this directory
 * 2. configure your entity's overview link definition to reference this component
 */
export declare class ArcgisHubEntityOverview {
  element: HTMLElement;
  entity: HubEntity;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  renderMetadata(): HTMLElement;
  render(): any;
}
