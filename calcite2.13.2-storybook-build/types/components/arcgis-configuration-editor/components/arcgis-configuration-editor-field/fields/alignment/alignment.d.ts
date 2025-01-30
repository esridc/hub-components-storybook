import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
import { CalciteSegmentedControlCustomEvent } from '@esri/calcite-components';
export declare class Alignment {
  constructor();
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string>;
  handleCalciteSegmentedControlChange(evt: CalciteSegmentedControlCustomEvent<void>): void;
  render(): any;
}
