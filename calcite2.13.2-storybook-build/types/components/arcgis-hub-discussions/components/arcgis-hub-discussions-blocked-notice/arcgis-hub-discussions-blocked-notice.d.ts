import { EventEmitter } from '../../../../stencil-public-runtime';
import { ComponentIntl } from '../../../../utils/stencil-intl';
import { Scale } from '@esri/calcite-components/dist/types/components/interfaces';
import { ArcgisHubDiscussionsBlockedNoticeVariant } from './resources';
/** @internal */
export declare class ArcgisHubDiscussionsBlockedNotice {
  el: HTMLArcgisHubDiscussionsBlockedNoticeElement;
  intl: ComponentIntl;
  variant: ArcgisHubDiscussionsBlockedNoticeVariant;
  scale: Scale;
  hubTelemetry: EventEmitter<any>;
  constructor();
  componentWillLoad(): Promise<void>;
  get variantConfig(): {
    message: string;
    title: string;
  };
  handleImpression(): void;
  render(): any;
}
