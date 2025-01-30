import { IShareableCard } from "../interfaces";
import { ComponentIntl } from "../../utils/stencil-intl";
interface ITimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
export declare class ArcgisCountdown implements IShareableCard {
  element: HTMLElement;
  /**
   * The title to appear at the top of the countdown card
   *
   * @type {string}
   * @memberof ArcgisCountdown
   */
  cardTitle: string;
  /**
   * The date to countdown to
   *
   * @type {string}
   * @memberof ArcgisCountdown
   */
  countdownDate: string;
  /**
  * Whether the card should render a share button
  */
  shareable: boolean;
  shareableByValue: boolean;
  shareableByReference: boolean;
  shareableOnHover: boolean;
  onCountdownDateChange(date: string): void;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  intervalId: ReturnType<typeof setInterval>;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): Promise<void>;
  disconnectedCallback(): void;
  /**
   * function to initialize the countdown timer
   * and call the update function on a set interval
   * (i.e. every 1 second)
   *
   * @param {string} countdownDate
   */
  initializeCountdown(countdownDate: string): void;
  /**
   * function to update the rendered countdown.
   * Once the countdown has reached 0, the continuous
   * interval is removed
   *
   * @param {string} countdownDate
   */
  updateCountdown(countdownDate: string): void;
  /**
   * given a date string, this function returns the total and
   * broken down time (days, hours, minutes, seconds) until
   * the date is reached
   *
   * @param {string} countdownDate
   * @returns {ITimeRemaining}
   */
  getTimeRemaining(countdownDate: string): ITimeRemaining;
  /**
   * function to cleanup an existing countdown by removing
   * its continuous interval
   *
   * @param id countdown interval identifier
   */
  cleanupCountdown(id: ReturnType<typeof setInterval>): void;
  renderHeader(title: string): HTMLElement;
  renderCountdown(): HTMLElement[];
  renderError(): HTMLElement;
  render(): any;
}
export {};
