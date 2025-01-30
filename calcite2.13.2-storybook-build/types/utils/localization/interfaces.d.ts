export interface LocaleItem {
  [key: string]: string | LocaleItem;
}
export interface ComponentLocaleItem<T extends LocaleItem> {
  strings: T;
}
/**
 * Locale list (in alphabetical order) adopted from [JSAPI](https://devtopia.esri.com/WebGIS/arcgis-js-api/tree/master/esri/nls)
 * Full forms adopted from [1](https://www.science.co.il/language/Locale-codes.php) and [2](https://saimana.com/list-of-country-locale-code/)
 */
export declare const SupportedLocales: {
  readonly Arabic: "ar";
  readonly Bulgarian: "bg";
  readonly Bosnian: "bs";
  readonly Catalan: "ca";
  readonly Czech: "cs";
  readonly Danish: "da";
  readonly German: "de";
  readonly Greek: "el";
  readonly English: "en";
  readonly Spanish: "es";
  readonly Estonian: "et";
  readonly Finnish: "fi";
  readonly French: "fr";
  readonly Hebrew: "he";
  readonly Croatian: "hr";
  readonly Hungarian: "hu";
  readonly Indonesian: "id";
  readonly Italian: "it";
  readonly Japanese: "ja";
  readonly Korean: "ko";
  readonly Lithuanian: "lt";
  readonly Latvian: "lv";
  readonly NorwegianBokml: "nb";
  readonly Dutch: "nl";
  readonly Polish: "pl";
  readonly PortugueseBrazil: "pt-BR";
  readonly PortuguesePortugal: "pt-PT";
  readonly Romanian: "ro";
  readonly Russian: "ru";
  readonly Serbian: "sr";
  readonly Slovenian: "sl";
  readonly Slovak: "sk";
  readonly Swedish: "sv";
  readonly Thai: "th";
  readonly Turkish: "tr";
  readonly Ukrainian: "uk";
  readonly Vietnamese: "vi";
  readonly ChineseChina: "zh-CN";
  readonly ChineseHongKong: "zh-HK";
  readonly ChineseTaiwan: "zh-TW";
};
export declare type SupportedLocales = typeof SupportedLocales[keyof typeof SupportedLocales];
export declare const SupportedLocalesForFormats: string[];
export declare type SupportedLocalesForFormats = SupportedLocales | "en-AU" | "en-CA" | "en-GB" | "en-IE" | "es-ES" | "es-MX" | "de-CH" | "de-DE" | "it-CH" | "it-IT";
/**
 * List of supported locales that are RTL
 * Adopted from https://devtopia.esri.com/WebGIS/arcgis-js-api/blob/4master/esri/intl/locale.ts
 */
export declare const RTLLocales: SupportedLocales[];
export interface LocaleInfo {
  locale: SupportedLocales;
  formatLocale: SupportedLocalesForFormats;
  rtl: boolean;
  direction: Direction;
}
export declare type Direction = "ltr" | "rtl";
