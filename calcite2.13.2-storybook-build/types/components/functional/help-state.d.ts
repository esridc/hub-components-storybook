import { FunctionalComponent } from '../../stencil-public-runtime';
import { HelpState as WhichHelpState } from '../arcgis-hub-help-state/arcgis-hub-help-state';
import { Kind } from '@esri/calcite-components';
interface IAddContentHelpStateProps {
  className: string;
  actionKey: string;
  headingKey: string;
  icon?: string;
  kind: Kind;
  loadingLabel?: string;
  messageKey?: string;
  state: WhichHelpState;
  t: any;
}
export declare const HelpState: FunctionalComponent<IAddContentHelpStateProps>;
export {};
