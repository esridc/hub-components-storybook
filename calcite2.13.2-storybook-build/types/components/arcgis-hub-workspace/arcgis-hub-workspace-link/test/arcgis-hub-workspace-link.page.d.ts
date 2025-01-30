import { SpecPage } from "@stencil/core/testing";
export declare class ArcgisHubWorkspaceLinkSpecPage {
  page: SpecPage;
  constructor(page: SpecPage);
  get calciteLink(): ({
    el: HTMLCalciteLinkElement;
    href: string;
    iconEnd: string;
    iconStart: string;
    target: string;
  });
}
