import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from "../../utils/stencil-intl";
export declare class ArcgisHubKeyboardShortcuts {
  element: HTMLElement;
  config: any;
  private get _context();
  modalOpen: boolean;
  currentShortcut: any;
  arcgisHubKeyboardShortcut: EventEmitter<any>;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  handleKeyPress: (event: KeyboardEvent) => void;
  onModalClose: () => void;
  renderContent(): any;
  renderModal(): any;
  render(): any;
}
