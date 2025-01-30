/**
 * Custom AJV format to support performing validations for
 * site entity title fields in a form schema.
 * This format is used to validate that the provided string does not contain any emojis,
 * nor unicode characters such as ë, É, Б, Г, Д, Ж
 */
export const siteEntityTitleValidator = {
  /**
 * Validates that the provided string does not contain any or other unallowed characters
 * @param value a string
 * @returns true when the string passes validation (no emoji present or other unallowed characters)
 */
  validate: (value) => {
    // regex pattern for emoji characters pulled from https://regex101.com/r/0anB6Z/1
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
    const doesNotHaveEmoji = typeof value === 'string' && !emojiRegex.test(value);
    // regex pattern to check for unallowed unicode characters
    const invalidCharRegex = /[^\x00-\x7F]/;
    const doesNotHaveInvalidChar = typeof value === 'string' && !invalidCharRegex.test(value);
    return doesNotHaveEmoji && doesNotHaveInvalidChar;
  },
};
