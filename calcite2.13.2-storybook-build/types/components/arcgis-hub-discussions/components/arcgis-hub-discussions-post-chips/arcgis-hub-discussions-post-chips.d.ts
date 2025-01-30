import { EventEmitter } from '../../../../stencil-public-runtime';
import { IChannel, IPost } from '@esri/hub-discussions';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { CalciteTooltipCustomEvent } from '@esri/calcite-components';
import { IHubDiscussionsChip } from './types';
/** @internal */
export declare class ArcgisHubDiscussionsPostChips {
  /**
   * A reference to the host element
   */
  element: HTMLArcgisHubDiscussionsPostChipsElement;
  /**
   * The IPost object
   */
  post: IPost;
  /**
   * The numeric position of the post in a list
   */
  index: number;
  /**
   * The IChannel object
   */
  channel: IChannel;
  /**
   * The chip icon string which is actively hovered over
   */
  activeTooltip: string;
  /**
   * Emits telemetry information
   */
  hubTelemetry: EventEmitter<any>;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  constructor();
  componentWillLoad(): Promise<void>;
  handleTooltipOpen(evt: CalciteTooltipCustomEvent<void>): void;
  handleChipMouseEnter(evt: MouseEvent): void;
  handleChipMouseOut(): void;
  get chipsToRender(): IHubDiscussionsChip[];
  renderChip(chip: IHubDiscussionsChip): HTMLElement;
  render(): any;
}
