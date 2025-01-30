import { EventEmitter } from '../../../../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../../../../utils/stencil-intl';
import { IHubMapSettings, IChangeEventDetail, IConfigurationSchema, IHubCatalog, IUiSchema } from '@esri/hub-common';
import { IFacet } from '../../../../../../../utils/types';
export declare class MapSettings {
  element: HTMLElement;
  settings: IHubMapSettings;
  /** catalogs to populate the map picker */
  catalogs: IHubCatalog[];
  /** facets to filter the map picker */
  facets: IFacet[];
  /**
   * specifies which map settings to show in the editing experience
   * example: ["gallery"] <- only show the gallery settings
   * more settings will be added in the future
   * */
  visibleSettings: string[];
  /** specifies whether to show the map preview in the editing experience*/
  showPreview: boolean;
  /** event emitted when map settings are updated */
  arcgisCompositeMapSettingsFieldChange: EventEmitter<IHubMapSettings>;
  _intl: ComponentIntl;
  _schema: IConfigurationSchema;
  componentWillLoad(): Promise<void>;
  private get _context();
  get _uiSchema(): IUiSchema;
  /**
   * wrapper around the built-in intl.t function that
   * encapsulates the translation strings from this
   * component to pass into the configuration editor
   */
  translationFunc: (key: any, values?: any, opts?: any) => string;
  handleMapSettingsEditorChange: (evt: CustomEvent<IChangeEventDetail>) => void;
  /** Renders the map preview */
  renderMapPreview(): HTMLArcgisHubMapElement;
  render(): any;
}
