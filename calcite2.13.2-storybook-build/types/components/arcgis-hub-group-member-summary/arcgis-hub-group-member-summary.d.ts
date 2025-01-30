import { IGroupMembershipSummary } from '@esri/hub-common';
import { VNode } from '../../stencil-public-runtime';
import { ComponentIntl } from "../../utils/stencil-intl";
import { IWithContext } from '../../utils/state';
export declare class ArcgisHubGroupMemberSummary implements IWithContext {
  element: HTMLElement;
  _context: import("@esri/hub-common").IArcGISContext;
  disconnectContext: () => void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  identifier: string;
  membershipSummary: IGroupMembershipSummary;
  limit: number;
  memberType: 'member' | 'admin';
  hasMembersError: boolean;
  intl: ComponentIntl;
  componentWillLoad(): Promise<void>;
  fetchMembers(): Promise<void>;
  getMemberCount(count: number): string;
  renderMembers(summary: IGroupMembershipSummary): VNode;
  render(): any;
}
