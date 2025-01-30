import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import { H as HelpState } from './help-state-4de44f92.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { g as getCatalogGroups } from './getPredicateValues-ef475313.js';
import { L as Logger } from './logger-f8667200.js';
import { k as SLUG_SCHEMA } from './subschemas-4d56570e.js';
import { s as shareEntitiesToGroups } from './utils-d4523406.js';
import { a as fetchPage, D as updateSite } from './HubInitiatives-4f4e24ce.js';
import { a as fetchHubGroup } from './hubSearch-41612481.js';
import { H as HubPage } from './HubPage-e56c4fe7.js';
import './store-0a6cb79f.js';
import './index-dd3f99ac.js';
import './_commonjsHelpers-11ca3be1.js';
import './util-3e6872d9.js';
import './get-prop-ec5be510.js';
import './index-213c70d0.js';
import './interfaces-fd83cf89.js';
import './Catalog-290f043e.js';
import './ArcGISContextManager-c977211a.js';
import './get-portal-api-url-8aa1582b.js';
import './get-portal-url-cc8a77b9.js';
import './get-portal-url-b1c49fc5.js';
import './clean-url-dff2b6ee.js';
import './fail-safe-cd1a5a2a.js';
import './request-fa80ae40.js';
import './checkPermission-6c5be250.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './map-by-a2234e13.js';
import './get-user-f035bd36.js';
import './tslib.es6-7023f322.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './encoding-1c5014ff.js';
import './index-0a8fd06b.js';
import './UserSession-2c05f7b6.js';
import './get-portal-5e0a1617.js';
import './is-guid-982831aa.js';
import './HubError-e26c5610.js';
import './OperationError-387ae9ab.js';
import './fetch-63549ae7.js';
import './getPropertyMap-10ee9d61.js';
import './PropertyMapper-4eb0ac8f.js';
import './utils-6bf1b713.js';
import './set-prop-9a4aa9a9.js';
import './deep-set-67281c6f.js';
import './events-c59246f8.js';
import './types-db540898.js';
import './registrations-431b9788.js';
import './getRelativeWorkspaceUrl-ac123b7f.js';
import './getTypeFromEntity-e149b61e.js';
import './get-family-543fac52.js';
import './compose-d5b83ab7.js';
import './get-structured-license-33306790.js';
import './get-item-home-url-b414b731.js';
import './extent-34a4ba2a.js';
import './helpers-8c7e5e31.js';
import './slugify-e3e67bac.js';
import './themes-e08327b4.js';
import './domain-exists-4fd7dc09.js';
import './search-c7a57aa9.js';
import './append-custom-params-4bd856e5.js';
import './generate-random-string-1436d9e6.js';
import './get-f0caeb52.js';
import './update-6a7d5697.js';
import './create-de41f6f6.js';
import './slugs-7ec67036.js';
import './object-to-json-blob-583ae5c3.js';
import './delete-prop-bd13d424.js';
import './fetchHubEntity-28d04ab4.js';
import './get-form-json-1d4e3591.js';
import './hostedServiceUtils-f22b023b.js';
import './is-service-ad021db8.js';
import './_deep-map-values-53f8dbd1.js';
import './settings-2d4e159a.js';
import './discussions-api-request-199cae2d.js';
import './request-3e386aeb.js';
import './fetchContent-dbc662af.js';
import './tslib.es6-9c17e83a.js';
import './_enrichments-8641475c.js';
import './fetch-org-8e578c0d.js';
import './getService-e61b8c6e.js';
import './slugs-7b8828d5.js';
import './index-edff2d62.js';
import './getLayer-464ff70e.js';
import './unshareEntityWithGroups-78dcc7e1.js';
import './unshareEventWithGroups-2bac7a58.js';
import './poll-77a94dfa.js';
import './search-211dee83.js';
import './share-item-to-groups-547b9cd0.js';
import './share-item-with-group-5711513b.js';
import './helpers-6692d307.js';
import './get-850c466d.js';
import './update-user-membership-261681cf.js';
import './unshare-item-from-groups-b09dcce3.js';
import './unshare-item-with-group-b4a3a08f.js';
import './types-2eaa1a18.js';
import './getTypeWithKeywordQuery-9f583e1b.js';
import './remove-7361a90a.js';
import './Metrics-9cb7a1fc.js';
import './update-26e2fbc1.js';
import './dasherize-9215e9fc.js';
import './wellKnownCatalog-7e9f7f53.js';
import './merge-objects-5b123ab3.js';
import './channels-2574fd6e.js';
import './is-update-group-7b9eb0ea.js';
import './remove-2e7122d1.js';
import './getEditorConfig-a89f031d.js';
import './getEditorSlug-78023e22.js';
import './sharedWith-3ad296b7.js';
import './enrichEntity-a5bc0b4f.js';
import './access-7968589d.js';

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
  component: HelpState,
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
  const groupsByMembership = getCatalogGroups(catalog, context);
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
    slug: SLUG_SCHEMA
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
      Logger.warn(`reducer for state: ${state.tag}, and action: ${action.tag} is not implemented`);
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
        component: HelpState,
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
    registerInstance(this, hostRef);
    this.hubTelemetry = createEvent(this, "hubTelemetry", 7);
    this.arcgisHubPageMigrationWorkflowComplete = createEvent(this, "arcgisHubPageMigrationWorkflowComplete", 7);
    this.arcgisHubPageMigrationWorkflowClose = createEvent(this, "arcgisHubPageMigrationWorkflowClose", 7);
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
  get _context() { return getGlobalContext(); }
  async componentWillLoad() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    this.initMachine();
  }
  async initMachine() {
    const page = await fetchPage(this.pageId, this._context.hubRequestOptions);
    const options = {
      t: (key, opts) => this.intl.t(key, opts),
      page,
      site: this.site,
    };
    this.machine = new MigratePageMachine(this._context, options);
    this.state = this.machine.start();
  }
  async sharePageWithGroups(groupIds, page) {
    const groupPromises = groupIds.map(groupId => fetchHubGroup(groupId, this._context.hubRequestOptions));
    const groups = await Promise.all(groupPromises);
    return shareEntitiesToGroups(groups, [page.toJson()], this._context);
  }
  async migratePage(state) {
    try {
      const page = await HubPage.fetch(this.pageId, this._context);
      // add the page to the selected groups
      const shareResult = await this.sharePageWithGroups(state.selectedGroupIds, page);
      const sharedWithSomeGroups = shareResult.results.some(result => result.status === 'success');
      if (sharedWithSomeGroups) {
        // save the page (update the title and slug)
        page.update(state.configurationValues.values);
        await page.save();
        // remove the page from the site's hash and update the site
        this.site.pages = this.site.pages.filter(p => p.id !== this.pageId);
        await updateSite(this.site, this._context.hubRequestOptions);
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
        results.push(h("arcgis-hub-help-state", Object.assign({ class: "create-help-state" }, state.helpStateProps)));
      }
      if (state.component) {
        const props = Object.assign(Object.assign({}, state.componentArgs), { t: (key) => this.intl.t(key) });
        results.push(h(this.state.component, Object.assign({}, props)));
      }
      return results;
    }
  }
  renderSelectionCount(state) {
    const { selection } = state.controls;
    if (selection.visible) {
      const selectionKey = selection.limit ? 'selection.limited' : 'selection.unlimited';
      return h("div", { class: "sc-arcgis-hub-page-migration-selection-count" }, h("calcite-label", null, this.intl.t(selectionKey, selection)));
    }
  }
  renderControls(state) {
    return h("div", { class: "sc-arcgis-hub-page-migration-footer" }, h("div", { class: "sc-arcgis-hub-page-migration-footer-start" }, state.controls.back.visible &&
      h("calcite-button", { apperance: "outline", disabled: state.controls.back.disabled, kind: "neutral", onClick: this.handleBackButton, round: true, scale: "l" }, this.intl.t(state.controls.back.labelKey)), this.renderSelectionCount(state)), h("div", { class: "sc-arcgis-hub-page-migration-footer-end" }, state.controls.cancel.visible &&
      h("calcite-button", { appearance: "outline", disabled: state.controls.cancel.disabled, onClick: this.handleCancelButton, round: true, scale: "l" }, this.intl.t(state.controls.cancel.labelKey)), state.controls.next.visible &&
      h("calcite-button", { disabled: state.controls.next.disabled, onClick: this.handleNextButton, round: true, scale: "l" }, this.intl.t(state.controls.next.labelKey)), state.controls.close.visible &&
      h("calcite-button", { disabled: state.controls.close.disabled, onClick: this.handleCloseButton, round: true, scale: "l" }, this.intl.t(state.controls.close.labelKey))));
  }
  render() {
    const { state } = this;
    if (state) {
      return (h(Host, { "data-element": "hub-page-migration-workflow" }, h("calcite-stepper", { icon: true, numbered: true, onCalciteStepperChange: this.handleStepperItemChange }, state.steps.map((step, idx) => {
        return (h("calcite-stepper-item", { complete: step.complete, disabled: step.disabled, error: step.error, heading: this.intl.t(step.labelKey), key: step.labelKey, selected: state.stepIndex === idx }, h("div", { class: "sc-arcgis-hub-page-migration-scroll-container" }, this.renderCurrentStep(idx))));
      })), this.renderControls(state)));
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "state": ["stateChanged"]
  }; }
};
ArcgisHubPageMigrationWorkflow.style = arcgisHubPageMigrationWorkflowCss;

export { ArcgisHubPageMigrationWorkflow as arcgis_hub_page_migration_workflow };
