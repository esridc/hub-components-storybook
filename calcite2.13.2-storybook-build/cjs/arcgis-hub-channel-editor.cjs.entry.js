'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const intlManager = require('./intl-manager-f0103583.js');
const context = require('./context-0167a31e.js');
const state = require('./state-6637df8c.js');
const memoize = require('./memoize-1f967971.js');
const debounce = require('./debounce-bd990e9f.js');
const discussions = require('./discussions-09889d00.js');
const index$1 = require('./index-6f16fe65.js');
const resources = require('./resources-42021303.js');
const util = require('./util-38e73510.js');
const wellKnownCatalog = require('./wellKnownCatalog-799c8326.js');
const utils = require('./utils-7f390376.js');
const channels = require('./channels-b4910298.js');
const canModifyChannel = require('./can-modify-channel-0fde0aa9.js');
const channels$1 = require('./channels-bf478342.js');
const hubSearch = require('./hubSearch-79d30702.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./store-2a385ca0.js');
require('./generate-random-string-8807d629.js');
require('./get-prop-4bd8fc1a.js');
require('./compose-9b4311c9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./get-family-cafa88bb.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./request-67da3c71.js');
require('./helpers-64227739.js');
require('./cache-4d33af79.js');
require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./download-list-00ce3845.js');
require('./index-77618030.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./fetchContent-963f3885.js');
require('./tslib.es6-b6cfa7d7.js');
require('./_enrichments-a40a3850.js');
require('./get-with-default-d1b1754d.js');
require('./get-0368c931.js');
require('./tslib.es6-e7faa7f3.js');
require('./append-custom-params-0f5d0fe2.js');
require('./OperationError-902f34ae.js');
require('./get-user-5eecc1c4.js');
require('./fetch-org-d214b65b.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./getService-b27eda44.js');
require('./slugs-8f743e2c.js');
require('./is-guid-b5c2b74c.js');
require('./request-79b61e92.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./tslib.es6-846f687c.js');
require('./discussions-api-request-e9e6e346.js');
require('./update-b8977041.js');
require('./get-52661c13.js');
require('./update-7b2b2d9d.js');
require('./channel-permission-d8b16f02.js');
require('./HubError-44e07249.js');
require('./HubInitiatives-25ecf40a.js');
require('./slugs-9d179f70.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./create-6279e23e.js');
require('./slugify-826af07b.js');
require('./object-to-json-blob-5c0a267d.js');
require('./fail-safe-33c35b7f.js');
require('./delete-prop-7826ae49.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./PropertyMapper-785e5c9f.js');
require('./types-097b54b1.js');
require('./TemplateBusinessRules-5564c964.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./UserSession-f8bc10c8.js');
require('./remove-921f5dc7.js');
require('./map-by-a7a75788.js');
require('./Metrics-b8657153.js');
require('./dasherize-f02a08e0.js');
require('./merge-objects-b31af1a3.js');
require('./search-b00c4c79.js');
require('./events-7873340d.js');
require('./registrations-a6dd52b7.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');

const CHANNEL_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    allowAsAnonymous: {
      type: 'boolean',
      default: false,
    },
    blockWords: {
      type: 'string',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      format: 'blockWords',
    },
    access: {
      type: 'string',
      enum: ['public', 'org', 'private'],
    },
    groups: {
      type: 'array',
    },
  },
  allOf: [
    {
      if: {
        properties: {
          groups: { const: [] },
        },
      },
      then: {
        properties: {
          access: { enum: ['public', 'org'] },
        },
      },
    },
  ],
  required: ['name'],
};

const buildChannelUiSchema = (options) => {
  const { intl, isOrgAdmin, context, disabled } = options;
  return {
    type: 'Layout',
    elements: [
      {
        type: 'Section',
        labelKey: 'basicInfo.label',
        options: {
          headerTag: 'h3',
        },
        elements: [
          {
            labelKey: 'name.label',
            type: 'Control',
            scope: '/properties/name',
            options: {
              control: 'hub-field-input-input',
              messages: [
                {
                  type: 'ERROR',
                  keyword: 'required',
                  icon: true,
                  labelKey: 'validations.channelNameRequired',
                  allowShowBeforeInteract: true,
                }
              ],
            },
          },
        ],
      },
      {
        type: 'Section',
        labelKey: 'blockWords.label',
        options: {
          headerTag: 'h3',
        },
        elements: [
          {
            type: 'Control',
            scope: '/properties/blockWords',
            options: {
              control: 'hub-field-input-input',
              type: 'textarea',
              helperText: {
                labelKey: 'blockWords.helperText',
              },
              messages: [
                {
                  type: 'ERROR',
                  keyword: 'format',
                  icon: true,
                  label: intl.t('validations.blockWords'),
                },
              ],
            },
          },
        ],
      },
      {
        type: 'Section',
        labelKey: 'participants.label',
        elements: [
          {
            type: 'Control',
            scope: '/properties/access',
            options: {
              messages: [
                {
                  type: 'ERROR',
                  keyword: 'enum',
                  icon: true,
                  label: intl.t('validations.minChannelGroups'),
                  allowShowBeforeInteract: true,
                },
              ],
              control: 'hub-field-input-radio',
              icons: ['globe', 'organization', 'user'],
              disabled: [!isOrgAdmin, !isOrgAdmin],
              labels: [intl.t('access.public.label'), intl.t('access.organization.label'), intl.t('access.private.label')],
              descriptions: [
                intl.t('access.public.description'),
                intl.t('access.organization.description', { orgName: context.portal.name }),
                intl.t('access.private.description'),
              ],
              tooltips: [
                !disabled &&
                  !isOrgAdmin && {
                  text: intl.t('access.public.disabledTooltip'),
                  placement: 'top',
                },
                !disabled &&
                  !isOrgAdmin && {
                  text: intl.t('access.organization.disabledTooltip'),
                  placement: 'top',
                },
              ],
              helperText: {
                labelKey: 'participants.helperText',
              },
            },
          },
          {
            type: 'Slot',
            options: { name: 'participant-groups' },
          },
          {
            type: 'Control',
            labelKey: 'access.allowAsAnonymous.label',
            scope: '/properties/allowAsAnonymous',
            options: {
              control: 'hub-field-input-switch',
            },
          },
        ],
      },
      {
        type: 'Section',
        labelKey: 'manage.label',
        elements: [
          {
            type: 'Slot',
            options: { name: 'moderators' },
          },
        ],
      },
    ],
  };
};

const arcgisHubChannelEditorCss = ":host{display:block}p[slot=\"moderators\"]{font-weight:var(--calcite-font-weight-bold)}div[slot=\"moderators\"]{font-size:var(--calcite-font-size--2);line-height:1rem;color:var(--calcite-color-text-1)}ul[slot=\"moderators\"]{margin:0px;padding:0px}arcgis-configuration-editor{margin:0.25rem}arcgis-configuration-editor arcgis-configuration-editor-field[property=\"access\"]{--calcite-label-margin-bottom:0}div:has(calcite-button[type=\"submit\"]){display:flex;justify-content:flex-end}calcite-notice{margin-top:1rem;margin-bottom:2rem}calcite-notice:first-of-type{margin-top:0px}div[slot=\"participant-groups\"]{margin-top:0px;margin-left:0px;margin-right:0px;margin-bottom:2rem}calcite-button[slot=\"participant-groups\"]{margin-top:1rem}calcite-notice[kind=\"info\"]{margin-bottom:0px}calcite-notice[kind=\"info\"]+arcgis-hub-gallery{margin-top:1rem}.no-participants{margin:0px;margin-top:2rem}";

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
const ArcgisHubChannelEditor = class {
  /**
   * Pre-binds context to methods that are passed by reference
   * @constructor
   */
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.arcgisHubChannelEditorSaved = index.createEvent(this, "arcgisHubChannelEditorSaved", 7);
    this.arcgisHubChannelEditorError = index.createEvent(this, "arcgisHubChannelEditorError", 7);
    this.arcgisHubChannelEditorSelected = index.createEvent(this, "arcgisHubChannelEditorSelected", 7);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    /**
     * An IConfigurationSchema representing that defines the form configuration
     */
    this.schema = util.cloneObject(CHANNEL_SCHEMA);
    this.channelId = null;
    this.namePrefix = undefined;
    this.disabled = false;
    this.footerSlotRef = undefined;
    this.channel = undefined;
    this.values = undefined;
    this.isLoading = false;
    this.isSaving = false;
    this.isValid = false;
    this.alertConfig = null;
    this.channelAlreadyExists = false;
    this.channelGroupsManagers = [];
    this.isGalleryPickerOpen = false;
    this.inaccessibleGroups = [];
    this.showModifyConfirmationModal = false;
    context.bind(this, 'handleSaveClicked', 'updateValues', 'handleAlertClosed', 'handleUseExistingChannel', 'searchAllGroupManagers', 'handleFormInitialized', 'handleAddParticipantGroupClicked', 'handleParticipantsPickerClosed', 'handleParticipantsPickerSelectionUpdated', 'handleGalleryAction', 'validate', 'renderNotice', 'handleFormChanged', 'handleModifyConfirmationModalClosed', 'handleConfirmUpdateClicked');
  }
  /**
   * Component will load lifecycle method. Loads translations and dependencies
   */
  async componentWillLoad() {
    await this.loadTranslations();
    this.initialize();
  }
  /**
   * Getter for the global ArcGISContext
   */
  get _context() {
    return state.getGlobalContext();
  }
  /**
   * Computes true if the currently authenticated user is an org admin,
   * which includes custom roles
   */
  get isOrgAdmin() {
    const { _context: { currentUser: { role, orgId }, }, channelOrgsIds, } = this;
    return role === 'org_admin' && channelOrgsIds.includes(orgId);
  }
  /**
   * Computes the participantCatalogs for the group picker
   */
  get participantCatalogs() {
    return [wellKnownCatalog.getWellKnownCatalog('groupPicker.', 'allGroups', 'group', { user: this._context.currentUser })];
  }
  /**
   * Computes the facets for the participant group picker
   */
  get particpantFacets() {
    var _a, _b, _c, _d, _e, _f, _g;
    const facet = {
      label: this.intl.t('groupPicker.facet.label'),
      key: 'groups',
      display: 'single-select',
      operation: 'OR',
      options: [
        {
          label: this.intl.t('groupPicker.facet.myGroups'),
          key: 'my-group',
          selected: true,
          predicates: [
            {
              owner: (_a = this._context) === null || _a === void 0 ? void 0 : _a.currentUser.username,
              typekeywords: { not: utils.CANNOT_DISCUSS }
            },
          ],
        },
        {
          label: this.intl.t('groupPicker.facet.myOrganization'),
          key: 'my-organization',
          selected: false,
          predicates: [
            {
              orgid: (_c = (_b = this._context) === null || _b === void 0 ? void 0 : _b.currentUser) === null || _c === void 0 ? void 0 : _c.orgId,
              searchUserAccess: 'groupMember',
              searchUserName: (_d = this._context) === null || _d === void 0 ? void 0 : _d.currentUser.username,
              typekeywords: { not: utils.CANNOT_DISCUSS }
            },
          ],
        },
      ],
    };
    if ((_e = this._context) === null || _e === void 0 ? void 0 : _e.communityOrgId) {
      facet.options.push({
        label: this.intl.t('groupPicker.facet.myCommunity'),
        key: 'my-community',
        selected: false,
        predicates: [
          {
            orgid: (_f = this._context) === null || _f === void 0 ? void 0 : _f.communityOrgId,
            searchUserAccess: 'groupMember',
            searchUserName: (_g = this._context) === null || _g === void 0 ? void 0 : _g.currentUser.username,
            typekeywords: { not: utils.CANNOT_DISCUSS }
          },
        ],
      });
    }
    return [facet];
  }
  /**
   * Computes the IUiSchema for the form
   */
  get uiSchema() {
    const { intl, namePrefix, isOrgAdmin, _context: context, disabled } = this;
    return buildChannelUiSchema({ intl, namePrefix, isOrgAdmin, context, disabled });
  }
  /**
   * Computes the channel orgs. When editing a channel, this will be the value of
   * the channel's `orgs` property. When creating a new channel, this will be an
   * array containing only the currently authenticated user's org id
   */
  get channelOrgsIds() {
    var _a;
    const { channel, _context } = this;
    return (_a = channel === null || channel === void 0 ? void 0 : channel.orgs) !== null && _a !== void 0 ? _a : [_context.currentUser.orgId];
  }
  /**
   * Computes an Array of notice configs to be rendered
   */
  get noticeConfigs() {
    const { channelId, disabled, intl, channelAlreadyExists, handleUseExistingChannel } = this;
    const notices = [];
    if (channelId && !disabled) {
      notices.push({
        icon: 'exclamation-mark-triangle',
        kind: 'warning',
        message: intl.t('notices.edit'),
      });
    }
    if (channelAlreadyExists) {
      const action = channelId ? 'update' : 'create';
      notices.push({
        icon: 'exclamation-mark-triangle',
        title: intl.t(`notices.duplicate.${action}.error.title`),
        message: intl.t(`notices.duplicate.${action}.error.message`),
        kind: 'danger',
        link: {
          text: intl.t('notices.duplicate.action'),
          action: handleUseExistingChannel,
        },
      });
    }
    return notices;
  }
  /**
   * Computes the IQuery used to populate the gallery component with relevant channel moderators.
   * For channels without groups, this will build a query for org admins only. When channel groups
   * exist, it will build a query for org admins and all channel group managers
   */
  get channelModeratorsQuery() {
    const { channelGroupsManagers, channelOrgsIds, values, _context, channel } = this;
    const predicates = [
      { username: channel ? channel.creator : _context.currentUser.username },
    ];
    if ([utils.SharingAccess.ORG, utils.SharingAccess.PUBLIC].includes(values.access)) {
      predicates.push({
        role: 'org_admin',
        orgid: channelOrgsIds,
      });
    }
    if (channelGroupsManagers.length) {
      predicates.push({ username: channelGroupsManagers });
    }
    return {
      targetEntity: 'communityUser',
      filters: [
        {
          operation: 'OR',
          predicates,
        },
      ],
    };
  }
  /**
   * Computes the IQuery to be used to populate the gallery-picker component with potential
   * participant groups.
   */
  get participantGroupsQuery() {
    const hasAccessibleGroups = this.values.groups.some(groupId => !this.inaccessibleGroups.includes(groupId));
    if (hasAccessibleGroups) {
      return {
        targetEntity: 'group',
        filters: [
          {
            predicates: [{ id: this.values.groups }],
          },
        ],
      };
    }
  }
  /**
   * Computes the card action links for moderator cards
   */
  get moderatorsActionLinks() {
    return [
      {},
      {
        action: 'viewUser',
        label: this.intl.t('viewProfile'),
        showLabel: true,
        icon: 'launch',
        buttonStyle: 'transparent',
      },
    ];
  }
  /**
   * Computes the participant action links
   */
  get participantActionLinks() {
    const firstAction = this.disabled
      ? {}
      : {
        action: 'removeGroup',
        i18nKey: 'remove',
        showLabel: true,
        buttonStyle: 'solid',
      };
    return [
      firstAction,
      {
        action: 'viewGroup',
        label: this.intl.t('viewProfile'),
        showLabel: true,
        icon: 'launch',
        buttonStyle: 'transparent',
      },
    ];
  }
  /**
   * Loads channel groups managers
   */
  async loadChannelGroupsManagers() {
    const channelGroupsManagersResults = await Promise.all(this.values.groups.map(this.searchAllGroupManagers));
    this.channelGroupsManagers = []
      .concat(...channelGroupsManagersResults)
      .map(({ id }) => id)
      .filter(util.unique);
  }
  /**
   * Fetches all dependencies then updates the form values
   */
  initialize() {
    return this.loadDependencies().then(this.updateValues);
  }
  /**
   * Loads all dependencies
   */
  loadDependencies() {
    this.isLoading = true;
    return this.fetchDependencies().then(dependencies => {
      Object.assign(this, dependencies, { isLoading: false });
    });
  }
  /**
   * Updates the form values to match the relevant channel properties
   * and provides sane defaults
   */
  updateValues() {
    var _a, _b, _c, _d, _e;
    const { channel } = this;
    this.values = Object.assign(Object.assign({}, this.values), { name: discussions.getChannelName(channel, [], ''), access: (_a = channel === null || channel === void 0 ? void 0 : channel.access) !== null && _a !== void 0 ? _a : utils.SharingAccess.PRIVATE, allowAsAnonymous: (_b = channel === null || channel === void 0 ? void 0 : channel.allowAsAnonymous) !== null && _b !== void 0 ? _b : false, blockWords: (_d = (_c = channel === null || channel === void 0 ? void 0 : channel.blockWords) === null || _c === void 0 ? void 0 : _c.join(', ')) !== null && _d !== void 0 ? _d : '', groups: (_e = channel === null || channel === void 0 ? void 0 : channel.groups) !== null && _e !== void 0 ? _e : [] });
  }
  /**
   * Fetches all dependencies
   */
  async fetchDependencies() {
    const { channelId, _context } = this;
    const channel = channelId ? await channels.fetchChannel(Object.assign({ channelId }, _context.hubRequestOptions)) : null;
    return { channel };
  }
  /**
   * Recursively searches for and resolves an array of all of a group's managers
   */
  searchAllGroupManagers(groupId) {
    const recusiveSearchGroupAdmins = async (start, groupAdmins) => {
      if (start === -1) {
        return groupAdmins;
      }
      let allResults;
      let nextStart;
      try {
        const { results, hasNext } = await hubSearch.hubSearch({
          targetEntity: 'groupMember',
          filters: [
            {
              predicates: [
                {
                  group: groupId,
                  memberType: 'admin',
                },
              ],
            },
          ],
        }, {
          num: 100,
          start,
          requestOptions: this._context.hubRequestOptions,
        });
        allResults = [...groupAdmins, ...results];
        nextStart = hasNext ? allResults.length + 1 : -1;
      }
      catch (e) {
        nextStart = -1;
        allResults = groupAdmins;
        this.inaccessibleGroups = this.inaccessibleGroups.includes(groupId) ? this.inaccessibleGroups : [...this.inaccessibleGroups, groupId];
      }
      return recusiveSearchGroupAdmins(nextStart, allResults);
    };
    return groupId ? recusiveSearchGroupAdmins(1, []) : [];
  }
  /**
   * Handles changes to the `values` state member, conditionally rebuilds
   * the channel moderators query when any of the channel groups change
   */
  async handleValuesChanged(newValues, prevValues) {
    const groupsChanged = newValues.groups.length !== (prevValues === null || prevValues === void 0 ? void 0 : prevValues.groups.length) || !(prevValues === null || prevValues === void 0 ? void 0 : prevValues.groups.every((groupId) => newValues.groups.includes(groupId)));
    if (groupsChanged) {
      await this.loadChannelGroupsManagers();
    }
  }
  /**
   * Re-initializes the component when the `channelId` property changes
   */
  handleChannelIdChanged() {
    this.initialize();
  }
  /**
   * Loads component translations
   */
  async loadTranslations() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    context.bind(this.intl, 't');
  }
  /**
   * Handles `arcgisConfigurationEditorChange` events, updates `values`
   * and `isValid`
   */
  handleFormChanged(event) {
    this.values = Object.assign(Object.assign({}, this.values), event.detail.values);
    this.isValid = event.detail.valid;
  }
  /**
   * Handles `arcgisConfigurationEditorInitialized` events, updates `isValid` to match
   * the validation result so `Save` button disabled state is set properly upon form load
   */
  handleFormInitialized(event) {
    this.isValid = event.detail.valid;
  }
  /**
   * Handles clicks to the `Save` button.
   */
  handleSaveClicked() {
    const { channel, values, _context } = this;
    if (!channel || canModifyChannel.canModifyChannel(Object.assign(Object.assign({}, channel), values), _context.currentUser)) {
      this.saveChannel(false);
    }
    else {
      this.showModifyConfirmationModal = true;
    }
  }
  /**
   * Handles clicks to the `Confirm` button when prompting the user that their changes
   * will result in them losing update privileges to the channel.
   */
  handleConfirmUpdateClicked() {
    this.showModifyConfirmationModal = false;
    this.saveChannel(true);
  }
  /**
   * Handles `calciteModalClose` events and clicks to the Cancel button, resets
   * `showModifyConfirmationModal` to false
   */
  handleModifyConfirmationModalClosed() {
    this.showModifyConfirmationModal = false;
  }
  /**
   * Calls `updateChannel` when editing an existing channel, else will call `createChannel`. Sets
   * state members so appropriate notices and alerts render. Emits `arcgisHubChannelEditorSaved`
   * when successful or `arcgisHubChannelEditorError` when unsuccessful.
   */
  async saveChannel(disabled) {
    const { values, channelId, _context, intl, channel, inaccessibleGroups } = this;
    this.isSaving = true;
    this.alertConfig = null;
    const isUpdate = Boolean(channel);
    const commonData = {
      access: values.access,
      blockWords: values.blockWords
        .trim()
        .split(',')
        .filter(Boolean)
        .map(blockWord => blockWord.trim()),
      name: values.name,
      allowAsAnonymous: values.allowAsAnonymous,
    };
    try {
      this.channelAlreadyExists = false;
      const channel = isUpdate
        ? await channels.updateChannel(Object.assign({ channelId, data: Object.assign(Object.assign({}, commonData), { groups: [...inaccessibleGroups, ...values.groups].filter(util.unique) }) }, _context.hubRequestOptions))
        : await channels.createChannel(Object.assign({ data: Object.assign(Object.assign({}, commonData), { groups: values.groups }) }, _context.hubRequestOptions));
      this.channel = channel;
      this.channelId = channel.id;
      this.disabled = disabled;
      this.updateValues();
      const event = this.arcgisHubChannelEditorSaved.emit({ channel, action: isUpdate ? 'update' : 'create' });
      if (!event.defaultPrevented) {
        this.alertConfig = {
          kind: 'success',
          title: intl.t('alerts.success'),
        };
      }
    }
    catch (e) {
      this.alertConfig = {
        kind: 'danger',
        title: intl.t('alerts.error'),
      };
      this.channelAlreadyExists = e.status === 409;
      this.arcgisHubChannelEditorError.emit();
    }
    finally {
      this.isSaving = false;
    }
  }
  /**
   * Handles `calciteAlertClose` events and updates component state to
   * no longer try to render the alert
   */
  handleAlertClosed() {
    this.alertConfig = null;
  }
  /**
   * Handles clicks to the `Use existing channel` button. Searches for
   * the existing channel with the same channel access properties the
   * user has selected, then emits `arcgisHubChannelEditorSelected` with
   * that channel record
   */
  async handleUseExistingChannel() {
    const { _context, values } = this;
    const { items: [existingChannel], } = await channels$1.searchChannels(Object.assign({ data: {
        access: [values.access],
        groups: values.groups,
      } }, _context.hubRequestOptions));
    this.arcgisHubChannelEditorSelected.emit(existingChannel);
  }
  /**
   * Handles clicks to the `Add participant group` button. opens the gallery-picker
   */
  handleAddParticipantGroupClicked() {
    this.isGalleryPickerOpen = true;
  }
  /**
   * Handles `arcgisHubGalleryPickerClose` events emitted from the gallery-picker when it closes.
   * Updates local `isGalleryPickerOpen` state to keep it in sync with the actual
   * gallery-picker open/close state
   */
  handleParticipantsPickerClosed() {
    this.isGalleryPickerOpen = false;
  }
  /**
   * Handles `arcgisHubGalleryPickerSelectionUpdate` events emitted by the gallery-picker when
   * the group selections change, manually validates the form since we're updating values outside
   * of the configuration-form
   */
  handleParticipantsPickerSelectionUpdated(evt) {
    const { group: groups } = evt.detail;
    this.values = Object.assign(Object.assign({}, this.values), { groups });
    this.validate();
  }
  /**
   * Removes a participant group from values.groups and validates the form
   */
  removeParticipantGroup(model) {
    const { values } = this;
    this.values = Object.assign(Object.assign({}, values), { groups: values.groups.filter(groupId => groupId !== model.id) });
    this.validate();
    this.hubTelemetry.emit(index$1.dist.dictionary.category.content.action.update.label.groups.details.removeParticipantGroup);
  }
  /**
   * Redirects to the given URL
   */
  goToUrl(url) {
    window.open(url, '_blank');
  }
  /**
   * Handles `arcgisHubGalleryAction` events and invokes the appropriate handler
   */
  handleGalleryAction(evt) {
    const { action, model } = evt.detail;
    if (action === 'removeGroup') {
      this.removeParticipantGroup(model);
    }
    else if (['viewGroup', 'viewUser'].includes(action)) {
      this.goToUrl(model.titleUrl);
    }
  }
  /**
   * Debounces calls to _validate
   */
  validate() {
    this._validate();
  }
  /**
   * Calls validate on the configuration editor. Useful to validate the form when
   * `values` is updated outside the configuration editor, e.g. when `values.groups`
   * is updated by the gallery-picker; that component is rendered into the configuration
   * editor via a slot at this time. Once the gallery-picker configuration-editor field
   * component is flexible for our needs, we can revisit removing this.
   */
  async _validate() {
    const { valid } = await this.editorRef.validate();
    this.isValid = valid;
  }
  /**
   * Renders a gallery component of user cards for all
   * moderators (org admins, group managers) inferred
   * from the `access` and `groups` values
   */
  renderModerators() {
    return (index.h(index.Fragment, null, index.h("div", { slot: "moderators" }, this.intl.t('manage.helperText')), index.h("arcgis-hub-gallery", { cardActionLinks: this.moderatorsActionLinks, "data-test": "moderators-gallery", key: "moderators", layout: "list", limit: 100, linkTarget: "siteRelative", onArcgisHubGalleryAction: this.handleGalleryAction, query: this.channelModeratorsQuery, showEmptyState: true, slot: "moderators", sortField: "username", sortOrder: "asc" })));
  }
  /**
   * Renders the appropriate success or error alert
   */
  renderAlert() {
    const { alertConfig, intl } = this;
    if (alertConfig) {
      return (index.h("calcite-alert", { autoClose: true, autoCloseDuration: "fast", icon: true, kind: alertConfig.kind, label: intl.t('alerts.label'), onCalciteAlertClose: this.handleAlertClosed, open: true, placement: "top-end" }, index.h("div", { slot: "title" }, alertConfig.title)));
    }
  }
  /**
   * Renders relevant warning and error notices
   */
  renderNotices() {
    return this.noticeConfigs.map(this.renderNotice);
  }
  /**
   * Renders a notice for the given INoticeConfig
   */
  renderNotice({ title, message, link, kind, icon }) {
    return (index.h("calcite-notice", { icon: icon, key: title || message, kind: kind, open: true, scale: "s", width: "full" }, title && index.h("div", { slot: "title" }, title), message && index.h("div", { slot: "message" }, message), link && (index.h("calcite-link", { compact: true, onClick: link.action, slot: "link" }, link.text))));
  }
  /**
   * Renders the save button. If `footerSlotRef` is provided, we render
   * the save button into that element using `arcgis-wormhole`, else we
   * render the save button immediately below the form
   */
  renderSaveButton() {
    const { footerSlotRef } = this;
    const { disabled, isLoading, isValid, isSaving, handleSaveClicked } = this;
    if (!disabled) {
      const saveButton = (index.h("div", { class: "footer-wrapper" }, index.h("calcite-button", { disabled: isLoading || !isValid || isSaving, loading: isSaving, onClick: handleSaveClicked, round: true, type: "submit" }, this.intl.t('save'))));
      return footerSlotRef ? (index.h("arcgis-wormhole", { styles: { position: 'relative' }, target: this.footerSlotRef }, saveButton)) : (saveButton);
    }
  }
  /**
   * Renders the participants gallery and button
   */
  renderParticipants() {
    let content;
    if (this.values.groups.length) {
      content = this.participantGroupsQuery ? (index.h("arcgis-hub-gallery", { cardActionLinks: this.participantActionLinks, "data-test": "participant-groups-gallery", key: "participant-groups", layout: "list", limit: 100, linkTarget: "siteRelative", onArcgisHubGalleryAction: this.handleGalleryAction, query: this.participantGroupsQuery, showEmptyState: false, sortField: "username", sortOrder: "asc" })) : null;
    }
    else {
      content = index.h("p", { class: "no-participants" }, this.intl.t('participants.none'));
    }
    return (index.h("div", { slot: "participant-groups" }, Boolean(this.inaccessibleGroups.length) &&
      this.renderNotice({
        icon: 'information',
        kind: 'info',
        title: this.intl.t('notices.inaccessibleGroups.title', { count: this.inaccessibleGroups.length }),
        message: this.intl.t('notices.inaccessibleGroups.message'),
      }), content, !this.disabled && (index.h(index.Fragment, null, index.h("calcite-button", { appearance: "outline-fill", onClick: this.handleAddParticipantGroupClicked, round: true }, this.intl.t('participants.add')), this.isGalleryPickerOpen && (index.h("arcgis-wormhole", null, index.h("arcgis-hub-gallery-picker", { catalogs: this.participantCatalogs, "data-test": "participant-groups-picker", facets: this.particpantFacets, gallerySelection: { group: this.values.groups }, key: "gallery-picker", linkTarget: "siteRelative", modalTitle: this.intl.t('groupPicker.title'), onArcgisHubGalleryPickerClose: this.handleParticipantsPickerClosed, onArcgisHubGalleryPickerSelectionUpdate: this.handleParticipantsPickerSelectionUpdated, open: true, showSearch: true, showSelection: false, showThumbnail: true })))))));
  }
  /**
   * Renders the configuration editor
   */
  renderConfigurationEditor() {
    const { schema, uiSchema, intl, handleFormChanged, handleFormInitialized, values, disabled, isSaving } = this;
    return (index.h("arcgis-configuration-editor", { disabled: disabled || isSaving, key: "channel-editor-form", onArcgisConfigurationEditorChange: handleFormChanged, onArcgisConfigurationEditorInitialized: handleFormInitialized, ref: (el) => {
        this.editorRef = el;
      }, schema: schema, t: intl.t, uiSchema: uiSchema, values: values, variant: resources.CONFIGURATION_VARIANTS.workspace }, this.renderModerators(), this.renderParticipants()));
  }
  renderModifyConfirmationModal() {
    const { showModifyConfirmationModal, handleModifyConfirmationModalClosed, handleConfirmUpdateClicked, intl } = this;
    return (index.h("calcite-modal", { onCalciteModalClose: handleModifyConfirmationModalClosed, open: showModifyConfirmationModal }, index.h("h3", { slot: "header" }, intl.t('access.confirmation.header')), index.h("div", { slot: "content" }, intl.t('access.confirmation.message')), index.h("calcite-button", { appearance: "outline", onClick: handleModifyConfirmationModalClosed, slot: "secondary", width: "full" }, intl.t('access.confirmation.secondary')), index.h("calcite-button", { onClick: handleConfirmUpdateClicked, slot: "primary", width: "full" }, intl.t('access.confirmation.primary'))));
  }
  /**
   * Renders the form ui
   */
  renderForm() {
    return (index.h(index.Fragment, null, this.renderNotices(), this.renderConfigurationEditor(), this.renderSaveButton(), this.renderAlert(), this.renderModifyConfirmationModal()));
  }
  /**
   * Renders the skeleton ui
   */
  renderSkeleton() {
    // TODO?
    return null;
  }
  /**
   * Primary render method
   */
  render() {
    return index.h(index.Host, { "data-element": "channel-editor" }, this.isLoading ? this.renderSkeleton() : this.renderForm());
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "values": ["handleValuesChanged"],
    "channelId": ["handleChannelIdChanged"]
  }; }
};
__decorate([
  memoize.MemoizeDecoratorFactory('currentUser', 'channelOrgsIds')
], ArcgisHubChannelEditor.prototype, "isOrgAdmin", null);
__decorate([
  memoize.MemoizeDecoratorFactory('_context.currentUser')
], ArcgisHubChannelEditor.prototype, "participantCatalogs", null);
__decorate([
  memoize.MemoizeDecoratorFactory('_context.currentUser')
], ArcgisHubChannelEditor.prototype, "particpantFacets", null);
__decorate([
  memoize.MemoizeDecoratorFactory('namePrefix', 'isOrgAdmin', 'disabled')
], ArcgisHubChannelEditor.prototype, "uiSchema", null);
__decorate([
  memoize.MemoizeDecoratorFactory('channel', '_context.currentUser')
], ArcgisHubChannelEditor.prototype, "channelOrgsIds", null);
__decorate([
  memoize.MemoizeDecoratorFactory('channelId', 'disabled', 'channelAlreadyExists')
], ArcgisHubChannelEditor.prototype, "noticeConfigs", null);
__decorate([
  memoize.MemoizeDecoratorFactory('channelGroupsManagers', 'values.access', 'channel', 'channelOrgsIds', '_context.currentUser')
], ArcgisHubChannelEditor.prototype, "channelModeratorsQuery", null);
__decorate([
  memoize.MemoizeDecoratorFactory('values.groups')
], ArcgisHubChannelEditor.prototype, "participantGroupsQuery", null);
__decorate([
  memoize.MemoizeDecoratorFactory()
], ArcgisHubChannelEditor.prototype, "moderatorsActionLinks", null);
__decorate([
  memoize.MemoizeDecoratorFactory('disabled')
], ArcgisHubChannelEditor.prototype, "participantActionLinks", null);
__decorate([
  debounce.DebounceDecoratorFactory({ timeout: 250 })
], ArcgisHubChannelEditor.prototype, "validate", null);
ArcgisHubChannelEditor.style = arcgisHubChannelEditorCss;

exports.arcgis_hub_channel_editor = ArcgisHubChannelEditor;
