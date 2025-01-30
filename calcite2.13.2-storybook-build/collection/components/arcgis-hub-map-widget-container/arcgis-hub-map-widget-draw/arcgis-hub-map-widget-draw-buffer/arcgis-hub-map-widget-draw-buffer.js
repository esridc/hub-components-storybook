import { h, Host } from '@stencil/core';
import { bind } from '../../../../utils/context';
import intlManager from '../../../../utils/intl-manager';
import { MeasurementSystem, ImperialUnit, MetricUnit } from './types';
export class ArcgisHubMapWidgetDrawBuffer {
  constructor() {
    this.visible = undefined;
    this.unit = this.defaultUnitOfMeasurement;
    this.distance = 0;
    this.status = 'idle';
    bind(this, 'handleInputKeyUp', 'handleSetPanelRef', 'handleSetSelectRef', 'handleSetInputRef', 'reset');
  }
  /**
   * componentWillLoad lifecycle method
   */
  async componentWillLoad() {
    const { el } = this;
    this.intl = await intlManager.loadIntlForComponent(el);
    this.handleVisibleChange();
  }
  /**
   * Listen for unit or distance changes, validate and emit values
   */
  handleUnitDistanceChanged() {
    const { arcgisHubMapWidgetDrawBufferChanged, unit, distance } = this;
    arcgisHubMapWidgetDrawBufferChanged.emit({
      distance,
      unit
    });
  }
  /**
   * Listen for calcite-select change and update unit and system state
   */
  handleCalciteSelectChange() {
    const { selectEl: { selectedOption: { value } } } = this;
    this.unit = value.toLowerCase();
  }
  /**
   * Listen for calcite-input change and update distance state
   */
  handleCalciteInputInput() {
    const { inputEl: { value } } = this;
    this.distance = +value;
    this.validateDistance();
  }
  /**
   * Listen for calcite-panel dismissed changes
   */
  handleCalcitePanelDismissedChange() {
    const { panelEl: { closed }, arcgisHubMapWidgetDrawBufferPanelClosed } = this;
    if (closed) {
      arcgisHubMapWidgetDrawBufferPanelClosed.emit();
    }
  }
  /**
   * Handle changes to visible prop
   */
  handleVisibleChange() {
    const { visible, panelEl, arcgisHubWidgetPanelToggled } = this;
    if (panelEl) {
      const closed = !visible;
      arcgisHubWidgetPanelToggled.emit(closed);
    }
  }
  async forceReset() {
    this.reset();
  }
  /**
   * Reset distance
   */
  reset() {
    const { arcgisHubMapWigetDrawBufferReset } = this;
    this.distance = 0;
    this.unit = this.defaultUnitOfMeasurement;
    arcgisHubMapWigetDrawBufferReset.emit();
  }
  /**
   * Validate input distance
   */
  validateDistance() {
    const { inputEl: { value } } = this;
    this.status = value
      ? 'idle'
      : 'invalid';
  }
  /**
   * Handles distance input keyUp event, since
   * calcite-input envent's are not fired when value is cleared
   */
  handleInputKeyUp() {
    this.validateDistance();
  }
  /**
   * Sets calcite-select ref to this.selectEl
   * @param selectEl
   */
  handleSetSelectRef(selectEl) {
    if (selectEl) {
      this.selectEl = selectEl;
    }
  }
  /**
   * Sets calcite-input ref to this.inputEl
   * @param inputEl
   */
  handleSetInputRef(inputEl) {
    if (inputEl) {
      this.inputEl = inputEl;
    }
  }
  /**
   * Set calcite-panel ref to this.panelEl
   * @param panelEl
   */
  handleSetPanelRef(panelEl) {
    if (panelEl) {
      this.panelEl = panelEl;
    }
  }
  /**
   * Get the default system of measurement based on locale
   */
  get defaultSystemOfMesasurement() {
    const [, country] = window.navigator.language.toLowerCase().split('-');
    // united states, liberia, myanmar use imperial system of measurement
    return ['us', 'lr', 'mm'].includes(country)
      ? MeasurementSystem.Imperial
      : MeasurementSystem.Metric;
  }
  /**
   * Get the default unit of measurement based on locale
   */
  get defaultUnitOfMeasurement() {
    const { defaultSystemOfMesasurement } = this;
    return defaultSystemOfMesasurement === MeasurementSystem.Imperial
      ? ImperialUnit.Feet
      : MetricUnit.Meters;
  }
  /**
   * Returns true if form can be reset to default values
   */
  get canReset() {
    const { distance, unit, defaultUnitOfMeasurement } = this;
    return Boolean(distance) || (unit !== defaultUnitOfMeasurement);
  }
  /**
   * Validation status (as boolean) of distance input
   * used for validation message
   */
  get distanceIsInvalid() {
    const { status } = this;
    return status === 'invalid';
  }
  /**
   * Imperial or Metric unit options
   */
  renderOptionsGroup(system, units) {
    const { unit: activeUnit, intl } = this;
    return (h("calcite-option-group", { label: intl.t(`system.${system}`) }, units.map(unit => {
      const unitLabel = intl.t(`units.${unit.replace(' ', '')}`);
      return (h("calcite-option", { key: unit, label: unitLabel, selected: activeUnit === unit, value: unit }, unitLabel));
    })));
  }
  render() {
    const { distance, distanceIsInvalid, intl, canReset, status, visible, handleInputKeyUp, handleSetSelectRef, handleSetInputRef, handleSetPanelRef, reset } = this;
    const panelHeadingText = intl.t('panel.heading');
    const panelResetText = intl.t('panel.reset');
    const distanceTitleText = intl.t('distance.title');
    const distancePlaceholderText = intl.t('distance.placeholder');
    const distanceMessageText = intl.t('distance.message');
    const unitsTitleText = intl.t('units.title');
    return (h(Host, { "data-element": "widget-draw-buffer" }, h("calcite-panel", { closable: true, closed: !visible, heading: panelHeadingText, ref: handleSetPanelRef }, h("calcite-action", { disabled: !canReset, icon: "reset", onClick: reset, slot: "header-actions-end", text: panelResetText }), h("div", { class: "location-filter" }, h("calcite-label", { scale: "l" }, distanceTitleText, h("calcite-input", { onKeyUp: handleInputKeyUp, placeholder: distancePlaceholderText, ref: handleSetInputRef, scale: "l", status: status, type: "number", value: distance.toString() }), h("calcite-input-message", { hidden: !distanceIsInvalid }, distanceMessageText)), h("calcite-label", { scale: "l" }, unitsTitleText, h("calcite-select", { label: unitsTitleText, ref: handleSetSelectRef, scale: "l" }, this.renderOptionsGroup(MeasurementSystem.Metric, Object.values(MetricUnit)), this.renderOptionsGroup(MeasurementSystem.Imperial, Object.values(ImperialUnit))))))));
  }
  static get is() { return "arcgis-hub-map-widget-draw-buffer"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-draw-buffer.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-map-widget-draw-buffer.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "visible": {
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
          "text": "Visibility of element"
        },
        "attribute": "visible",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "unit": {},
      "distance": {},
      "status": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubMapWidgetDrawBufferChanged",
        "name": "arcgisHubMapWidgetDrawBufferChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when buffer values change"
        },
        "complexType": {
          "original": "BufferDetails",
          "resolved": "BufferDetails",
          "references": {
            "BufferDetails": {
              "location": "import",
              "path": "./types"
            }
          }
        }
      }, {
        "method": "arcgisHubMapWigetDrawBufferReset",
        "name": "arcgisHubMapWigetDrawBufferReset",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when buffer is reset"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubMapWidgetDrawBufferPanelClosed",
        "name": "arcgisHubMapWidgetDrawBufferPanelClosed",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when buffer panel is closed"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "arcgisHubWidgetPanelToggled",
        "name": "arcgisHubWidgetPanelToggled",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when panel visibility changes; for closing other active panels"
        },
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "forceReset": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "unit",
        "methodName": "handleUnitDistanceChanged"
      }, {
        "propName": "distance",
        "methodName": "handleUnitDistanceChanged"
      }, {
        "propName": "visible",
        "methodName": "handleVisibleChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "calciteSelectChange",
        "method": "handleCalciteSelectChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calciteInputInput",
        "method": "handleCalciteInputInput",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "calcitePanelClose",
        "method": "handleCalcitePanelDismissedChange",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
