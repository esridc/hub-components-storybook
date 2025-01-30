import { EventEmitter } from '../../stencil-public-runtime';
import { DateRangeFacetChangePayload } from '../../utils/state-utils';
import { IDateRangeFacet } from '../../utils/types';
import { CalciteInputDatePickerCustomEvent } from '@esri/calcite-components';
import { ComponentIntl } from '../../utils/stencil-intl';
export declare class ArcgisHubDateRangeFacet {
  constructor();
  element: HTMLElement;
  facet: IDateRangeFacet;
  intl: ComponentIntl;
  arcgisHubDateRangeFacetChange: EventEmitter<DateRangeFacetChangePayload>;
  componentWillLoad(): Promise<void>;
  changeDateRange(range?: {
    from: any;
    to: any;
  }): void;
  handleDateRangeChange(event: CalciteInputDatePickerCustomEvent<void>): void;
  render(): any;
}
