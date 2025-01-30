import { W as WORKSPACE_PANES } from './types-dca4cb90.js';
import '@arcgis/core/config.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import './store-0a6cb79f.js';
import { d as dist } from './index-dd3f99ac.js';
import { k as isExternalLink } from './urls-0e36649d.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { b as capitalize } from './util-3e6872d9.js';

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
  const isWorkspacepane = WORKSPACE_PANES.includes(pathSegments[pathSegments.length - 1]);
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
  const isExternal = !pane && !!href && isExternalLink(href);
  if (pane) {
    hubTelemetry.emit(Object.assign(Object.assign({}, dist.dictionary.category.navigation.action.manage), { label: capitalize(pane) }));
  }
  else if (isExternal) {
    hubTelemetry.emit(Object.assign(Object.assign(Object.assign({}, dist.dictionary.category.navigation.action.external), { details: href }), telemetry));
  }
  else if (Object.keys(telemetry).length) {
    hubTelemetry.emit(telemetry);
  }
};

export { getRelativeWorkspacePaneUrl as g, logWorkspaceLinkTelemetry as l };
