import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
export declare class ColorPicker {
  constructor();
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string>;
  handleArcgisHubInputColorChange(evt: any): void;
  render(): any;
}
