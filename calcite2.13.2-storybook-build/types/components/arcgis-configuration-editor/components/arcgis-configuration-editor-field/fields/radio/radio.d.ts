import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams, IStyleParams } from '../resources';
export declare class Radio {
  element: HTMLElement;
  params: IRenderParams;
  styles: IStyleParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<any>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  constructor();
  handleCalciteRadioButtonGroupChange(evt: CustomEvent): void;
  renderOptions({ schema, uiSchema, value: selectedValue, t }: IRenderParams): Element[];
  render(): any;
}
