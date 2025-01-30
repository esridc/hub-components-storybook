import { defaultResultToCardModel } from './internal/defaultConverters';
import { groupResultToCardModel } from './internal/groupConverters';
import { userResultToCardModel } from './internal/userConverters';
import { channelResultToCardModel } from './internal/channelConverters';
import { eventAttendeeResultToCardModel } from './internal/eventAttendeeConverters';
import { eventResultToCardModel } from './internal/eventConverters';
/**
 * Convert an IHubSearchResult into an IHubCardViewModel. This
 * function delegates to the appropriate conversion function
 * based on the IHubSearchResult type.
 *
 * In order to streamline development, these functions have not
 * been hoisted to hub.js.
 *
 * @param result hub search result
 * @param opts view model options
 */
export const resultToCardModel = (result, layout, context, intl, opts) => {
  let fn;
  switch (result.type) {
    case 'channel':
      fn = channelResultToCardModel;
      break;
    case 'Group':
      fn = groupResultToCardModel;
      break;
    case 'User':
      fn = userResultToCardModel;
      break;
    case 'Event Attendee':
      fn = eventAttendeeResultToCardModel;
      break;
    case 'Event':
      fn = eventResultToCardModel;
      break;
    default:
      fn = defaultResultToCardModel;
      break;
  }
  return fn(result, layout, context, intl, opts);
};
