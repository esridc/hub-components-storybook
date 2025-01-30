/**
 * traverse the theme object and return all colors (any value that begins with #).
 * @param {Object} themeObj The theme object (stored on appSettings.site.data.values.theme)
 *
 * @return {string[]} An array of hex color strings
 */
export declare function getThemeColors(themeObj: any, themeColors?: any[]): string[];
/**
 * traverses through a 3 digit hexcode and returns the converted 6 digit hexcode
 *
 * @param hexCode - 3 digit hexcode
 * @returns 6 digit hexcode or original hexcode if not valid
 */
export declare function convert3HexTo6Hex(hexCode: string): string;
