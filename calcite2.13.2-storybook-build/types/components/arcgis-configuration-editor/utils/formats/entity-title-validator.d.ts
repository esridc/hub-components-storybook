/**
 * Custom AJV format to support performing validations for
 * entity title fields in a form schema.
 * This format is used to validate that the provided string does not contain any emojis, or "<, >, =" characters
 */
export declare const entityTitleValidator: {
  /**
 * Validates that the provided string does not contain any emojis, or "<, >, =" characters
 * @param value a string
 * @returns true when the string passes validation (no emoji present or "<, >, =" characters)
 */
  validate: (value: string) => boolean;
};
