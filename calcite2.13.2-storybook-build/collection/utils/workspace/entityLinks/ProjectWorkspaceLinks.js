import { PANE_ICONS } from "../types";
export const ProjectWorkspaceLinks = [
  // TODO: re-add project workspace overview
  // {
  //   entity: 'project',
  //   pane: 'overview',
  //   component: 'arcgis-hub-project-overview',
  //   i18nLabel: 'panes.overview',
  //   icon: PANE_ICONS.overview,
  //   permissions: ['hub:project:workspace:overview']
  // },
  {
    entity: 'project',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: PANE_ICONS.dashboard,
    permissions: ['hub:project:workspace:dashboard']
  },
  {
    entity: 'project',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:project:workspace:details']
  },
  {
    entity: 'project',
    pane: 'catalog',
    i18nLabel: 'panes.catalog',
    icon: PANE_ICONS.catalog,
    permissions: ['hub:project:workspace:catalog'],
    children: [
      {
        entity: 'project',
        pane: 'catalog-content',
        component: 'arcgis-hub-entity-catalog',
        i18nLabel: 'panes.catalogContent',
        icon: PANE_ICONS.catalogContent,
        permissions: ['hub:project:workspace:catalog']
      },
      {
        entity: 'project',
        pane: 'catalog-events',
        component: 'arcgis-hub-entity-catalog',
        i18nLabel: 'panes.catalogEvents',
        icon: PANE_ICONS.catalogEvents,
        permissions: ['hub:project:workspace:catalog']
      }
    ]
  },
  {
    entity: 'project',
    pane: 'initiatives',
    component: 'arcgis-hub-entity-initiatives',
    i18nLabel: 'panes.initiatives',
    icon: PANE_ICONS.initiatives,
    permissions: ['hub:project:workspace:initiatives']
  },
  {
    entity: 'project',
    pane: 'metrics',
    component: 'arcgis-hub-entity-metrics',
    i18nLabel: 'panes.metrics',
    icon: PANE_ICONS.metrics,
    permissions: ["hub:project:workspace:metrics"]
  },
  {
    entity: 'project',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: PANE_ICONS.collaborators,
    permissions: ['hub:project:workspace:collaborators']
  },
  {
    entity: 'project',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ["hub:project:workspace:settings"]
  },
];
