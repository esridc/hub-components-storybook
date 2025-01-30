import { E2EPage, E2EElement } from "@stencil/core/testing";
export declare class ArcgisMultilineEllipsisE2EPage {
  page: E2EPage;
  tagName: string;
  constructor(page: E2EPage);
  get root(): Promise<E2EElement>;
  get div(): Promise<E2EElement>;
  get link(): Promise<E2EElement>;
  get tooltip(): Promise<E2EElement>;
}
