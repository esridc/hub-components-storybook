import { SpecPage } from "@stencil/core/testing";
export declare class ArcgisHubWorkspaceDirtyStateModalSpecPage {
  page: SpecPage;
  constructor(page: SpecPage);
  get calciteModal(): ({
    el: HTMLCalciteModalElement;
    open: string;
    kind: string;
  });
  get cancelButton(): HTMLCalciteButtonElement;
  get confirmButton(): ({
    el: HTMLArcgisHubWorkspaceLinkElement;
    href: string;
  });
}
