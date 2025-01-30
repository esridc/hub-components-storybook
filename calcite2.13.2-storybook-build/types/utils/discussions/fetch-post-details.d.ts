import { IPost } from '@esri/hub-discussions';
import { IHubRequestOptions } from '@esri/hub-common';
import { IFetchPostDetailsOptions, IPostDetails } from './types';
export declare const fetchPostFromCache: (...args: any[]) => Promise<IPost>;
export declare function fetchPostDetails(options: IFetchPostDetailsOptions, hubRequestOptions: IHubRequestOptions): Promise<IPostDetails>;
