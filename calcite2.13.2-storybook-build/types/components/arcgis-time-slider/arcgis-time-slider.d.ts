/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../stencil-public-runtime';
import TimeSlider from "@arcgis/core/widgets/TimeSlider";
/**
 * Web component wrapper for the ArcGIS JSAPI [TimeSlider widget](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-TimeSlider.html)
 */
export declare class ArcgisTimeSlider {
  timeSlider: TimeSlider;
  handles: IHandle[];
  container: HTMLArcgisTimeSliderElement;
  /**
   * Defines actions that will appear in a menu when the user clicks the ellipsis button timeSlider-actions-menu in the widget.
   */
  actions?: __esri.Collection<__esri.Action>;
  actionsChanged(actions?: __esri.Collection<__esri.Action>): void;
  /**
   * When true, sets the widget to a disabled state so the user cannot interact with it.
   */
  disabled?: boolean;
  disabledChanged(disabled?: boolean): void;
  /**
   * The temporal extent of the entire slider. TimeExtentProperties during initialization, else TimeExtent
   */
  fullTimeExtent?: __esri.TimeExtentProperties | __esri.TimeExtent;
  fullTimeExtentChanged(fullTimeExtent?: __esri.TimeExtent): void;
  /**
   * The widget's default label.
   */
  label?: string;
  labelChanged(label?: string): void;
  /**
   * A function used to specify custom formatting and styling of the min, max, and extent labels of the TimeSlider.
   */
  labelFormatFunction?: __esri.DateLabelFormatter;
  labelFormatFunctionChanged(labelFormatFunction?: __esri.DateLabelFormatter): void;
  /**
   * Determines the layout used by the TimeSlider widget.
   */
  layout?: 'auto' | 'compact' | 'wide';
  layoutChanged(layout?: 'auto' | 'compact' | 'wide'): void;
  /**
   * When true, the time slider will play its animation in a loop.
   */
  loop?: boolean;
  loopChanged(loop?: boolean): void;
  /**
   * The time slider mode.
   */
  mode?: 'instant' | 'time-window' | 'cumulative-from-start' | 'cumulative-from-end';
  modeChanged(mode?: 'instant' | 'time-window' | 'cumulative-from-start' | 'cumulative-from-end'): void;
  /**
   * The time (in milliseconds) between animation steps.
   */
  playRate?: number;
  playRateChanged(playRate?: number): void;
  /**
   * The position in the view at which to add the component.
   */
  position?: string | __esri.UIAddPosition;
  positionChanged(position?: string | __esri.UIAddPosition): void;
  /**
   * Defines specific locations on the time slider where thumbs will snap to when manipulated.
   */
  stops?: __esri.StopsByDates | __esri.StopsByCount | __esri.StopsByInterval;
  stopsChanged(stops?: __esri.StopsByDates | __esri.StopsByCount | __esri.StopsByInterval): void;
  /**
   * When set, overrides the default TimeSlider ticks labelling system.
   */
  tickConfigs?: __esri.TickConfig[];
  tickConfigsChanged(tickConfigs?: __esri.TickConfig[]): void;
  /**
   * The current time extent of the time slider. TimeExtentProperties during initialization, otherwise TimeExtent
   */
  timeExtent?: __esri.TimeExtentProperties | __esri.TimeExtent;
  timeExtentChanged(timeExtent?: __esri.TimeExtent): void;
  /**
   * Shows/hides time in the display.
   */
  timeVisible?: boolean;
  timeVisibleChanged(timeVisible?: boolean): void;
  /**
   * A reference to the MapView or SceneView.
   */
  view?: __esri.MapView | __esri.SceneView;
  viewChanged(view?: __esri.MapView | __esri.SceneView): void;
  /**
   * The view model for this widget. TimeSliderViewModelProperties during initialization, else TimeSliderViewModel
   */
  viewModel?: __esri.TimeSliderViewModelProperties | __esri.TimeSliderViewModel;
  viewModelChanged(viewModel?: __esri.TimeSliderViewModel): void;
  /**
   * Indicates whether the widget is visible.
   */
  visible?: boolean;
  visibleChanged(visible?: boolean): void;
  /**
   * Prevents teardown when component is added to view.ui.widgets
   */
  skipDestroy?: boolean;
  /**
   * Fires when a user clicks on an action in the actions menu.
   */
  triggerAction: EventEmitter<__esri.Action>;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentWillLoad(): Promise<void>;
  x: any;
  createSlider(): void;
  get widgetProperties(): any;
  get widgetId(): string;
  emitTriggerAction(event: __esri.TimeSliderTriggerActionEvent): void;
  destroySlider(): void;
  render(): any;
}
