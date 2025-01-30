import { WorkspacePane } from "./types";
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
export declare const getRelativeWorkspacePaneUrl: (pane: WorkspacePane) => string;
