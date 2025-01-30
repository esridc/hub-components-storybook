import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { CalciteSelectCustomEvent } from '@esri/calcite-components';
import { IRenderParams } from '../resources';
export declare class Select {
  constructor();
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string>;
  handleCalciteSelectChange(evt: CalciteSelectCustomEvent<void>): void;
  renderOptions({ schema, uiSchema, value: selectedValue, t }: IRenderParams): Element[];
  render(): any;
}
