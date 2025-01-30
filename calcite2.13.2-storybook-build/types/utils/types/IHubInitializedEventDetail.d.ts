import { HubEntity } from "@esri/hub-common";
export interface IHubInitializedEventDetail {
  entity: HubEntity;
  meta: Record<string, any>[];
  title: string;
}
