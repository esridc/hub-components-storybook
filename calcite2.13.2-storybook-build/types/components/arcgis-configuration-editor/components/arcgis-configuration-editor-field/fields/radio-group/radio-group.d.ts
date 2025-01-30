import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
export declare class RadioGroup {
  constructor();
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  handleCalciteSegmentedControlChange(evt: any): void;
  renderOptions({ schema, uiSchema, value: selectedValue, t }: IRenderParams): Element[];
  render(): any;
}
