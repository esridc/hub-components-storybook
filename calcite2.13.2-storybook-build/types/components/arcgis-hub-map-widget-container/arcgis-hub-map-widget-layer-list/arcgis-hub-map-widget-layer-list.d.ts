/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../../stencil-public-runtime';
import { HTMLCalcitePanelElement } from '@esri/calcite-components/dist';
import { ComponentIntl } from '../../../utils/stencil-intl';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
/**
 * This component is a wrapper around the ArcGIS API for JavaScript LayerList
 * widget.
 */
export declare class ArcgisHubMapWidgetLayerList {
  el: HTMLElement;
  scale: Scale;
  view: __esri.View;
  showZoomAction: boolean;
  showRemoveAction: boolean;
  showLegend: boolean;
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
  layerListEl: HTMLArcgisHubMapWidgetGenericElement;
  layerList: __esri.LayerList;
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
  handleSetWidgetRef(layerListEl: HTMLArcgisHubMapWidgetGenericElement): void;
  toggleClosed(): void;
  setPanelHeight(): void;
  addWidget(): Promise<void>;
  /**
   * Actions to be displayed in the layer list
   * @returns {__esri.ActionButton[]}
   */
  get actions(): __esri.ActionButton[];
  get positionClass(): string;
  get styles(): {
    [key: string]: string;
  };
  private get _messageOverrides();
  render(): any;
}
