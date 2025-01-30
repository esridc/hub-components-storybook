import { FunctionalComponent } from '../../stencil-public-runtime';
import { IShareableCard } from "../interfaces";
interface ShareableProps {
  context: IShareableCard;
  showShareUi: boolean;
}
export declare const Shareable: FunctionalComponent<ShareableProps>;
export {};
