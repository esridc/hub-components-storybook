import { CalciteTreeCustomEvent } from '@esri/calcite-components';
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from '../../utils/stencil-intl';
import { IFacetOptionTree, ITreeFacet, TreeFacetChangePayload } from '../../utils/types';
export declare class ArcgisHubTreeFacet {
  element: HTMLElement;
  facet: ITreeFacet;
  showLimitedOptions: boolean;
  intl: ComponentIntl;
  topLevelPageSize: number;
  arcgisHubTreeFacetChange: EventEmitter<TreeFacetChangePayload>;
  arcgisHubFacetMoreLessClicked: EventEmitter<{
    facet: ITreeFacet;
    isMore: boolean;
  }>;
  handleTreeSelect(event: CalciteTreeCustomEvent<void>): void;
  constructor();
  componentWillLoad(): Promise<void>;
  get optionsAsTree(): IFacetOptionTree;
  get numTopLevelOptions(): number;
  get optionsLeftToDisplay(): number;
  get moreOrLessButtonIconEnd(): string;
  get moreOrLessButtonLabel(): string;
  toggleMoreOrLessButton(): void;
  renderTopLevelOptions(): VNode[];
  renderMoreLessButton(): VNode;
  render(): any;
}
