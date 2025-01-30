import { EventEmitter } from '../../../stencil-public-runtime';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
export declare class ArcgisHubMapWidgetCheckbox {
  el: HTMLArcgisHubMapWidgetCheckboxElement;
  scale: Scale;
  text: string;
  checked: boolean;
  arcgisHubCheckboxWidgetClicked: EventEmitter<boolean>;
  constructor();
  get parentContainer(): HTMLArcgisHubMapWidgetContainerElement;
  handleCheckboxChange(evt: any): void;
  render(): any;
}
