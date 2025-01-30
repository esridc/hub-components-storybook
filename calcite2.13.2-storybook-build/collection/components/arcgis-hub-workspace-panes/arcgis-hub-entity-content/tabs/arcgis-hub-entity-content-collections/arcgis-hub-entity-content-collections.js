import { cloneObject, getTypeFromEntity, updateHubEntity } from '@esri/hub-common';
import { Host, h } from '@stencil/core';
import { bind } from '../../../../../utils/context';
import intlManager from '../../../../../utils/intl-manager';
import { getGlobalContext } from '../../../../../utils/state';
export class ArcgisHubEntityContentCollections {
  constructor() {
    this.entity = undefined;
    this.footerSlotRef = undefined;
    this.configurableCollections = undefined;
    this.isSaving = false;
    this.isDirty = false;
    this.saveOperationAlert = null;
    bind(this, 'translationFunction', 'saveCollectionConfiguration', 'handleConfigEditorChange');
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.setConfigurableCollections();
    this.setSortableListSchema();
  }
  setSortableListSchema() {
    this.sortableListSchema = {
      type: 'object',
      properties: {
        collections: {
          type: "array",
          items: {
            type: "object",
          }
        },
      }
    };
    this.sortableListUiSchema = {
      type: 'Section',
      options: {
        "section": "card",
      },
      elements: [
        {
          scope: '/properties/collections',
          type: 'Control',
          options: {
            control: 'hub-field-input-list',
            allowEdit: true,
            allowHide: true,
            allowReorder: true,
            allowRemove: false,
          }
        }
      ],
    };
  }
  setConfigurableCollections() {
    // Users cannot modify the "All" collection, so we remove it from our displayed list
    const collectionsWithoutAll = this.entity.catalog.collections.filter(c => c.key !== 'all');
    this.configurableCollections = cloneObject(collectionsWithoutAll);
  }
  /**
   * Convert IHubCollectionsPersistance to IListItem
   */
  get configurableCollectionsListItems() {
    return this.configurableCollections.map(c => ({
      key: c.key,
      label: c.label || this.intl.t(`collections.${c.key}`),
      hidden: c.hidden,
    }));
  }
  // This function is needed so we can bind `this` before
  // passing it in to the `arcgis-configuration-form`
  translationFunction(key) {
    return this.intl.t(key);
  }
  async saveCollectionConfiguration() {
    const toUpdate = cloneObject(this.entity);
    const collectionsToUpdated = cloneObject(this.configurableCollections);
    // Because the `All` collection is excluded from the `configurableCollections`
    // list we have to manually add it back in here
    const allCollection = toUpdate.catalog.collections.find(c => c.key === 'all');
    toUpdate.catalog.collections = allCollection ? [allCollection, ...collectionsToUpdated] : collectionsToUpdated;
    try {
      this.isSaving = true;
      const entityType = getTypeFromEntity(toUpdate);
      const updated = await updateHubEntity(entityType, toUpdate, getGlobalContext());
      this.triggerSaveOperationAlert('success');
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: updated,
        isDirty: false,
      });
    }
    catch (err) {
      this.triggerSaveOperationAlert('failure');
      this.arcgisHubWorkspaceEntityChange.emit({
        entity: toUpdate,
        isDirty: true,
      });
    }
    finally {
      this.isSaving = false;
    }
  }
  async triggerSaveOperationAlert(type) {
    const title = type === 'success'
      ? this.intl.t('alertMessages.success')
      : this.intl.t('alertMessages.error');
    const kind = type === 'success' ? 'success' : 'danger';
    this.saveOperationAlert = (h("calcite-alert", { autoClose: true, autoCloseDuration: "fast", icon: true, kind: kind, label: this.intl.t('formAlert'), open: true, placement: "top-end" }, h("div", { slot: "title" }, title)));
    // re-set the alert after it auto-closes
    setTimeout(() => {
      this.saveOperationAlert = null;
    }, 6000);
  }
  /**
   * Convert IListItem to IHubCollectionsPersistance and update the state
   * @param event
   */
  handleConfigEditorChange(event) {
    this.isDirty = true;
    this.arcgisHubWorkspaceEntityChange.emit({
      entity: this.entity,
      isDirty: this.isDirty,
    });
    const updatedCollections = event.detail.values.collections;
    // Update the state with the new values
    this.configurableCollections = updatedCollections.map(updatedCollection => {
      // Find the collection in the state that matches the updated collection using their unique keys
      const collection = this.configurableCollections.find(cc => cc.key === updatedCollection.key);
      return Object.assign(Object.assign({}, collection), { label: updatedCollection.label, hidden: updatedCollection.hidden });
    });
  }
  renderListControl() {
    return h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handleConfigEditorChange, schema: this.sortableListSchema, t: this.translationFunction, uiSchema: this.sortableListUiSchema, values: { collections: this.configurableCollectionsListItems } });
  }
  render() {
    return (h(Host, { "data-element": "entity-content-collections" }, this.saveOperationAlert, h("h3", null, this.intl.t('title')), h("section", null, h("h4", null, this.intl.t('sections.collectionConfiguration.title')), this.renderListControl()), h("arcgis-wormhole", { styles: { position: 'relative' }, target: this.footerSlotRef }, h("calcite-button", { disabled: this.isSaving || !this.isDirty, loading: this.isSaving, onClick: this.saveCollectionConfiguration, round: true }, this.intl.t('saveButton')))));
  }
  static get is() { return "arcgis-hub-entity-content-collections"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-content-collections.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-content-collections.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntityWithCatalog",
          "resolved": "IHubDiscussion & IWithCatalog | IHubEvent & IWithCatalog | IHubGroup & IWithCatalog | IHubInitiative & IWithCatalog | IHubPage & IWithCatalog | IHubProject & IWithCatalog | IHubSite & IWithCatalog | IHubSurvey & IWithCatalog | IHubTemplate & IWithCatalog | IHubUser & IWithCatalog",
          "references": {
            "HubEntityWithCatalog": {
              "location": "import",
              "path": "../../types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "footerSlotRef": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HTMLElement",
          "resolved": "HTMLElement",
          "references": {
            "HTMLElement": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "configurableCollections": {},
      "isSaving": {},
      "isDirty": {},
      "saveOperationAlert": {}
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
          "text": ""
        },
        "complexType": {
          "original": "IWorkspaceEntityChange",
          "resolved": "IWorkspaceEntityChange",
          "references": {
            "IWorkspaceEntityChange": {
              "location": "import",
              "path": "../../../../../utils/workspace/types"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "entity",
        "methodName": "setConfigurableCollections"
      }];
  }
}
