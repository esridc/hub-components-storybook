import { Host, h } from '@stencil/core';
import { bind } from '../../utils/context';
import TimeSlider from "@arcgis/core/widgets/TimeSlider";
import { loadArcGisCss } from "../../utils/arcgis";
/**
 * Web component wrapper for the ArcGIS JSAPI [TimeSlider widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-TimeSlider.html)
 */
export class ArcgisTimeSlider {
  constructor() {
    this.handles = [];
    this.actions = undefined;
    this.disabled = undefined;
    this.fullTimeExtent = undefined;
    this.label = undefined;
    this.labelFormatFunction = undefined;
    this.layout = undefined;
    this.loop = undefined;
    this.mode = undefined;
    this.playRate = undefined;
    this.position = undefined;
    this.stops = undefined;
    this.tickConfigs = undefined;
    this.timeExtent = null;
    this.timeVisible = undefined;
    this.view = undefined;
    this.viewModel = undefined;
    this.visible = undefined;
    this.skipDestroy = undefined;
    bind(this, 'emitTriggerAction');
  }
  actionsChanged(actions) {
    if (this.timeSlider) {
      this.timeSlider.actions = actions;
    }
  }
  disabledChanged(disabled) {
    if (this.timeSlider) {
      this.timeSlider.disabled = disabled;
    }
  }
  fullTimeExtentChanged(fullTimeExtent) {
    if (this.timeSlider) {
      this.timeSlider.fullTimeExtent = fullTimeExtent;
    }
  }
  labelChanged(label) {
    if (this.timeSlider) {
      this.timeSlider.label = label;
    }
  }
  labelFormatFunctionChanged(labelFormatFunction) {
    if (this.timeSlider) {
      this.timeSlider.labelFormatFunction = labelFormatFunction;
    }
  }
  layoutChanged(layout) {
    if (this.timeSlider) {
      this.timeSlider.layout = layout;
    }
  }
  loopChanged(loop) {
    if (this.timeSlider) {
      this.timeSlider.loop = loop;
    }
  }
  modeChanged(mode) {
    if (this.timeSlider) {
      this.timeSlider.mode = mode;
    }
  }
  playRateChanged(playRate) {
    if (this.timeSlider) {
      this.timeSlider.playRate = playRate;
    }
  }
  positionChanged(position) {
    this.skipDestroy = true;
    this.view.ui.move(this.container, position);
  }
  stopsChanged(stops) {
    if (this.timeSlider) {
      this.timeSlider.stops = stops;
    }
  }
  tickConfigsChanged(tickConfigs) {
    if (this.timeSlider) {
      this.timeSlider.tickConfigs = tickConfigs;
    }
  }
  timeExtentChanged(timeExtent) {
    if (this.timeSlider) {
      this.timeSlider.timeExtent = timeExtent;
    }
  }
  timeVisibleChanged(timeVisible) {
    if (this.timeSlider) {
      this.timeSlider.timeVisible = timeVisible;
    }
  }
  viewChanged(view) {
    if (this.timeSlider) {
      this.timeSlider.view = view;
    }
  }
  viewModelChanged(viewModel) {
    if (this.timeSlider) {
      this.timeSlider.viewModel = viewModel;
    }
  }
  visibleChanged(visible) {
    if (this.timeSlider) {
      this.timeSlider.visible = visible;
    }
  }
  connectedCallback() {
    this.createSlider();
  }
  disconnectedCallback() {
    if (this.skipDestroy) {
      this.skipDestroy = false;
    }
    else {
      this.destroySlider();
    }
  }
  async componentWillLoad() {
    this.createSlider();
    loadArcGisCss();
  }
  createSlider() {
    const { container, timeSlider } = this;
    if (container && !timeSlider) {
      const { view, position, container, widgetProperties } = this;
      this.timeSlider = new TimeSlider(widgetProperties);
      this.handles.push(this.timeSlider.on('trigger-action', this.emitTriggerAction));
      this.skipDestroy = true;
      view.ui.add(container, position);
    }
  }
  get widgetProperties() {
    const props = ['container', 'disabled', 'fullTimeExtent', 'label', 'labelFormatFunction',
      'layout', 'loop', 'mode', 'playRate', 'stops', 'tickConfigs', 'timeExtent', 'timeVisible',
      'view', 'viewModel', 'visible'];
    const toEntry = (acc, prop) => this[prop] === undefined
      ? acc
      : Object.assign(Object.assign({}, acc), { [prop]: this[prop] });
    return props.reduce(toEntry, { id: this.widgetId });
  }
  get widgetId() {
    return [
      this.container.getAttribute('id'),
      'time-slider'
    ].filter(Boolean).join('-');
  }
  emitTriggerAction(event) {
    this.triggerAction.emit(event.action);
  }
  destroySlider() {
    if (this.timeSlider) {
      this.handles.forEach(handle => handle.remove());
      this.handles = [];
      this.view.ui.remove(this.timeSlider.id);
      this.timeSlider.destroy();
      this.timeSlider = null;
    }
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  static get is() { return "arcgis-time-slider"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-time-slider.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-time-slider.css"]
    };
  }
  static get properties() {
    return {
      "actions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.Collection<__esri.Action>",
          "resolved": "Collection<Action>",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines actions that will appear in a menu when the user clicks the ellipsis button timeSlider-actions-menu in the widget."
        }
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
        "optional": true,
        "docs": {
          "tags": [],
          "text": "When true, sets the widget to a disabled state so the user cannot interact with it."
        },
        "attribute": "disabled",
        "reflect": false
      },
      "fullTimeExtent": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.TimeExtentProperties | __esri.TimeExtent",
          "resolved": "TimeExtent | TimeExtentProperties",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The temporal extent of the entire slider. TimeExtentProperties during initialization, else TimeExtent"
        }
      },
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The widget's default label."
        },
        "attribute": "label",
        "reflect": false
      },
      "labelFormatFunction": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.DateLabelFormatter",
          "resolved": "(value: Date | Date[], type?: \"extent\" | \"min\" | \"max\", element?: HTMLElement, layout?: \"compact\" | \"wide\") => void",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "A function used to specify custom formatting and styling of the min, max, and extent labels of the TimeSlider."
        }
      },
      "layout": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'auto' | 'compact' | 'wide'",
          "resolved": "\"auto\" | \"compact\" | \"wide\"",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Determines the layout used by the TimeSlider widget."
        },
        "attribute": "layout",
        "reflect": false
      },
      "loop": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "When true, the time slider will play its animation in a loop."
        },
        "attribute": "loop",
        "reflect": false
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'instant' | 'time-window' | 'cumulative-from-start' | 'cumulative-from-end'",
          "resolved": "\"cumulative-from-end\" | \"cumulative-from-start\" | \"instant\" | \"time-window\"",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The time slider mode."
        },
        "attribute": "mode",
        "reflect": false
      },
      "playRate": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The time (in milliseconds) between animation steps."
        },
        "attribute": "play-rate",
        "reflect": false
      },
      "position": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | __esri.UIAddPosition",
          "resolved": "UIAddPosition | string",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The position in the view at which to add the component."
        },
        "attribute": "position",
        "reflect": false
      },
      "stops": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.StopsByDates | __esri.StopsByCount | __esri.StopsByInterval",
          "resolved": "StopsByCount | StopsByDates | StopsByInterval",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines specific locations on the time slider where thumbs will snap to when manipulated."
        }
      },
      "tickConfigs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.TickConfig[]",
          "resolved": "TickConfig[]",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "When set, overrides the default TimeSlider ticks labelling system."
        }
      },
      "timeExtent": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.TimeExtentProperties | __esri.TimeExtent",
          "resolved": "TimeExtent | TimeExtentProperties",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The current time extent of the time slider. TimeExtentProperties during initialization, otherwise TimeExtent"
        },
        "defaultValue": "null"
      },
      "timeVisible": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Shows/hides time in the display."
        },
        "attribute": "time-visible",
        "reflect": false
      },
      "view": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.MapView | __esri.SceneView",
          "resolved": "MapView | SceneView",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "A reference to the MapView or SceneView."
        }
      },
      "viewModel": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.TimeSliderViewModelProperties | __esri.TimeSliderViewModel",
          "resolved": "TimeSliderViewModel | TimeSliderViewModelProperties",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The view model for this widget. TimeSliderViewModelProperties during initialization, else TimeSliderViewModel"
        }
      },
      "visible": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates whether the widget is visible."
        },
        "attribute": "visible",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "skipDestroy": {}
    };
  }
  static get events() {
    return [{
        "method": "triggerAction",
        "name": "trigger-action",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Fires when a user clicks on an action in the actions menu."
        },
        "complexType": {
          "original": "__esri.Action",
          "resolved": "Action",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        }
      }];
  }
  static get elementRef() { return "container"; }
  static get watchers() {
    return [{
        "propName": "actions",
        "methodName": "actionsChanged"
      }, {
        "propName": "disabled",
        "methodName": "disabledChanged"
      }, {
        "propName": "fullTimeExtent",
        "methodName": "fullTimeExtentChanged"
      }, {
        "propName": "label",
        "methodName": "labelChanged"
      }, {
        "propName": "labelFormatFunction",
        "methodName": "labelFormatFunctionChanged"
      }, {
        "propName": "layout",
        "methodName": "layoutChanged"
      }, {
        "propName": "loop",
        "methodName": "loopChanged"
      }, {
        "propName": "mode",
        "methodName": "modeChanged"
      }, {
        "propName": "playRate",
        "methodName": "playRateChanged"
      }, {
        "propName": "position",
        "methodName": "positionChanged"
      }, {
        "propName": "stops",
        "methodName": "stopsChanged"
      }, {
        "propName": "tickConfigs",
        "methodName": "tickConfigsChanged"
      }, {
        "propName": "timeExtent",
        "methodName": "timeExtentChanged"
      }, {
        "propName": "timeVisible",
        "methodName": "timeVisibleChanged"
      }, {
        "propName": "view",
        "methodName": "viewChanged"
      }, {
        "propName": "viewModel",
        "methodName": "viewModelChanged"
      }, {
        "propName": "visible",
        "methodName": "visibleChanged"
      }];
  }
}
