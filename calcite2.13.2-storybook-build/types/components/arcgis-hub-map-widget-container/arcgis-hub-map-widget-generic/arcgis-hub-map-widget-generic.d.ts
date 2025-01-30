import { EventEmitter } from '../../../stencil-public-runtime';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
export declare class ArcgisHubMapWidgetGeneric {
  el: HTMLArcgisHubMapWidgetGenericElement;
  active: boolean;
  disabled: boolean;
  icon: string;
  text: string;
  scale: Scale;
  textEnabled: boolean;
  expanded: boolean;
  visible: boolean;
  toggleEventHandler: any;
  arcgisHubWidgetSelected: EventEmitter<void>;
  constructor();
  get parentContainer(): HTMLArcgisHubMapWidgetContainerElement;
  connectedCallback(): void;
  disconnectedCallback(): void;
  emitSelected(): void;
  updateExpanded(): void;
  render(): any;
}
