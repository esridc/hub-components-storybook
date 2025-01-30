import { IConfigurationSchema, IConfigurationValues, IUiSchema } from "@esri/hub-common";
import { EventEmitter } from "../../stencil-public-runtime";
import { ComponentIntl } from "../../utils/stencil-intl";
declare enum ACCESS_LEVEL {
  PUBLIC = "public",
  ORG = "org",
  PRIVATE = "private"
}
export declare class ArcgisHubAccessLevelControls {
  element: HTMLElement;
  intl: ComponentIntl;
  /**
   * Access Level that the item will be shared to. (public, org, or private)
   */
  accessLevel: ACCESS_LEVEL;
  /**
   * Org name for the org string
   */
  orgName: string;
  /**
   * What type of item is having its access level set
   */
  itemType: string;
  /**
   * Event emits the access level when it is changed.
   */
  arcgisHubItemAccessLevelChange: EventEmitter<string>;
  updateAccessLevel: (evt: CustomEvent) => void;
  private get _context();
  componentWillLoad(): Promise<void>;
  get values(): IConfigurationValues;
  get canShareToPublic(): boolean;
  get canShareToOrg(): boolean;
  get schema(): IConfigurationSchema;
  get strings(): Record<string, string>;
  get uiSchema(): IUiSchema;
  render(): any;
}
export {};
