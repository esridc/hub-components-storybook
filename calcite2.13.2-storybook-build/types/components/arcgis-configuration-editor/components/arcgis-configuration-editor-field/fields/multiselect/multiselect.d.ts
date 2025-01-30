import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { IRenderParams } from '../resources';
export declare class Multiselect {
  constructor();
  params: IRenderParams;
  arcgisConfigurationEditorFieldInputChange: EventEmitter<string[]>;
  handleHubMultiselectChange(evt: CustomEvent): void;
  render(): any;
}
