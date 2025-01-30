'use strict';

/**
 * The predefined date options the date range picker _uses_
 */
const PREDEFINED_DATE_OPTIONS = [
  'today',
  'yesterday',
  'last7Days',
  'last30Days',
  'thisMonth',
  'lastMonth',
  'pastYear',
  'custom'
];
/**
 * Returns true if the value is a predefined date option
 * @param value The value of the date range
 * @returns boolean
 */
const isPredefinedDateOption = (value) => {
  return PREDEFINED_DATE_OPTIONS.includes(value);
};
/**
 * A getter for the date range picker options
 * @param customStartDate An optional custom start date
 * @param customEndDate An optional custom end date
 * @returns A DateRangePickerOptions object
 */
const getDateRangePickerOptions = (customStartDate, customEndDate) => {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  return {
    today: { startDate: new Date(new Date().setHours(0, 0, 0, 0)) },
    yesterday: {
      startDate: new Date(new Date(new Date().setDate(currentDay - 1)).setHours(0, 0, 0, 0)),
      endDate: new Date(new Date(new Date().setDate(currentDay - 1)).setHours(23, 59, 59, 999))
    },
    last7Days: { startDate: new Date(new Date().setDate(currentDay - 7)) },
    last30Days: { startDate: new Date(new Date().setDate(currentDay - 30)) },
    thisMonth: { startDate: new Date(new Date(new Date().setDate(1)).setHours(0, 0, 0, 0)) },
    lastMonth: {
      startDate: new Date(new Date(new Date(new Date().setMonth(currentMonth - 1)).setDate(1)).setHours(0, 0, 0, 0)),
      endDate: new Date(new Date(new Date().setDate(0)).setHours(23, 59, 59, 999))
    },
    pastYear: { startDate: new Date(new Date(new Date().setMonth(currentMonth - 12)).setDate(currentDay + 1)) },
    custom: { startDate: customStartDate, endDate: customEndDate }
  };
};

exports.PREDEFINED_DATE_OPTIONS = PREDEFINED_DATE_OPTIONS;
exports.getDateRangePickerOptions = getDateRangePickerOptions;
exports.isPredefinedDateOption = isPredefinedDateOption;
