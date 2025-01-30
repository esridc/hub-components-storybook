import { ComponentIntl } from "../../utils/stencil-intl";
declare enum FormatStyle {
  long = "long",
  short = "short",
  narrow = "narrow"
}
export declare class ArcgisRelativeDate {
  element: HTMLElement;
  /**
   * A date in the past. Must be a valid date string, number or object
   */
  dateTime: Date | string | number;
  /**
   * If the tooltip should render
   */
  tooltip: boolean;
  /**
   * The format style
   */
  formatStyle: FormatStyle;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  get _date(): Date;
  get isoString(): string;
  get localeString(): string;
  get relativeString(): string;
  render(): any;
}
export {};
