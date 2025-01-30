'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const resources = require('./resources-42021303.js');
const get = require('./get-0368c931.js');
const getTypeFromEntity = require('./getTypeFromEntity-9476954e.js');
const getProp = require('./get-prop-4bd8fc1a.js');
const util = require('./util-38e73510.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const setProp = require('./set-prop-3de2437f.js');
const updateHubEntity = require('./updateHubEntity-60b83b84.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./tslib.es6-e7faa7f3.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./request-67da3c71.js');
require('./append-custom-params-0f5d0fe2.js');
require('./get-family-cafa88bb.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./generate-random-string-8807d629.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./deep-set-49b373be.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./types-097b54b1.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./tslib.es6-b6cfa7d7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./edit-3df37e35.js');
require('./get-form-json-e6831b20.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./getDownloadFlow-94a34207.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./getDownloadConfiguration-1ed2582d.js');
require('./types-2810dd27.js');
require('./shouldShowDownloadsConfiguration-62f7f280.js');
require('./edit-fd85c003.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./edit-2b7ccc3f.js');
require('./getPropertyMap-030ec7b2.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./defaults-abee9bee.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./hubSearch-79d30702.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

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
  const allGroups = await get.getItemGroups(entity.id, context.requestOptions);
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
    index.registerInstance(this, hostRef);
    this.arcgisHubWorkspaceEntityChange = index.createEvent(this, "arcgisHubWorkspaceEntityChange", 7);
    this.handleFormChange = (evt) => {
      console.log('form changed', evt.detail);
    };
    this.capability = 'content';
    this.entity = undefined;
    this.isSaving = false;
    context.bind(this, 'translationFunc', 'handleFormSave', 'handleFormChange');
  }
  get entityType() {
    return getTypeFromEntity.getTypeFromEntity(this.entity);
  }
  get capabilityProp() {
    let prop = this.capability;
    if (this.capability === 'pages') {
      prop = 'pagescapability';
    }
    return prop;
  }
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    // only construct the default capability config if the entity does not have the capability
    if (!getProp.getProp(this.entity, this.capabilityProp)) {
      this.defaultConfig = await getDefaultCapabilityConfig({ capability: this.capability, mode: CATALOG_MODE, entity: this.entity }, this._context);
    }
  }
  translationFunc(key, values, opts) {
    return this.intl.t(key, values, opts);
  }
  get config() {
    return getProp.getProp(this.entity, this.capabilityProp) || util.cloneObject(this.defaultConfig);
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
    const hasPermission = checkPermission.checkPermission(permission, this._context, this.entity).access;
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
    const scope = getProp.getProp(this.catalog, `scopes.${scopeProp}`);
    const p = HubInitiatives.getGroupPredicate(scope);
    return ((_a = p.group) === null || _a === void 0 ? void 0 : _a.any) || [];
  }
  get schemas() {
    const v = getCapabilityBaseSchemas(this.catalogGroupIds, this._context);
    return v;
  }
  async handleFormSave(evt) {
    // map the values back into the entity
    const cat = util.cloneObject(this.catalog);
    const scopeProp = getEntityTypeForCapability(this.capability);
    cat.scopes[scopeProp].filters[0].predicates[0].group = evt.detail.groups;
    const config = {
      enabled: evt.detail.enabled,
      catalog: cat
    };
    setProp.setProp(this.capabilityProp, config, this.entity);
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
      this.entity = await updateHubEntity.updateHubEntity(this.entityType, this.entity, this._context);
      // render a success alert (calcite-alert in top right)
      state.showNotice({ title: this.intl.t('success'), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, kind: 'success', label: this.intl.t('formAlert') } });
      // TODO: Telemetry
    }
    catch (error) {
      console.error('Unable to save entity changes:', error);
      state.showNotice({ title: this.intl.t('error'), message: '', configuration: { noticeType: 'alert', autoClose: true, autoCloseDuration: 'fast', icon: true, label: this.intl.t('formAlert') } });
      // TODO: Telemetry
    }
    finally {
      this.isSaving = false;
    }
  }
  ;
  renderNotConfigured() {
    return (index.h("calcite-notice", { icon: "embark", open: true }, index.h("div", { slot: "message" }, this.intl.t(`${this.capability}.notConfigured`))));
  }
  renderCapabilityView() {
    // Render the capability view so it's consistent with what
    // we see in the "entity-view"
    return (index.h("arcgis-hub-entity-capability-view", { capability: this.capability, entity: this.entity }));
  }
  async handleEntityCreated(_evt) {
    // wait a little so we know the share has happened...
    console.info('waiting for share to complete');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.info('refreshing catalog after share');
    await this.catalogRef.refresh();
  }
  render() {
    return (index.h(index.Host, { "data-element": "content-capability-pane" }, index.h("arcgis-hub-workspace-pane", null, index.h("div", { class: "title", slot: "title" }, index.h("h1", null, this.intl.t(`${this.capability}.header`))), index.h("calcite-tabs", null, index.h("calcite-tab-nav", { slot: "title-group" }, index.h("calcite-tab-title", { selected: true }, this.intl.t(`${this.capability}.list`)), index.h("calcite-tab-title", null, this.intl.t(`${this.capability}.config`))), index.h("calcite-tab", { selected: true }, !this.isConfigured
      ? this.renderNotConfigured()
      : this.renderCapabilityView()), index.h("calcite-tab", null, index.h("arcgis-configuration-form", { isSaving: this.isSaving, layout: "sticky", onArcgisConfigurationFormChanged: this.handleFormChange, onArcgisConfigurationFormSaved: this.handleFormSave, schema: this.schemas.schema, t: this.translationFunc, uiSchema: this.schemas.uiSchema, values: this.values, variant: resources.CONFIGURATION_VARIANTS.workspace }))))));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
ArcgisHubEntityCapabilityPane.style = arcgisHubEntityCapabilityPaneCss;

exports.arcgis_hub_entity_capability_pane = ArcgisHubEntityCapabilityPane;
