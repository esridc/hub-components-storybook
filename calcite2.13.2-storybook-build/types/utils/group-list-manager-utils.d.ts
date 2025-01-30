import { IArcGISContext, IHubSearchResult } from "@esri/hub-common";
import { IGallerySelection } from "./types/IGallerySelection";
export declare function getGallerySelection(groupIds: string[]): IGallerySelection;
/**
 * TODO: move this to more general utils, this can be used in places that
 * consume arcgis-hub-gallery-picker for groups
 * Fetch for the groups with IGallerySelection
 */
export declare function fetchGroupsWithGallerySelection(opts: {
  selection: IGallerySelection;
  context?: IArcGISContext;
  include?: string[];
}): Promise<IHubSearchResult[]>;
