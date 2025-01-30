/**
 * NOTE: this definition is filled with mostly dummy variables right now.
 * These will need to be updated to correct values before using a site workspace.
*/
import { PANE_ICONS } from "../types";
export const SiteWorkspaceLinks = [
  // TODO: re-add site overview pane
  // {
  //   entity: 'site',
  //   pane: 'overview',
  //   component: 'arcgis-hub-entity-overview',
  //   i18nLabel: 'panes.overview',
  //   icon: PANE_ICONS.overview,
  //   permissions: ['hub:site:workspace:overview']
  // },
  {
    entity: 'site',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: PANE_ICONS.dashboard,
    permissions: ['hub:site:workspace:dashboard']
  },
  {
    entity: 'site',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:site:workspace:details']
  },
  {
    entity: 'site',
    pane: 'content',
    component: 'arcgis-hub-entity-content',
    i18nLabel: 'panes.content',
    icon: PANE_ICONS.content,
    permissions: ['hub:site:workspace:content']
  },
  {
    entity: 'site',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: PANE_ICONS.collaborators,
    permissions: ['hub:site:workspace:collaborators']
  },
  {
    entity: 'site',
    pane: 'followers',
    component: 'arcgis-hub-entity-followers',
    i18nLabel: 'panes.followers',
    icon: PANE_ICONS.followers,
    permissions: ['hub:site:workspace:followers']
  },
  {
    entity: 'site',
    pane: 'discussion',
    component: 'arcgis-hub-entity-discussion-settings-pane',
    i18nLabel: 'panes.discussions',
    icon: PANE_ICONS.discussion,
    permissions: ['hub:site:workspace:discussion'],
  },
  {
    entity: 'site',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ['hub:site:workspace:settings']
  },
];
