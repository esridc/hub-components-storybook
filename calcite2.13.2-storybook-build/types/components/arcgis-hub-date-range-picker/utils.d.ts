/**
 * The predefined date options the date range picker _uses_
 */
export declare const PREDEFINED_DATE_OPTIONS: string[];
/**
 * The predefined date option _types_ the date range picker _supports_
 */
export declare type PredefinedDateOption = (typeof PREDEFINED_DATE_OPTIONS)[number];
/**
 * Returns true if the value is a predefined date option
 * @param value The value of the date range
 * @returns boolean
 */
export declare const isPredefinedDateOption: (value: string) => boolean;
/**
 * The options for the date range picker
 */
declare type DateRangePickerOptions = {
  [idx in PredefinedDateOption]: {
    startDate: Date;
    endDate?: Date;
  };
};
/**
 * A getter for the date range picker options
 * @param customStartDate An optional custom start date
 * @param customEndDate An optional custom end date
 * @returns A DateRangePickerOptions object
 */
export declare const getDateRangePickerOptions: (customStartDate?: Date, customEndDate?: Date) => DateRangePickerOptions;
export {};
