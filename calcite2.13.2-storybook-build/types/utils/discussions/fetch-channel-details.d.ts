import { IFetchChannelDetailsOptions, IChannelDetails } from './types';
import { IHubRequestOptions } from '@esri/hub-common';
export declare function fetchChannelDetails(options: IFetchChannelDetailsOptions, hubRequestOptions: IHubRequestOptions): Promise<IChannelDetails>;
