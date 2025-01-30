'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const state = require('./state-6637df8c.js');
const index$1 = require('./index-6f16fe65.js');
const context = require('./context-0167a31e.js');
const checkPermission = require('./checkPermission-11ab5992.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');

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
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.userSettingsChange = index.createEvent(this, "userSettingsChange", 7);
    this.values = {};
    context.bind(this, 'translationFunc', 'handleEntityEditorChange', 'onAboutWorkspacesClick');
  }
  get context() {
    return state.getGlobalContext();
  }
  get showUserWorkspaceButton() {
    return checkPermission.checkPermission("hub:feature:workspace:user", this.context).access;
  }
  async handleEntityEditorChange(evt) {
    // Iterate the props on the values object
    Object.keys(evt.detail.values).forEach(key => {
      const currentValue = this.settings.preview[key];
      const newValue = evt.detail.values[key];
      // Only do work for things that have changed...
      if (newValue !== currentValue) {
        // Do we have telemetry defined for this key?
        if (index$1.dist.dictionary.category.users.action.update.label[key]) {
          // Default to enabled
          let t = index$1.dist.dictionary.category.users.action.update.label[key].details.enabled;
          if (newValue === false) {
            // but if the new value is false, use the disabled one
            t = index$1.dist.dictionary.category.users.action.update.label[key].details.disabled;
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
    state.showNotice(notice);
    this.userSettingsChange.emit();
    return;
  }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
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
    state.showNotice(whichNotice);
  }
  render() {
    return (index.h(index.Host, { "data-element": "user-settings", scale: "m" }, index.h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleEntityEditorChange, schema: settingsSchema, t: this.translationFunc, uiSchema: settingsUiSchema, values: this.values }), index.h("div", { class: "user-settings-footer" }, this.showUserWorkspaceButton && index.h("calcite-button", { href: "/workspace/users/self" }, this.intl.t("viewWorkspace")), index.h("calcite-link", { onClick: this.onAboutWorkspacesClick }, this.intl.t("aboutWorkspaces")))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubUserSettings.style = arcgisHubUserSettingsCss;

exports.arcgis_hub_user_settings = ArcgisHubUserSettings;
