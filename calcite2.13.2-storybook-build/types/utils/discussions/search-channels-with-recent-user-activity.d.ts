import { IPagedResponse } from '@esri/hub-discussions';
import { IChannelDetailsWithLatestUserPost } from './types';
import { IHubRequestOptions } from '@esri/hub-common';
export declare function searchChannelsWithRecentUserActivity(userId: string, hubRequestOptions: IHubRequestOptions): Promise<IPagedResponse<IChannelDetailsWithLatestUserPost>>;
