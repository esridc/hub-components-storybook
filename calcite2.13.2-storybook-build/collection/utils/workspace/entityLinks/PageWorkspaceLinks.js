import { PANE_ICONS } from "../types";
export const PageWorkspaceLinks = [
  // TODO: re-add page workspace overview
  // {
  //   entity: 'page',
  //   pane: 'overview',
  //   component: 'arcgis-hub-entity-overview',
  //   i18nLabel: 'panes.overview',
  //   icon: PANE_ICONS.overview,
  //   permissions: ['hub:page:workspace:overview']
  // },
  {
    entity: 'page',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: PANE_ICONS.dashboard,
    permissions: ['hub:page:workspace:dashboard']
  },
  {
    entity: 'page',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:page:workspace:details']
  },
  {
    entity: 'page',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: PANE_ICONS.collaborators,
    permissions: ['hub:page:workspace:collaborators']
  },
  {
    entity: 'page',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ['hub:page:workspace:settings']
  }
];
