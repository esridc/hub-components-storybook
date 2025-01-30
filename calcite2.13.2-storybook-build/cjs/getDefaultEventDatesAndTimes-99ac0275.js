'use strict';

/**
 * Attempts to guess the client's IANA time zone string
 * @returns an IANA time zone
 */
function guessTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * A utility method to get a date-picker date string in the format `2024-04-03` from a Date object, timestamp in ms,
 * or a valid date/time string. By default, the date string will reflect the client's local date for the provided date.
 * An optional IANA timeZone string can be provided to adjust the resulting date string to reflect the local date
 * in the provided timeZone at that point in time.
 *
 *   getDatePickerDate('2024-03-29T16:00:00.000Z', 'America/New_York')
 *     // => `2024-03-29` (eastern)
 *
 *   getDatePickerDate('2024-03-29T16:00:00.000Z', 'America/Los_Angeles')
 *     // => `2024-03-29` (pacific)
 *
 * @param date A Date object, timestamp in ms, or valid date/time string (e.g. `2024-03-29T16:00:00.000Z`)
 * @param timeZone An optional IANA time zone string, e.g. `America/Los_Angeles`
 * @returns a date-picker date string, e.g. `2024-03-29`
 */
function getDatePickerDate(date, timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: timeZone !== null && timeZone !== void 0 ? timeZone : guessTimeZone(),
    }).formatToParts(new Date(date));
    return [parts[4].value, parts[0].value, parts[2].value].join("-");
}

/**
 * A utility method to get a time-picker time string in 24-hour format from a Date object, timestamp in ms, or a
 * valid date/time string. By default, the time string will reflect the client's local time for the provided date.
 * An optional IANA timeZone string can be provided to adjust the resulting time string to reflect the local time
 * in the provided timeZone at that point in time.
 *
 *   getTimePickerTime('2024-03-29T17:00:00.000Z', 'America/New_York')
 *     // => `13:00:00` (eastern)
 *
 *   getTimePickerTime('2024-03-29T17:00:00.000Z', 'America/Los_Angeles')
 *     // => `10:00:00` (pacific)
 *
 * @param date A Date object, timestamp in ms, or valid date/time string (e.g. `2024-03-29T16:00:00.000Z`)
 * @param timeZone An optional IANA time zone string, e.g. `America/Los_Angeles`
 * @returns a time-picker time string in 24-hour format, e.g. `13:00:00`
 */
function getTimePickerTime(date, timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: timeZone !== null && timeZone !== void 0 ? timeZone : guessTimeZone(),
        // see https://support.google.com/chrome/thread/29828561?hl=en
        // chrome computes the hour part as "24" for midnight while other browsers compute it as "00"
        // setting hourCycle to "h23" normalizes this across browser implementations
        // ts flags this property as an error, despite this working in chrome, ff & node envs
        // @ts-ignore
        hourCycle: "h23",
    }).formatToParts(new Date(date));
    return [parts[0].value, parts[2].value, parts[4].value].join(":");
}

/**
 * @private
 * Builds an object containing the user's guessed timezone and default
 * event start/end dates and times
 */
const getDefaultEventDatesAndTimes = () => {
    const hour = 1000 * 60 * 60;
    const nowPlus1Hour = new Date(Date.now() + hour);
    const nextFullHour = new Date(nowPlus1Hour.getFullYear(), nowPlus1Hour.getMonth(), nowPlus1Hour.getDate(), nowPlus1Hour.getHours());
    const sDate = nextFullHour.toISOString();
    const eDate = new Date(nextFullHour.valueOf() + hour).toISOString();
    const timeZone = guessTimeZone();
    const startDate = getDatePickerDate(sDate, timeZone);
    const endDate = getDatePickerDate(eDate, timeZone);
    return {
        startDate,
        startDateTime: new Date(sDate),
        startTime: getTimePickerTime(sDate, timeZone),
        endDate,
        endDateTime: new Date(eDate),
        endTime: getTimePickerTime(eDate, timeZone),
        timeZone,
    };
};

exports.getDatePickerDate = getDatePickerDate;
exports.getDefaultEventDatesAndTimes = getDefaultEventDatesAndTimes;
exports.getTimePickerTime = getTimePickerTime;
exports.guessTimeZone = guessTimeZone;
