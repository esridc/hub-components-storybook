import { IFetchPostMentionedUserDetailsOptions, IPostMentionedUserDetails } from './types';
import { IHubRequestOptions } from '@esri/hub-common';
export declare function fetchPostMentionedUsers(options: IFetchPostMentionedUserDetailsOptions, hubRequestOptions: IHubRequestOptions): Promise<IPostMentionedUserDetails>;
