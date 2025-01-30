import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { b as bind } from './context-7d8f7366.js';
import TimeSlider from '@arcgis/core/widgets/TimeSlider.js';
import { l as loadArcGisCss } from './arcgis-1e3a04cd.js';
import '@arcgis/core/config.js';

const arcgisTimeSliderCss = ":host{display:block}";

const ArcgisTimeSlider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.triggerAction = createEvent(this, "trigger-action", 7);
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
  get container() { return getElement(this); }
  static get watchers() { return {
    "actions": ["actionsChanged"],
    "disabled": ["disabledChanged"],
    "fullTimeExtent": ["fullTimeExtentChanged"],
    "label": ["labelChanged"],
    "labelFormatFunction": ["labelFormatFunctionChanged"],
    "layout": ["layoutChanged"],
    "loop": ["loopChanged"],
    "mode": ["modeChanged"],
    "playRate": ["playRateChanged"],
    "position": ["positionChanged"],
    "stops": ["stopsChanged"],
    "tickConfigs": ["tickConfigsChanged"],
    "timeExtent": ["timeExtentChanged"],
    "timeVisible": ["timeVisibleChanged"],
    "view": ["viewChanged"],
    "viewModel": ["viewModelChanged"],
    "visible": ["visibleChanged"]
  }; }
};
ArcgisTimeSlider.style = arcgisTimeSliderCss;

export { ArcgisTimeSlider as arcgis_time_slider };
