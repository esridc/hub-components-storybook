import { IEntityDetails, IFetchEntityDetailsOptions } from './types';
import { IHubRequestOptions } from '@esri/hub-common';
export declare function fetchEntityDetails(options: IFetchEntityDetailsOptions, hubRequestOptions: IHubRequestOptions): Promise<IEntityDetails>;
