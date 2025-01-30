import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, a as getElement } from './index-57f71b44.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { M as MemoizeDecoratorFactory } from './memoize-dfcfa834.js';
import { b as buildQueryFromGallerySelection } from './build-query-from-gallery-selection-025c80a8.js';
import { a as cloneObject, c as createId } from './util-3e6872d9.js';
import { d as deepFind } from './deepFind-a22f417b.js';
import { h as hubSearch } from './hubSearch-41612481.js';
import { d as deepFilter } from './deepFilter-df6b0aed.js';
import './index-213c70d0.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';
import './InitiativeSchema-4fb31f85.js';
import './SiteSchema-3e282ce1.js';
import './DiscussionSchema-6e5016d0.js';
import './PageSchema-4cbe3bd9.js';
import './ContentSchema-d913d8e9.js';
import './TemplateSchema-83e65297.js';
import './GroupSchema-13ff9290.js';
import './InitiativeTemplateSchema-bf5d8531.js';
import './SurveySchema-0fcb1d64.js';
import './EventSchemaCreate-2f6ba245.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './types-db540898.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';
import './generate-random-string-1436d9e6.js';
import './get-prop-ec5be510.js';
import './tslib.es6-9c17e83a.js';
import './HubError-e26c5610.js';
import './get-with-default-b819d95d.js';
import './OperationError-387ae9ab.js';
import './HubInitiatives-4f4e24ce.js';
import './slugs-7ec67036.js';
import './is-guid-982831aa.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './append-custom-params-4bd856e5.js';
import './request-fa80ae40.js';
import './compose-d5b83ab7.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-family-543fac52.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './get-f0caeb52.js';
import './tslib.es6-7023f322.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugify-e3e67bac.js';
import './object-to-json-blob-583ae5c3.js';
import './fail-safe-cd1a5a2a.js';
import './delete-prop-bd13d424.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './_enrichments-8641475c.js';
import './get-user-f035bd36.js';
import './fetch-org-8e578c0d.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './getService-e61b8c6e.js';
import './TemplateBusinessRules-0e35d61b.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './UserSession-2c05f7b6.js';
import './slugs-7b8828d5.js';
import './remove-7361a90a.js';
import './map-by-a2234e13.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './merge-objects-5b123ab3.js';
import './get-850c466d.js';
import './search-211dee83.js';
import './request-3e386aeb.js';
import './channels-2574fd6e.js';
import './discussions-api-request-199cae2d.js';
import './events-c59246f8.js';
import './registrations-431b9788.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './_deep-map-values-53f8dbd1.js';

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
              effect: UiSchemaRuleEffects.HIDE,
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
              effect: UiSchemaRuleEffects.HIDE,
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
    registerInstance(this, hostRef);
    this.arcgisCompositeActionLinksFieldChange = createEvent(this, "arcgisCompositeActionLinksFieldChange", 7);
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
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
__decorate([
  MemoizeDecoratorFactory('_links', '_editKey')
], ActionLinks.prototype, "_linkUiSchema", null);
ActionLinks.style = actionLinksCss;

export { ActionLinks as hub_composite_input_action_links };
