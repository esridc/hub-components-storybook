import { IHubSearchResult } from '@esri/hub-common';
import { EventInput } from '@fullcalendar/core';
/**
 * Transforms a collection of IHubSearchResult objects into EventInput objects for use by FullCalendar
 * @param searchResults An array of IHubSearchResult objects
 * @returns an array of EventInput objects
 */
export declare function getEventInputsFromSearchResults(searchResults: IHubSearchResult[]): EventInput[];
