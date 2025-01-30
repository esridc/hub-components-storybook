import { WORKSPACE_PANES } from "./types";
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
export const getRelativeWorkspacePaneUrl = (pane) => {
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
