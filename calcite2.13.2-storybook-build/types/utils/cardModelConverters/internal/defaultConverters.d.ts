import { CardConverterFn } from '../types';
/**
 * Default Converter for any HubEntity into a IHubCardViewModel
 * Unless an entity has more specific conversion logic, this function
 * will be used to convert it to a card model.
 * @param entity
 * @param _context
 * @param opts
 * @returns
 */
export declare const defaultEntityToCardModel: CardConverterFn;
/**
 * Default function to convert an IHubSearchResult into
 * an IHubCardViewModel
 *
 * @param result hub search result
 * @param opts view model options
 */
export declare const defaultResultToCardModel: CardConverterFn;
