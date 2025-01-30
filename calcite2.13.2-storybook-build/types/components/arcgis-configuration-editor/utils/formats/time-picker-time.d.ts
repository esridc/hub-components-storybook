/**
 * Custom AJV format to support performing validations for
 * `hub-field-input-time` (i.e. `calcite-time-picker`) fields
 * in a form schema.
 */
export declare const timePickerTime: {
  /**
   * Validates that the `hub-field-input-time` field's value is a valid
   * 24-hour time string in the format of `00:00:00` - `23:59:59`
   * @param value a string
   * @returns true when the string passes validation
   */
  validate: (value: string) => boolean;
  /**
   * Compares two `hub-field-input-time` field values. This enables the ability to
   * perform more complex validations based on the value of other field values using
   * data references. See https://ajv.js.org/guide/combining-schemas.html#data-reference
   *
   * Eg. In the following schema, the `endTime` field will fail validation when it's time
   * value is before the time value of the `startTime` field.
   *
   * {
   *   properties: {
   *     startTime: {
   *       type: "string",
   *       format: "timePickerTime",
   *     },
   *     endTime: {
   *       type: "string",
   *       format: "timePickerTime",
   *       formatExclusiveMinimum: { $data: "1/startTime" },
   *     },
   *   },
   * }
   *
   * @param time1 the current `hub-field-input-time` field value
   * @param time2 a different `hub-field-input-time` field value
   * @returns 1 when time1 is greater, -1 when time2 is greater, else 0
   */
  compare: (time1: string, time2: string) => number;
};
