import { EventEmitter } from '../../../../../../stencil-public-runtime';
import { ISectionParams } from '../../resources';
export declare class Subblock {
  params: ISectionParams;
  _isOpen: boolean;
  _key: string;
  arcgisConfigurationEditorFieldChange: EventEmitter<any>;
  componentWillLoad(): void;
  get toggleDisplay(): "button" | "switch";
  get scale(): string;
  /**
   * subblock sections with a toggle switch can essentially
   * serve as both a section AND a field (e.g. toggling the
   * switch can enable/disable a property in the schema). In
   * this case, we need to emit the field change event for
   * the configuration editor to update the internal value
   * on the model.
   */
  handleCalciteBlockSectionToggle: (evt: CustomEvent<void>) => void;
  render(): any;
}
