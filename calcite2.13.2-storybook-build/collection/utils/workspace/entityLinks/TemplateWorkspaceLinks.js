import { PANE_ICONS } from "../types";
export const TemplateWorkspaceLinks = [
  {
    entity: "template",
    pane: "dashboard",
    component: "arcgis-hub-entity-dashboard",
    i18nLabel: "panes.dashboard",
    icon: PANE_ICONS.dashboard,
    permissions: ["hub:template:workspace:dashboard"]
  },
  {
    entity: 'template',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:template:workspace:details']
  },
  {
    entity: 'template',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: PANE_ICONS.collaborators,
    permissions: ['hub:template:workspace:collaborators']
  },
  {
    entity: 'template',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ["hub:template:workspace:settings"]
  }
];
