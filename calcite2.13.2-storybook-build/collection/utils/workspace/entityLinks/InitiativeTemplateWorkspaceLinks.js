import { PANE_ICONS } from "../types";
export const InitiativeTemplateWorkspaceLinks = [
  {
    entity: "initiativeTemplate",
    pane: "dashboard",
    component: "arcgis-hub-entity-dashboard",
    i18nLabel: "panes.dashboard",
    icon: PANE_ICONS.dashboard,
    permissions: ["hub:initiativeTemplate:workspace:dashboard"]
  },
  {
    entity: 'initiativeTemplate',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:initiativeTemplate:workspace:details']
  },
  {
    entity: 'initiativeTemplate',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: PANE_ICONS.collaborators,
    permissions: ['hub:initiativeTemplate:workspace:collaborators']
  },
  {
    entity: 'initiativeTemplate',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ["hub:initiativeTemplate:workspace:settings"]
  }
];
