import { EventEmitter } from '../../stencil-public-runtime';
import { HubEntity, IChangeEventDetail, IConfigurationSchema, IConfigurationValues, IUiSchema } from '@esri/hub-common';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisHubFollowCardEditor {
  element: HTMLArcgisHubFollowCardEditorElement;
  /**
   * Editor configuration values to be used in
   * the configuration editor
   */
  values: IConfigurationValues;
  _context: import("@esri/hub-common").IArcGISContext;
  _schema: IConfigurationSchema;
  _uiSchema: IUiSchema;
  showOutdatedItemNotice: boolean;
  showMissingFollowersGroupNotice: boolean;
  showNoGroupAccessNotice: boolean;
  _values: IConfigurationValues;
  entity: HubEntity;
  followersGroupId: string;
  intl: ComponentIntl;
  /**
   * Event that fires when any values change in
   * the editor
   */
  arcgisHubFollowCardEditorChange: EventEmitter<IChangeEventDetail>;
  constructor();
  componentWillLoad(): Promise<void>;
  _getEditorConfig(): Promise<void>;
  handleEditorChange(event: CustomEvent<IChangeEventDetail>): Promise<void>;
  /**
   * Check whether the item has a followers group
   * @param entityId
   * @param entityType
   */
  checkItemsFollowersGroup(entityId: any, entityType: any): Promise<void>;
  /**
   * Check whether the user has access to the item's followers group
   */
  checkGroupAccess(): Promise<void>;
  /**
   * Fetch for the entity, if the entity is inaccessible, set the entityId in _values
   * to [] so the configuration editor will reload and meet the HIDE_FOR_NO_ENTITY_ID
   * rule to hide the fields under the gallery picker
   */
  checkEntityAccess(entityId: any, entityType: any, context: any): Promise<void>;
  translationFunc(key: any, values?: any, opts?: any): string;
  renderOutdatedItemNotice(): any;
  renderMissingFollowersGroupNotice(): any;
  renderNoGroupAccessNotice(): any;
  render(): any;
}
