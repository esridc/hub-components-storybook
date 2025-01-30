/**
 * traverse the theme object and return all colors (any value that begins with #).
 * @param {Object} themeObj The theme object (stored on appSettings.site.data.values.theme)
 *
 * @return {string[]} An array of hex color strings
 */
function getThemeColors(themeObj, themeColors = []) {
  for (const property in themeObj) {
    const value = themeObj[property];
    if (typeof value === 'string') {
      if (value.startsWith('#')) {
        themeColors.push(value);
      }
    }
    else {
      getThemeColors(themeObj[property], themeColors);
    }
  }
  return themeColors;
}
/**
 * traverses through a 3 digit hexcode and returns the converted 6 digit hexcode
 *
 * @param hexCode - 3 digit hexcode
 * @returns 6 digit hexcode or original hexcode if not valid
 */
function convert3HexTo6Hex(hexCode) {
  let result = hexCode;
  // is a 3 character hex code that starts with #
  if (/^#(?:[0-9a-fA-F]{3})$/.test(hexCode)) {
    // Extract the r, g, and b values from the 3 character hex code
    // since 3-character hex codes are in the format of #RGB
    const [r, g, b] = hexCode.substring(1).split('');
    // Because 6 character hex codes are the format of #RRGGBB,
    // and a 3 character hex code is shorthand form of that,
    // we can build a 6 character hex code from a 3 character hex code
    result = `#${r}${r}${g}${g}${b}${b}`;
  }
  return result;
}

export { convert3HexTo6Hex as c, getThemeColors as g };
