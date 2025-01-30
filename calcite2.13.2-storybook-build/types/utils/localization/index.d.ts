import { ComponentLocaleItem, Direction, LocaleInfo, LocaleItem, SupportedLocales } from "./interfaces";
export * from './interfaces';
/**
 * Finds the locale of the closest element to the given element.
 * If no element given, and converts `window.navigator.language` into a supported locale.
 * @param element
 */
export declare function getLocaleInfo(element?: Element): LocaleInfo;
export declare function getLocaleInfoFromLocale(locale: SupportedLocales, dir?: Direction): LocaleInfo;
/**
 * Fetches locale string for the given component
 * @param element
 * @param baseURL
 */
export declare function fetchComponentLocaleStrings<T extends LocaleItem>(element: Element, baseURL: string, fileNamePattern?: string): Promise<ComponentLocaleItem<T>>;
/**
 * Returns if the detected language is rtl or ltr and returns the direction
 * @param element
 */
export declare function fetchLanguageDirection(element?: Element): "rtl" | "ltr";
/**
 * Performs locale aware parse float
 * @param localizedString string that has to be parsed
 * @param locale  locale used for parsing the float
 */
export declare function localeParseFloat(localizedString: string, locale: string): number;
