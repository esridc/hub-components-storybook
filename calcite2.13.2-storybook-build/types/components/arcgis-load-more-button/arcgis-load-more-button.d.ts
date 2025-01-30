import { EventEmitter } from '../../stencil-public-runtime';
import { Appearance, Scale, Width } from './interfaces';
import { ComponentIntl } from '../../utils/stencil-intl';
import { ButtonColor } from '../../utils/calcite';
/** @internal */
export declare class ArcgisLoadMoreButton {
  el: HTMLElement;
  /**
   * The next start value
   *
   * @type {number}
   * @memberof ArcgisLoadMoreButton
   */
  nextStart: number;
  /**
   * The calcite-button color
   * TODO: deprecate this and replace w/ kind
   *
   * @type {ButtonColor}
   * @memberof ArcgisLoadMoreButton
   */
  color: ButtonColor;
  /**
   * The calcite-button appearance
   *
   * @type {Appearance}
   * @memberof ArcgisLoadMoreButton
   */
  appearance: Appearance;
  /**
   * The calcite-button scale
   *
   * @type {Scale}
   * @memberof ArcgisLoadMoreButton
   */
  scale: Scale;
  /**
   * The calcite-button width
   *
   * @type {Width}
   * @memberof ArcgisLoadMoreButton
   */
  width: Width;
  /**
   * The calcite-button applied round style
   *
   * @type {boolean}
   * @memberof ArcgisLoadMoreButton
   */
  round: boolean;
  /**
   *
   * @type {boolean}
   * @memberof ArcgisLoadMoreButton
   */
  loading: boolean;
  arcgisLoadMoreChange: EventEmitter<number>;
  intl: ComponentIntl;
  constructor();
  get hasMoreResults(): boolean;
  get disabled(): boolean;
  componentWillLoad(): Promise<void>;
  handleLoadMore(): void;
  render(): any;
}
