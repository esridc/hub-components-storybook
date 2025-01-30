export class BaseMachine {
  constructor(workflowConfig, context, options) {
    this.overrideAllowGroupSelection = false;
    this.context = context;
    this.workflowConfig = workflowConfig;
    this.t = options === null || options === void 0 ? void 0 : options.t;
    this.overrideAllowGroupSelection = options === null || options === void 0 ? void 0 : options.allowGroupSelection;
  }
  ;
  /**
   *If we are working with a Group, they we can't allow group selection b/c we can't share a group to a group
   Otherwise if there are groups, and there are more than one, we should allow group selection
   */
  get allowGroupSelection() {
    let result = true;
    // If we are working with a group, we can't allow group selection
    if (this.workflowConfig.types.includes("Group")) {
      result = false;
    }
    else {
      // If there are groups, and there are more than one, we should allow group selection
      // otherwise, check if the components have passed a prop to override the default behavior
      result = this.workflowConfig.groups ? this.workflowGroupIds.length > 1 : this.overrideAllowGroupSelection;
    }
    return result;
  }
  /**
   * List of groups that the user can share to in order to be included in the context / query
   */
  get workflowGroupIds() {
    const groupMemberships = this.workflowConfig.groups || { owner: [], admin: [], member: [] };
    return [...groupMemberships.owner, ...groupMemberships.admin, ...groupMemberships.member];
  }
  start() {
    return this.reduce({ tag: 'Initialize' });
  }
}
