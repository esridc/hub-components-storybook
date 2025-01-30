/**
 * Custom AJV format to support performing validations for
 * entity title fields in a form schema.
 * This format is used to validate that the provided string does not contain any emojis, or "<, >, =" characters
 */
export const entityTitleValidator = {
  /**
 * Validates that the provided string does not contain any emojis, or "<, >, =" characters
 * @param value a string
 * @returns true when the string passes validation (no emoji present or "<, >, =" characters)
 */
  validate: (value) => {
    // Regex pattern for emoji characters pulled from https://regex101.com/r/0anB6Z/1
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    const doesNotHaveEmoji = typeof value === 'string' && !emojiRegex.test(value);
    // Regex pattern to check for <, >, and =
    const invalidCharRegex = /[<>==]/g;
    const doesNotHaveInvalidChar = typeof value === 'string' && !invalidCharRegex.test(value);
    return doesNotHaveEmoji && doesNotHaveInvalidChar;
  },
};
