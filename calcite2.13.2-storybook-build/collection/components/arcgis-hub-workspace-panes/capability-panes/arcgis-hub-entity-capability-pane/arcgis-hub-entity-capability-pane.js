import { Host, h } from '@stencil/core';
import intlManager from '../../../../utils/intl-manager';
import { bind } from '../../../../utils/context';
import { getTypeFromEntity, getGroupPredicate, cloneObject, checkPermission, updateHubEntity, getProp, setProp } from '@esri/hub-common';
import { getGlobalContext, showNotice } from '../../../../utils/state';
import { getCapabilityBaseSchemas } from '../../../../utils/workspace/capabilities/schemas';
import { CONFIGURATION_VARIANTS } from '../../../arcgis-configuration-editor/resources';
import { getDefaultCapabilityConfig, getEntityTypeForCapability } from './utils';
const CATALOG_MODE = 'editGroups';
export class ArcgisHubEntityCapabilityPane {
  constructor() {
    this.handleFormChange = (evt) => {
      console.log('form changed', evt.detail);
    };
    this.capability = 'content';
    this.entity = undefined;
    this.isSaving = false;
    bind(this, 'translationFunc', 'handleFormSave', 'handleFormChange');
  }
  get entityType() {
    return getTypeFromEntity(this.entity);
  }
  get capabilityProp() {
    let prop = this.capability;
    if (this.capability === 'pages') {
      prop = 'pagescapability';
    }
    return prop;
  }
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // only construct the default capability config if the entity does not have the capability
    if (!getProp(this.entity, this.capabilityProp)) {
      this.defaultConfig = await getDefaultCapabilityConfig({ capability: this.capability, mode: CATALOG_MODE, entity: this.entity }, this._context);
    }
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  get config() {
    return getProp(this.entity, this.capabilityProp) || cloneObject(this.defaultConfig);
  }
  get isConfigured() {
    return this.config.enabled;
  }
  get canCreate() {
    let permission = `hub:${this.capability}:create`;
    if (this.capability === 'events') {
      permission = 'hub:event:create';
    }
    if (this.capability === 'pages') {
      permission = 'hub:page:create';
    }
    const hasPermission = checkPermission(permission, this._context, this.entity).access;
    return hasPermission && this.isConfigured;
  }
  get catalog() {
    var _a;
    return (_a = this.config) === null || _a === void 0 ? void 0 : _a.catalog;
  }
  get values() {
    return {
      enabled: this.config.enabled,
      groups: this.catalogGroupIds
    };
  }
  /** At this point we are limiting the catalog to groups on the base level item scope */
  get catalogGroupIds() {
    var _a;
    const scopeProp = getEntityTypeForCapability(this.capability);
    const scope = getProp(this.catalog, `scopes.${scopeProp}`);
    const p = getGroupPredicate(scope);
    return ((_a = p.group) === null || _a === void 0 ? void 0 : _a.any) || [];
  }
  get schemas() {
    const v = getCapabilityBaseSchemas(this.catalogGroupIds, this._context);
    return v;
  }
  async handleFormSave(evt) {
    // map the values back into the entity
    const cat = cloneObject(this.catalog);
    const scopeProp = getEntityTypeForCapability(this.capability);
    cat.scopes[scopeProp].filters[0].predicates[0].group = evt.detail.groups;
    const config = {
      enabled: evt.detail.enabled,
      catalog: cat
    };
    setProp(this.capabilityProp, config, this.entity);
    // -------------------------------------------------------------------------
    // After discussions with Andrew on 4/30, we decided not to inject permissions
    // automatically, and rather move rapidly towards a "Permissions" pane, which can make recommendations
    // about what groups to add capability specific permissions. Leaving this code here for reference.
    // Set the permissions for hub:{capability}:create on the entity
    // to be limited to the members of the groups just configured on the catalog
    // const permission = `hub:${this.capability}:create`;
    // const otherPermissions = (this.entity.permissions || []).filter(p => p.permission !== permission)
    // // create new entries for this permission one for each group
    // const newPermissions = evt.detail.groups.map(g => ({ permission, collaborationType: 'group', collaborationId: g }));
    // this.entity.permissions = [...otherPermissions, ...newPermissions];
    // -------------------------------------------------------------------------
    try {
      this.isSaving = true;
      this.entity = await updateHubEntity(this.entityType, this.entity, this._context);
      // render a success alert (calcite-alert in top right)
      showNotice({ title: this.intl.t('success'), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this.intl.t('formAlert') } });
      // TODO: Telemetry
    }
    catch (error) {
      console.error('Unable to save entity changes:', error);
      showNotice({ title: this.intl.t('error'), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, label: this.intl.t('formAlert') } });
      // TODO: Telemetry
    }
    finally {
      this.isSaving = false;
    }
  }
  ;
  renderNotConfigured() {
    return (h("calcite-notice", { icon: "embark", open: true }, h("div", { slot: "message" }, this.intl.t(`${this.capability}.notConfigured`))));
  }
  renderCapabilityView() {
    // Render the capability view so it's consistent with what
    // we see in the "entity-view"
    return (h("arcgis-hub-entity-capability-view", { capability: this.capability, entity: this.entity }));
  }
  async handleEntityCreated(_evt) {
    // wait a little so we know the share has happened...
    console.info('waiting for share to complete');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.info('refreshing catalog after share');
    await this.catalogRef.refresh();
  }
  render() {
    return (h(Host, { "data-element": "content-capability-pane" }, h("arcgis-hub-workspace-pane", null, h("div", { class: "title", slot: "title" }, h("h1", null, this.intl.t(`${this.capability}.header`))), h("calcite-tabs", null, h("calcite-tab-nav", { slot: "title-group" }, h("calcite-tab-title", { selected: true }, this.intl.t(`${this.capability}.list`)), h("calcite-tab-title", null, this.intl.t(`${this.capability}.config`))), h("calcite-tab", { selected: true }, !this.isConfigured
      ? this.renderNotConfigured()
      : this.renderCapabilityView()), h("calcite-tab", null, h("arcgis-configuration-form", { isSaving: this.isSaving, layout: "sticky", onArcgisConfigurationFormChanged: this.handleFormChange, onArcgisConfigurationFormSaved: this.handleFormSave, schema: this.schemas.schema, t: this.translationFunc, uiSchema: this.schemas.uiSchema, values: this.values, variant: CONFIGURATION_VARIANTS.workspace }))))));
  }
  static get is() { return "arcgis-hub-entity-capability-pane"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-capability-pane.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-capability-pane.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "capability": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "HubCapability",
          "resolved": "\"content\" | \"discussions\" | \"events\" | \"initiatives\" | \"pages\" | \"projects\"",
          "references": {
            "HubCapability": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "capability",
        "reflect": false,
        "defaultValue": "'content'"
      },
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity",
          "resolved": "IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Since this is generic, we don't use interfaces\nwe will simply read/write props via getProp/setProp"
        }
      }
    };
  }
  static get states() {
    return {
      "isSaving": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisHubWorkspaceEntityChange",
        "name": "arcgisHubWorkspaceEntityChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "An event that is emitted when the workspace is saved"
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../../utils/workspace/types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get listeners() {
    return [{
        "name": "arcgisHubNewContentSuccess",
        "method": "handleEntityCreated",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
