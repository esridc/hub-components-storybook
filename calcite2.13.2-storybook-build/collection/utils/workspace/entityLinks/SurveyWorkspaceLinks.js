import { PANE_ICONS } from '../types';
export const SurveyWorkspaceLinks = [
  {
    entity: 'survey',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: PANE_ICONS.dashboard,
    permissions: ['hub:survey:workspace:dashboard']
  },
  {
    entity: 'survey',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:survey:workspace:details']
  },
  {
    entity: 'survey',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: PANE_ICONS.collaborators,
    permissions: ['hub:survey:workspace:collaborators']
  },
  {
    entity: 'survey',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ['hub:survey:workspace:settings']
  },
];
