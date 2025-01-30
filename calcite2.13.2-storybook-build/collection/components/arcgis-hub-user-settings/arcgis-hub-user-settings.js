import { Host, h } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { getGlobalContext, showNotice } from '../../utils/state';
import { settingsSchema, settingsUiSchema } from './schemas';
import { checkPermission } from '@esri/hub-common';
import { dictionary } from "@esri/telemetry-dictionary-hub";
import { bind } from '../../utils/context';
export class ArcgisHubUserSettings {
  constructor() {
    this.values = {};
    bind(this, 'translationFunc', 'handleEntityEditorChange', 'onAboutWorkspacesClick');
  }
  get context() {
    return getGlobalContext();
  }
  get showUserWorkspaceButton() {
    return checkPermission("hub:feature:workspace:user", this.context).access;
  }
  async handleEntityEditorChange(evt) {
    // Iterate the props on the values object
    Object.keys(evt.detail.values).forEach(key => {
      const currentValue = this.settings.preview[key];
      const newValue = evt.detail.values[key];
      // Only do work for things that have changed...
      if (newValue !== currentValue) {
        // Do we have telemetry defined for this key?
        if (dictionary.category.users.action.update.label[key]) {
          // Default to enabled
          let t = dictionary.category.users.action.update.label[key].details.enabled;
          if (newValue === false) {
            // but if the new value is false, use the disabled one
            t = dictionary.category.users.action.update.label[key].details.disabled;
          }
          // emit telemetry
          this.hubTelemetry.emit(t);
        }
        // update the value in the settings hash...
        this.settings.preview[key] = newValue;
      }
    });
    // store change to the settings hash. This should update the context
    let messagePrefix = `success`;
    try {
      await this.context.updateUserHubSettings(this.settings);
    }
    catch (_err) {
      messagePrefix = `fail`;
    }
    const notice = {
      title: this.intl.t(`${messagePrefix}Title`),
      message: "",
      configuration: {
        noticeType: 'alert',
        kind: messagePrefix === 'success' ? 'success' : 'danger',
        autoClose: true,
        autoCloseDuration: 'fast',
        label: this.intl.t(`${messagePrefix}Label`),
      }
    };
    showNotice(notice);
    this.userSettingsChange.emit();
    return;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (this.context) {
      this.settings = this.context.userHubSettings;
      if (!this.settings.preview) {
        this.settings.preview = {
          workspace: false
        };
      }
      // copy the settings into the values object
      Object.keys(this.settings.preview).forEach(key => {
        this.values[key] = this.settings.preview[key];
      });
    }
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  onAboutWorkspacesClick() {
    const whichNotice = this.context.hubLicense === 'hub-premium' ? '202404-aboutworkspaces-premium' : '202404-aboutworkspaces-basic';
    showNotice(whichNotice);
  }
  render() {
    return (h(Host, { "data-element": "user-settings", scale: "m" }, h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEntityEditorChange, schema: settingsSchema, t: this.translationFunc, uiSchema: settingsUiSchema, values: this.values }), h("div", { class: "user-settings-footer" }, this.showUserWorkspaceButton && h("calcite-button", { href: "/workspace/users/self" }, this.intl.t("viewWorkspace")), h("calcite-link", { onClick: this.onAboutWorkspacesClick }, this.intl.t("aboutWorkspaces")))));
  }
  static get is() { return "arcgis-hub-user-settings"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-user-settings.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-user-settings.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get events() {
    return [{
        "method": "hubTelemetry",
        "name": "hubTelemetry",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "userSettingsChange",
        "name": "userSettingsChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
