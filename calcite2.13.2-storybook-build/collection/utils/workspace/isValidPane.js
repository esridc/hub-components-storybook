import { WORKSPACE_PANES } from "./types";
export const isValidPane = (pane) => !!pane && WORKSPACE_PANES.includes(pane);
