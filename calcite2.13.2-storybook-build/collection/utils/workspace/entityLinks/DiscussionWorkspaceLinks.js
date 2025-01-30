import { PANE_ICONS } from '../types';
export const DiscussionWorkspaceLinks = [
  {
    entity: 'discussion',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: PANE_ICONS.dashboard,
    permissions: ['hub:discussion:workspace:dashboard']
  },
  {
    entity: 'discussion',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:discussion:workspace:details']
  },
  {
    entity: 'discussion',
    pane: 'participation',
    component: 'arcgis-hub-entity-discussion-participation-pane',
    i18nLabel: 'panes.participation',
    icon: PANE_ICONS.discussion,
    permissions: ['hub:discussion:workspace:discussion']
  },
  {
    entity: 'discussion',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ['hub:discussion:workspace:settings']
  },
];
