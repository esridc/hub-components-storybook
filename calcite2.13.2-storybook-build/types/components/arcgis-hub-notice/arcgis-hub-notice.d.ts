import { EventEmitter } from '../../stencil-public-runtime';
import { IHubNotice } from '../../utils/notices/types';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IHubNoticeAction } from '../../utils/notices/types';
import { CalciteCheckboxCustomEvent } from '@esri/calcite-components';
/**
 * This component is responsible for rendering a notice to the user.
 * @export
 * @class ArcgisHubNotice
 */
export declare class ArcgisHubNotice {
  element: HTMLArcgisHubNoticeElement;
  noticeElement: HTMLCalciteModalElement | HTMLCalciteNoticeElement | HTMLCalciteAlertElement;
  /**
  * The id of the notice to show
  * @type {string}
  * @memberof ArcgisHubNotice
  */
  noticeId: string;
  /**
  * The notice to show - if provided, this will override the noticeId
  * @type {IHubNotice}
  * @memberof ArcgisHubNotice
  */
  notice: IHubNotice;
  /**
   * The current place in the app - this will typically be a url path
   * this is matched agains the places array in the notice to determine
   * if the notice should be shown
   * @type {string}
   * @memberof ArcgisHubNotice
   */
  place: string;
  intl: ComponentIntl;
  popoverRef: HTMLElement;
  shouldDismiss: boolean;
  arcgisHubNoticeClose: EventEmitter<IHubNotice>;
  hubTelemetry: EventEmitter<any>;
  constructor();
  private get _context();
  componentWillLoad(): Promise<void>;
  componentShouldUpdate(newVal: any, oldVal: any, changedProp: any): boolean;
  get _notice(): IHubNotice;
  /**
  * Whether or not the notice should be shown
  * @readonly
  * @type {boolean}
  * @memberof ArcgisHubNotice
  */
  get shouldShowNotice(): boolean;
  _resetNotice(): Promise<void>;
  setNoticeElement(el: HTMLCalciteModalElement): void;
  /**
   * Event handler for the change event of the dismiss checkbox
   *
   * @param {CalciteCheckboxCustomEvent<boolean>} evt
   * @memberof ArcgisHubNotice
   */
  onDismissChecked(evt: CalciteCheckboxCustomEvent<boolean>): void;
  /**
   * Event handler for the close event of the underlying calcite components (notice, alert, modal)
   *
   * @return {*}  {Promise<void>}
   * @memberof ArcgisHubNotice
   */
  onNoticeClose(): Promise<void>;
  /**
  * Handle the click event on the actions
  * @param {MouseEvent} evt
  * @return {*}  {Promise<void>}
  * @memberof ArcgisHubNotice
  */
  handleActionClick(evt: MouseEvent): Promise<void>;
  /**
   * Close the underlying calcite component (notice, alert, modal)
   *
   * @memberof ArcgisHubNotice
   */
  closeNotice(): void;
  onNoticeOpen(): void;
  /**
  * Get a string from the notice object or the i18n file
  * @param {string} key
  * @return {*}  {string}
  * @memberof ArcgisHubNotice
  */
  getString(key: string): string;
  /**
  * Render an action as a button or link
  * @param {IHubNoticeAction} action
  * @param {number} index
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  _renderAction(action: IHubNoticeAction, index: number): HTMLElement;
  /**
  * Render the actions configured for the notice
  * @param {string} slotName
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  _renderActions(slotName: string): HTMLElement;
  /**
   * During the Calcite v1.11 bump, Jupe and I (Aaron) worked to resolve
   * a bug where the icon prop set to a boolean would prevent the text from rendering
   *
   * This is a temporary fix to ensure that the text is rendered until Calcite can resolve the issue
   *
   * Jupe found an existing bug report of this during our investigation
   */
  get _getAlertIconName(): "exclamation-mark-triangle" | "information" | "check-circle" | "lightbulb";
  /**
  * Render a notice of type alert
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderAlert(): HTMLElement;
  /**
  * Render a notice of type notice
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderNotice(): HTMLElement;
  /**
  * Render a notice of type modal
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderModal(): HTMLElement;
  /**
  * Render a notice of type popover
  * @return {*}  {HTMLElement}
  * @memberof ArcgisHubNotice
  */
  renderPopover(): HTMLElement;
  render(): HTMLElement;
}
