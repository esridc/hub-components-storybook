import { maybeAdd, } from '@esri/hub-common';
import { getCardModelTitleUrl } from './utils';
/**
 * Convert an Event IHubSearchResult into an IHubCardViewModel
 *
 * @param searchResult hub search result
 * @param opts view model options
 */
export const eventResultToCardModel = (searchResult, _layout, context, intl, opts) => {
  var _a, _b;
  const { actionLinks = [], baseUrl = '', target = 'self' } = opts || {};
  const rawEvent = searchResult.rawResult;
  const startDateTime = new Date(rawEvent.startDateTime);
  const endDateTime = new Date(rawEvent.endDateTime);
  let dateAndTimeValue;
  if (rawEvent.allDay) {
    const isSingleDay = startDateTime.getFullYear() === endDateTime.getFullYear() &&
      startDateTime.getMonth() === endDateTime.getMonth() &&
      startDateTime.getDate() === endDateTime.getDate();
    const from = intl.formatDate(startDateTime, { dateStyle: 'short' });
    if (isSingleDay) {
      dateAndTimeValue = intl.t('allDay', { date: from });
    }
    else {
      const to = intl.formatDate(endDateTime, { dateStyle: 'short' });
      dateAndTimeValue = intl.t('allDayRange', { from, to });
    }
  }
  else {
    dateAndTimeValue = intl.formatDateTimeRange(startDateTime, endDateTime, {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }
  let attendanceTypeKey;
  if (rawEvent.attendanceType.length === 1) {
    attendanceTypeKey = rawEvent.attendanceType.includes('IN_PERSON')
      ? 'inPerson'
      : 'online';
  }
  else {
    attendanceTypeKey = 'hybrid';
  }
  const additionalInfo = [
    {
      i18nKey: 'dateAndTime',
      value: dateAndTimeValue,
    },
    {
      i18nKey: 'attendanceType',
      value: intl.t(attendanceTypeKey),
    },
  ];
  if (((_a = searchResult.location) === null || _a === void 0 ? void 0 : _a.type) !== 'none' && ((_b = searchResult.location) === null || _b === void 0 ? void 0 : _b.name)) {
    additionalInfo.push({
      i18nKey: 'location',
      value: searchResult.location.name,
    });
  }
  let viewModel = {
    access: searchResult.access,
    actionLinks,
    badges: [],
    family: searchResult.family,
    id: searchResult.id,
    index: searchResult.index,
    summary: searchResult.summary,
    source: searchResult.owner,
    title: searchResult.name,
    type: searchResult.type,
    additionalInfo,
  };
  viewModel = maybeAdd('titleUrl', getCardModelTitleUrl(searchResult, context, target, baseUrl), viewModel);
  return viewModel;
};
