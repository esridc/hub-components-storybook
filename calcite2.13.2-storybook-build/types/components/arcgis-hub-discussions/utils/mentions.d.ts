import { IUser } from "@esri/arcgis-rest-auth";
import { IChannel, IPost } from "@esri/hub-discussions";
import { IMentionedUserDetails } from "../../../utils/discussions/types";
export declare function mentionPopoverTransform(text: string, post: IPost, postCreator: IUser, postMentionedUsers: IMentionedUserDetails[], channel: IChannel): string;
