import { FormatDateOptions } from '@formatjs/intl';
export interface ComponentIntl {
  locale: string;
  direction?: 'ltr' | 'rtl';
  t: (key: string, values?: Record<string, unknown>, options?: unknown) => string;
  formatRelativeTime: (value: unknown, unit?: unknown, options?: any) => string;
  formatDisplayName: (value: unknown, options?: any) => string;
  formatDate: (value: unknown, options?: any) => string;
  formatNumber: (value: unknown, options?: any) => string;
  formatDateTimeRange: (from: number | Date, to: number | Date, options?: FormatDateOptions) => string;
}
export interface IntlManager {
  assetPath: string;
  fileNamePattern: string;
  loadIntlForComponent: (element: Element, baseUrl?: string) => Promise<ComponentIntl>;
  getIntlForComponent: (element: Element) => ComponentIntl;
}
export interface CreateIntlManagerOptions {
  /**
   * Base path where the translation files will be fetched from.
   * This is passed to Stencils's getAssetPath().
   * Default: 't9n'
  */
  assetPath?: string;
  /**
   * The pattern for translation file names.
   * The {tagName} and {locale} tokens will be replaced w/ their lower-case values
   * Default: '{tagName}.t9n.{locale}.json'
   * */
  fileNamePattern?: string;
}
/**
 * Factory function to initialize a new instance of IntlManager
 * @param options
 * @returns
 */
export declare const createIntlManager: (options?: CreateIntlManagerOptions) => IntlManager;
