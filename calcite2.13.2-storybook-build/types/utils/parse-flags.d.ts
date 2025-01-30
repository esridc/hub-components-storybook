import { HubServiceStatus, IFeatureFlags } from "@esri/hub-common";
interface IParseFlagsResult {
  replaceState: boolean;
  uri: string;
  featureFlags: IFeatureFlags;
  serviceStatus: HubServiceStatus;
}
export declare function parseFlags(href: string): IParseFlagsResult;
export {};
