import { camelize, capitalize, getContentTypeIcon, getStructuredLicense, getTypeFromEntity } from '@esri/hub-common';
import { Host, h, Fragment } from '@stencil/core';
import intlManager from '../../utils/intl-manager';
import { getAccessIcon } from '../../utils/get-access-icon';
import { formatBytes } from '../../utils/media-gallery-utils';
export class ArcgisHubEntityMetadata {
  constructor() {
    /**
     * Default lists of metadata for entity types
     */
    this.defaultMetadataList = ['owner', 'access', 'createdDate', 'updatedDate', 'location'];
    this.templateMetadataList = ['type', 'updatedDate', 'createdDate', 'access', 'license'];
    this.initiativeTemplateMetadataList = ['type', 'updatedDate', 'createdDate', 'access', 'license'];
    this.groupMetadataList = ['access', 'members', 'createdDate'];
    this.userMetadataList = ['createdDate', 'access'];
    // not including `status` anymore
    this.surveyMetadataList = ['type', 'updatedDate', 'createdDate', 'access', 'license'];
    this.entity = undefined;
    this.exclude = [];
    this.additionalMetadata = [];
    this.listHeader = undefined;
    this.headingLevel = 2;
    this.hasMapFooterSlot = false;
    this.openModal = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.hasMapFooterSlot = !!this.element.querySelector('.content-media');
  }
  /**
   * Format a date for metadata display
   * @param date
   * @param precision
   * @returns
   */
  formatMetadataDate(date, precision) {
    // first make sure we have a date
    const dateObj = new Date(date);
    // copied over from content-types.js
    const precisionToFormatMap = {
      year: {
        year: 'numeric'
      },
      month: {
        month: 'short',
        year: 'numeric'
      },
      day: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      time: {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        minute: 'numeric',
        hour: 'numeric',
        // although second and timezone are new additions -- it was requested we make this as specific as possible
        second: 'numeric',
        timeZoneName: 'short'
      }
    };
    const format = precisionToFormatMap[precision] || { year: 'numeric', month: 'short', day: 'numeric' };
    return this.intl.formatDate(dateObj, format);
  }
  get licenseModal() {
    return {
      id: '20241115-entity-metadata-license-modal',
      configuration: {
        noticeType: 'modal',
        kind: 'info',
        scale: 'm',
      },
      title: 'License',
      // TODO: add license info to IHubEntity...
      message: this.entity.licenseInfo,
    };
  }
  /**
   * Return the entity's true type
   */
  get _entityType() {
    // this.entity may be an IHubContent instead of an actual entity, so we need to do these extra checks
    if (this.entity.type === 'team') {
      return 'group';
    }
    ;
    // another issue, `getTypeFromEntity` doesn't account for capitalization of types
    // Ember is passing in "user" instead of "User"
    if (this.entity.type === 'user') {
      return 'user';
    }
    ;
    // here's another we were handling in ember in a funny way
    if (this.entity.type === 'survey') {
      return 'content';
    }
    ;
    return getTypeFromEntity(this.entity);
  }
  /**
   * Get the metadata items for the access metadata field
   */
  get accessMetadataItem() {
    var _a;
    const access = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.access;
    const fallback = this.intl.t(`access.description.${access}.default`);
    return !!access
      ? {
        icon: getAccessIcon(access),
        title: this.intl.t(`access.label.${access}`),
        // TODO: once sites and initiatives are decoupled,
        // make sure the type for initiative is "initiative" instead of "site"
        description: {
          value: this.intl.t(`access.description.${access}.${this._entityType}`, undefined, { fallback })
        },
        type: 'access'
      }
      : undefined;
  }
  /**
   * Get the metadata items for the created date metadata field
   */
  get createdDateMetadataItem() {
    var _a, _b;
    // We can remove the second part of this for templates once the `createdDate` field 
    // is added to the /templates/:id/about route
    const createdDate = ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.createdDate) || ((_b = this.entity) === null || _b === void 0 ? void 0 : _b.created);
    return createdDate
      ? {
        icon: 'calendar',
        // TODO: add publishedDatePrecision info to IHubEntity...
        title: this.formatMetadataDate(createdDate, this.entity.publishedDatePrecision),
        description: {
          value: this.intl.t(`${this._entityType === 'user' ? 'joinedDate' : 'createdDate'}.description`)
        },
        type: 'createdDate'
      }
      : undefined;
  }
  /**
   * Get the metadata items for the updated date metadata field
   */
  get updatedDateMetadataItem() {
    var _a, _b;
    // We can remove the second part of this for templates once the `updatedDate` field 
    // is added to the /templates/:id/about route
    const updatedDate = ((_a = this.entity) === null || _a === void 0 ? void 0 : _a.updatedDate) || ((_b = this.entity) === null || _b === void 0 ? void 0 : _b.modified);
    if (!updatedDate) {
      return;
    }
    let title;
    let description;
    // TODO: add updateFrequency and updatedDatePrecision info to IHubEntity
    const { updateFrequency, updatedDatePrecision } = this.entity;
    const updatedDateFormatted = this.formatMetadataDate(updatedDate, updatedDatePrecision);
    if (updateFrequency) {
      // if a frequency is set, we display
      // title = frequency name like Monthly, Weekly, etc.
      // description = "Updated date: <date>"
      title = this.intl.t(`updateFrequency.${updateFrequency}`);
      description = this.intl.t('updatedDate.descriptionWithFrequency', { updatedDateFormatted: updatedDateFormatted });
    }
    else {
      // if a frequency is NOT set, we display
      // title = <last updated date>
      // description = "Updated date"
      title = updatedDateFormatted;
      description = this.intl.t('updatedDate.description');
    }
    return {
      icon: 'clock-forward',
      title: title,
      description: {
        value: description
      },
      type: 'updatedDate'
    };
  }
  /**
   * Get the metadata items for the owner field
   * Note: we are not really rendering an "owner" icon,
   * we use it as an identifier here for so we can render
   * a calcite avatar instead of a calcite icon for owners
   */
  get ownerMetadataItem() {
    var _a;
    const owner = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.owner;
    return !!owner
      ? {
        icon: 'owner',
        title: owner,
        description: {
          value: this.intl.t('owner.description')
        },
        type: 'owner'
      }
      : undefined;
  }
  /**
   * Get the metadata items for the type field
   */
  get typeMetadataItem() {
    const type = this.entity.type;
    let title = this.intl.t(`type.${camelize(type)}`);
    if (title.includes('arcgis-hub-entity-metadata')) {
      // If the title is not found in translations, we need to have a fall
      // back to avoid showing an untranslated string/key.
      // Fallback strings are meant to be very generic.
      // Please include fallbacks strings in the translations file for any new HubEntityType.
      title = this.intl.t(`type.fallback.${this._entityType}`);
    }
    return !!type
      ? {
        icon: getContentTypeIcon(type),
        title: title,
        description: {
          value: capitalize(type)
        },
        type: 'type'
      }
      : undefined;
  }
  /**
   * Get the metadata items for the license field. This includes a link to more details and a tooltip!
   */
  get licenseMetadataItem() {
    // TODO: add licenseInfo to IHubEntity
    const structuredLicense = getStructuredLicense(this.entity.licenseInfo);
    let title;
    let description;
    if (structuredLicense.type === 'none') {
      // use the unset title and description
      title = this.intl.t('license.unset.title');
      description = { value: this.intl.t('license.unset.description.value') };
    }
    else if (structuredLicense.type === 'custom') {
      // use the custom title and description
      title = this.intl.t('license.set.customTitle');
      description = {
        value: this.intl.t('license.set.description.value'),
        modal: this.licenseModal // open the license in a modal!
      };
    }
    else {
      // use the structured license title and description
      const version = structuredLicense.type.split('-').reverse()[0];
      title = this.intl.t('license.set.title', {
        license: !(structuredLicense === null || structuredLicense === void 0 ? void 0 : structuredLicense.abbr.endsWith(version))
          // The STANDARD_LICENSES array in hub.js has a number of licenses that have abbreviations
          // that do NOT match the license abbreviations we used to show in the Ember routes. For
          // consistency, we need to append the version number (aka the last three digits)
          // to these mis-matched abbreviations. 
          // NOTE: We CANNOT modify the STANDARD_LICENSES array since the we are currently unable to bump hub.js
          // in the indexer, and we don't want the FE and BE to fall out of sync and cause further confusion.
          ? `${structuredLicense.abbr} ${version}`
          : structuredLicense.abbr
      });
      description = {
        value: this.intl.t('license.set.description.value'),
        link: {
          url: structuredLicense.url,
          target: '_blank',
          iconEnd: 'launch'
        }
      };
    }
    return !!structuredLicense
      ? {
        icon: 'lock',
        title: title,
        description: description,
        tooltip: this.intl.t('license.tooltip'),
        type: 'license'
      }
      : undefined;
  }
  /**
   * Get the metadata items for the location field, returning a location name if it exists
   */
  get locationMetadataItem() {
    var _a, _b, _c, _d, _e;
    // TODO: add location to IHubEntity
    const location = (_b = (_a = this.entity.location) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_e = (_d = (_c = this.entity.item) === null || _c === void 0 ? void 0 : _c.properties) === null || _d === void 0 ? void 0 : _d.location) === null || _e === void 0 ? void 0 : _e.name;
    return !!location
      ? {
        icon: 'pin',
        title: location,
        description: {
          value: this.intl.t('location.description')
        },
        type: 'location'
      }
      : undefined;
  }
  /**
   * Get the metadata items for the size field
   */
  get sizeMetadataItem() {
    // TODO: add size to IHubEntity
    const size = this.entity.size;
    return !!size
      ? {
        title: formatBytes(size),
        description: {
          value: this.intl.t('size.description.value'), // only "document" types will show this! -- so we always show "Document file size"
        },
        icon: 'file',
        type: 'size'
      }
      : undefined;
  }
  /**
   * Get the metadata items for the members field
   */
  get membersMetadataItem() {
    // TODO: for someone else to resolve in another ticket -- bug where memberCount isn't being passed in with entity for some reason in workspaces
    // copying logic from gallery-picker.tsx
    // TODO: add memberCount to IHubEntity
    const memberCount = this.entity.memberCount;
    let titleToRender;
    if (memberCount === 0) {
      titleToRender = this.intl.t('members.noMember');
    }
    else if (memberCount === 1) {
      titleToRender = this.intl.t('members.oneMember');
    }
    else {
      titleToRender = this.intl.t('members.members', { count: memberCount });
    }
    return {
      title: titleToRender,
      description: {
        value: this.intl.t('members.description.value'),
        link: {
          url: `/groups/${this.entity.id}/members`,
        },
      },
      icon: 'users',
      type: 'members'
    };
  }
  /**
   * Get the metadata items for the record count field. Will not show if the record count is not set.
   */
  get recordCountMetadataItem() {
    // TODO: add recordCount to IHubEntity
    const recordCount = this.entity.recordCount;
    const hasRecordCount = recordCount !== undefined && recordCount !== null;
    return hasRecordCount
      ? {
        title: this.intl.t('recordCount.title', { count: recordCount }),
        description: {
          value: this.intl.t('recordCount.description.value'),
          link: {
            url: `/datasets/${this.entity.id}/explore?showTable=true`,
          },
        },
        icon: 'tables',
        type: 'recordCount'
      }
      : undefined;
  }
  get metadataModifiedMetadataItem() {
    // TODO: add metadataUpdatedDate, metadataUpdatedDatePrecision, and metadataUpdateFrequency to IHubEntity
    const { metadataUpdatedDate, metadataUpdatedDatePrecision, metadataUpdateFrequency } = this.entity;
    // get the last time the metadata was updated
    const lastUpdated = this.formatMetadataDate(metadataUpdatedDate, metadataUpdatedDatePrecision);
    // if there is no last updated date, return nothing
    if (!lastUpdated) {
      return;
    }
    const defaultDescription = this.intl.t('metadataModified.description.defaultValue');
    // if there is a metadataUpdateFrequency, return the metadata item with the frequency
    return metadataUpdateFrequency
      ? {
        title: this.intl.t(`updateFrequency.${metadataUpdateFrequency}`),
        description: {
          value: this.intl.t(`metadataModified.description.dynamicValue`, { lastUpdated: lastUpdated }),
        },
        icon: 'information',
        type: 'metadataModified'
      }
      : {
        title: lastUpdated,
        description: {
          value: defaultDescription,
        },
        icon: 'information',
        type: 'metadataModified'
      };
  }
  /**
   * A list of metadata to render for the content type
   */
  get contentMetadataList() {
    // different sub-types of content get different metadata
    // TODO: add a `subtype` field to IHubContent
    switch (this.entity.family) {
      case 'document':
        return ['type', 'updatedDate', 'createdDate', 'size', 'access', 'license'];
      case 'dataset': // needs metadata modified
        return ['type', 'metadataModified', 'updatedDate', 'createdDate', 'recordCount', 'access', 'license'];
      case 'team':
        return this.groupMetadataList;
      case 'map': // leaving this in for posterity, but map and the default lists were the same in Ember
      default:
        return ['type', 'updatedDate', 'createdDate', 'access', 'license'];
    }
  }
  /**
   * A list of metadata items to render,
   * if exclude is pass, exclude the metadata in that list
   */
  get metadata() {
    var _a;
    // NOTE: if your entity requires a specific set of metadata
    // define a <entityType>MetadataList getter that overrides the defaults
    const metadataList = this[`${this._entityType}MetadataList`] || this.defaultMetadataList;
    const exclude = ((_a = this.exclude) === null || _a === void 0 ? void 0 : _a.length) ? this.exclude : [];
    return metadataList.reduce((metadata, type) => {
      if (!exclude.includes(type)) {
        const metadataItem = this[`${type}MetadataItem`];
        if (metadataItem) {
          metadata.push(metadataItem);
        }
      }
      return metadata;
    }, []);
  }
  ;
  /**
   * Render a calcite avatar for owner and a calcite icon for all other metadata
   * TODO: add fullname and thumbnail props to the calcite-avatar once we have access to them
   */
  renderIcon(metadata) {
    var _a;
    // this wrapping div is needed because calcite-avatar and calcite-icon, 
    // while being the same scale, do not have the same width
    return metadata.icon === 'owner'
      ? h("calcite-avatar", { scale: 's', username: (_a = this.entity) === null || _a === void 0 ? void 0 : _a.owner })
      : h("calcite-icon", { icon: metadata === null || metadata === void 0 ? void 0 : metadata.icon, scale: "m" });
  }
  /**
   * Render the description of the metadata item, which can contain a link, modal, or just text (see IMetadataItem)
   * @param metadata the IMetadataItem to render
   * @returns a calcite-link or a span
   */
  renderDescription(metadata) {
    var _a, _b;
    if (!(metadata === null || metadata === void 0 ? void 0 : metadata.description)) {
      return; // return nothing
    }
    else if ((_a = metadata.description) === null || _a === void 0 ? void 0 : _a.link) {
      // return a link
      // ex: any item with a license that is one we can link to further documentation AND is not a custom license
      return h("calcite-link", { class: `metadata-item-description ${metadata === null || metadata === void 0 ? void 0 : metadata.type}`, href: metadata.description.link.url, iconEnd: metadata.description.link.iconEnd, iconStart: metadata.description.link.iconStart, target: metadata.description.link.target }, metadata.description.value);
    }
    else if ((_b = metadata.description) === null || _b === void 0 ? void 0 : _b.modal) {
      // return a modal
      // ex: any item with a custom license
      const linkOnClick = () => { this.openModal = metadata.description.modal.id; };
      const onCalciteDialogClose = () => { this.openModal = undefined; };
      // TODO: this is not a11y friendly until we have the tab index reset to the link used to open the modal
      // an example of where we do this correctly is with the explore feeds modal buttons that open a modal,
      // and reset the tab index to the buttons once the modal is closed
      return h(Fragment, null, h("calcite-link", { class: `metadata-item-description ${metadata === null || metadata === void 0 ? void 0 : metadata.type}`, onClick: linkOnClick }, metadata.description.value), h("arcgis-wormhole", null, h("calcite-dialog", { heading: metadata.description.modal.title, modal: true, onCalciteDialogClose: onCalciteDialogClose, open: this.openModal === metadata.description.modal.id }, metadata.description.modal.message && h("div", { innerHTML: metadata.description.modal.message }))));
    }
    else {
      // return plaintext
      // ex: any item with a description that is just text
      return h("span", { class: `metadata-item-description ${metadata === null || metadata === void 0 ? void 0 : metadata.type}` }, metadata.description.value);
    }
  }
  /**
   * Render the title of the metadata item
   * @param metadata the IMetadataItem to render
   * @returns a div
   */
  renderTitle(metadata) {
    return h("div", { class: `metadata-item-title ${metadata === null || metadata === void 0 ? void 0 : metadata.type}` }, metadata.title);
  }
  /**
   * Render a single metadata item in the metadata field
   * @param metadata entity medadata
   */
  renderMetadataItem(metadata, id) {
    // can't use calcite-list because that'd regress the design
    // can't use calcite-block because that'd regress the ability to put a link in the description
    return (h(Fragment, null, metadata.tooltip &&
      h("calcite-tooltip", { label: this.intl.t('tooltip.label'), "reference-element": `metadata-item-${id}` }, h("span", null, metadata.tooltip)), h("li", { class: "metadata-item", "data-test": `metadata-item-${id}`, key: id }, this.renderIcon(metadata), h("div", { class: "metadata-item-text-column" }, this.renderTitle(metadata), this.renderDescription(metadata)))));
  }
  /**
   * Render the footer of the metadata list
   * @returns a IMetadataItem for the map-footer slot (slot included in returned node)
   */
  renderFooter() {
    return h(Fragment, null, this.hasMapFooterSlot && this.renderMetadataItem({
      title: this.intl.t('relevantArea.title'),
      icon: "pin"
    }, "map-footer"), h("slot", { name: "map-footer" }));
  }
  render() {
    // set the heading level, default to h2
    const HeadingTag = `h${this.headingLevel}`;
    // combine the metadata and additionalMetadata for unique key purposes
    const metadataItems = [...this.metadata, ...this.additionalMetadata];
    return h(Host, { "data-element": 'entity-metadata' }, this.listHeader && h(HeadingTag, { class: "metadata-list-header" }, this.listHeader), h("ul", { class: "entity-metadata-list" }, h("slot", null), metadataItems.map((metadataItem, index) => this.renderMetadataItem(metadataItem, index)), this.renderFooter()));
  }
  static get is() { return "arcgis-hub-entity-metadata"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["arcgis-hub-entity-metadata.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["arcgis-hub-entity-metadata.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "entity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubEntity | IHubContent",
          "resolved": "IHubContent | IHubDiscussion | IHubEvent | IHubGroup | IHubInitiative | IHubPage | IHubProject | IHubSite | IHubSurvey | IHubTemplate | IHubUser",
          "references": {
            "HubEntity": {
              "location": "import",
              "path": "@esri/hub-common"
            },
            "IHubContent": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "HubEntity Definition Json object"
        }
      },
      "exclude": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "metadataType[]",
          "resolved": "metadataType[]",
          "references": {
            "metadataType": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "A list of the metadata to exclude"
        },
        "defaultValue": "[]"
      },
      "additionalMetadata": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IMetadataItem[]",
          "resolved": "IMetadataItem[]",
          "references": {
            "IMetadataItem": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Configure additional metadata items to display below the default metadata items. See IMetadataItem[]."
        },
        "defaultValue": "[]"
      },
      "listHeader": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The text for the list header"
        },
        "attribute": "list-header",
        "reflect": false
      },
      "headingLevel": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "HeadingLevel",
          "resolved": "1 | 2 | 3 | 4 | 5 | 6",
          "references": {
            "HeadingLevel": {
              "location": "import",
              "path": "@esri/calcite-components"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The heading level of the list header, default is 2"
        },
        "attribute": "heading-level",
        "reflect": false,
        "defaultValue": "2"
      }
    };
  }
  static get states() {
    return {
      "hasMapFooterSlot": {},
      "openModal": {}
    };
  }
  static get elementRef() { return "element"; }
}
