import { FunctionalComponent } from '../../stencil-public-runtime';
import { IArcGISContext } from '@esri/hub-common';
import { IUser } from '@esri/arcgis-rest-auth';
interface IHubAvatarProps {
  context: IArcGISContext;
  scale?: 's' | 'm' | 'l';
  user?: IUser;
  label?: string;
  key?: string;
}
export declare const HubUserAvatar: FunctionalComponent<IHubAvatarProps>;
export {};
