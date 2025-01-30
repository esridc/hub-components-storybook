import { IParentUserDetails, IFetchParentUserDetailsOptions } from './types';
import { IHubRequestOptions } from '@esri/hub-common';
export declare function fetchParentUserDetails(options: IFetchParentUserDetailsOptions, hubRequestOptions: IHubRequestOptions): Promise<IParentUserDetails>;
