import { IHubAggregation } from '@esri/hub-common';
import { IListFacet } from './types/IFacet';
/**
 * Create Facets from Aggregations
 *
 * @param aggregations
 * @param operation
 * @returns
 */
export declare function createFacetsFromAggregations(aggregations: Array<IHubAggregation>, operation?: 'OR' | 'AND'): IListFacet[];
