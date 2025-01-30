import { EventEmitter } from '../../stencil-public-runtime';
import { IChangeEventDetail, IConfigurationSchema, IConfigurationValues, IUiSchema } from '@esri/hub-common';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IPrivacyConfig } from '../../utils/privacy/types';
export declare class ArcgisPrivacyConfig {
  element: HTMLElement;
  /**
   * The privacy configuration
   * @type {IPrivacyConfig}
   * @memberof ArcgisPrivacyConfig
   */
  config: IPrivacyConfig;
  /**
   * Is this being rendered in the opendata-ui layout editor?
   * Note that this is a temporary prop that will be removed once we no longer need this component in the layout editor
   * @type {boolean}
   * @memberof ArcgisPrivacyConfig
   */
  isLayoutEditor: boolean;
  _config: IPrivacyConfig;
  _schema: IConfigurationSchema;
  _uiSchema: IUiSchema;
  intl: ComponentIntl;
  configChanged(newConfig: any): void;
  constructor();
  componentWillLoad(): Promise<void>;
  hubPrivacyPreferencesConfigChanged: EventEmitter<IConfigurationValues>;
  handleEditorChange(evt: CustomEvent<IChangeEventDetail>): void;
  translationFunc(key: any, values?: any, opts?: any): string;
  render(): any;
}
