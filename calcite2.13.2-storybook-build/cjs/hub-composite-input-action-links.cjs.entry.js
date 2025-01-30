'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
const interpolateTranslations = require('./interpolate-translations-83c38ec8.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
const state = require('./state-6637df8c.js');
require('./index-6f16fe65.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const types = require('./types-60347c5c.js');
const memoize = require('./memoize-1f967971.js');
const buildQueryFromGallerySelection = require('./build-query-from-gallery-selection-7db73693.js');
const util = require('./util-38e73510.js');
const deepFind = require('./deepFind-662aa4bf.js');
const hubSearch = require('./hubSearch-79d30702.js');
const deepFilter = require('./deepFilter-69230ab7.js');
require('./index-f4a4c954.js');
require('./interpolate-c1fe951a.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./store-2a385ca0.js');
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');
require('./InitiativeSchema-5a0a1956.js');
require('./SiteSchema-85074143.js');
require('./DiscussionSchema-24407ed6.js');
require('./PageSchema-f15eb977.js');
require('./ContentSchema-92224d5f.js');
require('./TemplateSchema-d46d6f3b.js');
require('./GroupSchema-e21948a6.js');
require('./InitiativeTemplateSchema-c5d2cb31.js');
require('./SurveySchema-9ec907b6.js');
require('./EventSchemaCreate-bf05e6ea.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./types-751ad3a9.js');
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');
require('./generate-random-string-8807d629.js');
require('./get-prop-4bd8fc1a.js');
require('./tslib.es6-b6cfa7d7.js');
require('./HubError-44e07249.js');
require('./get-with-default-d1b1754d.js');
require('./OperationError-902f34ae.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./is-guid-b5c2b74c.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./append-custom-params-0f5d0fe2.js');
require('./request-67da3c71.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./_enrichments-a40a3850.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./slugs-8f743e2c.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./merge-objects-b31af1a3.js');
require('./get-52661c13.js');
require('./search-b00c4c79.js');
require('./request-79b61e92.js');
require('./channels-bf478342.js');
require('./discussions-api-request-e9e6e346.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./_deep-map-values-d489006b.js');

const LINK_SCHEMA = {
  type: 'object',
  required: ["label"],
  properties: {
    source: {
      type: "string",
      default: "external",
      enum: ["external", "content"]
    },
    label: { type: 'string' },
    description: { type: 'string' },
    href: {
      type: 'string',
    },
    contentId: {
      type: "array",
      maxItems: 1,
      items: {
        type: "string"
      }
    },
    section: {
      type: "string"
    }
  },
  allOf: [
    // conditionally validate formatting for "href" for "external" links
    {
      if: {
        properties: {
          source: { const: "external" },
          href: { minLength: 1 }
        }
      },
      then: { properties: { "href": {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            format: "url"
          } } },
    },
    // conditionally require "href" for "external" links
    {
      if: { required: ['source'], properties: { source: { const: "external" } } },
      then: { required: ['href'] },
    },
    // conditionally require "contentId" for "content" links
    {
      if: {
        required: ['source'],
        properties: { source: { const: "content" } },
      },
      then: {
        required: ["contentId"],
        properties: { contentId: { not: { const: [] } } }
      },
    }
  ],
};
const buildLinkUiSchema = (opts) => {
  let sectionItems = [];
  const cardTitleKey = opts.type === "block" ? "block" : `button${opts.links.findIndex(link => link.key === opts.editKey) + 1}`;
  if (opts.type === "block") {
    sectionItems = getSectionItems(opts.links);
  }
  return {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        labelKey: `linkEditor.title.${cardTitleKey}`,
        options: {
          section: "card",
          actions: [
            {
              action: "delete",
              slot: "footer-start",
              label: "Delete",
              kind: "danger",
              appearance: "transparent",
              round: true
            },
            {
              action: "cancel",
              slot: "footer-end",
              label: "Cancel",
              appearance: "transparent",
              kind: "neutral",
              round: true
            },
            {
              action: "save",
              slot: "footer-end",
              label: "Save",
              round: true,
              disableWhenInvalid: true
            }
          ]
        },
        elements: [
          {
            scope: '/properties/source',
            type: 'Control',
            options: {
              control: 'hub-field-input-radio',
              labels: ["{{linkEditor.link.source.external.label:translate}}", "{{linkEditor.link.source.content.label:translate}}"]
            }
          },
          {
            scope: '/properties/label',
            labelKey: 'linkEditor.link.label.label',
            type: 'Control',
            options: {
              helperText: {
                labelKey: `linkEditor.link.label.helperText.${opts.type}`
              },
              messages: [
                {
                  type: "ERROR",
                  keyword: "required",
                  icon: true,
                  labelKey: 'linkEditor.link.label.requiredError',
                },
              ],
            }
          },
          ...(opts.type === "block"
            ? [{
                scope: '/properties/description',
                labelKey: 'linkEditor.link.description.label',
                type: 'Control',
                options: {
                  helperText: {
                    labelKey: "linkEditor.link.description.helperText"
                  }
                }
              }]
            : []),
          {
            scope: '/properties/href',
            labelKey: 'linkEditor.link.href.label',
            type: 'Control',
            rule: {
              effect: types.UiSchemaRuleEffects.HIDE,
              condition: {
                scope: '/properties/source',
                schema: { const: 'content' }
              }
            },
            options: {
              messages: [
                {
                  type: "ERROR",
                  keyword: "minLength",
                  icon: true,
                  labelKey: 'linkEditor.link.href.requiredError',
                },
                {
                  type: "ERROR",
                  keyword: "format",
                  icon: true,
                  labelKey: 'linkEditor.link.href.formatError',
                },
                {
                  type: "ERROR",
                  keyword: "if",
                  hidden: true,
                },
              ]
            }
          },
          {
            scope: '/properties/contentId',
            labelKey: 'linkEditor.link.contentId.label',
            type: 'Control',
            rule: {
              effect: types.UiSchemaRuleEffects.HIDE,
              condition: {
                scope: '/properties/source',
                schema: { const: 'external' }
              }
            },
            options: {
              control: 'hub-field-input-gallery-picker',
              targetEntity: "item",
              catalogs: opts.catalogs,
              facets: opts.facets,
              messages: [
                {
                  type: "ERROR",
                  // matches the error keyword when contentId is conditionally required
                  keyword: "not",
                  icon: true,
                  labelKey: 'linkEditor.link.contentId.requiredError',
                },
              ],
            }
          },
          ...(opts.type === "block"
            ? [{
                scope: '/properties/section',
                labelKey: 'linkEditor.link.section.label',
                type: 'Control',
                options: {
                  control: 'hub-field-input-combobox',
                  items: sectionItems,
                  selectionMode: "single",
                  disabled: !sectionItems.length,
                  placeholder: sectionItems.length
                    ? '{{linkEditor.link.section.placeholder.notSet:translate}}'
                    : '{{linkEditor.link.section.placeholder.noSections:translate}}'
                }
              }]
            : [])
        ]
      }
    ]
  };
};
const getSectionItems = (links) => {
  return links.reduce((acc, link) => {
    if (link.kind === "section") {
      acc.push({ value: link.key, label: link.label });
    }
    return acc;
  }, []);
};
const SECITON_SCHEMA = {
  type: 'object',
  required: ["label"],
  properties: {
    label: { type: 'string' },
    description: { type: 'string' }
  }
};
const SECTION_UI_SCHEMA = {
  type: "layout",
  elements: [
    {
      type: 'Section',
      labelKey: 'sectionEditor.title',
      options: {
        section: "card",
        actions: [
          {
            action: "delete",
            slot: "footer-start",
            label: "Delete",
            kind: "danger",
            appearance: "outline",
            round: true
          },
          {
            action: "cancel",
            slot: "footer-end",
            label: "Cancel",
            appearance: "outline",
            round: true
          },
          {
            action: "save",
            slot: "footer-end",
            label: "Save",
            round: true,
            disableWhenInvalid: true
          }
        ]
      },
      elements: [
        {
          scope: '/properties/label',
          labelKey: 'sectionEditor.section.label.label',
          type: 'Control',
          options: {
            messages: [
              {
                type: "ERROR",
                keyword: "required",
                icon: true,
                labelKey: 'sectionEditor.section.label.requiredError',
              },
            ],
          }
        },
        {
          scope: '/properties/description',
          labelKey: 'sectionEditor.section.description.label',
          type: 'Control'
        },
        {
          type: "Slot",
          options: { name: "delete-warning" }
        }
      ]
    }
  ]
};

const actionLinksCss = "hub-composite-input-action-links>calcite-sortable-list{margin-top:1.5rem}[slot=\"actions-end\"]{display:flex}calcite-link calcite-action{height:100%}calcite-link.content-link{display:block}.action-links__add calcite-button:not(:first-child){margin-left:0.5rem}.action-links__section calcite-sortable-list{margin-left:1.5rem}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ActionLinks = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisCompositeActionLinksFieldChange = index.createEvent(this, "arcgisCompositeActionLinksFieldChange", 7);
    this._linkSchema = util.cloneObject(LINK_SCHEMA);
    this._sectionSchema = util.cloneObject(SECITON_SCHEMA);
    this._sectionUiSchema = util.cloneObject(SECTION_UI_SCHEMA);
    /**
     * helper util to recursively traverse an array of
     * links and find one by its unique key
     */
    this.findLinkByKey = (key, links = this._links) => {
      const p = (link) => (link === null || link === void 0 ? void 0 : link.key) === key;
      return deepFind.deepFind(links, p);
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
        const query = buildQueryFromGallerySelection.buildQueryFromGallerySelection({ item: link === null || link === void 0 ? void 0 : link.contentId }, "item");
        const hubSearchOptions = { requestOptions: (_a = this._context) === null || _a === void 0 ? void 0 : _a.hubRequestOptions };
        const result = await hubSearch.hubSearch(query, hubSearchOptions);
        if ((result === null || result === void 0 ? void 0 : result.results.length) && ((_b = result.results[0].links) === null || _b === void 0 ? void 0 : _b.siteRelative)) {
          link._href = (_c = result.results[0].links) === null || _c === void 0 ? void 0 : _c.siteRelative;
        }
      }
      return link;
    };
    this.handleAddLink = (evt) => {
      const isSection = evt.currentTarget.getAttribute('data-type') === 'section';
      this.resetUnsavedChanges();
      const key = util.createId('link');
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
        this._links = deepFilter.deepFilter(this._links, (link) => (link === null || link === void 0 ? void 0 : link.key) !== this._editKey);
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
        this._links = deepFilter.deepFilter(this._links, (link) => (link === null || link === void 0 ? void 0 : link.key) !== this._editKey);
        // 2b. add the link to the appropriate section
        const section = this.findLinkByKey(updatedLink.section);
        section ? section.children.push(updatedLink) : this._links.push(updatedLink);
      }
      this.resetUnsavedChanges();
      this.arcgisCompositeActionLinksFieldChange.emit(this.transformLinksToEmit(this._links));
    };
    this.handleLinkEditorChange = (evt) => {
      const editKey = evt.currentTarget.getAttribute('data-key');
      const unsavedChanges = util.cloneObject(this._unsavedChanges);
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
        this._links = deepFilter.deepFilter(this._links, (link) => (link === null || link === void 0 ? void 0 : link.key) !== this._editKey);
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
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this._links = await this.transformLinksForEditor(this.links);
    this._unsavedChanges = this._links;
  }
  get _context() {
    return state.getGlobalContext();
  }
  get _linkUiSchema() {
    return interpolateTranslations.interpolateTranslations(this.intl, buildLinkUiSchema({
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
      const transformedLink = Object.assign(Object.assign({}, link), { key: util.createId('link') });
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
    return util.cloneObject(links).map((link) => {
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
    index.h("calcite-sortable-list", { onCalciteListOrderChange: this.handleLinkOrderChange }, links.map(link => {
      return link.kind === 'section'
        ? this.renderSection(link, links.length > 1)
        : this.renderLink(link, links.length > 1);
    })));
  }
  renderSection(section, showDragHandle) {
    return section.label ? (
    // TODO: switch calcite-list-item w/ dragEnabled or use `list` control in config editor
    index.h("div", { class: "action-links__section", "data-key": section.key }, index.h("calcite-block", { description: section.description, "drag-handle": showDragHandle, heading: section.label, key: section.key, open: this._editKey === section.key }, section.icon && (index.h("div", { slot: "icon-start" }, index.h("calcite-icon", { icon: section.icon }))), index.h("div", { slot: "actions-end" }, this.renderBlockActions(section.key)), this._editKey === section.key && this.renderSectionEditor()), this.renderLinks(section.children))) : (this.renderSectionEditor());
  }
  renderLink(link, showDragHandle) {
    return link.label ? (index.h("calcite-block", { "data-key": link.key, description: link.description, "drag-handle": showDragHandle, heading: link.label, key: link.key, open: this._editKey === link.key }, link.icon && (index.h("div", { slot: "icon-start" }, index.h("calcite-icon", { icon: link.icon }))), index.h("div", { slot: "actions-end" }, this.renderBlockActions(link.key)), this._editKey === link.key && this.renderLinkEditor())) : (this.renderLinkEditor());
  }
  renderBlockActions(linkKey) {
    const link = this.findLinkByKey(linkKey);
    const href = link.kind === 'external' ? link.href : link._href;
    return (index.h(index.Fragment, null, index.h("calcite-action", { "data-key": link.key, icon: "pencil", onClick: this.handleEditLink, text: "" }), link.kind === 'section' ? (index.h("calcite-action", { disabled: true, icon: "chevron-down", text: "" })) : (index.h("calcite-link", { class: "content-link", href: href, rel: "noreferrer", target: "_blank" }, index.h("calcite-action", { "data-key": link.key, icon: "launch", label: this.intl.t('linkEditor.preview'), text: "" })))));
  }
  renderSectionEditor() {
    const section = this.findLinkByKey(this._editKey);
    return (section && (index.h("arcgis-configuration-editor", { "data-key": section.key, onArcgisConfigurationEditorChange: this.handleLinkEditorChange, onArcgisConfigurationEditorSectionAction: this.handleLinkEditorAction, schema: this._sectionSchema, t: this.translationFunc, uiSchema: this._sectionUiSchema, values: section }, this._showDeleteWarning && (index.h("calcite-notice", { icon: "exclamation-mark-triangle", kind: "warning", open: true, slot: "delete-warning" }, index.h("div", { slot: "title" }, this.intl.t('deleteNotice.title')), index.h("div", { slot: "message" }, this.intl.t('deleteNotice.message')))))));
  }
  renderLinkEditor() {
    const link = this.findLinkByKey(this._editKey);
    return (link && (index.h("arcgis-configuration-editor", { "data-key": link.key, onArcgisConfigurationEditorChange: this.handleLinkEditorChange, onArcgisConfigurationEditorSectionAction: this.handleLinkEditorAction, schema: this._linkSchema, t: this.translationFunc, uiSchema: this._linkUiSchema, values: link })));
  }
  renderAddButtons() {
    var _a, _b, _c, _d, _e;
    return this.type === 'block'
      ? [
        index.h("calcite-button", { disabled: this._editKey, key: "primary", onClick: this.handleAddLink, round: true }, this.intl.t('addLink')),
        index.h("calcite-button", { appearance: "outline-fill", "data-type": "section", disabled: this._editKey, key: "secondary", onClick: this.handleAddLink, round: true }, this.intl.t('addSection'))
      ]
      : [
        index.h("calcite-button", { appearance: "outline-fill", "data-key": (_a = this._links[0]) === null || _a === void 0 ? void 0 : _a.key, key: "primary", kind: 'neutral', onClick: this._links[0] ? this.handleEditLink : this.handleAddLink, round: true }, ((_b = this._links[0]) === null || _b === void 0 ? void 0 : _b.label) ? this._links[0].label : this.intl.t('addFirstAction')),
        !!((_c = this._links[0]) === null || _c === void 0 ? void 0 : _c.label) && (index.h("calcite-button", { appearance: "outline-fill", "data-key": (_d = this._links[1]) === null || _d === void 0 ? void 0 : _d.key, key: "secondary", kind: 'neutral', onClick: this._links[1] ? this.handleEditLink : this.handleAddLink, round: true }, ((_e = this._links[1]) === null || _e === void 0 ? void 0 : _e.label) ? this._links[1].label : this.intl.t('addSecondAction')))
      ];
  }
  render() {
    return (index.h(index.Host, { "data-element": "action-links-field" }, index.h("div", { class: "action-links__add" }, this.renderAddButtons()), !!this._links.length && this.renderLinks(this._links)));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
};
__decorate([
  memoize.MemoizeDecoratorFactory('_links', '_editKey')
], ActionLinks.prototype, "_linkUiSchema", null);
ActionLinks.style = actionLinksCss;

exports.hub_composite_input_action_links = ActionLinks;
