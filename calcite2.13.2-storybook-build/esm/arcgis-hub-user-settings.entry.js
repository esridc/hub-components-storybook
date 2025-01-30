import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getGlobalContext, d as showNotice } from './state-31a09db0.js';
import { d as dist } from './index-dd3f99ac.js';
import { b as bind } from './context-7d8f7366.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './_commonjsHelpers-11ca3be1.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';

/**
 * Schema for the ArcGIS Hub User Settings component
 */
const settingsSchema = {
  type: 'object',
  properties: {
    workspace: {
      type: 'boolean',
      default: false,
    },
  },
};
/**
 * UI Schema for the ArcGIS Hub User Settings component
 */
const settingsUiSchema = {
  type: 'Layout',
  elements: [
    {
      labelKey: 'workspaceLabel',
      scope: '/properties/workspace',
      type: 'Control',
      options: {
        control: 'hub-field-input-switch',
        helperText: {
          labelKey: 'workspaceHelper',
          placement: 'bottom',
        },
        scale: 'm',
      },
    },
  ],
};

const arcgisHubUserSettingsCss = ":host{display:block}.user-settings-footer{display:flex;width:-moz-fit-content;width:fit-content;flex-direction:column;gap:0.25rem}";

const ArcgisHubUserSettings = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.userSettingsChange = createEvent(this, "userSettingsChange", 7);
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
        if (dist.dictionary.category.users.action.update.label[key]) {
          // Default to enabled
          let t = dist.dictionary.category.users.action.update.label[key].details.enabled;
          if (newValue === false) {
            // but if the new value is false, use the disabled one
            t = dist.dictionary.category.users.action.update.label[key].details.disabled;
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubUserSettings.style = arcgisHubUserSettingsCss;

export { ArcgisHubUserSettings as arcgis_hub_user_settings };
