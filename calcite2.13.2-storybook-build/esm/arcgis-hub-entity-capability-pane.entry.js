import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { b as bind } from './context-7d8f7366.js';
import { g as getGlobalContext, d as showNotice } from './state-31a09db0.js';
import { C as CONFIGURATION_VARIANTS } from './resources-3247991b.js';
import { g as getItemGroups } from './get-f0caeb52.js';
import { g as getTypeFromEntity } from './getTypeFromEntity-e149b61e.js';
import { g as getProp } from './get-prop-ec5be510.js';
import { a as cloneObject } from './util-3e6872d9.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { $ as getGroupPredicate } from './HubInitiatives-4f4e24ce.js';
import { s as setProp } from './set-prop-9a4aa9a9.js';
import { u as updateHubEntity } from './updateHubEntity-c9ae958c.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './tslib.es6-7023f322.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './request-fa80ae40.js';
import './append-custom-params-4bd856e5.js';
import './get-family-543fac52.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './generate-random-string-1436d9e6.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './deep-set-67281c6f.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './types-2eaa1a18.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './tslib.es6-9c17e83a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './edit-237c0a70.js';
import './get-form-json-1d4e3591.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './getDownloadFlow-6c6d04d5.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './getDownloadConfiguration-6cb6d32f.js';
import './types-303cd4d6.js';
import './shouldShowDownloadsConfiguration-385c6ff6.js';
import './edit-9f487804.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './edit-fa9666f2.js';
import './getPropertyMap-10ee9d61.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './defaults-1f93a79e.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './hubSearch-41612481.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';

/**
 * Return the base schema for an entity caoability
 * These are used to display the capability in the configuration editor, in the
 * capability's pane
 * @param groups
 * @param context
 * @returns
 */
function getCapabilityBaseSchemas(groups, context) {
  return {
    schema: {
      type: "object",
      properties: {
        enabled: {
          type: "boolean",
          default: "false"
        },
        groups: {
          type: "array",
          items: {
            type: "string"
          },
          default: groups
        }
      }
    },
    uiSchema: {
      type: "Layout",
      elements: [
        {
          label: "Enabled",
          // labelKey: "enabled",
          scope: "/properties/enabled",
          type: "Control"
        },
        {
          label: "Choose the groups to use as a source for the content",
          // labelKey: "groups",
          scope: "/properties/groups",
          type: "Control",
          options: {
            control: "hub-field-input-gallery-picker",
            targetEntity: "group",
            catalogs: [
              {
                schemaVersion: 1,
                title: "View Groups",
                scopes: {
                  group: {
                    targetEntity: "group",
                    filters: [
                      {
                        predicates: [
                          {
                            capabilities: {
                              not: [
                                "updateitemcontrol"
                              ]
                            }
                          }
                        ]
                      }
                    ]
                  }
                },
                collections: [
                  {
                    targetEntity: "group",
                    key: "viewGroups",
                    label: "viewGroups",
                    scope: {
                      targetEntity: "group",
                      filters: [
                        {
                          predicates: [
                            {
                              q: "*"
                            }
                          ]
                        }
                      ]
                    }
                  }
                ]
              }
            ],
            facets: [
              {
                label: "From",
                key: "from",
                display: "single-select",
                operation: "OR",
                options: [
                  {
                    label: "My groups",
                    key: "My groups",
                    selected: true,
                    predicates: [
                      {
                        owner: context.currentUser.username
                      }
                    ]
                  },
                  {
                    label: "My organization",
                    key: "My organization",
                    selected: false,
                    predicates: [
                      {
                        orgid: context.portal.id
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  };
}

async function getDefaultCapabilityConfig(options, context) {
  const cat = await getDefaultCapabilityCatalog(options, context);
  return {
    enabled: false,
    catalog: cat
  };
}
async function getDefaultCapabilityCatalog(options, context) {
  // Default to the entity's content catalog groups, if defined
  // let groups = getContentGroups(options.entity)
  // // if no groups are returned, then get the edit groups of the entity
  // if (!groups.length) {
  //   groups = (await getEntityEditGroups(options.entity, context))
  // }
  const groups = (await getEntityEditGroups(options.entity, context));
  // TODO: one option here is to check the content catalog's scope, and use that as that would work regardless of
  // how the catalog is defined (e.g. more than just groups, but also tags, etc.)
  const catalog = {
    schemaVersion: 1,
    title: "Content",
    scopes: {},
    collections: [
      {
        label: "All",
        key: "all",
        targetEntity: getEntityTypeForCapability(options.capability),
        include: [],
        scope: {
          targetEntity: getEntityTypeForCapability(options.capability),
          filters: []
        }
      },
    ]
  };
  const s = getScopeForCapability(options.capability, groups);
  catalog.scopes[getEntityTypeForCapability(options.capability)] = s;
  return catalog;
}
async function getEntityEditGroups(entity, context) {
  const allGroups = await getItemGroups(entity.id, context.requestOptions);
  const all = [...allGroups.admin, ...allGroups.member, ...allGroups.other];
  return all.filter(group => group.capabilities.includes('updateitemcontrol')).map(group => group.id);
}
// function getContentGroups(entity: HubEntity): string[] {
//   let groups = [];
//   const contentConfig = getProp(entity, "content") as IContentConfig;
//   if (contentConfig) {
//     // get the groups from the item scope
//     groups = getGroupPredicate(contentConfig.catalog.scopes.item).group?.any || [];
//   }
//   return groups;
// }
function getTypePredicate(capability) {
  let p = null;
  switch (capability) {
    case 'projects':
      p = { type: "Hub Project" };
      break;
    case 'initiatives':
      p = { type: "Hub Initiative" };
      break;
    case 'events':
      p = { type: "Hub Event" };
      break;
    case 'pages':
      p = { type: "Hub Page" };
      break;
    case "content":
      // Exclude the hub types
      // TODO: Need to implement this as a well-known predicate
      // which I attempted to do, but ran into two issues:
      // 1. When we replace the predicate, it does the entire object, losing the groups property
      // 2. When a predicate is replaced, hub.js forces the filter.operation to be "OR"
      // which results in `(group) OR (type)` but we need `(group AND type)`
      // To move ahead with the prototype, I'm hardcoding the type predicate here
      p = {
        type: {
          not: [
            "Hub Project",
            "Hub Initiative",
            "Hub Site Application",
            "Hub Event",
            "Hub Page",
            "Discussion",
          ],
        },
      };
      break;
  }
  return p;
}
function getScopeForCapability(capability, groups = []) {
  const scope = {
    targetEntity: getEntityTypeForCapability(capability),
    filters: [
      {
        predicates: [
          {
            group: {
              any: groups
            }
          },
        ]
      }
    ]
  };
  const typePredicate = getTypePredicate(capability);
  if (typePredicate) {
    typePredicate.group = { any: groups };
    scope.filters[0].predicates = [typePredicate]; //.push(typePredicate);// = {...scope.filters[0].predicates[0], ...typePredicate};
  }
  return scope;
}
/**
 * Given a capability, return the entity type used for the queries in the Catalog
 * @param capability
 * @returns
 */
function getEntityTypeForCapability(capability) {
  let type = "item";
  switch (capability) {
    case 'events':
      type = "event";
      break;
  }
  return type;
}

const arcgisHubEntityCapabilityPaneCss = ".sc-arcgis-hub-entity-capability-pane-h{display:block;height:100%}.title.sc-arcgis-hub-entity-capability-pane{display:flex;justify-content:space-between;align-items:center}.title.sc-arcgis-hub-entity-capability-pane h1.sc-arcgis-hub-entity-capability-pane{margin:0px;font-size:var(--calcite-font-size-3);line-height:2rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}calcite-tabs.sc-arcgis-hub-entity-capability-pane.sc-arcgis-hub-entity-capability-pane{height:-moz-fit-content;height:fit-content;width:100%}calcite-tab.sc-arcgis-hub-entity-capability-pane{padding-left:0.25rem;padding-right:0.25rem}";

const CATALOG_MODE = 'editGroups';
const ArcgisHubEntityCapabilityPane = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubEntityCapabilityPane.style = arcgisHubEntityCapabilityPaneCss;

export { ArcgisHubEntityCapabilityPane as arcgis_hub_entity_capability_pane };
