import { IGroup, IPortal, IUser } from '@esri/arcgis-rest-portal';
import { IHubContent, RemoteServerError } from '@esri/hub-common';
import { IChannel, IPost, SharingAccess } from '@esri/hub-discussions';
export interface IMentionedUserDetails {
  user: IUser | null;
  userError: RemoteServerError | null;
  userId: string;
  org: IPortal | null;
  orgError: RemoteServerError | null;
}
export interface IPostDetails {
  post: IPost | null;
  postError: RemoteServerError | null;
  postId: string | null;
}
export interface IPostUserDetails {
  postCreator: IUser | null;
  postCreatorError: RemoteServerError | null;
  postCreatorId: string | null;
  postCreatorOrg: IPortal | null;
  postCreatorOrgError: RemoteServerError | null;
}
export interface IParentDetails {
  parent: IPost | null;
  parentError: RemoteServerError | null;
  parentId: string;
}
export interface IParentUserDetails {
  parentCreator: IUser | null;
  parentCreatorError: RemoteServerError | null;
  parentCreatorId: string;
  parentCreatorOrg: IPortal | null;
  parentCreatorOrgError: RemoteServerError | null;
}
export interface IChannelDetails {
  channel: IChannel | null;
  channelError: RemoteServerError | null;
  channelGroups: IGroup[] | null;
  channelId: string;
}
export interface IEntityDetails {
  discussion: string;
  entityId: string;
  entityType: string;
  entity: IHubContent | IGroup;
  displayFieldValid: boolean | null;
  displayFieldValue: string | null;
  displayFieldKey: string | null;
}
export interface IPostMentionedUserDetails {
  postMentionedUsers: IMentionedUserDetails[] | null;
}
export interface IChannelDetailsWithLatestUserPost extends IChannelDetails {
  post: IPost;
}
export interface IFetchChannelDetailsOptions {
  post?: IPost;
  parent?: IPost;
  channelId?: string;
  channel?: IChannel;
  channelGroups?: IGroup[];
  channelGroupIds?: string[];
  channelAccess?: SharingAccess;
}
export interface IFetchPostUserDetailsOptions {
  post?: IPost;
  postCreator?: IUser;
  postCreatorId?: string;
  postCreatorOrg?: IPortal;
}
export interface IFetchParentDetailsOptions {
  post?: IPost;
  parent?: IPost;
  parentId?: string;
}
export interface IFetchPostMentionedUserDetailsOptions {
  post?: IPost;
  postMentionedUsers?: IMentionedUserDetails[];
}
export interface IFetchPostDetailsOptions {
  postId?: string;
  post?: IPost;
}
export interface IFetchParentUserDetailsOptions {
  parent?: IPost;
  parentCreatorId?: string;
  parentCreator?: IUser;
  parentCreatorOrg?: IPortal;
}
export interface IFetchEntityDetailsOptions {
  discussion?: string;
  entityId?: string;
  entityType?: string;
  entity?: IHubContent | IGroup;
  displayFieldValid?: boolean;
  displayFieldValue?: string | null;
  displayFieldKey?: string | null;
  post?: IPost;
  parent?: IPost;
  bust?: boolean;
  locationId?: string;
  discussionType?: 'board';
}
export interface IFetchEnvironmentDetailsOptions {
  isHub?: boolean;
}
export interface IEnvironmentDetails {
  isHub: boolean;
}
export declare type ThreadScrollTarget = 'list' | 'editor';
export interface IPostSelectDetails {
  parent: IPost | null;
  parentCreator: IUser | null;
  parentCreatorOrg: IPortal | null;
  parentId: string | null;
  channelId: string | null;
  channel: IChannel | null;
  channelGroups: IGroup[] | null;
  scrollTarget?: ThreadScrollTarget;
  post?: IPost | null;
  postId?: string | null;
  postCreator?: IUser | null;
  postCreatorOrg?: IPortal | null;
}
