'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7c083111.js');
const helpState = require('./help-state-11adf6ee.js');
const state = require('./state-6637df8c.js');
const intlManager = require('./intl-manager-f0103583.js');
const getPredicateValues = require('./getPredicateValues-091930af.js');
const logger = require('./logger-5db3d659.js');
const subschemas = require('./subschemas-61a41e85.js');
const utils = require('./utils-2d7faff6.js');
const HubInitiatives = require('./HubInitiatives-25ecf40a.js');
const hubSearch = require('./hubSearch-79d30702.js');
const HubPage = require('./HubPage-0395747a.js');
require('./store-2a385ca0.js');
require('./index-6f16fe65.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./util-38e73510.js');
require('./get-prop-4bd8fc1a.js');
require('./index-f4a4c954.js');
require('./interfaces-f2794fff.js');
require('./Catalog-acebae88.js');
require('./ArcGISContextManager-c5cc74e9.js');
require('./get-portal-api-url-9ba1158a.js');
require('./get-portal-url-68b1f527.js');
require('./get-portal-url-44f2448f.js');
require('./clean-url-1dfecac0.js');
require('./fail-safe-33c35b7f.js');
require('./request-67da3c71.js');
require('./checkPermission-11ab5992.js');
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./map-by-a7a75788.js');
require('./get-user-5eecc1c4.js');
require('./tslib.es6-e7faa7f3.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./encoding-211adb23.js');
require('./index-058372c1.js');
require('./UserSession-f8bc10c8.js');
require('./get-portal-6ca924c2.js');
require('./is-guid-b5c2b74c.js');
require('./HubError-44e07249.js');
require('./OperationError-902f34ae.js');
require('./fetch-1292fb6b.js');
require('./getPropertyMap-030ec7b2.js');
require('./PropertyMapper-785e5c9f.js');
require('./utils-7f390376.js');
require('./set-prop-3de2437f.js');
require('./deep-set-49b373be.js');
require('./events-7873340d.js');
require('./types-751ad3a9.js');
require('./registrations-a6dd52b7.js');
require('./getRelativeWorkspaceUrl-6dfbafa1.js');
require('./getTypeFromEntity-9476954e.js');
require('./get-family-cafa88bb.js');
require('./compose-9b4311c9.js');
require('./get-structured-license-4e9f994b.js');
require('./get-item-home-url-b1e3ff74.js');
require('./extent-715f7c8d.js');
require('./helpers-64227739.js');
require('./slugify-826af07b.js');
require('./themes-d539965a.js');
require('./domain-exists-0c69176a.js');
require('./search-2db68ef4.js');
require('./append-custom-params-0f5d0fe2.js');
require('./generate-random-string-8807d629.js');
require('./get-0368c931.js');
require('./update-b8977041.js');
require('./create-6279e23e.js');
require('./slugs-9d179f70.js');
require('./object-to-json-blob-5c0a267d.js');
require('./delete-prop-7826ae49.js');
require('./fetchHubEntity-88467d55.js');
require('./get-form-json-e6831b20.js');
require('./hostedServiceUtils-236344a8.js');
require('./is-service-9b8238d2.js');
require('./_deep-map-values-d489006b.js');
require('./settings-0b8cd93b.js');
require('./discussions-api-request-e9e6e346.js');
require('./request-79b61e92.js');
require('./fetchContent-963f3885.js');
require('./tslib.es6-b6cfa7d7.js');
require('./_enrichments-a40a3850.js');
require('./fetch-org-d214b65b.js');
require('./getService-b27eda44.js');
require('./slugs-8f743e2c.js');
require('./index-ef80ab27.js');
require('./getLayer-0c83b4c1.js');
require('./unshareEntityWithGroups-08f84f4d.js');
require('./unshareEventWithGroups-609ca09c.js');
require('./poll-7962a495.js');
require('./search-b00c4c79.js');
require('./share-item-to-groups-6bc2a4bc.js');
require('./share-item-with-group-6c27286f.js');
require('./helpers-05252545.js');
require('./get-52661c13.js');
require('./update-user-membership-4af88c1c.js');
require('./unshare-item-from-groups-3f34f54a.js');
require('./unshare-item-with-group-05dbcf93.js');
require('./types-097b54b1.js');
require('./getTypeWithKeywordQuery-b54b0107.js');
require('./remove-921f5dc7.js');
require('./Metrics-b8657153.js');
require('./update-7b2b2d9d.js');
require('./dasherize-f02a08e0.js');
require('./wellKnownCatalog-799c8326.js');
require('./merge-objects-b31af1a3.js');
require('./channels-bf478342.js');
require('./is-update-group-36bf5d24.js');
require('./remove-df88a78e.js');
require('./getEditorConfig-1d006950.js');
require('./getEditorSlug-eeb95a05.js');
require('./sharedWith-ca14e4af.js');
require('./enrichEntity-1632b924.js');
require('./access-049994c9.js');

const States = {
  isSpecifyInfo: (state) => state.tag === 'SpecifyInfo',
  isSelectGroups: (state) => state.tag === 'SelectGroups',
  isWorking: (state) => state.tag === 'Working',
  isConfirmation: (state) => state.tag === 'Confirmation',
  isFailure: (state) => state.tag === 'Failure',
};
const DEFAULT_SPECIFY_INFO_STATE = {
  tag: 'SpecifyInfo',
  component: 'arcgis-configuration-editor',
  configurationValues: {},
  selectedGroupIds: [],
  stepIndex: 0
};
const DEFAULT_SELECT_GROUPS_STATE = {
  tag: 'SelectGroups',
  component: 'arcgis-hub-gallery',
  selectedGroupIds: [],
  stepIndex: 1,
};
const DEFAULT_WORKING_STATE = {
  tag: 'Working',
  action: 'migratePage',
  component: helpState.HelpState,
  componentArgs: {
    state: 'loading',
    headingKey: 'working.heading',
    loadingLabel: 'working.loadingLabel',
  },
  stepIndex: 2,
};

/**
 * Get the configuration for a gallery of groups the user can choose to share to
 * @param context
 * @param options
 * @returns
 */
function getGroupsGalleryConfig(context, catalog, options) {
  const groupsByMembership = getPredicateValues.getCatalogGroups(catalog, context);
  const groupIds = [...groupsByMembership['admin'], ...groupsByMembership['member'], ...groupsByMembership['owner']];
  const query = {
    targetEntity: "group",
    filters: [
      {
        predicates: [
          {
            searchUserAccess: 'groupMember',
            searchUserName: context.currentUser.username,
            id: groupIds
          },
        ]
      }
    ]
  };
  const result = {
    corners: 'round',
    gallerySelection: { group: options.selectedGroupIds },
    layout: 'grid',
    limit: 8,
    linkTarget: 'siteRelative',
    newTab: true,
    query,
    selectionMode: 'multiple',
    showLayoutSwitcher: true,
    showMoreResultsBtn: true,
    showResultsCount: true,
    showSearch: true,
    showSelection: true,
    showSort: true,
    state: Object.assign({}, options === null || options === void 0 ? void 0 : options.state)
  };
  return result;
}

const Actions = {
  isInitialize: (action) => action.tag === 'Initialize',
  isGallerySelectionChanged: (action) => action.tag === 'GallerySelectionChanged',
  isGalleryStateChanged: (action) => action.tag === 'GalleryStateChanged',
  isConfigurationEditorChanged: (action) => action.tag === 'ConfigurationEditorChanged',
  isNextStep: (action) => action.tag === 'NextStep',
  isPreviousStep: (action) => action.tag === 'PreviousStep',
  isStepChanged: (action) => action.tag === 'StepChanged',
  isSuccess: (action) => action.tag === 'Success',
  isFailure: (action) => action.tag === 'Failure',
  isRetry: (action) => action.tag === 'Retry',
};

const MIGRATE_PAGE_SCHEMA = {
  $async: true,
  type: "object",
  required: ['name', 'slug'],
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 250,
      format: "entityTitleValidator",
    },
    slug: subschemas.SLUG_SCHEMA
  },
};
const MIGRATE_PAGE_UI_SCHEMA = {
  type: "Layout",
  elements: [
    {
      labelKey: 'form.title.label',
      scope: "/properties/name",
      type: "Control",
      options: {
        messages: [
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            labelKey: 'form.title.requiredError',
          },
          {
            type: "ERROR",
            keyword: "format",
            icon: true,
            labelKey: 'form.title.entityTitleValidatorError'
          },
        ],
      },
    },
    {
      labelKey: 'form.slug.label',
      scope: "/properties/slug",
      type: "Control",
      options: {
        control: "hub-field-input-input",
        helperText: {
          labelKey: 'form.slug.helperText'
        },
        messages: [
          {
            type: "ERROR",
            keyword: "pattern",
            icon: true,
            labelKey: 'form.slug.patternError',
          },
          {
            type: "ERROR",
            keyword: "required",
            icon: true,
            labelKey: 'form.slug.requiredError',
          },
        ],
      },
    }
  ]
};
class MigratePageMachine {
  constructor(context, options) {
    this.context = context;
    this.t = options === null || options === void 0 ? void 0 : options.t;
    this.page = options.page;
    this.site = options.site;
    this.history = [];
  }
  ;
  /**
  * Called to start the machine
  * @returns the initial state
  */
  start() {
    this.history = [];
    return this.reduce({ tag: 'Initialize' });
  }
  /**
  * Called to get a new state from the machine
  */
  reduce(action, state) {
    /*
      NOTE: we want this to return the passed in state if we don't have a reducer for it (which should mean it is an invalid action for the state)
            so the top level reducer should return the passed in state if it doesn't have a reducer for the action
            all the private reducers return undefined if they don't have a reducer for the action
    */
    let result = state;
    let newState;
    if (!state) {
      newState = this.reduceInitial(action);
    }
    else if (States.isSpecifyInfo(state)) {
      newState = this.reduceSpecifyInfo(action, state);
    }
    else if (States.isSelectGroups(state)) {
      newState = this.reduceSelectGroups(action, state);
    }
    else if (States.isWorking(state)) {
      newState = this.reduceWorking(action, state);
    }
    else if (States.isFailure(state)) {
      newState = this.reduceFailure(action, state);
    }
    if (newState) {
      const steps = this.reduceSteps(action, newState);
      const controls = this.reduceControls(action, newState);
      result = Object.assign(Object.assign(Object.assign({}, newState), steps), controls);
    }
    else {
      logger.Logger.warn(`reducer for state: ${state.tag}, and action: ${action.tag} is not implemented`);
    }
    this.history.push({ action, state, result });
    return result;
  }
  logHistory() {
    console.debug('MigratePageMachine', this.history);
  }
  get helpStateProps() {
    return {
      heading: this.t('heading'),
      icon: 'file-text',
      isMain: false,
    };
  }
  reduceInitial(action) {
    if (Actions.isInitialize(action)) {
      const { helpStateProps } = this;
      const slug = this.site.pages.find(p => p.id === this.page.id).slug;
      return Object.assign(Object.assign({}, DEFAULT_SPECIFY_INFO_STATE), { componentArgs: {
          schema: MIGRATE_PAGE_SCHEMA,
          scale: 'l',
          uiSchema: MIGRATE_PAGE_UI_SCHEMA,
          values: {
            name: this.page.name,
            slug: slug
          }
        }, helpStateProps, selectedGroupIds: [] });
    }
  }
  reduceSpecifyInfo(action, state) {
    const { componentArgs, configurationValues, groupsGalleryState, selectedGroupIds } = state;
    if (Actions.isConfigurationEditorChanged(action)) {
      const { helpStateProps } = this;
      return Object.assign(Object.assign({}, DEFAULT_SPECIFY_INFO_STATE), { componentArgs: Object.assign(Object.assign({}, componentArgs), { values: action.configurationValues.values }), configurationValues: action.configurationValues, helpStateProps,
        selectedGroupIds });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectContent step and we got the NextStep action
      // eslint-disable-next-line unicorn/prefer-ternary
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs: getGroupsGalleryConfig(this.context, this.site.catalog, {
          selectedGroupIds: state.selectedGroupIds,
          state: groupsGalleryState,
          t: this.t,
        }), configurationValues,
        groupsGalleryState,
        selectedGroupIds });
    }
    if (Actions.isStepChanged(action)) {
      // we are on the SpecifyInfo step and we got the StepChanged action
      // this is when a user selects a step from the stepper (ie they did not use the Next or Back buttons)
      if (action.stepIndex === state.stepIndex) {
        // this means we stay on the current step
        return state;
      }
      if (action.stepIndex === 1) {
        // if we are on the createcontent state (which is index 1) and we want to go to index 2, that amounts to a NextStep action
        return this.reduceSpecifyInfo({ tag: 'NextStep' }, state);
      }
      if (action.stepIndex === 2) {
        return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { configurationValues,
          selectedGroupIds });
      }
    }
  }
  reduceSelectGroups(action, state) {
    const { componentArgs, configurationValues, groupsGalleryState, selectedGroupIds } = state;
    if (Actions.isGallerySelectionChanged(action)) {
      componentArgs.gallerySelection = action.selected;
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        groupsGalleryState,
        configurationValues, selectedGroupIds: action.selected.group });
    }
    if (Actions.isGalleryStateChanged(action)) {
      return Object.assign(Object.assign({}, DEFAULT_SELECT_GROUPS_STATE), { componentArgs,
        configurationValues, groupsGalleryState: action.galleryState, selectedGroupIds });
    }
    if (Actions.isPreviousStep(action)) {
      // we are on the SelectGroups step and we got the PreviousStep action
      const { helpStateProps } = this;
      return Object.assign(Object.assign({}, DEFAULT_SPECIFY_INFO_STATE), { componentArgs: {
          context: this.context,
          values: state.configurationValues.values,
          schema: MIGRATE_PAGE_SCHEMA,
          uiSchema: MIGRATE_PAGE_UI_SCHEMA,
          scale: 'l'
        }, configurationValues: state.configurationValues, groupsGalleryState,
        helpStateProps,
        selectedGroupIds });
    }
    if (Actions.isNextStep(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { configurationValues,
        selectedGroupIds });
    }
    if (Actions.isStepChanged(action)) {
      // we are on the SelectGroups step and we got the StepChanged action
      // this is when a user selects a step from the stepper (ie they did not use the Next or Back buttons)
      if (action.stepIndex === state.stepIndex) {
        // this means we stay on the current step
        return state;
      }
      if (action.stepIndex === 0) {
        // if we are on the selectgroups state (which is index 1) and we want to go to index 0, that amounts to a PreviousStep action
        return this.reduceSelectGroups({ tag: 'PreviousStep' }, state);
      }
      if (action.stepIndex === 2) {
        // if we are on the selectgroups state (which is index 1) and we want to go to index 2, that amounts to a NextStep action
        return this.reduceSelectGroups({ tag: 'NextStep' }, state);
      }
    }
  }
  // Shared reduce logic for the Working and Confirmation states
  reduceWorking(action, state) {
    const { configurationValues, selectedGroupIds } = state;
    if (Actions.isSuccess(action)) {
      // we are in the working state and we got the Success action
      // this means we successfully added the content
      // we should show the confirmation state
      const isSuccess = action.results.overallStatus === 'success';
      const icon = isSuccess ? 'check-circle' : 'exclamation-mark-triangle';
      return {
        tag: 'Confirmation',
        component: 'arcgis-hub-page-migration-results',
        stepIndex: 2,
        componentArgs: {
          results: action.results,
          icon,
          helpStateConfig: {
            heading: isSuccess ? 'successHeading' : 'failureHeading',
            icon,
            kind: isSuccess ? 'success' : 'warning',
            isMain: false,
          }
        },
        // telemetry: {
        //   ...dictionary.category.groups.action.share.label.content,
        //   response: telemetryConstants.response.SUCCESS,
        // }
      };
    }
    if (Actions.isFailure(action)) {
      // we are in the working state and we got the Failure action
      // this means we failed to add the content
      // we should return the failure state
      return {
        tag: 'Failure',
        component: helpState.HelpState,
        configurationValues,
        selectedGroupIds,
        stepIndex: 2,
        componentArgs: {
          actionKey: 'failure.action',
          headingKey: 'failure.heading',
          icon: 'frown',
          kind: 'danger',
          messageKey: 'failure.message',
        },
        // telemetry: {
        //   ...dictionary.category.groups.action.share.label.content,
        //   response: telemetryConstants.response.FAILURE,
        // }
      };
    }
  }
  reduceFailure(action, state) {
    const { configurationValues, selectedGroupIds } = state;
    if (Actions.isRetry(action)) {
      // we are on the SelectGroups step and we got the NextStep action
      return Object.assign(Object.assign({}, DEFAULT_WORKING_STATE), { configurationValues,
        selectedGroupIds });
    }
  }
  reduceSteps(_, state) {
    // this is the stepper steps
    const selectedGroupIds = state.selectedGroupIds || [];
    const configurationValues = state.configurationValues || {};
    // NOTE: the state here is the _new_ state
    const steps = [
      {
        labelKey: 'steps.specifyInfo',
        complete: States.isWorking(state) || States.isSelectGroups(state) || States.isConfirmation(state) || States.isFailure(state),
        disabled: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
        error: false
      }
    ];
    let groupsStepIsDisabled = true;
    // eslint-disable-next-line unicorn/prefer-ternary
    if (States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state)) {
      groupsStepIsDisabled = true;
    }
    else {
      groupsStepIsDisabled = !state.configurationValues.valid;
    }
    steps.push({
      labelKey: 'steps.selectGroups',
      complete: States.isWorking(state) || States.isConfirmation(state) || States.isFailure(state),
      disabled: groupsStepIsDisabled,
      error: false
    });
    let confirmationStepIsDisabled = true;
    if (States.isConfirmation(state) || States.isFailure(state) || States.isWorking(state)) {
      confirmationStepIsDisabled = false;
    }
    else if (States.isSpecifyInfo(state) || States.isSelectGroups(state)) {
      confirmationStepIsDisabled = !configurationValues.valid || !selectedGroupIds.length;
    }
    steps.push({
      labelKey: 'steps.confirmation',
      complete: States.isConfirmation(state),
      disabled: confirmationStepIsDisabled,
      error: States.isFailure(state)
    });
    return { steps };
  }
  reduceControls(_, state) {
    // this is the controls at the bottom
    // NOTE: the state here is the _new_ state
    const selectedGroupIds = state.selectedGroupIds || [];
    let nextIsDisabled = true;
    if (States.isSpecifyInfo(state)) {
      nextIsDisabled = !state.configurationValues.valid;
    }
    else if (States.isSelectGroups(state)) {
      nextIsDisabled = !selectedGroupIds.length;
    }
    let nextButtonLabelKey = 'controls.next';
    if (States.isSelectGroups(state)) {
      nextButtonLabelKey = 'controls.migrate';
    }
    return {
      controls: {
        back: {
          visible: States.isSelectGroups(state),
          labelKey: 'controls.back'
        },
        selection: {
          visible: States.isSelectGroups(state),
          count: selectedGroupIds === null || selectedGroupIds === void 0 ? void 0 : selectedGroupIds.length,
        },
        next: {
          visible: States.isSpecifyInfo(state) || States.isSelectGroups(state),
          disabled: nextIsDisabled,
          labelKey: nextButtonLabelKey
        },
        cancel: {
          visible: States.isSpecifyInfo(state) || States.isSelectGroups(state),
          labelKey: 'controls.cancel'
        },
        close: {
          visible: States.isConfirmation(state) || States.isFailure(state) || States.isWorking(state),
          disabled: States.isWorking(state),
          labelKey: 'controls.close'
        }
      },
    };
  }
}

const arcgisHubPageMigrationWorkflowCss = ":host{display:flex;flex-direction:column;justify-content:space-between;gap:1rem;width:calc(100% - 2px)}.sc-arcgis-hub-page-migration-scroll-container{height:65vh;overflow-y:auto;padding-inline:4px}arcgis-configuration-editor{max-width:60%;margin:0 auto}arcgis-configuration-editor-field calcite-label>span:first-child{font-weight:bold}.sc-arcgis-hub-page-migration-footer{display:flex;justify-content:space-between;gap:0.5rem;border-width:0px;border-top-width:1px;border-style:solid;border-color:var(--calcite-color-border-1);padding-block-start:var(--calcite-panel-content-space)}.sc-arcgis-hub-page-migration-footer-start,.sc-arcgis-hub-page-migration-footer-end{display:flex;gap:0.5rem}.sc-arcgis-hub-page-migration-selection-count{display:flex;align-items:center;border-radius:0.25rem;padding:0.75rem;background-color:var(--calcite-color-foreground-1);--calcite-label-margin-bottom:0;border:solid 1px var(--calcite-color-text-1)}";

const ArcgisHubPageMigrationWorkflow = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hubTelemetry = index.createEvent(this, "hubTelemetry", 7);
    this.arcgisHubPageMigrationWorkflowComplete = index.createEvent(this, "arcgisHubPageMigrationWorkflowComplete", 7);
    this.arcgisHubPageMigrationWorkflowClose = index.createEvent(this, "arcgisHubPageMigrationWorkflowClose", 7);
    /**
    * Handler for clicking a step item in the stepper header
    */
    this.handleStepperItemChange = (evt) => {
      const { state } = this;
      // this is insane but i don't think there is a good way to get the index of the selected item from the stepper
      const stepIndex = Array.from(evt.target.children).reduce((acc, item, idx) => {
        if (item.selected) {
          return idx;
        }
        return acc;
      }, -1);
      const action = { tag: 'StepChanged', stepIndex };
      this.state = this.machine.reduce(action, state);
    };
    /**
    * Handler for the back button
    */
    this.handleBackButton = () => {
      const { state } = this;
      const action = { tag: 'PreviousStep' };
      this.state = this.machine.reduce(action, state);
    };
    /**
    * Handler for the next button
    */
    this.handleNextButton = () => {
      const { state } = this;
      const action = { tag: 'NextStep' };
      this.state = this.machine.reduce(action, state);
    };
    /**
    * Handler for the cancel button
    */
    this.handleCancelButton = () => {
      this.arcgisHubPageMigrationWorkflowClose.emit();
    };
    /**
    * Handler for the close/done button
    */
    this.handleCloseButton = () => {
      this.arcgisHubPageMigrationWorkflowClose.emit();
    };
    this.pageId = undefined;
    this.site = undefined;
    this.state = undefined;
    this.shouldShowModal = false;
  }
  get _context() { return state.getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.intlManager.loadIntlForComponent(this.element);
    this.initMachine();
  }
  async initMachine() {
    const page = await HubInitiatives.fetchPage(this.pageId, this._context.hubRequestOptions);
    const options = {
      t: (key, opts) => this.intl.t(key, opts),
      page,
      site: this.site,
    };
    this.machine = new MigratePageMachine(this._context, options);
    this.state = this.machine.start();
  }
  async sharePageWithGroups(groupIds, page) {
    const groupPromises = groupIds.map(groupId => hubSearch.fetchHubGroup(groupId, this._context.hubRequestOptions));
    const groups = await Promise.all(groupPromises);
    return utils.shareEntitiesToGroups(groups, [page.toJson()], this._context);
  }
  async migratePage(state) {
    try {
      const page = await HubPage.HubPage.fetch(this.pageId, this._context);
      // add the page to the selected groups
      const shareResult = await this.sharePageWithGroups(state.selectedGroupIds, page);
      const sharedWithSomeGroups = shareResult.results.some(result => result.status === 'success');
      if (sharedWithSomeGroups) {
        // save the page (update the title and slug)
        page.update(state.configurationValues.values);
        await page.save();
        // remove the page from the site's hash and update the site
        this.site.pages = this.site.pages.filter(p => p.id !== this.pageId);
        await HubInitiatives.updateSite(this.site, this._context.hubRequestOptions);
      }
      const action = { tag: 'Success', results: shareResult };
      this.state = this.machine.reduce(action, state);
    }
    catch (error) {
      this.state = this.machine.reduce({ tag: 'Failure', error }, state);
    }
  }
  stateChanged(state) {
    if (state.telemetry) {
      // if the new state has telemetry, emit it
      this.hubTelemetry.emit(state.telemetry);
    }
    if (States.isWorking(state) && state.action) {
      // if the new state is the Working state and it has an action, execute it
      this[state.action](state);
    }
    if (States.isConfirmation(state)) {
      // if the new state is the Confirmation state, emit the complete event
      this.arcgisHubPageMigrationWorkflowComplete.emit(this.pageId);
    }
  }
  /**
  * Handler for gallery state change events
  * This is used for the content gallery and the groups gallery - the state machien decides what to do with it
  */
  handleGalleryStateChange(event) {
    if (!event.detail.isInitialization) {
      const { state } = this;
      const action = { tag: 'GalleryStateChanged', galleryState: event.detail };
      this.state = this.machine.reduce(action, state);
    }
  }
  /**
  * Handler for gallery selection events
  * This is used for the content gallery and the groups gallery - the state machien decides what to do with it
  */
  handleGallerySelect(event) {
    const { state } = this;
    const action = { tag: 'GallerySelectionChanged', selected: event.detail };
    this.state = this.machine.reduce(action, state);
  }
  /**
  * Handler for clicks of the arcgis-hub-help-state action
  * This is currently only used for the retry action
  */
  handleHelpStateActionClick() {
    const { state } = this;
    this.state = this.machine.reduce({ tag: 'Retry' }, state);
  }
  // NOTE: i have no idea why but the initialized event must be captured
  handleConfigEditorChange(event) {
    const { state } = this;
    this.state = this.machine.reduce({ tag: 'ConfigurationEditorChanged', configurationValues: event.detail }, state);
  }
  /**
  * Renders the content for the active step based on the component and component args provided on the state
  */
  renderCurrentStep(stepIndex) {
    const { state } = this;
    if (state && state.stepIndex === stepIndex) {
      const results = [];
      if (state.helpStateProps) {
        results.push(index.h("arcgis-hub-help-state", Object.assign({ class: "create-help-state" }, state.helpStateProps)));
      }
      if (state.component) {
        const props = Object.assign(Object.assign({}, state.componentArgs), { t: (key) => this.intl.t(key) });
        results.push(index.h(this.state.component, Object.assign({}, props)));
      }
      return results;
    }
  }
  renderSelectionCount(state) {
    const { selection } = state.controls;
    if (selection.visible) {
      const selectionKey = selection.limit ? 'selection.limited' : 'selection.unlimited';
      return index.h("div", { class: "sc-arcgis-hub-page-migration-selection-count" }, index.h("calcite-label", null, this.intl.t(selectionKey, selection)));
    }
  }
  renderControls(state) {
    return index.h("div", { class: "sc-arcgis-hub-page-migration-footer" }, index.h("div", { class: "sc-arcgis-hub-page-migration-footer-start" }, state.controls.back.visible &&
      index.h("calcite-button", { apperance: "outline", disabled: state.controls.back.disabled, kind: "neutral", onClick: this.handleBackButton, round: true, scale: "l" }, this.intl.t(state.controls.back.labelKey)), this.renderSelectionCount(state)), index.h("div", { class: "sc-arcgis-hub-page-migration-footer-end" }, state.controls.cancel.visible &&
      index.h("calcite-button", { appearance: "outline", disabled: state.controls.cancel.disabled, onClick: this.handleCancelButton, round: true, scale: "l" }, this.intl.t(state.controls.cancel.labelKey)), state.controls.next.visible &&
      index.h("calcite-button", { disabled: state.controls.next.disabled, onClick: this.handleNextButton, round: true, scale: "l" }, this.intl.t(state.controls.next.labelKey)), state.controls.close.visible &&
      index.h("calcite-button", { disabled: state.controls.close.disabled, onClick: this.handleCloseButton, round: true, scale: "l" }, this.intl.t(state.controls.close.labelKey))));
  }
  render() {
    const { state } = this;
    if (state) {
      return (index.h(index.Host, { "data-element": "hub-page-migration-workflow" }, index.h("calcite-stepper", { icon: true, numbered: true, onCalciteStepperChange: this.handleStepperItemChange }, state.steps.map((step, idx) => {
        return (index.h("calcite-stepper-item", { complete: step.complete, disabled: step.disabled, error: step.error, heading: this.intl.t(step.labelKey), key: step.labelKey, selected: state.stepIndex === idx }, index.h("div", { class: "sc-arcgis-hub-page-migration-scroll-container" }, this.renderCurrentStep(idx))));
      })), this.renderControls(state)));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "state": ["stateChanged"]
  }; }
};
ArcgisHubPageMigrationWorkflow.style = arcgisHubPageMigrationWorkflowCss;

exports.arcgis_hub_page_migration_workflow = ArcgisHubPageMigrationWorkflow;
