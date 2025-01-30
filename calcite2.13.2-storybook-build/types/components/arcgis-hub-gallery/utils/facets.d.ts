import { EntityType, IArcGISContext } from "@esri/hub-common";
import { ComponentIntl } from "../../../utils/stencil-intl";
import { IExtent } from "@esri/arcgis-rest-feature-layer";
import { IFacet } from "../../../utils/types";
/**
 * A list of facet types that we can build IFacets for.
 * The default facet definitions are item based, for
 * entities that have different facet definations for
 * the same facet types, we prefix those facet types with
 * the entity type to differentiate them, e.g. "group-type".
 *
 * NOTE: This is the order in which the facets will be
 * displayed.
 *
 * NOTE: When adding a new facet for an entity type, first
 * check if the facet exists in the FacetTypes already and
 * if the facet definition is the same as the default one,
 * if so, just simply add the entity type to that facet's
 * validTargetEntities. Otherwise, add the new facet type
 * here and a new function to create the facet, make sure
 * to add the entity type to its validTargetEntities and
 * add the corresponding function to the facetFnMap.
 */
export declare const WELL_KNOWN_FACET_TYPES: readonly ["location", "type", "source", "tags", "categories", "license", "modified", "access", "group-role", "group-type", "group-access", "event-from", "event-access", "event-date"];
export declare type WellKnownFacetTypes = typeof WELL_KNOWN_FACET_TYPES[number];
declare type FacetOptions = {
  facetExtent?: IExtent;
};
/**
 * Builds a list of IFacets based on the facets passed in.
 * If a facet is a string and is in the facetFnMap, we
 * will call the corresponding function to build the facet.
 * If the facet is an IFacet, we will pass it through.
 * @param facets a list of IFacets or facet names, or a mix of both
 * @param context
 * @param intl
 *
 * @returns a list of IFacets
 */
export declare function hydrateFacets(facets: ReadonlyArray<WellKnownFacetTypes | IFacet>, context: IArcGISContext, intl: ComponentIntl, options?: FacetOptions): IFacet[];
/**
 * Filters the facets based on the target entity, if the
 * facet has a validTargetEntities property and the
 * target entity is not in the list, the facet will be
 * removed from the list. If the facet does not have a
 * validTargetEntities property, it will be passed
 * through so we don't break the existing behavior
 * @param facets
 * @param targetEntity
 * @returns
 */
export declare function filterFacetsbyTargetEntity(facets: IFacet[], targetEntity: EntityType): IFacet[];
export {};
