import { BaseHubComponentPage, newHubComponentPage, waitForAttributeEquals, waitForExists, waitForHasAttribute, waitForNotExists, waitForNotHasAttribute, waitForTextContentEquals, waitForTextContentMatches, waitForVisible } from "../../../../../../test/e2e/utils";
export class ArcgisConfigurationEditorFieldPage extends BaseHubComponentPage {
  constructor(page, options) {
    super(page, options);
    this._root = 'arcgis-configuration-editor-field';
    this._fieldConfig = options.config;
    this._root = `${this._root}[property="${options.config.propertyPath}"]`;
  }
  async initialize() {
    this.field = await newHubComponentPage(this._fieldConfig.page, this.page, Object.assign({ parent: this }, this._fieldConfig));
  }
  get _label() {
    return `${this._root} calcite-label span`;
  }
  get _messageContainer() {
    return `${this._root} .message-container`;
  }
  _getMessage(idx) {
    return `${this._messageContainer} calcite-input-message:nth-child(${idx})`;
  }
  async verifyExists() {
    await waitForExists(this.page, this.root);
  }
  async verifyNotExists() {
    await waitForNotExists(this.page, this.root);
  }
  async verifyDisabled() {
    await waitForHasAttribute(this.page, this.root, 'disabled');
  }
  async verifyNotDisabled() {
    await waitForNotHasAttribute(this.page, this.root, 'disabled');
  }
  async verifyRequired() {
    await waitForHasAttribute(this.page, this.root, 'required');
    await waitForTextContentMatches(this.page, this._label, new RegExp(/\*$/));
  }
  async verifyNoValidationMessages() {
    await waitForNotExists(this.page, this._messageContainer);
  }
  async verifyValidationMessages(messages) {
    await Promise.all(messages.map(async (config, idx) => {
      const message = this._getMessage(idx + 1);
      const status = {
        SUCCESS: 'valid',
        ERROR: 'invalid',
        CUSTOM: 'idle'
      }[config.type];
      await waitForVisible(this.page, message);
      await waitForAttributeEquals(this.page, message, 'status', status);
      if (config.message) {
        await waitForTextContentEquals(this.page, message, config.message);
      }
      if (config.icon) {
        let icon = config.type === "SUCCESS"
          ? 'check-circle'
          : config.message ? 'x-octagon' : 'exclamation-mark-circle';
        if (typeof config.icon === 'string') {
          icon = config.icon;
        }
        await waitForAttributeEquals(this.page, message, 'icon', icon);
      }
    }));
  }
}
