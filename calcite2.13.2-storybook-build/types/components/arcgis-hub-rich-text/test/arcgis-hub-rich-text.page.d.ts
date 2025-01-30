import { E2EPage, E2EElement } from "@stencil/core/testing";
export declare class ArcgisHubRichTextE2EPage {
  page: E2EPage;
  tagName: string;
  constructor(page: E2EPage);
  get root(): Promise<E2EElement>;
  get toolbarItems(): Promise<E2EElement[]>;
  get content(): Promise<E2EElement>;
  get textarea(): Promise<E2EElement>;
  get label(): Promise<E2EElement>;
}
