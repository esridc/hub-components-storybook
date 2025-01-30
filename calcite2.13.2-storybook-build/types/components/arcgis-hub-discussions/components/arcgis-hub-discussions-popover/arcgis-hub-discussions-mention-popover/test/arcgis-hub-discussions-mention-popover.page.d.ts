import { SpecPage } from "@stencil/core/testing";
import { HTMLCalciteAvatarElement, HTMLCalciteButtonElement, HTMLCalciteLinkElement, HTMLCalcitePopoverElement } from '@esri/calcite-components/dist';
export declare class ArcgisHubDiscussionsMentionPopoverSpecPage {
  page: SpecPage;
  constructor(page: SpecPage);
  get popover(): HTMLCalcitePopoverElement;
  get body(): HTMLElement;
  get footer(): HTMLElement;
  get address(): HTMLElement;
  get avatar(): HTMLCalciteAvatarElement;
  get fullName(): HTMLElement;
  get username(): HTMLElement;
  get creatorMetadata(): NodeListOf<HTMLElement>;
  get button(): HTMLCalciteButtonElement;
  get organization(): HTMLElement;
  get region(): HTMLElement;
  get postMetadata(): NodeListOf<HTMLElement>;
  get link(): HTMLCalciteLinkElement;
  get mentionedBy(): HTMLElement;
}
