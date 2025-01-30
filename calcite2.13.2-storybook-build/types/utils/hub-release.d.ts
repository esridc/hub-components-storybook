import { IArcGISContext } from "@esri/hub-common";
export declare enum HUB_RELEASE {
  DEV = "dev",
  QA = "qa"
}
export declare function getHubRelease(status: HUB_RELEASE, context: IArcGISContext): HUB_RELEASE;
