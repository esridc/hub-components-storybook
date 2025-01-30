import { PANE_ICONS } from '../types';
export const GroupWorkspaceLinks = [
  {
    entity: 'group',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:group:workspace:details']
  },
  {
    entity: 'group',
    pane: 'members',
    component: 'arcgis-hub-entity-group-members',
    i18nLabel: 'panes.members',
    icon: PANE_ICONS.members,
    permissions: ['hub:group:workspace:members']
  },
  {
    entity: 'group',
    pane: 'content',
    component: 'arcgis-hub-entity-group-content',
    i18nLabel: 'panes.content',
    icon: PANE_ICONS.content,
    permissions: ['hub:group:workspace:content']
  },
  {
    entity: 'group',
    pane: 'discussion',
    component: 'arcgis-hub-entity-discussion-settings-pane',
    i18nLabel: 'panes.discussions',
    icon: PANE_ICONS.discussion,
    permissions: ['hub:group:workspace:discussion'],
  },
  {
    entity: 'group',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ['hub:group:workspace:settings']
  },
];
