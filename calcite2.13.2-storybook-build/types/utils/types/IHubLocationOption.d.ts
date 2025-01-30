import { HubEntityType, IHubLocation } from "@esri/hub-common";
export interface IHubLocationOption {
  /** Whether or not this option is selected initially */
  selected?: boolean;
  label: string;
  description?: string;
  location: IHubLocation;
  entityType?: HubEntityType;
}
