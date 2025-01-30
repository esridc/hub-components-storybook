var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Host, h } from '@stencil/core';
import { ResizeObserverManager } from '../../utils/resize-observer';
import { bind } from '../../utils/context';
import Debounce from '../../decorators/debounce';
import intlManager from '../../utils/intl-manager';
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
export class ArcgisLayoutList {
  /**
   * Binds context to methods that are passed by reference
   */
  constructor() {
    this.layout = 'list';
    this.disabled = false;
    this.showMapControl = undefined;
    this.scale = 's';
    this.listStyleDeclaration = undefined;
    this.hasSlottedActions = false;
    bind(this, 'handleResized', 'handleLayoutSelected', 'handleSlotChanged');
  }
  /**
   * Assigns resize observer handles on the host element when it's connected to the DOM
   */
  connectedCallback() {
    ResizeObserverManager.addHandler(this.element, this.handleResized);
  }
  /**
   * Component will load lifecycle method, loads translations
   */
  async componentWillLoad() {
    await this.loadTranslations();
  }
  /**
   * Removes resize observer handles from the host element when it's removed from the DOM
   */
  disconnectedCallback() {
    ResizeObserverManager.unobserve(this.element);
  }
  /**
   * Loads translations
   */
  async loadTranslations() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
  }
  /**
   * A debounced method that's invoked when the host element is resized. Retrieves the
   * list element's CSSStyleDeclaration so CSS variables can be retrieved
   */
  handleResized() {
    if (this.listRef) {
      // This is not ideal. `getComputedStyle` triggers a re-render itself. Feedback
      // garnered suggested we should lean on CSS as much as possible vs properties.
      // Though CSS supports using calc inside media/container query expressions, CSS
      // varaibles are not supported, so we have to compute the values of the CSS vars
      // to programmatically determine if the layout controls should be visible or hidden
      this.listStyleDeclaration = globalThis.getComputedStyle(this.listRef);
    }
  }
  /**
   * Computes true when the actions container should render
   */
  get showActions() {
    return this.hasLayoutActions || this.hasSlottedActions;
  }
  /**
   * Handles `slotchange` events from the `actions` slot and sets hasSlottedActions
   * to true when slotted actions exist
   */
  handleSlotChanged() {
    this.hasSlottedActions = Boolean(this.element.querySelector('[slot="actions"]'));
  }
  /**
   * Computes true when the layout actions should render, specifically, when there are
   * multiple grid columns rendered, or when enough screen real estate exists to render
   * multiple columns, but only a single column is rendered due to `layout` being `list`
   */
  get hasLayoutActions() {
    const { listStyleDeclaration } = this;
    let show = false;
    if (listStyleDeclaration) {
      const gap = parseInt(listStyleDeclaration.getPropertyValue('gap'), 10);
      const gridTemplateColumns = listStyleDeclaration.getPropertyValue('grid-template-columns').split(' ');
      const columnWidth = parseFloat(gridTemplateColumns[0]);
      const minColumnWidthWithUnit = listStyleDeclaration.getPropertyValue('--arcgis-hub-layout-list-min-column-width');
      const minColumnWidth = parseFloat(minColumnWidthWithUnit) * (minColumnWidthWithUnit.endsWith('rem') ? 16 : 1);
      show = gridTemplateColumns.length > 1 || minColumnWidth * 2 + gap < columnWidth;
    }
    return Boolean(show);
  }
  /**
   * Handles clicks to the layout control actions and sets `layout` to the selected layout
   * @param evt A MouseEvent triggered by clicking a layout control action
   */
  handleLayoutSelected(evt) {
    this.layout = evt.target.icon;
    this.arcgisLayoutListLayoutSelected.emit(this.layout);
  }
  /**
   * Renders the list
   */
  renderList() {
    return (h("ol", { class: { [this.layout]: true }, ref: (listRef) => {
        this.listRef = listRef;
      } }, h("slot", null)));
  }
  /**
   * Renders the layout actions
   */
  renderLayoutActions() {
    const { hasLayoutActions, showMapControl } = this;
    if (hasLayoutActions || showMapControl) {
      const { layout: desiredLayout, intl, disabled, handleLayoutSelected, scale } = this;
      const layouts = [...(showMapControl ? ['map'] : []), ...(hasLayoutActions ? ['grid'] : []), 'list'];
      const isActive = (layout) => {
        let active = layout === desiredLayout;
        if (!hasLayoutActions && desiredLayout == 'grid' && layout === 'list') {
          active = true;
        }
        return active;
      };
      return (h("div", { class: "layout-actions" }, h("calcite-action-bar", { "expand-disabled": true, layout: "horizontal" }, layouts.map(layout => (h("calcite-action", { active: isActive(layout), disabled: disabled, icon: layout, key: layout, label: intl.t(`${layout}.label`), onClick: handleLayoutSelected, scale: scale, text: intl.t(`${layout}.text`) }))))));
    }
  }
  /**
   * Renders the actions container
   */
  renderActions() {
    return (h("div", { class: { actions: true, hasActions: this.showActions } }, h("div", null, h("slot", { name: "actions", onSlotchange: this.handleSlotChanged })), this.renderLayoutActions()));
  }
  /**
   * Primary render method
   */
  render() {
    return (h(Host, { class: { rtl: this.intl.direction === 'rtl' } }, this.renderActions(), this.renderList()));
  }
  static get is() { return "arcgis-layout-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-layout-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-layout-list.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "layout": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "'list' | 'grid' | 'map'",
          "resolved": "\"grid\" | \"list\" | \"map\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The desired layout of the layout list. Either `map`, `grid` or `list`."
        },
        "attribute": "layout",
        "reflect": true,
        "defaultValue": "'list'"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Disables the layout control actions when true"
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "showMapControl": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Enable the map layout control"
        },
        "attribute": "show-map-control",
        "reflect": false
      },
      "scale": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Scale",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {
            "Scale": {
              "location": "import",
              "path": "@esri/calcite-components/dist/types/components/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The scale of the layout control actions"
        },
        "attribute": "scale",
        "reflect": false,
        "defaultValue": "'s'"
      }
    };
  }
  static get states() {
    return {
      "listStyleDeclaration": {},
      "hasSlottedActions": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisLayoutListLayoutSelected",
        "name": "arcgisLayoutListLayoutSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a different layout is selected"
        },
        "complexType": {
          "original": "'list' | 'grid' | 'map'",
          "resolved": "\"grid\" | \"list\" | \"map\"",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Debounce({ timeout: 250 })
], ArcgisLayoutList.prototype, "handleResized", null);
