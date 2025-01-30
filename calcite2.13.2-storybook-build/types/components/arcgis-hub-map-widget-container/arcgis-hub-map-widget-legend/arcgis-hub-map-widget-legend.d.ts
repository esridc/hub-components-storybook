/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../../stencil-public-runtime';
import { HTMLCalcitePanelElement } from '@esri/calcite-components/dist';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
export declare class ArcgisHubMapWidgetLegend {
  el: HTMLArcgisHubMapWidgetLegendElement;
  scale: Scale;
  view: __esri.View;
  active: boolean;
  bottomOffset: number;
  topOffset: number;
  closed: boolean;
  viewHeight: number;
  viewHeightWithOffset: number;
  viewWidth: number;
  intl: ComponentIntl;
  panelEl: HTMLCalcitePanelElement;
  viewPosition: string;
  legendEl: HTMLArcgisHubMapWidgetGenericElement;
  legend: __esri.Legend;
  arcgisHubWidgetPanelToggled: EventEmitter<boolean>;
  hubTelemetry: EventEmitter;
  constructor();
  componentWillLoad(): Promise<void>;
  componentDidLoad(): Promise<void>;
  addWidgetToView(view: __esri.View, prevView: __esri.View): void;
  updateViewHeightWhenOpen(): void;
  emitEventOnActiveChange(active: boolean): void;
  handleCalcitePanelDismissedChange(event: CustomEvent): void;
  handlePanelToggled(event: CustomEvent): void;
  handleSetPanelRef(panelEl: HTMLCalcitePanelElement): void;
  handleSetWidgetRef(legendEl: HTMLArcgisHubMapWidgetGenericElement): void;
  toggleClosed(): void;
  setPanelHeight(): void;
  addWidget(): Promise<void>;
  get positionClass(): string;
  get styles(): {
    [key: string]: string;
  };
  private get _messageOverrides();
  render(): any;
}
