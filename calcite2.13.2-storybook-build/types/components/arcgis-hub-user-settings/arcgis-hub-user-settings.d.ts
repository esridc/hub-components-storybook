import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IConfigurationValues, IUserHubSettings } from '@esri/hub-common';
export declare class ArcgisHubUserSettings {
  element: HTMLArcgisHubUserSettingsElement;
  hubTelemetry: EventEmitter;
  userSettingsChange: EventEmitter;
  settings: IUserHubSettings;
  intl: ComponentIntl;
  values: {
    [key: string]: any;
  };
  constructor();
  private get context();
  get showUserWorkspaceButton(): boolean;
  handleEntityEditorChange(evt: CustomEvent<IConfigurationValues>): Promise<void>;
  componentWillLoad(): Promise<void>;
  translationFunc(key: any, values?: any, opts?: any): string;
  onAboutWorkspacesClick(): void;
  render(): any;
}
