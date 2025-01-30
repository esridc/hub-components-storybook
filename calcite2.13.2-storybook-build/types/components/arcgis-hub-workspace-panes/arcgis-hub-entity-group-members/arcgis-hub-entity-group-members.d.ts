import { HubEntity } from '@esri/hub-common';
import { ComponentIntl } from '../../../utils/stencil-intl';
export declare class ArcgisHubEntityGroupMembers {
  element: HTMLElement;
  entity: HubEntity;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  /**
   * Loads translations
   */
  loadTranslations(): Promise<void>;
  render(): any;
}
