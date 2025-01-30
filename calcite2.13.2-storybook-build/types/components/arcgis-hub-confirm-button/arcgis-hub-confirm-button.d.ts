import { ComponentIntl } from "../../utils/stencil-intl";
export declare class ArcgisHubConfirmButton {
  element: HTMLElement;
  intl: ComponentIntl;
  state: string;
  disabled: boolean;
  icon: string;
  kind: "brand" | "danger" | "inverse" | "neutral";
  defaultText: string;
  confirmText: string;
  componentWillLoad(): Promise<void>;
  reset: () => void;
  get appearance(): string;
  get text(): string;
  onClick: (e: any) => void;
  render(): any;
}
