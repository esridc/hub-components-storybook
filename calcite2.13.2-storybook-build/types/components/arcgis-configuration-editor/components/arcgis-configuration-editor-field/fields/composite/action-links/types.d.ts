import { IFacet } from '../../../../../../../utils/types';
import { IHubCatalog, IHubExternalActionLink, IHubContentActionLink, IHubActionLinkSection, IHubWellKnownActionLink } from '@esri/hub-common';
/**
 * Internal action link structure. This should
 * only be used within the action-links component
 */
export declare type _IActionLink = _IActionLinkSection | _IContentActionLink | _IExternalActionLink | _IWellKnownActionLink;
/** internal base action link structure */
interface _IBaseActionLink {
  key: string;
  section?: string;
  source?: 'external' | 'content' | 'well-known';
}
/** internal section link structure */
export interface _IActionLinkSection extends _IBaseActionLink, Omit<IHubActionLinkSection, 'children'> {
  children?: _IActionLink[];
}
/** internal content link structure */
export interface _IContentActionLink extends _IBaseActionLink, Omit<IHubContentActionLink, 'contentId'> {
  contentId?: string[];
  _href?: string;
}
/** internal external link structure */
export interface _IExternalActionLink extends _IBaseActionLink, IHubExternalActionLink {
}
/** internal well-known link structure (NOTE: not yet implemented in field) */
export interface _IWellKnownActionLink extends _IBaseActionLink, IHubWellKnownActionLink {
}
/** link editor uiSchema options */
export interface ILinkUiSchemaOptions {
  catalogs: IHubCatalog[];
  facets: IFacet[];
  type: 'button' | 'block';
  links: _IActionLink[];
  editKey: string;
}
export {};
