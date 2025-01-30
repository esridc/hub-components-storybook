var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Fragment, h, Host } from '@stencil/core';
import intlManager from '../../../../../../../utils/intl-manager';
import { getGlobalContext, interpolateTranslations } from '../../../../../../../utils';
import { LINK_SCHEMA, SECITON_SCHEMA, SECTION_UI_SCHEMA, buildLinkUiSchema } from './schemas';
import Memoize from '../../../../../../../decorators/memoize';
import { cloneObject, createId, deepFind, deepFilter, hubSearch } from '@esri/hub-common';
import { buildQueryFromGallerySelection } from '../../../../../../../utils/build-query-from-gallery-selection';
/**
 * This component is for configuring action links. Action
 * links can be configured as buttons or blocks.
 *
 * Note: this can be used as a standalone component
 * or within the context of a configuration editor.
 */
export class ActionLinks {
  constructor() {
    this._linkSchema = cloneObject(LINK_SCHEMA);
    this._sectionSchema = cloneObject(SECITON_SCHEMA);
    this._sectionUiSchema = cloneObject(SECTION_UI_SCHEMA);
    /**
     * helper util to recursively traverse an array of
     * links and find one by its unique key
     */
    this.findLinkByKey = (key, links = this._links) => {
      const p = (link) => (link === null || link === void 0 ? void 0 : link.key) === key;
      return deepFind(links, p);
    };
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this.intl.t(key, values, opts);
    };
    /**
     * we keep track of any changes made to a link that's
     * being edited before the "save" button is clicked.
     * This resets the internal state to effectively
     * discard the changes and collapse the open editor
     */
    this.resetUnsavedChanges = () => {
      this._unsavedChanges = [...this._links];
      this._editKey = undefined;
      this._showDeleteWarning = false;
    };
    /**
     * Function to set the internal _href property on a content link to allow the user
     * to preview the link in the editing experience
     * @param link
     * @returns
     */
    this.setInternalLinkHref = async (link) => {
      var _a, _b, _c;
      link._href = "";
      // only if we have a contentId, search for the item and get the siteRelative link
      if (link.contentId) {
        const query = buildQueryFromGallerySelection({ item: link === null || link === void 0 ? void 0 : link.contentId }, "item");
        const hubSearchOptions = { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions };
        const result = await hubSearch(query, hubSearchOptions);
        if ((result === null || result === void 0 ? void 0 : result.results.length) && ((_b = result.results[0].links) === null || _b === void 0 ? void 0 : _b.siteRelative)) {
          link._href = (_c = result.results[0].links) === null || _c === void 0 ? void 0 : _c.siteRelative;
        }
      }
      return link;
    };
    this.handleAddLink = (evt) => {
      const isSection = evt.currentTarget.getAttribute('data-type') === 'section';
      this.resetUnsavedChanges();
      const key = createId('link');
      const newLink = isSection
        ? { key, kind: 'section', label: undefined, description: undefined, children: [] }
        : { key, kind: 'external', source: 'external', href: undefined, icon: undefined, label: undefined, description: undefined };
      this._links = [...this._links, newLink];
      this._unsavedChanges = this._links;
      this._editKey = key;
    };
    this.handleEditLink = (evt) => {
      const previousEditKey = this._editKey;
      const editKey = evt.currentTarget.getAttribute('data-key');
      if (previousEditKey === editKey) {
        this.resetUnsavedChanges();
      }
      else {
        this._editKey = editKey;
      }
    };
    this.handleDeleteLink = () => {
      var _a;
      const linkToDelete = this.findLinkByKey(this._editKey);
      // we don't allow deleting sections that contain links - we render a warning instead
      if (linkToDelete.kind === 'section' && ((_a = linkToDelete.children) === null || _a === void 0 ? void 0 : _a.length)) {
        this._showDeleteWarning = true;
      }
      else {
        this._links = deepFilter(this._links, (link) => (link === null || link === void 0 ? void 0 : link.key) !== this._editKey);
        this.resetUnsavedChanges();
        this.arcgisCompositeActionLinksFieldChange.emit(this.transformLinksToEmit(this._links));
      }
    };
    this.handleSaveLink = () => {
      const currentLink = this.findLinkByKey(this._editKey);
      const updatedLink = this.findLinkByKey(this._editKey, this._unsavedChanges);
      // 1. update the internal links with the changes
      this._links = [...this._unsavedChanges];
      // 2. if a link's "section" was updated, move it accordingly
      if (currentLink.section !== updatedLink.section) {
        // 2a. remove the link from its current location
        this._links = deepFilter(this._links, (link) => (link === null || link === void 0 ? void 0 : link.key) !== this._editKey);
        // 2b. add the link to the appropriate section
        const section = this.findLinkByKey(updatedLink.section);
        section ? section.children.push(updatedLink) : this._links.push(updatedLink);
      }
      this.resetUnsavedChanges();
      this.arcgisCompositeActionLinksFieldChange.emit(this.transformLinksToEmit(this._links));
    };
    this.handleLinkEditorChange = (evt) => {
      const editKey = evt.currentTarget.getAttribute('data-key');
      const unsavedChanges = cloneObject(this._unsavedChanges);
      const link = this.findLinkByKey(editKey, unsavedChanges);
      Object.entries(evt.detail.values).forEach(([key, val]) => {
        link[key] = val;
        // When a consumer switches the "source", we need
        // to clear out the href or contentId respectively
        if (key === 'source') {
          link.kind = val;
          if (val === 'external') {
            delete link.contentId;
          }
          else if (val === 'content') {
            delete link.href;
          }
        }
        // if a content link is being edited and contentId changed,
        // we need to set the internal _href
        if (link.kind === 'content' && key === 'contentId') {
          this.setInternalLinkHref(link);
        }
      });
      this._unsavedChanges = unsavedChanges;
    };
    this.handleCancelLink = () => {
      const linkToCancel = this.findLinkByKey(this._editKey);
      const isNewLink = !linkToCancel.label;
      // if a new link is being "cancelled", we need to filter out the empty entry
      if (isNewLink) {
        this._links = deepFilter(this._links, (link) => (link === null || link === void 0 ? void 0 : link.key) !== this._editKey);
      }
      this.resetUnsavedChanges();
    };
    this.handleLinkEditorAction = (evt) => {
      const { action } = evt.detail;
      if (action === 'save') {
        this.handleSaveLink();
      }
      else if (action === 'delete') {
        this.handleDeleteLink();
      }
      else if (action === 'cancel') {
        this.handleCancelLink();
      }
    };
    this.handleLinkOrderChange = (evt) => {
      var _a;
      const sortableLinks = ((_a = evt.target) === null || _a === void 0 ? void 0 : _a.children) || [];
      const sortedLinkKeys = Array.from(sortableLinks).map(link => link.getAttribute('data-key'));
      const sortedLinks = [...this._links];
      sortedLinks.sort(function (a, b) {
        return sortedLinkKeys.indexOf(a.key) - sortedLinkKeys.indexOf(b.key);
      });
      this._links = sortedLinks;
      this.arcgisCompositeActionLinksFieldChange.emit(this.transformLinksToEmit(this._links));
    };
    this.links = [];
    this.catalogs = undefined;
    this.facets = undefined;
    this.type = 'block';
    this._links = undefined;
    this._editKey = undefined;
    this._showDeleteWarning = undefined;
  }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this._links = await this.transformLinksForEditor(this.links);
    this._unsavedChanges = this._links;
  }
  get _context() {
    return getGlobalContext();
  }
  get _linkUiSchema() {
    return interpolateTranslations(this.intl, buildLinkUiSchema({
      catalogs: this.catalogs,
      facets: this.facets,
      type: this.type,
      links: this._links,
      editKey: this._editKey
    }));
  }
  /**
   * we map over the links that are passed into the
   * component and transform them into a format that
   * is consistent with the underlying link editor
   * schema.
   */
  async transformLinksForEditor(links, parent) {
    return Promise.all(links.map(async (link) => {
      var _a;
      const transformedLink = Object.assign(Object.assign({}, link), { key: createId('link') });
      // recursively transform nested links
      if (link.kind === 'section' && ((_a = link.children) === null || _a === void 0 ? void 0 : _a.length)) {
        transformedLink.children = await this.transformLinksForEditor(link.children, transformedLink);
      }
      // transform content id (for content links) from string to array
      if (link.kind === 'content' && link.contentId) {
        transformedLink.contentId = [link.contentId];
        await this.setInternalLinkHref(transformedLink);
      }
      // use the link's "kind" to set the internal "source" on non-section links
      if (link.kind !== 'section') {
        transformedLink.source = link.kind;
      }
      // for nested links, set the section key
      if (parent) {
        transformedLink.section = parent.key;
      }
      return transformedLink;
    }));
  }
  /**
   * we map over the updated links and transform them
   * back into HubActionLinks to emit to the consumer
   */
  transformLinksToEmit(links) {
    return cloneObject(links).map((link) => {
      const transformedLink = Object.assign({}, link);
      // recursively transform nested links
      if (link.kind === 'section') {
        transformedLink['children'] = this.transformLinksToEmit(link.children);
      }
      // remove internal-only properties
      delete transformedLink['source'];
      delete transformedLink['key'];
      delete transformedLink['section'];
      // transform content id from array to string
      if (link.kind === 'content' && link.contentId.length) {
        transformedLink['contentId'] = link.contentId[0];
        delete transformedLink['_href'];
      }
      return transformedLink;
    });
  }
  renderLinks(links = []) {
    return (
    // TODO: switch calcite-list w/ dragEnabled or use `list` control in config editor
    h("calcite-sortable-list", { onCalciteListOrderChange: this.handleLinkOrderChange }, links.map(link => {
      return link.kind === 'section'
        ? this.renderSection(link, links.length > 1)
        : this.renderLink(link, links.length > 1);
    })));
  }
  renderSection(section, showDragHandle) {
    return section.label ? (
    // TODO: switch calcite-list-item w/ dragEnabled or use `list` control in config editor
    h("div", { class: "action-links__section", "data-key": section.key }, h("calcite-block", { description: section.description, "drag-handle": showDragHandle, heading: section.label, key: section.key, open: this._editKey === section.key }, section.icon && (h("div", { slot: "icon-start" }, h("calcite-icon", { icon: section.icon }))), h("div", { slot: "actions-end" }, this.renderBlockActions(section.key)), this._editKey === section.key && this.renderSectionEditor()), this.renderLinks(section.children))) : (this.renderSectionEditor());
  }
  renderLink(link, showDragHandle) {
    return link.label ? (h("calcite-block", { "data-key": link.key, description: link.description, "drag-handle": showDragHandle, heading: link.label, key: link.key, open: this._editKey === link.key }, link.icon && (h("div", { slot: "icon-start" }, h("calcite-icon", { icon: link.icon }))), h("div", { slot: "actions-end" }, this.renderBlockActions(link.key)), this._editKey === link.key && this.renderLinkEditor())) : (this.renderLinkEditor());
  }
  renderBlockActions(linkKey) {
    const link = this.findLinkByKey(linkKey);
    const href = link.kind === 'external' ? link.href : link._href;
    return (h(Fragment, null, h("calcite-action", { "data-key": link.key, icon: "pencil", onClick: this.handleEditLink, text: "" }), link.kind === 'section' ? (h("calcite-action", { disabled: true, icon: "chevron-down", text: "" })) : (h("calcite-link", { class: "content-link", href: href, rel: "noreferrer", target: "_blank" }, h("calcite-action", { "data-key": link.key, icon: "launch", label: this.intl.t('linkEditor.preview'), text: "" })))));
  }
  renderSectionEditor() {
    const section = this.findLinkByKey(this._editKey);
    return (section && (h("arcgis-configuration-editor", { "data-key": section.key, onArcgisConfigurationEditorChange: this.handleLinkEditorChange, onArcgisConfigurationEditorSectionAction: this.handleLinkEditorAction, schema: this._sectionSchema, t: this.translationFunc, uiSchema: this._sectionUiSchema, values: section }, this._showDeleteWarning && (h("calcite-notice", { icon: "exclamation-mark-triangle", kind: "warning", open: true, slot: "delete-warning" }, h("div", { slot: "title" }, this.intl.t('deleteNotice.title')), h("div", { slot: "message" }, this.intl.t('deleteNotice.message')))))));
  }
  renderLinkEditor() {
    const link = this.findLinkByKey(this._editKey);
    return (link && (h("arcgis-configuration-editor", { "data-key": link.key, onArcgisConfigurationEditorChange: this.handleLinkEditorChange, onArcgisConfigurationEditorSectionAction: this.handleLinkEditorAction, schema: this._linkSchema, t: this.translationFunc, uiSchema: this._linkUiSchema, values: link })));
  }
  renderAddButtons() {
    var _a, _b, _c, _d, _e;
    return this.type === 'block'
      ? [
        h("calcite-button", { disabled: this._editKey, key: "primary", onClick: this.handleAddLink, round: true }, this.intl.t('addLink')),
        h("calcite-button", { appearance: "outline-fill", "data-type": "section", disabled: this._editKey, key: "secondary", onClick: this.handleAddLink, round: true }, this.intl.t('addSection'))
      ]
      : [
        h("calcite-button", { appearance: "outline-fill", "data-key": (_a = this._links[0]) === null || _a === void 0 ? void 0 : _a.key, key: "primary", kind: 'neutral', onClick: this._links[0] ? this.handleEditLink : this.handleAddLink, round: true }, ((_b = this._links[0]) === null || _b === void 0 ? void 0 : _b.label) ? this._links[0].label : this.intl.t('addFirstAction')),
        !!((_c = this._links[0]) === null || _c === void 0 ? void 0 : _c.label) && (h("calcite-button", { appearance: "outline-fill", "data-key": (_d = this._links[1]) === null || _d === void 0 ? void 0 : _d.key, key: "secondary", kind: 'neutral', onClick: this._links[1] ? this.handleEditLink : this.handleAddLink, round: true }, ((_e = this._links[1]) === null || _e === void 0 ? void 0 : _e.label) ? this._links[1].label : this.intl.t('addSecondAction')))
      ];
  }
  render() {
    return (h(Host, { "data-element": "action-links-field" }, h("div", { class: "action-links__add" }, this.renderAddButtons()), !!this._links.length && this.renderLinks(this._links)));
  }
  static get is() { return "hub-composite-input-action-links"; }
  static get originalStyleUrls() {
    return {
      "$": ["action-links.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["action-links.css"]
    };
  }
  static get assetsDirs() { return ["locales"]; }
  static get properties() {
    return {
      "links": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HubActionLink[]",
          "resolved": "HubActionLink[]",
          "references": {
            "HubActionLink": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "configured action links"
        },
        "defaultValue": "[]"
      },
      "catalogs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IHubCatalog[]",
          "resolved": "IHubCatalog[]",
          "references": {
            "IHubCatalog": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "catalogs to populate the \"existing content\" picker"
        }
      },
      "facets": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IFacet[]",
          "resolved": "IFacet[]",
          "references": {
            "IFacet": {
              "location": "import",
              "path": "../../../../../../../utils/types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "facets to filter the \"existing content\" picker"
        }
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'button' | 'block'",
          "resolved": "\"block\" | \"button\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "specifies the type of action links being configured"
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'block'"
      }
    };
  }
  static get states() {
    return {
      "_links": {},
      "_editKey": {},
      "_showDeleteWarning": {}
    };
  }
  static get events() {
    return [{
        "method": "arcgisCompositeActionLinksFieldChange",
        "name": "arcgisCompositeActionLinksFieldChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "event emitted when links are updated/added/removed"
        },
        "complexType": {
          "original": "HubActionLink[]",
          "resolved": "HubActionLink[]",
          "references": {
            "HubActionLink": {
              "location": "import",
              "path": "@esri/hub-common"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
__decorate([
  Memoize('_links', '_editKey')
], ActionLinks.prototype, "_linkUiSchema", null);
