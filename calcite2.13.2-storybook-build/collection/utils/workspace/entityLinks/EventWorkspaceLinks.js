import { PANE_ICONS } from '../types';
export const EventWorkspaceLinks = [
  {
    entity: 'event',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: PANE_ICONS.dashboard,
    permissions: ['hub:event:workspace:dashboard']
  },
  {
    entity: 'event',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:event:workspace:details']
  },
  {
    entity: 'event',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: PANE_ICONS.collaborators,
    permissions: ['hub:event:workspace:collaborators'],
  },
  {
    entity: 'event',
    pane: 'registrants',
    component: 'arcgis-hub-entity-registrants',
    i18nLabel: 'panes.registrants',
    icon: PANE_ICONS.registrants,
    permissions: ['hub:event:workspace:registrants']
  },
  {
    entity: 'event',
    pane: 'settings',
    component: 'arcgis-hub-entity-event-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ['hub:event:workspace:settings']
  }
];
