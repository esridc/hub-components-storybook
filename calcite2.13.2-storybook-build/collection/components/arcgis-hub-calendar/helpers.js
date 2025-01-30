import { Logger } from '@esri/hub-common';
/**
 * Transforms an IHubSearchResult for an Event into an EventInput object
 * @param result An IHubSearchResult for a Hub Event
 * @returns an EventInput object
 */
function eventResultToEventInputTransform(result) {
  return {
    id: result.id,
    start: new Date(result.rawResult.startDateTime),
    end: new Date(result.rawResult.endDateTime),
    title: result.name,
    allDay: result.rawResult.allDay,
    extendedProps: result,
  };
}
/**
 * A map where the key is the `type` from a IHubSearchResult object and the value is a transform fn
 * to create an EventInput object from the given IHubSearchResult.
 */
const EVENT_INPUT_TRANSFORMS_BY_TYPE = {
  Event: eventResultToEventInputTransform,
};
/**
 * Transforms a collection of IHubSearchResult objects into EventInput objects for use by FullCalendar
 * @param searchResults An array of IHubSearchResult objects
 * @returns an array of EventInput objects
 */
export function getEventInputsFromSearchResults(searchResults) {
  return searchResults.reduce((acc, result) => {
    const transform = EVENT_INPUT_TRANSFORMS_BY_TYPE[result.type];
    if (transform) {
      return [...acc, transform(result)];
    }
    else {
      Logger.warn('No event transform exists for search result of type:', result.type);
      return acc;
    }
  }, []);
}
