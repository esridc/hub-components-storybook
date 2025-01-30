/**
 * Locale list (in alphabetical order) adopted from [JSAPI](https://devtopia.esri.com/WebGIS/arcgis-js-api/tree/master/esri/nls)
 * Full forms adopted from [1](https://www.science.co.il/language/Locale-codes.php) and [2](https://saimana.com/list-of-country-locale-code/)
 */
const SupportedLocales = {
  Arabic: "ar",
  Bulgarian: "bg",
  Bosnian: "bs",
  Catalan: "ca",
  Czech: "cs",
  Danish: "da",
  German: "de",
  Greek: "el",
  English: "en",
  Spanish: "es",
  Estonian: "et",
  Finnish: "fi",
  French: "fr",
  Hebrew: "he",
  Croatian: "hr",
  Hungarian: "hu",
  Indonesian: "id",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  Lithuanian: "lt",
  Latvian: "lv",
  NorwegianBokml: "nb",
  Dutch: "nl",
  Polish: "pl",
  PortugueseBrazil: "pt-BR",
  PortuguesePortugal: "pt-PT",
  Romanian: "ro",
  Russian: "ru",
  Serbian: "sr",
  Slovenian: "sl",
  Slovak: "sk",
  Swedish: "sv",
  Thai: "th",
  Turkish: "tr",
  Ukrainian: "uk",
  Vietnamese: "vi",
  ChineseChina: "zh-CN",
  ChineseHongKong: "zh-HK",
  ChineseTaiwan: "zh-TW"
};
const SupportedLocalesForFormats = [
  ...Object.values(SupportedLocales),
  "en-AU",
  "en-CA",
  "en-GB",
  "en-IE",
  "es-ES",
  "es-MX",
  "de-CH",
  "de-DE",
  "it-CH",
  "it-IT"
];
/**
 * List of supported locales that are RTL
 * Adopted from https://devtopia.esri.com/WebGIS/arcgis-js-api/blob/4master/esri/intl/locale.ts
 */
const RTLLocales = [SupportedLocales.Arabic, SupportedLocales.Hebrew];

export { RTLLocales as R, SupportedLocales as S, SupportedLocalesForFormats as a };
