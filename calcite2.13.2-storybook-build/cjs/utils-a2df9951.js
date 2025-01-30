'use strict';

const types = require('./types-ff8f7df0.js');
require('@arcgis/core/config.js');
require('./resources-e64df288.js');
require('./index-77618030.js');
require('./store-2a385ca0.js');
const index = require('./index-6f16fe65.js');
const urls = require('./urls-2533c98f.js');
require('./screen-9b9fd440.js');
require('./sha256-07a9afb6.js');
require('./interfaces-f2794fff.js');
const util = require('./util-38e73510.js');

/**
 * Note: The following Workspace URL utils rely on window.location...
 * properties (to construct relative urls) and therefore assume that
 * they're being leveraged from within the context of an entity workspace
 */
/**
 * from within the context of an entity's workspace pane, the following
 * util returns the relative url for the provided workspace pane
 *
 * example: "https://some-base-url.com/projects/:id/workspace/overview"
 * pane = "details"
 * returns: "/projects/:id/workspace/details"
 */
const getRelativeWorkspacePaneUrl = (pane) => {
  let workspacepaneUrl = '/';
  // validate that the current window location is a workspace pane
  const pathSegments = window.location.pathname.split('/');
  const isWorkspaceRoute = pathSegments.includes('workspace');
  const isWorkspacepane = types.WORKSPACE_PANES.includes(pathSegments[pathSegments.length - 1]);
  if (isWorkspaceRoute && isWorkspacepane) {
    // slice the current pane off the relative path
    // and repace it with the provided pane
    const workspacePath = window.location.pathname
      .split('/').slice(0, -1).join('/');
    workspacepaneUrl = `${workspacePath}/${pane}`;
  }
  return workspacepaneUrl;
};

/**
 * When the link is clicked, we log telemetry:
 * 1. For inter-pane workspace navigation (pane prop is provided),
 * we emit a pre-defined telemetry event. This cannot be overwritten
 * 2. For external navigation, we emit a pre-defined telemetry event
 * that the consumer can override or enhance with the telemetry prop
 * 3. For relative navigation, the user can provide a custom telemetry
 * event through the telemetry prop
 * @param pane
 * @param href
 * @param hubTelemetry
 * @param telemetry
 */
const logWorkspaceLinkTelemetry = (options) => {
  const { hubTelemetry, pane, href, telemetry = {} } = options;
  const isExternal = !pane && !!href && urls.isExternalLink(href);
  if (pane) {
    hubTelemetry.emit(Object.assign(Object.assign({}, index.dist.dictionary.category.navigation.action.manage), { label: util.capitalize(pane) }));
  }
  else if (isExternal) {
    hubTelemetry.emit(Object.assign(Object.assign(Object.assign({}, index.dist.dictionary.category.navigation.action.external), { details: href }), telemetry));
  }
  else if (Object.keys(telemetry).length) {
    hubTelemetry.emit(telemetry);
  }
};

exports.getRelativeWorkspacePaneUrl = getRelativeWorkspacePaneUrl;
exports.logWorkspaceLinkTelemetry = logWorkspaceLinkTelemetry;
