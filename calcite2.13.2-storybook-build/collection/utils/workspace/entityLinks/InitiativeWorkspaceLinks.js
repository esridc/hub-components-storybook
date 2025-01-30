import { PANE_ICONS } from '../types';
export const InitiativeWorkspaceLinks = [
  // TODO: re-add initiative overview pane
  // {
  //   entity: 'initiative',
  //   pane: 'overview',
  //   component: 'arcgis-hub-initiative-overview',
  //   i18nLabel: 'panes.overview',
  //   icon: PANE_ICONS.overview,
  //   permissions: ['hub:initiative:workspace:overview']
  // },
  {
    entity: 'initiative',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: PANE_ICONS.dashboard,
    permissions: ['hub:initiative:workspace:dashboard']
  },
  {
    entity: 'initiative',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:initiative:workspace:details']
  },
  {
    entity: 'initiative',
    pane: 'catalog',
    i18nLabel: 'panes.catalog',
    icon: PANE_ICONS.catalog,
    permissions: ['hub:initiative:workspace:catalog'],
    children: [
      {
        entity: 'initiative',
        pane: 'catalog-content',
        component: 'arcgis-hub-entity-catalog',
        i18nLabel: 'panes.catalogContent',
        icon: PANE_ICONS.catalogContent,
        permissions: ['hub:initiative:workspace:catalog']
      },
      {
        entity: 'initiative',
        pane: 'catalog-events',
        component: 'arcgis-hub-entity-catalog',
        i18nLabel: 'panes.catalogEvents',
        icon: PANE_ICONS.catalogEvents,
        permissions: ['hub:initiative:workspace:catalog']
      }
    ]
  },
  {
    entity: 'initiative',
    pane: 'metrics',
    component: 'arcgis-hub-entity-metrics',
    i18nLabel: 'panes.metrics',
    icon: PANE_ICONS.metrics,
    permissions: ['hub:initiative:workspace:metrics']
  },
  {
    entity: 'initiative',
    pane: 'projects',
    component: 'arcgis-hub-entity-projects',
    i18nLabel: 'panes.projects',
    icon: PANE_ICONS.projects,
    permissions: ['hub:initiative:workspace:projects']
  },
  {
    entity: 'initiative',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: PANE_ICONS.collaborators,
    permissions: ['hub:initiative:workspace:collaborators']
  },
  {
    entity: 'initiative',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ['hub:initiative:workspace:settings']
  },
];
