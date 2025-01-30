import { EntityType, IQuery } from "@esri/hub-common";
import { IGallerySelection } from "./types";
/**
 * Build an IQuery based on the IGallerySelection and EntityType provided
 * @param gallerySelection gallery selection as an IGallerySelection object
 * @returns null if no selection is available, else query as an IQuery
 */
export declare function buildQueryFromGallerySelection(gallerySelection: IGallerySelection, entityType: EntityType): IQuery;
