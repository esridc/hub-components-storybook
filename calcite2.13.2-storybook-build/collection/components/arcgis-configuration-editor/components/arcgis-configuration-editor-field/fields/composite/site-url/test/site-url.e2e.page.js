import { BaseHubComponentPage } from "../../../../../../../../../test/e2e/utils";
export class SiteUrlPage extends BaseHubComponentPage {
  constructor() {
    super(...arguments);
    this._root = 'hub-composite-input-site-url';
  }
}
