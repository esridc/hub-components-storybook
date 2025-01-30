import { HubComponentPage, HubComponentPageConstructor } from '../types';
import { E2EPage } from '@stencil/core/testing/puppeteer/puppeteer-declarations';
declare class BaseHubComponentPage implements HubComponentPage {
  page: E2EPage;
  protected _prefix?: string;
  protected _root: string;
  constructor(page: E2EPage, options?: {
    parent?: HubComponentPage;
    shadow?: boolean;
  });
  initialize(): Promise<void>;
  get root(): string;
}
export default BaseHubComponentPage;
export declare const newHubComponentPage: <T extends HubComponentPage>(Constructor: HubComponentPageConstructor<T>, page: E2EPage, options?: {
  [key: string]: any;
  parent?: HubComponentPage;
  shadow?: boolean;
}) => Promise<T>;
