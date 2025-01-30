/**
 * Custom AJV format to support performing validations for
 * site entity title fields in a form schema.
 * This format is used to validate that the provided string does not contain any emojis,
 * nor unicode characters such as ë, É, Б, Г, Д, Ж
 */
export declare const siteEntityTitleValidator: {
  /**
 * Validates that the provided string does not contain any or other unallowed characters
 * @param value a string
 * @returns true when the string passes validation (no emoji present or other unallowed characters)
 */
  validate: (value: string) => boolean;
};
