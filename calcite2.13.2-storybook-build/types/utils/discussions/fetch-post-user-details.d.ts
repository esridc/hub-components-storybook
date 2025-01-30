import { IFetchPostUserDetailsOptions, IPostUserDetails } from './types';
import { IHubRequestOptions } from '@esri/hub-common';
export declare function fetchPostUserDetails(options: IFetchPostUserDetailsOptions, hubRequestOptions: IHubRequestOptions): Promise<IPostUserDetails>;
