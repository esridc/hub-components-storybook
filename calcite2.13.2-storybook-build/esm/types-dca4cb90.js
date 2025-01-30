const WORKSPACE_PANES = [
  'catalog',
  'catalog-content',
  'catalog-events',
  'collaborators',
  'content',
  'dashboard',
  'details',
  'discussion',
  'events',
  'followers',
  'groups',
  'initiatives',
  'members',
  'metrics-coming-soon',
  'metrics',
  'overview',
  'participation',
  'projects',
  'registrants',
  'settings',
];
var PANE_ICONS;
(function (PANE_ICONS) {
  PANE_ICONS["catalog"] = "data-magnifying-glass";
  PANE_ICONS["catalogContent"] = "files";
  PANE_ICONS["catalogEvents"] = "event";
  PANE_ICONS["collaborators"] = "group";
  PANE_ICONS["content"] = "files";
  PANE_ICONS["dashboard"] = "dashboard";
  PANE_ICONS["details"] = "edit-attributes";
  PANE_ICONS["discussion"] = "speech-bubbles";
  PANE_ICONS["events"] = "event";
  PANE_ICONS["followers"] = "walking";
  PANE_ICONS["group"] = "group";
  PANE_ICONS["initiatives"] = "initiative";
  PANE_ICONS["members"] = "group";
  PANE_ICONS["metrics"] = "chart-gear";
  PANE_ICONS["overview"] = "home";
  PANE_ICONS["pages"] = "file-code";
  PANE_ICONS["participation"] = "speech-bubbles";
  PANE_ICONS["projects"] = "projects";
  PANE_ICONS["registrants"] = "user-calendar";
  PANE_ICONS["settings"] = "gear";
})(PANE_ICONS || (PANE_ICONS = {}));

export { PANE_ICONS as P, WORKSPACE_PANES as W };
