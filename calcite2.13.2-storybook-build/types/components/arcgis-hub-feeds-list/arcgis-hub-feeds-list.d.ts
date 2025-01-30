import { EventEmitter } from '../../stencil-public-runtime';
import { ComponentIntl } from "../../utils/stencil-intl";
export interface IFeed {
  label: string;
  url: string;
  telemetryName: string;
  copyUrl?: string;
}
export declare class ArcgisHubFeedsList {
  element: HTMLElement;
  feeds: IFeed[];
  hubTelemetry: EventEmitter<any>;
  intl: ComponentIntl;
  constructor();
  onCopyButtonClicked(event: any): void;
  componentWillLoad(): Promise<void>;
  generateViewButtonHandler(feed: IFeed): () => void;
  render(): any;
}
