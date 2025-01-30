import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { CalciteSwitchCustomEvent } from '@esri/calcite-components';
import { IRenderParams } from '../resources';
export declare class Switch {
  constructor();
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<boolean>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  handleCalciteSwitchChange(evt: CalciteSwitchCustomEvent<void>): void;
  render(): any;
}
