import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams, IStyleParams } from '../resources';
export declare class TileSelect {
  constructor();
  params: IRenderParams;
  styles: IStyleParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string | string[]>;
  hubTelemetry: EventEmitter<Record<string, any>>;
  selectedValues: {
    value: string;
    selected: boolean;
  }[];
  get isCheckbox(): boolean;
  get schemaEnum(): (string[] | boolean[]);
  componentWillLoad(): void;
  handleCalciteTileSelect(evt: CustomEvent): void;
  renderOptions({ uiSchema, value: selectedValue, model, t }: IRenderParams): Element[];
  render(): any;
}
