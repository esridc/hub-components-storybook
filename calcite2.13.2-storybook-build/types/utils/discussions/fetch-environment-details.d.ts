import { IFetchEnvironmentDetailsOptions, IEnvironmentDetails } from './types';
import { IHubRequestOptions } from '@esri/hub-common';
export declare function fetchEnvironmentDetails(options: IFetchEnvironmentDetailsOptions, hubRequestOptions: IHubRequestOptions): Promise<IEnvironmentDetails>;
