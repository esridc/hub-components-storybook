import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
/**
 * A component that will render content slotted into the default slot in either a
 * `grid` (multi-column) or `list` (single-column) layout with a set of of layout
 * actions to toggle between the views. When view is `grid`, content passed into
 * the default slot will be rendered in a grid layout that will auto fill each row
 * according the configured minimum column width. Overriding the minimum column width,
 * grid gap, gap between layout and slotted actions, and margin between actions and
 * grid/list can be achieved using CSS variables. Additional actions can be rendered
 * adjacent to the layout actions by passing them into the `actions` slot. If only
 * one column can be rendered given the configured min column width and gap, the
 * component will suppress the layout controls.
 *
 * --arcgis-hub-layout-list-gap: Configures the grid gap
 * --arcgis-hub-layout-list-min-column-width: Configures the minimum column width (determines how many columns per row)
 * --arcgis-hub-layout-list-actions-gap: Configures the grid gap
 * --arcgis-hub-layout-list-actions-margin: Configures the margin between the layout actions and grid/list
 *
 * Example 1: Basic usage
 *
 * ```html
 *   <arcgis-layout-list layout="grid">
 *     <div>one</div>
 *     <div>two</div>
 *     <div>three</div>
 *     <div>four</div>
 *     <div>five</div>
 *   </arcgis-layout-list>
 * ```
 *
 * Example 1: Overriding CSS variables and providing custom actions
 *
 * ```css
 * arcgis-layout-list {
 *   --arcgis-hub-layout-list-gap: 2rem;
 *   --arcgis-hub-layout-list-min-column-width: 30rem;
 *   --arcgis-hub-layout-list-actions-gap: .5rem;
 *   --arcgis-hub-layout-list-actions-margin: 1rem;
 * }
 * ```
 *
 * ```html
 *   <arcgis-layout-list layout="grid">
 *     <div slot="actions">
 *       <span>1 of 10 of 100</span>
 *       <calcite-action scale="m" text="Learn more" text-enabled></calcite-action>
 *       <calcite-button scale="m">Add</calcite-button>
 *     </div>
 *     <div>one</div>
 *     <div>two</div>
 *     <div>three</div>
 *     <div>four</div>
 *     <div>five</div>
 *   </arcgis-layout-list>
 * ```
 *
 * @slot default - Content passed into the default slot will render in the `grid` or `list` view
 * @slot actions - Content passed into the actions slot will render adjacent to the layout controls
 */
export declare class ArcgisLayoutList {
  /**
   * A reference to list element, used to retrieve the CSS variable values to determine
   * if the layout actions should be displayed since we cannot use ::slotted and :has
   * together. See https://github.com/WICG/webcomponents/issues/936
   */
  listRef: HTMLUListElement;
  /**
   * Instance of the ComponentIntl class used for i18n
   */
  intl: ComponentIntl;
  /**
   * A reference to the host element
   */
  element: HTMLArcgisLayoutListElement;
  /**
   * The desired layout of the layout list. Either `map`, `grid` or `list`.
   */
  layout: 'list' | 'grid' | 'map';
  /**
   * Disables the layout control actions when true
   */
  disabled: boolean;
  /**
   * Enable the map layout control
   */
  showMapControl: boolean;
  /**
   * The scale of the layout control actions
   */
  scale: Scale;
  /**
   * The CSSStyleDeclaration of the list element, used to retrieve the CSS variable values
   */
  listStyleDeclaration: CSSStyleDeclaration;
  /**
   * True when the component has slotted control actions
   */
  hasSlottedActions: boolean;
  /**
   * Emitted when a different layout is selected
   */
  arcgisLayoutListLayoutSelected: EventEmitter<'list' | 'grid' | 'map'>;
  /**
   * Binds context to methods that are passed by reference
   */
  constructor();
  /**
   * Assigns resize observer handles on the host element when it's connected to the DOM
   */
  connectedCallback(): void;
  /**
   * Component will load lifecycle method, loads translations
   */
  componentWillLoad(): Promise<void>;
  /**
   * Removes resize observer handles from the host element when it's removed from the DOM
   */
  disconnectedCallback(): void;
  /**
   * Loads translations
   */
  loadTranslations(): Promise<void>;
  /**
   * A debounced method that's invoked when the host element is resized. Retrieves the
   * list element's CSSStyleDeclaration so CSS variables can be retrieved
   */
  handleResized(): void;
  /**
   * Computes true when the actions container should render
   */
  get showActions(): boolean;
  /**
   * Handles `slotchange` events from the `actions` slot and sets hasSlottedActions
   * to true when slotted actions exist
   */
  handleSlotChanged(): void;
  /**
   * Computes true when the layout actions should render, specifically, when there are
   * multiple grid columns rendered, or when enough screen real estate exists to render
   * multiple columns, but only a single column is rendered due to `layout` being `list`
   */
  get hasLayoutActions(): boolean;
  /**
   * Handles clicks to the layout control actions and sets `layout` to the selected layout
   * @param evt A MouseEvent triggered by clicking a layout control action
   */
  handleLayoutSelected(evt: MouseEvent): void;
  /**
   * Renders the list
   */
  renderList(): HTMLElement;
  /**
   * Renders the layout actions
   */
  renderLayoutActions(): HTMLElement;
  /**
   * Renders the actions container
   */
  renderActions(): HTMLElement;
  /**
   * Primary render method
   */
  render(): any;
}
