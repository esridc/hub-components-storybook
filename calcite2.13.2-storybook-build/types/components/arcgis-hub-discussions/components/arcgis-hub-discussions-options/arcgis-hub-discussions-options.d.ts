import { EventEmitter } from '../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { TileSelectGroupLayout } from '@esri/calcite-components/dist/types/components/tile-select-group/interfaces';
import { DiscussionType } from '@esri/hub-discussions';
/** @internal */
export declare class ArcgisHubDiscussionsOptions {
  /**
   * Reference to host element
   */
  element: HTMLArcgisHubDiscussionsOptionsElement;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * If the tile selects should be disabled
   */
  disabled: boolean;
  /**
   * Text variant for content vs group
   */
  variant: DiscussionType;
  /**
   * The layout of the tile select group
   */
  layout: TileSelectGroupLayout;
  /**
   * The value of the control, derived from
   */
  value: boolean;
  /**
   * Emitted when the selected tile changes
   */
  arcgisHubDiscussionsOptionsChange: EventEmitter<boolean>;
  /**
   * Constructor function, pre-binds context
   */
  constructor();
  /**
   * Component will load lifecycle method
   */
  componentWillLoad(): Promise<void>;
  /**
   * Handles changes to the calcite title selects
   * @param evt
   */
  handleTileChange(evt: CustomEvent<any>): void;
  /**
   * Discussability settings form config
   */
  get options(): {
    value: boolean;
    icon: string;
  }[];
  /**
   * Primary render method
   */
  render(): any;
}
